'use client'

import { useEffect } from 'react'

export default function VConsoleInit() {
  useEffect(() => {
    // 动态加载 vConsole
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js'
    script.onload = () => {
      // @ts-ignore
      new window.VConsole()
    }
    document.body.appendChild(script)

    return () => {
      // 清理
      document.body.removeChild(script)
    }
  }, [])

  return null
}
