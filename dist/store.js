import { homedir } from 'node:os'
import { join, dirname } from 'node:path'
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'

export const DEFAULT_PREFS = Object.freeze({
  showBuiltin: false,
  showExperimental: false,
  sort: 'custom',
  columns: 'auto',
  source: 'all',
  status: 'all',
  surfacePercent: 86,
  blur: 12,
  highContrast: false,
})
export const MAX_BYTES = 12 * 1024 * 1024
export const MAX_ICON_LENGTH = 240_000
const SAFE_ICON = /^(data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=]+|https:\/\/[^\s<>"']{1,1000})$/
const PLAIN = Object.prototype.hasOwnProperty

export function storePath(env = process.env, home = homedir()) {
  return join(env.DSH_HOME || join(home, '.dsh'), 'plugin-studio', 'appearance.json')
}
export function defaultDocument() {
  return { schema: 1, revision: 0, preferences: { ...DEFAULT_PREFS }, items: {}, history: {} }
}
function safeText(value, max) {
  if (value === undefined || value === null) return ''
  if (typeof value !== 'string') throw new Error('文本字段必须是字符串')
  if (value.length > max) throw new Error(`文本超出 ${max} 字符限制`)
  return value
}
function clampInt(value, low, high, fallback) {
  return Number.isInteger(value) && value >= low && value <= high ? value : fallback
}
function plainObject(o) {
  return o !== null && typeof o === 'object' && !Array.isArray(o) && Object.getPrototypeOf(o) === Object.prototype
}
function validKey(key) {
  return typeof key === 'string' && key.length > 0 && key.length <= 300 && /^(bundle|row|item):/.test(key)
}
export function validateDocument(value) {
  if (!plainObject(value) || value.schema !== 1) throw new Error('不支持的外观文件格式（schema 必须为 1）')
  if (!plainObject(value.preferences) || !plainObject(value.items)) throw new Error('外观设置结构错误')
  const p = value.preferences
  const out = defaultDocument()
  out.preferences = {
    showBuiltin: p.showBuiltin === true,
    showExperimental: p.showExperimental === true,
    sort: ['custom','name','status'].includes(p.sort) ? p.sort : 'custom',
    columns: ['auto','3','4','5','6'].includes(p.columns) ? p.columns : 'auto',
    source: ['all','official','third-party'].includes(p.source) ? p.source : 'all',
    status: ['all','enabled','disabled'].includes(p.status) ? p.status : 'all',
    surfacePercent: clampInt(p.surfacePercent, 55, 100, 86),
    blur: clampInt(p.blur, 0, 26, 12),
    highContrast: p.highContrast === true,
  }
  const entries = Object.entries(value.items)
  if (entries.length > 2000) throw new Error('超过 2000 个插件外观条目')
  for (const [key, obj] of entries) {
    if (!validKey(key) || !plainObject(obj)) throw new Error('无效的插件标识或外观条目')
    const icon = safeText(obj.icon, MAX_ICON_LENGTH)
    if (icon && !SAFE_ICON.test(icon)) throw new Error('头像仅支持 HTTPS URL 或压缩后的 PNG/JPEG/WebP')
    out.items[key] = {
      title: safeText(obj.title, 120),
      description: safeText(obj.description, 1200),
      category: safeText(obj.category, 60),
      icon,
      order: clampInt(obj.order, -100000, 100000, 0),
      pinned: obj.pinned === true,
    }
  }
  if (value.history !== undefined) {
    if (!plainObject(value.history) || Object.keys(value.history).length > 1000) throw new Error('版本历史格式错误')
    for (const [key, records] of Object.entries(value.history)) {
      if (!validKey(key) || !Array.isArray(records) || records.length > 40) throw new Error('版本历史数据无效')
      out.history[key] = records.map(record => {
        if (!plainObject(record) || !/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(record.version)) {
          throw new Error('历史版本号无效')
        }
        return { version: safeText(record.version, 80), at: safeText(record.at, 60), action: ['update','rollback'].includes(record.action) ? record.action : 'update' }
      })
    }
  }
  out.revision = clampInt(value.revision, 0, Number.MAX_SAFE_INTEGER, 0)
  return out
}
export async function readDocument(path = storePath()) {
  try { return validateDocument(JSON.parse(await readFile(path, 'utf8'))) }
  catch (error) {
    if (error?.code === 'ENOENT') return defaultDocument()
    throw error
  }
}
export async function saveDocument(value, expectedRevision, path = storePath()) {
  if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0) throw new Error('无效的修订号')
  const current = await readDocument(path)
  if (current.revision !== expectedRevision) {
    const err = new Error('外观配置已经在其他窗口修改，请刷新后再保存')
    err.status = 409
    throw err
  }
  const doc = validateDocument(value)
  doc.revision = current.revision + 1
  const data = JSON.stringify(doc, null, 2)
  if (Buffer.byteLength(data) > MAX_BYTES) throw new Error('外观数据库过大（最大 12MB）')
  await mkdir(dirname(path), { recursive: true })
  const tmp = `${path}.${randomUUID()}.tmp`
  await writeFile(tmp, data, { encoding:'utf8', flag:'wx', mode:0o600 })
  try { await rename(tmp, path) }
  catch (error) { const { unlink } = await import('node:fs/promises'); await unlink(tmp).catch(() => {}); throw error }
  return doc
}
