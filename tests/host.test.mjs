import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { apply } from '../src/host.js'

const home=await mkdtemp(join(tmpdir(),'dshps-host-'))
const previousHome=process.env.DSH_HOME
process.env.DSH_HOME=home
let route
apply({
  logger:()=>({info(){},warn(){}}),
  webServer:{register({path,handler}){assert.equal(path,'/api/dsh-plugin-studio/state');route=handler}},
})

test.after(async()=>{
  if(previousHome===undefined)delete process.env.DSH_HOME
  else process.env.DSH_HOME=previousHome
  await rm(home,{recursive:true,force:true})
})

async function request(method,body,headers={}) {
  const chunks=body===undefined?[]:[Buffer.from(JSON.stringify(body))]
  const req=Readable.from(chunks)
  req.method=method
  req.headers={host:'127.0.0.1:3080',...headers}
  let status=0, response=''
  const res={writeHead(code){status=code},end(text){response=text}}
  await route(req,res)
  return {status,data:JSON.parse(response)}
}

test('GET, POST, GET persists independent user-facing overrides', async()=>{
  const before=await request('GET')
  assert.equal(before.status,200)
  const d=before.data.value
  d.items['bundle:test']={title:'鲸鱼插件',description:'自定义',category:'记忆',icon:'',order:1,pinned:true}
  const saved=await request('POST',{expectedRevision:0,value:d},{'content-type':'application/json',origin:'http://127.0.0.1:3080'})
  assert.equal(saved.status,200)
  assert.equal(saved.data.value.revision,1)
  const after=await request('GET')
  assert.equal(after.data.value.items['bundle:test'].title,'鲸鱼插件')
})

test('guard cross-site, bad media type, and conflicting revisions',async()=>{
  const d=(await request('GET')).data.value
  const payload={expectedRevision:1,value:d}
  const cross=await request('POST',payload,{'content-type':'application/json',origin:'https://evil.invalid'})
  assert.equal(cross.status,403)
  const media=await request('POST',payload,{'content-type':'text/plain'})
  assert.equal(media.status,415)
  const old=await request('POST',{...payload,expectedRevision:0},{'content-type':'application/json'})
  assert.equal(old.status,409)
})

test('parallel writes serialize, preventing lost updates',async()=>{
  const d=(await request('GET')).data.value
  const args={expectedRevision:d.revision,value:d}
  const [a,b]=await Promise.all([
    request('POST',args,{'content-type':'application/json'}),
    request('POST',args,{'content-type':'application/json'})
  ])
  assert.deepEqual([a.status,b.status].sort(),[200,409])
})
