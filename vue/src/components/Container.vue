<template>
  <v-app>
    <!-- <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar> -->
    <v-navigation-drawer permanent>
      <v-img class="mb-5" :src="logo1" width="250" :max-height="80" :aspect-ratio="1" contain></v-img>
      <div class="mb-5" v-if="authStore.role == 'admin'">Главный администратор</div>
      <div class="mb-5">
        <v-btn-toggle v-model="lang" rounded="0" color="deep-purple-accent-3" group>
          <v-btn value="ru"> Ru </v-btn>
          <v-btn value="en"> En </v-btn>
        </v-btn-toggle>
      </div>
      <v-list>
        <v-list-item to="/dashboard" value="1" active-color="#1867C0" v-if="authStore.role == 'admin'">
          <v-list-item-title>Главная</v-list-item-title>
        </v-list-item>
        <v-list-item to="/clients" value="2" active-color="#1867C0" v-if="authStore.role == 'admin'">
          <v-list-item-title>Клиенты</v-list-item-title>
        </v-list-item>
        <v-list-item to="/udashboard" value="3" active-color="#1867C0" v-if="authStore.role == 'user'">
          <v-list-item-title>Главная</v-list-item-title>
        </v-list-item>
        <v-list-item disabled active-color="#1867C0" v-if="authStore.role == 'user'">
          <v-list-item-title>Быстрый старт</v-list-item-title>
        </v-list-item>
        <v-list-item disabled active-color="#1867C0" v-if="authStore.role == 'user'">
          <v-list-item-title>Игровые сессии</v-list-item-title>
        </v-list-item>
        <v-list-item to="/settings" active-color="#1867C0" v-if="authStore.role == 'user'">
          <v-list-item-title>Настройка</v-list-item-title>
        </v-list-item>
        <v-list-item to="/accsettings" active-color="#1867C0" v-if="authStore.role == 'user'">
          <v-list-item-title>Настройки</v-list-item-title>
        </v-list-item>
        <v-list-item disabled active-color="#1867C0" v-if="authStore.role == 'user'">
          <v-list-item-title>Тарифы</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="authStore.logout()" block> Выйти </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid style="display: flex; flex-direction: column; height: 100%">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import app from '../main';
import { useAuthStore } from '../stores/useAuthStore';
import logo1 from '../assets/logo1.svg';
export default {
  name: 'ContainerView',
  components: {},
  data() {
    return {
      logo1,
      lang: 'ru',
      authStore: useAuthStore(),
    };
  },
  mounted() {
    this.authStore.$reset();
    this.$http({ method: 'GET', url: `/v1/status/` }).then((e) => {
      Object.assign(app.config.globalProperties.$ctable, e.data);
      console.log(this.$ctable);
    });
  },
};
</script>
<style>
.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}
.v-navigation-drawer__content .v-list {
  width: 100%;
  text-align: center;
}
</style>
