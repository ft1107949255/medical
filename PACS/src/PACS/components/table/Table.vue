<template>
  <div class="table-container" id="tableId">
      <el-table :data="list" style="width: 100%" ref="mutipleTable" :height="tableHeight"  highlight-current-row
                @selection-change="handleSelectionChange" @row-click="rowClick" @row-dblclick="rowdblclick" @row-contextmenu="rowRightClcik" v-loading="options.loading">
        <!--region 选择框-->
        <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;"></el-table-column>
        <!--region 数据列-->
        <el-table-column v-for="(col, index) in columns" :key="index" :prop="col.prop" :label="col.label" width="col.width"></el-table-column>
      </el-table>
      <ul id="menu" ref='menu' style="display: none;">
          <li class="menuli"  @click="">浏览报告</li>
          <li class="menuli"  @click="seeMedia">浏览影像</li>
          <li class="menuli borderLine"  @click="editReport">编辑报告</li>
          <li class="menuli borderLine"  @click="collect">收藏</li>
          <li class="menuli borderLine"   @click="MoreInfo">病人详细信息</li>
          <!-- <li class="menuli"  @click="seeMedia">查看影像</li>
          <li class="menuli"  @click="seeMedia">查看影像</li> -->
          <!-- <li class="menuli"  @click="seeMedia">查看影像</li> -->
      </ul>
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
            mutiSelect: false
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
        screenHeight: document.documentElement.clientHeight,
        rightRowId:'',
        row:{},
      }
    },
    computed: {
      tableHeight() {
        return this.screenHeight - this.otherHeight;
      }
    },
    mounted() {
      var that = this;
      document.onclick = function(e){
        that.closemouse();
      }
      window.onresize = () => {
        this.screenHeight = document.documentElement.clientHeight;
      }
      if(this.typeMouse==1){
        this.mouse();
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
      rowClick(row) {
        this.$emit('handleRowClick', row)
      },
      rowdblclick(row){
        this.$emit('handledblRowClick', row)
      },
      setCurrentRow(){
        this.$refs.mutipleTable.setCurrentRow();
      },
      rowRightClcik(row){
        // 右键点击事件
        console.log('当前id+++',row.id);
        this.rightRowId = row.id;
        this.row = row;
        //this.row.conclusion =  this.row.conclusion !=''? '' : unescape(this.row.conclusion);
        // console.log(this.row.conclusion);
        //this.row.imageDescribe =  this.row.imageDescribe !=''? '' : unescape(this.row.imageDescribe);
      },
      seeMedia(){
        // 查看影像
        console.log('查看影像');
        if(this.rightRowId ==''){
           this.$message({
             showClose:true,
             message:'请右键选择表格行内数据！！',
             type:'warning',
           });
           return false;
        }
        window.open('/#/patientimages?patientId='+this.rightRowId,'_blank')
        this.rightRowId = '';
      },
      mouse:function(){
        var table = document.getElementById("tableId"); 
        var ul = document.getElementById("menu"); //获取ul节点对象
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
      closemouse: function(){
        this.$refs.menu.style.display='none';
      },
      editReport:function(){
         this.$router.push({path: '/edit', query: {patientId:this.rightRowId}})
      },
      collect: function(){
        this.$emit('collect',this.row);
      },
      MoreInfo: function(){
        this.$emit('moreinfo',this.row);
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

<style lang='stylus' rel='stylesheet/stylus'>
  @import './../../../common/styleus/index.styl';
  .table-container {
    .el-table {
      width: 100%;
      font-size: 10px;
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
