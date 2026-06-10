import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export function useCursorGlow() {
  const { isLight } = useTheme()
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (reduced || isTouch) return

    const dot = document.createElement('div')
    dot.id = 'cursor-dot'
    dot.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;width:8px;height:8px;border-radius:50%;transform:translate(-50%,-50%);opacity:0;transition:opacity 0.2s;'
    document.body.appendChild(dot)
    dotRef.current = dot

    const ring = document.createElement('div')
    ring.id = 'cursor-ring'
    ring.style.cssText = 'position:fixed;pointer-events:none;z-index:9998;width:36px;height:36px;border-radius:50%;transform:translate(-50%,-50%);opacity:0;transition:opacity 0.3s;'
    document.body.appendChild(ring)
    ringRef.current = ring

    function getAccentRGB() {
      return isLight ? '0,180,216' : '232,0,26'
    }

    function applyColors() {
      const rgb = getAccentRGB()
      dot.style.background = `rgba(${rgb},0.9)`
      dot.style.boxShadow = `0 0 8px rgba(${rgb},0.5)`
      ring.style.border = `1.5px solid rgba(${rgb},0.25)`
    }

    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    let visible = false

    function animate() {
      if (!visible) return
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      animRef.current = requestAnimationFrame(animate)
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        ringX = mouseX
        ringY = mouseY
        dot.style.opacity = '1'
        ring.style.opacity = '1'
        applyColors()
        animate()
      }
    }

    function onMouseLeave() {
      visible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    function onMouseOver(e: MouseEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) {
        dot.style.width = '12px'
        dot.style.height = '12px'
        ring.style.width = '44px'
        ring.style.height = '44px'
      }
    }

    function onMouseOut(e: MouseEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) {
        dot.style.width = '8px'
        dot.style.height = '8px'
        ring.style.width = '36px'
        ring.style.height = '36px'
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    applyColors()

    return () => {
      cancelAnimationFrame(animRef.current)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      if (dot.parentNode) dot.parentNode.removeChild(dot)
      if (ring.parentNode) ring.parentNode.removeChild(ring)
    }
  }, [isLight])
}
