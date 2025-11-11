"use client"

import TableOfContents from "@/components/blog/components/TableOfContents"
import { useMemo } from "react"
import { BiCalendar, BiCategory } from "react-icons/bi"

interface BlogData {
  id: string
  title: string
  description: string
  contents: string
  createdAt: string
  updatedAt: string
  category: {
    id: string
    name: string
    description: string
    slug: string
  }
  author?: {
    name: string
    avatar?: string
  }
}

interface BlogContentProps {
  blog: BlogData
}

// Hàm chuẩn hóa HTML: đổi IP HTTP sang đường dẫn proxy/relative
const normalizeHtml = (html: string) => {
  if (!html) return html

  return (
    html
      // ảnh uploads
      .replace(/http:\/\/103\.243\.173\.86:9999\/uploads\//g, "/uploads/")
  )
  // nếu API khác cũng dùng IP thì map tiếp ở đây
  // .replace(/http:\/\/103\.243\.173\.86:9999\/api\//g, "/api/")
}

export default function BlogContent({ blog }: BlogContentProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const safeContents = useMemo(() => normalizeHtml(blog.contents), [blog.contents])

  return (
    <article className="bg-white rounded-xl overflow-hidden">
      <div className="p-4 md:p-8 border-b border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <BiCategory className="w-4 h-4" />
          <span className="px-3 py-1 bg-[#2E8BC0]/10 text-[#2E8BC0] rounded-full text-xs font-medium">
            {blog.category.name}
          </span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>

        <div className="flex items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <BiCalendar className="w-4 h-4" />
            <span className="text-sm">{formatDate(blog.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="p-0 md:p-8">
        <div className="block lg:hidden">
          <TableOfContents content={blog.contents} />
        </div>

        <div
          className="blog-content prose prose-lg max-w-none 
            prose-headings:text-gray-900 
            prose-headings:font-bold 
            prose-h2:text-2xl 
            prose-h2:mt-8 
            prose-h2:mb-4 
            prose-h2:text-[#202c45]
            prose-h3:text-xl
            prose-h3:mt-6
            prose-h3:mb-3
            prose-h3:text-[#2E8BC0]
            prose-p:text-gray-700 
            prose-p:leading-relaxed 
            prose-p:mb-6 
            prose-p:text-justify
            prose-img:rounded-lg 
            prose-img:shadow-md
            prose-img:mx-auto
            prose-ul:text-gray-700 
            prose-li:mb-2
            prose-strong:text-gray-900
            prose-strong:font-semibold
            prose-blockquote:border-l-4
            prose-blockquote:border-[#2E8BC0]
            prose-blockquote:pl-4
            prose-blockquote:italic
            prose-blockquote:text-gray-600"
          style={{
            fontFamily: "Inter, system-ui, -apple-system, sans-serif !important",
          }}
          dangerouslySetInnerHTML={{ __html: safeContents }}
        />
      </div>
    </article>
  )
}
