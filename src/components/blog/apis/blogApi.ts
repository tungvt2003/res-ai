import { SuccessResponse } from "@/components/modules/auth/apis/authApi"
import { AxiosInstance } from "axios"
import api from "../../shares/configs/axios"
import { Blog } from "../types/blog.types"

class BlogClient {
  private readonly client: AxiosInstance

  constructor() {
    this.client = api
  }

  /**
   * Lấy tất cả blog
   */
  async getBlogs(): Promise<SuccessResponse<Blog[]>> {
    const response = await this.client.get<SuccessResponse<Blog[]>>("/blogs")
    return response.data
  }

  /**
   * Lấy blog theo ID
   */
  async getBlog(blogId: string): Promise<SuccessResponse<Blog>> {
    const response = await this.client.get<SuccessResponse<Blog>>(`/blogs/${blogId}`)
    return response.data
  }

  /**
   * Tìm kiếm blog với các tham số
   */
  async searchBlogs(params?: { title?: string; categoryId?: string; slug?: string }): Promise<SuccessResponse<Blog[]>> {
    const queryParams = new URLSearchParams()

    if (params?.title) {
      queryParams.append("title", params.title)
    }
    if (params?.categoryId) {
      queryParams.append("categoryId", params.categoryId)
    }
    if (params?.slug) {
      queryParams.append("slug", params.slug)
    }

    const queryString = queryParams.toString()
    const url = queryString ? `/blogs?${queryString}` : "/blogs"

    const response = await this.client.get<SuccessResponse<Blog[]>>(url)
    return response.data
  }
}

const BlogApi = new BlogClient()
export { BlogApi }
