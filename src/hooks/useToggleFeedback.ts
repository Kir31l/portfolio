import { useEffect } from 'react'

export function useToggleFeedback() {
  useEffect(() => {
    const btn = document.querySelector('.theme-toggle') as HTMLElement | null
    if (!btn) return

    const b = btn!
    function handleClick() {
      b.style.transform = 'scale(0.85)'
      setTimeout(() => { b.style.transform = '' }, 150)
    }

    btn.addEventListener('click', handleClick)
    return () => btn.removeEventListener('click', handleClick)
  }, [])
}
