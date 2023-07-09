<template>
  <div>
    <div class="d-flex justify-center" v-if="!params.data.markedAsDeleted">
      <v-btn size="small" variant="text" icon="mdi-pencil" @click="edit"></v-btn>
      <v-btn size="small" variant="text" icon="mdi-delete" @click="remove"></v-btn>
    </div>
    <div class="d-flex justify-center" v-else>
      <v-btn size="small" variant="text" icon="mdi-restore" @click="restore"></v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZonesCell',
  data() {
    return {};
  },
  methods: {
    remove() {
      this.$emitter.emit('openDialog', {
        header: 'Удалить город',
        message: 'Вы уверены, что хотите удалить город?',
        eventName: 'delete-zone',
        id: this.params.data.id,
      });
    },
    restore() {
      this.$emitter.emit('restore-zone', this.params.data.id);
    },
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
        ],
      });
    },
  },
};
</script>
