<template>
  <card :title="myTitle" class="list-card">
    <!--top-btn-->
    <div class="top-btn" slot="btn">
      <slot name="top-btn"></slot>
    </div>
    <!-- list-content -->
    <div class="list-content" :style="{'flex-direction': flexDirection}">
      <!-- table -->
      <div class="list-table">
        <slot></slot>
      </div>
      <!-- 搜索功能 -->
      <div class="list-search" v-if="$slots.search" :class="{'list-search_show': !searchRealWidth}" :style="searchStyle">
        <slot name="search"></slot>
      </div>
    </div>
    <!-- 列表页底部 -->
    <div class="list-footer">
      <div class="list-footer_left">
        <!-- 按钮组 -->
        <slot name="btn-group"></slot>
      </div>
      <div class="list-footer_paging">
        <!-- 分页 -->
        <slot name="paging"></slot>
      </div>
    </div>
  </card>
</template>
<script>
/**
 * 通用列表组件
 * @params {string} title 列表title (默认值为路由meta.title)
 * @params {boolean} isShowSearch 是否显示搜索模块
 * @params {string} searchPosition 搜索模块显示位置
 * @slot default table列表插槽
 * @slot search 搜索栏插槽
 * @slot btn-group 按钮组插槽
 * @slot paging 分页插槽
*/
import Popup from 'Components/src/popup'
import Card from 'Components/src/card'
export default {
  name: 'customList',
  props: {
    title: {
      type: String,
      default () {
        return this.$route.meta.title || sessionStorage.getItem('currentMenuTitle')
      }
    },
    isShowSearch: {
      type: Boolean,
      default: false
    },
    searchWidth: {
      type: Number,
      default: 300
    },
    searchPosition: {
      type: String,
      default: 'right'
    }
  },
  components: {
    Popup,
    Card
  },
  data() {
    return {
      posistion: [
        {
          value: 'right',
          label: 'row',
          reverse: 'left'
        },
        {
          value: 'left',
          label: 'row-reverse',
          reverse: 'right'
        },
        {
          value: 'top',
          label: 'column-reverse',
          reverse: 'bottom'
        },
        {
          value: 'bottom',
          label: 'column',
          reverse: 'top'
        }
      ],
      myTitle: this.title
    }
  },
  watch: {
    $route: function() {
      this.myTitle = this.$route.meta.title || sessionStorage.getItem('currentMenuTitle')
    }
  },
  computed: {
    searchRealWidth () {
      return !this.isShowSearch ? this.searchWidth : 0
    },
    // 布局方向
    flexDirection () {
      return this.findParamsLabel(this.searchPosition, this.posistion, { value: 'value', label: 'label' })
    },
    // margin方向
    marginDirection () {
      return this.findParamsLabel(this.searchPosition, this.posistion, { value: 'value', label: 'reverse' })
    },
    // 搜索模块样式对象
    searchStyle () {
      let style = {
        // width: `${['left', 'right'].includes(this.marginDirection) ? this.searchRealWidth + 'px' : this.tableHeight + 'px'}`,
        // height: `${['top', 'bottom'].includes(this.marginDirection) ? this.searchRealWidth + 'px' : this.tableHeight + 'px'}`
        // transform: `translateX(${this.searchRealWidth}px)`
      }
      style['margin-' + this.searchPosition] = `-${this.searchRealWidth}px`
      style['margin-' + this.marginDirection] = `${this.searchRealWidth ? 0 : 10}px`
      return style
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped lang="stylus">
@import './list';
.list-card {
  width: 100%;
}
</style>
