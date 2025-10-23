"use client"
interface MajorFilterProps {
  majors: { id: string; name: string }[]
  selectedMajor: string
  setSelectedMajor: (majorId: string) => void
  setCurrentPage: (page: number) => void
  setSearchTerm: (term: string) => void
  setDebouncedSearchTerm: (term: string) => void
}

export default function MajorFilter({
  majors,
  selectedMajor,
  setSelectedMajor,
  setCurrentPage,
  setSearchTerm,
  setDebouncedSearchTerm,
}: MajorFilterProps) {
  const handleMajorClick = (majorId: string) => {
    setSelectedMajor(majorId)
    setCurrentPage(1)
    setSearchTerm("") // Clear search when changing major
    setDebouncedSearchTerm("") // Clear debounced search too
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {majors.map(major => (
        <button
          key={major.id}
          onClick={() => handleMajorClick(major.id)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border
            ${
              selectedMajor === major.id
                ? "bg-gradient-to-r from-[#2E8BC0] to-[#7FC3E8] text-white shadow-lg border-transparent"
                : "bg-white text-gray-600 hover:bg-gray-100 border-gray-200"
            }
          `}
          style={{
            minWidth: "120px",
            boxSizing: "border-box",
          }}
        >
          <span className="inline-block w-full text-center">{major.name}</span>
        </button>
      ))}
    </div>
  )
}
