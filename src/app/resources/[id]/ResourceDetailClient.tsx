'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PDFViewer from '@/components/PDFViewer'
import MarkdownViewer from '@/components/MarkdownViewer'
import DocViewer from '@/components/DocViewer'
import { withBasePath } from '@/config/site'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { resources, type Resource } from '@/data/resources'

interface PageProps {
  params: {
    id: string
  }
}

function ResourceDetailContent({ params }: PageProps) {
  const router = useRouter()
  const [resource, setResource] = useState<Resource | null>(null)

  useEffect(() => {
    // 根据 ID 查找资源
    const found = resources.find(r => r.id === params.id)
    if (found) {
      setResource(found)
    } else {
      // 如果找不到资源，返回列表页
      router.push('/resources')
    }
  }, [params.id, router])

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    )
  }

  const fileUrl = resource.externalUrl || withBasePath(resource.pdfUrl)
  const isMd = resource.pdfUrl.endsWith('.md')
  const isDoc = resource.pdfUrl.endsWith('.docx') || resource.pdfUrl.endsWith('.doc')

  const handleBack = () => {
    router.push('/resources')
  }

  if (isMd) {
    return (
      <MarkdownViewer
        mdUrl={fileUrl}
        title={resource.title}
        onBack={handleBack}
      />
    )
  }

  if (isDoc) {
    return (
      <DocViewer
        docUrl={fileUrl}
        title={resource.title}
        onBack={handleBack}
      />
    )
  }

  return (
    <PDFViewer
      pdfUrl={fileUrl}
      title={resource.title}
      fileSize={resource.fileSize}
      onBack={handleBack}
    />
  )
}

export default function ResourceDetailClient({ params }: PageProps) {
  return (
    <ThemeProvider>
      <ResourceDetailContent params={params} />
    </ThemeProvider>
  )
}
