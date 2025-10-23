"use client"

import CardMentor from "@/components/home/components/CardMentor"
import { Mentor } from "@/types"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"

type Props = {
  data: Mentor[]
  pxPerSecond?: number
}

const MentorCarouselPlain = memo(function MentorCarouselPlain({ data, pxPerSecond = 60 }: Props) {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")

  const isMobile = deviceType === "mobile"
  const isTablet = deviceType === "tablet"

  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

  const loopData = useMemo(() => [...data, ...data], [data])

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLUListElement | null>(null)

  const offsetRef = useRef(0)
  const lastTsRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const playingRef = useRef(true)

  const cycleWidthRef = useRef(0)

  const draggingRef = useRef(false)
  const startXRef = useRef(0)
  const startOffsetRef = useRef(0)
  const velocityRef = useRef(0)
  const lastMoveTsRef = useRef(0)
  const lastMoveXRef = useRef(0)

  const pxPerMs = useMemo(() => {
    const baseSpeed = pxPerSecond / 1000
    return isMobile ? baseSpeed * 0.7 : baseSpeed
  }, [pxPerSecond, isMobile])

  const gapPx = useCallback((el: Element) => {
    const style = window.getComputedStyle(el.parentElement as Element)
    const gap = parseFloat(style.columnGap || "0")
    return isNaN(gap) ? 0 : gap
  }, [])

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    requestAnimationFrame(() => {
      const n = Math.max(data.length, 1)
      let width = 0
      for (let i = 0; i < n; i++) {
        const el = track.children[i] as HTMLElement | undefined
        if (el) {
          const rect = el.getBoundingClientRect()
          width += rect.width + gapPx(el)
        }
      }
      cycleWidthRef.current = width
    })
  }, [data.length, gapPx])

  const tick = useCallback(
    (ts: number) => {
      if (!trackRef.current) {
        rafRef.current = null
        return
      }
      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = ts - lastTsRef.current
      lastTsRef.current = ts

      if (!draggingRef.current) {
        const delta = (pxPerMs + velocityRef.current) * dt
        velocityRef.current *= 0.95
        if (Math.abs(velocityRef.current) < 0.0001) velocityRef.current = 0

        offsetRef.current -= delta
      }

      const cycle = cycleWidthRef.current || 1
      if (offsetRef.current <= -cycle) offsetRef.current += cycle
      if (offsetRef.current >= 0) offsetRef.current -= cycle

      trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`

      if (playingRef.current) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = null
      }
    },
    [pxPerMs],
  )

  const play = useCallback(() => {
    if (reducedMotion) return
    playingRef.current = true
    if (rafRef.current == null) {
      lastTsRef.current = null
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [reducedMotion, tick])

  const pause = useCallback(() => {
    playingRef.current = false
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastTsRef.current = null
    }
  }, [])

  const debouncedResize = useCallback(() => {
    let timeoutId: NodeJS.Timeout
    return () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const width = window.innerWidth
        const newDeviceType = width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop"
        setDeviceType(prev => (prev !== newDeviceType ? newDeviceType : prev))
      }, 100)
    }
  }, [])

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const newDeviceType = width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop"
      setDeviceType(newDeviceType)
    }

    checkDevice()
    const debouncedHandler = debouncedResize()
    window.addEventListener("resize", debouncedHandler)
    return () => {
      window.removeEventListener("resize", debouncedHandler)
    }
  }, [debouncedResize])

  const debouncedMeasure = useCallback(() => {
    let timeoutId: NodeJS.Timeout
    return () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(measure, 150)
    }
  }, [measure])

  useEffect(() => {
    measure()
    const debouncedMeasureHandler = debouncedMeasure()
    window.addEventListener("resize", debouncedMeasureHandler)
    if (!reducedMotion) play()

    const vis = () => (document.hidden ? pause() : play())
    document.addEventListener("visibilitychange", vis)

    return () => {
      window.removeEventListener("resize", debouncedMeasureHandler)
      document.removeEventListener("visibilitychange", vis)
      pause()
    }
  }, [measure, reducedMotion, debouncedMeasure, play, pause])

  const onMouseEnter = useCallback(() => pause(), [pause])
  const onMouseLeave = useCallback(() => play(), [play])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
      pause()
      draggingRef.current = true
      startXRef.current = e.clientX
      startOffsetRef.current = offsetRef.current
      lastMoveTsRef.current = performance.now()
      lastMoveXRef.current = e.clientX
    },
    [pause],
  )

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const dx = e.clientX - startXRef.current
    offsetRef.current = startOffsetRef.current + dx
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`
    }
    const now = performance.now()
    const dt = now - lastMoveTsRef.current
    if (dt > 0) velocityRef.current = (e.clientX - lastMoveXRef.current) / dt
    lastMoveTsRef.current = now
    lastMoveXRef.current = e.clientX
  }, [])

  const endDrag = useCallback(() => {
    if (!draggingRef.current) return
    draggingRef.current = false
    play()
  }, [play])

  return (
    <div className="relative w-full">
      <div
        ref={viewportRef}
        className="overflow-hidden touch-pan-y w-full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <ul
          ref={trackRef}
          className={`flex will-change-transform w-max mx-auto ${
            isMobile ? "gap-4 px-4" : isTablet ? "gap-5 px-6" : "gap-6 px-8"
          }`}
        >
          {loopData.map((m, idx) => (
            <CardMentor key={`${m.id}-${idx}`} m={m} idx={idx} isMobile={isMobile} isTablet={isTablet} />
          ))}
        </ul>
      </div>
    </div>
  )
})

export default MentorCarouselPlain
