import { Category, CategoryFilter } from "@/components/blog/types/category.types"
import { SuccessResponse } from "@/components/modules/auth/apis/authApi"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { CategoryApi } from "../apis/categoryApi"

/**
 * Hook để lấy tất cả categories
 * @param filters Bộ lọc cho categories
 * @param options Tham số cấu hình cho react-query
 */
export function useGetCategories(
  filters?: CategoryFilter,
  options?: UseQueryOptions<SuccessResponse<Category[]>, AxiosError>,
) {
  return useQuery<SuccessResponse<Category[]>, AxiosError>({
    queryKey: ["categories", filters],
    queryFn: () => CategoryApi.getCategories(filters),
    ...options,
  })
}
