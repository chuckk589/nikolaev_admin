import { defineStore } from 'pinia';
import router from '../router';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    role: localStorage.getItem('role'),
    name: localStorage.getItem('name'),
  }),
  actions: {
    logout() {
      this.clean();
      router.push({ name: 'login' });
    },
    clean() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('role');
      localStorage.removeItem('name');
    },
    updateStorage(token: string) {
      const payload = parseJwt(token);
      localStorage.setItem('jwt', token);
      localStorage.setItem('role', payload.role);
      localStorage.setItem('name', payload.name + ' ' + payload.surname);
      return payload;
    },
  },
});
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}
