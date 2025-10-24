export interface Keyword {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Mentor {
  id: string
  fullName: string
  academicDegree?: string | null
  academicRank?: string | null
  workUnit?: string | null
  position?: string | null
  image?: string | null
  website?: string | null
  isActive?: boolean
  createdAt?: string | null
  updatedAt?: string | null
  keywords?: Keyword[]
}

export interface MentorSearchParams {
  fullName?: string
  academicDegree?: string
  academicRank?: string
}

export interface AcademicDegree {
  label: string
  value: string
}

export interface AcademicRank {
  label: string
  value: string
}
