import { SuccessResponse } from "@/components/modules/auth/apis/authApi"
import { AxiosInstance } from "axios"
import api from "../../shares/configs/axios"
import { Category, CategoryFilter } from "../types/category.types"

class CategoryClient {
  private readonly client: AxiosInstance

  constructor() {
    this.client = api
  }

  /**
   * Lấy tất cả categories với filters
   */
  async getCategories(filters?: CategoryFilter): Promise<SuccessResponse<Category[]>> {
    const params = new URLSearchParams()

    if (filters?.name) {
      params.append("name", filters.name)
    }

    const queryString = params.toString()
    const url = queryString ? `/categories?${queryString}` : "/categories"

    const response = await this.client.get<SuccessResponse<Category[]>>(url)
    return response.data
  }
}

const CategoryApi = new CategoryClient()
export { CategoryApi }
