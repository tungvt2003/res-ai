"use client"

import type { Mentor } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { BiAward, BiLinkExternal, BiUser } from "react-icons/bi"

interface MentorCardProps {
  mentor: Mentor
  formatDate: (dateString: string) => string
  truncateText: (text: string, maxLength: number) => string
}

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

function displayName(fullName: string, academicTitle?: string | null) {
  const prefix = academicTitle ? `${academicTitle}. ` : ""
  const hasPrefix = academicTitle && fullName.toLowerCase().startsWith(academicTitle.toLowerCase())
  return hasPrefix ? fullName : `${prefix}${fullName}`
}

function badgeText(m: Mentor) {
  return m.keywords?.[0]?.name || m.position || m.workUnit || "Chuyên môn"
}

function metaText(m: Mentor) {
  const left = m.workUnit || ""
  const right = m.position || ""
  const joined = [left, right].filter(Boolean).join(" • ")
  return joined || "—"
}

export default function MentorCard({ mentor }: MentorCardProps) {
  const name = displayName(mentor.fullName, mentor.academicTitle)
  const img = mentor.image || avatarPlaceholder(mentor.fullName)
  const badge = badgeText(mentor)
  const meta = metaText(mentor)

  return (
    <article className="shrink-0 flex flex-col h-[480px] basis-[22%] max-w-[340px] rounded-2xl bg-white/98 backdrop-blur-sm border border-slate-200/70 shadow-lg shadow-slate-200/40 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-[#202c45]/15 hover:border-[#202c45]/40 hover:bg-white group cursor-pointer">
      <div className="relative h-[280px] overflow-hidden rounded-t-2xl">
        <Image
          src={img}
          alt={name}
          fill
          sizes="22vw"
          className="object-cover object-center transition-all duration-500 ease-out"
          draggable={false}
          style={{ objectPosition: "center 20%" }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

        <div className="absolute left-3 bottom-3">
          <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white bg-[#202c45]/95 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 group-hover:bg-[#202c45] group-hover:shadow-xl">
            {badge}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 backdrop-blur-sm">
            <BiAward className="w-3 h-3" />
            {mentor.academicTitle}
          </span>
        </div>

        <div className="absolute inset-0 bg-[#202c45]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#202c45] line-clamp-2 leading-tight group-hover:text-[#2a3a5c] transition-colors duration-300 mb-2">
            {name}
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed font-medium group-hover:text-slate-700 transition-colors duration-300 mb-3">
            {meta}
          </p>

          {mentor.keywords && mentor.keywords.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-700 mb-1">Lĩnh vực nghiên cứu:</h4>
              <div className="flex flex-wrap gap-1">
                {mentor.keywords.slice(0, 2).map(keyword => (
                  <span key={keyword.id} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                    {keyword.name}
                  </span>
                ))}
                {mentor.keywords.length > 2 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                    +{mentor.keywords.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {mentor.website && (
            <a
              href={mentor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-3 h-10 text-sm font-semibold text-white bg-linear-to-r from-[#202c45] to-[#2a3a5c] hover:from-[#2a3a5c] hover:to-[#344563] shadow-md transition-all duration-300"
              aria-label={`Xem website của ${name}`}
            >
              <BiLinkExternal className="w-4 h-4" />
              Website
            </a>
          )}
          <Link
            href={`/mentor/${mentor.id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-3 h-10 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-[#202c45] shadow-md transition-all duration-300"
            aria-label={`Xem chi tiết ${name}`}
          >
            <BiUser className="w-4 h-4" />
            Chi tiết
          </Link>
        </div>
      </div>
    </article>
  )
}
