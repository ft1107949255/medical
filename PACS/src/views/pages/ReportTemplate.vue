<template>
  <div class="main">
    <link href="https://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
    <div class="button_list">
      <button>新建</button>
      <button  @click="dialogVisible = true">打开</button>
      <button>保存</button>
      <button>另存为</button>
      <button>删除</button>
      <button>打印</button>
      <button>导出模板</button>
      <button>导入模板</button>
      <button @click="dialogVisible1 = true">标签</button>
    </div>
    <div class="editor">
      <vue-html5-editor :content="content" :height="800"></vue-html5-editor>
    </div>
    <iframe class="" v-show="true" id="edit-iframe"  
      frameborder=0 name="showHere" scrolling="no" 
      v-bind:style="{width: '50%',height:'100%'}"
      src="">
      </iframe>
    <div class="two_dialog">
    <el-dialog
      title="标签"
      :visible.sync="dialogVisible1"
      width="24%"
      center=true
      :before-close="handleClose">
      <!--<doutrees :data="data" :defaultProps="defaultProps" />-->
      <hr>
      <div class="selects1">
        <selects name="类型"/>
      </div>
      <div class="selects1">
        <selects name="字段"/>
      </div>
      <div></div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
          </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
  import input1 from "./../components/Input.vue";
  import tables from "./../components/BottomTables.vue";
  import selects from "./../components/Select.vue";
  export default {
    components: {
      input1,
      tables,
      selects
    },
    data() {
      return {
        msg: "",
        content: '',
        dialogVisible: false,
        dialogVisible1:false,
        token:localStorage.getItem('token') ,
        theadData: [
          {
            name: "名称"
          },
          {
            name: "是否有效"
          },
          {
            name: "医疗结构"
          },
          {
            name: "设备类型"
          },
        ],
        tbodyData: [
          {
            tname: "浏阳市人民医院放射模板",
            action: '有效',
            yname: '浏阳市人民医院',
            btype: 'CT'
          },
          {
            tname: "浏阳市人民医院放射模板",
            action: '有效',
            yname: '浏阳市人民医院',
            btype: 'CT'
          },
          {
            tname: "浏阳市人民医院放射模板",
            action: '有效',
            yname: '浏阳市人民医院',
            btype: 'CT'
          },
          {
            tname: "浏阳市人民医院放射模板",
            action: '有效',
            yname: '浏阳市人民医院',
            btype: 'CT'
          },
          {
            tname: "浏阳市人民医院放射模板",
            action: '有效',
            yname: '浏阳市人民医院',
            btype: 'CT'
          },
          {
            tname: "浏阳市人民医院放射模板",
            action: '有效',
            yname: '浏阳市人民医院',
            btype: 'CT'
          },
          {
            tname: "浏阳市人民医院放射模板",
            action: '有效',
            yname: '浏阳市人民医院',
            btype: 'CT'
          },
        ],
      };
    },
    methods:{
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    mounted: function () {
      const oIframe = document.getElementById('show-iframe');
      oIframe.location.href = "http://127.0.0.1:8080/xhhms/remoteReportController.do?goEdit&id=1&jwtstr="+this.token;
    }
  }
</script>


<style lang='stylus' rel='stylesheet/stylus'>
  
.main{
  width:100%;
  .button_list{
    width:80%;
    margin :20px auto;
  }
  .button_list button{
    width:5%;
    height:30px;
    line-height:30px;
    font-size :12px;
  }
  .editor{
    width:80%;
    margin:0 auto;
  }
  .template_header{
    width:33%;
    float: left;
    .block span{
      width:0px;
    }
  }
  .btnbtn{
    width:16%;
    height :30px;
    line-height :30px;
    float: right;
    margin-right :20px;
  }

  .el-dialog__header{
    padding :0px;
    padding-top:20px;
  }
  .el-dialog__body{
    padding :0px;
    min-height :400px;
  }
  .el-dialog__body::after{
    clear:both;

  }
  .el-input__inner{
      height :30px;
      line-height:30px;
    }
  .tables{
    width:94%;
    margin:0 auto;
    /*min-height :600px;*/
  }
  .name{
    width:24%;
    float:left;
    margin-left :40px;
    span{
      width:30px;
    }
  }
  .selects{
    width:24%;
    float:right;
    margin-right :20px;
  }
  .input_div{
    height 30px;
    margin-top:30px;
  }
  .checkbox{
    width:10%;
    margin-top:10px;
    margin-left :40px;
    float:left;
    position: relative
    input{
      width:16px;
      height :16px;
    }
    span{
      position :absolute;
      top:-2px;
      left :20px;
    }
  }
  .selects1{
    width:60%;
    margin :40px auto;
  }
  .two_dialog .el-dialog__body{
    min-height :0px;
  }
}

</style>
