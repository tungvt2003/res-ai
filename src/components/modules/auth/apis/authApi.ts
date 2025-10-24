// src/apis/authApi.ts
import { AxiosInstance } from "axios"
import api from "../../../shares/configs/axios"

export type RegisterRequest = {
  username: string
  password: string
  fullName: string
  email: string
  phone: string
  roles: string
}

export type LoginRequest = {
  username: string
  password: string
}

export type User = {
  id: string
  username: string
  email: string
  fullName: string
  phone: string
  roles: string
  isActive: boolean
  createdAt: string
}

export type LoginResponse = {
  message: string
  user: User
  accessToken: string
}

export type RegisterResponse = {
  message: string
  user: User
  accessToken: string
}

export type TokenResponse = {
  access_token: string
  access_expire: string // hoặc Date
  user_id?: string
  role?: string
}

export type SuccessResponse<T = unknown> = {
  status: number
  message: string
  data?: T
}

export type ErrorResponse = {
  status: number
  message: string
}

class AuthClient {
  private readonly client: AxiosInstance

  constructor() {
    this.client = api
  }

  // ---------------- Register ----------------
  async register(form: RegisterRequest): Promise<SuccessResponse<RegisterResponse>> {
    try {
      const response = await this.client.post<SuccessResponse<RegisterResponse>>("/auth/register", form)

      return response.data
    } catch (error) {
      throw error
    }
  }

  // ---------------- Login ----------------
  async login(form: LoginRequest): Promise<SuccessResponse<LoginResponse>> {
    const response = await this.client.post<SuccessResponse<LoginResponse>>("/auth/login", form)
    return response.data
  }
}

const AuthApi = new AuthClient()
export { AuthApi }
