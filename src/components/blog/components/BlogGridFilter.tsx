"use client"

import BlogCarousel from "./BlogCarousel"

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
  return <BlogCarousel blogs={blogs} />
}
