/* DSH Plugin Studio — prebuilt client module, zero runtime build dependencies. */
(function () {
  'use strict';
  const MODULE_ID = 'dsh-plugin-studio';
  const API = '/api/dsh-plugin-studio/state';
  const CSS = "/* DSH Plugin Studio — scoped styles; the host's background remains visible. */\n/* DSH 0.2.1 compatibility: mark the actual tab nodes found by their labels.\n   On later DSH versions the generated React ids may have different suffixes. */\nbody:not([data-dshps-legacy-mode]) [data-dshps-native-installed] { display:none !important; }\nbody:not([data-dshps-legacy-mode]) [data-dshps-only-tab] { display:none !important; }\nbody:not([data-dshps-legacy-mode]) [data-dshps-studio-tabs]:not([data-dshps-only-tab]) {\n  display:flex !important; gap:4px;\n}\nbody:not([data-dshps-legacy-mode]) [data-dshps-studio-tabs] > [role=\"tab\"] { flex:1 1 0; min-width:0; }\nbody:not([data-dshps-legacy-mode]) [data-dshps-studio-tabs] > [aria-hidden=\"true\"] { display:none !important; }\n/* In the custom tab, reuse the host's native Add and Refresh controls. */\nbody:has(.dshps-root) [data-plugin-header-part=\"toolbar\"][hidden] { display:flex !important; }\n.dshps-root, .dshps-root * { box-sizing: border-box; }\n.dshps-root {\n  --ps-text: var(--dsw-alias-label-primary, #23252b);\n  --ps-sub: var(--dsw-alias-label-secondary, #717883);\n  --ps-muted: var(--dsw-alias-label-tertiary, #9299a4);\n  --ps-line: var(--dsw-alias-border-l2, rgba(127,127,127,.3));\n  --ps-base: var(--dsw-alias-bg-layer-3, #fff);\n  --ps-card: color-mix(in srgb, var(--ps-base) var(--ps-opacity,86%), transparent);\n  --ps-card-strong: color-mix(in srgb, var(--ps-base) 96%, transparent);\n  --ps-accent: var(--dsw-alias-state-business-primary, #4d7aff);\n  --ps-good: var(--dsw-alias-state-success-primary, #38986a);\n  --ps-danger: var(--dsw-alias-state-error-primary, #db5b59);\n  position: relative;\n  width: 100%; min-width: 0; color: var(--ps-text); background: transparent;\n  padding: 12px 2px 34px; font-size: 13px; line-height: 1.5;\n  color-scheme: inherit;\n}\n.dshps-root.dshps-high-contrast { --ps-opacity:100% !important; --ps-blur:0px !important; }\n.dshps-root button, .dshps-root input, .dshps-root select, .dshps-root textarea { font: inherit; }\n.dshps-root button { cursor:pointer; }\n.dshps-root button:disabled { opacity: .42; cursor:not-allowed; }\n.dshps-root button:focus-visible, .dshps-root input:focus-visible, .dshps-root textarea:focus-visible,\n.dshps-root select:focus-visible, .dshps-root [tabindex]:focus-visible { outline: 2px solid var(--ps-accent); outline-offset:3px; }\n.dshps-toolbar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:12px; }\n.dshps-toolbar-main { flex:1; display:flex; align-items:center; gap:8px; min-width:210px; }\n.dshps-search { height:38px; flex:1; min-width:100px; border:1px solid var(--ps-line); border-radius:12px;\n  background:var(--ps-card); backdrop-filter:blur(var(--ps-blur,12px)); -webkit-backdrop-filter:blur(var(--ps-blur,12px));\n  color:var(--ps-text); padding:0 13px; outline:none; }\n.dshps-search::placeholder { color:var(--ps-muted); }\n.dshps-icon-btn, .dshps-btn, .dshps-chip, .dshps-seg-btn {\n  display:inline-flex; align-items:center; justify-content:center; gap:6px; color:var(--ps-text);\n  border:1px solid var(--ps-line); background:var(--ps-card); backdrop-filter:blur(var(--ps-blur,12px));\n  -webkit-backdrop-filter:blur(var(--ps-blur,12px)); border-radius:10px; min-height:36px; padding:7px 12px;\n  transition:background .15s, transform .15s, border-color .15s; }\n.dshps-icon-btn { height:38px; width:38px; padding:0; flex:none; }\n.dshps-btn:hover:not(:disabled), .dshps-icon-btn:hover:not(:disabled), .dshps-chip:hover:not(:disabled) {\n  border-color:var(--ps-accent); background:var(--ps-card-strong); }\n.dshps-btn.dshps-primary { color:white; background:var(--ps-accent); border-color:var(--ps-accent); }\n.dshps-btn.dshps-danger { color:var(--ps-danger); }\n.dshps-btn.dshps-tiny { min-height:27px; padding:3px 8px; border-radius:8px; font-size:12px; }\n.dshps-toolbar-switches { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }\n.dshps-chip { min-height:36px; font-size:12px; padding:6px 10px; }\n.dshps-chip[data-on=\"true\"] { color:var(--ps-accent); border-color:var(--ps-accent); background:color-mix(in srgb, var(--ps-accent) 10%, var(--ps-card)); }\n.dshps-filter-wrap { position:relative; }\n.dshps-popover { position:absolute; z-index:20; left:0; top:calc(100% + 8px); width:min(320px,90vw);\n  padding:14px; border:1px solid var(--ps-line); background:var(--ps-card-strong); border-radius:14px;\n  backdrop-filter:blur(22px); -webkit-backdrop-filter:blur(22px); box-shadow:0 14px 50px rgba(0,0,0,.2); }\n.dshps-filter-wrap .dshps-popover { left:auto;right:0; }\n.dshps-field { display:flex; flex-direction:column; gap:5px; margin:10px 0; }\n.dshps-field label { color:var(--ps-sub); font-size:12px; }\n.dshps-field input, .dshps-field textarea, .dshps-field select, .dshps-textbox {\n  color:var(--ps-text); background:var(--ps-card); border:1px solid var(--ps-line);\n  border-radius:9px; width:100%; padding:9px 11px; min-height:38px; outline:none; }\n.dshps-field textarea { resize:vertical; min-height:78px; }\n.dshps-field input[type=range] { border:none; padding:0; min-height:24px; accent-color:var(--ps-accent); }\n.dshps-hint { color:var(--ps-muted); font-size:12px; }\n.dshps-barline { display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; padding:8px 1px 15px; }\n.dshps-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(175px,1fr)); gap:14px; align-items:stretch; }\n.dshps-grid[data-columns=\"3\"] { grid-template-columns:repeat(3,minmax(0,1fr)); }\n.dshps-grid[data-columns=\"4\"] { grid-template-columns:repeat(4,minmax(0,1fr)); }\n.dshps-grid[data-columns=\"5\"] { grid-template-columns:repeat(5,minmax(0,1fr)); }\n.dshps-grid[data-columns=\"6\"] { grid-template-columns:repeat(6,minmax(0,1fr)); }\n.dshps-card { position:relative; display:flex; flex-direction:column; min-height:172px; border:1px solid var(--ps-line);\n  background:var(--ps-card); border-radius:15px; backdrop-filter:blur(var(--ps-blur,12px));\n  -webkit-backdrop-filter:blur(var(--ps-blur,12px)); overflow:visible; box-shadow:0 2px 13px rgba(0,0,0,.025);\n  transition:transform .16s, border-color .16s, box-shadow .16s; }\n.dshps-card:hover { transform:translateY(-2px); border-color:var(--ps-accent); box-shadow:0 8px 20px rgba(0,0,0,.09); }\n.dshps-card:focus-within { z-index:3; }\n.dshps-card[data-open=\"true\"] { z-index:5; }\n.dshps-card[data-enabled=\"false\"] .dshps-avatar { opacity:.60; filter:grayscale(.22); }\n.dshps-art-button { width:65px;height:65px;position:absolute;z-index:2;top:17px;left:50%;transform:translateX(-50%);border:0;border-radius:15px;display:grid;place-items:center;\n  padding:0; margin:0; background:color-mix(in srgb, var(--ps-text) 7%, transparent);color:var(--ps-text); }\n.dshps-art-button:hover { outline:1px solid var(--ps-accent); }\n.dshps-avatar-slot {width:65px;height:65px;flex:none;margin:0 auto 10px;}\n.dshps-avatar { width:52px; height:52px; object-fit:cover; border-radius:12px; }\n.dshps-fallback-avatar { font-size:27px; font-weight:600; letter-spacing:-1px; }\n.dshps-card-open { width:100%; flex:1; display:flex; flex-direction:column; align-items:center; text-align:center;\n  padding:17px 11px 14px; border:0; background:transparent; color:inherit; border-radius:inherit; }\n.dshps-card-open .dshps-card-title { font-size:13px; font-weight:600; line-height:1.35; max-width:100%; overflow:hidden;\n  text-overflow:ellipsis;white-space:nowrap; }\n.dshps-card-open .dshps-card-sub { color:var(--ps-muted); font-size:11px; margin-top:5px; max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }\n.dshps-card-open .dshps-card-desc { color:var(--ps-sub); font-size:11px; line-height:1.4; margin-top:7px; display:-webkit-box;\n  -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden; max-width:100%; }\n.dshps-card-flags { position:absolute; right:9px; top:8px; display:flex; gap:4px; pointer-events:none; }\n.dshps-dot { display:block; width:7px; height:7px; border-radius:50%; background:var(--ps-muted); }\n.dshps-dot.on { background:var(--ps-good); }\n.dshps-pin { color:var(--ps-accent); font-size:13px; }\n.dshps-avatar-pop { top:78px; left:8px; width:calc(100% - 16px); text-align:left; }\n.dshps-avatar-pop strong { display:block; font-size:13px; margin-bottom:4px;word-break:break-word; }\n.dshps-avatar-pop p { font-size:11px; color:var(--ps-sub);margin:4px 0 11px;overflow-wrap:anywhere; }\n.dshps-blank { text-align:center; padding:52px 18px; background:var(--ps-card); border-radius:14px;border:1px dashed var(--ps-line); }\n.dshps-settings-title { display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:15px; }\n.dshps-settings-title h2 { margin:0; font-size:20px; font-weight:700; }\n.dshps-settings-tabs { display:flex;gap:7px;flex-wrap:wrap; margin-bottom:15px; }\n.dshps-settings-tabs button[aria-selected=\"true\"] { color:var(--ps-accent); border-color:var(--ps-accent); }\n.dshps-panel { background:var(--ps-card);border:1px solid var(--ps-line);border-radius:15px;\n  padding:18px; backdrop-filter:blur(var(--ps-blur,12px)); -webkit-backdrop-filter:blur(var(--ps-blur,12px)); margin:0 0 15px; }\n.dshps-panel h3 {margin:0 0 8px;font-size:15px;}\n.dshps-panel p {margin:6px 0 14px;}\n.dshps-setting-item { display:flex;gap:12px;align-items:center; justify-content:space-between; border-bottom:1px solid var(--ps-line);padding:12px 0;min-width:0; }\n.dshps-setting-item:last-child {border-bottom:0;}\n.dshps-setting-item-info { display:flex;gap:10px;align-items:center;min-width:0;flex:1; }\n.dshps-setting-item-info img { width:42px;height:42px;border-radius:10px;object-fit:cover; }\n.dshps-setting-item-info strong {display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}\n.dshps-setting-item-info small {display:block;color:var(--ps-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}\n.dshps-actions { display:flex;gap:7px; flex-wrap:wrap; align-items:center; }\n.dshps-row {display:flex;gap:10px;align-items:center;flex-wrap:wrap;}\n.dshps-split {display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}\n.dshps-help { font-size:12px; line-height:1.6;color:var(--ps-sub); }\n.dshps-tag {display:inline-block;border:1px solid var(--ps-line);border-radius:999px;padding:1px 7px;font-size:10px;color:var(--ps-sub);white-space:nowrap;}\n.dshps-backdrop { position:fixed;inset:0;z-index:99990;display:flex;justify-content:center;align-items:center;\n  background:rgba(0,0,0,.44);padding:18px;backdrop-filter:blur(5px); }\n.dshps-dialog { width:min(530px,100%);max-height:min(88vh,760px);overflow:auto;background:var(--ps-card-strong);\n  color:var(--ps-text);border:1px solid var(--ps-line);border-radius:20px;padding:20px;\n  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 20px 70px rgba(0,0,0,.35); }\n.dshps-dialog-head {display:flex;align-items:center;justify-content:space-between;gap:10px;}\n.dshps-dialog-head h3 {margin:0;font-size:18px;}\n.dshps-dialog-foot {display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:18px;}\n.dshps-dialog .dshps-avatar { width:64px;height:64px; }\n.dshps-toast { position:fixed;bottom:24px;right:24px;max-width:min(460px,calc(100vw - 36px));z-index:99999;\n  border:1px solid var(--ps-line);border-radius:13px; background:var(--ps-card-strong);color:var(--ps-text);\n  padding:12px 15px;box-shadow:0 12px 40px rgba(0,0,0,.25);backdrop-filter:blur(18px);white-space:pre-wrap; }\n.dshps-toast.error {border-color:var(--ps-danger);}\n.dshps-status {display:flex;gap:6px;align-items:center;color:var(--ps-sub);font-size:12px;}\n.dshps-panel-grid {display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:15px;}\n.dshps-summary {min-width:0;}\n.dshps-version {font-variant-numeric:tabular-nums;font-size:12px;color:var(--ps-sub);}\n.dshps-progress-list {max-height:230px;overflow:auto;white-space:pre-wrap;font-size:12px;font-family:ui-monospace,monospace;\n border:1px solid var(--ps-line);padding:10px;background:color-mix(in srgb,var(--ps-base) 80%,transparent);border-radius:9px; }\n.dshps-file-input { display:none; }\n@media (max-width:780px) { .dshps-grid[data-columns] {grid-template-columns:repeat(auto-fill,minmax(140px,1fr));}\n  .dshps-toolbar-main {flex-basis:100%;} .dshps-setting-item {align-items:flex-start;flex-direction:column;}\n  .dshps-card {min-height:153px;} .dshps-root {padding:7px 0 24px;} }\n@media (max-width:420px) { .dshps-grid {grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;}\n  .dshps-art-button,.dshps-avatar-slot {width:58px;height:58px;} .dshps-card-open {padding:14px 8px 10px;} }\n@media (prefers-contrast:more) { .dshps-root {--ps-opacity:100% !important;--ps-blur:0px !important;}\n .dshps-btn,.dshps-card,.dshps-panel { border-width:2px; } }\n@media (prefers-reduced-motion:reduce) { .dshps-root *, .dshps-root *::before, .dshps-root *::after { transition:none !important; animation:none !important; } }\n";
  let React, h, runtimeCtx;
  const DEFAULT = {
    schema: 1, revision: 0,
    preferences: {showBuiltin:false,showExperimental:false,sort:'custom',columns:'auto',source:'all',status:'all',surfacePercent:86,blur:12,highContrast:false},
    items: {}, history: {}
  };
  function clone(data) { return JSON.parse(JSON.stringify(data)); }
  function iconLabel(icon) { return {'settings':'⚙','search':'⌕','filter':'☷','left':'←','close':'×','refresh':'↻','pin':'⌁','check':'✓','export':'↓','import':'↑'}[icon] || '◦'; }
  function iconBtn(symbol, label, onClick, props) {
    return h('button',Object.assign({type:'button',className:'dshps-icon-btn',onClick,title:label,'aria-label':label},props||{}),iconLabel(symbol));
  }
  function btn(label, onClick, variant, extra) {
    return h('button',Object.assign({type:'button',className:'dshps-btn'+(variant?' dshps-'+variant:''),onClick},extra||{}),label);
  }
  function textOf(value) {
    if (typeof value === 'string') return value;
    if (!value || typeof value !== 'object') return '';
    return value.zh || value['zh-CN'] || value.en || value.default || Object.values(value).find(v=>typeof v==='string') || '';
  }
  function displayName(pkg, doc) {
    const custom = doc.items['bundle:'+pkg.name];
    if (custom && custom.title) return custom.title;
    return textOf(pkg.meta && pkg.meta.title) || pkg.name.replace(/^@[^/]+\//,'').replace(/^dsh-(?:agent-|plugin-)?/,'');
  }
  function displayDescription(pkg,doc) {
    const custom=doc.items['bundle:'+pkg.name];
    if (custom && custom.description) return custom.description;
    return textOf(pkg.meta && pkg.meta.description) || pkg.description || '';
  }
  function displayIcon(pkg,doc) {
    const custom=doc.items['bundle:'+pkg.name];
    const icon=custom && custom.icon;
    // Do not render javascript:, svg: or arbitrary data: URLs.
    if (icon && (/^https:\/\//.test(icon) || /^data:image\/(png|jpeg|webp);base64,/.test(icon))) return icon;
    const nativeIcon=pkg.meta && pkg.meta.icon;
    if (typeof nativeIcon === 'string' && (/^https?:\/\//.test(nativeIcon) || /^data:image\/(png|jpeg|webp);base64,/.test(nativeIcon) || /^\//.test(nativeIcon))) return nativeIcon;
    return '';
  }
  function isBuiltin(pkg) { return Boolean(pkg.official || pkg.availability === 'installation'); }
  function isExperimental(pkg) {
    // Optional bundle does not mean Experimental. Honor metadata when available.
    return Boolean(pkg.experimental || pkg.meta?.experimental || /^@deepseek-ai\/dsh-experimental-/.test(pkg.name) || /(?:^|[-/])experimental(?:$|[-/])/.test(pkg.name));
  }
  function sorted(bundles,doc) {
    const sort=doc.preferences.sort;
    return bundles.map((pkg,index)=>({pkg,index,key:'bundle:'+pkg.name})).sort((a,b)=>{
      const aa=doc.items[a.key]||{}, bb=doc.items[b.key]||{};
      if (!!aa.pinned !== !!bb.pinned) return aa.pinned?-1:1;
      if (sort === 'name') return displayName(a.pkg,doc).localeCompare(displayName(b.pkg,doc),'zh-CN');
      if (sort === 'status' && a.pkg.enabled !== b.pkg.enabled) return a.pkg.enabled?-1:1;
      if (sort === 'custom' && (aa.order||0)!==(bb.order||0)) return (aa.order||0)-(bb.order||0);
      return a.index-b.index;
    }).map(e=>e.pkg);
  }
  async function requestState(method, payload) {
    const res=await fetch(API,{method,headers:method==='POST'?{'Content-Type':'application/json'}:undefined,
      body:payload?JSON.stringify(payload):undefined,cache:'no-store',credentials:'same-origin'});
    const data=await res.json().catch(()=>({ok:false,error:'HTTP '+res.status}));
    if (!res.ok || !data.ok) throw Error(data.error||'HTTP '+res.status);
    return data.value;
  }
  function checkAnswer(answer,label) {
    if (!answer || answer.ok !== true) throw Error((answer&&answer.error&&answer.error.message)||label+'：远程服务不可用');
    return answer.value;
  }
  function ensureCss() {
    if (document.getElementById('dsh-plugin-studio-css')) return;
    const style=document.createElement('style');style.id='dsh-plugin-studio-css';style.textContent=CSS;document.head.appendChild(style);
  }
  function avatarNode(pkg,doc,extraClass) {
    const src=displayIcon(pkg,doc);
    if (src) return h('img',{className:'dshps-avatar'+(extraClass?' '+extraClass:''),src,alt:'',loading:'lazy',onError:e=>{e.currentTarget.style.display='none';}});
    return h('span',{className:'dshps-fallback-avatar','aria-hidden':true},(displayName(pkg,doc)||'P').charAt(0).toUpperCase());
  }
  async function imageFileToData(file) {
    if (!file || !['image/png','image/jpeg','image/webp'].includes(file.type)) throw Error('只支持 PNG/JPEG/WebP 图片');
    if (file.size > 8*1024*1024) throw Error('图片大小不能超过 8MB');
    const src=URL.createObjectURL(file);
    try {
      const img=await new Promise((resolve,reject)=>{
        const im=new Image(); im.onload=()=>resolve(im); im.onerror=()=>reject(Error('无法读取图片')); im.src=src;
      });
      const scale=Math.min(256/img.width,256/img.height,1);
      const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      let output=canvas.toDataURL('image/webp',.79);
      if (!output.startsWith('data:image/webp')) output=canvas.toDataURL('image/png');
      if (output.length > 240000) throw Error('压缩后的头像仍然太大，请换小一点的图片');
      return output;
    } finally { URL.revokeObjectURL(src); }
  }
  function Field(label,value,onChange,kind,extra) {
    return h('div',{className:'dshps-field'},
      h('label',null,label),
      kind==='textarea'?h('textarea',{value,onChange:e=>onChange(e.target.value),rows:3}):
      h('input',Object.assign({type:kind||'text',value,onChange:e=>onChange(e.target.value)},extra||{})));
  }
  function RangeSetting({label,suffix,value,min,max,step,onCommit}) {
    const [draft,setDraft]=React.useState(value);
    const last=React.useRef(value);
    React.useEffect(()=>{setDraft(value);last.current=value;},[value]);
    const commit=raw=>{const n=Number(raw);if(n!==last.current){last.current=n;onCommit(n);}};
    return h('div',{className:'dshps-field'},
      h('label',null,label+' · '+draft+suffix),
      h('input',{type:'range',min,max,step,value:draft,
        onChange:e=>setDraft(Number(e.target.value)),
        onPointerUp:e=>commit(e.currentTarget.value),
        onKeyUp:e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown'].includes(e.key))commit(e.currentTarget.value);},
        onBlur:e=>commit(e.currentTarget.value)}));
  }
  function Editor({pkg,doc,onClose,onSave,busy}) {
    const old=doc.items['bundle:'+pkg.name]||{};
    const [title,setTitle]=React.useState(old.title||'');
    const [description,setDescription]=React.useState(old.description||'');
    const [category,setCategory]=React.useState(old.category||'');
    const [icon,setIcon]=React.useState(old.icon||'');
    const [pinned,setPinned]=React.useState(!!old.pinned);
    const [error,setError]=React.useState('');
    const fileRef=React.useRef(null);
    const onFile=async e=>{
      try {setError('');const file=e.target.files&&e.target.files[0];if(file)setIcon(await imageFileToData(file));}
      catch(err){setError(err.message);} finally {if(e.target)e.target.value='';}
    };
    const save=()=>{
      onSave(pkg.name,{title:title.trim(),description:description.trim(),category:category.trim(),icon,
        pinned,order:Number.isInteger(old.order)?old.order:0});
    };
    React.useEffect(()=>{
      const listener=e=>{if(e.key==='Escape')onClose();};document.addEventListener('keydown',listener);
      return ()=>document.removeEventListener('keydown',listener);
    },[onClose]);
    return h('div',{className:'dshps-backdrop',onMouseDown:e=>{if(e.target===e.currentTarget)onClose();}},
      h('div',{className:'dshps-dialog',role:'dialog','aria-modal':'true','aria-label':'编辑插件外观'},
        h('div',{className:'dshps-dialog-head'},h('h3',null,'编辑插件外观'),iconBtn('close','关闭',onClose)),
        h('p',{className:'dshps-hint'},'真实身份：'+pkg.name+' · v'+(pkg.version||'—')),
        h('div',{className:'dshps-row',style:{margin:'14px 0'}},
          icon?h('img',{src:icon,className:'dshps-avatar',alt:'预览'}):avatarNode(pkg,doc),
          btn('选择头像',()=>fileRef.current&&fileRef.current.click()),
          btn('清除自定义头像',()=>setIcon(''),'tiny',{disabled:!icon}),
          h('input',{type:'file',accept:'image/png,image/jpeg,image/webp',onChange:onFile,ref:fileRef,className:'dshps-file-input'})
        ),
        Field('显示名称（留空则使用插件原名）',title,setTitle,'text',{maxLength:120,placeholder:displayName(pkg,{...doc,items:{}})}),
        Field('显示简介（留空则使用插件原简介）',description,setDescription,'textarea'),
        Field('自定义分类',category,setCategory,'text',{maxLength:60,placeholder:'例如：记忆 / 工具 / 娱乐'}),
        h('label',{className:'dshps-row',style:{marginTop:10}},h('input',{type:'checkbox',checked:pinned,onChange:e=>setPinned(e.target.checked)}),'置顶显示'),
        error?h('p',{style:{color:'var(--ps-danger)'},role:'alert'},error):null,
        h('p',{className:'dshps-help'},'这些修改只影响本管理器的显示，不修改任何插件包和原始配置。'),
        h('div',{className:'dshps-dialog-foot'},btn('取消',onClose),btn('保存外观',save,'primary',{disabled:busy}))
      ));
  }
  function Studio({openPackage}) {
    const [bundles,setBundles]=React.useState([]);
    const [doc,setDoc]=React.useState(clone(DEFAULT));
    const docRef=React.useRef(doc);docRef.current=doc;
    const [loading,setLoading]=React.useState(true);
    const [storeReady,setStoreReady]=React.useState(false);
    const [error,setError]=React.useState('');
    const [query,setQuery]=React.useState('');
    const [filterOpen,setFilterOpen]=React.useState(false);
    const [popup,setPopup]=React.useState('');
    const [editor,setEditor]=React.useState('');
    const [view,setView]=React.useState('grid');
    const [settingsTab,setSettingsTab]=React.useState('appearance');
    const [busy,setBusy]=React.useState('');
    const saveQueue=React.useRef(Promise.resolve());
    const [saving,setSaving]=React.useState(false);
    const [notice,setNotice]=React.useState(null);
    const [updates,setUpdates]=React.useState({});
    const [checkInProgress,setCheckInProgress]=React.useState(false);
    const [progress,setProgress]=React.useState([]);
    const importRef=React.useRef(null);
    const [importMode,setImportMode]=React.useState('merge');
    const [settingsSearch,setSettingsSearch]=React.useState('');
    const updatesRef=React.useRef(updates);updatesRef.current=updates;
    const toast=(message,type)=>setNotice({message:String(message),type:type||'ok',at:Date.now()});
    React.useEffect(()=>{
      if(!notice)return;const t=setTimeout(()=>setNotice(null),5500);return()=>clearTimeout(t);
    },[notice]);
    const fetchBundles=React.useCallback(async()=>{
      const result=await runtimeCtx.remote.pluginManager.listBundles();
      setBundles(checkAnswer(result,'读取插件列表'));
    },[]);
    const fetchDoc=React.useCallback(async()=>{
      const result=await requestState('GET');setDoc(result);docRef.current=result;setStoreReady(true);
    },[]);
    React.useEffect(()=>{
      let live=true;
      Promise.allSettled([fetchBundles(),fetchDoc()]).then(results=>{
        if(!live)return;
        const problems=results.filter(r=>r.status==='rejected').map(r=>r.reason.message);
        if(problems.length)setError(problems.join('；'));
        setLoading(false);
      });
      const unsub=runtimeCtx.remote.$on&&runtimeCtx.remote.$on('plugin-manager/changed',()=>{void fetchBundles().catch(()=>{});});
      return()=>{live=false;if(typeof unsub==='function')unsub();};
    },[fetchBundles,fetchDoc]);
    // The original DSH Refresh button stays visible through CSS. Sync our grid after it is clicked.
    React.useEffect(()=>{
      const handler=e=>{
        const button=e.target&&e.target.closest&&e.target.closest('[data-plugin-toolbar] button');
        const label=button&&button.getAttribute('aria-label');
        if(label && /^(刷新|Refresh)$/i.test(label))setTimeout(()=>fetchBundles().catch(err=>toast(err.message,'error')),800);
      };
      document.addEventListener('click',handler,true);
      return()=>document.removeEventListener('click',handler,true);
    },[fetchBundles]);
    function persist(transform){
      if(!storeReady)return Promise.reject(Error('本地外观存储尚未连接'));
      // Queue fast successive edits rather than discarding a save or overwriting it.
      const job=saveQueue.current.then(async()=>{
        setSaving(true);
        try{
          const original=docRef.current;
          const proposed=transform(clone(original));
          const saved=await requestState('POST',{expectedRevision:original.revision,value:proposed});
          docRef.current=saved;setDoc(saved);return saved;
        }catch(err){
          if(/其他窗口/.test(err.message)){try{await fetchDoc();}catch{}}
          throw err;
        }finally{setSaving(false);}
      });
      saveQueue.current=job.catch(()=>{});
      return job;
    }
    async function saveItem(name,changes){
      try{await persist(d=>{d.items['bundle:'+name]=changes;return d;});setEditor('');setPopup('');toast('外观已经保存，更新插件不会覆盖这些设置。');}
      catch(err){toast('保存失败：'+err.message,'error');}
    }
    async function preference(field,value){
      try{await persist(d=>{d.preferences[field]=value;return d;});}
      catch(err){toast(err.message,'error');}
    }
    const shown=sorted(bundles.filter(pkg=>{
      if(!pkg.installed && pkg.availability==='missing')return false;
      const p=doc.preferences;
      if(isExperimental(pkg)){if(!p.showExperimental)return false;}
      else if(isBuiltin(pkg) && !p.showBuiltin)return false;
      if(p.source==='official' && !isBuiltin(pkg))return false;
      if(p.source==='third-party' && isBuiltin(pkg))return false;
      if(p.status==='enabled' && !pkg.enabled)return false;
      if(p.status==='disabled' && pkg.enabled)return false;
      const needle=query.trim().toLocaleLowerCase();
      return !needle || [pkg.name,displayName(pkg,doc),displayDescription(pkg,doc),doc.items['bundle:'+pkg.name]?.category||''].join(' ').toLocaleLowerCase().includes(needle);
    }),doc);
    const editorPkg=editor&&bundles.find(p=>p.name===editor);
    const settingsList=sorted(bundles.filter(p=>[p.name,displayName(p,doc)].join(' ').toLowerCase().includes(settingsSearch.toLowerCase())),doc);
    function closePop(){setPopup('');}
    function openDetail(pkg){closePop();if(typeof openPackage==='function')openPackage(pkg.name);else toast('当前版本暂不提供原生详情入口','error');}
    async function moveItem(name,delta){
      const list=sorted(bundles,doc);const i=list.findIndex(p=>p.name===name);const j=i+delta;
      if(j<0||j>=list.length)return;
      [list[i],list[j]]=[list[j],list[i]];
      try{await persist(d=>{list.forEach((p,idx)=>{
        const key='bundle:'+p.name;d.items[key]={title:'',description:'',category:'',icon:'',pinned:false,...(d.items[key]||{}),order:idx+1};
      });return d;});}catch(err){toast('排序失败：'+err.message,'error');}
    }
    async function checkUpdates(){
      if(checkInProgress)return updatesRef.current;
      setCheckInProgress(true);setProgress([]);
      const next={};
      try{
        const candidates=bundles.filter(p=>p.updatable && p.installed && p.name!==MODULE_ID);
        for(let i=0;i<candidates.length;i++){
          const pkg=candidates[i];setProgress(v=>[...v,`检查 ${i+1}/${candidates.length}：${pkg.name}`]);
          try{
            const list=checkAnswer(await runtimeCtx.remote.pluginManager.listVersions(pkg.name,{}),'检查版本');
            if(list.status==='listed'){
              const target=list.versions.find(v=>v.bundle&&!v.prerelease&&!v.deprecated&&!v.incompatible);
              next[pkg.name]={version:target?.version||'',registry:list.registry,all:list.versions,status:target?'available':'current'};
            }else next[pkg.name]={status:'error',error:list.reason};
          }catch(err){next[pkg.name]={status:'error',error:err.message};}
        }
        updatesRef.current=next;setUpdates(next);
        toast('版本检查完毕：'+Object.values(next).filter(v=>v.status==='available').length+' 个插件可更新');
        return next;
      }finally{setCheckInProgress(false);}
    }
    async function recordOldVersion(name,oldVersion,action){
      if(!oldVersion || !storeReady)return;
      try{await persist(d=>{
        const key='bundle:'+name;d.history[key]=[{version:oldVersion,at:new Date().toISOString(),action},...(d.history[key]||[]).filter(r=>r.version!==oldVersion)].slice(0,20);
        return d;
      });}catch(err){toast('版本操作完成，但历史记录保存失败：'+err.message,'error');}
    }
    async function runUpdate(pkg,target){
      const currentVersion=pkg.version;
      setBusy('update:'+pkg.name);
      try{
        const result=checkAnswer(await runtimeCtx.remote.pluginManager.updateBundle(pkg.name,target.version,{registry:target.registry,requestId:crypto.randomUUID()}),'更新插件');
        if(result.result?.application==='failed' || result.result?.error || result.restore)throw Error('更新未成功：'+(result.result?.error?.diagnostic||'官方管理器已尝试还原旧版本'));
        await recordOldVersion(pkg.name,currentVersion,'update');
        toast(pkg.name+' 已更新到 '+target.version+(result.result?.application==='restart-required'?'（需重启）':''));
        await fetchBundles();return true;
      }catch(err){toast(pkg.name+' 更新失败：'+err.message,'error');return false;}
      finally{setBusy('');}
    }
    async function updateOne(pkg){
      const info=updatesRef.current[pkg.name];
      if(!info || !info.version){toast('请先检查版本','error');return;}
      if(!window.confirm(`确定更新 ${pkg.name}：v${pkg.version||'?'} → v${info.version}？`))return;
      await runUpdate(pkg,info);
    }
    async function updateAll(){
      const map=Object.keys(updatesRef.current).length?updatesRef.current:await checkUpdates();
      const targets=bundles.filter(p=>map[p.name]?.status==='available' && p.name!==MODULE_ID);
      if(!targets.length){toast('没有符合条件的可更新插件');return;}
      if(!window.confirm(`确定依次更新 ${targets.length} 个插件？将使用 DSH 官方更新接口，某些插件需要重启。`))return;
      setProgress([]);let succeeded=0;
      for(const pkg of targets){setProgress(v=>[...v,'更新：'+pkg.name+' → '+map[pkg.name].version]);
        if(await runUpdate(pkg,map[pkg.name]))succeeded++;
      }
      toast(`批量更新完成：${succeeded}/${targets.length} 个成功`);
      await checkUpdates();
    }
    async function rollback(pkg,version){
      if(!pkg.updatable || !pkg.installed || pkg.name===MODULE_ID){toast('此插件不支持自动回退','error');return;}
      const old=pkg.version;
      if(!old || version===old)return;
      if(!window.confirm(`即将回退 ${pkg.name}\n${old} → ${version}\n\n会通过官方管理器先移除当前包、再安装历史版本；如失败会尝试装回 ${old}，但不能保证回滚过程中第三方插件的数据或配置完全恢复。确定继续吗？`))return;
      setBusy('rollback:'+pkg.name);setProgress([]);
      let removed=false;
      try{
        const rm=checkAnswer(await runtimeCtx.remote.pluginManager.removeBundle(pkg.name),'移除当前版本');
        if(rm.error || rm.application==='failed')throw Error(rm.error?.diagnostic||'DSH 不允许移除当前版本');
        removed=true;setProgress(v=>[...v,'已移除 '+old,'安装历史版本 '+version]);
        const install=checkAnswer(await runtimeCtx.remote.pluginManager.installBundle(`${pkg.name}@${version}`,{enabled:pkg.enabled,saveExact:true}),'安装历史版本');
        if(install.error || ['failed','cancelled'].includes(install.application))throw Error(install.error?.diagnostic||install.packageResult?.output||'旧版本安装失败');
        await recordOldVersion(pkg.name,old,'rollback');
        toast(`已回退 ${pkg.name} 到 ${version}${install.application==='restart-required'?'（需重启）':''}`);
      }catch(err){
        let restore='';
        if(removed){
          try{
            const backup=checkAnswer(await runtimeCtx.remote.pluginManager.installBundle(`${pkg.name}@${old}`,{enabled:pkg.enabled,saveExact:true}),'恢复原版本');
            restore=(!backup.error && backup.application!=='failed')?'；已尝试恢复原版本':'；自动恢复未成功，请用原生管理器处理';
          }catch(e){restore='；恢复原版本也失败：'+e.message;}
        }
        toast('回退失败：'+err.message+restore,'error');
      }finally{setBusy('');await fetchBundles().catch(()=>{});}
    }
    const anyBusy=!!busy||saving||checkInProgress;
    const backdropStyle={'--ps-opacity':doc.preferences.highContrast?'100%':doc.preferences.surfacePercent+'%',
      '--ps-blur':doc.preferences.highContrast?'0px':doc.preferences.blur+'px'};
    const filters=h('div',{className:'dshps-filter-wrap'},
      iconBtn('filter','筛选与排序',()=>setFilterOpen(!filterOpen),{'aria-expanded':filterOpen}),
      filterOpen?h('div',{className:'dshps-popover'},
        h('strong',null,'筛选与排序'),
        h('div',{className:'dshps-field'},h('label',null,'排序'),
          h('select',{value:doc.preferences.sort,onChange:e=>{void preference('sort',e.target.value);}},
            h('option',{value:'custom'},'自定义顺序 / 置顶'),h('option',{value:'name'},'名称'),h('option',{value:'status'},'启用状态'))),
        h('div',{className:'dshps-field'},h('label',null,'来源'),
          h('select',{value:doc.preferences.source,onChange:e=>void preference('source',e.target.value)},
            h('option',{value:'all'},'全部来源'),h('option',{value:'official'},'官方 / 内置'),h('option',{value:'third-party'},'第三方'))),
        h('div',{className:'dshps-field'},h('label',null,'运行状态'),
          h('select',{value:doc.preferences.status,onChange:e=>void preference('status',e.target.value)},
            h('option',{value:'all'},'全部状态'),h('option',{value:'enabled'},'已启用'),h('option',{value:'disabled'},'未启用'))),
        h('div',{className:'dshps-field'},h('label',null,'每行列数'),
          h('select',{value:doc.preferences.columns,onChange:e=>void preference('columns',e.target.value)},
            ['auto','3','4','5','6'].map(n=>h('option',{value:n,key:n},n==='auto'?'自动响应式':n+' 列')))),
        btn('关闭筛选',()=>setFilterOpen(false),'tiny')
      ):null);
    const toolbar=h('div',{className:'dshps-toolbar'},
      h('div',{className:'dshps-toolbar-main'},
        iconBtn('settings','打开插件工作室设置',()=>{closePop();setView('settings');setSettingsTab('appearance');}),
        h('input',{className:'dshps-search',value:query,onChange:e=>setQuery(e.target.value),placeholder:'搜索插件名称、包名、简介、分类…','aria-label':'搜索插件'}),filters),
      h('div',{className:'dshps-toolbar-switches'},
        h('button',{type:'button',className:'dshps-chip', 'data-on':doc.preferences.showBuiltin,
          'aria-pressed':doc.preferences.showBuiltin,onClick:()=>void preference('showBuiltin',!doc.preferences.showBuiltin)},
          (doc.preferences.showBuiltin?'◉':'○')+' 显示内置插件'),
        h('button',{type:'button',className:'dshps-chip','data-on':doc.preferences.showExperimental,
          'aria-pressed':doc.preferences.showExperimental,onClick:()=>void preference('showExperimental',!doc.preferences.showExperimental)},
          (doc.preferences.showExperimental?'◉':'○')+' 显示实验性插件')));
    const cards=h('div',{className:'dshps-grid','data-columns':doc.preferences.columns},shown.map(pkg=>{
      const opened=popup===pkg.name;
      return h('article',{className:'dshps-card',key:pkg.name,'data-enabled':pkg.enabled,'data-open':opened,draggable:doc.preferences.sort==='custom',
        onDragStart:e=>{e.dataTransfer.setData('text/plain',pkg.name);e.dataTransfer.effectAllowed='move';},
        onDragOver:e=>{if(doc.preferences.sort==='custom')e.preventDefault();},
        onDrop:e=>{if(doc.preferences.sort!=='custom')return;e.preventDefault();
          const from=e.dataTransfer.getData('text/plain');if(!from||from===pkg.name)return;
          const ordered=sorted(bundles,doc),i=ordered.findIndex(x=>x.name===from),j=ordered.findIndex(x=>x.name===pkg.name);
          if(i<0||j<0)return;const [item]=ordered.splice(i,1);ordered.splice(j,0,item);
          void persist(d=>{ordered.forEach((p,k)=>{const id='bundle:'+p.name;d.items[id]={title:'',description:'',category:'',icon:'',pinned:false,...d.items[id],order:k+1};});return d;}).catch(err=>toast(err.message,'error'));
        }},
        h('div',{className:'dshps-card-flags'},doc.items['bundle:'+pkg.name]?.pinned?h('span',{className:'dshps-pin',title:'置顶'},'◆'):null,h('span',{className:'dshps-dot'+(pkg.enabled?' on':''),title:pkg.enabled?'已启用':'已关闭'})),
        // Two independent native buttons: the avatar opens a popover; the rest opens DSH details.
        h('button',{className:'dshps-art-button',type:'button',
          onClick:()=>setPopup(opened?'':pkg.name),
          'aria-expanded':opened,'aria-label':'查看'+displayName(pkg,doc)+'的头像和编辑入口'},avatarNode(pkg,doc)),
        h('button',{className:'dshps-card-open',type:'button',onClick:()=>openDetail(pkg),title:'打开原生插件详情：'+pkg.name},
          h('span',{className:'dshps-avatar-slot','aria-hidden':true}),
          h('span',{className:'dshps-card-title'},displayName(pkg,doc)),
          h('span',{className:'dshps-card-sub'},doc.items['bundle:'+pkg.name]?.category||(isBuiltin(pkg)?'官方插件':'第三方插件')),
          h('span',{className:'dshps-card-desc'},displayDescription(pkg,doc)||'点击查看插件详情')),
        opened?h('div',{className:'dshps-popover dshps-avatar-pop'},
          h('strong',null,displayName(pkg,doc)),h('p',null,pkg.name+' · '+(pkg.version||'版本未知')),
          h('div',{className:'dshps-row'},btn('编辑名称 / 头像',()=>{setEditor(pkg.name);closePop();},'tiny'),btn('关闭',closePop,'tiny'))):null);
    }));
    function downloadAppearance(){
      const file={schema:1,exportedAt:new Date().toISOString(),preferences:doc.preferences,items:doc.items};
      const blob=new Blob([JSON.stringify(file,null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='dsh-plugin-studio-appearance.json';
      document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('外观配置已导出');
    }
    async function importAppearance(e){
      const file=e.target.files&&e.target.files[0];e.target.value='';if(!file)return;
      try{
        if(file.size>12*1024*1024)throw Error('JSON 文件不能超过 12MB');
        const parsed=JSON.parse(await file.text());
        if(parsed.schema!==1 || !parsed.items || typeof parsed.items!=='object' || Array.isArray(parsed.items)||
          !parsed.preferences || typeof parsed.preferences!=='object')throw Error('不是有效的外观导出文件');
        if(!window.confirm(`导入 ${Object.keys(parsed.items).length} 项插件外观？模式：${importMode==='merge'?'保留已有条目，导入时覆盖同名项':'替换所有现有外观'}。`))return;
        await persist(d=>{
          d.preferences={...d.preferences,...parsed.preferences};
          d.items=importMode==='replace'?parsed.items:{...d.items,...parsed.items};
          return d;
        });toast('外观导入完成');
      }catch(err){toast('导入失败：'+err.message,'error');}
    }
    async function clearOverrides(){
      if(!window.confirm('清空所有自定义名称、头像、简介、分类和顺序？不影响原始插件，也不会清除版本历史。'))return;
      try{await persist(d=>{d.items={};return d;});toast('已恢复所有插件的默认外观');}
      catch(err){toast(err.message,'error');}
    }
    const settingPages={
      appearance:()=>h('div',{className:'dshps-panel'},
        h('div',{className:'dshps-split'},h('div',null,h('h3',null,'编辑全部插件外观'),h('div',{className:'dshps-help'},'名称、头像、简介、分类独立保存；拖拽卡片或使用上下移动按钮调整顺序。')),
          h('input',{className:'dshps-textbox',placeholder:'查找要编辑的插件',value:settingsSearch,onChange:e=>setSettingsSearch(e.target.value),style:{maxWidth:210}})),
        settingsList.map(pkg=>h('div',{className:'dshps-setting-item',key:pkg.name},
          h('div',{className:'dshps-setting-item-info'},
            h('div',{style:{width:42,height:42,flex:'none',display:'grid',placeItems:'center',overflow:'hidden',borderRadius:10}},avatarNode(pkg,doc)),
            h('div',{style:{minWidth:0}},h('strong',null,displayName(pkg,doc)),h('small',null,pkg.name+' · '+(pkg.version||'—')))),
          h('div',{className:'dshps-actions'},btn('↑',()=>moveItem(pkg.name,-1),'tiny',{title:'上移',disabled:anyBusy}),
            btn('↓',()=>moveItem(pkg.name,1),'tiny',{title:'下移',disabled:anyBusy}),btn('编辑外观',()=>setEditor(pkg.name),'tiny'))))),
      versions:()=>h('div',{className:'dshps-panel'},
        h('h3',null,'插件版本管理'),
        h('p',{className:'dshps-help'},'更新复用 DSH 官方 listVersions / updateBundle。只检查独立安装的 npm 插件。回退仅对本管理器记录过旧版本的插件开放；Git、本地、内置及管理器自身不自动操作。'),
        h('div',{className:'dshps-row'},btn(checkInProgress?'检查中…':'检查全部更新',()=>void checkUpdates(),null,{disabled:anyBusy}),
          btn('一键更新全部可更新插件',()=>void updateAll(),'primary',{disabled:anyBusy})),
        h('div',{style:{marginTop:12}},bundles.filter(p=>p.installed).map(pkg=>{
          const info=updates[pkg.name],hist=(doc.history['bundle:'+pkg.name]||[]).find(r=>r.version!==pkg.version);
          const safe=!!pkg.updatable&&pkg.name!==MODULE_ID;
          return h('div',{key:pkg.name,className:'dshps-setting-item'},
            h('div',{className:'dshps-summary'},h('strong',null,displayName(pkg,doc)),
              h('div',{className:'dshps-version'},pkg.name+' · v'+(pkg.version||'—')),
              info?.status==='available'?h('span',{className:'dshps-tag'},'可更新 v'+info.version):null,
              info?.status==='error'?h('div',{className:'dshps-help'},info.error):null),
            h('div',{className:'dshps-actions'},
              safe&&info?.status==='available'?btn('更新到 v'+info.version,()=>void updateOne(pkg),'tiny',{disabled:anyBusy}):null,
              safe&&hist?btn('回退至 v'+hist.version,()=>void rollback(pkg,hist.version),'tiny',{disabled:anyBusy}):null,
              !safe?h('span',{className:'dshps-tag'},'仅原生管理'):null));
        })),
        progress.length?h('div',{className:'dshps-progress-list',role:'status'},progress.join('\n')):null),
      backups:()=>h('div',{className:'dshps-panel-grid'},
        h('section',{className:'dshps-panel'},
          h('h3',null,'导入 / 导出自定义外观'),
          h('p',{className:'dshps-help'},'文件包含昵称、头像、简介、分类、排序和界面偏好，不包含插件本体、凭据或版本历史。'),
          h('div',{className:'dshps-row'},btn('导出外观 JSON',downloadAppearance,'primary'),
            btn('选择 JSON 导入',()=>importRef.current?.click(),null,{disabled:anyBusy}),
            h('input',{type:'file',accept:'.json,application/json',className:'dshps-file-input',ref:importRef,onChange:e=>void importAppearance(e)})),
          h('div',{className:'dshps-field'},h('label',null,'导入模式'),h('select',{value:importMode,onChange:e=>setImportMode(e.target.value)},
            h('option',{value:'merge'},'合并：保留现有其他条目'),h('option',{value:'replace'},'替换：用导入文件覆盖外观'))),
          btn('恢复所有默认外观',()=>void clearOverrides(),'danger',{disabled:anyBusy}),
          h('div',{style:{marginTop:22,paddingTop:12,borderTop:'1px solid var(--ps-line)'}},
            h('h3',null,'临时打开原版插件配置'),
            h('p',{className:'dshps-help'},'当前卡片尚未覆盖所有原生独立设置项（例如子智能体、网页搜索）。需要时可暂时切回原生「已安装」。点击「插件工作室」标签便会重新隐藏原生列表。'),
            btn('打开原生已安装（临时）',()=>{
              const pair=findPluginTabs();
              if(!pair){toast('找不到原生标签组；请先返回插件工作室主界面再试','error');return;}
              document.body.setAttribute('data-dshps-legacy-mode','');
              pair.installed.click();
            },'tiny'))),
        h('section',{className:'dshps-panel'},
          h('h3',null,'壁纸 / 深浅色背景适配'),
          h('p',{className:'dshps-help'},'自动继承 DSH 当前主题颜色，壁纸由原页面透出；对卡片和浮窗添加透明度、模糊和对比度保护。'),
          h(RangeSetting,{label:'卡片背景不透明度',suffix:'%',min:55,max:100,step:1,value:doc.preferences.surfacePercent,onCommit:n=>void preference('surfacePercent',n)}),
          h(RangeSetting,{label:'壁纸模糊程度',suffix:'px',min:0,max:26,step:2,value:doc.preferences.blur,onCommit:n=>void preference('blur',n)}),
          h('label',{className:'dshps-row'},h('input',{type:'checkbox',checked:doc.preferences.highContrast,onChange:e=>void preference('highContrast',e.target.checked)}),'高对比度 / 实色卡片'),
          h('p',{className:'dshps-help'},'跟随 DSH 深色 / 浅色主题；系统开启增强对比度或减少动画时自动适配。')))
    };
    const main=view==='grid'?h(React.Fragment,null,toolbar,
      h('div',{className:'dshps-barline'},
        h('span',{className:'dshps-status'},'插件 '+shown.length+' / '+bundles.length+' · '+(storeReady?'外观已独立保存':'外观存储未连接')),
        h('span',{className:'dshps-hint'},'点头像查看编辑 · 点卡片其他位置进入插件')),
      error?h('div',{className:'dshps-panel',role:'alert'},'部分功能不可用：'+error):null,
      loading?h('div',{className:'dshps-blank'},'正在加载插件…'):
      shown.length?cards:h('div',{className:'dshps-blank'},'没有符合当前筛选条件的插件。\n可以开启「显示内置插件 / 实验性插件」试试。')):
    h(React.Fragment,null,
      h('div',{className:'dshps-settings-title'},iconBtn('left','返回卡片',()=>setView('grid')),h('h2',null,'插件工作室 · 设置')),
      h('div',{className:'dshps-settings-tabs',role:'tablist'},[
        ['appearance','插件外观'],['versions','更新与回退'],['backups','导入导出 / 背景']
      ].map(([key,label])=>btn(label,()=>setSettingsTab(key),null,{key,role:'tab','aria-selected':settingsTab===key}))),
      settingPages[settingsTab]());
    return h('div',{className:'dshps-root'+(doc.preferences.highContrast?' dshps-high-contrast':''),style:backdropStyle,'data-plugin-studio-root':'true'},
      main,
      editorPkg?h(Editor,{key:editorPkg.name,pkg:editorPkg,doc,onClose:()=>setEditor(''),onSave:saveItem,busy:!!busy}):null,
      notice?h('div',{className:'dshps-toast'+(notice.type==='error'?' error':''),role:'status',onClick:()=>setNotice(null)},notice.message):null);
  }
  /**
   * UI adapter for the DSH native Installed tab.  This is deliberately
   * text-aware: DSH's SegmentedTabs DOM/React ids differ across releases.
   * Only the Plugins page's own two known tab labels are considered.
   */
  function tabTextMatches(element, labels) {
    if (!element) return false;
    const text = String(element.textContent || '').replace(/\s+/g, ' ').trim();
    const aria = String(element.getAttribute?.('aria-label') || '').trim();
    return labels.includes(text) || labels.includes(aria);
  }
  function findPluginTabs() {
    if (typeof document.querySelectorAll !== 'function') return null;
    // The old DOM signatures are still recognized on builds which have them.
    for (const bar of document.querySelectorAll('[data-plugin-header-part="tabs"]')) {
      const studio = bar.querySelector('[id$="-plugin-studio"]');
      const installed = bar.querySelector('[id$="-installed"]');
      if (studio && installed) return {bar,studio,installed};
    }
    // Newer builds may use different generated ids.  Locate the *narrowest*
    // tab row containing exactly these labels rather than guessing ids.
    const controls = Array.from(document.querySelectorAll('button,[role="tab"]'));
    for (const studio of controls) {
      if (!tabTextMatches(studio,['插件工作室','Plugin Studio'])) continue;
      if (studio.closest?.('.dshps-root')) continue;
      let parent = studio.parentElement;
      for (let depth = 0; parent && depth < 5; depth++, parent=parent.parentElement) {
        if (parent === document.body || parent === document.documentElement) break;
        const siblings = Array.from(parent.querySelectorAll('button,[role="tab"]'));
        const installed = siblings.find(el=>el !== studio && tabTextMatches(el,['已安装','Installed']));
        if (!installed) continue;
        // Never mark the whole plugin page/header as a tab strip.
        const tablist = studio.closest?.('[role="tablist"]');
        const bar = (tablist && tablist.contains(installed)) ? tablist : parent;
        const count = bar.querySelectorAll('button,[role="tab"]').length;
        if (count >= 2 && count <= 6) return {bar,studio,installed};
        break;
      }
    }
    return null;
  }
  function tabIsSelected(el) {
    if (!el) return false;
    const selected = el.getAttribute?.('aria-selected');
    if (selected === 'true') return true;
    if (selected === 'false') return false;
    const state = el.getAttribute?.('data-state');
    if (state === 'active' || state === 'selected') return true;
    if (state === 'inactive') return false;
    return el.getAttribute?.('aria-current') === 'page';
  }
  function installPageReplacement() {
    if (typeof document.querySelectorAll !== 'function' || typeof MutationObserver !== 'function') return;
    if (typeof window.__dshPluginStudioStopReplacement === 'function') {
      window.__dshPluginStudioStopReplacement();
    }
    let scheduled = false;
    let redirectQueued = false;
    let observer;
    const tagged = new Set();
    const mark = (el,name,value) => {
      if (!el || typeof el.setAttribute !== 'function') return;
      if (el.getAttribute?.(name) !== value) el.setAttribute(name,value);
      tagged.add(el);
    };
    function onTabClick(event) {
      const el = event.target?.closest?.('[data-dshps-studio-tab]') || event.target?.closest?.('[id$="-plugin-studio"]');
      if ((el || tabTextMatches(event.target?.closest?.('button,[role="tab"]'),['插件工作室','Plugin Studio'])) && document.body) {
        document.body.removeAttribute('data-dshps-legacy-mode');
      }
    }
    function sync() {
      const pair = findPluginTabs();
      if (!pair) return;
      const {bar,studio,installed} = pair;
      mark(bar,'data-dshps-studio-tabs','');
      mark(studio,'data-dshps-studio-tab','');
      mark(installed,'data-dshps-native-installed','');
      const legacy = document.body?.hasAttribute('data-dshps-legacy-mode');
      if (legacy) {
        bar.removeAttribute?.('data-dshps-only-tab');
        return;
      }
      let controls = Array.from(bar.querySelectorAll?.('button,[role="tab"]') || []);
      if (!controls.length) controls = Array.from(bar.querySelectorAll?.('[role="tab"]') || []);
      const otherTabs = controls.filter(el=>el!==studio && el!==installed);
      const studioSelected = tabIsSelected(studio) || !!document.querySelector?.('.dshps-root');
      const only = otherTabs.length === 0 && studioSelected;
      if (only) mark(bar,'data-dshps-only-tab','');
      else bar.removeAttribute?.('data-dshps-only-tab');
      if (studioSelected) return;
      // A native detail, row, or official configuration must stay accessible.
      const scope = bar.closest?.('[data-plugin-body]') || document;
      if (scope.querySelector?.('[data-plugin-detail], [data-plugin-row-detail], [data-plugin-item-detail]')) return;
      // Do not steal Discover or any other contributed tab.
      const active = controls.find(tabIsSelected);
      if (active && active !== installed) return;
      const nativeList = !!(scope.querySelector?.('[data-plugin-package], [data-plugin-item], [data-plugin-loading], [data-plugin-group]')
        || scope.querySelector?.('[role="tabpanel"][id$="-installed-panel"]'));
      if (active !== installed && !nativeList) return;
      if (!redirectQueued && studio.isConnected !== false && !studio.disabled) {
        redirectQueued = true;
        try { studio.click(); } finally { redirectQueued = false; }
      }
    }
    function schedule() {
      if (scheduled) return;
      scheduled = true;
      Promise.resolve().then(()=>{scheduled=false;sync();});
    }
    const root = document.body || document.documentElement;
    if (!root) return;
    document.addEventListener?.('click',onTabClick,true);
    observer = new MutationObserver(schedule);
    observer.observe(root,{
      subtree:true,childList:true,attributes:true,
      attributeFilter:['aria-selected','aria-current','data-state','hidden']
    });
    const stop = () => {
      observer.disconnect();
      document.removeEventListener?.('click',onTabClick,true);
      document.body?.removeAttribute('data-dshps-legacy-mode');
      for (const el of tagged) {
        if (el.isConnected === false) continue;
        el.removeAttribute?.('data-dshps-studio-tabs');
        el.removeAttribute?.('data-dshps-studio-tab');
        el.removeAttribute?.('data-dshps-native-installed');
        el.removeAttribute?.('data-dshps-only-tab');
      }
      tagged.clear();
      if (window.__dshPluginStudioStopReplacement === stop) delete window.__dshPluginStudioStopReplacement;
    };
    window.__dshPluginStudioStopReplacement = stop;
    schedule();
  }
  const inject=['slots','remote','remote.pluginManager'];
  function apply(ctx) {
    runtimeCtx=ctx;
    ensureCss();
    installPageReplacement();
    ctx.slots.inject('plugins.tab',()=>ctx.slots.register({
      name:'plugins.tab',id:'plugin-studio',order:10,label:()=> '插件工作室',
    },({openPackage})=>h(Studio,{openPackage})));
  }
  if(!window.__ModuleLoader__ || !window.__ModuleLoader__.load) throw Error('DSH browser module loader is unavailable');
  window.__ModuleLoader__.load({id:MODULE_ID,factory:function(require){
    React=require('react');h=React.createElement;return {inject,apply};
  }});
}());
