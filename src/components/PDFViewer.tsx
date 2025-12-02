'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'

interface PDFViewerProps {
  pdfUrl: string
  title: string
  fileSize?: string
  onBack: () => void
}

function PDFViewerContent({ pdfUrl, title, fileSize, onBack }: PDFViewerProps) {
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const [pdfError, setPdfError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [userConfirmed, setUserConfirmed] = useState(false)

  useEffect(() => {
    // 检测是否为移动设备
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // 检查文件大小，如果超过 20MB 显示警告（降低阈值，提升体验）
    if (fileSize) {
      const sizeMatch = fileSize.match(/(\d+(?:\.\d+)?)\s*(MB|KB|GB)/i)
      if (sizeMatch) {
        const size = parseFloat(sizeMatch[1])
        const unit = sizeMatch[2].toUpperCase()
        const sizeInMB = unit === 'GB' ? size * 1024 : unit === 'MB' ? size : size / 1024
        
        if (sizeInMB > 20) {
          setShowWarning(true)
          setIsLoading(false)
          return
        }
      }
    }
    setUserConfirmed(true)
  }, [fileSize])

  useEffect(() => {
    if (!userConfirmed) return
    
    // 根据文件大小调整加载时间
    let maxLoadTime = 3000 // 默认 3 秒
    if (fileSize) {
      const sizeMatch = fileSize.match(/(\d+(?:\.\d+)?)\s*(MB|KB|GB)/i)
      if (sizeMatch) {
        const size = parseFloat(sizeMatch[1])
        const unit = sizeMatch[2].toUpperCase()
        const sizeInMB = unit === 'GB' ? size * 1024 : unit === 'MB' ? size : size / 1024
        
        // 根据文件大小动态调整加载时间
        if (sizeInMB > 50) maxLoadTime = 10000
        else if (sizeInMB > 20) maxLoadTime = 6000
        else if (sizeInMB > 10) maxLoadTime = 4000
      }
    }
    
    setIsLoading(true)
    setLoadProgress(0)
    
    const timer1 = setTimeout(() => setLoadProgress(30), maxLoadTime * 0.1)
    const timer2 = setTimeout(() => setLoadProgress(60), maxLoadTime * 0.3)
    const timer3 = setTimeout(() => setLoadProgress(90), maxLoadTime * 0.6)
    const timer4 = setTimeout(() => {
      setIsLoading(false)
      setLoadProgress(100)
    }, maxLoadTime)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [pdfUrl, userConfirmed, fileSize])

  // 判断是否为外部链接
  const isExternalUrl = pdfUrl.startsWith('http://') || pdfUrl.startsWith('https://')
  
  // 构建完整的 PDF URL
  const getViewerUrl = () => {
    // 本地文件：添加 #toolbar=0 隐藏工具栏，提升体验
    // 外部链接：使用 Google Docs Viewer
    if (isExternalUrl) {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`
    }
    // 本地文件直接用浏览器内置查看器，添加参数优化显示
    return `${pdfUrl}#view=FitH&toolbar=1&navpanes=1`
  }

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 flex flex-col overflow-hidden transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50 flex-shrink-0 z-10 transition-colors duration-300">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">返回</span>
            </button>
            <h1 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white truncate flex-1 text-center px-2">
              {title}
            </h1>
            <div className="flex gap-2 flex-shrink-0">
              <a
                href={pdfUrl}
                download
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-xs sm:text-sm"
                title="下载 PDF"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline">下载</span>
              </a>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                title="在新窗口打开"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                新窗口
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* PDF Viewer - Full Screen */}
      <main className="flex-1 overflow-hidden">
        {showWarning && !userConfirmed ? (
          <div className="h-full flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 text-center max-w-lg transition-colors border border-gray-200 dark:border-gray-700">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">大文件提醒</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2">
                此文件大小为 <span className="font-bold text-yellow-600 dark:text-yellow-400">{fileSize}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                在线预览可能需要较长时间加载，建议下载到本地查看以获得最佳体验
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href={pdfUrl}
                  download
                  className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm sm:text-base font-medium"
                >
                  📥 下载到本地（推荐）
                </a>
                <button
                  onClick={() => {
                    setUserConfirmed(true)
                    setShowWarning(false)
                  }}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
                >
                  继续在线预览
                </button>
              </div>
            </div>
          </div>
        ) : isExternalUrl ? (
          <div className="h-full flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 text-center max-w-lg transition-colors border border-gray-200 dark:border-gray-700">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">大文件在线预览</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                此文件托管在 GitHub Releases，由于文件较大（155MB），建议下载到本地查看以获得最佳体验。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href={pdfUrl}
                  download
                  className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm sm:text-base"
                >
                  下载 PDF
                </a>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
                >
                  新窗口打开
                </a>
              </div>
            </div>
          </div>
        ) : pdfError ? (
          <div className="h-full flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 text-center max-w-md transition-colors border border-gray-200 dark:border-gray-700">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 dark:text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">无法加载 PDF</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">请尝试下载文件或在新窗口中打开</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href={pdfUrl}
                  download
                  className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm sm:text-base"
                >
                  下载 PDF
                </a>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
                >
                  新窗口打开
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-10">
                <div className="text-center max-w-md px-4">
                  <div className="mb-6">
                    <svg className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    正在加载 PDF...
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {fileSize ? `文件大小：${fileSize}` : '文件较大，请耐心等待'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                    使用浏览器内置 PDF 查看器
                  </p>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${loadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {loadProgress}%
                  </p>
                </div>
              </div>
            )}
            <iframe
              src={getViewerUrl()}
              className="w-full h-full border-0"
              title={title}
              onLoad={() => {
                setIsLoading(false)
                setLoadProgress(100)
              }}
              onError={() => {
                setPdfError(true)
                setIsLoading(false)
              }}
              allow="fullscreen"
            />
          </>
        )}
      </main>
    </div>
  )
}

export default function PDFViewer(props: PDFViewerProps) {
  return (
    <ThemeProvider>
      <PDFViewerContent {...props} />
    </ThemeProvider>
  )
}
