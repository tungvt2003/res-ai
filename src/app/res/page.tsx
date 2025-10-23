"use client"
import ChatAISection from "@/components/res/components/ChatAISection"
import HeroSection from "@/components/res/components/HeroSection"
import InfoSection from "@/components/res/components/InfoSection"
import MajorsSection from "@/components/res/components/MajorsSection"
import { useState } from "react"

export default function Res() {
  const [suggestedKeywords] = useState(["Tâm lý học", "Giáo dục học"])

  const handleKeywordClick = (keyword: string) => {
    // Navigate to tree view page with major parameter
    window.location.href = `/res/tree?major=${encodeURIComponent(keyword)}`
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
      <main className="flex-grow pt-20 relative">
        <HeroSection />

        {/* Main Options Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <MajorsSection majors={suggestedKeywords} onMajorClick={handleKeywordClick} />
            <ChatAISection />
            <InfoSection />
          </div>
        </div>
      </main>
    </div>
  )
}
