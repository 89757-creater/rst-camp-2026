import { Mail, MessageCircle, Phone } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { profile } from "@/config"

/** 联系方式：居中 CTA + 三个联系入口 */
export function Contact() {
  const channels = [
    {
      icon: Mail,
      label: "邮箱",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    { icon: MessageCircle, label: "微信", value: profile.wechat },
    { icon: Phone, label: "电话", value: profile.phone },
  ]

  return (
    <section id="contact" className="scroll-anchor py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <SectionHeading eyebrow="Contact" title="与我联系" />

        <Reveal delay={150}>
          <p className="mx-auto mt-10 max-w-xl font-serif text-2xl font-light leading-relaxed md:text-3xl">
            期待与您进一步交流，
            <br />
            无论是<span className="text-action">学习</span>还是
            <span className="text-action">合作</span>。
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-10">
            {channels.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <Icon size={16} className="text-action" />
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm">{value}</span>
                </>
              )
              const cls =
                "flex items-center gap-2 rounded-full border px-6 py-3 transition-colors hover:bg-secondary"
              return href ? (
                <a key={label} href={href} className={cls}>
                  {inner}
                </a>
              ) : (
                <span key={label} className={cls}>
                  {inner}
                </span>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
