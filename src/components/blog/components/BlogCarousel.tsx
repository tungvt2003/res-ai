"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import BlogCard from "./BlogCard"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface Blog {
  id: string
  title: string
  description: string
  image: string | null
  contents: string
  categoryId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  category: {
    id: string
    name: string
    description: string
    slug: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
}

interface BlogCarouselProps {
  blogs: Blog[]
}

export default function BlogCarousel({ blogs }: BlogCarouselProps) {
  return (
    <div className="relative py-4 pb-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={8}
        slidesPerView={1}
        speed={800}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".blog-swiper-button-next",
          prevEl: ".blog-swiper-button-prev",
        }}
        pagination={{
          el: ".blog-swiper-pagination",
          clickable: true,
          bulletClass: "blog-swiper-bullet",
          bulletActiveClass: "blog-swiper-bullet-active",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
        }}
        className="blog-swiper"
      >
        {blogs.map(blog => (
          <SwiperSlide key={blog.id}>
            <div className="h-full">
              <BlogCard blog={blog} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="blog-swiper-button-prev cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:bg-[#2E8BC0] hover:text-white">
        <ChevronLeftIcon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
      </button>

      <button className="blog-swiper-button-next cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:bg-[#2E8BC0] hover:text-white">
        <ChevronRightIcon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
      </button>

      {/* Custom Pagination */}
      <div className="blog-swiper-pagination flex justify-center mt-8 gap-2"></div>

      <style jsx global>{`
        .blog-swiper {
          padding: 0 40px;
        }

        .blog-swiper .swiper-slide {
          height: auto !important;
        }

        .blog-swiper .swiper-slide > div {
          height: 100%;
        }

        /* Ensure shadow is visible and content fits */
        .blog-swiper .swiper-slide {
          padding: 8px 4px;
          height: auto !important;
        }

        .blog-swiper .swiper-slide > div {
          height: auto !important;
        }

        .blog-swiper .swiper-slide > div > a {
          display: block;
          height: auto !important;
        }

        .blog-swiper-bullet {
          width: 24px;
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.7;
        }

        .blog-swiper-bullet-active {
          background: #2e8bc0;
          opacity: 1;
          width: 32px;
          height: 4px;
        }

        .blog-swiper-bullet:hover {
          background: #2e8bc0;
          opacity: 0.8;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .blog-swiper {
            padding: 0 20px;
          }

          .blog-swiper-button-prev,
          .blog-swiper-button-next {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .blog-swiper-button-prev {
            left: -20px;
          }

          .blog-swiper-button-next {
            right: -20px;
          }
        }
      `}</style>
    </div>
  )
}
