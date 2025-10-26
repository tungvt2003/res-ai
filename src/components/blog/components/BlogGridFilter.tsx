"use client"

import BlogCard from "./BlogCard"

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

interface BlogGridFilterProps {
  blogs: Blog[]
}

export default function BlogGridFilter({ blogs }: BlogGridFilterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
