"use client"

interface Category {
  id: string
  name: string
  slug: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  setSelectedCategory: (categoryId: string) => void
  setCurrentPage: (page: number) => void
  setSearchTerm: (term: string) => void
  setDebouncedSearchTerm: (term: string) => void
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
  setSearchTerm,
  setDebouncedSearchTerm,
}: CategoryFilterProps) {
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
    setSearchTerm("") // Clear search when changing category
    setDebouncedSearchTerm("") // Clear debounced search too
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border
            ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-[#2E8BC0] to-[#7FC3E8] text-white shadow-lg border-transparent"
                : "bg-white text-gray-600 hover:bg-gray-100 border-gray-200"
            }
          `}
          style={{
            minWidth: "120px",
            boxSizing: "border-box",
          }}
        >
          <span className="inline-block w-full text-center">{category.name}</span>
        </button>
      ))}
    </div>
  )
}
