import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  as?: 'section' | 'div'
  threshold?: number
}

export default function SectionReveal({
  children,
  className = '',
  style,
  as: Tag = 'section',
  threshold = 0.08,
}: SectionRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      el.classList.add('revealed')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  )
}
