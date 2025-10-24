import { Mentor, MentorSearchParams } from "@/components/mentor/types/mentor.types"
import { SuccessResponse } from "@/components/modules/auth/apis/authApi"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { MentorApi } from "../apis/mentorApi"

/**
 * Hook để lấy tất cả dữ liệu mentor
 * @param options Tham số cấu hình cho react-query
 */
export function useGetMentors(options?: UseQueryOptions<SuccessResponse<Mentor[]>, AxiosError>) {
  return useQuery<SuccessResponse<Mentor[]>, AxiosError>({
    queryKey: ["mentors"],
    queryFn: () => MentorApi.getMentors(),
    ...options,
  })
}

/**
 * Hook để lấy dữ liệu mentor theo ID
 * @param mentorId id của mentor cần lấy
 * @param options Tham số cấu hình cho react-query
 */
export function useGetMentor(mentorId: string, options?: UseQueryOptions<SuccessResponse<Mentor>, AxiosError>) {
  return useQuery<SuccessResponse<Mentor>, AxiosError>({
    queryKey: ["mentor", mentorId],
    queryFn: () => MentorApi.getMentor(mentorId),
    enabled: !!mentorId, // Chỉ gọi API khi có mentorId
    ...options,
  })
}

/**
 * Hook để tìm kiếm mentor với các tham số filter
 * @param params Tham số tìm kiếm (fullName, academicDegree, academicRank)
 * @param options Tham số cấu hình cho react-query
 */
export function useSearchMentors(
  params?: MentorSearchParams,
  options?: UseQueryOptions<SuccessResponse<Mentor[]>, AxiosError>,
) {
  return useQuery<SuccessResponse<Mentor[]>, AxiosError>({
    queryKey: ["mentors", "search", params],
    queryFn: () => MentorApi.searchMentors(params),
    enabled: !!(params?.fullName || params?.academicDegree || params?.academicRank), // Chỉ gọi API khi có ít nhất một tham số
    ...options,
  })
}
