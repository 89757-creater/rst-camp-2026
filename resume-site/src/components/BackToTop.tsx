import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

/**
 * 返回顶部：滚动超过 400px 后浮现的圆形按钮（参考站动效）
 */
export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="返回顶部"
      className={`fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full border bg-background/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-secondary ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={16} />
    </button>
  )
}
