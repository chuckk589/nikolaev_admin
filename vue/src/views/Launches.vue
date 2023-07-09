<template>
  <v-card class="h-100">
    <v-card-title class="d-flex flex-column">
      <h2>{{ header }}</h2>
      <span>Статистика игровых сессий</span>
    </v-card-title>

    <v-card-text class="h-100" style="max-width: 800px">
      <div class="d-flex flex-column">
        <v-select @update:model-value="triggerFilter" v-model="filters.game" style="max-width: 320px" label="Выберите игру" :items="games"></v-select>
        <date-picker placeholder="Выберите период" @change="triggerFilter" v-model:value="filters.dates" range></date-picker>
      </div>
      <v-sheet class="mb-5" :elevation="5" :height="200" :width="200" rounded>
        <div class="d-flex flex-column h-100 align-center justify-center">
          <div>{{ launchesNum }}</div>
          <div>Колво запусков</div>
        </div>
      </v-sheet>
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
        domLayout="autoHeight"
        pagination
        :doesExternalFilterPass="doesExternalFilterPass"
        :isExternalFilterPresent="isExternalFilterPresent"
        @grid-ready="onGridReady"
      >
      </AgGridVue>
    </v-card-text>
  </v-card>
</template>

<script>
import DatePicker from 'vue-datepicker-next';
import { AgGridVue } from 'ag-grid-vue3';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/ru';

export default {
  name: 'LaunchesView',
  components: {
    AgGridVue,
    DatePicker,
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
      filters: {
        game: null,
        dates: [],
      },
      launchesNum: 0,
    };
  },
  computed: {
    games() {
      //get array of unique games from launches
      const games = this.rowData.map((item) => item.gameAlias);
      return [...new Set(games)];
    },
  },
  methods: {
    isExternalFilterPresent() {
      return true;
    },
    doesExternalFilterPass(node) {
      const nodedate = new Date(node.data.createdAt);
      return (
        (node.data.gameAlias == this.filters.game || this.filters.game == null) &&
        (this.filters.dates.length == 0 || (nodedate >= this.filters.dates[0] && nodedate <= this.filters.dates[1]) || this.filters.dates.every((item) => item == null))
      );
    },
    triggerFilter() {
      this.gridApi.onFilterChanged();
      this.launchesNum = this.gridApi.getModel().rowsToDisplay.length;
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.$http({ method: 'GET', url: `/v1/launches?zoneId=${this.$route.query.zoneId}` }).then((res) => {
        this.rowData = res.data;
        this.header = this.$route.query.zoneName;
        this.launchesNum = this.rowData.length;
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
.mx-datepicker input {
  height: 47px;
}

.mx-datepicker {
  margin-bottom: 22px;
}

.mx-datepicker i {
  font-size: 20px;
}
</style>
