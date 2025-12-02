const { networkInterfaces } = require('os')
const { spawn, execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// 清理缓存函数
function cleanCache() {
  const cachePaths = ['.next']
  let cleaned = false
  
  cachePaths.forEach(cachePath => {
    const fullPath = path.join(process.cwd(), cachePath)
    if (fs.existsSync(fullPath)) {
      try {
        fs.rmSync(fullPath, { recursive: true, force: true })
        console.log(`🧹 已清理缓存: ${cachePath}`)
        cleaned = true
      } catch (error) {
        // 忽略错误
      }
    }
  })
  
  if (cleaned) {
    console.log('✨ 缓存清理完成\n')
  }
}

// 获取本机局域网 IP
function getLocalIP() {
  const nets = networkInterfaces()
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address
      }
    }
  }
  return 'localhost'
}

// 检查是否需要清理缓存（通过环境变量控制）
if (process.env.CLEAN_CACHE !== 'false') {
  cleanCache()
}

const ip = getLocalIP()

console.log('🚀 启动开发服务器...\n')

// 启动 Next.js dev server
const next = spawn('npx', ['next', 'dev', '--hostname', '0.0.0.0'], {
  stdio: ['inherit', 'pipe', 'inherit'],
  shell: true
})

// 替换 Next.js 输出中的 0.0.0.0 为实际 IP
next.stdout.on('data', (data) => {
  const output = data.toString().replace(/0\.0\.0\.0/g, ip)
  process.stdout.write(output)
})

next.on('error', (err) => {
  console.error('Failed to start server:', err)
})
