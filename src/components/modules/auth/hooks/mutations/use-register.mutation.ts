import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AuthApi, RegisterRequest, RegisterResponse, SuccessResponse } from "../../apis/authApi"

type RegisterOptions = Omit<UseMutationOptions<SuccessResponse<RegisterResponse>, Error, RegisterRequest>, "mutationFn">

function useRegisterMutation(options?: RegisterOptions) {
  return useMutation({
    mutationFn: async (form: RegisterRequest) => {
      const res = await AuthApi.register(form)
      return res
    },
    ...options,
  })
}

export { useRegisterMutation }
