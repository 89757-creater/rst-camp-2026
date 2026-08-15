import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { experience } from "@/config"

/** 实践经历：左侧竖线时间轴，节点圆点标记 */
export function Experience() {
  return (
    <section id="experience" className="scroll-anchor py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Experience" title="实践经历" />

        <ol className="relative mt-12 space-y-14 border-l pl-8">
          {experience.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <li className="relative">
                {/* 时间轴圆点 */}
                <span className="absolute -left-[2.55rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {item.period}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-light">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-action">{item.role}</p>
                <p className="mt-4 max-w-2xl leading-loose text-foreground/85">
                  {item.detail}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
