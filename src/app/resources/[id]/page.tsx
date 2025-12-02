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

export default function ResourceDetailPage({ params }: PageProps) {
  return <ResourceDetailClient params={params} />
}

