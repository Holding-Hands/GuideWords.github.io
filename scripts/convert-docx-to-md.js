const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const sourceDir = path.join(__dirname, '../public/resources/浙江导游面试讲解词');
const outputDir = path.join(__dirname, '../public/resources/浙江导游面试讲解词-md');

// 创建输出目录
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 获取所有docx文件
const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.docx') && !file.startsWith('~$'));

console.log(`📄 找到 ${files.length} 个Word文档`);

// 转换每个文件
let converted = 0;
files.forEach(file => {
  const inputPath = path.join(sourceDir, file);
  const outputPath = path.join(outputDir, file.replace('.docx', '.md'));
  
  mammoth.convertToMarkdown({ path: inputPath })
    .then(result => {
      fs.writeFileSync(outputPath, result.value);
      converted++;
      console.log(`✅ 已转换: ${file} -> ${path.basename(outputPath)}`);
      
      if (converted === files.length) {
        console.log(`\n🎉 转换完成！共转换 ${converted} 个文件`);
      }
    })
    .catch(err => {
      console.error(`❌ 转换失败: ${file}`, err.message);
    });
});
