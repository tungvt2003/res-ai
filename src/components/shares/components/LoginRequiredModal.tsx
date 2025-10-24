"use client"

import { useRouter } from "next/navigation"
import { FaLock, FaSignInAlt, FaTimes } from "react-icons/fa"

interface LoginRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
  featureName?: string
}

export const LoginRequiredModal = ({
  isOpen,
  onClose,
  title = "Cần đăng nhập",
  message = "Bạn cần đăng nhập để sử dụng tính năng này",
  featureName = "tính năng",
}: LoginRequiredModalProps) => {
  const router = useRouter()

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleLogin = () => {
    onClose()
    router.push("/login")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FaLock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaTimes className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600 mb-2">{message}</p>
            <p className="text-sm text-gray-500">
              Đăng nhập để truy cập <span className="font-medium text-gray-700">{featureName}</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleLogin}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FaSignInAlt className="w-4 h-4" />
              Đăng nhập ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
