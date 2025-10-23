"use client"

import Pagination from "@/components/blog/components/Pagination"
import HeroSection from "@/components/mentor/components/HeroSection"
import MajorFilter from "@/components/mentor/components/MajorFilter"
import MentorGrid from "@/components/mentor/components/MentorGrid"
import SearchSection from "@/components/mentor/components/SearchSection"
import { formatDate, truncateText } from "@/components/mentor/utils/mentor.utils"
import type { Mentor } from "@/types"
import { useEffect, useState } from "react"

const mentors = [
  {
    id: "f304d44a-97e4-4c34-b80f-da2a73488cff",
    fullName: "ThS. Phạm Thị Dung23",
    academicTitle: "ThS",
    workUnit: "Khoa Công nghệ Thông tin",
    position: "Giảng viên",
    image: "https://csdlkhoahoc.hueuni.edu.vn/data/scientist/Nguyen_Thanh_Hung_6.jpg",
    website: "https://example.com/pham-thi-dung",
    isActive: true,
    createdAt: "2025-10-22T16:51:15.867Z",
    updatedAt: "2025-10-22T17:38:05.242Z",
    keywords: [
      {
        id: "ddda07ce-d94d-41d9-bf19-8ab3da356603",
        name: "Kiểm soát cảm xúc trong học tập",
        createdAt: "2025-10-22T16:30:20.583Z",
        updatedAt: "2025-10-22T16:30:20.583Z",
      },
      {
        id: "cefcd34b-673b-42bd-a6ff-c8b4e638fa0a",
        name: "Kỹ năng giải quyết vấn đề",
        createdAt: "2025-10-22T16:30:20.583Z",
        updatedAt: "2025-10-22T16:30:20.583Z",
      },
      {
        id: "c8bfda0c-6672-4718-a4de-21e65ba6117f",
        name: "Kỹ năng quản lý thời gian",
        createdAt: "2025-10-22T16:30:20.583Z",
        updatedAt: "2025-10-22T16:30:20.583Z",
      },
    ],
  },
  {
    id: "c30e0326-3ea6-4b7c-a6d2-b3e9ad3b8e65",
    fullName: "GS.TS. Hoàng Văn Em",
    academicTitle: "GS",
    workUnit: "Khoa Khoa học Máy tính",
    position: "Giáo sư",
    image: "https://csdlkhoahoc.hueuni.edu.vn/data/scientist/Thăng_Lê_Văn_Thăng_2013.jpg",
    website: "https://example.com/hoang-van-em",
    isActive: true,
    createdAt: "2025-10-22T16:51:15.867Z",
    updatedAt: "2025-10-22T16:51:15.867Z",
    keywords: [],
  },
  {
    id: "b94e3850-dab0-411e-9ff9-fa1a266ba308",
    fullName: "TS. Lê Văn Cường",
    academicTitle: "TS",
    workUnit: "Khoa Khoa học Máy tính",
    position: "Trưởng Bộ môn AI",
    image: "https://csdlkhoahoc.hueuni.edu.vn/data/scientist/Picture2.png",
    website: "https://example.com/le-van-cuong",
    isActive: true,
    createdAt: "2025-10-22T16:51:15.867Z",
    updatedAt: "2025-10-22T16:51:15.867Z",
    keywords: [],
  },
  {
    id: "1943fffb-30d0-44f2-af63-d7f4f0a8231a",
    fullName: "PGS.TS. Nguyễn Văn An",
    academicTitle: "PGS",
    workUnit: "Khoa Công nghệ Thông tin",
    position: "Phó Trưởng khoa",
    image: "https://csdlkhoahoc.hueuni.edu.vn/data/2024/2/Screen_Shot_2024-02-02_at_00_27_06.png",
    website: "https://example.com/nguyen-van-an",
    isActive: true,
    createdAt: "2025-10-22T16:51:15.867Z",
    updatedAt: "2025-10-22T16:51:15.867Z",
    keywords: [],
  },
  {
    id: "03295f76-2685-4b5f-815f-30c17b6e4c48",
    fullName: "TS. Trần Thị Bình",
    academicTitle: "TS",
    workUnit: "Khoa Công nghệ Thông tin",
    position: "Giảng viên chính",
    image: "https://csdlkhoahoc.hueuni.edu.vn/data/2024/8/eec6506ee043441d1d522.jpg",
    website: "https://example.com/tran-thi-binh",
    isActive: true,
    createdAt: "2025-10-22T16:51:15.867Z",
    updatedAt: "2025-10-22T16:51:15.867Z",
    keywords: [],
  },
]

const majors = [
  { id: "all", name: "Tất cả" },
  { id: "khoa-cong-nghe-thong-tin", name: "Khoa Công nghệ Thông tin" },
  { id: "khoa-khoa-hoc-may-tinh", name: "Khoa Khoa học Máy tính" },
]

export default function Mentor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [selectedMajor, setSelectedMajor] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>(mentors)

  const mentorsPerPage = 6

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setIsSearching(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Filter mentors based on search term and selected major
  useEffect(() => {
    let filtered = mentors

    // Filter by major (workUnit)
    if (selectedMajor !== "all") {
      filtered = filtered.filter(mentor => {
        if (selectedMajor === "khoa-cong-nghe-thong-tin") {
          return mentor.workUnit === "Khoa Công nghệ Thông tin"
        } else if (selectedMajor === "khoa-khoa-hoc-may-tinh") {
          return mentor.workUnit === "Khoa Khoa học Máy tính"
        }
        return true
      })
    }

    // Filter by search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        mentor =>
          mentor.fullName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          mentor.academicTitle.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          mentor.workUnit.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          mentor.position.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          mentor.keywords.some(keyword => keyword.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())),
      )
    }

    setFilteredMentors(filtered)
    setCurrentPage(1)
  }, [debouncedSearchTerm, selectedMajor])

  // Pagination
  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage)
  const startIndex = (currentPage - 1) * mentorsPerPage
  const endIndex = startIndex + mentorsPerPage
  const currentMentors = filteredMentors.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
      <main className="grow pt-20 relative">
        <HeroSection />

        <SearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setDebouncedSearchTerm={setDebouncedSearchTerm}
          setIsSearching={setIsSearching}
          setCurrentPage={setCurrentPage}
        />

        <div className="max-w-7xl mx-auto px-6 py-16">
          <MajorFilter
            majors={majors}
            selectedMajor={selectedMajor}
            setSelectedMajor={setSelectedMajor}
            setCurrentPage={setCurrentPage}
            setSearchTerm={setSearchTerm}
            setDebouncedSearchTerm={setDebouncedSearchTerm}
          />

          {currentMentors.length > 0 ? (
            <>
              <MentorGrid mentors={currentMentors} formatDate={formatDate} truncateText={truncateText} />
              <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                {isSearching ? "Đang tìm kiếm..." : "Không tìm thấy giảng viên nào"}
              </div>
              {!isSearching && <p className="text-gray-400 mt-2">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
