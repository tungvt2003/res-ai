import { AxiosInstance } from "axios"
import api from "../../../shares/configs/axios"

export type Lecturer = {
  id: string
  name: string
  image: string
  website: string
  isActive: boolean
  position: string
  workUnit: string
  createdAt: string
  updatedAt: string
  academicRank: string
  academicDegree: string
}

export type Field = {
  id: string
  name: string
  lecturers: Lecturer[]
}

export type Topic = {
  id: string
  name: string
  fields: Field[]
}

export type Parent = {
  id: string
  name: string
  topics: Topic[]
  description: string
}

export type ValueJsonb = {
  parents: Parent[]
}

export type SettingsData = {
  id: string
  key: string
  name: string
  value_jsonb: ValueJsonb
  createdAt: string
  updatedAt: string
}

export type SettingsResponse = {
  data: SettingsData
  message: string
  statusCode: number
  timestamp: string
}

export type SuccessResponse<T = unknown> = {
  status: number
  message: string
  data?: T
}

class SettingsClient {
  private readonly client: AxiosInstance

  constructor() {
    this.client = api
  }

  // ---------------- Get Settings by Key ----------------
  async getByKey(slug: string): Promise<SettingsResponse> {
    try {
      const response = await this.client.get<SettingsResponse>(`/settings/by-key/${slug}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

const SettingsApi = new SettingsClient()
export { SettingsApi }
