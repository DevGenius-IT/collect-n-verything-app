import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {User} from '~/types/models';

import type UserStore from "~/types/stores/UserStore";

const apiUrl = process.env.NUXT_API_URL ?? 'http://localhost:3333';

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

    const setUser = (user: User) => {
      state.value.show = user
    }

    const setUsers = (users: User[]) => {
      state.value.index = users
    }

    const getAll = () => {
      const users = [
        {
          id: 1,
          firstname: 'Romain',
          lastname: 'AROLDI',
          username: 'romain-aroldi',
          email: 'romain.aroldi@gmail.com',
          roles: ['admin'],
          createdAt: '2025-02-17 08:00',
          updatedAt: '2025-02-17 08:00'
        },
        {
          id: 2,
          firstname: 'John',
          lastname: 'Doe',
          username: 'john-doe',
          email: 'john.doe@gmail.com',
          roles: ['user'],
          createdAt: '2025-02-17 10:00',
          updatedAt: '2025-02-17 10:00'
        }
      ]

      setUsers(users)
    }

    return {state, setUser, setUsers, getAll}
  },
  {
    persist: true,
  }
)
