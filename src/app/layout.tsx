import type { Metadata } from 'next'
import './globals.css'
import CopyProtection from '@/components/CopyProtection'

export const metadata: Metadata = {
  metadataBase: new URL('https://holding-hands.github.io'),
  title: {
    default: '华东导游词 - 在线浏览平台',
    template: '%s | 华东导游词'
  },
  description: '华东地区旅游景点导游词在线浏览平台，包含杭州、苏州、湖州等地著名景点的详细导游词，提供浙江导游考试资料、押题卷、技术书籍等学习资源',
  keywords: ['华东导游词', '浙江导游', '导游考试', '杭州景点', '苏州园林', '湖州景点', '导游面试', '押题卷', '在线阅读'],
  authors: [{ name: '谁人不识张公子' }],
  creator: '谁人不识张公子',
  publisher: '华东导游词在线浏览平台',
  icons: {
    icon: 'https://s3.bmp.ovh/imgs/2025/11/27/c09f0f0f73216b4f.png',
    apple: 'https://s3.bmp.ovh/imgs/2025/11/27/c09f0f0f73216b4f.png',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://holding-hands.github.io',
    title: '华东导游词 - 在线浏览平台',
    description: '华东地区旅游景点导游词在线浏览平台，包含杭州、苏州、湖州等地著名景点的详细导游词',
    siteName: '华东导游词',
    images: [{
      url: 'https://s3.bmp.ovh/imgs/2025/11/27/c09f0f0f73216b4f.png',
      width: 1200,
      height: 630,
      alt: '华东导游词在线浏览平台',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '华东导游词 - 在线浏览平台',
    description: '华东地区旅游景点导游词在线浏览平台',
    images: ['https://s3.bmp.ovh/imgs/2025/11/27/c09f0f0f73216b4f.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // 如果有 Google Search Console，可以添加验证码
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased select-none">
        <CopyProtection />
        {children}
      </body>
    </html>
  )
}
