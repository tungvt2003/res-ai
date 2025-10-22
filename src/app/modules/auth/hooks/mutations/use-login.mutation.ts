// src/hooks/auth/useLoginMutation.ts
import { MutationFunctionContext, useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  AuthApi,
  LoginRequest,
  SuccessResponse,
  TokenResponse,
  ErrorResponse,
} from "../../apis/authApi";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setTokens } from "@/app/shares/stores/authSlice";

type LoginOptions = Omit<
  UseMutationOptions<SuccessResponse<TokenResponse>, AxiosError<ErrorResponse>, LoginRequest>,
  "mutationFn"
>;

export function useLoginMutation(options?: LoginOptions) {
  const dispatch = useDispatch();

  return useMutation<SuccessResponse<TokenResponse>, AxiosError<ErrorResponse>, LoginRequest>({
    mutationFn: async (form: LoginRequest) => {
      return await AuthApi.login(form);
    },
    onSuccess: (res, variables, context) => {
      // lưu access token vào redux
      dispatch(
        setTokens({
          accessToken: res.data?.access_token || "",
          refreshToken: "",
          userId: res.data?.user_id || "",
          role: res.data?.role || "",
        }),
      );
      options?.onSuccess?.(res, variables, {}, context as MutationFunctionContext);
    },
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, {}, context as MutationFunctionContext);
    },
  });
}
