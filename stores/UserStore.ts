import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {User} from '~/types/models';

import type UserStore from "~/types/stores/UserStore";

const apiUrl = process.env.NUXT_API_URL ?? 'http://localhost:8000/v1';

export const userStore = defineStore(
  'user',
  () => {
    const state = ref<UserStore>({
      index: null,
      show: null,
      meta: null,
      isLoading: false,
      isError: false,
      error: '',
    })

    const auth = authStore();

    const setUser = (user: User) => {
      state.value.show = user
    }

    const setUsers = (users: User[]) => {
      state.value.index = users
    }

    const getAll = async () => {
      const url = `${apiUrl}/admin/users`;
      const {data, status, error, refresh, clear} = await useFetch<{ items: User[], meta: any }>(
        url,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${auth.state.token}`,
          },
        }
      )

      if (status.value === "error") {
        state.value.isLoading = false
        state.value.isError = true
        state.value.error = error.value?.data.message
      }

      if (status.value === "pending")
        state.value.isLoading = true

      if (status.value === "success" && data.value) {
        state.value.isLoading = false
        state.value.isError = false
        state.value.error = ""
        console.log('users: ', data.value.items)
        setUsers(data.value.items)
      }
    }

    return {state, setUser, setUsers, getAll}
  },
  {
    persist: true,
  }
)
