"use client"

import BlogDetailLayout from "@/components/blog/components/BlogDetailLayout"
import { useGetBlog } from "@/components/blog/hooks/use-blog.mutation"
import { notFound, useParams } from "next/navigation"

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slugs?.[0]

  const { data, isLoading, error } = useGetBlog(slug || "")

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Đang tải...</div>
  }

  if (error) {
    return <div>Lỗi: {error.message}</div>
  }

  if (!data?.data) {
    notFound()
  }

  return <BlogDetailLayout blog={data.data} layout="7-3" />
}
