"use client"
import { AuthRequiredModal } from "@/components/shares/components/AuthRequiredModal"
import { useAuthGuard } from "@/components/shares/hooks/useAuthGuard"
import { BiBookOpen } from "react-icons/bi"

interface MajorsSectionProps {
  majors: { name: string; slug: string }[]
  onMajorClick: (major: { name: string; slug: string }) => void
}

export default function MajorsSection({ majors, onMajorClick }: MajorsSectionProps) {
  const { requireAuth, showAuthModal, featureName, closeAuthModal } = useAuthGuard()

  const handleMajorClick = (major: string) => {
    requireAuth("Tree View", () => {
      onMajorClick({ name: major, slug: major.toLowerCase() })
    })
  }
  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#202c45] mb-4">Từ khóa chuyên ngành</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hình thành ý tưởng nghiên cứu với hệ thống từ khóa chuyên ngành và trợ lý AI học thuật. Thực hiện kết nối với
          đội ngũ Mentor để nhận được sự tư vấn, định hướng chuyên môn
        </p>
      </div>

      {/* Majors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
        {majors.map((major, index) => (
          <div
            key={index}
            onClick={() => handleMajorClick(major.slug)}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-4">
                  <BiBookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                    Chuyên ngành
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#202c45] mb-4 group-hover:text-blue-600 transition-colors">
                {major.name}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Khám phá thông tin chi tiết về chuyên ngành {major.name.toLowerCase()}, hướng nghề nghiệp và cơ hội phát
                triển trong lĩnh vực này.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Auth Required Modal */}
      <AuthRequiredModal isOpen={showAuthModal} onClose={closeAuthModal} featureName={featureName} />
    </>
  )
}
