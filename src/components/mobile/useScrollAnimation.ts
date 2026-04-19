import { useEffect, useRef } from 'react'

const ENTER_OFFSET = 0.85  // animate in when top crosses 85% of viewport height
const EXIT_OFFSET = -0.15  // animate out when bottom is 15% above viewport top

const elements = new Set<HTMLElement>()
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const vh = window.innerHeight
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      // Element is "visible" when its top is above the enter line
      // AND its bottom is below the exit line
      const topVisible = rect.top < vh * ENTER_OFFSET
      const bottomVisible = rect.bottom > vh * EXIT_OFFSET
      if (topVisible && bottomVisible) {
        el.classList.add('animate-in')
      } else {
        el.classList.remove('animate-in')
      }
    })
    ticking = false
  })
}

let listenerCount = 0

function addElement(el: HTMLElement) {
  elements.add(el)
  if (listenerCount === 0) {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
  listenerCount++
}

function removeElement(el: HTMLElement) {
  elements.delete(el)
  listenerCount--
  if (listenerCount === 0) {
    window.removeEventListener('scroll', onScroll)
  }
}

export function useScrollAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    addElement(el)
    // Run once immediately to catch elements already in view
    onScroll()

    return () => removeElement(el)
  }, [])

  return ref
}
