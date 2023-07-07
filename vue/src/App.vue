<template>
  <div>
    <router-view />
    <Alert></Alert>
    <ConfirmDialog />
    <EditComponent />
  </div>
</template>

<script>
import Alert from './components/Alert.vue';
import ConfirmDialog from './components/ConfirmDialog.vue';
import EditComponent from './components/EditComponent.vue';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
export default {
  name: 'App',
  data() {
    return {};
  },

  components: { Alert, ConfirmDialog, EditComponent },
};
</script>
<style lang="scss"></style>
<style>
.ag-theme-alpine .ag-details-row {
  padding: 10px;
}
</style>
