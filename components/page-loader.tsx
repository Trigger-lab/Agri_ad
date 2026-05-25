"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function PageLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  // Turn off loading once the new page loads (pathname or search params change)
  useEffect(() => {
    setLoading(false)
  }, [pathname, searchParams])

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const anchor = target.closest("a")

      if (anchor) {
        const href = anchor.getAttribute("href")
        const targetAttr = anchor.getAttribute("target")

        // Only trigger loader for internal page links
        if (
          href &&
          href.startsWith("/") &&
          !href.startsWith("/#") &&
          targetAttr !== "_blank" &&
          !event.defaultPrevented &&
          event.button === 0 && // Left clicks only
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey
        ) {
          // Compare with current path to avoid loading screen when clicking active link
          const currentUrl = window.location.pathname + window.location.search
          if (href !== currentUrl) {
            setLoading(true)
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300 animate-in fade-in">
      <div className="flex flex-col items-center gap-6">
        <div className="boxLoading"></div>
        <div className="text-emerald-800 dark:text-emerald-400 font-serif font-semibold tracking-wide text-sm mt-16 animate-pulse select-none">
          Loading Page...
        </div>
      </div>
    </div>
  )
}
