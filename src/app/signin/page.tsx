"use client"

import { useLoginFirebaseMutation } from "@/components/modules/auth/hooks/mutations/use-login-by-google.mutation"
import { useLoginMutation } from "@/components/modules/auth/hooks/mutations/use-login.mutation"
import { Input } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaGoogle } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

export default function LoginPage() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const router = useRouter()

  const loginMutation = useLoginMutation({
    onSuccess: async data => {
      toast.success("Đăng nhập thành công!")
      localStorage.setItem("email", email)
      localStorage.setItem("user_id", data.data?.user_id || "")

      localStorage.removeItem("email")
      localStorage.removeItem("user_id")
      router.push("/")
    },
    onError: error => {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate({ username, password })
  }

  const loginFirebaseMutation = useLoginFirebaseMutation({
    onSuccess: async data => {
      localStorage.setItem("email", email)
      toast.success("Login Google thành công!")

      try {
        localStorage.removeItem("email")
        router.push("/")
      } catch (err) {
        toast.warning("Vui lòng hoàn thành hồ sơ bệnh nhân của bạn.")
        router.push("/create-patient")
      }
    },
    onError: err => {
      toast.error(err.response?.data?.message || "Login Google thất bại")
    },
  })

  // const handleGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider)
  //     const user = result.user
  //     setEmail(user.email || "")

  //     loginFirebaseMutation.mutate({
  //       firebase_uid: user.uid,
  //       email: user.email || "",
  //     })
  //   } catch (error: unknown) {
  //     console.error("Google login error:", error)
  //     toast.error("Login Google thất bại")
  //   }
  // }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-6xl h-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:flex-row">
        {/* Left Side (Image) - Đã làm cho hình ảnh rộng hơn */}
        <div className="hidden flex-[2] bg-[url('/login_img_deepeyex.png')] bg-cover bg-center lg:block"></div>

        {/* Right Side (Form) - Đã điều chỉnh để nhỏ lại tương ứng */}
        <div className="flex w-full flex-shrink-0 flex-col items-center p-6 md:w-1/2 md:flex-[1]">
          <div className="mb-3 text-center">
            <div className="mx-auto mb-1 h-12 w-12 rounded-full overflow-hidden">
              <Link href={"/"}>
                <Image
                  src="/logoDeepEyeX.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="object-cover rounded-full"
                />
              </Link>
            </div>

            <h2 className="text-3xl font-bold text-gray-800">Đăng nhập</h2>
            <p className="text-gray-500">Chào mừng bạn quay trở lại</p>
          </div>

          <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
                Tên đăng nhập
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Nhập tên đăng nhập"
                required
                className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                value={username}
                onChange={e => setUsername(e.target.value)}
                size="large"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <Input.Password
                placeholder="Nhập mật khẩu"
                className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                size="large"
              />
            </div>

            <div className="flex items-center justify-end text-sm">
              <Link href="/forgot-password" className="font-medium text-cyan-600 hover:text-cyan-500">
                Quên mật khẩu?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-cyan-600 p-2 font-semibold text-white shadow-sm transition-colors hover:bg-cyan-500 cursor-pointer"
              >
                Đăng nhập
              </button>
            </div>
          </form>

          <div className="relative my-4 w-full max-w-sm text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative inline-block bg-white px-2 text-sm text-gray-500">Hoặc</div>
          </div>

          <div className="flex w-full max-w-sm items-center justify-center">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-red-500 px-4 py-2 font-medium text-white shadow-md transition-all hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 cursor-pointer"
              // onClick={handleGoogleLogin}
            >
              <FaGoogle className="text-white" />
              Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Chưa có tài khoản?{" "}
            <Link href="/signup" className="font-semibold text-cyan-600 hover:text-cyan-500">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
