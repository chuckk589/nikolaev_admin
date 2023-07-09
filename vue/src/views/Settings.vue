<template>
  <v-card class="h-100">
    <v-card-title>
      <span>Настройка</span>
      <h2>Воспользуйтесь нашим лаунчером и руководством по установке</h2>
    </v-card-title>
    <v-card-text>
      <div class="d-flex">
        <v-sheet class="mr-5" :elevation="5" :height="200" :width="400" rounded>
          <div class="d-flex flex-column h-100 align-center justify-center">
            <div>Игровой лаунчер</div>
            <v-sheet></v-sheet>
            <v-btn size="small">Скачать игровой лаунчер</v-btn>
          </div>
        </v-sheet>
        <v-sheet class="mr-5" :elevation="5" :height="200" :width="400" rounded>
          <div class="d-flex flex-column h-100 align-center justify-center">
            <div>Справочный центр ZAGA-GAME</div>
            <v-sheet></v-sheet>
            <v-btn size="small">Открыть справочный центр</v-btn>
          </div>
        </v-sheet>
      </div>
      <v-sheet class="mt-5" :elevation="5" :height="70" :width="820" rounded>
        <div class="d-flex h-100 align-center justify-center">
          <div class="mr-5">Обратитесь при необходимости за помощью к нашей тех. поддержке</div>
          <v-btn size="small">Оставить заявку на тех. поддержку</v-btn>
        </div>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SettingsView',
  data() {
    return {};
  },
  methods: {},
};
</script>
