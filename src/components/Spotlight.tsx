import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { spotlightData } from '../data/projects'

const DRAG_THRESHOLD = 60

export default function Spotlight() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const total = spotlightData.length

  // Drag state refs (avoid stale closures)
  const dragRef = useRef({
    startX: 0,
    deltaX: 0,
    isDragging: false,
    wasDragged: false,
  })
  const currentRef = useRef(current)
  currentRef.current = current

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total)
  }, [total])

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 6000)
  }, [next])

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [next])

  // --- Drag / Swipe handlers ---
  const applyTransform = useCallback((delta: number, instant = false) => {
    const track = trackRef.current
    if (!track) return
    const base = -currentRef.current * 100
    track.style.transition = instant ? 'none' : ''
    track.style.transform = `translateX(calc(${base}% + ${delta}px))`
  }, [])

  const onDragStart = useCallback((clientX: number) => {
    const d = dragRef.current
    d.startX = clientX
    d.deltaX = 0
    d.isDragging = true
    d.wasDragged = false
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const onDragMove = useCallback((clientX: number) => {
    const d = dragRef.current
    if (!d.isDragging) return
    d.deltaX = clientX - d.startX
    if (Math.abs(d.deltaX) > 5) d.wasDragged = true
    applyTransform(d.deltaX, true)
  }, [applyTransform])

  const snapToCurrent = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    track.style.transition = ''
    // Force reflow so browser sees transition restored before transform changes
    void track.offsetHeight
    track.style.transform = `translateX(-${currentRef.current * 100}%)`
  }, [])

  const onDragEnd = useCallback(() => {
    const d = dragRef.current
    if (!d.isDragging) return
    d.isDragging = false

    if (d.wasDragged) {
      if (d.deltaX < -DRAG_THRESHOLD) next()
      else if (d.deltaX > DRAG_THRESHOLD) prev()
      else snapToCurrent()
    }

    d.deltaX = 0
    // Don't reset wasDragged here — click event fires after pointerup,
    // so handleCtaClick still needs to know it was a drag
    resetInterval()
  }, [next, prev, resetInterval, snapToCurrent])

  // Mouse events
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    onDragStart(e.clientX)
  }, [onDragStart])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    onDragMove(e.clientX)
  }, [onDragMove])

  const handlePointerUp = useCallback(() => {
    onDragEnd()
  }, [onDragEnd])

  const handlePointerLeave = useCallback(() => {
    const d = dragRef.current
    if (d.isDragging) onDragEnd()
  }, [onDragEnd])

  // Click guard: prevent link navigation when dragged
  const handleCtaClick = useCallback((e: React.MouseEvent, url: string, external?: boolean) => {
    if (dragRef.current.wasDragged) {
      e.preventDefault()
      return
    }
    if (external) {
      // External link — open in new tab
      return // let the <a> tag's native behavior handle it (target="_blank")
    }
    e.preventDefault()
    navigate(url)
  }, [navigate])

  return (
    <div
      className="spotlight"
      id="spotlight"
      onMouseEnter={() => { if (intervalRef.current) clearInterval(intervalRef.current) }}
      onMouseLeave={() => {
        const d = dragRef.current
        if (d.isDragging) onDragEnd()
        resetInterval()
      }}
    >
      <div
        className="spotlight-track"
        id="spotlight-track"
        ref={trackRef}
        style={{ transform: `translateX(-${current * 100}%)`, touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerLeave}
      >
        {spotlightData.map((p, i) => (
          <div className="spotlight-slide" key={i}>
            <div
              className="spotlight-slide-bg"
              style={{
                ...(p.img
                  ? {
                      backgroundImage: `url(${import.meta.env.DEV ? p.img : import.meta.env.BASE_URL.replace(/\/$/, '') + p.img})`,
                    }
                  : {
                      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                    }),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="spotlight-content">
              <div className="spotlight-badges">
                {p.badges.map((b, j) => (
                  <span key={j}>{b}</span>
                ))}
              </div>
              <h1 className="spotlight-title">{p.title}</h1>
              <p className="spotlight-desc">{p.desc}</p>
              <a
                className="spotlight-cta"
                href={p.url}
                target={p.external ? '_blank' : undefined}
                rel={p.external ? 'noopener noreferrer' : undefined}
                onClick={(e) => handleCtaClick(e, p.url, p.external)}
              >
                {'\u25B6'} {p.external ? 'Play on Itch.io' : 'View Project'}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="spotlight-controls">
        <div className="spotlight-indicators" id="spotlight-indicators">
          {spotlightData.map((_, i) => (
            <span
              key={i}
              className={i === current ? 'active' : ''}
              onClick={() => { goTo(i); resetInterval() }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
