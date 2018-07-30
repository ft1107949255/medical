<template>
  <div id="container">
    <header id="header">
      <!-- <headerNav   @selectSort="clickSort" :state="state"/> -->
      <ul>
        <li :key="index" v-for="(item,index) in navList" @click="selectSort(index)">
          <img :src=item.img :alt="item.alt" :title="item.alt">
        </li>
      </ul>
    </header>
    <div id="content">
      <div id="left" v-if="isHidden">
        <leftSearch  v-on:searchParams="search" ref="leftSearch"/>
      </div>
      <div id="main">
        <centent ref="centent" :state="state" :nav-list1 = "navList1" @statusClick="onStatus" @getIndex ="getindex"
                 @handleRow="handleRow"
                 @handledblRow="handledblRow"
                 @handleIndexChange="handleIndexChange"
                 @handleSizeChange="handleSizeChange"
        />
      </div>
    </div>
    <footer id="footer">
      <foot-nav :theIndex="3" :data="MainData"/>
    </footer>
  </div>
</template>

<script>
import headerNav from "./../components/Nav.vue";
import leftSearch from "./../components/LeftSearch.vue";
import centent from "./../components/consultationCentent.vue";
import footNav from "./../components/FooterNav.vue";
// import appointmentInput from "./../components/basicInfo.vue";
import {formatDate} from "../common/js/date";
// import patient from "./../components/Patientdetails.vue";
export default {
  components: {
    headerNav,
    leftSearch,
    centent,
    footNav,
  },
  data() {
    return {
      isHidden: true,
      ip: this.CONSTANT.CONSTANT.WEB_URL,
      token: localStorage.getItem('token'),
      MainData:JSON.parse(localStorage.getItem('nume')),
      statues: '',
      dialogVisible: false,
      dialogDoubleVisible: false,
      form:[],
      row:[],
      doubelRow:[],
      state: {
        hospitalList: [],
        hospitalColums: [],
        hospitalTotal: 10,
        hospitalPage: 1,
      },
      ParamsList: {},
      statusList: {
        F: '已归档',
        E: '上级撤销',
        V: '已复审',
        R: '已诊断',
        D: '草稿',
        C: '已检查',
        I: '检查中',
        T: '已分诊',
        S: '已预约',
        A: '已审核',
      },
      detailed:[],
      navList:[
        {
          img: require("../../static/images/1.png"),
          alt:'收缩',
        },
        {
          img: require("../../static/images/refresh.png"),
          alt:'刷新',
        },
        {
          img: require("../../static/images/material.png"),
          alt:'选择病人进入编辑页面',
        },
        // {
        //   img: require("../../static/images/consultation.png"),
        //   alt:'会诊报告',
        // },
        {
          img: require("../../static/images/exl.png"),
          alt:'导出excel',
        },
      ],
      navList1:[
        {text:'我参加会诊',active:true,status:'',num:0},
        {text:'我申请的会诊',active:false,status:'',num:0},
      ],
      navIndex:0,
      jiaopianList:{
        'N':'未打印',
        'P':'已打印',
        'S':'已发送',
        'O':'已预订',
      }
    }
  },
  created() {
      this.getMyApplyList({});
      this.getPatientCheckList({});
  },
  methods: {
    focus(){
        console.log("进来了");
          this.dialogVisible = true;
      },
    handleClose(done) {
        done();
    },
    closeDialog(){

    },
    handledblRow(row){
      this.doubelRow=row;
      this.dialogDoubleVisible =true;
    },
    handleIndexChange(val) {
      this.ParamsList.page = val;
      if(this.navIndex===0){
          this.getPatientCheckList(this.ParamsList);
        }else{
          this.getMyApplyList(this.ParamsList);
     }
    },
    handleSizeChange(val) {
      this.ParamsList.size = val;
      if(this.navIndex===0){
          this.getPatientCheckList(this.ParamsList);
        }else{
          this.getMyApplyList(this.ParamsList);
     }
    },
    handleRow(row){
      this.row=row;
      this.detailed=[{
        name: '病人ID',
        content: row.patientNo
      },{
        name: '医疗机构',
        content: row.locationName
      },{
        name: '姓名',
        content: row.name
      },{
        name: '性别',
        content: row.sex
      },{
        name: '年龄',
        content: row.age
      },{
        name: '联系电话',
        content: row.phone
      },{
        name: '出生日期',
        content: row.birthDate
      },{
        name: '身份证',
        content: row.Idcard
      },{
        name: '家庭住址',
        content: row.address
      },{
        name: '工作单位',
        content: row.work
      },{
        name: '身高cm',
        content: row.patientHeight
      },{
        name: '体重kg',
        content: row.patientWeight
      },{
        name: '检查号',
        content: row.accessionNo
      },{
        name: '床号',
        content: row.bedNo
      },{
        name: '病人类型',
        content: row.patientType
      },{
        name: '费用类型',
        content: row.payTypeName
      },{
        name: '申请医生',
        content: row.applyDoctor
      },{
        name: '临床症状',
        content: row.clinicalSymptom
      },{
        name: '临床诊断',
        content: row.clinicalDiagnosis
      },{
        name: '检查要求',
        content: row.procedureRequirement
      },{
        name: '申请科室',
        content: row.applyOfficeName
      },{
        name: '设备类型',
        content: row.modalityTypeName
      },{
        name: '设备名称',
        content: row.modalityName
      },{
        name: '检查医生',
        content: row.procedureDoctor
      },{
        预约时间:'预约时间',
        content: row.scheduledDatetime
      },{
        name: '到达时间',
        content: row.arrivedDatetime
      },{
        name: '状态',
        content: row.status
      },{
        name: '检查费用',
        content: row.price
      },{
        name: '打印胶片状态',
        content: row.isImagePrinted
      },{
        name: '曝光次数',
        content: row.exposureCount
      },{
        name: '是否匹配',
        content: row.isMatched
      },{
        name: '检查科室',
        content: row.procedureOfficeName
      },{
        name: '检查房间',
        content: row.procedureRoom
      },{
        name: '远程状态',
        content: row.remoteStatus
      },{
        name: '远程失败说明',
        content: row.remoteFailureReason
      },{
        name: '影像描述',
        content: row.imageDescribe
      },{
        name: '影像诊断',
        content: row.conclusion
      },{
        name: '报告时间',
        content: row.reportDatetime
      },{
        name: '报告医生',
        content: row.reportDoctor
      },{
        name: '审核时间',
        content: row.auditDatetime
      },{
        name: '审核医生',
        content: row.auditDoctor
      },{
        name: '图像张数',
        content: row.imgCount
      },{
        name: '造影剂',
        content: row.contrastAgent
      },{
        name: '造影剂量',
        content: row.contrastDose
      },{
        name: '摄影方向',
        content: row.directionPhotography
      },{
        name: '摄影体位',
        content: row.photographicPosition
      }]
    },
    search(item){
      console.log('search',item)
      this.ParamsList=item;
      this.$refs.centent.paramsList = this.ParamsList;
      this.getDataList(item);
    },
    getDataList(item){
    console.log('item',item)
      var params = {};
      if(item !=null){
        params=item;
      }
     if(this.statues){
        params.status=this.statues;
     }else{
        delete params['status'];
     }
     // console.log(111);
     if(this.navIndex == 0){
      this.getPatientCheckList(params);
     }else{
       this.getMyApplyList(params);
     }
     
    },
    getPatientCheckList(params) {
      console.log('正在查询我的参加会诊');
      console.log('params',params)
       this.$http.post(this.ip + '/xhhms/rest/interMedicalConsultationDetailController/v1/findByUserId', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log(data)
            this.navList1[0].num = data.total;
            console.log(this.navList1);
            if(data.list){
                data.list.map(item=>{
                  console.log(item.sex);
                  if(item.sex == 0){
                    item.sex = '男'
                  }else {
                    item.sex = '女'
                  }
                  if(item.remoteStatus == 1){
                      item.remoteStatus='从下级到中心';
                  }else if(item.remoteStatus == 2){
                      item.remoteStatus='从中心到下级';
                  }
                  if(typeof(item.scheduledDatetime) == "undefined"){
                   
                    item.scheduledDatetime ='';
                  }
                  // console.log(item.auditDatetime);
                   if(typeof(item.auditDatetime) == "undefined"){
                      //console.log(111);
                    item.auditDatetime='';
                  }
                   if(typeof(item.arrivedDatetime) == "undefined"){
                      //console.log(111);
                    item.arrivedDatetime='';
                   }
                  if(item.arrivedDatetime !=''){
                      //console.log(111);
                    var date = new Date(item.arrivedDatetime);
                    item.arrivedDatetime = formatDate(date, "yyyy-MM-dd ");
                   }
                  if(item.scheduledDatetime !=''){
                    var date = new Date(item.scheduledDatetime);
                    item.scheduledDatetime = formatDate(date, "yyyy-MM-dd ");
                  }
                  if(item.auditDatetime !=''){
                    var date1 = new Date(item.auditDatetime);
                    item.auditDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.startTime) == "undefined"){
                      //console.log(111);
                    item.startTime='';
                   }
                  if(item.startTime !=''){
                    var date1 = new Date(item.startTime);
                    item.startTime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.endTime) == "undefined"){
                      //console.log(111);
                    item.endTime='';
                   }
                  if(item.endTime !=''){
                    var date1 = new Date(item.endTime);
                    item.endTime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.verifyDatetime) == "undefined"){
                      //console.log(111);
                    item.verifyDatetime='';
                   }
                  if(item.verifyDatetime !=''){
                    var date1 = new Date(item.verifyDatetime);
                    item.verifyDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.printDatetime) == "undefined"){
                      //console.log(111);
                    item.printDatetime='';
                   }
                  if(item.printDatetime !=''){
                    var date1 = new Date(item.printDatetime);
                    item.printDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.rejectDatetime) == "undefined"){
                      //console.log(111);
                    item.rejectDatetime='';
                   }
                  if(item.rejectDatetime !=''){
                    var date1 = new Date(item.rejectDatetime);
                    item.rejectDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.remarkDatetime) == "undefined"){
                      //console.log(111);
                    item.remarkDatetime='';
                   }
                  if(item.remarkDatetime !=''){
                    var date1 = new Date(item.remarkDatetime);
                    item.remarkDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  item.isImagePrinted = this.jiaopianList[item.isImagePrinted]
                  item.status = this.statusList[item.status];
                })
            }
            this.row = [];//清空数据
            this.state.hospitalList =data.list;
            this.state.hospitalColums = data.table;
            this.state.hospitalTotal = data.total;
            this.state.hospitalPage = data.page;
          } else {
            return false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      onStatus(str){
        this.statues=str;
        console.log('this.ParamsList',this.ParamsList)
        this.getDataList(this.ParamsList);
     },
     reportimage(params){
       console.log('经来了')
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/reportimage', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log('成功')
            console.log(data)
            this.$message({
              message: '上报影像成功',
              type: 'success'
            });
           this.getDataList(this.ParamsList);
          } else {
             console.log('失败')
             this.$message({
              message: '上报影像失败',
              type: 'error'
            });
            return false;
          }
        }).catch(err => {
          console.log(err);
           this.$message({
              message: '上报影像失败',
              type: 'error'
            });
        });
     },
     selectSort: function(index){
       console.log(index);
       if(index ==0){
          this.isHidden=!this.isHidden;
       }else if(index==1){
         // 刷新页面
         console.log('刷新页面');
         if(this.navIndex===0){
           this.getPatientCheckList(this.ParamsList);
           this.getMyApplyList(this.ParamsList);
         }else{
           this.getMyApplyList(this.ParamsList);
           this.getPatientCheckList(this.ParamsList);
           }
         this.$message({
          showClose: true,
          message: '刷新成功',
          type: 'success',
         });
       }else if(index==2){
        // 编辑页面
        console.log('进入编辑页面')
        if(this.row.consultationid){
          // 开始跳转到某个页面
          console.log('row---',this.row);
          this.$router.push({path: '/consultationedit', query: {consultationid:this.row.consultationid,type:this.row.dataType,patientid:this.row.id}})
        }else{
          // 缺少病人
          this.$message({
              showClose: true,
              message: '请选择一个病人！！',
              type: 'warning'
          });
        }
        
       }else if(index==3){
           console.log('导出excel');
          console.log('参数--',this.ParamsList);
          // excel导出函数
          // 导出会诊列表信息的数据
          this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/exportXls',this.ParamsList,
            { headers: { 'X-AUTH-TOKEN': this.token }, responseType: 'arraybuffer'}
          ).then((res) => {
            console.log(res.data);
            let blob = new Blob([res.data], {type:"application/vnd.ms-excel"});
            const fileName = '会诊信息.xls';
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
            // let objectUrl = URL.createObjectURL(blob);
            // window.location.href= objectUrl;
          }).catch(err => {
            console.log(err);
          });

       }else if(index==4){
         
       }else{
         console.log('~不知道你点的哪里');
       }
     },
     getindex: function(val){
        console.log('当前序号----',val);
        this.navIndex =val;
        if(val===0){
          this.getPatientCheckList(this.ParamsList);
        }else{
          this.getMyApplyList({});
        }
     },
     getMyApplyList: function(params){
       // 查询我申请的会诊
      // 开始查询
      var params = new Object();
       console.log('正在查询我的申请会诊');
       this.$http.post(this.ip + '/xhhms/rest/interMedicalConsultationApplyController/v1/findByMyApply', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
          var data = JSON.parse(res.data);
          console.log('我申请的会诊---',data);
          if (data.status == 1) {
              console.log('我的申请会诊---',data)
              this.navList1[1].num = data.total;
              this.state.hospitalColums = data.table;
              if(data.list){
                  data.list.map(item=>{
                    console.log(item.sex);
                    if(item.sex == 0){
                      item.sex = '男'
                    }else {
                      item.sex = '女'
                    }
                    if(item.remoteStatus == 1){
                      item.remoteStatus='从下级到中心';
                  }else if(item.remoteStatus == 2){
                      item.remoteStatus='从中心到下级';
                  }
                  if(typeof(item.scheduledDatetime) == "undefined"){
                   
                    item.scheduledDatetime ='';
                  }
                  // console.log(item.auditDatetime);
                   if(typeof(item.auditDatetime) == "undefined"){
                      //console.log(111);
                    item.auditDatetime='';
                  }
                   if(typeof(item.arrivedDatetime) == "undefined"){
                      //console.log(111);
                    item.arrivedDatetime='';
                   }
                  if(item.arrivedDatetime !=''){
                      //console.log(111);
                    var date = new Date(item.arrivedDatetime);
                    item.arrivedDatetime = formatDate(date, "yyyy-MM-dd ");
                   }
                  if(item.scheduledDatetime !=''){
                    var date = new Date(item.scheduledDatetime);
                    item.scheduledDatetime = formatDate(date, "yyyy-MM-dd ");
                  }
                  if(item.auditDatetime !=''){
                    var date1 = new Date(item.auditDatetime);
                    item.auditDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.startTime) == "undefined"){
                      //console.log(111);
                    item.startTime='';
                   }
                  if(item.startTime !=''){
                    var date1 = new Date(item.startTime);
                    item.startTime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.endTime) == "undefined"){
                      //console.log(111);
                    item.endTime='';
                   }
                  if(item.endTime !=''){
                    var date1 = new Date(item.endTime);
                    item.endTime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.verifyDatetime) == "undefined"){
                      //console.log(111);
                    item.verifyDatetime='';
                   }
                  if(item.verifyDatetime !=''){
                    var date1 = new Date(item.verifyDatetime);
                    item.verifyDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.printDatetime) == "undefined"){
                      //console.log(111);
                    item.printDatetime='';
                   }
                  if(item.printDatetime !=''){
                    var date1 = new Date(item.printDatetime);
                    item.printDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.rejectDatetime) == "undefined"){
                      //console.log(111);
                    item.rejectDatetime='';
                   }
                  if(item.rejectDatetime !=''){
                    var date1 = new Date(item.rejectDatetime);
                    item.rejectDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.remarkDatetime) == "undefined"){
                      //console.log(111);
                    item.remarkDatetime='';
                   }
                  if(item.remarkDatetime !=''){
                    var date1 = new Date(item.remarkDatetime);
                    item.remarkDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                    item.isImagePrinted = this.jiaopianList[item.isImagePrinted]
                    item.status = this.statusList[item.status];
                  })
              }
              this.row = [];//清空数据
              this.state.hospitalList =data.list;
              this.state.hospitalTotal = data.total;
              this.state.hospitalPage = data.page;
          } else {
            return false;
          }
        }).catch(err => {
           return false;
        });
   }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

#container {
  width: 100%;
  height: 100%;
  background-color: $bgGray;
  overflow: hidden;
}
#header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  text-align: center;
  overflow: hidden;
  background-color: $bgGray;
}
#content {
  position: absolute!important;
  position: relative;
  top: 50px!important;
  top: 0;
  bottom: 60px;
  width: 100%;
  height: auto!important;
  height: 100%;
  overflow: hidden;
}
#footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  clear: both;
  background: $bgGray;
}
#left {
  width: 250px;
  height: 100%;
  background-color :$gray;
  border-right: 7px solid $bgGray;
  box-sizing: border-box;
  float: left;
}
#main {
  height: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  background-color :$bgGray;
}
.el-table{
    min-height:800px !important;
  }
.el-table th{text-align:center}  
ul {
  width: 100%;
  overflow: hidden;
  padding-left: 1.43%;
}

li {
  overflow: hidden;
  font-size: 0;
  float: left;
  padding-top: 15px;
  cursor: pointer;
}

li:not(:last-child) {
  margin-right: 40px;
}

li>img {
  height : 25px;
}
</style>
