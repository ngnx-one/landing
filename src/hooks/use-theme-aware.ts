"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function useThemeAware() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted ? 
    (theme === "dark" || (theme === "system" && resolvedTheme === "dark")) 
    : true // Default to dark during SSR

  return {
    isDarkMode,
    theme,
    resolvedTheme,
    mounted
  }
}
