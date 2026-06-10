import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function usePageTransition() {
  const location = useLocation()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const overlay = document.createElement('div')
    overlay.id = 'page-transition'
    document.body.appendChild(overlay)

    // Cleanup overlay after mount
    overlay.classList.remove('active')

    // Intercept internal navigation
    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest('a')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return
      if (link.getAttribute('target') === '_blank') return
      // Let React Router handle it — just show flash
      overlay.classList.add('active')
      setTimeout(() => overlay.classList.remove('active'), reduced ? 50 : 350)
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay)
    }
  }, [location])
}
