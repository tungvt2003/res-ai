export interface Category {
  id: string
  name: string
  description: string
  slug: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CategoryFilter {
  name?: string
}
