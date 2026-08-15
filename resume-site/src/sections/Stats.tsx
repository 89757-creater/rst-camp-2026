import { Reveal } from "@/components/Reveal"
import { useCountUp } from "@/hooks/useCountUp"
import { stats } from "@/config"

/** 单个数据格：进入视口后数字滚动递增 */
function StatItem({
  value,
  suffix,
  label,
  note,
}: {
  value: number
  suffix: string
  label: string
  note: string
}) {
  const { ref, value: shown } = useCountUp(value)
  return (
    <div className="py-8 text-center">
      <p className="font-serif text-5xl font-light md:text-6xl">
        <span ref={ref}>{shown}</span>
        <span className="text-2xl text-action">{suffix}</span>
      </p>
      <p className="mt-3 text-sm tracking-wide">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  )
}

/** 关键数据带：上下细线夹住的一排滚动数字 */
export function Stats() {
  return (
    <section className="border-y">
      <div className="mx-auto grid max-w-5xl grid-cols-2 divide-border px-6 md:grid-cols-4 md:divide-x">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <StatItem {...s} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
