"use client"
import { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"
import { auth } from "@/app/shares/configs/firebase"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email.trim())
      toast.success("Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư của bạn.")
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Không thể gửi email đặt lại mật khẩu")
      } else {
        toast.error("Không thể gửi email đặt lại mật khẩu")
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Quên mật khẩu</h2>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full rounded-md border p-2 mb-4"
        />
        <button type="submit" className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-500">
          Gửi liên kết đặt lại
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Nhớ mật khẩu?{" "}
          <Link href="/signin" className="text-cyan-600 hover:text-cyan-500">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  )
}
