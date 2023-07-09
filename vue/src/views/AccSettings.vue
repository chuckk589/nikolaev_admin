<template>
  <v-card class="h-100">
    <v-card-title>
      <span>Настройка</span>
      <h2>Управление учетной записью, меняйте адрес электронной почты и пароль</h2>
    </v-card-title>
    <v-card-text style="max-width: 600px">
      <div class="zaga-form mt-5">
        <h2>Информация о компании</h2>
        <v-form ref="company">
          <v-text-field disabled v-model="company.compMame" label="Название компании"></v-text-field>
          <v-text-field v-model="company.name" label="Имя"></v-text-field>
          <v-text-field v-model="company.surname" label="Фамилия"></v-text-field>
          <v-text-field v-model="company.phone" :rules="phoneRules" label="Телефон"></v-text-field>
        </v-form>
        <v-btn @click="attemptUserUpdate('company')">Сохранить изменения</v-btn>
      </div>
      <div class="zaga-form">
        <h2>Информация по кредитной карте</h2>
        <v-form ref="card">
          <v-text-field v-model="card.cardNumber" label="Номер карты"></v-text-field>
          <v-text-field v-model="card.cardDate" label="Срок действия"></v-text-field>
          <v-text-field v-model="card.cardCVC" label="CVC"></v-text-field>
          <v-text-field v-model="card.cardPhone" label="Телефон"></v-text-field>
        </v-form>
        <v-btn>Обновить информацию</v-btn>
      </div>
      <div class="zaga-form">
        <h2>Сменить адрес электронной почты</h2>
        <v-form ref="email">
          <v-text-field v-model="email.email" :rules="emailRules" label="Адрес электронной почты"></v-text-field>
        </v-form>
        <v-btn @click="attemptUserUpdate('email')">Сменить адрес</v-btn>
      </div>
      <div class="zaga-form">
        <h2>Сменить пароль</h2>
        <v-form ref="password">
          <v-text-field v-model="password.oldPassword" :rules="passRules" label="Старый пароль"></v-text-field>
          <v-text-field v-model="password.password" :rules="passRules" label="Новый пароль"></v-text-field>
          <v-text-field v-model="password.passwordConfirm" :rules="confirmRules" label="Подтвердите новый пароль"></v-text-field>
        </v-form>
        <v-btn @click="attemptUserUpdate('password')">Сменить пароль</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { useUserStore } from '../stores/useUserStore';

export default {
  name: 'AccSettingsView',
  data() {
    return {
      userStore: useUserStore(),
      company: {
        compMame: '',
        name: '',
        surname: '',
        phone: '',
      },
      card: {
        cardNumber: '',
        cardDate: '',
        cardCVC: '',
        cardPhone: '',
      },
      email: {
        email: '',
      },
      password: {
        oldPassword: '',
        password: '',
        passwordConfirm: '',
      },
      emailRules: [(v) => !v.length || /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      phoneRules: [(v) => !v.length || v.length >= 8 || 'Phone must be equal or more than 8 characters'],
      passRules: [(v) => v.length || 'Password is required', (v) => v.length >= 8 || 'Password must be equal or more than 8 characters'],
      confirmRules: [(v) => v.length || 'Password confirmation is required', (v) => v == this.password.password || 'Password confirmation must be equal to password'],
    };
  },
  methods: {
    attemptUserUpdate(type) {
      const payload = Object.keys(this[type])
        .filter((key) => this[type][key])
        .reduce((obj, key) => {
          obj[key] = this[type][key];
          return obj;
        }, {});
      if (Object.keys(payload).length === 0) return;
      this.$refs[type].validate().then((res) => {
        if (res.valid) {
          this.userStore.updateUser(payload);
        }
      });
    },
  },
};
</script>
<style scoped>
.zaga-form {
  margin-bottom: 120px;
}
.zaga-form h2 {
  margin-bottom: 20px;
}
</style>
