"use client"
import { useSearchParams } from "next/navigation"
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth"
import { auth } from "@/app/shares/configs/firebase"
import { toast } from "react-toastify"
import { Input, Button, Card, Typography, Form } from "antd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useResetPasswordMutation } from "@/app/modules/auth/hooks/mutations/use-update-password.mutation"
import { isValidPassword } from "@/app/shares/utils/password"

const { Title, Text } = Typography

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const oobCode = searchParams.get("oobCode")
  const mode = searchParams.get("mode")
  const router = useRouter()

  const { mutate: resetPassword, isPending } = useResetPasswordMutation({
    onSuccess: () => {
      toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập.")
      setTimeout(() => router.push("/signin"), 2000)
    },
    onError: error => {
      toast.error(error.message || "Không thể đặt lại mật khẩu")
    },
  })

  const handleReset = async (values: { newPassword: string; confirmPassword: string }) => {
    if (!oobCode || mode !== "resetPassword") {
      toast.error("Liên kết đặt lại không hợp lệ hoặc đã hết hạn.")
      return
    }

    try {
      const email = await verifyPasswordResetCode(auth, oobCode)
      await confirmPasswordReset(auth, oobCode, values.newPassword)
      resetPassword({ email, password: values.newPassword })
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Không thể đặt lại mật khẩu")
      } else {
        toast.error("Không thể đặt lại mật khẩu")
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm rounded-xl shadow-md">
        <Title level={3} className="mb-4 text-center">
          Đặt lại mật khẩu
        </Title>

        <Form onFinish={handleReset} layout="vertical">
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
              {
                validator: (_, value) =>
                  value && !isValidPassword(value)
                    ? Promise.reject("Phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt")
                    : Promise.resolve(),
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"))
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isPending} className="mb-3">
            Đặt lại mật khẩu
          </Button>
        </Form>

        <Text type="secondary">
          Nhớ mật khẩu?{" "}
          <Link href="/signin" className="text-cyan-600 hover:text-cyan-500">
            Đăng nhập
          </Link>
        </Text>
      </Card>
    </div>
  )
}
