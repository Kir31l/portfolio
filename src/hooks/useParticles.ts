import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export function useParticles() {
  const { isLight } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const canvas = document.createElement('canvas')
    canvas.id = 'particle-canvas'
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;'
    document.body.prepend(canvas)
    canvasRef.current = canvas

    const ctx = canvas.getContext('2d')!
    type Particle = {
      x: number; y: number; size: number
      speedX: number; speedY: number
      opacity: number; life: number; maxLife: number
      hue: number; sat: number; lightVal: number; pulse: number
    }
    let particles: Particle[] = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createParticle(): Particle {
      const light = isLight
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * (light ? 0.25 : 0.5),
        speedY: -(Math.random() * (light ? 0.35 : 0.7) + 0.2),
        opacity: Math.random() * 0.4 + 0.15,
        life: 0,
        maxLife: Math.random() * 180 + 120,
        hue: light ? 195 + Math.random() * 25 : 0 + Math.random() * 18,
        sat: light ? 75 : 88,
        lightVal: light ? 60 + Math.random() * 20 : 48 + Math.random() * 20,
        pulse: Math.random() * Math.PI * 2,
      }
    }

    function update() {
      const count = isLight ? 20 : 30
      while (particles.length < count) particles.push(createParticle())
      if (particles.length > count) particles.length = count

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY
        p.life++
        p.pulse += 0.025

        const lifeRatio = p.life / p.maxLife
        let fade = p.opacity
        if (lifeRatio > 0.7) fade *= (1 - lifeRatio) / 0.3
        const pulseOpacity = fade * (0.65 + 0.35 * Math.sin(p.pulse))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},${p.sat}%,${p.lightVal}%,${pulseOpacity})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},${p.sat}%,${p.lightVal}%,${pulseOpacity * 0.12})`
        ctx.fill()

        if (p.life > p.maxLife || p.y < -20 || p.x < -30 || p.x > canvas.width + 30) {
          particles[i] = createParticle()
        }
      }

      animRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('resize', resize)
    resize()
    update()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [isLight])
}
