<template>
  <el-table
    :data="data"
    style="width: 100%"
    ref="mutipleTable"
    :height="tableHeight"
    highlight-current-row
    @row-click="rowClick"
    :row-style="showTr">
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex"
      :label="column.label">
      <template slot-scope="scope">
        <span v-if="spaceIconShow(index)" v-for="space in scope.row._level" :key="space" class="ms-tree-space"></span>
        <span v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)" class="toggle-icon">
          <transition name="fadein">
            <i v-show="!scope.row._expanded" class="el-icon-arrow-right" aria-hidden="true"></i>
          </transition>
          <transition name="fadeout">
            <i v-show="scope.row._expanded" class="el-icon-arrow-down" aria-hidden="true"></i>
          </transition>
        </span>
        <span v-else-if="index===0" class="ms-tree-space"></span>
        {{scope.row[column.prop]}}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import Utils from '../utils/index.js'
//  import Vue from 'vue'
  export default {
    name: 'tree-grid',
    props: {
// 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
      treeStructure: {
        type: Boolean,
        default: function () {
          return false
        }
      },
// 这是相应的字段展示
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
// 这是数据源
      dataSource: {
        type: Array,
        default: function () {
          return []
        }
      },
// 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
      requestUrl: {
        type: String,
        default: function () {
          return ''
        }
      },
// 这个是是否展示操作列
      treeType: {
        type: String,
        default: function () {
          return 'normal'
        }
      },
// 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: function () {
          return false
        }
      },
// 表格 高度
      otherHeight: {
        type: Number,
        default() {
          return 0;
        }
      }
    },
    data () {
      return {
         screenHeight: document.documentElement.clientHeight
      }
    },
    computed: {
      tableHeight() {
        return this.screenHeight - this.otherHeight;
      },
      data: function () {
        let me = this
        if (me.treeStructure) {
          let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
          return data
        }
        return me.dataSource
      }
    },
    mounted() {
      window.onresize = () => {
        this.screenHeight = document.documentElement.clientHeight;
      }
    },
    // 格式化数据源
    methods: {
    // 显示行
      showTr: function (row, index) {
        let show = (row.row._parent ? (row.row._parent._expanded && row.row._parent._show)  : true)
        row.row._show = show
        console.log('row._show',row._show)
        return show ? '' : 'display:none;'
      },
    // 展开下级
      toggle: function (trIndex) {
        let me = this
        let record = me.data[trIndex]
        record._expanded = !record._expanded
      },
    // 显示层级关系的空格和图标
      spaceIconShow (index) {
        let me = this
        if (me.treeStructure && index === 0) {
          return true
        }
        return false
      },
    // 点击展开和关闭的时候，图标的切换
      toggleIconShow (index, record) {
        let me = this
        if (me.treeStructure && index === 0 && record.list && record.list.length > 0) {
          return true
        }
        return false
      },
      rowClick(row) {
        this.$emit('handleRowClick', row)
      },
      setCurrentRow(){
        this.$refs.mutipleTable.setCurrentRow();
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
  }
</script>
<style scoped>
  .ms-tree-space{position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;}
  .ms-tree-space::before{content: ""}
  table td{
    line-height: 26px;
  }

  >>> .el-table__body-wrapper {
    overflow-y: auto;
  }
</style>
