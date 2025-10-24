// src/hooks/auth/useLoginMutation.ts
import { setAuth } from "@/components/shares/stores/authSlice"
import { MutationFunctionContext, useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useDispatch } from "react-redux"
import { AuthApi, ErrorResponse, LoginRequest, LoginResponse, SuccessResponse } from "../../apis/authApi"

type LoginOptions = Omit<
  UseMutationOptions<SuccessResponse<LoginResponse>, AxiosError<ErrorResponse>, LoginRequest>,
  "mutationFn"
>

export function useLoginMutation(options?: LoginOptions) {
  const dispatch = useDispatch()

  return useMutation<SuccessResponse<LoginResponse>, AxiosError<ErrorResponse>, LoginRequest>({
    mutationFn: async (form: LoginRequest) => {
      return await AuthApi.login(form)
    },
    onSuccess: (res, variables, context) => {
      // lưu thông tin user và token vào redux
      if (res.data) {
        dispatch(
          setAuth({
            accessToken: res.data.accessToken,
            user: res.data.user,
          }),
        )
      }
      options?.onSuccess?.(res, variables, {}, context as MutationFunctionContext)
    },
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, {}, context as MutationFunctionContext)
    },
  })
}
