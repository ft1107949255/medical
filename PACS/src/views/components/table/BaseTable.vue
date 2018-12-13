<template>
  <div class="base-table">
    <div class="table-container">
      <el-table :data="list" style="width: 100%" ref="mutipleTable" :height="tableHeight"  highlight-current-row
                @selection-change="handleSelectionChange" @row-click="rowClick" v-loading="options.loading">
        <!--region 选择框-->
        <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;"></el-table-column>
        <!--region 数据列-->
        <el-table-column v-for="(col, index) in columns" :key="index" :prop="col.prop" :label="col.label" :width="col.width"></el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <!-- <div class="btns">
        <i class="el-icon-circle-plus"></i>
        <i class="el-icon-edit"></i>
        <i class="el-icon-zoom-in"></i>
        <i class="el-icon-delete"></i>
        <i class="el-icon-search"></i>
        <i class="el-icon-refresh"></i>
      </div> -->
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="currentChange"
                     layout="sizes,prev, pager, next"
                     :current-page="pagination.currentPage"
                     :page-size="pagination.pageSize"
                     :page-sizes="[10, 20, 30, 40,50]"
                     :total="pagination.total"
      ></el-pagination>
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "BaseTable",
  props: {
    // 数据列表
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    // 分页参数 === pageSize:每页展示的条数，currentPage:当前页, total:总条数
    pagination: {
      type: Object,
      default() {
        return {
          pageSize: 10,
          currentPage: 1,
          total: 0
        };
      }
    },
    // table 表格的控制参数   loading:是否添加表格loading加载动画, mutiSelect:是否支持列表项选中功能
    options: {
      type: Object,
      default() {
        return {
          loading: false,
          mutiSelect: false
        };
      }
    },
    otherHeight: {
        type: Number,
        default() {
          return 0;
        }
      }
  },

  data() {
    return {
      screenHeight: document.documentElement.clientHeight
    }
  },
  computed: {
    tableHeight() {
      return this.screenHeight - this.otherHeight;
    }
  },
  mounted() {
    window.onresize = () => {
      this.screenHeight = document.documentElement.clientHeight;
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleSelectionChange(value) {
      this.$emit("handleSelectionChange", value);
    },
    currentChange(value) {
      this.$emit("handleIndexChange", value);
    },
    rowClick(row) {
      //this.setCurrentRow(row);
      this.$emit("handleRowClick", row);
    }
  },
  watch: {
      screenHeight(val) {
        if (!this.timer) {
          this.screenHeight = val;
          this.timer = true;
          setTimeout( () => {
            this.timer = false;
          }, 400);
        }
      }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">


.base-table {
  display: flex;
  flex-direction: column;

  .pagination-container {
    margin-top: 10px;
    text-align: center;

    .btns {
      float: left;
      margin-top: 8px;
      padding-left: 8px;
      cursor: pointer;
    }

    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #9d9e9f;
    }

    .el-pagination.is-background .el-pager li:not(.disabled):hover {
      color: #333;
    }
  }


  .el-table {
    width: 100%;
    // max-height: 600px;
    // height :32px;
    font-size: 10px;
    background-color: $gray;
    overflow-y: auto;
    flex: 1;

    &::before {
      height: 0;
    }

    th {
      height: 40px;
      background-color: #9d9e9f;
      color: #333;
    }

    td, th.is-leaf {
      padding-left: 0px;
      padding-top: 0px;
      border: none;
      text-align: CENTER
    }

    tbody tr {
      background-color: $gray;

      &:hover {
        background-color: $haver !important;
      }
    }
  }

  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: scroll;
    min-height: 600px;
  }

  .el-table td, .el-table th {
    padding: 0px;
  }
}
</style>

