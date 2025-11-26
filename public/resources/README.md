# PDF 资源文件夹

## 📁 使用说明

将 PDF 文件放在此目录下，即可在网站上访问。

## 🔧 添加 PDF 文件

### 步骤 1: 复制 PDF 文件到此目录

```bash
# Windows PowerShell
Copy-Item "D:\path\to\your\file.pdf" "public\resources\huxueyan.pdf"

# 或者直接拖拽文件到此文件夹
```

### 步骤 2: 更新资源列表

在 `src/app/resources/page.tsx` 中添加资源信息：

```typescript
const resources: Resource[] = [
  {
    id: 'unique-id',
    title: 'PDF 标题',
    description: 'PDF 描述',
    fileSize: '文件大小',
    pdfUrl: '/resources/filename.pdf', // 文件名要匹配
  },
]
```

## ⚠️ 重要提示

### 文件大小限制

- **GitHub Pages**: 单个文件不超过 100MB
- **Git 仓库**: 建议单个文件不超过 50MB
- **大文件处理**: 使用云存储（阿里云 OSS、腾讯云 COS 等）

### 当前文件

- `huxueyan.pdf` - 胡雪岩故居修复研究 (163 MB)
  - ⚠️ 此文件过大，已在 .gitignore 中排除
  - 建议使用云存储链接替代

## 🌐 使用云存储（推荐）

对于大文件，建议使用云存储：

1. 上传 PDF 到云存储
2. 获取公开访问链接
3. 在代码中使用 `externalUrl`：

```typescript
{
  id: 'huxueyan-restoration',
  title: '胡雪岩故居修复研究',
  pdfUrl: '', // 留空
  externalUrl: 'https://your-cdn.com/huxueyan.pdf', // 使用云存储链接
}
```

## 📱 移动端支持

PDF 查看器已支持：
- ✅ PC 端：浏览器内置查看器
- ✅ 移动端：Google Docs Viewer
- ✅ 下载功能
- ✅ 新窗口打开

## 🔗 访问方式

- 在线阅读：`http://localhost:3000/resources`
- 直接访问：`http://localhost:3000/resources/filename.pdf`
