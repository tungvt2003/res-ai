"use client"

import { useGetBlogs } from "@/components/blog/hooks/use-blog.mutation"
import { InlineLoading } from "@/components/shares/components/Loading"
import Image from "next/image"
import Link from "next/link"
import { BiArrowToRight, BiCalendar, BiCategory } from "react-icons/bi"

export default function Blog() {
  const { data: blogs, isLoading, error } = useGetBlogs()
  const latestBlogs = blogs?.data?.slice(0, 6)
  if (isLoading) {
    return <InlineLoading text="Đang tải bài viết..." className="h-64" />
  }

  if (error) {
    return <div>Lỗi: {error.message}</div>
  }
  console.log(latestBlogs)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <section id="blog" className="relative py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2E8BC0]" />
            Blog & Tin tức
          </p>

          <h2
            className="
              text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-normal
              text-transparent bg-clip-text
              bg-gradient-to-r from-[#13294B] via-[#1F4F86] to-[#2E8BC0]
              text-balance
            "
            style={{ WebkitTextFillColor: "transparent" }}
          >
            Bài viết nổi bật
          </h2>

          <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-[#2E8BC0] to-[#7FC3E8] mx-auto" />
          <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-slate-700">
            Khám phá những bài viết mới nhất về công nghệ, giáo dục, nghiên cứu và sự kiện trong lĩnh vực AI và khoa học
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestBlogs?.map(blog => (
            <Link
              href={`/blog/${blog.id}`}
              key={blog.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-[#2E8BC0] to-[#7FC3E8] flex items-center justify-center"></div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 backdrop-blur-sm">
                    <BiCategory className="w-3 h-3" />
                    {blog.category.name}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <BiCalendar className="w-4 h-4" />
                  {formatDate(blog.createdAt)}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-[#2E8BC0] transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{truncateText(blog.description, 120)}</p>

                <div className="inline-flex items-center gap-2 text-[#2E8BC0] font-semibold hover:gap-3 transition-all duration-300">
                  Đọc thêm
                  <BiArrowToRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/edu/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#202c45] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-[#202c45]/80"
          >
            Xem tất cả bài viết
            <BiArrowToRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
