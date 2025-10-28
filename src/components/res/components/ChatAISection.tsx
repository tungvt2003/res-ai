"use client"
import { AuthRequiredModal } from "@/components/shares/components/AuthRequiredModal"
import { useAuthGuard } from "@/components/shares/hooks/useAuthGuard"
import { BiBookOpen, BiBot, BiBrain, BiLinkExternal, BiSearch } from "react-icons/bi"

export default function ChatAISection() {
  const { requireAuth, showAuthModal, featureName, closeAuthModal } = useAuthGuard()

  const handleChatClick = () => {
    requireAuth("Chat Bot Res-AI.EDU", () => {
      window.location.href = "/res/chat-ai"
    })
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-4">
            <BiBot className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#202c45] mb-2">Chat Bot Res-AI.EDU</h3>
            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
              Trò chuyện AI
            </span>
          </div>
        </div>

        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Trò chuyện trực tiếp với AI để được hỗ trợ nghiên cứu, gợi ý đề tài, và tư vấn về phương pháp nghiên cứu khoa
          học.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <BiBrain className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700">Gợi ý đề tài nghiên cứu</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <BiBookOpen className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700">Tìm kiếm tài liệu học thuật</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <BiSearch className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700">Hỗ trợ phương pháp nghiên cứu</span>
          </div>
        </div>

        <button
          onClick={handleChatClick}
          className="inline-flex cursor-pointer items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          <BiBot className="w-6 h-6" />
          Bắt đầu trò chuyện
          <BiLinkExternal className="w-5 h-5" />
        </button>
      </div>

      {/* Auth Required Modal */}
      <AuthRequiredModal isOpen={showAuthModal} onClose={closeAuthModal} featureName={featureName} />
    </div>
  )
}
