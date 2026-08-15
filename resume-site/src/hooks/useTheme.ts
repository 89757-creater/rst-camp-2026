import { useEffect, useState } from "react"

/**
 * 明暗主题切换
 * - 首次访问跟随系统偏好，之后记住用户选择（localStorage）
 * - 通过切换 <html> 上的 .dark 类名驱动 Tailwind darkMode: "class"
 */
export function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  return { dark, toggle: () => setDark((d) => !d) }
}
