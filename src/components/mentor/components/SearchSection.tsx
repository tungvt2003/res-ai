"use client"

import { BiSearch, BiX } from "react-icons/bi"

interface SearchSectionProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  setDebouncedSearchTerm: (value: string) => void
  setIsSearching: (value: boolean) => void
  setCurrentPage: (value: number) => void
}

export default function SearchSection({
  searchTerm,
  setSearchTerm,
  setDebouncedSearchTerm,
  setIsSearching,
  setCurrentPage,
}: SearchSectionProps) {
  const suggestions = ["Tiến sĩ", "Thạc sĩ", "Giáo sư", "Trưởng khoa"]

  const handleClearSearch = () => {
    setSearchTerm("")
    setDebouncedSearchTerm("")
    setIsSearching(false)
    setCurrentPage(1)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setDebouncedSearchTerm(suggestion)
    setIsSearching(false)
  }

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tìm kiếm giảng viên</h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Nhập tên giảng viên, chức vụ hoặc chuyên ngành..."
              className="w-full px-6 py-4 pl-14 pr-14 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:ring-0 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md hover:border-transparent"
            />
            <BiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />

            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                title="Xóa tìm kiếm"
              >
                <BiX className="w-5 h-5" />
              </button>
            )}
          </div>

          {searchTerm === "" && (
            <div className="mt-4 flex flex-wrap justify-center gap-2 items-center">
              <label className="text-sm text-gray-500">Gợi ý:</label>
              {suggestions.map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-[#2E8BC0] hover:text-white text-gray-600 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
