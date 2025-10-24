"use client"

import { useLoginMutation } from "@/components/modules/auth/hooks/mutations/use-login.mutation"
import { setAuth } from "@/components/shares/stores/authSlice"
import { Input } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

export default function LoginPage() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const loginMutation = useLoginMutation({
    onSuccess: async data => {
      toast.success("Đăng nhập thành công!")

      // Lưu thông tin user và token vào Redux store
      if (data.data?.user) {
        dispatch(
          setAuth({
            accessToken: data.data.accessToken,
            user: data.data.user,
          }),
        )
      }

      localStorage.setItem("accessToken", data.data?.accessToken || "")
      localStorage.setItem("user", JSON.stringify(data.data?.user || null))

      router.push("/")
    },
    onError: () => {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu")
      setIsLoading(false)
    },
  })

  const handleSubmit = async () => {
    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
      return
    }

    setIsLoading(true)
    loginMutation.mutate({ username, password })
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-600 p-8 lg:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image src="/logo-su-pham.ico" alt="Logo" width={200} height={200} className="object-contain" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">Chào mừng trở lại!</h1>
                  <p className="text-blue-100 text-lg">Đăng nhập để có thể trải nghiệm các nghiên cứu khoa học</p>
                </div>
                <div className="hidden lg:block">
                  <div className="w-64 h-64 bg-white/10 rounded-full absolute -bottom-32 -right-32"></div>
                  <div className="w-32 h-32 bg-white/5 rounded-full absolute -top-16 -left-16"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
                  <p className="text-gray-600">Nhập thông tin để truy cập tài khoản</p>
                </div>

                <form
                  onSubmit={e => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                      Tên đăng nhập
                    </label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSubmit()}
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      size="large"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        size="large"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Ghi nhớ đăng nhập
                      </label>
                    </div>
                    {/* <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                      Quên mật khẩu?
                    </Link> */}
                  </div>

                  <button
                    type="button"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Đang đăng nhập...
                      </div>
                    ) : (
                      "Đăng nhập"
                    )}
                  </button>
                </form>

                <div className="mt-8 space-y-4">
                  {/* Guest Access Button */}
                  <button
                    onClick={() => router.push("/")}
                    className="w-full h-12 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Sử dụng website không đăng nhập
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Hoặc</span>
                    </div>
                  </div>

                  {/* Sign up link */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Chưa có tài khoản?{" "}
                      <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        Đăng ký ngay
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
