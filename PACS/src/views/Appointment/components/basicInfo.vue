<template>
  <div>
  <el-form ref="form" :model="form"  label-width="80px" :rules='rules' >
    <div class="titleClass">
      <img  src="../../../static/images/basicInfo.png" class="imageClass" />
      <span class="demonstration">基本信息</span>
      <span id="msg" :class="showclass ? 'msgClass' : 'msgErrorClass'" >带*的字段为必填项</span>
    </div>
    <div class="content-line"></div>
    <div class="elrowClass">
    <el-row>
      <el-col :span="8"  >
        <el-form-item label="病人ID" max="10" >
            <el-input  @keyup.native="form.patientId = changePatientId()"  v-model="form.patientId" placeholder="请输入" clearable class="el-input" maxlength="20"></el-input>
            <!-- <button ></button> -->
            <img class="btnId" @click="showPatientIdInfo" src="../../../static/images/search.png" />
         </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="姓名" prop='name'>
          <el-input v-model="form.name" placeholder="请输入" clearable  class="el-input" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" >
        <el-form-item label="性别" prop='sex'>
          <el-select v-model="form.sex" placeholder="请选择"  clearable class="el-input">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="年龄" prop='age'>
          <el-input v-model="form.age" @keyup.native="form.age=changeAge()" @blur="consulateBirth()" placeholder="请输入" clearable class="el-input"> </el-input>
        </el-form-item>
         
      </el-col>
       <el-col :span="8">
         <el-form-item label="年龄类型" prop='ageUnit'>
             <el-select v-model="form.ageUnit" placeholder="请选择" @change="consulateBirth()"  clearable class="el-input">
              <el-option label="岁" value="岁"> </el-option>
              <el-option label="月" value="月"> </el-option>
              <el-option label="天" value="天"> </el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="出生日期" prop='birthDate'>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birthDate" clearable ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
       
      <el-col :span="8">
        <el-form-item label="联系电话" prop='phone'>
          <el-input v-model="form.phone" @keyup.native="form.phone=changePhone()"   @blur="getPhone()"  placeholder="请输入" clearable  class="el-input" maxlength="11"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="预约日期" prop='scheduledDatetime'>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.scheduledDatetime" clearable></el-date-picker>
        </el-form-item>
      </el-col>
       <el-col :span="8">
        <el-form-item :label="numberName"  prop='patientNo'>
          <el-input v-model="form.patientNo"  placeholder="请输入" clearable class="el-input"> </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item label="病人类型" prop="patientType">
          <el-radio-group v-model="form.patientType">
            <el-radio v-for="(item,index) in patientTypeList" :label="item.name" :value="item.name" :key="index" @change="changePatientType"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    </div>

    <div class="bottom">
    <div class="titleClass">
    <img  src="../../../static/images/checkInfo.png"  class="imageClass" />
    <span class="demonstration">检查信息</span>
    <span id="msg" :class="showclass ? 'msgClass' : 'msgErrorClass'" >带*的字段为必填项</span>
    </div>
    <div class="content-line"></div>
      <div class="elrowClass">
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请科室" prop='applyOfficeName'>
            <el-select v-model="form.applyOfficeName" :label="form.applyOfficeName" placeholder="请选择" filterable   clearable class="el-input" @change="department" >
              <el-option  :key="index" v-for="(item,index) in departments"  :label="item.departname" :value="item.departname"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请医生"  prop='applyDoctor'>
            <el-select v-model="form.applyDoctor" placeholder="请选择"  filterable clearable class="el-input">
              <el-option  :key="index" v-for="(item,index) in doctorList" :label="item.realName" :value="item.realName"  ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="床号" prop='bedNo'>
            <el-input v-model="form.bedNo"  placeholder="请输入" clearable class="el-input" maxlength="11" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="检查号" prop='accessionNo'>
            <el-input  @keyup.native="form.accessionNo=changeHisapplyno()" v-model="form.accessionNo" placeholder="请输入" clearable class="el-input" maxlength="11" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"  >
          <el-form-item label="设备类型" prop='modalityTypeName'>
            <el-select v-model="form.modalityTypeName" placeholder="选择设备类型再选择检查项目"  clearable class="el-input" title='请先选择设备类型之后再选择检查项目' >
              <el-option  :key="index" v-for="(item,index) in deviceList" :label="item.name" :value="item.name" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="检查项目" prop='checkItemIds'>
            <el-select v-model="form.checkItemIds " placeholder="请选择" filterable clearable multiple class="el-input" >
              <el-option  :key="index" v-for="(item,index) in checkItemList" :label="item.name" :value="item.id" ></el-option>
            </el-select>
        </el-form-item>
        </el-col>
        
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="主述" prop='clinicalDiagnosis'>
            <el-input type="textarea"  placeholder="请输入内容" v-model="form.clinicalDiagnosis"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </div>
    </div>
  </el-form>
  <!-- 病人信息搜索弹出框 -->
  <el-dialog
      title="既往病人管理"
      :visible.sync="PatientInfoDialogVisible"
      width="60%"
      height="400px"
      center>
      <!-- 表单管理 -->
      <div class="PatientInfotable">
        <Table :list='patientList' :columns='patientColums' @handleRowClick="handleRowClick"/>
      </div>
      <!-- 搜索条件-->
      <el-form  :model="patientForm" label-width="80px">
        <el-row>
            <el-col :span="7">
              <el-form-item label="病人ID:">
                <el-input v-model="patientForm.patientId" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="病人姓名:">
                <el-input v-model="patientForm.name" clearable></el-input>
              </el-form-item>
            </el-col>
       
            <el-col :span="7">  
              <el-form-item label="病人性别">
               <el-select v-model="patientForm.sex" placeholder="请选择"  clearable class="el-input">
                  <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
          </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="7">  
              <el-form-item label="开始日期:">
                <el-date-picker type="date" placeholder="请选择" v-model="patientForm.startTime" clearable></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">  
              <el-form-item label="结束日期:">
                <el-date-picker type="date" placeholder="请选择" v-model="patientForm.endTime" clearable></el-date-picker>
              </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="searchPatientInfo">查 询</el-button>
        <el-button @click="PatientInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="okPatientInfo">确 定</el-button>
      </span>
  </el-dialog>

 </div>
