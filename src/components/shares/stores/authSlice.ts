import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type User = {
  id: string
  username: string
  email: string
  fullName: string
  phone: string
  roles: string
  isActive: boolean
  createdAt: string
}

type AuthState = {
  accessToken: string | null
  user: User | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        accessToken: string
        user: User
      }>,
    ) => {
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    clearAuth: state => {
      state.accessToken = null
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
