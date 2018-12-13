<template>
    <div class="layout">
        <!-- menu module -->
        <div class="layout-menu-module" v-if="isShowMenuModule">
          <slot name="left-module"></slot>
        </div>

        <!-- main-container -->
        <div class="layout-container">
            <!-- botton-group -->
            <div class="layout-botton-group">
              <slot name="botton-group"></slot>
            </div>
            <!-- main-content -->
            <div class="layout-main-content">
              <slot></slot>
            </div>
            <!-- main-paging -->
            <div class="layout-paging">
              <slot name="paging"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'layout',
  computed: {
    isShowMenuModule () {
      return this.$slots['left-module']
    }
  }
}
</script>
<style lang="stylus" scoped>
.layout {
  width: 100%;
  height: calc(100vh - 61px);
  display: flex;
}
.layout-menu-module {
  flex: none;
  height: 100%;
  width: 200px;
}
.layout-main-content{
  // background-color: #e2e0e0;
}
.layout-container {
  flex: auto;
  height: 100%;
}
.layout-botton-group {
  height: 40px;
}
.layout-main-content {
  height: calc(100% - 50px);
}
.layout-paging {
  height: 26px;
}
>>> .el-pagination__total{
  font-size 12px !important;
}
>>> .el-pager li{
  font-size 12px !important;
}
>>> .el-table::before {
  background:none !important;
}
>>> .el-table__fixed::before{
  background:none !important;
}
</style>

