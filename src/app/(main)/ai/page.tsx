import AIToolsSection from "@/components/ai/components/AIToolsSection"
import ArticlesSection from "@/components/ai/components/ArticlesSection"
import HeroSection from "@/components/ai/components/HeroSection"

export default function Ai() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
      <main className="flex-grow pt-20 relative">
        <HeroSection />
        <ArticlesSection />
        <AIToolsSection />
      </main>
    </div>
  )
}
