import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { runInNewContext } from 'node:vm'

const client=await readFile(new URL('../dist/client.js',import.meta.url),'utf8')

test('browser half registers plugin tab and preserves host CSS with no runtime build',()=>{
  const styles=[]
  const registry=[]
  const react={createElement(type,props,...children){return {type,props,children}}}
  const document={
    getElementById(){return null},
    createElement(tag){assert.equal(tag,'style');return {id:'',textContent:''}},
    head:{appendChild(style){styles.push(style)}},
  }
  const ctx={
    slots:{
      inject(name,register){assert.equal(name,'plugins.tab');register()},
      register(meta,render){registry.push({meta,render});return()=>{}},
    },
  }
  const window={__ModuleLoader__:{load({id,factory}){
    assert.equal(id,'dsh-plugin-studio')
    const result=factory(pkg=>{assert.equal(pkg,'react');return react})
    assert.deepEqual(Array.from(result.inject),['slots','remote','remote.pluginManager'])
    result.apply(ctx)
  }}}
  runInNewContext(client,{window,document,console})
  assert.equal(registry.length,1)
  assert.equal(registry[0].meta.name,'plugins.tab')
  assert.equal(registry[0].meta.label(),'插件工作室')
  assert.equal(registry[0].render({openPackage(){}}).type.name,'Studio')
  assert.equal(styles.length,1)
  assert.ok(styles[0].textContent.includes('[data-plugin-header-part="toolbar"]'))
  assert.ok(styles[0].textContent.includes('backdrop-filter'))
})

test('replaces Installed with Studio, preserving native detail and other contributed tabs', async()=>{
  const attrs=new Map()
  const studio={id:':x:-plugin-studio',selected:false,disabled:false,isConnected:true,clicks:0,
    getAttribute(name){return name==='aria-selected'?(this.selected?'true':'false'):null},
    click(){this.clicks++;this.selected=true;installed.selected=false}}
  const installed={id:':x:-installed',selected:true,
    getAttribute(name){return name==='aria-selected'?(this.selected?'true':'false'):null}}
  const discover={id:':x:-discover',selected:false,
    getAttribute(name){return name==='aria-selected'?(this.selected?'true':'false'):null}}
  let details=false,discoverPresent=false,listShown=true
  const body={querySelector(sel){
    if(sel.startsWith('[data-plugin-detail]'))return details?{}:null
    if(sel.includes('installed-panel'))return listShown?{}:null
    return null
  }}
  const bar={
    querySelector(sel){if(sel.includes('plugin-studio'))return studio;if(sel.includes('-installed'))return installed;return null},
    querySelectorAll(sel){return sel==='[role="tab"]'?(discoverPresent?[installed,studio,discover]:[installed,studio]):[]},
    closest(sel){return sel==='[data-plugin-body]'?body:null},
    hasAttribute(key){return attrs.has(key)},getAttribute(key){return attrs.get(key)??null},
    setAttribute(key,val){attrs.set(key,val)},removeAttribute(key){attrs.delete(key)},
  }
  const styles=[]
  let mutation
  class MutationObserverMock{
    constructor(callback){mutation=callback}
    observe(){} disconnect(){}
  }
  const bodyAttrs=new Map()
  let clickListener
  const document={
    body:{hasAttribute(key){return bodyAttrs.has(key)},setAttribute(key,value){bodyAttrs.set(key,value)},removeAttribute(key){bodyAttrs.delete(key)}},
    addEventListener(type,fn){if(type==='click')clickListener=fn},
    removeEventListener(type,fn){if(type==='click'&&clickListener===fn)clickListener=undefined},
    getElementById(){return null},
    createElement(){return {id:'',textContent:''}},
    head:{appendChild(el){styles.push(el)}},
    querySelectorAll(sel){return sel==='[data-plugin-header-part="tabs"]'?[bar]:[]}
  }
  const react={createElement(type,props,...children){return {type,props,children}}}
  const ctx={slots:{inject(_id,cb){cb()},register(){return()=>{}}}}
  const window={__ModuleLoader__:{load({factory}){factory(()=>react).apply(ctx)}}}
  runInNewContext(client,{window,document,MutationObserver:MutationObserverMock,console})
  await new Promise(resolve=>setImmediate(resolve))
  assert.equal(studio.clicks,1,'Entering the plugin page redirects from Installed to Studio')
  assert.equal(attrs.has('data-dshps-only-tab'),false,'redundant bar is not hidden before selection is observed')
  mutation(); await new Promise(resolve=>setImmediate(resolve))
  assert.equal(attrs.has('data-dshps-only-tab'),true,'single Studio tab hides the whole tab strip')
  assert.ok(styles[0].textContent.includes('[data-dshps-native-installed]'),'only the native tab is hidden')
  assert.ok(styles[0].textContent.includes('[data-plugin-detail]')===false,'native detail CSS remains untouched')

  details=true; studio.selected=false; installed.selected=true
  mutation();await new Promise(resolve=>setImmediate(resolve))
  assert.equal(studio.clicks,1,'Native bundle detail stays open')

  details=false;discoverPresent=true;discover.selected=true;installed.selected=false
  mutation();await new Promise(resolve=>setImmediate(resolve))
  assert.equal(studio.clicks,1,'Discover remains selected')
  assert.equal(attrs.has('data-dshps-only-tab'),false,'bar remains visible when Discover exists')

  discover.selected=false; installed.selected=true
  mutation();await new Promise(resolve=>setImmediate(resolve))
  assert.equal(studio.clicks,2,'Returning to native Installed list redirects to Studio again')
  assert.equal(typeof window.__dshPluginStudioStopReplacement,'function')
  document.body.setAttribute('data-dshps-legacy-mode','')
  installed.selected=true; studio.selected=false
  mutation();await new Promise(resolve=>setImmediate(resolve))
  assert.equal(studio.clicks,2,'temporary legacy mode can stay on the native list')
  assert.equal(attrs.has('data-dshps-only-tab'),false,'native selector is shown in legacy mode')
  clickListener({target:{closest(sel){return sel==='[id$="-plugin-studio"]'?studio:null}}})
  assert.equal(document.body.hasAttribute('data-dshps-legacy-mode'),false,'clicking Studio turns native mode off')
  window.__dshPluginStudioStopReplacement()
  assert.equal(attrs.has('data-dshps-only-tab'),false,'teardown restores the native tab chrome')
})
