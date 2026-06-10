import { useEffect } from 'react'

export function useIntersectionReveal(selector: string, threshold = 0.08) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    const elements = document.querySelectorAll<HTMLElement>(selector)
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [selector, threshold])
}
