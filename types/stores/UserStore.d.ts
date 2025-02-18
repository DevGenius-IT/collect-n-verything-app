import type { User } from "../models"

export type UserStore = {
  index: User[] | null
  show: User | null
  meta: {
    total: number
    pagesCount: number
    currentPage: number
    limit: number
    pages: string[]
    selected_fields: string[]
  } | null
  isLoading: boolean
  isError: boolean
  error: any
}

export default UserStore;