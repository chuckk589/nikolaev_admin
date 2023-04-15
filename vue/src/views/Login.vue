<template>
  <v-app style="background-color: #d3d3d326">
    <v-container class="ma-auto" fluid style="max-width: 600px">
      <v-card class="mx-auto" max-width="500">
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-form ref="signin" @submit.prevent="signin()">
                <v-text-field v-model="username" label="Username" density="compact" class="mt-5" :rules="userRules"></v-text-field>
                <v-text-field v-model="password" label="Password" type="password" density="compact" :rules="passRules" class="mt-2"></v-text-field>
              </v-form>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-form ref="signup" @submit.prevent="signup()">
                <v-text-field v-model="username" label="Username" density="compact" class="mt-5" :rules="userRules"></v-text-field>
                <v-text-field v-model="email" label="Email" density="compact" class="mt-5" :rules="emailRules"></v-text-field>
                <v-text-field v-model="password" label="Password" type="password" density="compact" :rules="passRules" class="mt-5"></v-text-field>
                <v-text-field v-model="confirm" label="Confirm password" type="password" density="compact" :rules="confirmRules" class="mt-5"></v-text-field>
              </v-form>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-card-text> Авторизация успешна, ваша роль Гость. Обратитесь за доступом к администратору </v-card-text>
          </v-window-item>
          <v-card-text v-if="errorMessage">
            <span class="d-block text-red mb-2">{{ errorMessage }}</span>
          </v-card-text>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn v-if="step == 1" @click="signin">Login</v-btn>
          <v-btn v-if="step == 2" variant="text" @click="back"> Back </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step == 1" color="primary" @click="next"> Sign up </v-btn>
          <v-btn v-if="step == 2" color="primary" @click="signup"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      username: '2222',
      password: '12345678',
      confirm: '',
      email: '',
      errorMessage: '',
      step: 1,
      emailRules: [() => !!this.email || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      userRules: [() => !!this.username || 'Username is required', (v) => v.length >= 4 || 'Username must be equal or more than 4 characters'],
      passRules: [() => !!this.password || 'Password is required', (v) => v.length >= 8 || 'Password must be equal or more than 8 characters'],
      confirmRules: [() => !!this.confirm || 'Password confirmation is required', (v) => v == this.password || 'Password confirmation must be equal to password'],
    };
  },
  methods: {
    signin() {
      this.$refs.signin.validate().then((res) => {
        if (res.valid) {
          this.$http
            .post('/auth/signin', {
              username: this.username,
              password: this.password,
            })
            .then((res) => {
              this.updateStorage(res.data.access_token);
              if (localStorage.getItem('role') == 'guest') {
                this.step = 3;
              } else {
                this.$router.push({ name: 'launches' });
              }
            })
            .catch((err) => {
              this.errorMessage = err.response.data.message;
            });
        }
      });
    },
    next() {
      this.$refs.signin.reset();
      this.errorMessage = '';
      this.step++;
    },
    back() {
      this.$refs.signup.reset();
      this.errorMessage = '';
      this.step = 1;
    },
    signup() {
      this.$refs.signup.validate().then((res) => {
        if (res.valid) {
          this.$http
            .post('/auth/signup', {
              username: this.username,
              email: this.email,
              password: this.password,
            })
            .then((res) => {
              this.updateStorage(res.data.access_token);
              this.step = 3;
            })
            .catch((err) => {
              this.errorMessage = err.response.data.message;
            });
        }
      });
    },
    updateStorage(token) {
      const payload = this.parseJwt(token);
      localStorage.setItem('jwt', token);
      localStorage.setItem('role', payload.role);
    },
    parseJwt(token) {
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
    },
  },
  computed: {
    currentTitle: function () {
      if (this.step == 1) {
        return 'Sign in';
      } else if (this.step == 2) {
        return 'Sign up';
      } else if (this.step == 3) {
        return 'Success';
      }
      return '';
    },
  },
};
</script>
