"use client"

import { useRegisterMutation } from "@/components/modules/auth/hooks/mutations/use-register.mutation"
import { isValidPassword } from "@/components/shares/utils/password"
import { Input } from "antd"
import { AxiosError } from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { toast } from "react-toastify"

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [fullName, setFullName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  type ErrorResponse = {
    status: number
    message: string
  }
  const registerMutation = useRegisterMutation({
    onSuccess: () => {
      toast.success("Đăng ký thành công!")
      router.push("/login")
    },
    onError: error => {
      const axiosError = error as AxiosError<ErrorResponse>
      const backendMessage = axiosError.response?.data?.message
      toast.error(backendMessage || "Đăng ký thất bại. Vui lòng thử lại.")
      setIsLoading(false)
    },
  })

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!username.trim()) {
      newErrors.username = "Tên đăng nhập không được để trống."
    }

    if (!fullName.trim()) {
      newErrors.fullName = "Họ tên không được để trống."
    }

    if (!email.trim()) {
      newErrors.email = "Email không được để trống."
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ."
    }

    if (!phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống."
    } else if (!/^[0-9]{10,11}$/.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ."
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống."
    } else if (password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự."
    } else if (!isValidPassword(password)) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt."
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống."
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    registerMutation.mutate({
      username,
      password,
      fullName,
      email,
      phone,
      roles: "user",
    })
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-2">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Hero Image */}
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-600 p-8 lg:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image src="/logo-su-pham.ico" alt="Logo" width={200} height={200} className="object-contain" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">Tham gia cùng chúng tôi!</h1>
                  <p className="text-blue-100 text-lg">Tạo tài khoản để bắt đầu hành trình nghiên cứu khoa học</p>
                </div>
                <div className="hidden lg:block">
                  <div className="w-64 h-64 bg-white/10 rounded-full absolute -bottom-32 -right-32"></div>
                  <div className="w-32 h-32 bg-white/5 rounded-full absolute -top-16 -left-16"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="lg:w-1/2 p-6 lg:p-8">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký tài khoản</h2>
                  <p className="text-gray-600">Điền thông tin để tạo tài khoản mới</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên
                    </label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Nhập họ và tên"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      size="large"
                      disabled={isLoading}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Username */}
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Tên đăng nhập
                    </label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      size="large"
                      disabled={isLoading}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      size="large"
                      disabled={isLoading}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      size="large"
                      disabled={isLoading}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full h-10 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Xác nhận mật khẩu
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full h-10 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        size="large"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={handleToggleConfirmPassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-10 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Đang đăng ký...
                      </div>
                    ) : (
                      "Đăng ký tài khoản"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Đã có tài khoản?{" "}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
