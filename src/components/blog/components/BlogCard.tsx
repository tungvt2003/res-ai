"use client"

import Image from "next/image"
import Link from "next/link"
import { BiArrowToRight, BiCalendar, BiCategory } from "react-icons/bi"

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

interface BlogCardProps {
  blog: Blog
  formatDate: (dateString: string) => string
  truncateText: (text: string, maxLength: number) => string
}

export default function BlogCard({ blog, formatDate, truncateText }: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
      <div className="relative">
        {blog.image ? (
          <Image src={blog.image} alt={blog.title} width={400} height={250} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-[#2E8BC0] to-[#7FC3E8] flex items-center justify-center">
            <span className="text-white text-3xl font-bold">{blog.category.name.charAt(0)}</span>
          </div>
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

        <Link
          href={`/blog/${blog.id}`}
          className="inline-flex items-center gap-2 text-[#2E8BC0] font-semibold hover:gap-3 transition-all duration-300"
        >
          Đọc thêm
          <BiArrowToRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}
