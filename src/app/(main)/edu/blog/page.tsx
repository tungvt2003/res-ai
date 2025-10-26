"use client"

import BlogGrid from "@/components/blog/components/BlogGrid"
import CategoryFilter from "@/components/blog/components/CategoryFilter"
import HeroSection from "@/components/blog/components/HeroSection"
import Pagination from "@/components/blog/components/Pagination"
import SearchResults from "@/components/blog/components/SearchResults"
import SearchSection from "@/components/blog/components/SearchSection"
import { useGetBlogs, useSearchBlogs } from "@/components/blog/hooks/use-blog.mutation"
import { useGetCategories } from "@/components/blog/hooks/use-category"
import type { Category } from "@/components/blog/types/category.types"
import { formatDate, truncateText } from "@/components/blog/utils/blog.utils"
import { InlineLoading } from "@/components/shares/components/Loading"
import { useEffect, useState } from "react"

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const postsPerPage = 6

  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useGetCategories()

  const categories: Category[] = [
    { id: "all", name: "Tất cả", slug: "all", description: "", isActive: true, createdAt: "", updatedAt: "" },
    ...(categoriesData?.data || []),
  ]

  const searchParams = {
    title: debouncedSearchTerm || undefined,
    categoryId: selectedCategory !== "all" ? selectedCategory : undefined,
  }

  const {
    data: blogs,
    isLoading: blogsLoading,
    error: blogsError,
  } = useSearchBlogs(searchParams.title || searchParams.categoryId ? searchParams : undefined)

  const { data: allBlogs, isLoading: allBlogsLoading, error: allBlogsError } = useGetBlogs()

  const currentBlogsData = searchParams.title || searchParams.categoryId ? blogs : allBlogs
  const isLoading = searchParams.title || searchParams.categoryId ? blogsLoading : allBlogsLoading
  const error = searchParams.title || searchParams.categoryId ? blogsError : allBlogsError

  const filteredBlogs = currentBlogsData?.data

  const totalPages = Math.ceil((filteredBlogs?.length || 0) / postsPerPage)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setIsSearching(false)
    }, 1000)

    return () => {
      clearTimeout(timer)
      setIsSearching(true)
    }
  }, [searchTerm])

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages, setCurrentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, selectedCategory])

  const startIndex = (currentPage - 1) * postsPerPage
  const currentBlogs = filteredBlogs?.slice(startIndex, startIndex + postsPerPage) || []

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <main className="flex-grow pt-20 relative">
        <HeroSection />

        <SearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setDebouncedSearchTerm={setDebouncedSearchTerm}
          setIsSearching={setIsSearching}
          setCurrentPage={setCurrentPage}
        />

        <section id="blog" className="relative py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {categoriesLoading ? (
              <InlineLoading text="Đang tải dữ liệu..." className="h-64" />
            ) : (
              <>
                {categoriesError ? (
                  <div className="text-center py-8">
                    <div className="text-red-600 text-lg font-medium">Lỗi: {categoriesError?.message}</div>
                  </div>
                ) : (
                  <>
                    <CategoryFilter
                      categories={categories}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      setCurrentPage={setCurrentPage}
                      setSearchTerm={setSearchTerm}
                      setDebouncedSearchTerm={setDebouncedSearchTerm}
                    />

                    <SearchResults
                      debouncedSearchTerm={debouncedSearchTerm}
                      filteredBlogsCount={filteredBlogs?.length || 0}
                      isSearching={isSearching}
                    />

                    {isLoading ? (
                      <div className="py-16">
                        <InlineLoading text="Đang tìm kiếm..." className="h-32" />
                      </div>
                    ) : error ? (
                      <div className="text-center py-8">
                        <div className="text-red-600 text-lg font-medium">Lỗi: {error?.message}</div>
                      </div>
                    ) : (
                      <>
                        <BlogGrid blogs={currentBlogs} formatDate={formatDate} truncateText={truncateText} />
                        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
