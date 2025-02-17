import { toast } from '@/components/ui/toast';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '~/types/models';
import type { AuthStore } from '~/types/stores';
import { localStorageIsAvailable } from '~/utils/client';

const apiUrl = process.env.NUXT_API_URL ?? 'http://localhost:3333';

export const authStore = defineStore(
  'auth',
  () => {
    const state = ref<AuthStore>({
      user: null,
      token: '',
      isLoading: false,
      isError: false,
      error: '',
    })

    const setUser = (user: User, token: string) => {
      if (localStorageIsAvailable()) {
        localStorage.setItem('token', token)
      }
      user.username = `${user.firstname}.${user.lastname}`
      state.value.user = user
      state.value.token = token
    }

    const signIn = async (email: string, password: string) => {
      const url = `${apiUrl}/auth/signin`;
      const { data, status, error, refresh, clear } = await useFetch<{ token: string, user: User}>(
        url,
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (status.value === "error") {
        state.value.isLoading = false
        state.value.isError = true
        state.value.error = error.value?.data.errors[0].message
      }

      if (status.value === "pending")
        state.value.isLoading = true

      if (status.value === "success" && data.value) {
        state.value.isLoading = false
        state.value.isError = false
        state.value.error = ""
        setUser(data.value.user, data.value.token)
        return await navigateTo('/admin', { replace: true })
      }
    }

    const signUp = async (user: User) => {
      const url = `${apiUrl}/auth/signup`;
      const { data, status, error, refresh, clear } = await useFetch<{ token: string, user: User}>(
        url,
        {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (status.value === "error") {
        state.value.isLoading = false
        state.value.isError = true
        state.value.error = error.value
      }

      if (status.value === "pending")
        state.value.isLoading = true

      if (status.value === "success" && data.value) {
        state.value.isLoading = false
        state.value.isError = false
        state.value.error = ""
        setUser(data.value.user, data.value.token)
        await navigateTo('/admin', { replace: true })
      }
    }

    const signOut = () => {
      if (localStorageIsAvailable()) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
      state.value.user = null
      state.value.token = ''
      navigateTo('/auth', { replace: true })
    }

    const isAdmin = () => {
      return state.value.user?.roles.some(role => role === 'admin' || role === 'super-admin') ?? false
    }
    
    const getFullName = () => {
      return `${state.value.user?.firstname} ${state.value.user?.lastname}`
    }
    
    const getInitials = () => {
      return `${state.value.user?.firstname.charAt(0)}${state.value.user?.lastname.charAt(0)}`
    }

    return { state, signUp, signIn, signOut, isAdmin, getFullName, getInitials }
  },
  {
    persist: true,
  }
)
