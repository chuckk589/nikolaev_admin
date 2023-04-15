import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../components/Container.vue'),
      redirect: '/users',
      children: [
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/Users.vue'),
          meta: {
            roles: ['admin'],
          },
        },
        {
          path: 'launches',
          name: 'launches',
          component: () => import('../views/Launches.vue'),
          meta: {
            roles: ['admin', 'moderator'],
          },
        },

        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/Settings.vue'),
          meta: {
            roles: ['admin'],
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  //check page is protected or not
  console.log('meta', to.meta.roles, localStorage.getItem('role'));
  if (!to.meta.roles) return next();
  if (to.meta.roles.includes(localStorage.getItem('role'))) return next();
  else {
    router.push({
      name: 'login',
    });
  }
});
export default router;
