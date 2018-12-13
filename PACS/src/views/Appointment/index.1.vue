<template>
  <div id="cententBox">
    <div id="heard">
      <div id="left">
        <div class="nav">
          <appointmentNav ref="appointmentNav" :data1="data" v-on:getIndex="getIndex"/>
        </div>
        <div id="fenzhen" v-if="fenzhenShow">
          <div class="tabels">
          <Table 
            ref="Table"
            :list='Fenzhenlist'
            :columns='Fenzhencolumns'
            :pagination='Fenzhenpagination'
            :options='Fenzhenoptions'
            :otherHeight = 'otherHeight'
            @handleSelectionChange='handleSelectionChange'
            @handleRowClick='handleRowClick'
            ></Table>
          </div>
          <div class="pagination">
            <pagination :pageSize="Fenzhenpagination.pageSize"
            :currentPage = "Fenzhenpagination.currentPage"
            :total = "Fenzhenpagination.total " 
            @handleIndexChange = "handleIndexChange"
            @handleSizeChange = "handleSizeChange"
            ></pagination>
           </div>
        </div> 
        <div id="yuyue" v-if="yuyueShow">
          <div class="tabels">
          <Table 
            ref="Table"
            :list='yuyuelist'
            :columns='yuyuecolumns'
            :options='yuyueoptions'
            :otherHeight = 'otherHeight'
            @handleSelectionChange='handleSelectionChange'
            @handleRowClick='handleRowClick'
            ></Table>
          </div>
          <div class="pagination">
            <pagination :pageSize="yuyuepagination.pageSize"
            :currentPage = "yuyuepagination.currentPage"
            :total = "yuyuepagination.total " 
            @handleIndexChange = "handleIndexChange"
            @handleSizeChange = "handleSizeChange"
            ></pagination>
            </div>
        </div>
        <div id="Allyuyue" v-if="AllyuyueShow">
          <div class="tabels">
          <Table 
            ref="Table"
            :list='Allyuyuelist'
            :columns='Allyuyuecolumns'
            :options='Allyuyueoptions'
            :otherHeight = 'otherHeight'
            @handleSelectionChange='handleSelectionChange'
            @handleRowClick='handleRowClick'
            ></Table>
          </div>
          <div class="pagination">
            <pagination :pageSize="Allyuyuepagination.pageSize"
            :currentPage = "Allyuyuepagination.currentPage"
            :total = "Allyuyuepagination.total " 
            @handleIndexChange = "handleIndexChange"
            @handleSizeChange = "handleSizeChange"
            ></pagination>
            </div>
        </div>
      </div>
      <div id="Rcentent">
        <div class="input_div">
          <appointmentInput ref="formData"/>
        </div>
      <div class="rightBottom">
        <div class="numeral">
          <numeral ref="numPro"/>
        </div>
       <div class="btnsClass">
        <el-button class="btn" type="primary" size="medium" icon="el-icon-plus"  @click="submitData" title="新增和编辑，编辑需要选中一个病人">提交</el-button>
        <el-button class="btn" type="primary" size="medium" icon="el-icon-edit-outline"  @click="submitFenzhen" title="点击选中表格某一个病人后，再执行分诊操作">分诊</el-button>
        <el-button class="btn" type="primary"  size="medium" icon="el-icon-view"  @click="submitJiancha" title="点击选中表格某一个病人后，再执行检查操作">检查</el-button>
        <el-button class="btn" type="primary" size="medium" icon="el-icon-delete"  @click="emptyData(1)" title="编辑病人后，需要先执行清空操作，再新增数据" >清空</el-button>
        <span style="color:red;">{{errmsg}}</span>
       </div>
       </div> 
      </div>
    </div>
    <div id="bottom">
      <foot-nav :theIndex="1" :data="MainData"/>
    </div>
    <!--  分诊弹出框 -->
      <el-dialog
        title="分诊"
        :visible.sync="fenzhenVisable"
        width="50%">
        <div style="width:100%; height:100px;  overflow-y: auto;">
              <el-form  :model="form1"  label-width="80px" :show-message="false" >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="检查科室" :rules="[{ required: true, message: '检查设备不能为空'}]" :show-message="false">
                    <el-select v-model="form1.procedureOfficeName" placeholder="请先选择检查科室"  clearable class="el-input" @change="getMedicalList">
                        <el-option  :key="index" v-for="(item,index) in procedureOfficeList" :label="item.departname" :value="item.departname"></el-option>
                    </el-select>
                    </el-form-item>
                  </el-col>
                 <el-col :span="8">
                    <el-form-item label="检查设备" :rules="[{ required: true, message: '检查设备不能为空'}]" :show-message="false">
                      <el-select v-model="form1.modalityName" placeholder="请选择"  clearable class="el-input" >
                        <el-option  :key="index" v-for="(item,index) in medicalList" :label="item.name" :value="item.name"  v-if="item.deviceType === deviceType  || deviceType ==='0' "></el-option>
                      </el-select>
                    </el-form-item>
                 </el-col>
               </el-row>
              </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button  type="primary" @click="OkDialogfenzhen">确 定</el-button>
          </span>
      </el-dialog>
      
       <!--  分诊检查框 -->
      <el-dialog
        title="检查"
        :visible.sync="jianchaVisable"
        width="50%">
        <div style="width:100%; height:100px;  overflow-y: auto;">
              <el-form  :model="form1"  label-width="80px" :show-message="false" >
                <el-row>
                    <el-col :span="8">
                    <el-form-item label="曝光次数" :rules="[{ required: true, message: '曝光次数不能为空'}]" :show-message="false">
                     <el-input v-model="form1.exposureCount" @blur="form1.exposureCount=changeExposureCount()" placeholder="请输入" clearable class="el-input" ></el-input>
                    </el-form-item>
                 </el-col>
               </el-row>
              </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="OkDialoghjiancha">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>


