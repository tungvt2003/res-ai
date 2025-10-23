import {
  AuthApi,
  ErrorResponse,
  LoginFirebaseRequest,
  SuccessResponse,
  TokenResponse,
} from "@/components/modules/auth/apis/authApi"
import { setTokens } from "@/components/shares/stores/authSlice"
import { MutationFunctionContext, useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useDispatch } from "react-redux"

type LoginFirebaseOptions = Omit<
  UseMutationOptions<SuccessResponse<TokenResponse>, AxiosError<ErrorResponse>, LoginFirebaseRequest>,
  "mutationFn"
>

export function useLoginFirebaseMutation(options?: LoginFirebaseOptions) {
  const dispatch = useDispatch()

  return useMutation<SuccessResponse<TokenResponse>, AxiosError<ErrorResponse>, LoginFirebaseRequest>({
    mutationFn: async (form: LoginFirebaseRequest) => {
      return await AuthApi.loginFirebase(form)
    },
    onSuccess: (res, variables, context) => {
      dispatch(
        setTokens({
          accessToken: res.data?.access_token || "",
          refreshToken: "",
          userId: res.data?.user_id || "",
          role: res.data?.role || "",
        }),
      )
      options?.onSuccess?.(res, variables, {}, context as MutationFunctionContext)
    },
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, {}, context as MutationFunctionContext)
    },
  })
}
