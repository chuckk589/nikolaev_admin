<template>
  <v-card class="h-100">
    <v-card-title>Список клиентов</v-card-title>
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
        @grid-ready="onGridReady"
        @cellClicked="onCellClicked"
      >
      </AgGridVue>
    </v-card-text>
    <v-dialog></v-dialog>
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
        {
          field: 'action',
          headerName: '',
          filter: false,
          sortable: false,
          maxWidth: 70,
          cellRenderer: 'ZonesCell',
        },
      ],
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
  },
  methods: {
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
    },
  },
};
</script>
