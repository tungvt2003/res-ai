"use client"
import AIToolsSection from "@/components/ai/components/AIToolsSection"
import ArticlesSection from "@/components/ai/components/ArticlesSection"
import HeroSection from "@/components/ai/components/HeroSection"
import PlagiarismCheckSection from "@/components/ai/components/PlagiarismCheckSection"
import BlogGridFilter from "@/components/blog/components/BlogGridFilter"
import { useSearchBlogs } from "@/components/blog/hooks/use-blog.mutation"
import MentorConsultationForm from "@/components/home/components/MentorConsultationForm"
import { InlineLoading } from "@/components/shares/components/Loading"
import { CATEGORY_ID } from "@/constants"

export default function Ai() {
  const { data: blogsData, isLoading: isLoadingBlogs } = useSearchBlogs({
    categoryId: CATEGORY_ID.AI,
  })

  const blogs = blogsData?.data || []

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <main className="grow pt-20 relative">
        <HeroSection />
        {isLoadingBlogs ? (
          <InlineLoading text="Đang tải dữ liệu..." className="h-64" />
        ) : (
          <>
            {blogs.length > 0 && (
              <div className="pt-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                  <BlogGridFilter blogs={blogs} />
                </div>
              </div>
            )}
            <ArticlesSection />
            <AIToolsSection />
            <PlagiarismCheckSection />
            <MentorConsultationForm />
          </>
        )}
      </main>
    </div>
  )
}
