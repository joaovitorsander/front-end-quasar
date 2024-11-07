import { defineStore } from "pinia";
import AuthService from "src/services/AuthService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    error: null,
  }),

  actions: {
    async login(username, password) {
      try {
        const user = await AuthService.login(username, password);
        this.user = user;
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },

    async register(newUser) {
      try {
        const user = await AuthService.register(newUser);
        this.user = user;
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },

    logout() {
      this.user = null;
      this.error = null;
    },
  },
});
