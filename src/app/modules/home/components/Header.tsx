"use client"
import { persistor, useAppDispatch, useAppSelector } from "@/app/shares/stores"
import { clearTokens } from "@/app/shares/stores/authSlice"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Avatar from "react-avatar"

export default function Header() {
  const router = useRouter()
  const auth = useAppSelector(state => state.auth)
  const image = auth.patient?.image
  const isLoggedIn = !!auth.accessToken
  const dispatch = useAppDispatch()
  const name = auth.patient?.fullName

  return (
    <header className="bg-white shadow-md py-2 px-6 md:px-12 fixed top-0 w-full z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-between w-full">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Link href="/" className="text-2xl font-bold bg-[#202c45] bg-clip-text text-transparent flex items-center">
              <Image src={"/logo-su-pham.ico"} alt="Logo" width={60} height={60} className="rounded-md" />
              <span className="ml-4 hidden sm:inline">Res AI</span>
            </Link>
          </div>

          {/* Menu */}
          <ul className="hidden md:flex space-x-6 lg:space-x-20">
            <li>
              <Link href="/" className="header-li-item">
                Trang chủ
              </Link>
            </li>

            <li>
              <Link href="/res" className="header-li-item">
                Res
              </Link>
            </li>

            <li>
              <Link href="/edu" className="header-li-item">
                Edu
              </Link>
            </li>
            <li>
              <Link href="/ai" className="header-li-item">
                AI
              </Link>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            {/* Auth */}
            {!isLoggedIn ? (
              <>
                <button
                  className="px-4 py-1.5 text-white border border-[#202c45] rounded-4xl bg-[#202c45] hover:bg-[#202c45]/80 transition cursor-pointer duration-300"
                  onClick={() => router.push("/signin")}
                >
                  Đăng nhập
                </button>
              </>
            ) : (
              <div className="relative group">
                <Avatar name={name || ""} src={image || ""} size="40" round={true} />
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition p-2">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-md">
                    Hồ sơ
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(clearTokens())
                      persistor.flush()
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 rounded-md"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right section */}
      </nav>
    </header>
  )
}
