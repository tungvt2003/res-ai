import MentorCarouselPlain from "@/components/home/components/MentorCarousel"
import { Mentor } from "@/types"

export default function Ophthalmologist({ mentors }: { mentors: Mentor[] }) {
  return (
    <section id="Ophthalmologist" aria-labelledby="ophthalmologist-heading" className="relative">
      <div className="w-full">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center px-4 md:px-8 lg:px-10 py-10 sm:py-12 lg:py-14">
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

        <MentorCarouselPlain data={mentors} pxPerSecond={50} />
      </div>
    </section>
  )
}
