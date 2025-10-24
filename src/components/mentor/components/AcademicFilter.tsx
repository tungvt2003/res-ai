"use client"

import { academicDegrees, academicRanks } from "@/components/shares/utils/academic.utils"

interface AcademicFilterProps {
  selectedDegree: string
  selectedRank: string
  setSelectedDegree: (degree: string) => void
  setSelectedRank: (rank: string) => void
  setCurrentPage: (page: number) => void
}

export default function AcademicFilter({
  selectedDegree,
  selectedRank,
  setSelectedDegree,
  setSelectedRank,
  setCurrentPage,
}: AcademicFilterProps) {
  const handleDegreeChange = (degree: string) => {
    setSelectedDegree(degree)
    setCurrentPage(1)
  }

  const handleRankChange = (rank: string) => {
    setSelectedRank(rank)
    setCurrentPage(1)
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-6">
        {/* Academic Degree Filter */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <select
              value={selectedDegree}
              onChange={e => handleDegreeChange(e.target.value)}
              className="appearance-none px-6 py-3 pr-10 rounded-full border-2 border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-0 focus:border-[#2E8BC0] transition-all duration-300 shadow-sm hover:shadow-md min-w-[180px] cursor-pointer"
            >
              <option value="">Tất cả học vị</option>
              {academicDegrees.map(degree => (
                <option key={degree.value} value={degree.value}>
                  {degree.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Academic Rank Filter */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <select
              value={selectedRank}
              onChange={e => handleRankChange(e.target.value)}
              className="appearance-none px-6 py-3 pr-10 rounded-full border-2 border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-0 focus:border-[#2E8BC0] transition-all duration-300 shadow-sm hover:shadow-md min-w-[180px] cursor-pointer"
            >
              <option value="">Tất cả học hàm</option>
              {academicRanks.map(rank => (
                <option key={rank.value} value={rank.value}>
                  {rank.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
