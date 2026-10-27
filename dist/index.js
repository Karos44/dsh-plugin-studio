import { readDocument, saveDocument, storePath, MAX_BYTES } from './store.js'

export const name = 'dsh-plugin-studio'
export const inject = ['webServer']
const ROUTE = '/api/dsh-plugin-studio/state'
let writes = Promise.resolve()

function reply(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' })
  res.end(JSON.stringify(data))
}
function validateOrigin(req) {
  const site = req.headers['sec-fetch-site']
  if (site && site !== 'same-origin' && site !== 'none') return false
  const origin = req.headers.origin
  if (!origin) return true // Non-browser clients still need Content-Type: application/json
  try { return new URL(origin).host === req.headers.host && /^https?:$/.test(new URL(origin).protocol) }
  catch { return false }
}
async function parseBody(req) {
  const contentType = req.headers['content-type'] || ''
  if (!/^application\/json(?:\s*;|$)/i.test(contentType)) throw Object.assign(new Error('必须使用 application/json'), { status:415 })
  let size = 0; const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > MAX_BYTES + 65536) throw Object.assign(new Error('请求文件超过限制'), { status:413 })
    chunks.push(chunk)
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) }
  catch { throw Object.assign(new Error('JSON 文件无法解析'), { status:400 }) }
}
export function apply(ctx) {
  const logger = ctx.logger(name)
  const path = storePath()
  ctx.webServer.register({ kind:'exact', path:ROUTE, handler:async (req,res) => {
    try {
      if (req.method === 'GET') {
        return reply(res, 200, { ok:true, value:await readDocument(path) })
      }
      if (req.method !== 'POST') return reply(res, 405, { ok:false, error:'Method not allowed' })
      if (!validateOrigin(req)) return reply(res, 403, { ok:false, error:'拒绝跨站请求' })
      const body = await parseBody(req)
      if (typeof body !== 'object' || !body || !('value' in body)) {
        return reply(res, 400, { ok:false, error:'缺少外观数据' })
      }
      // Serializes simultaneous edits across browser windows: compare revision within queue.
      const job = writes.then(() => saveDocument(body.value, body.expectedRevision, path))
      writes = job.catch(() => {})
      const saved = await job
      return reply(res, 200, { ok:true, value:saved })
    } catch (error) {
      logger.warn(`appearance endpoint: ${error.message}`)
      return reply(res, error.status || 400, { ok:false, error:error.message })
    }
  } })
  logger.info('ready — appearance state persisted at ' + path)
}
