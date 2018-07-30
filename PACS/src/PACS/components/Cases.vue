<template>
  <div class="Cases_contents">
      <el-form label-position="right"   label-width="80px"  :show-message="false" >
        <el-row>
        <el-col :span="8"  >
            <el-form-item label="病人ID:" style="text-align: justify" >
              <span>{{data.patientNo}} </span>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="病人姓名:" >
               <span> {{data.name}} </span>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="卡号:">
               <span> {{data.patientNo}} </span>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="8"  >
            <el-form-item label="设备类型:" >
                <span> {{data.modalityTypeName}} </span>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="检查项目:" >
               <span> {{data.procedurename}} </span>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="检查所见:" >
                    <span v-if="data.imageDescribe!=null && data.imageDescribe!='undefined'" v-html="data.imageDescribe" ></span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="24">
                <el-form-item label="检查提示:" >
                     <span v-if="data.conclusion!=null && data.conclusion!='undefined'" v-html="data.conclusion" ></span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="22">
                <el-form-item label="检查名称:" >
                    <el-input v-model="checkName"  clearable></el-input>
                </el-form-item>
            </el-col>
        </el-row>
         <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="22">
                <el-form-item label="描述:" >
                <el-input  type="textarea" :rows="4" v-model="description" clearable ></el-input>
                </el-form-item>
            </el-col>
         </el-row>
         <el-row type="flex" class="row-bg" justify="space-around">
             <el-col :span="8">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">收藏</el-button>
                </el-form-item>
             </el-col>
         </el-row>
      </el-form> 
  </div>
</template>

<script>
export default {
  props:['theData','rowdata','name','memo','casesid'],  
  data() {
    return {
      msg: "",
      checkName:'',
      description:'',
      id:'',
      data:{},
    };
  },
  methods: {
    onSubmit(){
       this.$emit('Collecting', this.checkName,this.description,this.id);
    },
    changeData(){
      this.data = this.theData;
    }
  },
  mounted() {
    this.data=this.$props.theData;
  },
  watch:{
    theData(){
        this.data = this.theData;
        
    },
    rowdata(){
       this.data=this.rowdata;
    },
    name(){
        this.checkName=this.name;
    },
    memo(){
       this.description=this.memo;
    },
    casesid(){
       this.id=this.casesid;
    },
    data(){
      if(!this.name){
            if(this.data.modalityTypeName ){
                if(this.data.procedurename ){
                    this.checkName=this.data.name+ '_' + this.data.modalityTypeName + '_' + this.data.procedurename;
                }else{
                    this.checkName=this.data.name+'_' + this.data.modalityTypeName;
                }
            }else{
                if(this.data.procedurename ){
                    this.checkName=this.data.name+ '_' + this.data.procedurename;
                }else{
                    this.checkName=this.data.name;
                }
            }
        }else{
            this.checkName=this.name;
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
@import '../../common/styleus/index.styl';

</style>