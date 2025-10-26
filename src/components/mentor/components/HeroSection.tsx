export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-[#13294B] via-[#1F4F86] to-[#2E8BC0] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Giảng viên & Mentor
          </p>

          <h1
            className="
              text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]
              text-transparent bg-clip-text
              bg-gradient-to-r from-white via-blue-100 to-blue-200
              [text-wrap:balance]
            "
            style={{ WebkitTextFillColor: "transparent" }}
          >
            Đội ngũ Mentor
          </h1>

          <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-white to-blue-200" />
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-white/90">
            Quy tụ các nhà khoa học và giảng viên có năng lực nghiên cứu, giàu kinh nghiệm công bố quốc tế – cùng đồng
            hành, hướng dẫn và truyền cảm hứng cho thế hệ sinh viên nghiên cứu trẻ{" "}
          </p>
        </div>
      </div>
    </div>
  )
}
