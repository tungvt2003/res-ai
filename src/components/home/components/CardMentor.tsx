import { academicUtils } from "@/components/shares/utils/academic.utils"
import { Mentor } from "@/types"
import Image from "next/image"
import { memo } from "react"

function avatarPlaceholder(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map(s => s[0]!.toUpperCase())
    .join("")
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'>
      <defs>
        <linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#202c45'/>
          <stop offset='50%' stop-color='#2a3a5c'/>
          <stop offset='100%' stop-color='#344563'/>
        </linearGradient>
        <filter id='glow'>
          <feGaussianBlur stdDeviation='2' result='coloredBlur'/>
          <feMerge> 
            <feMergeNode in='coloredBlur'/>
            <feMergeNode in='SourceGraphic'/>
          </feMerge>
        </filter>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)' rx='20'/>
      <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle'
        font-family='Inter, system-ui, -apple-system, sans-serif'
        font-size='180' fill='white' font-weight='600' filter='url(#glow)'>${initials}</text>
    </svg>`,
  )
  return `data:image/svg+xml,${svg}`
}

function badgeText(m: Mentor) {
  return m.keywords?.[0]?.name || m.position || m.workUnit || "Chuyên môn"
}

const CardMentor = memo(function CardMentor({
  m,
  idx,
  isMobile,
  isTablet,
}: {
  m: Mentor
  idx: number
  isMobile: boolean
  isTablet: boolean
}) {
  const img = m.image || avatarPlaceholder(m.fullName)
  const badge = badgeText(m)

  return (
    <li
      key={`${m.id}-${idx}`}
      className={`shrink-0 flex flex-col h-[420px] ${
        isMobile ? "basis-[85%] max-w-[280px]" : isTablet ? "basis-[45%] max-w-[320px]" : "basis-[22%] max-w-[340px]"
      } rounded-2xl bg-white/98 backdrop-blur-sm border border-slate-200/70 shadow-lg shadow-slate-200/40 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-[#202c45]/15 hover:border-[#202c45]/40 hover:bg-white group cursor-pointer`}
    >
      <div className="relative h-[280px] overflow-hidden rounded-t-2xl">
        <Image
          src={img}
          alt={m.fullName}
          fill
          sizes={isMobile ? "85vw" : isTablet ? "45vw" : "22vw"}
          className="object-contain object-center transition-all duration-500 ease-out"
          draggable={false}
          priority={idx < 4}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

        <div className="absolute left-3 bottom-3 flex flex-col gap-2">
          <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white bg-[#202c45]/95 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 group-hover:bg-[#202c45] group-hover:shadow-xl">
            {badge}
          </span>
        </div>

        <div className="absolute inset-0 bg-[#202c45]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#202c45] line-clamp-2 leading-tight group-hover:text-[#2a3a5c] transition-colors duration-300 mb-2">
            {m.fullName}
          </h3>

          {m.academicRank && m.academicDegree && (
            <div className="mb-2">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${academicUtils.getCombinedColor(m.academicRank, m.academicDegree)}`}
              >
                {academicUtils.getFullTitle(m.academicRank, m.academicDegree)}
              </span>
            </div>
          )}

          <div className="space-y-1">
            {m.workUnit && (
              <p className="text-sm text-slate-600 leading-relaxed font-medium group-hover:text-slate-700 transition-colors duration-300">
                {m.workUnit}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <a
            href={m.website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl px-4 h-10 text-sm font-semibold text-white bg-linear-to-r from-[#202c45] to-[#2a3a5c] hover:from-[#2a3a5c] hover:to-[#344563] shadow-md transition-all duration-300"
            aria-label={`Xem hồ sơ của ${m.fullName}`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Xem hồ sơ
          </a>
        </div>
      </div>
    </li>
  )
})

export default CardMentor
