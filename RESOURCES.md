# 参考资料管理指南

## 📚 关于 PDF 文件

由于 GitHub Pages 和 Git 仓库对文件大小有限制，大型 PDF 文件（如 `胡雪岩故居修复研究.pdf` 163MB）不适合直接提交到仓库。

## 🔧 解决方案

### 方案 1：使用云存储（推荐）

将 PDF 文件上传到云存储服务，然后在网站中使用外部链接：

#### 1. 上传到云存储
- **阿里云 OSS**：https://oss.console.aliyun.com/
- **腾讯云 COS**：https://console.cloud.tencent.com/cos
- **七牛云**：https://portal.qiniu.com/
- **又拍云**：https://console.upyun.com/

#### 2. 获取公开访问链接
上传后获取文件的公开访问 URL，例如：
```
https://your-bucket.oss-cn-hangzhou.aliyuncs.com/resources/huxueyan.pdf
```

#### 3. 更新代码
在 `src/app/resources/page.tsx` 中更新 `externalUrl`：

```typescript
const resources: Resource[] = [
  {
    id: 'huxueyan-restoration',
    title: '胡雪岩故居修复研究',
    description: '高念华著 - 北京文物出版社',
    fileSize: '163 MB',
    pdfUrl: '', // 本地路径留空
    externalUrl: 'https://your-cloud-storage.com/huxueyan.pdf' // 使用云存储链接
  },
]
```

### 方案 2：使用 Git LFS（适合 GitHub）

如果必须使用 GitHub 托管：

1. **安装 Git LFS**
```bash
git lfs install
```

2. **追踪 PDF 文件**
```bash
git lfs track "*.pdf"
git lfs track "public/resources/*.pdf"
```

3. **提交文件**
```bash
git add .gitattributes
git add public/resources/
git commit -m "Add PDF resources with Git LFS"
git push
```

**注意**：GitHub LFS 有存储和带宽限制：
- 免费账户：1GB 存储 + 1GB/月带宽
- 付费账户：可购买额外配额

### 方案 3：本地开发使用

如果只在本地开发环境使用：

1. **创建 public/resources 目录**
```bash
mkdir public/resources
```

2. **复制 PDF 文件**
```bash
copy "资料\胡雪岩故居修复研究 -- 高念华著 --北京_文物出版社 .pdf" "public\resources\huxueyan.pdf"
```

3. **更新代码**
```typescript
pdfUrl: '/resources/huxueyan.pdf'
```

**注意**：此文件不会被提交到 Git（已在 .gitignore 中）

## 📝 添加新的 PDF 资料

在 `src/app/resources/page.tsx` 中添加新资源：

```typescript
const resources: Resource[] = [
  {
    id: 'unique-id',
    title: '资料标题',
    description: '资料描述',
    fileSize: '文件大小',
    pdfUrl: '/resources/filename.pdf', // 本地路径
    externalUrl: 'https://...', // 或使用外部链接
  },
  // ... 更多资源
]
```

## 🌐 在线阅读功能

网站提供两种 PDF 阅读方式：

1. **在线阅读**：使用浏览器内置 PDF 查看器
2. **下载阅读**：下载到本地使用专业 PDF 阅读器

## ⚠️ 注意事项

1. **文件大小**：建议单个 PDF 文件不超过 50MB
2. **版权问题**：确保有权分享这些资料
3. **访问速度**：云存储建议选择 CDN 加速
4. **文件命名**：使用英文和数字，避免特殊字符

## 🔗 相关文件

- PDF 查看器组件：`src/components/PDFViewer.tsx`
- 资源页面：`src/app/resources/page.tsx`
- 忽略配置：`.gitignore`
