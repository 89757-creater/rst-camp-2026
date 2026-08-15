import { Reveal } from "@/components/Reveal"

/**
 * 章节标题：英文眉题（宽字距大写）+ 中文衬线大标题 + 细分隔线
 */
export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <Reveal>
      <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-3xl md:text-4xl font-light tracking-wide">
        {title}
      </h2>
      <div className="mt-6 h-px w-full bg-border" />
    </Reveal>
  )
}
