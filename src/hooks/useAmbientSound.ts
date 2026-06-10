import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'

export function useAmbientSound() {
  const { isLight, ambient, setAmbient } = useTheme()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const saveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const getAudioPath = useCallback(() => {
    const file = isLight ? 'Color Your Night.mp3' : 'Beneath the Mask -rain-.mp3'
    return `/assets/music/${encodeURIComponent(file)}`
  }, [isLight])

  const getGifPath = useCallback(() => {
    return `/assets/music/${isLight ? 'p3.gif' : 'p5.gif'}`
  }, [isLight])

  const saveState = useCallback((playing: boolean, time: number) => {
    const data = { playing, time, theme: isLight ? 'light' : 'dark' }
    setAmbient(data)
    try { localStorage.setItem('ambient', JSON.stringify(data)) } catch {}
  }, [isLight, setAmbient])

  const stopSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (saveTimerRef.current) {
      clearInterval(saveTimerRef.current)
      saveTimerRef.current = null
    }
    const btn = document.getElementById('ambient-toggle')
    if (btn) btn.classList.remove('active')
    saveState(false, 0)
  }, [saveState])

  const startSound = useCallback((resumeTime = 0) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    const audio = new Audio(getAudioPath())
    audio.loop = true
    audio.volume = 0.15
    if (resumeTime > 0) audio.currentTime = resumeTime
    audioRef.current = audio
    audio.play().then(() => {
      const btn = document.getElementById('ambient-toggle')
      if (btn) btn.classList.add('active')
      if (saveTimerRef.current) clearInterval(saveTimerRef.current)
      saveTimerRef.current = setInterval(() => {
        saveState(true, audio.currentTime)
      }, 1000)
    }).catch(() => {
      stopSound()
    })
  }, [getAudioPath, saveState, stopSound])

  const toggleSound = useCallback(() => {
    if (audioRef.current) {
      stopSound()
    } else {
      startSound(0)
    }
  }, [stopSound, startSound])

  // Resume on mount if was playing
  useEffect(() => {
    if (ambient.playing && !audioRef.current) {
      startSound(ambient.time || 0)
    }
    return () => {
      // Properly stop audio on unmount so it doesn't keep playing
      if (saveTimerRef.current) {
        clearInterval(saveTimerRef.current)
        saveTimerRef.current = null
      }
      if (audioRef.current) {
        saveState(true, audioRef.current.currentTime)
        audioRef.current.pause()
        audioRef.current = null
      }
      const btn = document.getElementById('ambient-toggle')
      if (btn) btn.classList.remove('active')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle theme change while playing
  useEffect(() => {
    const btn = document.getElementById('ambient-toggle')
    if (!btn) return
    btn.style.backgroundImage = `url(${getGifPath()})`
  }, [isLight, getGifPath])

  // Set GIF on mount
  useEffect(() => {
    const btn = document.createElement('button')
    btn.id = 'ambient-toggle'
    btn.setAttribute('aria-label', 'Toggle ambient sound')
    btn.style.backgroundImage = `url(${getGifPath()})`
    btn.addEventListener('click', toggleSound)
    document.body.appendChild(btn)

    return () => {
      if (btn.parentNode) btn.parentNode.removeChild(btn)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for theme toggle to swap audio
  useEffect(() => {
    if (!audioRef.current) return
    const t = audioRef.current.currentTime
    stopSound()
    startSound(t)
  }, [isLight]) // eslint-disable-line react-hooks/exhaustive-deps

  // Save state before page unload
  useEffect(() => {
    function onBeforeUnload() {
      if (audioRef.current) {
        saveState(true, audioRef.current.currentTime)
      }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [saveState])
}
