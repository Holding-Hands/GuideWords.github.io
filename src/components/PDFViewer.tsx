'use client'

interface PDFViewerProps {
  pdfUrl: string
  title: string
  onBack: () => void
}

export default function PDFViewer({ pdfUrl, title, onBack }: PDFViewerProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            <a
              href={pdfUrl}
              download
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              下载
            </a>
          </div>
        </div>
      </header>

      {/* PDF Viewer */}
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto h-full">
          <iframe
            src={pdfUrl}
            className="w-full h-full min-h-[800px] rounded-lg shadow-lg bg-white"
            title={title}
          />
        </div>
      </main>
    </div>
  )
}
