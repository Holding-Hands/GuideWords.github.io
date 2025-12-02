import { Metadata } from 'next'
import ResourceDetailClient from './ResourceDetailClient'
import { resources } from '@/data/resources'

interface PageProps {
  params: {
    id: string
  }
}

// 生成静态路径
export function generateStaticParams() {
  return resources.map((resource) => ({
    id: resource.id,
  }))
}

// 生成动态元数据
export function generateMetadata({ params }: PageProps): Metadata {
  const resource = resources.find(r => r.id === params.id)
  
  if (!resource) {
    return {
      title: '资源未找到 - 华东导游词',
      description: '抱歉，未找到该资源'
    }
  }

  const title = `${resource.title} - 华东导游词在线浏览平台`
  const description = `${resource.description} | ${resource.category}${resource.subCategory ? ` - ${resource.subCategory}` : ''} | 文件大小: ${resource.fileSize}`

  return {
    title,
    description,
    keywords: [
      resource.title,
      resource.category,
      resource.subCategory || '',
      resource.thirdCategory || '',
      '导游词',
      '导游考试',
      '浙江导游',
      '华东旅游',
      '在线阅读'
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://holding-hands.github.io/resources/${params.id}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default function ResourceDetailPage({ params }: PageProps) {
  return <ResourceDetailClient params={params} />
}

