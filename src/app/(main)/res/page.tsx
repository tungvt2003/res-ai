"use client"
import MentorConsultationForm from "@/components/home/components/MentorConsultationForm"
import ChatAISection from "@/components/res/components/ChatAISection"
import HeroSection from "@/components/res/components/HeroSection"
import InfoSection from "@/components/res/components/InfoSection"
import MajorsSection from "@/components/res/components/MajorsSection"
import { useState } from "react"

export default function Res() {
  const [suggestedKeywords] = useState([
    { name: "Tâm lý học", slug: "tam-ly-hoc" },
    { name: "Giáo dục học", slug: "giao-duc-hoc" },
  ])

  const handleKeywordClick = (major: { name: string; slug: string }) => {
    // Navigate to tree view page with major parameter
    window.location.href = `/res/tree?major=${encodeURIComponent(major.slug)}`
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <main className="grow pt-20 relative">
        <HeroSection />

        {/* Main Options Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <MajorsSection majors={suggestedKeywords} onMajorClick={handleKeywordClick} />
            <ChatAISection />
            <InfoSection />
            <MentorConsultationForm />
          </div>
        </div>
      </main>
    </div>
  )
}
