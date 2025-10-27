"use client"
import BlogGrid from "@/components/blog/components/BlogGrid"
import { useSearchBlogs } from "@/components/blog/hooks/use-blog.mutation"
import MentorConsultationForm from "@/components/home/components/MentorConsultationForm"
import HeroSection from "@/components/scientific-public/components/HeroSection"
import { InlineLoading } from "@/components/shares/components/Loading"
import { CATEGORY_ID } from "@/constants"

export default function Ai() {
  const { data: blogsData, isLoading: isLoadingBlogs } = useSearchBlogs({
    categoryId: CATEGORY_ID.SCIENTIFIC_PUBLIC,
  })

  const blogs = blogsData?.data || []

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <main className="grow pt-20 relative">
        <HeroSection />
        {isLoadingBlogs ? (
          <InlineLoading text="Đang tải dữ liệu..." className="h-64" />
        ) : (
          <>
            <div className="pt-16 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <BlogGrid blogs={blogs} />
              </div>
            </div>
          </>
        )}
        <div className="px-6 md:px-0">
          <MentorConsultationForm />
        </div>
      </main>
    </div>
  )
}
