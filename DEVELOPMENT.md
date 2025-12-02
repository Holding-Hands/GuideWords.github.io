# 开发指南

## 常见问题解决方案

### 缓存问题（Cannot find module './xxx.js'）

这是 Next.js 开发服务器的常见缓存问题。我们提供了多种解决方案：

#### 方案 1：使用自动清理的开发模式（推荐）

```bash
npm run dev:clean
```

这会在启动前自动清理缓存。

#### 方案 2：使用监控模式

```bash
npm run dev:watch
```

这个模式会：
- 启动前自动清理缓存
- 监控服务器状态
- 检测到问题时自动重启
- 最多自动重启 3 次

#### 方案 3：手动清理缓存

```bash
npm run clean
npm run dev
```

或者一键清理并重新构建：

```bash
npm run rebuild
```

#### 方案 4：普通开发模式

```bash
npm run dev
```

注意：这个模式会在启动时自动清理 `.next` 缓存。

## 可用命令

### 开发命令

- `npm run dev` - 启动开发服务器（自动清理缓存）
- `npm run dev:clean` - 清理缓存后启动开发服务器
- `npm run dev:watch` - 监控模式，自动处理缓存问题

### 构建命令

- `npm run build` - 构建生产版本
- `npm run rebuild` - 清理缓存并重新构建

### 清理命令

- `npm run clean` - 清理所有缓存文件

### 其他命令

- `npm start` - 启动生产服务器
- `npm run export` - 导出静态文件

## 开发建议

1. **首次启动**：使用 `npm run dev:clean` 确保干净的环境
2. **遇到缓存问题**：使用 `npm run dev:watch` 自动处理
3. **构建前**：使用 `npm run rebuild` 确保构建成功
4. **日常开发**：使用 `npm run dev` 即可

## 缓存问题的原因

Next.js 的开发服务器会缓存编译结果以提高性能，但有时会导致：
- 模块引用错误
- 代码更新不生效
- 构建失败

我们的脚本会自动清理以下缓存：
- `.next/` - Next.js 构建缓存
- `node_modules/.cache/` - 依赖缓存
- `out/` - 输出目录

## 故障排除

如果问题仍然存在：

1. 停止所有 Node 进程
2. 删除 `node_modules` 文件夹
3. 重新安装依赖：`npm install`
4. 清理缓存：`npm run clean`
5. 重新构建：`npm run build`

## 性能优化

- 开发时使用 `npm run dev`（已优化启动速度）
- 构建前使用 `npm run rebuild`（确保构建成功）
- 遇到问题使用 `npm run dev:watch`（自动处理）
