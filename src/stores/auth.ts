import { defineStore } from 'pinia'
import { getSessionToken } from '@/api/auth'

interface State {
  sessionToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    sessionToken: null
  }),
  actions: {
    async login() {
      const { data } = await getSessionToken()

      this.sessionToken = data.token
    },
    logout() {
      this.sessionToken = null
    }
  },
  getters: {
    isLoggedIn: (state) => state.sessionToken !== null
  },
  persist: true
})
