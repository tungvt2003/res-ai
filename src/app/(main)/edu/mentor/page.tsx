"use client"

import Pagination from "@/components/blog/components/Pagination"
import { MentorApi } from "@/components/mentor/apis/mentorApi"
import AcademicFilter from "@/components/mentor/components/AcademicFilter"
import HeroSection from "@/components/mentor/components/HeroSection"
import MentorGrid from "@/components/mentor/components/MentorGrid"
import SearchSection from "@/components/mentor/components/SearchSection"
import { formatDate, truncateText } from "@/components/mentor/utils/mentor.utils"
import { InlineLoading } from "@/components/shares/components/Loading"
import type { Mentor } from "@/types"
import { useEffect, useState } from "react"

const majors = [
  { id: "all", name: "Tất cả" },
  { id: "khoa-cong-nghe-thong-tin", name: "Khoa Công nghệ Thông tin" },
  { id: "khoa-khoa-hoc-may-tinh", name: "Khoa Khoa học Máy tính" },
]

export default function Mentor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [selectedDegree, setSelectedDegree] = useState("")
  const [selectedRank, setSelectedRank] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [error, setError] = useState<string | null>(null)

  const mentorsPerPage = 6

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
        setError("Không thể tải danh sách giảng viên")
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
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
      <main className="grow pt-20 relative">
        <HeroSection />

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
              <InlineLoading text="Đang tải danh sách giảng viên..." className="h-32" />
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
              <div className="text-gray-500 text-lg">Không tìm thấy giảng viên nào</div>
              <p className="text-gray-400 mt-2">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
