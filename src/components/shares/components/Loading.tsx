import React from "react"

interface LoadingProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ size = "md", text = "Đang tải...", className = "" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {/* Spinner */}
      <div className="relative">
        <div
          className={`
            ${sizeClasses[size]} 
            border-4 border-gray-200 
            border-t-blue-600 
            rounded-full 
            animate-spin
          `}
        />
        {/* Inner ring for more visual appeal */}
        <div
          className={`
            absolute top-1 left-1 
            ${size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-10 h-10"} 
            border-2 border-transparent 
            border-t-blue-400 
            rounded-full 
            animate-spin
          `}
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        />
      </div>

      {/* Loading text */}
      {text && <p className={`text-gray-600 font-medium ${textSizeClasses[size]} animate-pulse`}>{text}</p>}
    </div>
  )
}

// Full screen loading component
export const FullScreenLoading: React.FC<{ text?: string }> = ({ text = "Đang tải..." }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
      <Loading size="lg" text={text} />
    </div>
  )
}

// Inline loading component
export const InlineLoading: React.FC<{ text?: string; className?: string }> = ({
  text = "Đang tải...",
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <Loading size="md" text={text} />
    </div>
  )
}

// Button loading component
export const ButtonLoading: React.FC<{ size?: "sm" | "md" }> = ({ size = "sm" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          ${size === "sm" ? "w-4 h-4" : "w-5 h-5"} 
          border-2 border-white border-t-transparent 
          rounded-full 
          animate-spin
        `}
      />
    </div>
  )
}

export default Loading
