import { defineStore } from 'pinia';
import app from '../main';

export const useUserStore = defineStore({
  id: 'user',
  actions: {
    updateUser(payload: any) {
      app.config.globalProperties.$http({ method: 'PATCH', url: `/v1/users/`, data: payload }).then(() => {
        app.config.globalProperties.$emitter.emit('alert', {
          header: 'Success',
          text: 'User updated successfully',
          color: 'green',
        });
      });
    },
  },
});
