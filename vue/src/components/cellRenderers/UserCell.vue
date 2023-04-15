<template>
  <div class="d-flex justify-center">
    <v-btn density="compact" class="ma-2" variant="text" icon="mdi-pencil" @click="edit"></v-btn>
  </div>
</template>

<script>
export default {
  name: 'UserCell',
  data() {
    return {};
  },
  methods: {
    edit() {
      this.$emitter.emit('openModal', {
        url: `/user/${this.params.data.id}`,
        method: 'PATCH',
        header: 'Редактирование пользователя',
        eventName: 'edit-user',
        fields: [
          {
            key: 'email',
            label: 'Значение',
            value: this.params.data.email,
          },
          {
            key: 'role',
            label: 'Роль',
            type: 'select',
            value: this.params.data.role,
            options: this.$ctable.roles,
          },
          {
            key: 'zone',
            label: 'Zone',
            type: 'select',
            value: this.params.data.zone,
            options: this.$ctable.zones,
          },
        ],
      });
    },
  },
};
</script>
