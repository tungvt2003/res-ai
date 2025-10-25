"use client"
import { LoginRequiredModal } from "@/components/shares/components/LoginRequiredModal"
import { LogoutModal } from "@/components/shares/components/LogoutModal"
import { useAuthGuard } from "@/components/shares/hooks/useAuthGuard"
import { persistor, useAppDispatch, useAppSelector } from "@/components/shares/stores"
import { clearAuth } from "@/components/shares/stores/authSlice"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import Avatar from "react-avatar"
import { BiBook, BiBookOpen, BiBrain, BiHome, BiSearch, BiUser } from "react-icons/bi"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const auth = useAppSelector(state => state.auth)
  const image = auth.user?.fullName
  const isLoggedIn = auth.isAuthenticated
  const dispatch = useAppDispatch()
  const name = auth.user?.fullName
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { showAuthModal, featureName, closeAuthModal } = useAuthGuard()

  // Helper function to check if a route is active
  const isActiveRoute = (route: string) => {
    if (route === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(route)
  }

  // Helper function to get active class
  const getActiveClass = (route: string) => {
    return isActiveRoute(route) ? "header-li-item-active" : "header-li-item"
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      dispatch(clearAuth())
      persistor.flush()
      localStorage.removeItem("accessToken")
      localStorage.removeItem("user")

      setShowLogoutModal(false)
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="bg-white shadow-md py-2 px-6 md:px-12 fixed top-0 w-full z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-between w-full">
          <div className="shrink-0 flex items-center space-x-2">
            <Link href="/" className="text-2xl font-bold bg-[#202c45] bg-clip-text text-transparent flex items-center">
              <Image src={"/logo-su-pham.ico"} alt="Logo" width={60} height={60} className="rounded-md" />
              <span className="ml-4 hidden sm:inline">RES-AI.EDU</span>
            </Link>
          </div>

          {/* Menu */}
          <ul className="hidden md:flex space-x-6 lg:space-x-20">
            <li>
              <Link href="/" className={`${getActiveClass("/")} flex items-center gap-2`}>
                <BiHome className="w-5 h-5" />
                Trang chủ
              </Link>
            </li>

            <li className="relative group">
              <Link href="/res" className={`${getActiveClass("/res")} flex items-center gap-2`}>
                <BiSearch className="w-5 h-5" />
                Res
              </Link>
            </li>
            <li className="relative group">
              <Link href="#" className={`${getActiveClass("/edu")} flex items-center gap-2`}>
                <BiBookOpen className="w-5 h-5" />
                Edu
              </Link>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <Link
                    href="/edu/mentor"
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isActiveRoute("/edu/mentor")
                        ? "bg-blue-50 text-[#202c45] font-medium"
                        : "text-gray-700 hover:bg-blue-50 hover:text-[#202c45]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BiUser className="w-4 h-4" />
                      Giảng viên
                    </div>
                  </Link>
                  <Link
                    href="/edu/blog"
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isActiveRoute("/edu/blog")
                        ? "bg-blue-50 text-[#202c45] font-medium"
                        : "text-gray-700 hover:bg-blue-50 hover:text-[#202c45]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BiBook className="w-4 h-4" />
                      Blog
                    </div>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <Link href="/ai" className={`${getActiveClass("/ai")} flex items-center gap-2`}>
                <BiBrain className="w-5 h-5" />
                AI
              </Link>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            {/* Auth */}
            {!isLoggedIn ? (
              <button
                className="px-4 py-1.5 text-white border border-[#202c45] rounded-4xl bg-[#202c45] hover:bg-[#202c45]/80 transition cursor-pointer duration-300"
                onClick={() => router.push("/login")}
              >
                Đăng nhập
              </button>
            ) : (
              <div className="relative group">
                <Avatar name={name || ""} src={image || ""} size="40" round={true} className="cursor-pointer" />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition p-2 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{name}</div>
                      <div className="text-xs text-gray-500">{auth.user?.email}</div>
                    </div>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right section */}
      </nav>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />

      {/* Login Required Modal */}
      <LoginRequiredModal isOpen={showAuthModal} onClose={closeAuthModal} featureName={featureName} />
    </header>
  )
}
