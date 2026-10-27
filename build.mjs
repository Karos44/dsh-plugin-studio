import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises'
const base = new URL('./', import.meta.url)
await mkdir(new URL('./dist/', base), { recursive: true })
const template = await readFile(new URL('./src/client.template.js', base), 'utf8')
const styles = await readFile(new URL('./src/studio.css', base), 'utf8')
const marker = '/*__INJECT_STUDIO_CSS__*/'
if (!template.includes(marker)) throw new Error('Missing CSS injection marker')
await writeFile(new URL('./dist/client.js', base), template.replace(marker, JSON.stringify(styles)), 'utf8')
await copyFile(new URL('./src/host.js', base), new URL('./dist/index.js', base))
await copyFile(new URL('./src/store.js', base), new URL('./dist/store.js', base))
console.log('Built dist/client.js, dist/index.js, dist/store.js')
