<template>
  <el-form ref="form" :model="form"  label-width="80px" :show-message="false" >
    <div class="titleClass">
      <img  src="../../static/images/basicInfo.png" class="imageClass" />
      <span class="demonstration">基本信息</span>
      <span id="msg" :class="showclass ? 'msgClass' : 'msgErrorClass'" >带*的字段为必填项</span>
    </div>
    <div class="content-line"></div>
    <div class="elrowClass">
    <el-row>
      <el-col :span="8"  >
        <el-form-item label="病人ID" max="10" :rules="[{ required: true, message: '病人id不能为空'},{ type: 'number', message: 'id必须为数字值'}]" :show-message="false">
            <el-input  @keyup.native="form.patientNo = changePatientNo()"  v-model="form.patientNo" placeholder="请输入" clearable class="el-input" maxlength="20"></el-input>
         </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="姓名" :rules="[{ required: true, message: '姓名不能为空'}]" :show-message="false">
          <el-input v-model="form.name" placeholder="请输入" clearable  class="el-input" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="卡号"  :show-message="false">
          <el-input @blur="form.cardOne = changeCard()"   v-model="form.cardOne" placeholder="请输入" clearable class="el-input" ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="性别" :rules="[{ required: true, message: '性别不能为空'}]" :show-message="false">
          <el-select v-model="form.sex" placeholder="请选择"  clearable class="el-input">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="年龄" :rules="[{ required: true, message: '年龄不能为空'}]" :show-message="false">
          <el-select v-model="form.age" placeholder="请选择" filterable clearable class="el-input">
            <el-option
              v-for="num in 120"
              :key="num-1"
              :label="num-1"
              :value="num-1">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="出生日期" :rules="[{ required: true, message: '出生日期不能为空'}]" :show-message="false">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birthDate" clearable ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>

      <el-col :span="8">
        <el-form-item label="联系电话" :rules="[{ required: true, message: '电话不能为空'}]" :show-message="false">
          <el-input v-model="form.phone" @keyup.native="form.phone=changePhone()"  placeholder="请输入" clearable  class="el-input" maxlength="11"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="预约">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.scheduledDatetime" clearable></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="16">
        <el-form-item label="病人类型" prop="resource" :rules="[{ required: true, message: ''}]" :show-message="false">
          <el-radio-group v-model="form.patientType">
            <el-radio v-for="(item,index) in patientTypeList" :label="item.name" :value="item.name" :key="index"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>

    </el-row>
    </div>


    <div class="bottom">
    <div class="titleClass">
    <img  src="../../static/images/checkInfo.png"  class="imageClass" />
    <span class="demonstration">检查信息</span>
    <span id="msg" :class="showclass ? 'msgClass' : 'msgErrorClass'" >带*的字段为必填项</span>
    </div>
    <div class="content-line"></div>
      <div class="elrowClass">
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请科室" :rules="[{ required: true, message: '申请科室不能为空'}]" :show-message="false">
            <el-select v-model="form.applyOfficeName" :label="form.applyOfficeName" placeholder="请选择" filterable   clearable class="el-input" @change="department" >
              <el-option  :key="index" v-for="(item,index) in departments"  :label="item.departname" :value="item.departname"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请医生" :rules="[{ required: true, message: '申请医生不能为空'}]" :show-message="false">
            <el-select v-model="form.applyDoctor" placeholder="请选择"  filterable clearable class="el-input">
              <el-option  :key="index" v-for="(item,index) in doctorList" :label="item.realName" :value="item.realName"  ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="床号" :rules="[{ required: true, message: '病床号不能为空'}]" :show-message="false">
            <el-input v-model="form.bedNo"  placeholder="请输入" clearable class="el-input" maxlength="11" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="申请单号" :rules="[{ required: true, message: '检查号不能为空'}]" :show-message="false">
            <el-input  @keyup.native="form.hisapplyno=changeHisapplyno()" v-model="form.hisapplyno" placeholder="请输入" clearable class="el-input" maxlength="11" ></el-input>
          </el-form-item>
        </el-col>
        
        <el-col :span="8">
          <el-form-item label="检查模版" :rules="[{ required: true, message: '检查模板不能为空'}]" :show-message="false">
            <el-select v-model="form.medicaCheckTemplate" @change="changeTemplate" placeholder="请选择"  filterable clearable class="el-input">
              <el-option  :key="index" v-for="(item,index) in templatelList" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检查项目" :rules="[{ required: true, message: '检查项目不能为空'}]" :show-message="false">
            <el-select v-model="form.procedurename " placeholder="请选择" filterable clearable class="el-input" >
              <el-option  :key="index" v-for="(item,index) in checkItemList" :label="item.name" :value="item.name" ></el-option>
            </el-select>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      
        <el-col :span="8">
          <el-form-item label="费用类型" :rules="[{ required: true, message: '费用类型不能为空'}]" :show-message="false">
            <el-select v-model="form.payTypeName" placeholder="请选择" filterable clearable class="el-input" @change="getpayType">
              <el-option  :key="index" v-for="(item,index) in chargeList" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检查收费" :rules="[{ required: true, message: '检查收费不能为空'}]" :show-message="false">
            <el-input @keyup.native="form.price=changePrice()"  v-model="form.price" placeholder="请输入" clearable class="el-input" maxlength="11"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </div>
    </div>
  </el-form>
