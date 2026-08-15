import { useEffect, useRef, useState, type ReactNode } from "react"

/**
 * 滚动显现包装器
 * 元素进入视口时执行一次「上移 20px + 淡入」动画（0.6s），
 * 通过 delay 参数可以实现同组元素的错落入场
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  /** 入场延迟（毫秒） */
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // 只播一次，避免来回闪烁
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
