<template>
  <div class="table-container" id="tableId">
      <el-table :data="list" style="width: 100%" ref="mutipleTable"  highlight-current-row
                @selection-change="handleSelectionChange" @row-click="rowClick" v-loading="options.loading">
        <!--region 选择框-->
        <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;"></el-table-column>
        <!--region 数据列-->
        <el-table-column v-for="(col, index) in columns" :key="index" :prop="col.prop" :label="col.label" width="col.width"></el-table-column>
      </el-table>
  </div>
</template>

<script type='text/ecmascript-6'>

    // 获取table的对象
    // var ul = document.getElementById("menu"); 
    //  document.onclick = function(e){
    //   ul.style.display = 'none';
    //  }

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
            mutiSelect: true
          }
        }
      },
      otherHeight: {
        type: Number,
        default() {
          return 0;
        }
      },
      typeMouse:{
        type:Number,
        default() {
          return 0;
        }
      },
    },
    data() {
      return {
        ip:this.CONSTANT.CONSTANT.WEB_URL,
        screenHeight: document.documentElement.clientHeight,
        rightRowId:'',
        row:{},
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      handleSelectionChange(value) {
        this.$emit('handleSelectionChange', value);
      },
      // 选中行
      handleSelectionChange (val) {
        console.log('val:', val, val.length)
        // if(val.length> 2){
        //   this.$message({
        //     showClose: true,
        //     message: '只能选择两个病人',
        //     type:'error'
        //   });
        //   this.$refs.mutipleTable.clearSelection();
        // }else
          var ids = []
          if(val.length != 0){
            val.map(item=>{
            ids.push(item.id)
            })
            console.log(ids)
            this.$emit('sendids', ids)
          } else {
            this.$message({
              showClose: true,
              message: '请选择至少一位病人',
              type: error
            });
          }
      },
      rowClick(row) {
        this.$emit('handleRowClick', row)
      },
      rowdblclick(row){
        this.$emit('handledblRowClick', row)
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

<style scoped lang='stylus' rel='stylesheet/stylus'>
  
  .table-container {
    .el-table {
      width: 100%;
      font-size: 10px;
      max-height:300px;
      overflow-y: auto;
      background-color: #e2e0e0;
      &::before {
        height: 0;
      }
      th {
        height: 47px;
        background-color: #c8c8c8;
        color: #333;
      }
      td, th.is-leaf {
        padding-left: 10px;
        border: none;
        text-align :center;
      }
      tbody tr {
        background-color: #e2e0e0
        &:hover {
           background-color: $haver!important;
        }
      }
      .el-table__body .cell{
          text-overflow: ellipsis;
          white-space: nowrap;
      }
    }
    #menu{position:fixed; background-color:#c9c9c9;width:140px;min-height:200px;z-index:9999; font-size:12px; box-shadow:2px 2px 2px #909090;-webkit-box-shadow: 2px 2px 2px #909090;
  -moz-box-shadow: 2px 2px 2px #909090; border-radius:10px;}
    .menuli{
      height:20px; 
      cursor :pointer;
      text-align:center;
      line-height:20px; 
      margin:10px auto;
      color:#606266;
      width:94%;

    }
    .menuli:hover{
      background-color:#9d9e9f;
      color:white; 
    }
    .borderLine{
      border-bottom:1px solid #bdbebe;
    }
  }
</style>
