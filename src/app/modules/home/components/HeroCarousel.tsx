"use client"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

export const slides = [
  {
    bg: "https://images.unsplash.com/photo-1501290741922-b56c0d0884af?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzZWFyY2h8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000",
    title: "RES",
    subtitle: "Không gian nghiên cứu dành cho sinh viên và giảng viên",
    text: "Hệ thống RES cho phép sinh viên truy cập, tìm kiếm và khai thác từ khóa theo lĩnh vực. Qua quá trình tương tác, hệ thống đề xuất mentor phù hợp và hỗ trợ tích hợp công cụ AI để đồng hành trong quá trình nghiên cứu.",
    button: "Khám phá ngay",
    buttonLink: "/res",
  },
  {
    bg: "https://csdlkhoahoc.hueuni.edu.vn/csdl/images/bg5.jpg",
    title: "EDU",
    subtitle: "Kết nối đội ngũ mentor chuyên môn",
    text: "EDU là nơi giới thiệu và kết nối sinh viên với đội ngũ mentor đến từ các lĩnh vực liên quan. Mỗi mentor đều có hồ sơ, kinh nghiệm và hướng nghiên cứu cụ thể để hỗ trợ người học theo nhu cầu cá nhân hóa.",
    button: "Xem mentor",
    buttonLink: "/edu",
  },
  {
    bg: "https://www.teachhub.com/wp-content/uploads/2020/05/Top-12-Pioneers-in-Education-scaled.jpg",
    title: "AI",
    subtitle: "Ứng dụng AI để nâng cao đạo đức và liêm chính khoa học",
    text: "Khu vực AI cung cấp các blog chuyên đề về đạo đức sử dụng AI, liêm chính trong nghiên cứu và các công cụ tra cứu học thuật như Google Scholar, Semantic Scholar, Elicit,... giúp người học tối ưu hóa quá trình tìm kiếm và phân tích tài liệu.",
    button: "Khám phá công cụ AI",
    buttonLink: "/ai",
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => setCurrent(prev => (prev + 1) % slides.length)
  const prevSlide = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative w-full h-[75vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${slide.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-6 md:px-12 text-white">
            <AnimatePresence mode="wait">
              {index === current && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 1 }}
                >
                  <h1 className="text-5xl md:text-6xl font-extrabold mb-4">{slide.title}</h1>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">{slide.subtitle}</h2>
                  <p className="max-w-2xl mb-6">{slide.text}</p>
                  <Link
                    href={slide.buttonLink}
                    className="px-6 py-3 bg-[#202c45] text-white font-semibold rounded-lg hover:bg-[#202c45]/80 transition duration-300"
                  >
                    {slide.button}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}

      {/* Navigation - Hidden on tablet and mobile */}
      <button
        onClick={prevSlide}
        className="hidden lg:flex absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white w-12 h-12 rounded-full hover:bg-black/50 transition z-30 items-center justify-center"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="hidden lg:flex absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white w-12 h-12 rounded-full hover:bg-black/50 transition z-30 items-center justify-center"
      >
        &#8594;
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 w-full flex justify-center space-x-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${idx === current ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </section>
  )
}
