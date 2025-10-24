"use client"

import BlogContent from "./BlogContent"
import TableOfContents from "./TableOfContents"

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
    title?: string
    bio?: string
  }
}

interface BlogDetailLayoutProps {
  blog: BlogData
  layout?: "7-3" | "6-4"
}

export default function BlogDetailLayout({ blog, layout = "7-3" }: BlogDetailLayoutProps) {
  const gridCols = layout === "7-3" ? "lg:grid-cols-7" : "lg:grid-cols-10"
  const mainCols = layout === "7-3" ? "lg:col-span-5" : "lg:col-span-6"
  const sidebarCols = layout === "7-3" ? "lg:col-span-2" : "lg:col-span-4"

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
          {/* Main Content */}
          <div className={mainCols}>
            <BlogContent blog={blog} />
          </div>

          {/* TOC Sidebar */}
          <aside className={sidebarCols}>
            <div className="sticky top-24 space-y-6">
              <TableOfContents content={blog.contents} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
