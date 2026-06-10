import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToTop() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const btn = document.createElement('button')
    btn.id = 'scroll-top'
    btn.setAttribute('aria-label', 'Scroll to top')
    btn.innerHTML = '\u2191'
    document.body.appendChild(btn)

    let ticking = false
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          btn.classList.toggle('visible', window.scrollY > 300)
          ticking = false
        })
        ticking = true
      }
    }

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    })

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (btn.parentNode) btn.parentNode.removeChild(btn)
    }
  }, [])
}
