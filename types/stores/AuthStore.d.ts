import type { User } from "../models"

type AuthStore = {
  user: User | null
  token: string
  isLoading: boolean
  isError: boolean
  error: any
}

export default AuthStore;