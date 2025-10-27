"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { BiMoviePlay, BiPlayCircle } from "react-icons/bi"

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handlePlayClick = () => {
    setIsPlaying(true)
  }

  // Intersection Observer for auto-play when scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log("Video visible - Auto playing...")
            setIsPlaying(true)
          }
        })
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: "0px",
      },
    )

    const currentSection = sectionRef.current
    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <BiMoviePlay className="w-8 h-8 text-[#202c45] mr-2" />
            <h2 className="text-3xl font-bold text-[#202c45]">Video RES-AI.EDU</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá hệ thống nghiên cứu và giáo dục thông minh của chúng tôi
          </p>
        </div>

        <div
          ref={sectionRef}
          className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
        >
          {!isPlaying ? (
            <div className="relative aspect-video cursor-pointer group" onClick={handlePlayClick}>
              {/* YouTube thumbnail */}
              <Image
                src="https://img.youtube.com/vi/S6zKZdLmse0/maxresdefault.jpg"
                alt="Video thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                unoptimized
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center z-10">
                  <BiPlayCircle className="w-32 h-32 text-white group-hover:scale-110 transition-transform duration-300" />
                  <p className="mt-6 text-xl text-white font-semibold">Xem video</p>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/S6zKZdLmse0?autoplay=1&mute=1"
                title="Video giới thiệu"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}

          {/* Close button for video */}
          {isPlaying && (
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center z-20 transition-all duration-300"
              aria-label="Đóng video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoSection
