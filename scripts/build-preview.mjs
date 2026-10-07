// Builds the site and inlines its CSS and JS into one shareable preview page:
// dist-preview/labillois-preview.html
import { execSync } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'

execSync('npx vite build --outDir dist-preview/build --emptyOutDir', {
  stdio: 'inherit',
  env: { ...process.env, VITE_PREVIEW: '1' },
})

const assets = 'dist-preview/build/assets'
const files = readdirSync(assets)
const css = readFileSync(`${assets}/${files.find((f) => f.endsWith('.css'))}`, 'utf8')
const js = readFileSync(`${assets}/${files.find((f) => f.endsWith('.js'))}`, 'utf8').replace(/<\/script/gi, '<\\/script')

const html = `<title>Design by Labillois</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Italiana&family=Jost:wght@300;400;500&display=swap">
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`

mkdirSync('dist-preview', { recursive: true })
writeFileSync('dist-preview/labillois-preview.html', html)
console.log('Wrote dist-preview/labillois-preview.html')
