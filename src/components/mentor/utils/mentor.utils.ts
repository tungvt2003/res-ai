export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

export const formatExperience = (years: number): string => {
  if (years === 1) return "1 năm kinh nghiệm"
  return `${years} năm kinh nghiệm`
}

export const formatEducation = (education: string): string => {
  // Format education string to be more readable
  return education.replace(/\s+/g, " ").trim()
}

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2)
}
