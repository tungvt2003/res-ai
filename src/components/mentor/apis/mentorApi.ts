import { SuccessResponse } from "@/components/modules/auth/apis/authApi"
import { AxiosInstance } from "axios"
import api from "../../shares/configs/axios"
import { Mentor, MentorSearchParams } from "../types/mentor.types"

class MentorClient {
  private readonly client: AxiosInstance

  constructor() {
    this.client = api
  }

  /**
   * Lấy tất cả mentor/lecturer
   */
  async getMentors(): Promise<SuccessResponse<Mentor[]>> {
    const response = await this.client.get<SuccessResponse<Mentor[]>>("/lecturers")
    return response.data
  }

  /**
   * Lấy mentor theo ID
   */
  async getMentor(mentorId: string): Promise<SuccessResponse<Mentor>> {
    const response = await this.client.get<SuccessResponse<Mentor>>(`/lecturers/${mentorId}`)
    return response.data
  }

  /**
   * Tìm kiếm mentor với các tham số filter
   */
  async searchMentors(params?: MentorSearchParams): Promise<SuccessResponse<Mentor[]>> {
    const queryParams = new URLSearchParams()

    if (params?.fullName) {
      queryParams.append("fullName", params.fullName)
    }
    if (params?.academicDegree) {
      queryParams.append("academicDegree", params.academicDegree)
    }
    if (params?.academicRank) {
      queryParams.append("academicRank", params.academicRank)
    }

    const queryString = queryParams.toString()
    const url = queryString ? `/lecturers?${queryString}` : "/lecturers"

    const response = await this.client.get<SuccessResponse<Mentor[]>>(url)
    return response.data
  }
}

const MentorApi = new MentorClient()
export { MentorApi }
