import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { skills } from "@/config"

/**
 * 专业技能：编号分隔行
 * 悬停时整行轻微右移，是无页面加载动画之外的克制微交互
 */
export function Skills() {
  return (
    <section id="skills" className="scroll-anchor py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Skills" title="专业技能" />

        <ul className="mt-12">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 100}>
              <li className="group flex items-baseline gap-6 border-b py-7 transition-transform duration-300 hover:translate-x-2">
                <span className="font-serif text-sm text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-serif text-2xl font-light">
                    {skill.name}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    {skill.detail}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
