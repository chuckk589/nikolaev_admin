<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer permanent v-model="drawer">
      <v-list>
        <v-list-item to="/users" value="1" active-color="#1867C0" v-if="authStore.role == 'admin'">
          <template v-slot:prepend>
            <v-icon class="mr-5" icon="mdi-account"></v-icon>
          </template>

          <v-list-item-title>Пользователи</v-list-item-title>
        </v-list-item>
        <v-list-item to="/launches" value="2" active-color="#1867C0">
          <template v-slot:prepend>
            <v-icon class="mr-5" icon="mdi-account"></v-icon>
          </template>

          <v-list-item-title>Запуски</v-list-item-title>
        </v-list-item>
        <!-- <v-list-item to="/settings" value="3" active-color="#1867C0" v-if="authStore.role == 'admin'">
          <template v-slot:prepend>
            <v-icon class="mr-5" icon="mdi-cog"></v-icon>
          </template>

          <v-list-item-title>Конфиги</v-list-item-title>
        </v-list-item> -->
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
    <edit-component />
  </v-app>
</template>

<script>
import { useAuthStore } from '../stores/useAuthStore';
import EditComponent from './EditComponent.vue';
export default {
  name: 'ContainerView',
  components: {
    EditComponent,
  },
  data() {
    return {
      authStore: useAuthStore(),
      drawer: false,
    };
  },
};
</script>