</template>

<script>
  import axios from 'axios';
  import selects from "../../components/Select.vue";
  import inputs from "../../components/Input.vue";
  import times from "../../components/Times.vue";
  import datePicker from "../../components/DatePicker.vue";
  import {formatDate} from "../../common/js/date";
  import Table from '../../components/table/sTable.vue';
  export default {
    components :{
      selects,
      inputs,
      times,
      datePicker,
      Table
    },
    props:['navList'],
    data() {
      var checkpatientNo = (rule, value, callback) => {
        if(this.form.patientType !== '' &&  value === '') {
          callback(new Error('请输入' + this.form.patientType + '号'));
        } else {
          callback();
        }
      };
      var checkscheduledDatetime = (rule, value, callback) => {
        if(value === '') {
          callback(new Error('请输入预约时间'));
        }else if(value !== '') {
          var date = new Date(value);
          // 有三种方式获取
          var time1 = date.getTime();
          let timestamp = new Date(new Date().toLocaleDateString()).getTime();
          if( time1 < timestamp){
            callback(new Error('预约时间不能小于今天！！'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        deviceType:'0', //设备展示 根据选择设备类型ID 判断
        departmentTyoe:'0',//医生展示 根据选择申请科室 判断
        form: {
          patientNo: '', // 病人类型编号
          patientId:'',  //病人id
          name: '', // 姓名
          sex: '', // 性别
          age: '', // 年龄
          ageUnit:'岁', // 年龄类型
          birthDate: '', // 出生日期
          phone: '', //电话
          patientType:'', //病人类型
          scheduledDatetime:'', //预约时间
          applyOffice: '',// 申请科室
          applyOfficeName:'',//申请科室name
          applyOfficeCode: '',  // 申请科室code
          applyDoctor: '', // 申请医生
          bedNo:'',//床号
          accessionNo:'', //检查号
          modalityTypeName:'', // 设备类型
          modalityTypeCode: '', // 设备类型编码
          checkItemIds:[], // 检查项目,
          id: '',
          clinicalDiagnosis:'', // 主诉
        },
        showclass: true,
        departments:[],
        doctorList:[],
        deviceList:[],
        checkItemList:[],
        patientTypeList:[],
        PatientInfoDialogVisible:false,
        patientForm:{
          patientId:'',  //病人id
          name:'', // 病人姓名
          sex:'',   // 病人性别
          startTime:'', // 开始时间
          endTime:'', // 结束时间
        },
        patientList:[],
        patientColums:[],
        row:{},
        numberName:'',  // 根据病人类型改变的编号名
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          sex: [
            { required: true, message: '请选择病人性别', trigger: 'change' }
          ],
          age: [
            { required: true, message: '请输入病人年龄', trigger: 'change' }
          ],
          ageUnit: [
            { required: true, message: '请选择年龄类型', trigger: 'blur' }
          ],
          birthDate: [
            { required: true, message: '请选择出生日期', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入电话', trigger: 'blur' }
          ],
          scheduledDatetime: [
            { required: true, validator: checkscheduledDatetime, trigger: 'change' }
          ],
          patientType: [
            { required: true, message: '请选择病人类型', trigger: 'change' }
          ],
          patientNo: [
            { required: true, validator: checkpatientNo, trigger: 'blur' }
          ],
          modalityTypeName: [
            { required: true, message: '请选择设备类型', trigger: 'change' }
          ],
          checkItemIds: [
            { type: 'array', required: true, message: '请选择检查项目', trigger: 'change' }
          ],
        }
      }
    },
    created(){
      // 获取部门数据
      this.getDepartment();
      // 获取设备类型数据
      this.getDeviceList();
      //获取病人类型数据
      this.getPatientType();
      // 获取病人信息数据
      // 获取当前日期
      let parmas = {};
      let date = new Date();
      parmas.startTime = formatDate(date, "yyyy-MM-dd");  //开始日期今天
      this.form.scheduledDatetime = formatDate(date, "yyyy-MM-dd"); 
      let  t = date.getTime()+1000*60*60*24;
      let  newtime =new Date(t);
      parmas.endTime = formatDate(newtime, "yyyy-MM-dd");  //开始日期今天
      console.log('默认参数---',parmas);
      this.getPatientInfo(parmas);
    },
    mounted () {
      // this.initData()
    },
    watch:{
      ageTypeAge: function (){
        this.consulateBirth();
      },
      'form.modalityTypeName' () {
        this.focus()
      }
    },
    methods: {
      // 初始化数据
      initData () {
        let modalityTypeName = localStorage.getItem('modalityTypeName')
        let modalityTypeCode = localStorage.getItem('modalityTypeCode')
        // 先判断缓存的设备类型是否存在设备类型列表中
        // 存在则显示  不存在就不显示
        this.deviceList.map(item=> {
          if (item.name === modalityTypeName) {
            this.form.modalityTypeName = modalityTypeName || ''
            this.form.modalityTypeCode = modalityTypeCode || ''
            let params = {
              id: item.id
            }
            // 请求接口
            this.$api.GetCheckItemsByDeviceType(params).then((res) => {
              var data = res;
              this.checkItemList=data.data;
              let checkItemIds = localStorage.getItem('checkItemIds')
              this.$nextTick(() => {
                this.form.checkItemIds = checkItemIds.split(',') || []
              })
            }, (err) => {
              console.log(err);
            })
            return
          }
        })
      },
      onSubmit() {
        console.log('submit!');
      },
      focus(){
        this.checkItemList = [];
        this.form.checkItemIds = [];
        if (this.form.modalityTypeName === '') {
          return false
        }
        this.deviceList.map(item=>{
          if (this.form.modalityTypeName !==''){
            if (item.name == this.form.modalityTypeName) {
              this.deviceType = item.id+"";
              this.form.modalityTypeName = item.name;
              this.form.modalityTypeCode = item.code;
              // 开始获取检查项目的值
              var params = {};
              params.id = item.id;
              this.$api.GetCheckItemsByDeviceType(params).then((res) => {
                var data = res;
                this.checkItemList=data.data;
              }, (err) => {
                console.log(err);
              })
            }
          }else {
            this.deviceType="0";
          }
        })
      },
      department(){
        this.form.applyDoctor="";
        this.departments.map(item=>{
          if (!!this.form.applyOfficeName){
            if (item.departname == this.form.applyOfficeName) {
              this.departmentTyoe = item.id;
              this.form.applyOfficeCode = item.orgCode;
              // 开始请求数据
              var params=new Object();
              params.id = item.id;
              this.$api.getDoctorListByDepartmentApi(params).then((res) => {
                var data = res;
                if (!!data) {
                  this.doctorList=data.data;
                } else {
                  return false;
                }
              }, (err) => {
                console.log(err);
              })
            }
          }else {
            this.departmentTyoe="0";
          }
        })
      },
      getDepartment () {
        var params=new Object();
        this.$api.getDepartmentListApi(params).then((res) => {
          var data = res;
          if (!!data) {
            this.departments=data.data;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      getDeviceList () {
        var params=new Object();
        this.$api.getDeviceListApi(params).then((res) => {
          var data = res;
          if (!!data) {
            this.deviceList=data.data;
            this.initData()
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      getCheckItemList(id){
        var params = {id};
        this.$api.getCheckItemListApi(params).then((res) => {
          var data = res;
          if (!!data) {
            this.checkItemList=data.data;
          } else {
            this.checkItemList = []
            this.form.checkItemIds = []
          }
        })
      },
      submitData : function (form) {
        this.showclass=true;
        this.form.medicaCheckTemplateId = this.form.template.id;
        this.form.medicaCheckTemplate = this.form.template.name;
        if (this.form.birthDate !==''){
          var date = new Date(this.form.birthDate);
          this.form.birthDate = formatDate(date, 'yyyy-MM-dd');
        }
        if (this.form.scheduledDatetime !== ''){
          var date = new Date(this.form.scheduledDatetime);
          this.form.scheduledDatetime = formatDate(date, 'yyyy-MM-dd');
        }
      },
    getPatientType: function(){
      // 获取病人类型
      console.log('开始获取病人类型数据');
        var params=new Object();
        this.$api.getPatientTypeListApi(params).then((res) => {
          var data = res;
          console.log('病人类型数据----',data);
          if (data.data) {
            console.log(data.data);
            this.patientTypeList=data.data;
            this.form.patientType = this.patientTypeList[0].name;
            this.numberName = this.patientTypeList[0].name+'号';
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
    },
    changePatientId: function(){
      let newValue = this.form.patientId.replace(/[^\w\.\/]/ig,"");
      return newValue;
    },
    changePhone: function(){
      let newValue = this.form.phone.replace(/[^0-9]/ig,"");
      return newValue;
    },
    getPhone: function(){
      console.log('开始测试号码是否正确.');
      let Nval = this.form.phone;
       var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(Nval)) {
           this.$message({
             showClose: true,
             message: '请输入合法的手机号码！！',
             type:'error',
           });
           this.form.phone = '';
        } else {
          this.form.phone = Nval;
        }
    },
    changeHisapplyno:function(){
      let newValue = this.form.accessionNo.replace(/[^0-9]/ig,"");
      return newValue;
    },
    changeAge:function(){
      let newValue = this.form.age.replace(/[^0-9]/ig,"");
      return newValue;
    },
    consulateBirth: function(){
      // 根据选择年龄和类型计算出生日期
      console.log(this.ageUnit);
      if(this.form.age !='' && this.form.age !=0 && this.form.ageUnit !=''){
        // 先判断选择年龄类型
        if(this.form.ageUnit == '岁'){
          //按年来算
        let y = parseInt(this.form.age);
        let num = 365*24*60*60*1000*y;
        let newtime = new Date(new Date()-num).getFullYear()+'-'+(new Date(new Date()-num).getMonth()+1<10?'0'+(new Date(new Date()-num).getMonth()+1):(new Date(new Date()-num).getMonth()+1))+'-'+(new Date(new Date()-num).getDate()<10?'0'+new Date(new Date()-num).getDate():new Date(new Date()-num).getDate())
        this.form.birthDate = new Date(newtime);
        }else if(this.form.ageUnit == '月'){
          // 按月来算
          let m = parseInt(this.form.age);
          var d = new Date();
          d.setMonth(d.getMonth()-m);
          let  newtime = new Date(d.getFullYear()+'-'+((d.getMonth()<9?'0':'')+(d.getMonth()+1))+'-'+(d.getDate()<10?'0':'')+d.getDate())
          this.form.birthDate = new Date(newtime);
        }else{
          let d = parseInt(this.form.age);
          let today =new Date();
          let  t = today.getTime()-1000*60*60*24*d;
          let  newtime=new Date(t);
          this.form.birthDate =  new Date(newtime);
        }
      }else{
        this.form.birthDate =  '';
      }
    },
    showPatientIdInfo: function(){
      // 打开搜索病人信息框
      this.PatientInfoDialogVisible = true;
    },
    searchPatientInfo: function(){
      // 搜索信息 渲染表格
      this.getPatientInfo(this.patientForm);
    },
    okPatientInfo: function(){
      // 确定信息 选中信息
      // this.form = this.row;
      this.PatientInfoDialogVisible = false;
      if(this.row != {}){
        this.form.patientNo = this.row.patientNo ? this.row.patientNo : "";
        this.form.patientId = this.row.patientId ? this.row.patientId : "";
        this.form.name = this.row.name ? this.row.name : "";
        this.form.sex = this.row.sex ? this.row.sex : "";
        this.form.age = this.row.age ? this.row.age : "";
        this.form.birthDate = this.row.birthDate ? this.row.birthDate : "";
        this.form.phone = this.row.phone ? this.row.phone : "";
        this.form.scheduledDatetime = this.row.scheduledDatetime
        ? this.row.scheduledDatetime
        : "";
        this.form.patientType = this.row.patientType
        ? this.row.patientType
        : "";
        this.form.ageUnit = this.row.ageUnit? this.row.ageUnit : '';
        this.form.clinicalDiagnosis = this.row.clinicalDiagnosis? this.row.clinicalDiagnosis : '';
        }
    },
    handleRowClick:function(val){
      // 点击选中
      console.log('aaa',val);
      this.row = val; 
    },
    // 获取信息函数
    getPatientInfo: function(params){
      if(params.startTime !=''){
        var date = new Date(params.startTime);
        params.startTime = formatDate(date, "yyyy-MM-dd");
      }
      if(params.endTime !=''){
        var date = new Date(params.endTime);
        params.endTime = formatDate(date, "yyyy-MM-dd");
      }
      this.$api.getPatientInfoApi(params).then((res) => {
        var data = res;
        this.patientColums = data.table;
        if (data.list) {
          // 替换性别
          data.list.map(item=>{
            if(item.sex !='' && item.sex == 0){
              item.sex = '男';
            }else if(item.sex !='' && item.sex == 1){
              item.sex = '女';
            }else{
                item.sex = '';
            }
          });
          this.patientList=data.list;
        } else {
          return false;
        }
      }, (err) => {
        console.log(err);
      })
    },
    changePatientType: function(){
      // 根据病人类型改变名字
       this.numberName = this.form.patientType + '号';
    }
  },
  }
</script>

<style scoped lang="stylus">
  

  .el-row {
    margin-top :16px;
  }
  .el-col {
     height 40px;
     display inline-block;
  }
  .content-line{
    height:1px;
    width: 95%;
    background:$blue;
    margin-top :5px;
  }
  .bottom {
    margin-top :2%;
  }

  .el-input {
    width: 80% !important;
    background-color: $gray;
  }

  .button {
    margin-left -15%;
    width 70px;

  }
  .el-form-item__error{
    display:none !important;
  }
  .msgClass{
    color:#606266;
    font-size:12px;
    margin-left:8px;
  }
  .demonstration{
    font-size:15px;
    Color: $blue;
  }
  .msgErrorClass{
    color:red;
    font-size:12px;
    margin-left:8px;
  }

  .li_div{
    width:100%;
  }

  .titleClass{
   display: inline-flex;
   align-items :center;
  }

  .imageClass{
    width:18px;
    margin-right :8px;
  }

  .elrowClass{
    margin-top :15px;
  }
  
 
  .btnId{
    width:38px;
    height:38px;
    position:absolute;
    margin-left:2px;
    border:none;
    cursor:pointer;
  }

  >>> .dialog-footer .el-button{
    font-size:12px;
  }
  >>> .el-form-item .el-form-item__label{
    font-size:12px;
  }
  >>> .el-dialog__title{
    font-size:14px;
  }
</style>
<style>
 .elrowClass .el-form-item__label{
    font-size:12px !important;
  }
  .elrowClass .el-textarea{
    width:80% !important;
  }
  .elrowClass .el-radio__label{
    font-size:12px !important;
  }
  .elrowClass .el-input{
    font-size:12px !important;
  }
  .PatientInfotable .table-container .el-table{
    max-height:300px !important;
  }
  .elrowClass .el-textarea__inner{
    font-size: 12px !important;
  }
</style>
