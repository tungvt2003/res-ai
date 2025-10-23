"use client"

interface SearchResultsProps {
  debouncedSearchTerm: string
  filteredBlogsCount: number
  isSearching: boolean
}

export default function SearchResults({ debouncedSearchTerm, filteredBlogsCount, isSearching }: SearchResultsProps) {
  if (!debouncedSearchTerm) return null

  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-2">
        {isSearching && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2E8BC0]"></div>}
        <p className="text-gray-600">
          Tìm thấy <span className="font-semibold text-[#2E8BC0]">{filteredBlogsCount}</span> bài viết cho từ khóa{" "}
          <span className="font-semibold text-gray-800">&ldquo;{debouncedSearchTerm}&rdquo;</span>
        </p>
      </div>
    </div>
  )
}
