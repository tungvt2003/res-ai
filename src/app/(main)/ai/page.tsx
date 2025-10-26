import AIToolsSection from "@/components/ai/components/AIToolsSection"
import ArticlesSection from "@/components/ai/components/ArticlesSection"
import HeroSection from "@/components/ai/components/HeroSection"
import PlagiarismCheckSection from "@/components/ai/components/PlagiarismCheckSection"
import MentorConsultationForm from "@/components/home/components/MentorConsultationForm"

export default function Ai() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <main className="grow pt-20 relative">
        <HeroSection />
        <ArticlesSection />
        <AIToolsSection />
        <PlagiarismCheckSection />
        <MentorConsultationForm />
      </main>
    </div>
  )
}
