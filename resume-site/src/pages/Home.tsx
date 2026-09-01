import { Navbar } from "@/sections/Navbar"
import { Hero } from "@/sections/Hero"
import { Stats } from "@/sections/Stats"
import { About } from "@/sections/About"
import { Education } from "@/sections/Education"
import { Projects } from "@/sections/Projects"
import { Experience } from "@/sections/Experience"
import { Skills } from "@/sections/Skills"
import { Interests } from "@/sections/Interests"
import { Contact } from "@/sections/Contact"
import { Footer } from "@/sections/Footer"
import { BackToTop } from "@/components/BackToTop"

/**
 * 首页：单页简历
 * 区块顺序 = 首屏 → 关键数据 → 关于我 → 教育（含证书）→ 项目 → 经历 → 技能 → 兴趣 → 联系 → 页脚
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Education />
        <Projects />
        <Experience />
        <Skills />
        <Interests />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
