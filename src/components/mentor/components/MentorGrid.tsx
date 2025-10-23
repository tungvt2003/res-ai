"use client"

import { Mentor } from "@/types"
import MentorCard from "./MentorCard"

interface MentorGridProps {
  mentors: Mentor[]
  formatDate: (dateString: string) => string
  truncateText: (text: string, maxLength: number) => string
}

export default function MentorGrid({ mentors, formatDate, truncateText }: MentorGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mentors.map(mentor => (
        <MentorCard key={mentor.id} mentor={mentor} formatDate={formatDate} truncateText={truncateText} />
      ))}
    </div>
  )
}
