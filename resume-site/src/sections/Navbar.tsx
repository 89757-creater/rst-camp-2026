import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import { profile } from "@/config"

/** 顶部锚点导航 */
const links = [
  { href: "#about", label: "关于" },
  { href: "#education", label: "教育" },
  { href: "#projects", label: "项目" },
  { href: "#experience", label: "经历" },
  { href: "#skills", label: "技能" },
  { href: "#contact", label: "联系" },
]

/**
 * 固定导航栏
 * 滚动超过 24px 后叠加毛玻璃底色与细分隔线
 */
export function Navbar() {
  const { dark, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      // rAF 节流，滚动事件密集时每帧最多更新一次
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight
        setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* 顶部全局滚动进度条（参考站动效，行动绿 2px） */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-action transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-serif text-lg tracking-widest"
          aria-label="回到顶部"
        >
          {profile.name}
        </a>

        <div className="flex items-center gap-1 md:gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          {/* 明暗主题切换 */}
          <button
            onClick={toggle}
            aria-label="切换明暗主题"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border transition-transform hover:scale-105"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
