<template>
  <el-card class="box-card">
    <!-- <div slot="header" class="box-card-header clearfix" v-if="title"> -->
      <!-- <div class="title">
        <span>{{title}}</span>
        <slot name="title"></slot>
      </div> -->
      <div class="btn-group">
        <slot name="btn"></slot>
      </div>
    <!-- </div> -->
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .box-card {
    display flex
    flex-direction column
    height: 100%
    overflow: hidden
    >>> .el-card__header {
      height: 53px
      line-height: 53px
      padding: 0
      background: #fff
    }
    >>> .el-card__body {
      flex 1
      overflow-y auto
    }
    .box-card-header {
      padding: 0 20px
    }
    .title {
      display: inline-block
    }
    .btn-group {
      float: right
    }
  }
</style>
