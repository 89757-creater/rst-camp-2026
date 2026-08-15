import { footer } from "@/config"

/** 页脚 */
export function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 text-xs text-muted-foreground md:flex-row">
        <p>{footer.copyright}</p>
        {/* 附加题入口：坦克大战小游戏 */}
        <a
          href="./tank.html"
          className="rounded-full border px-4 py-1.5 transition-colors hover:bg-secondary"
        >
          附加题作品 · 坦克大战 →
        </a>
        <p className="tracking-wide">{footer.builtWith}</p>
      </div>
    </footer>
  )
}