<script>
// 私有组件
import appointmentNav from "./components/AppointmentNav.vue";
import appointmentInput from "./components/basicInfo.vue";
import numeral from "./components/numeral.vue";
import RightTables from "./components/BottomTables.vue";
//公共组件
import footNav from "./../components/FooterNav.vue";
import pagination from "./../components/table/Pagination.vue";
import Table from "./../components/table/Table.vue";
import selects from "./../components/Select.vue";
import { formatDate } from "../common/js/date";
import axios from "axios";
export default {
  components: {
    appointmentNav,
    appointmentInput,
    selects,
    numeral,
    pagination,
    Table,
    footNav,
    RightTables
  },
  beforeCreate: function() {
    document.getElementsByTagName("body")[0].style.overflowY = 'hidden';
  },
  beforeDestroy: function() {
    document.body.getElementsByTagName('body')[0].style.overflowY = '';
  },
  created() {
    this.getFenzhenList({});
    this.getYuyueList({});
    this.getAllYuyueList({});
    // this.getDeviceList();
    // this.getMedicalList();
    this.getProcedureOfficeList();
  },
  methods: {
    //设置行数
    handleSizeChange(val) {
     if (this.index === 0) {
        this.Fenzhenpagination.pageSize=val;
        this.requestData.size=val;
        this.getFenzhenList(this.requestData);
      } else if(index === 1) {
        this.yuyuepagination.pageSize=val;
        this.requestData.size=val;
        this.getYuyueList(this.requestData);
      }else{
        this.Allyuyuepagination.pageSize=val;
        this.requestData.size=val;
        this.getAllYuyueList(this.requestData);
      }
    },
    getFenzhenList: function(parmas) {
      this.$api.getFenzhenListApi(parmas).then(res => {
        var data = res;
        this.data[0]["number"] = data.total ? data.total : 0;
        this.Fenzhencolumns = data.table;
        this.Fenzhenlist = [];
        if (data.list) {
          this.Fenzhenlist = data.list;
          this.Fenzhenpagination.currentPage = data.page;
          this.Fenzhenpagination.total = data.total;
          //this.number1 = data.total? data.total: 0;
          this.$refs.appointmentNav.data1 = this.data;
          //this.$set(this.data[0]['number'], this.number1)
          // 替换 0 和 1  C 和 T  0=>男 1=>女  C->已检查  T->已分诊
          // sex
          this.Fenzhenlist.map(item => {
            if (item.sex == 0) {
              item.sex = "男";
            } else {
              item.sex = "女";
            }
            item.status = this.statusList[item.status];
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    getProcedureOfficeList() {
      this.$api.getProcedureOfficeListApi().then(res => {
          var data = res;
          if (!!data) {
            this.procedureOfficeList = data.data;
          } else {
            return false;
          }
        },err => {
          console.log(err);
        }
      );
    },
    // getDeviceList() {
    //   var params = new Object();
    //   this.$http
    //     .post(
    //       this.ip + "/xhhms/rest/interMedicalDeviceTypeController/v1/getlist",
    //       params,
    //       {
    //         headers: {
    //           "X-AUTH-TOKEN": this.token
    //         }
    //       }
    //     )
    //     .then(
    //       res => {
    //         var data = JSON.parse(res.data);
    //         if (!!data) {
    //           this.deviceList = data.data;
    //         } else {
    //           return false;
    //         }
    //       },
    //       err => {
    //         console.log(err);
    //       }
    //     );
    // },
    // focus() {
    //   this.form.modalityName = "";
    //   this.deviceList.map(item => {
    //     if (!!this.form1.modalityTypeName) {
    //       if (item.name == this.form1.modalityTypeName) {
    //         this.deviceType = item.code;
    //         this.form1.modalityTypeCode = item.code;
    //       }
    //     } else {
    //       }
    //   });
    //       this.deviceType = "0";
    // },
    getMedicalList() {
      var params = new Object();
      console.log('[*] 当前行的数据---',this.row);
      params.deviceType =  this.row.modalityTypeCode;
      // 获取检查科室code
      this.procedureOfficeList.map(item=>{
        if(this.form1.procedureOfficeName == item.departname) {
          params.sysOrgCode = item.orgCode;
        }
      })
      this.$api.getMedicalListApi(params).then(res => {
        var data = res;
        if (!!data) {
          this.medicalList = data.data;
        } else {
          return false;
        }
      },err => {
          console.log(err);
      });
    },
    getYuyueList: function(params) { 
      this.$api.getYuyueListApi(params).then(res => {
        var data = res;
        this.data[1]["number"] = data.total ? data.total : 0;
        this.yuyuecolumns = data.table;
        this.yuyuelist = [];
        if (data.list) {
          this.yuyuelist = data.list;
          this.yuyuepagination.currentPage = data.page;
          this.yuyuepagination.total = data.total;
          this.$refs.appointmentNav.data1 = this.data;
          this.yuyuelist.map(item => {
            if (item.sex == 0) {
              item.sex = "男";
            } else {
              item.sex = "女";
            }
            item.status = this.statusList[item.status];
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    getAllYuyueList: function(params) {
      this.$api.getAllYuyueListApi(params).then(res => {
        var data = res;
        this.data[2]["number"] = data.total ? data.total : 0;
        this.Allyuyuecolumns = data.table;
        this.Allyuyuelist = [];
        if (data.list) {
          this.Allyuyuelist = data.list;
          this.Allyuyuepagination.currentPage = data.page;
          this.Allyuyuepagination.total = data.total;
          this.$refs.appointmentNav.data1 = this.data;
          this.Allyuyuelist.map(item => {
            if (item.sex == 0) {
              item.sex = "男";
            } else {
              item.sex = "女";
            }
            item.status = this.statusList[item.status];
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    // getDevice: function() {
    //   var parmas = new Object();
    //   this.$http
    //     .post(
    //       this.ip + "/xhhms/rest/interMedicalDeviceTypeController/v1/getlist",
    //       parmas,
    //       {
    //         headers: { "X-AUTH-TOKEN": this.token }
    //       }
    //     )
    //     .then(res => {
    //       var data = JSON.parse(res.data);
    //       if (data.status == 1 && data.data) {
    //         this.device = data.data;
    //       } else {
    //         return false;
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // 切换页码
    handleIndexChange(pagination) {
      if (this.index === 0) {
        this.requestData.page = pagination;
        this.getFenzhenList(this.requestData);
      } else if(this.index === 1) {
        this.requestData.page = pagination;
        this.getYuyueList(this.requestData);
      }else{
         this.requestData.page = pagination;
        this.getAllYuyueList(this.requestData);
      }
    },

    // 选中行
    handleSelectionChange(val) {
      console.log("val:", val);
    },
    // 点击行
    handleRowClick(val) {
      console.log("当前行的数据", val);
      this.row = val;
      this.$refs.formData.form.patientNo = val.patientNo ? val.patientNo : "";
      this.$refs.formData.form.patientId = val.patientId ? val.patientId : "";
      this.$refs.formData.form.name = val.name ? val.name : "";
      // console.log('当前的性别',val.sex);
      this.$refs.formData.form.sex = val.sex ? val.sex : "";
      this.$refs.formData.form.age = val.age ? val.age : "";
      this.$refs.formData.form.birthDate = val.birthDate ? val.birthDate : "";
      this.$refs.formData.form.phone = val.phone ? val.phone : "";
      this.$refs.formData.form.scheduledDatetime = val.scheduledDatetime
        ? val.scheduledDatetime
        : "";
      this.$refs.formData.form.patientType = val.patientType
        ? val.patientType
        : "";
      if(val.patientType !=''){
        this.$refs.formData.numberName = val.patientType+'号';
      }
      this.$refs.formData.form.applyOfficeName = val.applyOfficeName
        ? val.applyOfficeName
        : "";
      this.$refs.formData.form.applyOfficeCode = val.applyOfficeCode
        ? val.applyOfficeCode
        : "";   
      this.$refs.formData.form.applyDoctor = val.applyDoctor
        ? val.applyDoctor
        : "";
      this.$refs.formData.form.bedNo = val.bedNo ? val.bedNo : "";
      this.$refs.formData.form.accessionNo = val.accessionNo
        ? val.accessionNo
        : "";
      this.$refs.formData.form.modalityTypeName = val.modalityTypeName
        ? val.modalityTypeName
        : "";
      this.$refs.formData.form.modalityTypeCode = val.modalityTypeCode
      ? val.modalityTypeCode
      : "";
      this.$refs.formData.form.id = val.id ? val.id : "";
      this.$refs.formData.form.clinicalDiagnosis = val.clinicalDiagnosis? val.clinicalDiagnosis : '' ;  // 赋值主要描述
      this.$refs.formData.form.ageUnit = val.ageUnit? val.ageUnit : '' ;
      if(val.hasOwnProperty('checkItemIds')){
        this.$refs.formData.form.checkItemIds = val.checkItemIds =='' ? []: val.checkItemIds.split(',');
      }
      this.status = val.status;
    },
    getIndex: function(val) {
      this.emptyData(0);
      this.index = val;
    },
    getformData: function(val) {
      var params = new Object();
      params = val;
      if (params.name === "") {
        this.$message({
          showClose: true,
          message: "请填写病人姓名",
          type: "error"
        });
        return false;
      }
      if (params.sex === "") {
        this.$message({
          showClose: true,
          message: "请填写病人性别",
          type: "error"
        });
        return false;
      }
      if (params.age === "") {
        this.$message({
          showClose: true,
          message: "请填写病人年龄",
          type: "error"
        });
        return false;
      }

      if (params.ageUnit === "") {
        this.$message({
          showClose: true,
          message: "请选择病人年龄类型",
          type: "error"
        });
        return false;
      }

      if (params.birthDate === "") {
        this.$message({
          showClose: true,
          message: "请填写病人出生日期",
          type: "error"
        });
        return false;
      }

      if (params.patientType === "") {
        this.$message({
          showClose: true,
          message: "请填写病人类型",
          type: "error"
        });
        return false;
      }
      if (params.patientNo === "") {
        this.$message({
          showClose: true,
          message: "请填写"+params.patientType+'号',
          type: "error"
        });
        return false;
      }

      // if (params.hisapplyno === "") {
      //   this.$message({
      //     showClose: true,
      //     message: "请填写申请单号",
      //     type: "error"
      //   });
      //   return false;
      // }
      
      if (params.checkItemIds.length == 0) {
        this.$message({
          showClose: true,
          message: "请填写检查项目",
          type: "error"
        });
        return false;
      }

      if (params.modalityTypeCode == '') {
        this.$message({
          showClose: true,
          message: "请填写设备类型",
          type: "error"
        });
        return false;
      }
      // 开始添加数据
      this.$api.AddYuyueDataApi(params).then(res => {
        var data = res;
        // 检查项目和设备类型存储在本地
        localStorage.setItem('checkItemIds', params.checkItemIds)
        localStorage.setItem('modalityTypeName', params.modalityTypeName)
        localStorage.setItem('modalityTypeCode', params.modalityTypeCode)
        this.$message.success('操作成功');
        // 重新刷新页面
        // 请求
        this.$refs.numPro.getTodyDates();
        this.emptyData(0);

        let checkItemIds = localStorage.getItem('checkItemIds')
        let modalityTypeName = localStorage.getItem('modalityTypeName')
        let modalityTypeCode = localStorage.getItem('modalityTypeCode')
        this.$refs.formData.form.modalityTypeName = modalityTypeName || ''
        this.$refs.formData.form.modalityTypeCode = modalityTypeCode || ''
        this.$refs.formData.form.checkItemIds = checkItemIds.split(',') || []
        this.getFenzhenList({});
        this.getYuyueList({});
        this.getAllYuyueList({});
      })
      .catch(err => {
        console.log(err);
      });
    },
    submitData: function() {
      console.log(this.$refs.formData.form);
      var form = {};
      form.id = this.$refs.formData.form.id;
      form.patientId = this.$refs.formData.form.patientId;
      form.patientNo = this.$refs.formData.form.patientNo;
      form.name      = this.$refs.formData.form.name;
      form.sex       = this.$refs.formData.form.sex;
      form.age       = this.$refs.formData.form.age;
      form.ageUnit   = this.$refs.formData.form.ageUnit;
      form.phone     = this.$refs.formData.form.phone;
      form.bedNo     = this.$refs.formData.form.bedNo;
      form.patientType = this.$refs.formData.form.patientType;
      form.applyOfficeName= this.$refs.formData.form.applyOfficeName;
      form.applyOfficeCode= this.$refs.formData.form.applyOfficeCode;
      form.applyDoctor    = this.$refs.formData.form.applyDoctor;
      form.accessionNo    = this.$refs.formData.form.accessionNo;
      form.modalityTypeName = this.$refs.formData.form.modalityTypeName;
      form.modalityTypeCode = this.$refs.formData.form.modalityTypeCode;
      form.clinicalDiagnosis= this.$refs.formData.form.clinicalDiagnosis;
      if (this.$refs.formData.form.birthDate !== "") {
        var date = new Date(this.$refs.formData.form.birthDate);
        form.birthDate = formatDate(date, "yyyy-MM-dd");
      }
      if (this.$refs.formData.form.scheduledDatetime !== "") {
        var date = new Date(this.$refs.formData.form.scheduledDatetime);
        form.scheduledDatetime = formatDate(date, "yyyy-MM-dd");
        var date = new Date(form.scheduledDatetime);
        // 有三种方式获取
        var time1 = date.getTime();
        let timestamp = new Date(new Date().toLocaleDateString()).getTime()
        if( time1 < timestamp){
        this.$message({
          showClose:true,
          message: '不能选择小于今天的日期！！',
          type:'error',
        });
        return false;
      }
      }
      if(this.$refs.formData.form.checkItemIds.length > 1){
        form.checkItemIds = this.$refs.formData.form.checkItemIds.join();
      }else{
        form.checkItemIds = this.$refs.formData.form.checkItemIds[0] ? this.$refs.formData.form.checkItemIds[0] : [];
      }
      this.errmsg = "";
      console.log('提交的数据---',form);
      this.getformData(form);
    },
    emptyData: function(type) {
      // 清空表单数据
      console.log("开始清空表单数据");
      this.$refs.formData.form.patientNo = ""; // 清空用户编号
      this.$refs.formData.form.patientId = ""; // 清空用户编号
      //this.$refs.formData.form.cardOne = ""; // 卡号1
      this.$refs.formData.form.name = ""; // 姓名
      this.$refs.formData.form.sex = ""; // 性别
      this.$refs.formData.form.age = ""; // 年龄
      this.$refs.formData.form.ageUnit = ""; // 年龄类型
      this.$refs.formData.form.birthDate = ""; // 出生日期
      this.$refs.formData.form.phone = ""; //电话
      // this.$refs.formData.form.patientType = ""; //病人类型
      this.$refs.formData.form.scheduledDatetime = ""; //预约时间
      //this.$refs.formData.form.applyOffice = ""; // 申请科室
      this.$refs.formData.form.applyOfficeName = ""; //申请科室name
      this.$refs.formData.form.applyOfficeCode = ""; // 申请科室code
      this.$refs.formData.form.applyDoctor = ""; // 申请医生
      this.$refs.formData.form.bedNo = ""; //床号
      this.$refs.formData.form.accessionNo = ""; //检查号
      this.$refs.formData.form.modalityTypeName = ""; // 设备类型
      this.$refs.formData.form.modalityTypeCode = ""; // 设备类型编码
      this.$refs.formData.form.checkItemIds = []; // 检查项目,
      this.$refs.formData.form.clinicalDiagnosis = ''; //清空主述
      this.$refs.formData.form.id = "";
      if(type !=0){
        this.$message({
          showClose: true,
          message: "数据已经清空",
          type: "success"
        });
      }
      
    },
    submitFenzhen: function() {
      if (this.$refs.formData.form.id === "") {
        this.$message({
          showClose: true,
          message: "请选择某个病人！！",
          type: "error"
        });
      } else {
        // 先判断当前选择病人是否是已预约
        if (this.status !== "已预约") {
          this.$message({
            showClose: true,
            message: "请选择预约列表的病人!!",
            type: "warning"
          });
        } else {
          this.fenzhenVisable = true;
          //this.getMedicalList();  // 获取设备列表的数据，根据设备类型获取
        }
      }
    },
    submitJiancha: function() {
      if (this.$refs.formData.form.id === "") {
        this.$message({
          showClose: true,
          message: "请选择某个病人！！",
          type: "error"
        });
      } else {
        //先判断当前选择病人是否是已分诊
        if (this.status !== "已分诊") {
          this.$message({
            showClose: true,
            message: "请选择分诊列表的病人!!",
            type: "error"
          });
        } else {
          this.jianchaVisable = true;
        }
      }
    },
    OkDialoghjiancha: function() {
      this.jianchaVisable = false;
      // 开始修改检查状态
      var params = new Object();
      params.id = this.$refs.formData.form.id;
      params.accessionNo = this.form1.accessionNo;
      params.exposureCount = this.form1.exposureCount;
      this.$api.DoCheckApi(params).then(res => {
        var data = res;
        this.getFenzhenList({});
        this.getYuyueList({});
        this.getAllYuyueList({});
        this.emptyData(0);
        this.emptyFomr1();  // 清空表单
      })
      .catch(err => {
        console.log(err);
      });
    },
    OkDialogfenzhen: function() {
      this.fenzhenVisable = false;
      console.log(this.form1);
      let mppsInstanceUid = '';
      this.medicalList.map(item => {
        if (item.name === this.form1.modalityName) {
          this.form1.modalityCode = item.code;
          mppsInstanceUid = item.id;
        }
      });
      this.procedureOfficeList.map(item => {
        if (item.departname === this.form1.procedureOfficeName) {
          this.form1.procedureOfficeCode = item.orgCode;
        }
      });
      //修改状态
      var params = new Object();
      params.id = this.$refs.formData.form.id;
      params.mppsInstanceUid = mppsInstanceUid;
      params.modalityName = this.form1.modalityName;
      // params.modalityTypeName = this.form1.modalityTypeName;
      // params.modalityTypeCode = this.form1.modalityTypeCode;
      params.modalityCode = this.form1.modalityCode;
      params.procedureOfficeName = this.form1.procedureOfficeName;
      params.procedureOfficeCode = this.form1.procedureOfficeCode;
      //判断当前时间   是否小于预约时间
      let timestamp = Date.parse(new Date());
      if( this.$refs.formData.form.scheduledDatetime > timestamp ){
        this.$message({
          showClose:true,
          message: '预约时间大于今日的病人不能进行分诊！！',
          type:'error',
        });
        return false;
      }
      console.log('分诊参数',params);
      // return false;
      this.$api.DoFenzhenApi(params).then(res => {
        var data = res;
        this.$refs.numPro.getTodyDates();
        this.getFenzhenList({});
        this.getYuyueList({});
        this.getAllYuyueList({});
        this.emptyData(0);
        this.emptyFomr1();  // 清空表单
        this.medicalList = [];  // 清空检查设备的数据
      })
      .catch(err => {
        console.log(err);
      });
    },
    emptyFomr1:function(){
      // 清空弹出框的所有数据
      this.form1.modalityTypeName = " ";
      this.form1.modalityTypeCode = "";
      this.form1.modalityName = "";
      this.form1.modalityCode = "";
      this.form1.procedureOfficeName = "";
      this.form1.procedureOfficeCode = "";
      this.form1.accessionNo = "";
      this.form1.exposureCount = "";
    },
    changeAccessionNo: function(){
      let newValue = this.form1.accessionNo.replace(/[^0-9]/ig,"");
      return newValue;
    },
    changeExposureCount: function(){
      let newValue = this.form1.exposureCount.replace(/[^0-9]/ig,"");
      return newValue;
    }
  },
  watch: {
    index: function(val, oldval) {
      if (val === 0) {
          (this.yuyueShow = false);
          (this.AllyuyueShow = false);
          (this.fenzhenShow = true);
          this.getFenzhenList({});
      } else if(val===1) {
          (this.fenzhenShow = false);
          (this.AllyuyueShow = false);
          (this.yuyueShow = true);
          this.getYuyueList({});
      }else{
          (this.yuyueShow = false),
          (this.fenzhenShow = false),
          (this.AllyuyueShow = true);
          this.getAllYuyueList({});
      }
    }
  },
  data() {
    return {
      errmsg: "",
      msg: "",
      otherHeight: 150,
      form: [],
      row: [],
      data: [
        { text: "分诊列表", number: 0, active: true },
        { text: "今日预约", number: 0, active: false },
        { text: "预约列表", number: 0, active: false }
      ],
      index: 0, // 默认的请求类型
      // ip: this.CONSTANT.CONSTANT.WEB_URL,
      // token: localStorage.getItem("token"),
      Fenzhenlist: [],
      Fenzhencolumns: [],
      requestData: {
        page: 0,
        size: 10
      },
      Fenzhenpagination: {
        total: 0,
        currentPage: 0,
        pageSize: 10
      },
      Fenzhenoptions: {
        mutiSelect: false
      },
      yuyuelist: [],
      yuyuecolumns: [],
      yuyuepagination: {
        total: 0,
        currentPage: 0,
        pageSize: 10
      },
      Allyuyuelist:[],
      Allyuyuecolumns: [],
      Allyuyuepagination: {
        total: 0,
        currentPage: 0,
        pageSize: 10
      },
      yuyueoptions: {
        mutiSelect: false
      },
      Allyuyueoptions: {
        mutiSelect: false
      },
      fenzhenShow: true,
      yuyueShow: false,
      AllyuyueShow:false,
      tbodyData: [],
      theadData: [],
      device: [],
      MainData: JSON.parse(localStorage.getItem("nume")),
      fenzhenVisable: false,
      jianchaVisable: false,
      statusList: {
        F: "已归档",
        E: "上级撤销",
        V: "已复审",
        R: "已诊断",
        D: "草稿",
        C: "已检查",
        I: "检查中",
        T: "已分诊",
        S: "已预约",
        A: "已审核"
      },
      // deviceList: [],
      medicalList: [],
      procedureOfficeList: [],
      form1: {
        modalityTypeName: "",
        modalityTypeCode: "",
        modalityName: "",
        modalityCode: "",
        procedureOfficeName: "",
        procedureOfficeCode: "",
        accessionNo: "",
        exposureCount: "",
        status: ""
      },
      deviceType: "0"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
body{
  overflow-y: hidden !important;
}
#cententBox {
  width: 100%;
  min-width:1500px;
  height: 100vh;
  background-color: #D4D4D4;
  overflow-y: hiddden;
  display: flex;
  flex-direction: column;
  min-height:730px;
}

#heard {
  width: 100%;
  overflow: hidden;
  flex: 1;
}

#bottom {
  width: 100%;
  height: 60px;
  background-color: $bgGray;
  position: fixed;
  bottom: 0px;
  left: 0px;
}

#left {
  width: 36%;
  heiht: 100%;
  float: left;
  overflow: hidden;
  box-sizing: border-box;
}

#Rcentent {
  width: 64%;
  height: 100%;
  float: right;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.tabels {
  width: 90%;
  height: calc(100vh - 150px);
  margin: 0 auto;
  background-color :#e2e0e0;
}

.pagination {
    width: 90%;
    height: 36px;
    text-align: center;
    background-color :#e2e0e0;
    margin: 0 auto;
  }
  .content-bottom {
    height: 280px;
    width: 100%;
  }
  ul {
  width: 100%;
  overflow: hidden;
}

.base-table .el-table {
  width: 616px !important;
  height: 95%;
}

.tabel table td {
  width: 20%;
}

.tabel table tn {
  width: 20%;
}

.nav {
  width: 90%;
  margin: 0 auto;
  height: 30px;
}

.input_div {
  width: 100%;
  margin-top: 10px;
  flex: 1;
}

.numeral {
  width: 97%;
  height: 160px;
}

.centent_tables {
  margin-top: 10px;
  height: 260px;
  width: 98%;
}

.page {
  width: 80%;
  margin: 20px auto;
}

.bottom_input_div {
  width: 60%;
  margin: 40px;
  float: left;
}

.bottom_input_div button {
  width: 15%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-left: 100px;
  border: 1px solid #8c939d;
  border-radius: 4px;
}

.select1 {
  width: 40%;
  margin-left: 10px;
  float: left;
  height: 32px;
}

.el-select {
  height: 32px !important;
}

.left_bottom_input_div {
  margin: 10px 0px;
  height: 40px;
}

.left_bottom_input_div button {
  width: 20%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 4px 10px;
  border: 1px solid #8c939d;
  border-radius: 4px;
}

.bottom_input_div_input {
  width: 20%;
  float: right;
  margin-top: 32px;
  position: relative;
}

.bottom_input_div_input .checkbox {
  position: absolute;
  top: 20px;
  left: 40px;
  width: 18px;
  height: 18px;
}

.el-table--scrollable-x .el-table__body-wrapper {
  overflow: scroll;
}

.rightBottom{
  width: 100%;
  height:310px;
  align-self:flex-end;
  margin-top:10px;
}

.btnsClass {
  width: 96%;
  height: 30px;
}
.btn {
  text-align: center;
  margin: 0px 1%;
  border-radius: 4px;
  float: right;
}
</style>
