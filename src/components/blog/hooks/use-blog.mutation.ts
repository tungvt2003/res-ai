import { Blog } from "@/components/blog/types/blog.types"
import { SuccessResponse } from "@/components/modules/auth/apis/authApi"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { BlogApi } from "../apis/blogApi"

/**
 * Hook để lấy tất cả dữ liệu blog
 * @param options Tham số cấu hình cho react-query
 */
export function useGetBlogs(options?: UseQueryOptions<SuccessResponse<Blog[]>, AxiosError>) {
  return useQuery<SuccessResponse<Blog[]>, AxiosError>({
    queryKey: ["blogs"],
    queryFn: () => BlogApi.getBlogs(),
    ...options,
  })
}

/**
 * Hook để lấy dữ liệu blog theo ID
 * @param blogId id của blog cần lấy
 * @param options Tham số cấu hình cho react-query
 */
export function useGetBlog(blogId: string, options?: UseQueryOptions<SuccessResponse<Blog>, AxiosError>) {
  return useQuery<SuccessResponse<Blog>, AxiosError>({
    queryKey: ["blog", blogId],
    queryFn: () => BlogApi.getBlog(blogId),
    enabled: !!blogId, // Chỉ gọi API khi có blogId
    ...options,
  })
}

/**
 * Hook để tìm kiếm blog với các tham số
 * @param params Tham số tìm kiếm (title, categoryId, slug)
 * @param options Tham số cấu hình cho react-query
 */
export function useSearchBlogs(
  params?: {
    title?: string
    categoryId?: string
    slug?: string
  },
  options?: UseQueryOptions<SuccessResponse<Blog[]>, AxiosError>,
) {
  return useQuery<SuccessResponse<Blog[]>, AxiosError>({
    queryKey: ["blogs", "search", params],
    queryFn: () => BlogApi.searchBlogs(params),
    enabled: !!(params?.title || params?.categoryId || params?.slug), // Chỉ gọi API khi có ít nhất một tham số
    ...options,
  })
}
