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
              <v-form ref="signin">
                <v-text-field v-model="email" label="Email" class="mt-5" :rules="emailRules"></v-text-field>
                <v-text-field v-model="password" label="Password" type="password" :rules="passRules" class="mt-2"></v-text-field>
              </v-form>
              <!-- <div class="d-flex flex-row-reverse"><a href="" @click="forgotPassword">Forgot password?</a></div> -->
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-form ref="signup">
                <v-text-field v-model="email" label="Email" class="mt-5" :rules="emailRules"></v-text-field>
                <v-text-field v-model="phone" label="Phone" type="number" class="mt-5"></v-text-field>
                <v-text-field v-model="name" label="Name" class="mt-5"></v-text-field>
                <v-text-field v-model="surname" label="Surname" class="mt-5"></v-text-field>
                <v-text-field v-model="password" label="Password" type="password" :rules="passRules" class="mt-5"></v-text-field>
                <v-text-field v-model="confirm" label="Confirm password" type="password" :rules="confirmRules" class="mt-5"></v-text-field>
              </v-form>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-card-text>
              <v-form ref="reset">
                <v-text-field v-model="email" label="Email" class="mt-5" :rules="emailRules"></v-text-field>
                <v-text-field v-model="password" label="Old Password" type="password" :rules="passRules" class="mt-5"></v-text-field>
                <v-text-field v-model="newpassword" label="New password" type="password" :rules="passRules" class="mt-5"></v-text-field>
                <v-text-field v-model="confirm" label="Confirm new password" type="password" :rules="confirmNewPassRules" class="mt-5"></v-text-field>
              </v-form>
            </v-card-text>
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
          <v-btn v-if="step == 3" color="primary" @click="reset"> Reset </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { useAuthStore } from '../stores/useAuthStore';
export default {
  name: 'App',
  data() {
    return {
      authStore: useAuthStore(),
      password: 'adminadmin',
      confirm: '',
      email: 'admi1n@admin.ru',
      name: '',
      surname: '',
      phone: '',
      newpassword: '',
      errorMessage: '',
      step: 1,
      emailRules: [() => !!this.email || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      phoneRules: [() => !!this.phone || 'Phone is required', (v) => v.length >= 8 || 'Phone must be equal or more than 8 characters'],
      passRules: [() => !!this.password || 'Password is required', (v) => v.length >= 8 || 'Password must be equal or more than 8 characters'],
      confirmRules: [() => !!this.confirm || 'Password confirmation is required', (v) => v == this.password || 'Password confirmation must be equal to password'],
      confirmNewPassRules: [() => !!this.confirm || 'Password confirmation is required', (v) => v == this.newpassword || 'Password confirmation must be equal to password'],
    };
  },
  methods: {
    signin() {
      this.$refs.signin.validate().then((res) => {
        if (res.valid) {
          this.$http
            .post('/auth/signin', {
              username: this.email,
              password: this.password,
            })
            .then((res) => {
              const payload = this.authStore.updateStorage(res.data.access_token);
              this.$router.push({ name: payload.role == 'admin' ? 'dashboard' : 'udashboard' });
            })
            .catch((err) => {
              this.errorMessage = err.response?.data?.message || err;
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
    forgotPassword(evt) {
      evt.preventDefault();
      this.$refs.signin.reset();
      this.errorMessage = '';
      this.step = 3;
    },
    reset() {
      this.$refs.reset.validate().then((res) => {
        if (res.valid) {
          this.$http
            .post('/auth/reset', {
              email: this.email,
              password: this.password,
              newPassword: this.newpassword,
            })
            .then((res) => {
              this.step = 1;
            })
            .catch((err) => {
              this.errorMessage = err.response?.data?.message || err;
            });
        }
      });
    },
    signup() {
      this.$refs.signup.validate().then((res) => {
        if (res.valid) {
          this.$http
            .post('/auth/signup', {
              email: this.email,
              password: this.password,
              name: this.name,
              surname: this.surname,
              phone: this.phone.toString(),
            })
            .then((res) => {
              const payload = this.authStore.updateStorage(res.data.access_token);
              this.$router.push({ name: payload.role == 'admin' ? 'dashboard' : 'udashboard' });
            })
            .catch((err) => {
              this.errorMessage = err.response?.data?.message || err;
            });
        }
      });
    },
    // updateStorage(token) {
    //   const payload = this.parseJwt(token);
    //   localStorage.setItem('jwt', token);
    //   localStorage.setItem('role', payload.role);
    //   localStorage.setItem('name', payload.name + ' ' + payload.surname);
    //   return payload;
    // },
    // parseJwt(token) {
    //   const base64Url = token.split('.')[1];
    //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //   const jsonPayload = decodeURIComponent(
    //     window
    //       .atob(base64)
    //       .split('')
    //       .map(function (c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //       })
    //       .join(''),
    //   );

    //   return JSON.parse(jsonPayload);
    // },
  },
  computed: {
    currentTitle: function () {
      if (this.step == 1) {
        return 'Sign in';
      } else if (this.step == 2) {
        return 'Sign up';
      } else if (this.step == 3) {
        return 'Reset Password';
      } else if (this.step == 4) {
        return 'Success';
      }
      return '';
    },
  },
};
</script>
<style>
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
