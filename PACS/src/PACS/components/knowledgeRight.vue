<template>
   <div class="Knowledge_centents">
       <div>
        <el-form label-position="right"   label-width="80px"  >
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="22">
                    <el-form-item label="编辑类型:" >
                    <span>{{editType}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" v-if="isShowaddType" >
                <el-col :span="10">
                    <el-form-item label="节点名称:" >
                    <el-input v-model="nodeName"  clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" >
                    <el-form-item label="节点类型:" >
                    <el-select v-model="type" placeholder="选择" clearable :disabled="typeCanSelect" @change="typeChange" >
                        <el-option label="目录" value="D"></el-option>
                        <el-option label="节点"   value="F"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
       </div>
       <hr/>
       <div class="tabelList"  v-if="tabelShow">
        <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="23">
        <el-form label-position="right"   label-width="150px"   :model="formLabel" >
            <!-- <el-form-item label="诊断术语名:">
                <el-input v-model="formLabel.name"></el-input>
            </el-form-item> -->
            <el-form-item label="标识节点的顺序:">
                <el-input v-model="formLabel.nodeorders"></el-input>
            </el-form-item>
            <el-form-item label="诊断属于描述信息:">
                <el-input type="textarea" :rows="4" v-model="formLabel.description"></el-input>
            </el-form-item>
            <el-form-item label="诊断结论:">
                <el-input type="textarea" :rows="4" v-model="formLabel.conclusion"></el-input>
            </el-form-item>
            <el-form-item label="检查方法:">
                <el-input type="textarea" :rows="4" v-model="formLabel.checkMethod"></el-input>
            </el-form-item>
            <el-form-item label="临床诊断:">
                <el-input type="textarea" :rows="4" v-model="formLabel.clinicalDiagnosis"></el-input>
            </el-form-item>
            <el-form-item  label="检查要求:">
                <el-input type="textarea"  :rows="4" v-model="formLabel.procRequirement"></el-input>
            </el-form-item>
        </el-form>
        </el-col>
        </el-row>
       </div>
       <div style="margin :auto ; width :100px">
         <el-button type="primary" @click="Submit">确实</el-button>
       </div>
   </div>
</template>


<script>
export default {
  props:['index','thisVal'],  
  data() {
    return {
      ip: this.CONSTANT.CONSTANT.WEB_URL,
      token:localStorage.getItem('token') ,
      msg: "",
      type:"",
      nodeName:"",
      editType:"",
      isShowaddType : false,
      typeCanSelect: false,
      tabelShow: false,
      formLabel: {}
    }

    //nodeType  节点类型   nodeorders 节点顺序      parentId 父节点
  },
  methods: {
      typeChange(){
          if(this.type == "F"){
            this.tabelShow=true;
          }else{
            this.tabelShow=false;
          }
      },
      Submit(){
          if(this.index==0){ //添加   目录 or 节点
            if(!this.type){ 
              this.$message({
              message: '请选择需要添加的类型',
              type: 'error'
              });
             }else if(this.type == "F"){ // 节点类型
                 if(!this.nodeName){
                    this.$message({
                    message: '请输入节点名称',
                    type: 'error'
                    });
                 }else{
                    var params={};
                    params.nodeType=this.type;
                    params.name=this.nodeName;
                    params.parentId=this.thisVal.id;
                    params.nodeorders=this.formLabel.nodeorders;
                    params.description=this.formLabel.description;
                    params.conclusion=this.formLabel.conclusion;
                    params.checkMethod=this.formLabel.checkMethod;
                    params.clinicalDiagnosis=this.formLabel.clinicalDiagnosis;
                    params.procRequirement=this.formLabel.procRequirement;
                    this.getAddlist(params);
                 }
             }else{ // 目录类型
                if(!this.nodeName){
                    this.$message({
                    message: '请输入节点名称',
                    type: 'error'
                    });
                 }else{
                    var params={};
                    params.nodeType=this.type;
                    params.name=this.nodeName;
                    params.parentId=this.thisVal.id;
                    this.getAddlist(params);
                 }
             }
          }else{ //修改
           if(this.thisVal.isParent){ // 修改目录 
                var params={};
                params.name=this.nodeName;
                params.id=this.thisVal.id;
                this.getAddlist(params);
           }else{
                var params={};
                params.nodeType=this.type;
                params.name=this.nodeName;
                params.id=this.thisVal.id;
                params.nodeorders=this.formLabel.nodeorders;
                params.description=this.formLabel.description;
                params.conclusion=this.formLabel.conclusion;
                params.checkMethod=this.formLabel.checkMethod;
                params.clinicalDiagnosis=this.formLabel.clinicalDiagnosis;
                params.procRequirement=this.formLabel.procRequirement;
                this.getAddlist(params);
           }
         }
      },
      getAddlist(params){
        console.log(params)
        this.$http.post(this.ip +'/xhhms/rest/interDiagKnowledgeBaseController/v1/add', params,
        { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
        var data = JSON.parse(res.data);
        if (data.status == 1) {
            console.log(data)
            this.$message({
            message: '成功',
            type: 'success'
            });
           this.closeTheShow();
           this.$emit('leftFresh');
        } else {
            console.log('失败')
            this.$message({
            message: '失败',
            type: 'error'
            });
            return false;
        }
        }).catch(err => {
        console.log(err);
        this.$message({
            message: '失败',
            type: 'error'
            });
        });
      },
      closeTheShow(){
        this.editType='';
        this.type='';
        this.nodeName='';
        this.formLabel={};
        this.isShowaddType=false;
        this.tabelShow=false;
      },
    getListForNodeID(params){
      this.$http.post(this.ip +'/xhhms/rest/interDiagKnowledgeBaseController/v1/getByid', params,
        { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
        var data = JSON.parse(res.data);
        if (data.status == 1) {
            console.log(data)
            this.type=data.data.nodeType;
            this.nodeName=data.data.name;
            this.thisVal.id=data.data.id;
            this.formLabel.nodeorders=data.data.nodeorders;
            this.formLabel.description=data.data.description;
            this.formLabel.conclusion=data.data.conclusion;
            this.formLabel.checkMethod=data.data.checkMethod;
            this.formLabel.clinicalDiagnosis=data.data.clinicalDiagnosis;
            this.formLabel.procRequirement=data.data.procRequirement;
        } else {
            console.log('失败')
            return false;
        }
        }).catch(err => {
        console.log(err);
        });
    }

  },
  watch:{
    index(){
       this.type='';
       if(this.index==0){
          this.editType="添加子节点";
          if(this.thisVal.isParent){
              this.nodeName='';
              this.typeCanSelect=false;
              this.tabelShow=false;
          }else{
              this.typeCanSelect=true;
              this.tabelShow=false;
          }
       }else{
          this.editType="修改节点信息";
          if(this.thisVal.isParent){
              this.nodeName=this.thisVal.name;
              this.typeCanSelect=true;
              this.tabelShow=false;
          }else{
              this.isShowaddType=true;
              this.typeCanSelect=false;
              this.tabelShow=true;
          }
       }
    },
    thisVal(){
        this.type='';
        if(this.thisVal.isParent){ //是否是父节点 --->  目录
            console.log("进来了",this.thisVal.isParent,this.index)
            this.isShowaddType = true;
            if(this.index==0){
               this.nodeName='';
               this.typeCanSelect=false;
               this.tabelShow=false;
            }else{
               this.nodeName=this.thisVal.name;
               this.typeCanSelect=true;
               this.tabelShow=false;
            }
        }else{ //节点 --->  文件
            if(this.index==0){ //添加 不能添加
              this.isShowaddType = false;
              this.tabelShow=false;
            }else{ // 可以修改
              var params={};
              params.id=this.thisVal.id;
              this.getListForNodeID(params);
              this.isShowaddType = true;
              this.typeCanSelect=true;
              this.tabelShow=true;
            } 
        }
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

</style>