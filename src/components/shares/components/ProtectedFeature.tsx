"use client"

import { useAuthGuard } from "@/components/shares/hooks/useAuthGuard"
import { FaLock } from "react-icons/fa"

interface ProtectedFeatureProps {
  featureName: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const ProtectedFeature = ({ featureName, children, fallback }: ProtectedFeatureProps) => {
  const { isAuthenticated, requireAuth } = useAuthGuard()

  const handleClick = () => {
    requireAuth(featureName, () => {
      // Callback sẽ được gọi nếu user đã đăng nhập
      console.log(`User đã đăng nhập, có thể sử dụng ${featureName}`)
    })
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="relative group">
      {fallback || (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <FaLock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-3">Cần đăng nhập để sử dụng</p>
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      )}
      <div className="opacity-50 pointer-events-none">{children}</div>
    </div>
  )
}
