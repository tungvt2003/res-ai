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
import { BiBookContent, BiBookOpen, BiBrain, BiHome, BiMenu, BiSearch, BiX } from "react-icons/bi"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const auth = useAppSelector(state => state.auth)
  const image = auth.user?.fullName
  const isLoggedIn = auth.isAuthenticated
  const dispatch = useAppDispatch()
  const name = auth.user?.fullName

  // Debug auth state
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
      setIsMobileMenuOpen(false)
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="bg-white shadow-md py-2 px-6 md:px-12 fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="shrink-0 flex items-center space-x-2">
            <Link href="/" className="text-2xl font-bold bg-[#202c45] bg-clip-text text-transparent flex items-center">
              <Image src={"/logo-su-pham.ico"} alt="Logo" width={60} height={60} className="rounded-md" />
              <span className="ml-4 hidden sm:inline">RES-AI.EDU</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 lg:space-x-10">
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
              <Link href="/edu" className={`${getActiveClass("/edu")} flex items-center gap-2`}>
                <BiBookOpen className="w-5 h-5" />
                Edu
              </Link>
            </li>
            <li>
              <Link href="/ai" className={`${getActiveClass("/ai")} flex items-center gap-2`}>
                <BiBrain className="w-5 h-5" />
                AI
              </Link>
            </li>
            <li>
              <Link
                href="/scientific-public"
                className={`${getActiveClass("/scientific-public")} flex items-center gap-2`}
              >
                <BiBookContent className="w-5 h-5" />
                Scientific Public
              </Link>
            </li>
          </ul>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <button
                  className="px-4 py-1.5 text-white border border-[#202c45] rounded-4xl bg-[#202c45] hover:bg-[#202c45]/80 transition cursor-pointer duration-300"
                  onClick={() => router.push("/login")}
                >
                  Đăng nhập
                </button>
                <button
                  className="px-4 py-1.5 text-[#202c45] border border-[#202c45] rounded-4xl bg-white hover:bg-gray-50 transition cursor-pointer duration-300"
                  onClick={() => router.push("/signup")}
                >
                  Đăng ký
                </button>
              </>
            ) : (
              <div className="relative group">
                <Avatar name={name || ""} src={image || ""} size="40" round={true} className="cursor-pointer" />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition p-2 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{name}</div>
                      <div className="text-xs text-gray-500">{auth.user?.email}</div>
                    </div>
                    <Link
                      href="/research-literacy"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-2">Research Literacy</div>
                    </Link>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors flex items-center gap-2 mt-1"
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <BiX className="w-6 h-6 text-gray-700" />
            ) : (
              <BiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/30 mobile-menu-backdrop" onClick={closeMobileMenu} />

          {/* Mobile Menu */}
          <div className="fixed top-0 right-0 h-full w-80 mobile-menu-panel bg-white shadow-xl mobile-menu-slide-in mobile-menu-transition">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-[18px] border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Image src={"/logo-su-pham.ico"} alt="Logo" width={40} height={40} className="rounded-md" />
                  <span className="text-lg font-bold text-[#202c45]">RES-AI.EDU</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <BiX className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Navigation Links */}
                <div className="p-6">
                  <nav className="space-y-4">
                    <Link
                      href="/"
                      className={`${getActiveClass("/")} mobile-menu-item flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors`}
                      onClick={closeMobileMenu}
                    >
                      <BiHome className="w-5 h-5" />
                      Trang chủ
                    </Link>
                    <Link
                      href="/res"
                      className={`${getActiveClass("/res")} mobile-menu-item flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors`}
                      onClick={closeMobileMenu}
                    >
                      <BiSearch className="w-5 h-5" />
                      Res
                    </Link>
                    <Link
                      href="/edu"
                      className={`${getActiveClass("/edu")} mobile-menu-item flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors`}
                      onClick={closeMobileMenu}
                    >
                      <BiBookOpen className="w-5 h-5" />
                      Edu
                    </Link>
                    <Link
                      href="/ai"
                      className={`${getActiveClass("/ai")} mobile-menu-item flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors`}
                      onClick={closeMobileMenu}
                    >
                      <BiBrain className="w-5 h-5" />
                      AI
                    </Link>
                    <Link
                      href="/scientific-public"
                      className={`${getActiveClass("/scientific-public")} mobile-menu-item flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors`}
                      onClick={closeMobileMenu}
                    >
                      <BiBookContent className="w-5 h-5" />
                      Scientific Public
                    </Link>
                  </nav>
                </div>

                {/* User Section */}
                <div className="border-t border-gray-200 p-6">
                  {!isLoggedIn ? (
                    <div className="space-y-3">
                      <button
                        className="w-full px-4 py-3 text-white border border-[#202c45] rounded-lg bg-[#202c45] hover:bg-[#202c45]/80 transition cursor-pointer duration-300"
                        onClick={() => {
                          router.push("/login")
                          closeMobileMenu()
                        }}
                      >
                        Đăng nhập
                      </button>
                      <button
                        className="w-full px-4 py-3 text-[#202c45] border border-[#202c45] rounded-lg bg-white hover:bg-gray-50 transition cursor-pointer duration-300"
                        onClick={() => {
                          router.push("/signup")
                          closeMobileMenu()
                        }}
                      >
                        Đăng ký
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* User Info */}
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <Avatar name={name || ""} src={image || ""} size="50" round={true} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{name}</div>
                          <div className="text-sm text-gray-500 truncate">{auth.user?.email}</div>
                        </div>
                      </div>

                      {/* Admin Link */}
                      {(auth.user?.roles === "admin" || auth.user?.roles?.includes("admin")) && (
                        <Link
                          href="/research-literacy"
                          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                          onClick={closeMobileMenu}
                        >
                          <BiBookContent className="w-5 h-5" />
                          Research Literacy
                        </Link>
                      )}

                      {/* Logout Button */}
                      <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center gap-3 py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />

      {/* Login Required Modal */}
      <LoginRequiredModal isOpen={showAuthModal} onClose={closeAuthModal} featureName={featureName} />
    </>
  )
}
