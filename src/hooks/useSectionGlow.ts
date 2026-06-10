import { useEffect } from 'react'

export function useSectionGlow() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    function handleMove(e: MouseEvent) {
      const el = e.currentTarget as HTMLElement
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1)
      el.style.setProperty('--mouse-x', `${x}%`)
      el.style.setProperty('--mouse-y', `${y}%`)
    }

    const elements = document.querySelectorAll<HTMLElement>('section, .cert-card')
    elements.forEach(el => el.addEventListener('mousemove', handleMove))
    return () => elements.forEach(el => el.removeEventListener('mousemove', handleMove))
  }, [])
}
