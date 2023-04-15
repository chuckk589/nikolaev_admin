<template>
  <AgGridVue
    class="ag-theme-alpine"
    :column-defs="columnDefs"
    :default-col-def="defaultColDef"
    animateRows
    suppressCellFocus
    :get-row-id="getRowId"
    :row-data="rowData"
    rowSelection="multiple"
    suppressRowClickSelection
    pagination
    style="height: 100%"
    @grid-ready="onGridReady"
    suppressExcelExport
  >
  </AgGridVue>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import { useAuthStore } from '../stores/useAuthStore';
export default {
  name: 'LaunchesView',
  components: {
    AgGridVue,
    // eslint-disable-next-line vue/no-unused-components
  },
  data() {
    return {
      authStore: useAuthStore(),
      columnDefs: [
        { field: 'gameAlias', headerName: 'gameAlias' },
        { field: 'zoneAlias', headerName: 'zoneAlias', rowGroup: true, hide: true },
        { field: 'zoneName', headerName: 'zoneName' },
        { field: 'zoneHardwareKey', headerName: 'zoneHardwareKey' },
        { field: 'zoneHardwareKey', headerName: 'zoneHardwareKey' },
        { field: 'zoneRegistered', headerName: 'zoneRegistered', valueFormatter: this.boolFormatter },
        { field: 'zoneDisabled', headerName: 'zoneDisabled', valueFormatter: this.boolFormatter },
        {
          field: 'createdAt',
          headerName: 'Дата',
          sortable: true,
          valueFormatter: (params) => params.value && new Date(params.value).toLocaleString(),
        },
      ],
      gridApi: null,
      defaultColDef: {
        sortable: true,
        flex: 1,
        resizable: true,
        filter: true,
      },
      getRowId: function (params) {
        return params.data.id;
      },
      rowData: [],
    };
  },
  methods: {
    boolFormatter(params) {
      return params.value === undefined ? '' : params.value ? 'Да' : 'Нет';
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.$http({ method: 'GET', url: `/v1/launches/` }).then((res) => {
        this.rowData = res.data;
        this.gridApi.setRowData(this.rowData);
        params.columnApi.setRowGroupColumns(this.authStore.role === 'admin' ? ['zoneAlias'] : []);
        params.columnApi.setColumnVisible('zoneAlias', this.authStore.role !== 'admin');
        this.authStore.role === 'admin' && params.columnApi.autoSizeColumn('zoneAlias');
      });
    },
  },
};
</script>
