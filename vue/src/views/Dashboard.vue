<template>
  <v-card class="h-100">
    <v-card-title>
      <span>Статистика по всем городам</span>
    </v-card-title>
    <v-card-text>
      <v-select @update:modelValue="getStats" item-title="name" item-value="id" v-model="allTime" style="width: 320px" label="Выберите игру" :items="games"></v-select>
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
      <div style="margin-top: 100px" class="d-flex flex-column">
        <v-select @update:modelValue="getStatsInRange($event)" item-title="name" item-value="id" v-model="rangeTime" style="max-width: 320px" label="Выберите игру" :items="games"></v-select>
        <date-picker placeholder="Выберите период" @change="getStatsInRange(null)" v-model:value="dates" range></date-picker>
      </div>
      <v-sheet class="mr-5" :elevation="5" :height="200" :width="200" rounded>
        <div class="d-flex flex-column h-100 align-center justify-center">
          <div>{{ stats2.allTime }}</div>
          <div>Колво запусков</div>
        </div>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/ru';
export default {
  name: 'DashboardView',
  components: { DatePicker },
  data() {
    return {
      dates: [],
      allTime: null,
      rangeTime: null,
      games: [],
      stats: {},
      stats2: {},
    };
  },
  methods: {
    getStatsInRange(id) {
      const query = {
        gameId: id ? id : this.rangeTime,
        startDate: this.dates[0]?.getTime() || null,
        endDate: this.dates[1]?.getTime() || null,
      };
      const queryString = Object.keys(query)
        .filter((key) => query[key] !== null)
        .map((key) => key + '=' + query[key])
        .join('&');
      this.$http({ method: 'GET', url: `/v1/launches/num?${queryString}` }).then((res) => {
        this.stats2 = res.data;
      });
    },
    getStats(id) {
      this.$http({ method: 'GET', url: `/v1/launches/num?gameId=${id}` }).then((res) => {
        this.stats = res.data;
      });
    },
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/games/` }).then((res) => {
      this.games = res.data;
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
