#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🧹 清理 Next.js 缓存...\n')

const pathsToClean = [
  '.next',
  'node_modules/.cache',
  'out'
]

pathsToClean.forEach(dirPath => {
  const fullPath = path.join(process.cwd(), dirPath)
  
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmSync(fullPath, { recursive: true, force: true })
      console.log(`✅ 已删除: ${dirPath}`)
    } catch (error) {
      console.log(`⚠️  无法删除 ${dirPath}: ${error.message}`)
    }
  } else {
    console.log(`ℹ️  不存在: ${dirPath}`)
  }
})

console.log('\n✨ 缓存清理完成！')
console.log('💡 提示: 运行 npm run build 重新构建项目\n')
