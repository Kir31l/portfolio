import { useEffect } from 'react'

export function useMobileSidebar() {
  useEffect(() => {
    const sidebar = document.querySelector('.sidebar') as HTMLElement | null
    if (!sidebar) return

    const toggle = document.createElement('button')
    toggle.id = 'sidebar-toggle'
    toggle.setAttribute('aria-label', 'Toggle navigation')
    toggle.innerHTML = '\u2630'
    document.body.appendChild(toggle)

    const overlay = document.createElement('div')
    overlay.id = 'sidebar-overlay'
    document.body.appendChild(overlay)

    const sb = sidebar!

    function open() {
      sb.classList.add('open')
      overlay.classList.add('active')
      document.body.style.overflow = 'hidden'
    }

    function close() {
      sb.classList.remove('open')
      overlay.classList.remove('active')
      document.body.style.overflow = ''
    }

    toggle.addEventListener('click', () => {
      if (sb.classList.contains('open')) close()
      else open()
    })

    overlay.addEventListener('click', close)

    function onNavClick(e: Event) {
      const el = e.target as HTMLElement
      if (el.hasAttribute('data-copy') || (el.tagName === 'A' && el.getAttribute('target') !== '_blank')) {
        setTimeout(close, 100)
      } else if (el.tagName === 'A' || el.hasAttribute('data-copy')) {
        close()
      }
    }

    sidebar.querySelectorAll('a, span[data-copy]').forEach(el => {
      el.addEventListener('click', onNavClick)
    })

    return () => {
      if (toggle.parentNode) toggle.parentNode.removeChild(toggle)
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay)
    }
  }, [])
}
