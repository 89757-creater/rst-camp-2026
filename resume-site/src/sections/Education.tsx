import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { certificates, education } from "@/config"

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

        {/* 专业证书 */}
        <Reveal delay={200}>
          <div className="mt-16">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Certificates
            </p>
            <ul className="mt-6 space-y-4">
              {certificates.map((c) => (
                <li
                  key={c.name}
                  className="flex flex-wrap items-baseline gap-x-4 border-b pb-4"
                >
                  <span className="font-serif text-lg font-light">{c.name}</span>
                  <span className="text-sm text-action">{c.issuer}</span>
                  <span className="text-xs text-muted-foreground">{c.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
