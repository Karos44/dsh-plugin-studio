import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { defaultDocument, validateDocument, readDocument, saveDocument, storePath } from '../src/store.js'

const home = await mkdtemp(join(tmpdir(), 'dshps-store-'))
const path = join(home, 'plugin-studio', 'appearance.json')
test.after(async () => { await rm(home, { recursive:true, force:true }) })

test('initial document and profile-independent store path', async () => {
  const d=await readDocument(path)
  assert.equal(d.schema,1)
  assert.equal(d.revision,0)
  assert.deepEqual(d.items,{})
  assert.equal(d.preferences.surfacePercent,86)
  assert.equal(storePath({DSH_HOME:home}, '/ignored'), path)
})

test('atomic save, independent appearance and revision conflict', async () => {
  const d=defaultDocument()
  d.items['bundle:@acme/my-plugin']={
    title:'小鲸鱼',description:'我的自定义介绍',category:'娱乐',
    icon:'data:image/png;base64,aGVsbG8=',order:4,pinned:true,
  }
  d.history['bundle:@acme/my-plugin']=[{version:'1.0.0',action:'update',at:'2026-10-27T01:00:00.000Z'}]
  const saved=await saveDocument(d,0,path)
  assert.equal(saved.revision,1)
  assert.equal(saved.items['bundle:@acme/my-plugin'].title,'小鲸鱼')
  assert.equal((await readDocument(path)).history['bundle:@acme/my-plugin'][0].version,'1.0.0')
  const onDisk=JSON.parse(await readFile(path,'utf8'))
  assert.deepEqual(onDisk,saved)
  await assert.rejects(saveDocument(d,0,path), e=>e.status===409)
  saved.preferences.highContrast=true
  assert.equal((await saveDocument(saved,1,path)).revision,2)
})

test('sanitize exports and reject invalid avatar/malicious item keys', () => {
  const d=defaultDocument()
  d.preferences.surfacePercent=200
  d.preferences.blur=-44
  d.items['bundle:demo']={title:'自定义',icon:'https://example.org/icon.webp',order:24,unknown:'ignored'}
  const parsed=validateDocument(d)
  assert.equal(parsed.preferences.surfacePercent,86)
  assert.equal(parsed.preferences.blur,12)
  assert.equal(parsed.items['bundle:demo'].title,'自定义')
  assert.equal('unknown' in parsed.items['bundle:demo'],false)
  for(const icon of ['javascript:alert(1)','data:image/svg+xml,<svg/>','file:///C:/private.png','http://example.org/icon.png']) {
    assert.throws(()=>validateDocument({...d,items:{'bundle:demo':{icon}}}),/头像/)
  }
  assert.throws(()=>validateDocument({...d,items:{'__proto__:bad':{title:'x'}}}),/插件标识/)
  assert.throws(()=>validateDocument({...d,schema:9}),/schema/)
})

test('never overwrite a corrupt database without manual repair', async () => {
  const broken=join(home,'broken.json')
  const { writeFile }=await import('node:fs/promises')
  await writeFile(broken,'{bad json','utf8')
  await assert.rejects(readDocument(broken))
  await assert.rejects(saveDocument(defaultDocument(),0,broken))
  assert.equal(await readFile(broken,'utf8'),'{bad json')
})
