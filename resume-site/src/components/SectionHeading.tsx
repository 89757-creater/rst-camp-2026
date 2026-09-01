import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/Reveal"

/**
 * 章节标题：英文眉题（宽字距大写）+ 中文衬线大标题 + 细分隔线
 * 分隔线上的行动绿短线在进入视口时从左向右展开（参考站标题下划线动效）
 */
export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  const lineRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), 200)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Reveal>
      <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-3xl md:text-4xl font-light tracking-wide">
        {title}
      </h2>
      <div ref={lineRef} className="relative mt-6 h-px w-full bg-border">
        <span
          aria-hidden
          className="absolute left-0 top-0 h-px w-24 bg-action transition-transform duration-700 ease-out"
          style={{
            transformOrigin: "left",
            transform: inView ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </div>
    </Reveal>
  )
}
