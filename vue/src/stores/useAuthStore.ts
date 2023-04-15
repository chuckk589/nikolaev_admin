import { defineStore } from 'pinia';
import router from '../router';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    role: localStorage.getItem('role'),
  }),
  actions: {
    logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('role');
      router.push({ name: 'login' });
    },
  },
});
