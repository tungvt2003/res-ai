import ResearchLiteracyBadge from "@/components/ResearchLiteracy/components/ResearchLiteracyBadge"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Research Literacy - RES-AI.EDU",
  description: "Research Literacy page",
}

const DashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <main className="grow mt-20 relative">
        <ResearchLiteracyBadge />
      </main>
    </div>
  )
}

export default DashboardPage
