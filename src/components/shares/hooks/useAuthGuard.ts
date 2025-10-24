"use client"

import { useAppSelector } from "@/components/shares/stores"
import { useState } from "react"

export const useAuthGuard = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [featureName, setFeatureName] = useState("")

  const requireAuth = (feature: string, callback?: () => void) => {
    if (isAuthenticated) {
      callback?.()
    } else {
      setFeatureName(feature)
      setShowAuthModal(true)
    }
  }

  const closeAuthModal = () => {
    setShowAuthModal(false)
    setFeatureName("")
  }

  return {
    isAuthenticated,
    showAuthModal,
    featureName,
    requireAuth,
    closeAuthModal,
  }
}
