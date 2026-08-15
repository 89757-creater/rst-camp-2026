import { Reveal } from "@/components/Reveal"
import { interests } from "@/config"

/** 兴趣爱好：一行轻盈的标签 */
export function Interests() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Interests
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {interests.map((item) => (
              <li key={item} className="font-serif text-xl font-light">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
