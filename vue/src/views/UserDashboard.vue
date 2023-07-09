<template>
  <v-card class="h-100">
    <v-card-title>
      <div class="d-flex flex-column">
        <h2>Информационная панель</h2>
        <span>Добро пожаловать, {{ authStore.name }}!</span>
      </div>
    </v-card-title>
    <v-card-text class="w-50">
      <v-select @update:modelValue="getStats" v-model="userZone" style="width: 320px" label="Выберите зону" :items="$ctable.userZones"></v-select>

      <div class="d-flex justify-space-around">
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
      <v-table class="mt-10" style="max-width: 1500px">
        <thead>
          <tr>
            <th class="text-center">№</th>
            <th class="text-center">Название игры</th>
            <th class="text-center">Дата запуска</th>
            <th class="text-center">Время запуска</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lastLaunches" :key="item.id">
            <td class="text-center">{{ item.id }}</td>
            <td class="text-center">{{ item.gameAlias }}</td>
            <td class="text-center">{{ new Date(item.createdAt).toLocaleDateString() }}</td>
            <td class="text-center">{{ new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</td>
          </tr>
        </tbody>
      </v-table>
      <div class="d-flex text-center mt-10 justify-space-around">
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
      stats: {},
      lastLaunches: [],
      userZone: null,
    };
  },
  methods: {
    getStats(newVal) {
      const params = new URLSearchParams();
      newVal && params.append('zoneId', newVal);
      this.$http({ method: 'GET', url: `/v1/launches/num?${params.toString()}` }).then((res) => {
        this.stats = res.data;
      });
      params.append('lastNum', 5);
      this.$http({ method: 'GET', url: `/v1/launches?${params.toString()}` }).then((res) => {
        this.lastLaunches = res.data;
      });
      // this.$http({ method: 'GET', url: `/v1/launches/num?zoneId=${this.userZone}` }).then((res) => {
      //   this.stats = res.data;
      // });
      // this.$http({ method: 'GET', url: `/v1/launches?lastNum=5&zoneId=${this.userZone}` }).then((res) => {
      //   this.lastLaunches = res.data;
      // });
    },
  },
  mounted() {
    this.authStore.$reset();
    this.getStats();
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
