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

interface BlogGridProps {
  blogs: Blog[]
  formatDate: (dateString: string) => string
  truncateText: (text: string, maxLength: number) => string
}

export default function BlogGrid({ blogs, formatDate, truncateText }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} formatDate={formatDate} truncateText={truncateText} />
      ))}
    </div>
  )
}
