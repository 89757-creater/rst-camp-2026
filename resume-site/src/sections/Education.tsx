import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { education } from "@/config"

/** 教育背景：左时间右内容的简洁双栏 */
export function Education() {
  return (
    <section id="education" className="scroll-anchor py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Education" title="教育背景" />

        <div className="mt-12 space-y-14">
          {education.map((item, i) => (
            <Reveal key={item.school} delay={i * 120}>
              <div className="grid gap-4 md:grid-cols-[1fr_3fr]">
                <p className="text-sm tracking-wide text-muted-foreground">
                  {item.period}
                </p>
                <div>
                  <h3 className="font-serif text-2xl font-light">
                    {item.school}
                  </h3>
                  <p className="mt-1 text-sm text-action">{item.degree}</p>
                  <p className="mt-4 max-w-2xl leading-loose text-foreground/85">
                    {item.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
