export type Keyword = {
  id: string
  name: string
  createdAt?: string | null
  updatedAt?: string | null
}

export type Mentor = {
  id: string
  fullName: string
  academicDegree?: string | null
  academicRank?: string | null
  workUnit?: string | null
  position?: string | null
  image?: string | null
  website?: string | null
  isActive?: boolean
  keywords?: Keyword[]
  createdAt?: string | null
  updatedAt?: string | null
}
