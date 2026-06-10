import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export function useSysMessages() {
  const { isLight } = useTheme()

  useEffect(() => {
    const label = document.getElementById('topbar-label')
    if (!label) return

    const lb = label!
    const messages = {
      dark: [
        '// SYS: PORTFOLIO LOADED',
        '// SYS: PHANTOM THIEF ONLINE',
        '// SYS: AWAKE THE ARSENE',
        '// SYS: STEAL YOUR HEART',
        '// SYS: ALL-OUT ATTACK READY',
        '// SYS: VELVET ROOM SYNCED',
        '// SYS: PERSONA SUMMONED',
      ],
      light: [
        '// SYS: PORTFOLIO LOADED',
        '// SYS: DARK HOUR ACTIVE',
        '// SYS: SUMMONED PERSONA',
        '// SYS: TARTARUS DETECTED',
        '// SYS: FULL MOON OPERATION',
        '// SYS: SEES STANDING BY',
        '// SYS: ARCANE ENERGIES',
      ],
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let index = 0
    let interval: ReturnType<typeof setInterval>

    function cycle() {
      const list = isLight ? messages.light : messages.dark
      index = (index + 1) % list.length
      lb.textContent = list[index]
    }

    if (!reduced) interval = setInterval(cycle, 7000)

    return () => clearInterval(interval)
  }, [isLight])
}
