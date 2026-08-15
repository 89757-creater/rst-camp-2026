import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { about, profile } from "@/config"

/**
 * 关于我：不对称分栏
 * 左侧约 40% 为照片位（未配置照片时显示衬线姓氏字块），右侧为自述
 */
export function About() {
  return (
    <section id="about" className="scroll-anchor py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="About" title="关于我" />

        <div className="mt-12 grid gap-12 md:grid-cols-[2fr_3fr]">
          {/* 照片位：把照片放入 public/ 并在 config.ts 中设置 profile.photo 即可替换 */}
          <Reveal>
            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-primary">
              {profile.photo ? (
                <img
                  src={import.meta.env.BASE_URL + profile.photo}
                  alt={`${profile.name}的照片`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-serif text-[7rem] font-light text-primary-foreground">
                  {profile.name.charAt(0)}
                </span>
              )}
            </div>
          </Reveal>

          <div>
            {about.paragraphs.map((text, i) => (
              <Reveal key={i} delay={i * 120}>
                <p className="mb-5 leading-loose text-foreground/90">{text}</p>
              </Reveal>
            ))}
            <Reveal delay={360}>
              <ul className="mt-8 flex flex-wrap gap-3">
                {about.traits.map((trait) => (
                  <li
                    key={trait}
                    className="rounded-full border px-4 py-1.5 text-sm text-muted-foreground"
                  >
                    {trait}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
