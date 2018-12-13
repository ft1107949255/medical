<template>
  <div class="centenWidnow">
    <div style="background-color:#bdbebe; height:40px;font-size:12px; line-height:40px;"><span style="margin-left:10px;">系统配置信息</span></div>
    <div  class="systemInfo" style="margin-left:10px; margin-top:20px;">
      <div><span style="font-size:12px;">分诊流程是否存在：{{systeml.needProcess}}</span></div>
      <div class="middle"><span style="font-size:12px;">上报流程是否存在：{{systeml.remoteDiagnosisFlag}}</span></div>
      <div><span style="font-size:12px;">会诊流程是否存在：{{systeml.consultationFlag}}</span></div>
      <div class="middle"><span style="font-size:12px;">分享码是否重复使用：{{systeml.shareCodeUseFlag}}</span></div>
    </div>
    <div class="sysBtn">
      <el-button type="primary" @click="OkDialogsystem">修 改</el-button>
    </div>

    <!--检查方法设置类型-->
    <div>
     <Popup v-model="windowdialogVisible" @handleSure="handleSave">
        <el-form ref="window" :model="systeml" label-width="80px">
              <el-form-item label="分诊设置:">
              <el-select v-model="systeml.needProcess" placeholder="请选择类型">
                  <el-option label="是" value='是'></el-option>
                  <el-option label="否" value='否'></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="上报设置:">
              <el-select v-model="systeml.remoteDiagnosisFlag" placeholder="请选择类型">
                  <el-option label="是" value='是'></el-option>
                  <el-option label="否" value='否'></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="会诊设置:">
                <el-select v-model="systeml.consultationFlag" placeholder="请选择类型">
                    <el-option label="是" value='是'></el-option>
                    <el-option label="否" value='否'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分享码设置:">
                <el-select v-model="systeml.shareCodeUseFlag" placeholder="请选择类型">
                    <el-option label="是" value='是'></el-option>
                    <el-option label="否" value='否'></el-option>
                </el-select>
              </el-form-item>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="windowdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData">确 定</el-button>
        </span> -->
     </Popup>
    </div>
  </div>
</template>

<script>
// 私有组件
import Popup from 'Components/src/popup';
import formList from 'Components/src/formList'
export default {
  components: {
    Popup,
    formList
  },
  data() {
    return {
     systeml:{
        id: '',
        needProcess:'',
        remoteDiagnosisFlag:'',
        consultationFlag:'',
        shareCodeUseFlag: ''
      },
      windowdialogVisible: false,
    };
  },
  created() {
    // this.getDevictTypeList();
    this.getSystem();
  },
  methods: {
    OkDialogsystem() {
      this.windowdialogVisible = true;
    },
    submitData() {
      var params =  new Object();
      console.log(this.systeml.label);
      if(this.systeml.needProcess === '是'){
        params.needProcess   = 1;
      } else if(this.systeml.needProcess === '否'){
        params.needProcess = 0;
      }
       if(this.systeml.remoteDiagnosisFlag === '是'){
        params.remoteDiagnosisFlag   = 1;
      } else if(this.systeml.remoteDiagnosisFlag === '否'){
        params.remoteDiagnosisFlag = 0;
      }
      if(this.systeml.consultationFlag === '是'){
        params.consultationFlag   = 1;
      } else if(this.systeml.consultationFlag === '否'){
        params.consultationFlag = 0;
      }
      if(this.systeml.shareCodeUseFlag === '是'){
        params.shareCodeUseFlag   = 1;
      } else if(this.systeml.shareCodeUseFlag === '否'){
        params.shareCodeUseFlag = 0;
      }
      if(this.systeml.id !=''){
        params.id = this.systeml.id;
      }
      console.log('【】',params);
      this.$api.updateBasicSystemConfigApi(params).then(
        res => {
          var data = res;
          if(data.status === '1' || data.status==1){
            this.$message({
              showClose: true,
              message:'修改成功',
              type: 'success'
            });
            this.windowdialogVisible = false;
            this.getSystem();
          }
        },err => {
          console.log(err);
        }
      ); 
    },
    getSystem() {
      this.$api.getBasicSystemConfigApi().then(res => {
        var data = res;
        console.log(data);
        if(data.status === '1' || data.status==1){
          if (data.data.needProcess === null) {
            this.systeml.needProcess = '否';
          } else {
            this.systeml.needProcess = data.data.needProcess==0?'否':'是';
          }
          if (data.data.remoteDiagnosisFlag === null) {
            this.systeml.remoteDiagnosisFlag = '否';
          } else {
            this.systeml.remoteDiagnosisFlag = data.data.remoteDiagnosisFlag ==0?'否':'是';
          }
          if (data.data.consultationFlag === null) {
            this.systeml.consultationFlag = '否';
          } else {
            this.systeml.consultationFlag = data.data.consultationFlag ==0?'否':'是';
          }
          if (data.data.shareCodeUseFlag === null) {
            this.systeml.shareCodeUseFlag = '否';
          } else {
            this.systeml.shareCodeUseFlag = data.data.shareCodeUseFlag ==0?'否':'是';
          }
          if(typeof(data.data.id) !='undefined'){
            this.systeml.id = data.data.id;
          }
        }
      },err => {
          console.log(err);
        }
      );
    },
    handleSave() {
      console.log(111);
      this.submitData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

.centenWidnow{
  background-color: #d4d4d4;
  >>> .el-dialog__title {
    font-size: 12px !important;
    color: #606266 !important;
  }
  >>> .el-form-item__label{
    font-size: 12px !important;
  }
  >>> .el-input__inner{
    font-size: 12px !important;
  }
  >>> .el-select-dropdown__item {
    font-size: 12px !important;
  }
  >>> .el-select-dropdown__item span{
    font-size: 12px !important;
  }
  .sysBtn{
    margin-top:10px;
    margin-left:10px;
    >>> .el-button--primary{
      width:80px;
      height: 30px;
      padding: 0px;
      line-height: 30px;
    }
    margin-bottom:10px;
  }
  >>> .el-input{
    width:80%;
  }
  .middle{
    margin:10px 0px;
  }
}
.isActive {
  background-color: $blue;
  color: $colorWhite;
}

.paddings {
  margin-left: 10px;
  height: 35Px;
  width: 130px;
  float: left;
}

.setButton {
  float: left;
  margin-left: 10px;
  background-color: $blue;
  color: $colorWhite;
}
.tiaoz {
  height: 40Px;
  margin-top: 5px;
}
  .pagination {
    height: 36px;
    text-align: center;
    background-color: #e2e0e0;
  }
</style>
