import { ArrowDown } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { profile } from "@/config"

/**
 * 首屏：整屏高度，超大衬线姓名 + 编辑体宣言（跨行断句）
 * 各元素带 150ms 递增的错落入场
 */
export function Hero() {
  // 把宣言第二行中的关键词拆出来用衬线斜体感强调
  const [before, after] = profile.taglineBottom.split(profile.taglineAccent)

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Portfolio · 2026 · Hangzhou
          </p>
        </Reveal>

        <Reveal delay={150}>
          <h1 className="mt-8 font-serif font-light leading-none tracking-wider text-[clamp(3.5rem,12vw,8.5rem)]">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed md:text-2xl">
            {profile.taglineTop}，
            <br />
            {before}
            <span className="font-serif text-action">{profile.taglineAccent}</span>
            {after}
          </p>
        </Reveal>

        <Reveal delay={450}>
          <p className="mt-8 text-sm tracking-wide text-muted-foreground">
            {profile.school} · {profile.major} · {profile.grade}
          </p>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#about"
              className="flex h-12 items-center rounded-full bg-primary px-8 text-sm text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              了解我
            </a>
            <a
              href="#contact"
              className="flex h-12 items-center rounded-full border px-8 text-sm transition-colors duration-300 hover:bg-secondary"
            >
              联系我
            </a>
          </div>
        </Reveal>
      </div>

      {/* 底部滚动提示 */}
      <div className="absolute inset-x-0 bottom-10 flex justify-center text-muted-foreground">
        <ArrowDown size={18} aria-label="向下滚动" />
      </div>
    </section>
  )
}
