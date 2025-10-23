"use client"

import AutoScroll from "embla-carousel-auto-scroll"
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef } from "react"

/* ===== Types theo schema của bạn ===== */
type Keyword = { id: string; name: string }
export type Mentor = {
  id: string
  fullName: string
  academicTitle?: string | null
  workUnit?: string | null
  position?: string | null
  image?: string | null
  website?: string | null
  isActive?: boolean
  keywords?: Keyword[]
}

/* ===== Helpers ===== */
function avatarPlaceholder(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map(s => s[0]!.toUpperCase())
    .join("")
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'>
      <defs>
        <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0%' stop-color='#13294B'/>
          <stop offset='100%' stop-color='#2E8BC0'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle'
        font-family='Inter, Segoe UI, Roboto, Helvetica, Arial'
        font-size='200' fill='white' font-weight='800'>${initials}</text>
    </svg>`,
  )
  return `data:image/svg+xml,${svg}`
}

function displayName(fullName: string, academicTitle?: string | null) {
  const prefix = academicTitle ? `${academicTitle}. ` : ""
  const hasPrefix = academicTitle && fullName.toLowerCase().startsWith(academicTitle.toLowerCase())
  return hasPrefix ? fullName : `${prefix}${fullName}`
}

function badgeText(m: Mentor) {
  // ưu tiên keywords[0] -> position -> workUnit
  return m.keywords?.[0]?.name || m.position || m.workUnit || "Chuyên môn"
}

function metaText(m: Mentor) {
  const left = m.workUnit || ""
  const right = m.position || ""
  const joined = [left, right].filter(Boolean).join(" • ")
  return joined || "—"
}

/* ===== Carousel (marquee) ===== */
export default function MentorCarousel({ data, options }: { data: Mentor[]; options?: UseEmblaCarouselType }) {
  // tôn trọng prefers-reduced-motion
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

  // AutoScroll: chạy SANG TRÁI liên tục (direction: "backward")
  const autoScroll = useRef(
    AutoScroll({
      speed: 1.6, // tốc độ trôi (có thể 1.0–3.0)
      startDelay: 0,
      stopOnInteraction: false, // kéo tay xong vẫn tiếp tục
      stopOnMouseEnter: true, // dừng khi hover
      direction: "backward", // sang trái
    }),
  )

  const plugins = useMemo(() => (reducedMotion ? [] : [autoScroll.current]), [reducedMotion])

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true, // trôi tự nhiên như băng chuyền
      ...options,
    },
    plugins,
  )

  // resume khi rời chuột (phòng khi plugin chưa tự play lại)
  const onMouseLeave = useCallback(() => {
    ;(emblaApi as unknown as UseEmblaCarouselType | undefined)?.plugins()?.autoScroll?.play()
  }, [emblaApi])

  // bật autoScroll sau mount
  useEffect(() => {
    const api = emblaApi as unknown as UseEmblaCarouselType | undefined
    api?.plugins()?.autoScroll?.play()

    // dừng khi tab ẩn, chạy lại khi quay về
    const onVis = () => {
      const auto = api?.plugins()?.autoScroll
      if (!auto) return
      document.hidden ? auto.stop() : auto.play()
    }
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [emblaApi])

  return (
    <div className="relative">
      {/* Nút điều hướng (ẩn trên mobile) */}
      <button
        className="hidden md:flex absolute left-[-8px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 shadow hover:bg-slate-50"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Trước"
      >
        ‹
      </button>
      <button
        className="hidden md:flex absolute right-[-8px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 shadow hover:bg-slate-50"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Sau"
      >
        ›
      </button>

      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef} onMouseLeave={onMouseLeave}>
        {/* Container: gap card */}
        <ul className="flex gap-6">
          {data.map(m => {
            const name = displayName(m.fullName, m.academicTitle)
            const img = m.image || avatarPlaceholder(m.fullName)
            const badge = badgeText(m)
            const meta = metaText(m)

            return (
              <li
                key={m.id}
                className="
                  embla__slide
                  shrink-0
                  basis-[88%] sm:basis-[48%] lg:basis-[23%]
                  rounded-2xl bg-white ring-1 ring-slate-200/70 shadow-sm
                  transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
                  flex flex-col h-full
                "
              >
                {/* Ảnh dọc – không che mặt */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 48vw, 23vw"
                    className="object-cover object-top transition-transform duration-300 ease-in-out"
                  />

                  {/* Gradient dưới – không đè mặt */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />

                  {/* Badge dưới-left */}
                  <span className="absolute left-3 bottom-3 rounded-full px-2.5 py-1 text-[11px] font-medium text-white bg-[#1F4F86]/90 backdrop-blur-sm">
                    {badge}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{name}</h3>
                  <p className="mt-1 text-sm text-slate-600 line-clamp-2">{meta}</p>

                  {/* Actions – dính đáy */}
                  <div className="mt-auto pt-4 flex items-center gap-2.5">
                    <a
                      href={m.website || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center justify-center rounded-xl px-3.5 h-9 text-sm font-medium
                        text-white bg-[#1F4F86] hover:bg-[#173e69]
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2E8BC0]
                      "
                      aria-label={`Xem hồ sơ của ${name}`}
                    >
                      Xem hồ sơ
                    </a>
                    <button
                      className="
                        inline-flex items-center justify-center rounded-xl px-3.5 h-9 text-sm font-medium
                        text-[#1F4F86] bg-[#E6F2FF] hover:bg-[#d8ebff]
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2E8BC0]
                      "
                    >
                      Đặt lịch
                    </button>
                  </div>
                </div>

                {/* Divider mảnh */}
                <div className="h-px w-full bg-slate-200" />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
