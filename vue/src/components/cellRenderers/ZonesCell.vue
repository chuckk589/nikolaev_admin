<template>
  <div class="d-flex justify-center">
    <v-btn size="small" variant="text" icon="mdi-pencil" @click="edit"></v-btn>
  </div>
</template>

<script>
export default {
  name: 'ZonesCell',
  data() {
    return {};
  },
  methods: {
    edit() {
      this.$emitter.emit('openModal', {
        url: `/zones/${this.params.data.id}`,
        method: 'PATCH',
        header: 'Отредактировать клиента',
        eventName: 'edit-zone',
        fields: [
          {
            key: 'email',
            label: 'Email',
            value: this.params.data.user?.email,
          },
          {
            key: 'username',
            label: 'Имя',
            value: this.params.data.user?.name,
          },
          {
            key: 'surname',
            label: 'Фамилия',
            value: this.params.data.user?.surname,
          },
          {
            key: 'name',
            label: 'Город',
            value: this.params.data.name,
          },
          {
            key: 'newPassword',
            label: 'Пароль',
            type: 'password',
          },
          {
            key: 'confirmPassword',
            label: 'Подтверждение пароля',
            type: 'password',
          },
        ],
      });
    },
  },
};
</script>
