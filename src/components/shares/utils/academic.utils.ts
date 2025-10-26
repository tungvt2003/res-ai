// Academic degree mapping
export const academicDegrees = [
  { value: "ts", label: "Tiến sĩ" },
  { value: "ths", label: "Thạc sĩ" },
  { value: "ncs", label: "Nghiên cứu sinh" },
  { value: "cn", label: "Cử nhân" },
  { value: "ks", label: "Kỹ sư" },
  { value: "ds", label: "Dược sĩ" },
  { value: "bs", label: "Bác sĩ" },
  { value: "tc", label: "Trung cấp" },
  { value: "khac", label: "Khác" },
]

// Academic rank mapping
export const academicRanks = [
  { value: "gs", label: "Giáo sư" },
  { value: "pgs", label: "Phó giáo sư" },
  { value: "none", label: "Không có học hàm" },
]

// Utility functions for academic titles
export const academicUtils = {
  // Get academic degree label
  getDegreeLabel: (degree: string): string => {
    const found = academicDegrees.find(d => d.value === degree)
    return found?.label || degree.toUpperCase()
  },

  // Get academic rank label
  getRankLabel: (rank: string): string => {
    const found = academicRanks.find(r => r.value === rank)
    return found?.label || rank.toUpperCase()
  },

  // Get full academic title (rank + degree)
  getFullTitle: (rank: string, degree: string): string => {
    const rankLabel = academicUtils.getRankLabel(rank)
    const degreeLabel = academicUtils.getDegreeLabel(degree)

    // If rank is "none", only show degree
    if (rank === "none") {
      return degreeLabel
    }

    // Otherwise show both rank and degree
    return `${rankLabel} - ${degreeLabel}`
  },

  // Get short academic title (abbreviated)
  getShortTitle: (rank: string, degree: string): string => {
    if (rank === "none") {
      return degree.toUpperCase()
    }

    return `${rank.toUpperCase()} - ${degree.toUpperCase()}`
  },

  // Get academic title with proper formatting
  getFormattedTitle: (rank: string, degree: string): string => {
    const rankLabel = academicUtils.getRankLabel(rank)
    const degreeLabel = academicUtils.getDegreeLabel(degree)

    if (rank === "none") {
      return degreeLabel
    }

    return `${rankLabel}, ${degreeLabel}`
  },

  // Get color class for academic degree
  getDegreeColor: (degree: string): string => {
    const colorMap: Record<string, string> = {
      ts: "bg-blue-100 text-blue-800",
      ths: "bg-green-100 text-green-800",
      ncs: "bg-yellow-100 text-yellow-800",
      cn: "bg-purple-100 text-purple-800",
      ks: "bg-orange-100 text-orange-800",
      ds: "bg-pink-100 text-pink-800",
      bs: "bg-red-100 text-red-800",
      tc: "bg-gray-100 text-gray-800",
      khac: "bg-yellow-100 text-yellow-800",
    }

    return colorMap[degree] || "bg-gray-100 text-gray-800"
  },

  // Get color class for academic rank
  getRankColor: (rank: string): string => {
    const colorMap: Record<string, string> = {
      gs: "bg-red-100 text-red-800",
      pgs: "bg-blue-100 text-blue-800",
      none: "bg-gray-100 text-gray-800",
    }

    return colorMap[rank] || "bg-gray-100 text-gray-800"
  },

  // Get combined color class
  getCombinedColor: (rank: string, degree: string): string => {
    if (rank === "none") {
      return academicUtils.getDegreeColor(degree)
    }

    // For combined display, use rank color as primary
    return academicUtils.getRankColor(rank)
  },
}
