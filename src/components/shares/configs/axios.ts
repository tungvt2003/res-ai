import axios, { AxiosInstance } from "axios"
import { store } from "../stores"
import { clearAuth } from "../stores/authSlice"

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://103.243.173.86:9999",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
})

// ---------------- Request Interceptor ----------------
// Thêm token nếu có
api.interceptors.request.use(config => {
  const token = store.getState().auth.accessToken
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// ---------------- Response Interceptor ----------------
// Xử lý lỗi chung hoặc logout nếu 401
api.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    if (error.response?.status === 401) {
      // Chỉ redirect nếu không phải đang ở trang login
      if (window.location.pathname !== "/login") {
        // Clear auth state and redirect to login
        store.dispatch(clearAuth())
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  },
)

export default api
