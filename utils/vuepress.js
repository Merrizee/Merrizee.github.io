// VuePress 1 使用 Webpack 4，Node 22 下需要旧版 OpenSSL 支持。
const { spawnSync } = require('child_process')

const command = process.argv[2]
if (!['dev', 'build'].includes(command)) {
  console.error('用法：node utils/vuepress.js <dev|build> [VuePress 参数]')
  process.exit(1)
}

const nodeOptions = process.env.NODE_OPTIONS || ''
const result = spawnSync(process.execPath, [
  '--max-old-space-size=4096',
  require('path').join(require('path').dirname(require.resolve('vuepress')), 'cli.js'),
  command,
  'docs',
  ...process.argv.slice(3)
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_OPTIONS: nodeOptions.includes('--openssl-legacy-provider')
      ? nodeOptions
      : `${nodeOptions} --openssl-legacy-provider`.trim()
  }
})

if (result.error) console.error(result.error.message)
process.exit(result.status === null ? 1 : result.status)
