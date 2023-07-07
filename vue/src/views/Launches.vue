<template>
  <v-card class="h-100">
    <v-card-title class="d-flex flex-column">
      <h2>{{ header }}</h2>
      <span>Статистика игровых сессий</span>
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
        @grid-ready="onGridReady"
      >
      </AgGridVue>
    </v-card-text>
    <v-dialog></v-dialog>
  </v-card>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
export default {
  name: 'LaunchesView',
  components: {
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
        { field: 'gameAlias', headerName: 'Название игры' },
        {
          field: 'createdAt',
          headerName: 'Дата запуска',
          valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
          filter: 'agDateColumnFilter',
          filterParams: {
            maxNumConditions: 1,
            comparator: (filterLocalDateAtMidnight, cellValue) => {
              if (cellValue == null) return -1;
              const cellDate = new Date(cellValue);

              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
              }

              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }

              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
              return 0;
            },
            filterOptions: ['inRange'],
            buttons: ['reset'],
          },
        },
        { field: 'createdAt', headerName: 'Время запуска', valueFormatter: (params) => new Date(params.value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ],

      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        flex: 1,
        menuTabs: ['filterMenuTab', 'columnsMenuTab'],
      },
      getRowId: function (params) {
        return params.data.id;
      },
      rowData: [],
      header: '',
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.$http({ method: 'GET', url: `/v1/launches?zoneId=${this.$route.query.zoneId}` }).then((res) => {
        this.rowData = res.data;
        this.header = this.$route.query.zoneName;
      });
    },
  },
};
</script>
<style>
.ag-filter-condition {
  display: none;
}
.ag-filter-condition:nth-of-type(2) {
  display: none;
}
</style>
