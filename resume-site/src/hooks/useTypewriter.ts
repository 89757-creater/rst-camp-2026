import { useEffect, useRef, useState } from "react"

/** 是否偏好减少动态（系统级无障碍设置） */
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/**
 * 一次性打字机：挂载后把 text 逐字打出
 * 返回 { text: 已打出部分, done: 是否打完 }
 */
export function useTypeOnce(text: string, speed = 180, startDelay = 400) {
  const [len, setLen] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setLen(text.length)
      return
    }
    let i = 0
    const tick = () => {
      i += 1
      setLen(i)
      if (i < text.length) timer.current = setTimeout(tick, speed)
    }
    timer.current = setTimeout(tick, startDelay)
    return () => clearTimeout(timer.current)
  }, [text, speed, startDelay])

  return { text: text.slice(0, len), done: len >= text.length }
}

/**
 * 循环打字机：依次打出每个词 → 停留 → 逐字删除 → 下一个词
 * 参考 xjhip3.netlify.app 的 cycleRoles 节奏：打字 100ms/字，删除 40ms/字，停留 1600ms
 */
export function useCycleRoles(
  roles: string[],
  typeSpeed = 100,
  deleteSpeed = 40,
  holdTime = 1600
) {
  const [display, setDisplay] = useState("")
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (roles.length === 0) return
    if (prefersReducedMotion()) {
      setDisplay(roles[0])
      return
    }
    let roleIdx = 0
    let charIdx = 0
    let isDeleting = false

    const step = () => {
      const current = roles[roleIdx]
      if (isDeleting) {
        charIdx -= 1
        if (charIdx <= 0) {
          isDeleting = false
          roleIdx = (roleIdx + 1) % roles.length
          timer.current = setTimeout(step, 400)
          setDisplay("")
          return
        }
      } else {
        charIdx += 1
        if (charIdx > current.length) {
          isDeleting = true
          timer.current = setTimeout(step, holdTime)
          return
        }
      }
      setDisplay(current.substring(0, charIdx))
      timer.current = setTimeout(step, isDeleting ? deleteSpeed : typeSpeed)
    }
    timer.current = setTimeout(step, 1200) // 等首屏姓名打完再开始
    return () => clearTimeout(timer.current)
  }, [roles, typeSpeed, deleteSpeed, holdTime])

  return display
}