</template>

<script>
  import axios from 'axios';
  import selects from "./Select.vue";
  import inputs from "./Input.vue";
  import times from "./Times.vue";
  import datePicker from "./DatePicker.vue";
  import {formatDate} from "../common/js/date";
  export default {
    components :{
      selects,
      inputs,
      times,
      datePicker
    },
    props:['navList'],
    data() {
      return {
        ip: this.CONSTANT.CONSTANT.WEB_URL,
        token:localStorage.getItem('token') ,
        deviceType:'0', //设备展示 根据选择设备类型ID 判断
        departmentTyoe:'0',//医生展示 根据选择申请科室 判断
        form: {
          patientNo: '', // 用户编号
          cardOne: '', // 卡号1
          // cardTwo: '',  // 卡号2
          // cardThree: '',  // 卡号3
          name: '', // 姓名
          sex: '', // 性别
          age: '', // 年龄
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
          // template: '',  // 模板
          medicaCheckTemplate:'', // 检查模版
          medicaCheckTemplateId: '',// 检查模板id
          // modality : '', // 设备类型
          // modalityTypeName:'', // 设备类型
          // modalityTypeCode: '', // 设备类型编码
          // modalityType: '', // 检查设备
          // modalityName:'',//检查设备名称
          // modalityCode: '' ,// 检查设备类型编码
          //payType: '', // 费用
          payTypeName:'',//费用类型
          payTypeCode: '', // 费用类型编码
          price: '', // 检查收费
          procedurename:'', // 检查项目,
          id: '',
          hisapplyno:'', // 申请单号
        },
        showclass: true,
        departments:[],
        doctorList:[],
        deviceList:[],
        templatelList:[],
        medicalList:[],
        chargeList:[],
        checkItemList:[],
        patientTypeList:[],
      }
    },
    created(){
      this.getDepartment();
      //this.getDoctor();
      // this.getDeviceList();
      this.getTemplatelList();
      // this.getMedicalList();
      this.getChargeList();
      this.getCheckItemList();
      //获取病人类型数据
      this.getPatientType();
    },
    watch:{
    },
    mounted() {
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      focus(){
        console.log(this.form.modality);
       this.form.modality="";
        this.deviceList.map(item=>{
          console.log(item.name)
          if (!!this.form.modalityType ){
            if (item.name == this.form.modalityType) {
              console.log("相同", item.name)
              this.deviceType = item.id+"";
              this.form.modalityName = item.name
              this.form.modalityCode = item.code;
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
             console.log('xxxx');
            if (item.departname == this.form.applyOfficeName) {
              console.log("相同", item.departname)
              this.departmentTyoe = item.id;
              // this.form.applyOfficeName = item.departname;
              this.form.applyOfficeCode = item.orgCode;
              // 开始请求数据
              var params=new Object();
              params.id = item.id;
              this.$http.post(this.ip + '/xhhms/rest/interHospitalController/v1/getDoctorListByDepartid', params, {
                headers: {
                  'X-AUTH-TOKEN': this.token
                }
              }).then((res) => {
                var data = JSON.parse(res.data);
                if (!!data) {
                  console.log('申请医生数据',data.data);
                  // console.log(data);
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
        this.$http.post(this.ip + '/xhhms/rest/interHospitalController/v1/getHospitalList', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          if (!!data) {
            console.log(data);
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
        this.$http.post(this.ip + '/xhhms/rest/interMedicalDeviceTypeController/v1/getlist', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {

          var data = JSON.parse(res.data);
          if (!!data) {
            console.log(data);
            this.deviceList=data.data;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      getTemplatelList() {
        var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/intermedicaCheckTemplateController/v1/getlist', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {

          var data = JSON.parse(res.data);
          if (!!data) {
            console.log('模板');
            console.log('模板----',data);
            console.log('模板');
            this.templatelList=data.data;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      getMedicalList(){
        var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/interMedicalDeviceController/v1/getlist', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {

          var data = JSON.parse(res.data);
          if (!!data) {
            console.log('检查设备');
            console.log(data);
            this.medicalList=data.data;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      getChargeList(){
        var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/interMedicaChargeTypeController/v1/getlist', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {

          var data = JSON.parse(res.data);
          if (!!data) {
            console.log(data);
            this.chargeList=data.data;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      getCheckItemList(){
        var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/interMedicaCheckItemController/v1/getlist', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {

          var data = JSON.parse(res.data);
          if (!!data) {
            console.log('检查项目');
            console.log(data);
            console.log('检查项目');
            this.checkItemList=data.data;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      addBooking(){
        var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/interClinicalController/v1/add', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {

          var data = JSON.parse(res.data);
          if (!!data) {
            console.log(data);
            this.checkItemList=data.data;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      submitData : function (form) {
        this.showclass=true;
        this.form.medicaCheckTemplateId = this.form.template.id;
        this.form.medicaCheckTemplate = this.form.template.name;
        // this.form.modalityTypeName =this.form.modalityType.name;
        // this.form.modalityTypeCode = this.form.modalityType.code;
        // this.form.modalityName = this.form.modality.name;
        // this.form.modalityCode = this.form.modality.code;
        // this.form.payTypeName = this.form.payType.name;
        // this.form.payTypeCode = this.form.payType.code;
        // this.form.applyOfficeName  = this.form.applyOffice.departname;
        // this.form.applyOfficeCode = this.form.applyOffice.orgCode;
        console.log(this.form.birthDate);
        if (this.form.birthDate !==''){
          var date = new Date(this.form.birthDate);
          // var date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          this.form.birthDate = formatDate(date, 'yyyy-MM-dd');
          // this.form.birthDate = date_value;
          console.log(this.form.birthDate);
        }
        if (this.form.scheduledDatetime !== ''){
          var date = new Date(this.form.scheduledDatetime);
          // var date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          this.form.scheduledDatetime = formatDate(date, 'yyyy-MM-dd');
          console.log(this.form.scheduledDatetime);
        }
        // 清除
        // this.form.delete('template');
        delete this.form['template'];
        delete this.form['modality'];
        delete this.form['payType'];
        // console.log(this.form);
        // this.$emit('getformData', this.form);
      },
      getpayType: function () {
        console.log(this.form.payTypeName);
        this.chargeList.map(item=>{
          if(item.name === this.form.payTypeName){
            // this.form.payTypeName = item.name;
            this.form.payTypeCode = item.code;
            // console.log(this.form.payTypeName,this.form.payTypeCode);
          }
        })
      },
      // 添加模拟数据
      addTestData: function(){
        console.log('开始添加测试数据----------');
        var rand = "";
        for(var i = 0; i < 3; i++){
            var r = Math.floor(Math.random() * 10);
            rand += r;
        }
        this.form.patientNo = rand;
        this.form.name = Math.random().toString(36).substr(2);
        var sexList = ['男','女']
        var index = Math.floor((Math.random()*sexList.length)); 
        this.form.sex = sexList[index];
        this.form.age = Math.floor(Math.random()*(1 - 100) + 100);
        this.form.birthDate = 'Thu May 12 2017 08:00:00 GMT+0800 (中国标准时间)';
        this.form.phone = 13568347956;
        // var patientList = ['门诊','住院','急诊','体检']
        // var index = Math.floor((Math.random()*patientList.length)); 
        // this.form.patientType = patientList[index];
        // var hospitaltList = ['市第一人民医院','专家库']
        // var index = Math.floor((Math.random()*hospitaltList.length)); 
        // this.form.applyOffice = hospitaltList[index];
        var rand1 = "";
        for(var i = 0; i < 3; i++){
            var r = Math.floor(Math.random() * 10);
            rand1 += r;
        }
        this.form.bedNo = rand1;
        this.form.hisapplyno = rand1;
        this.form.cardOne = 6217003810004913706;
        this.form.price = rand1;
    },
    getPatientType: function(){
      // 获取病人类型
      console.log('开始获取病人类型数据');
        var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/interMedicalPatientTypeController/v1/getAll', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          console.log('病人类型数据----',data);
          if (data.list) {
            console.log(data.data);
            this.patientTypeList=data.list;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
    },
    changePatientNo: function(){
      // console.log('---------------');
      // console.log(e);
      let newValue = this.form.patientNo.replace(/[^0-9]/ig,"");
      console.log('dangqian---',newValue);
      return newValue;
    },
    changePhone: function(){
      let newValue = this.form.phone.replace(/[^0-9]/ig,"");
      console.log('dangqian---',newValue);
      return newValue;
    },
    changeHisapplyno:function(){
      let newValue = this.form.hisapplyno.replace(/[^0-9]/ig,"");
      console.log('dangqian---',newValue);
      return newValue;
    },
    changePrice:function(){
      let newValue = this.form.price.replace(/[^\-?\d.]/g,"");
      newValue  = newValue.replace(/^\./g,"");
      newValue = newValue.replace(/\.{2,}/g,"");
      newValue = newValue.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
      console.log('dangqian---',newValue);
       return newValue;
    },
    changeCard: function(){
      let newValue = this.form.cardOne.replace(/[^0-9]/ig,"");
      console.log('dangqian---',newValue);
      return newValue;
    },
    changeTemplate: function(){
      console.log('模板切换');
      this.templatelList.map(item=>{
        if(this.form.medicaCheckTemplate === item.name){
          this.form.medicaCheckTemplateId = item.id;
        }
      });
    }
    },
  }
</script>

<style scoped lang="stylus">
  @import '../../common/styleus/index.styl';

  .el-row {
    margin-top :10px;
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
    margin-top :4%;
  }

  .el-input {
    width: 80%;
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
</style>
