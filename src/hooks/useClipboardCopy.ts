import { useEffect, useRef } from 'react'

export function useClipboardCopy() {
  const toastRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const toast = document.createElement('div')
    toast.id = 'copy-toast'
    toast.textContent = 'COPIED'
    document.body.appendChild(toast)
    toastRef.current = toast

    function showToast() {
      toast.classList.remove('toast-show')
      void toast.offsetWidth
      toast.classList.add('toast-show')
      clearTimeout((toast as any)._timer)
      ;(toast as any)._timer = setTimeout(() => toast.classList.remove('toast-show'), 1400)
    }

    function handleClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest('[data-copy]') as HTMLElement | null
      if (!el) return
      const text = el.getAttribute('data-copy')
      if (!text) return

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(showToast)
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        showToast()
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      if (toast.parentNode) toast.parentNode.removeChild(toast)
    }
  }, [])
}
