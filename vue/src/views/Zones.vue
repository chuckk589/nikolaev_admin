<template>
  <v-card class="h-100">
    <v-card-title>
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <div>Список клиентов</div>
          <v-btn size="small" variant="text" icon="mdi-plus" @click="addNew"></v-btn>
        </div>
        <v-checkbox hide-details="" style="max-width: 220px; direction: rtl" @update:model-value="manageDeleted" label="Показывать удаленные"></v-checkbox>
      </div>
    </v-card-title>
    <v-card-text class="h-100">
      <AgGridVue
        class="ag-theme-alpine"
        :column-defs="columnDefs"
        :default-col-def="defaultColDef"
        :get-row-id="getRowId"
        :row-data="rowData"
        rowSelection="multiple"
        suppressCellFocus
        animateRows
        suppressRowClickSelection
        suppressContextMenu
        pagination
        style="height: 90%"
        :doesExternalFilterPass="doesExternalFilterPass"
        :isExternalFilterPresent="isExternalFilterPresent"
        :getRowStyle="getRowStyle"
        @grid-ready="onGridReady"
        @cellClicked="onCellClicked"
      >
      </AgGridVue>
    </v-card-text>
  </v-card>
  <router-view></router-view>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import ZonesCell from '../components/cellRenderers/ZonesCell.vue';
export default {
  name: 'ZonesView',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ZonesCell,
    AgGridVue,
  },
  data() {
    return {
      columnDefs: [
        {
          headerName: 'ID',
          field: 'id',
          maxWidth: 150,
        },
        { field: 'name', headerName: 'Город' },
        { field: 'alias', headerName: 'Псевдоним' },
        { field: 'markedAsDeleted', hide: true },
        {
          field: 'action',
          headerName: '',
          filter: false,
          sortable: false,
          maxWidth: 120,
          cellRenderer: 'ZonesCell',
        },
      ],
      showDeleted: false,
      gridApi: null,
      defaultColDef: {
        sortable: true,
        flex: 1,
        menuTabs: ['filterMenuTab', 'columnsMenuTab'],
      },
      getRowId: function (params) {
        return params.data.id;
      },
      rowData: [],
    };
  },
  beforeUnmount() {
    this.$emitter.off('edit-zone');
    this.$emitter.off('delete-zone');
    this.$emitter.off('restore-zone');
    this.$emitter.off('new-user');
  },
  methods: {
    addNew() {
      this.$emitter.emit('openModal', {
        url: `/users/`,
        method: 'POST',
        header: 'Создание клиента',
        eventName: 'new-user',
        fields: [
          {
            key: 'email',
            label: 'Email',
          },
          {
            key: 'name',
            label: 'Имя',
          },
          {
            key: 'phone',
            label: 'Номер телефона',
          },
          {
            key: 'surname',
            label: 'Фамилия',
          },
          {
            key: 'zone',
            label: 'Зона',
            type: 'select',
            options: this.$ctable.zones,
          },
          {
            key: 'password',
            label: 'Пароль',
          },
        ],
      });
    },
    getRowStyle(params) {
      if (params.node.data.markedAsDeleted) {
        return { background: '#FBE9E7' };
      }
    },
    manageDeleted() {
      this.showDeleted = !this.showDeleted;
      this.gridApi.onFilterChanged();
    },
    isExternalFilterPresent() {
      return !this.showDeleted;
    },
    doesExternalFilterPass(node) {
      return node.data.markedAsDeleted == this.showDeleted;
    },
    onCellClicked(evt) {
      if (evt.column.colId != 'action') {
        this.$router.push({ name: 'launches', query: { zoneId: evt.data.id, zoneName: evt.data.name } });
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.$http({ method: 'GET', url: `/v1/zones/` }).then((res) => {
        this.rowData = res.data;
      });
      this.$emitter.on('edit-zone', (evt) => {
        const index = this.rowData.findIndex((item) => item.id === evt.id);
        const user = evt.user;
        this.rowData[index] = evt;
        //need to replace evey user field if it was changed
        if (user) {
          this.rowData = [
            ...this.rowData.map((item) => {
              if (user && item.user?.id == user.id) {
                item.user = user;
              }
              return item;
            }),
          ];
        }
        setTimeout(() => this.gridApi.refreshCells({ force: true }), 0);
      });
      this.$emitter.on('delete-zone', (evt) => {
        this.$http({ method: 'DELETE', url: `/v1/zones/${evt}` }).then((res) => {
          const index = this.rowData.findIndex((item) => item.id === evt);
          this.rowData[index].markedAsDeleted = true;
          this.gridApi.onFilterChanged();
          setTimeout(() => this.gridApi.redrawRows(), 0);
        });
      });
      this.$emitter.on('restore-zone', (evt) => {
        this.$http({ method: 'PATCH', url: `/v1/zones/${evt}`, data: { markedAsDeleted: false } }).then((res) => {
          const index = this.rowData.findIndex((item) => item.id === evt);
          this.rowData[index].markedAsDeleted = false;
          setTimeout(() => this.gridApi.redrawRows({ force: true }), 0);
        });
      });
      this.$emitter.on('new-user', (evt) => {
        //remove applied zone from ctable to prevent double adding
        console.log(this.$ctable.zones.length);
        this.$ctable.zones = this.$ctable.zones.filter((item) => item.value != evt.usedZone);
        console.log(this.$ctable.zones.length);
      });
    },
  },
};
</script>
