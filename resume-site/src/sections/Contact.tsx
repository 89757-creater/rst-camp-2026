import { useRef, useState } from "react"
import { Mail, MessageCircle, Phone } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { profile } from "@/config"

/**
 * 联系方式：居中 CTA + 三个联系入口
 * 点击任意入口复制到剪贴板，并弹出气泡提示（参考站 copyEmail + showBubble 动效）
 */
export function Contact() {
  const [toast, setToast] = useState("")
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const copy = (label: string, value: string) => {
    const show = (text: string) => {
      setToast(text)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setToast(""), 2200)
    }
    navigator.clipboard
      .writeText(value)
      .then(() => show(`${label}已复制：${value}`))
      .catch(() => show(`${label}：${value}`))
  }

  const channels = [
    { icon: Mail, label: "邮箱", value: profile.email },
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
            {channels.map(({ icon: Icon, label, value }) => (
              <button
                key={label}
                onClick={() => copy(label, value)}
                title={`点击复制${label}`}
                className="flex items-center gap-2 rounded-full border px-6 py-3 transition-colors hover:bg-secondary"
              >
                <Icon size={16} className="text-action" />
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm">{value}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            点击任意联系方式即可复制
          </p>
        </Reveal>
      </div>

      {/* 复制成功气泡提示 */}
      <div
        role="status"
        className={`fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground shadow-lg transition-all duration-300 ${
          toast
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {toast}
      </div>
    </section>
  )
}
