<template>
  <v-card class="h-100">
    <v-card-title>
      <div class="d-flex flex-column">
        <h2>Информационная панель</h2>
        <span>Добро пожаловать, {{ authStore.name }}!</span>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="d-flex">
        <v-sheet class="mr-5" :elevation="5" :height="200" :width="200" rounded>
          <div class="d-flex flex-column h-100 align-center justify-center">
            <div>{{ stats.thisWeek }}</div>
            <div>Запусков на этой неделе</div>
          </div>
        </v-sheet>
        <v-sheet class="mr-5" :elevation="5" :height="200" :width="200" rounded>
          <div class="d-flex flex-column h-100 align-center justify-center">
            <div>{{ stats.thisMonth }}</div>
            <div>Запусков в этом месяце</div>
          </div> </v-sheet
        ><v-sheet class="mr-5" :elevation="5" :height="200" :width="200" rounded>
          <div class="d-flex flex-column h-100 align-center justify-center">
            <div>{{ stats.allTime }}</div>
            <div>Всего запусков</div>
          </div>
        </v-sheet>
      </div>
      <h3 class="mt-10">Ваш баланс: 10 000 руб. (хватит на 20 запусков)</h3>

      <div class="d-flex text-center mt-10">
        <v-sheet class="mr-5" :elevation="5" :height="200" :width="200" rounded>
          <div class="d-flex flex-column h-100 align-center justify-center">
            <div class="mb-2">Игровой лаунчер</div>
            <div class="mb-5">Скачайте наш игровой лаунчер для старта работы</div>
            <v-btn size="small">Скачать лаунчер</v-btn>
          </div>
        </v-sheet>
        <v-sheet class="mr-5" :elevation="5" :height="200" :width="200" rounded>
          <div class="d-flex flex-column h-100 align-center justify-center">
            <div class="mb-2">Руководство по установке</div>
            <div class="mb-5">Следуйте нашему руководству по установке, чтобы быстро настроить свою арену.</div>
            <v-btn size="small">Скачать руководство</v-btn>
          </div>
        </v-sheet>
        <v-sheet class="mr-5" :elevation="5" :height="200" :width="200" rounded>
          <div class="d-flex flex-column h-100 align-center justify-center">
            <div class="mb-2">Маркетинговые материалы</div>
            <div class="mb-5">Расскажите своим клиентам о вашей виртуальной арене с помощью баннеров, листовок, видеороликов и постов в социальных сетях.</div>
            <v-btn size="small">Скачать материалы</v-btn>
          </div>
        </v-sheet>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { useAuthStore } from '../stores/useAuthStore';

export default {
  name: 'UserDashboardView',
  data() {
    return {
      authStore: useAuthStore(),
      dates: [],
      allTime: null,
      rangeTime: null,
      games: [],
      stats: {},
    };
  },
  computed: {},
  mounted() {
    this.authStore.$reset();
    this.$http({ method: 'GET', url: `/v1/launches/num` }).then((res) => {
      this.stats = res.data;
    });
  },
};
</script>
<style>
.mx-datepicker input {
  height: 47px;
}

.mx-datepicker {
  margin-bottom: 22px;
}

.mx-datepicker i {
  font-size: 20px;
}
</style>
