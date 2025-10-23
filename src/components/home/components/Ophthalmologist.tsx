import MentorCarousel from "@/components/home/components/MentorCarousel"
import { UseEmblaCarouselType } from "embla-carousel-react"

/* ===== Types ===== */
type Keyword = { id: string; name: string }
type Mentor = {
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
// Tạo avatar placeholder (initials) khi thiếu ảnh
function avatarPlaceholder(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map(s => s[0]!.toUpperCase())
    .join("")
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
      <defs>
        <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0%' stop-color='#13294B'/>
          <stop offset='100%' stop-color='#2E8BC0'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle'
        font-family='Inter, Segoe UI, Roboto, Helvetica, Arial'
        font-size='120' fill='white' font-weight='700'>${initials}</text>
    </svg>`,
  )
  return `data:image/svg+xml,${svg}`
}

// Tránh lặp học hàm trong fullName (VD: "ThS. Phạm A" + academicTitle="ThS")
function displayName(fullName: string, academicTitle?: string | null) {
  const prefix = academicTitle ? `${academicTitle}. ` : ""
  const hasPrefix = fullName.toLowerCase().startsWith((academicTitle ?? "").toLowerCase())
  return hasPrefix ? fullName : `${prefix}${fullName}`
}

// Badge: ưu tiên keyword đầu tiên → position → workUnit
function badgeText(m: Mentor) {
  return m.keywords?.[0]?.name || m.position || m.workUnit || "Chuyên môn"
}

// Meta ngắn gọn dưới tên
function metaText(m: Mentor) {
  const left = m.workUnit || ""
  const right = m.position || ""
  const joined = [left, right].filter(Boolean).join(" • ")
  return joined || "—"
}

/* ===== Component ===== */
export default function Ophthalmologist({ data }: { data: Mentor[] }) {
  const mentors = data

  return (
    <section id="Ophthalmologist" aria-labelledby="ophthalmologist-heading" className="relative">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-10 py-10 sm:py-12 lg:py-14">
        {/* Header học thuật */}
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2E8BC0]" />
            Đội ngũ mentor & giảng viên
          </p>

          <h2
            id="ophthalmologist-heading"
            className="
              text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]
              text-transparent bg-clip-text
              bg-gradient-to-r from-[#13294B] via-[#1F4F86] to-[#2E8BC0]
              [text-wrap:balance]
            "
            style={{ WebkitTextFillColor: "transparent" }}
          >
            Giảng Viên Chuyên Ngành
          </h2>

          <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-[#2E8BC0] to-[#7FC3E8]" />
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-slate-700">
            Đội ngũ có trình độ cao, tay nghề giỏi và tác phong chuyên nghiệp, đồng hành cùng sinh viên trong nghiên cứu
            và ứng dụng AI.
          </p>
        </div>

        {/* Grid (carousel mobile bằng CSS), card cao bằng nhau */}
        <MentorCarousel data={mentors} options={{ loop: true, align: "start" } as unknown as UseEmblaCarouselType} />

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="
              inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium
              text-slate-700 hover:border-[#2E8BC0] hover:text-[#1F4F86]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8BC0]/30
            "
          >
            Xem tất cả giảng viên
          </a>
        </div>
      </div>
    </section>
  )
}
