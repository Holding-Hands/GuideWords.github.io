#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

console.log('👀 监控模式启动...')
console.log('💡 当检测到缓存问题时会自动清理并重启\n')

let devProcess = null
let restartCount = 0
const MAX_RESTARTS = 3

function cleanCache() {
  console.log('\n🧹 检测到缓存问题，正在清理...')
  
  const cachePaths = ['.next', 'node_modules/.cache']
  
  cachePaths.forEach(cachePath => {
    const fullPath = path.join(process.cwd(), cachePath)
    if (fs.existsSync(fullPath)) {
      try {
        fs.rmSync(fullPath, { recursive: true, force: true })
        console.log(`✅ 已清理: ${cachePath}`)
      } catch (error) {
        console.log(`⚠️  清理失败 ${cachePath}: ${error.message}`)
      }
    }
  })
  
  console.log('✨ 缓存清理完成\n')
}

function startDevServer() {
  console.log('🚀 启动开发服务器...\n')
  
  devProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, CLEAN_CACHE: 'false' }
  })
  
  devProcess.on('error', (error) => {
    console.error('❌ 服务器启动失败:', error)
    
    if (restartCount < MAX_RESTARTS) {
      restartCount++
      console.log(`\n🔄 尝试重启 (${restartCount}/${MAX_RESTARTS})...\n`)
      cleanCache()
      setTimeout(startDevServer, 2000)
    } else {
      console.error('\n❌ 达到最大重启次数，请手动检查问题')
      process.exit(1)
    }
  })
  
  devProcess.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.log(`\n⚠️  服务器异常退出 (代码: ${code})`)
      
      if (restartCount < MAX_RESTARTS) {
        restartCount++
        console.log(`🔄 尝试重启 (${restartCount}/${MAX_RESTARTS})...\n`)
        cleanCache()
        setTimeout(startDevServer, 2000)
      }
    }
  })
}

// 处理退出信号
process.on('SIGINT', () => {
  console.log('\n\n👋 正在关闭服务器...')
  if (devProcess) {
    devProcess.kill('SIGINT')
  }
  process.exit(0)
})

process.on('SIGTERM', () => {
  if (devProcess) {
    devProcess.kill('SIGTERM')
  }
  process.exit(0)
})

// 首次启动前清理缓存
cleanCache()
startDevServer()
