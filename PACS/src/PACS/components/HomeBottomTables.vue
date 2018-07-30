<template>
  <div class="table-containers" id="tableId1">
      <el-table :data="list" style="width: 100%" ref="mutipleTable" height="150px"
                @selection-change="handleSelectionChange" @row-dblclick="DbrowClick" v-loading="options.loading">
        <!--region 选择框-->
        <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;"></el-table-column>
        <!--region 数据列-->
        <el-table-column v-for="(col, index) in columns" :key="index" :prop="col.prop" :label="col.label" :width="col.width"></el-table-column>
        <!-- <ul id="menu1" ref='menu' style="display: none;">
          <li class="menuli"  @click="seeMedia">浏览报告</li>
          <li class="menuli"  @click="seeMedia">浏览影像</li>
          <li class="menuli borderLine"  @click="seeMedia">编辑报告</li>
          <li class="menuli borderLine"  @click="seeMedia">收藏</li>
          <li class="menuli borderLine"   @click="seeMedia">查看详细报告</li>
      </ul> -->
      </el-table>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'Table',
    props: {
      // 数据列表
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      // table 表格的控制参数   loading:是否添加表格loading加载动画, mutiSelect:是否支持列表项选中功能
      options: {
        type: Object,
        default() {
          return {
            loading: false,
            mutiSelect: false
          }
        }
      }
    },
    data() {
      return {

      }
    },
    methods: {
      handleSelectionChange(value) {
        this.$emit('handleSelectionChange', value);
      },
      // 选中行
      handleSelectionChange (val) {
        console.log('val:', val)
      },
      DbrowClick(row) {
        // 表格双击事件
        console.log('双击表格');
        console.log(row);
        // 打开影像
        window.open('/#/patientimages?studyinsta='+row.studyinsta,'_blank');
        // this.$emit('handleRowClick', row)
      },
      seeMedia: function(){
        //
      },
      rightmouse: function(){
        var table = document.getElementById("tableId1"); 
        var ul = document.getElementById("menu1"); //获取ul节点对象
        /*为document绑定鼠标右键菜单事件*/
        table.oncontextmenu = function(e){
          ul.style.display = 'block';
          var _event = window.event||e;  //事件对象
          var x  = _event.clientX; // 鼠标的x坐标
          var y =  _event.clientY; //鼠标的y坐标
          ul.style.left = x + "px";  //改变ul的坐标
          ul.style.top = y  + "px";  
          //阻止默认行为
          if(_event.preventDefault){
            _event.preventDefault();  //标准格式
          }else{
            _event.returnValue = false; //IE格式
          }
        }
      },
      // closemouse: function(){
      //   this.$refs.menu.style.display='none';
      // }
      
    },
    mounted(){
      //var that = this;
      // document.onclick = function(e){
      //   that.closemouse();
      // }
      this.rightmouse();
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import './../../common/styleus/index.styl';
  .table-containers {
    .el-table {
      width: 100%;
      // max-height: 600px;
      font-size: 10px;
      // overflow-y: auto;
      background-color: $gray;
      &::before {
        height: 0;
      }
      th {
        height: 45px;
        background-color: #b6b9bc;
        color: #333;
        text-align:center 
      }
      td, th.is-leaf {
        padding-left: 20px;
        border: none;
      }
      tbody tr {
        background-color: $gray;
        &:hover {
          background-color: $haver!important;
        }
      }
    }
  }
</style>
