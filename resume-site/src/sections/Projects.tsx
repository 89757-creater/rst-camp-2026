import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { projects } from "@/config"

/**
 * 项目经历：编号分隔行
 * 整行悬停右移微交互；有链接的项目整行可点击，跳转到 GitHub
 */
export function Projects() {
  return (
    <section id="projects" className="scroll-anchor py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Projects" title="项目经历" />

        <ul className="mt-12">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <li>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group block border-b py-8 transition-transform duration-300 hover:translate-x-2"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="flex items-center gap-2 font-serif text-xl font-light md:text-2xl">
                      <span className="mr-2 text-sm text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p.name}
                      <ArrowUpRight
                        size={18}
                        className="text-action opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </h3>
                    <span className="shrink-0 text-xs tracking-wide text-muted-foreground">
                      {p.period}
                    </span>
                  </div>
                  <p className="mt-3 max-w-3xl pl-9 text-sm leading-relaxed text-muted-foreground">
                    {p.detail}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2 pl-9">
                    {p.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border px-3 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
