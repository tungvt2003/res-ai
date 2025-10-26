"use client"

import BlogGridFilter from "@/components/blog/components/BlogGridFilter"
import Pagination from "@/components/blog/components/Pagination"
import { useSearchBlogs } from "@/components/blog/hooks/use-blog.mutation"
import { MentorApi } from "@/components/mentor/apis/mentorApi"
import AcademicFilter from "@/components/mentor/components/AcademicFilter"
import HeroSection from "@/components/mentor/components/HeroSection"
import MentorGrid from "@/components/mentor/components/MentorGrid"
import SearchSection from "@/components/mentor/components/SearchSection"
import { formatDate, truncateText } from "@/components/mentor/utils/mentor.utils"
import { InlineLoading } from "@/components/shares/components/Loading"
import { CATEGORY_ID } from "@/constants"
import type { Mentor } from "@/types"
import { useEffect, useState } from "react"

export default function SectionMentor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [selectedDegree, setSelectedDegree] = useState("")
  const [selectedRank, setSelectedRank] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [error, setError] = useState<string | null>(null)

  const mentorsPerPage = 6

  const { data: blogsData, isLoading: isLoadingBlogs } = useSearchBlogs({
    categoryId: CATEGORY_ID.EDU,
  })

  const blogs = blogsData?.data || []

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Fetch mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const params = {
          fullName: debouncedSearchTerm || undefined,
          academicDegree: selectedDegree || undefined,
          academicRank: selectedRank || undefined,
        }

        const response = await MentorApi.searchMentors(params)
        const fetchedMentors = response.data || []

        setMentors(fetchedMentors)
        setCurrentPage(1)
      } catch (err) {
        console.error("Error fetching mentors:", err)
        setError("Không thể tải danh sách mentor")
        setMentors([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMentors()
  }, [debouncedSearchTerm, selectedDegree, selectedRank])

  // Pagination
  const totalPages = Math.ceil(mentors.length / mentorsPerPage)
  const startIndex = (currentPage - 1) * mentorsPerPage
  const endIndex = startIndex + mentorsPerPage
  const currentMentors = mentors.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <main className="grow pt-20 relative">
        <HeroSection />

        {isLoadingBlogs ? (
          <InlineLoading text="Đang tải dữ liệu..." className="h-64" />
        ) : (
          blogs.length > 0 && (
            <div className="bg-white">
              <div className="px-6 max-w-7xl mx-auto py-16">
                <BlogGridFilter blogs={blogs} />
              </div>
            </div>
          )
        )}

        <SearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setDebouncedSearchTerm={setDebouncedSearchTerm}
          setIsSearching={() => {}}
          setCurrentPage={setCurrentPage}
        />

        <div className="max-w-7xl mx-auto px-6 py-16">
          <AcademicFilter
            selectedDegree={selectedDegree}
            selectedRank={selectedRank}
            setSelectedDegree={setSelectedDegree}
            setSelectedRank={setSelectedRank}
            setCurrentPage={setCurrentPage}
          />

          {isLoading ? (
            <div className="text-center py-12">
              <InlineLoading text="Đang tải danh sách mentor..." className="h-32" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 text-lg">{error}</div>
              <p className="text-gray-400 mt-2">Vui lòng thử lại sau</p>
            </div>
          ) : currentMentors.length > 0 ? (
            <>
              <MentorGrid mentors={currentMentors} formatDate={formatDate} truncateText={truncateText} />
              <div className="mt-12">
                <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">Không tìm thấy mentor nào</div>
              <p className="text-gray-400 mt-2">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
