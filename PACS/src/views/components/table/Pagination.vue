<template>
  <div class="pagination-container">
    <div class="btns">
        <!--<i class="el-icon-circle-plus" @click="addClick"></i>-->
        <!--<i class="el-icon-edit"  @click="editClick"></i>-->
        <!--<i class="el-icon-zoom-in" @click="addClick"></i>-->
        <!--<i class="el-icon-delete" @click="addClick"></i>-->
        <!--<i class="el-icon-search" @click="addClick"></i>-->
        <!--<i class="el-icon-refresh" @click="addClick"></i>-->
      </div>
    <el-pagination background
        small
        @size-change="handleSizeChange"
        @current-change="currentChange"
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40,50]"
        :total="total"
  ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageSize: {
      type: Number,
      default: 20
    },
    currentPage: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    currentChange(value) {
      this.$emit("handleIndexChange", value);
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val);
      console.log(`每页 ${val} 条`);
    }
   
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>


.pagination-container {
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
</style>
