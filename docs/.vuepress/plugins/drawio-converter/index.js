const path = require('path')
const fs = require('fs')

const CHROME_PATHS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
]

function findChrome(custom) {
  if (custom && fs.existsSync(custom)) return custom
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p
  }
  return null
}

function buildRendererHtml(mxClientJs) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>body{margin:0;padding:0}#g{position:absolute;overflow:visible}</style>
</head>
<body>
<div id="g"></div>
<script>${mxClientJs}</script>
<script>
window.renderToSvg = function(xml) {
  try {
    var doc = mxUtils.parseXml(xml)

    // 提取 mxGraphModel（处理 <mxfile><diagram>... 包装）
    var model = doc.querySelector('mxGraphModel')
    if (!model) {
      var diag = doc.querySelector('diagram')
      if (diag) {
        model = mxUtils.parseXml(diag.textContent.trim()).querySelector('mxGraphModel')
      }
    }
    if (!model) return { error: 'mxGraphModel not found' }

    var container = document.getElementById('g')
    var graph = new mxGraph(container)
    graph.setEnabled(false)
    new mxCodec(model.ownerDocument).decode(model, graph.getModel())

    var bounds = graph.getGraphBounds()
    var scale = graph.view.scale
    var pad = 20
    var w = Math.ceil((bounds.width + 2 * pad) * scale)
    var h = Math.ceil((bounds.height + 2 * pad) * scale)

    var svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svgEl.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    svgEl.setAttribute('width', w)
    svgEl.setAttribute('height', h)
    svgEl.setAttribute('viewBox', '0 0 ' + w + ' ' + h)

    var gEl = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    gEl.setAttribute('transform',
      'scale(' + scale + ') translate(' + (pad - bounds.x) + ',' + (pad - bounds.y) + ')')
    svgEl.appendChild(gEl)

    var canvas = new mxSvgCanvas2D(gEl, false)
    var imgExport = new mxImageExport()
    imgExport.drawState(graph.getView().getState(graph.model.root), canvas)

    return { svg: new XMLSerializer().serializeToString(svgEl) }
  } catch (e) {
    return { error: e.message + '\\n' + e.stack }
  }
}
</script>
</body>
</html>`
}

module.exports = (options = {}, ctx) => ({
  name: 'vuepress-plugin-drawio-converter',

  async ready() {
    const drawioSrcDir = path.join(ctx.sourceDir, '.vuepress/drawio')
    const outputDir = path.join(ctx.sourceDir, '.vuepress/public/diagrams')

    if (!fs.existsSync(drawioSrcDir)) return

    const files = fs.readdirSync(drawioSrcDir).filter(f => f.endsWith('.drawio'))
    if (files.length === 0) return

    const chromePath = findChrome(options.chromePath || process.env.CHROME_PATH)
    if (!chromePath) {
      console.warn('[drawio-converter] 未找到 Chrome，跳过转换。')
      return
    }

    let puppeteer
    try {
      puppeteer = require('puppeteer-core')
    } catch (e) {
      console.warn('[drawio-converter] 未安装 puppeteer-core，请运行：npm install puppeteer-core --save-dev')
      return
    }

    let mxClientJs
    try {
      const mxClientPath = require.resolve('mxgraph/javascript/mxClient.min.js')
      mxClientJs = fs.readFileSync(mxClientPath, 'utf8')
    } catch (e) {
      console.warn('[drawio-converter] 未安装 mxgraph，请运行：npm install mxgraph --save-dev')
      return
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const html = buildRendererHtml(mxClientJs)

    console.log(`[drawio-converter] 使用 Chrome: ${chromePath}`)
    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    })

    try {
      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'domcontentloaded' })

      for (const file of files) {
        const inputFile = path.join(drawioSrcDir, file)
        const outputFile = path.join(outputDir, file.replace(/\.drawio$/, '.svg'))
        const xml = fs.readFileSync(inputFile, 'utf8')

        const result = await page.evaluate((xmlContent) => window.renderToSvg(xmlContent), xml)

        if (result.error) {
          console.error(`[drawio-converter] ✗ ${file}: ${result.error}`)
        } else {
          fs.writeFileSync(outputFile, result.svg, 'utf8')
          console.log(`[drawio-converter] ✓ ${file} → public/diagrams/${file.replace(/\.drawio$/, '.svg')}`)
        }
      }
    } finally {
      await browser.close()
    }
  },
})
