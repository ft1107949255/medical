<template>
  <div id="container">
    <header id="header">
      <headerNav   @selectSort="clickSort" :state="state"/>
    </header>
    <div id="content">
      <div id="left" v-if="isHidden">
        <leftSearch  v-on:searchParams="search" ref="leftSearch"/>
      </div>
      <div id="main">
        <centent 
                ref="centent"
                @collect='collect'
                @moreinfo='moreinfo'
                 :state="state" @statusClick="onStatus"
                 @handleRow="handleRow"
                 @handledblRow="handledblRow"
                 @handleIndexChange="handleIndexChange"
                 @handleSizeChange="handleSizeChange"
        />
      </div>
    </div>
    <footer id="footer">
      <foot-nav :theIndex="6" :data="MainData" />
    </footer>

 <!-- 病人详细信息弹出框  （详细 点击nav） -->
    <div>
       <el-dialog
          title="病人详细信息"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          @close='closeDialog'>
           <el-table
              :data="detailed"
              style="width: 100%"
              border
              height="500">
              <el-table-column
                fixed
                prop="name"
                label="名称"
                header-align="center"
                >
              </el-table-column>
              <el-table-column
                prop="content"
                label="内容"
                header-align="center"
              >
              </el-table-column>
            </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>

 <!-- 病人详情弹出框  （非详细  双击出现）-->
    <div>
       <el-dialog
          title="病人详情"
          :visible.sync="dialogDoubleVisible"
          width="20%"
          :before-close="handleClose"
          @close='closeDialog'>
          <patient :rowdata="doubelRow" />
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDoubleVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogDoubleVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>

   <!-- 收藏夹弹出框 -->
     <div>
       <el-dialog
          title="收藏夹管理"
          :visible.sync="dialogCollection"
          width="50%"
          center
          :before-close="closeCases">
          <hr/>
          <div class="dialog">
            <div class="leftClass">
              <collection  ref="leftCollection"  @selectCollection="selectCollection" @ClickCollection="ClickCollection"/>
            </div>
            <div class="rightClass">
              <cases ref="theCases" :theData="row" :rowdata="rowdata" :name="casesName"  :memo="casesmemo" :casesid="casesid" @Collecting="colleClick"/>
            </div>
          </div>
   
           <!--添加收藏目录-->
            <el-dialog
            title="操作提示"
            :visible.sync="innerVisible"
            width="400px"
            hight="100px"
            center
            :before-close="closeInner"
            append-to-body
            >
            <hr/>
            <div style="text-align:center">请输入文件夹名称</div>
            <el-input style="width:300px ; ; margin-left : 50px ; margin-top :10px;" v-model="folderName"></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button @click="closeInner">取 消</el-button>
            <el-button type="primary" @click="addFolder">确 定</el-button>
            </span>
            </el-dialog>
        </el-dialog>
    </div>

    <!-- 会诊弹出框 -->
    <el-dialog
          title="添加会诊信息"
          :visible.sync="huizhenVisible"
          width="50%">
          <!-- 会诊表单 -->
          <el-form  ref="huizhenform" :model="huizhenform"  label-width="80px" :show-message="false" >
              <el-row>
                <el-col :span="10"  >
                  <el-form-item label="会诊医院" :rules="[{ required: true, message: '会诊医院不能为空'}]" :show-message="false">
                      <el-select v-model="huizhenform.hospitalName" multiple  placeholder="请选择"   clearable class="el-input" @change="changeHospital" >
                          <el-option  :key="index" v-for="(item,index) in hospitalList" :label="item.departname" :value="item.departname"></el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10" v-if="masterShow">
                  <el-form-item label="专家" :rules="[{ required: true, message: '专家不能为空'}]" :show-message="false">
                    <el-select v-model="huizhenform.masterName" multiple  placeholder="请选择专家"  clearable class="el-input" >
                        <el-option  :key="index" v-for="(item,index) in masterList" :label="item.realName" :value="item.realName" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
          </el-form>
          <span v-if="huizhenform.errorShow" style="color:red;">{{huizhenform.errormsg}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="empty">清 空</el-button>
            <el-button type="primary" @click="okhuizhenDialog">确 定</el-button>
          </span>
      </el-dialog>
      <el-dialog
          title="警告"
          :visible.sync="cancelHuizhenDisable"
          width="30%">
          <span>确定取消会诊么？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelHuizhenDisable = false">取 消</el-button>
            <el-button type="primary" @click="cancelhuizen">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
import headerNav from "./../components/Nav.vue";
import leftSearch from "./../components/LeftSearch.vue";
import centent from "./../components/Centent.vue";
import footNav from "./../components/FooterNav.vue";
import appointmentInput from "./../components/basicInfo.vue";
import {formatDate} from "../common/js/date";
import patient from "./../components/Patientdetails.vue";
import collection from "./../components/Collectiondir.vue"
import cases from "./../components/Cases.vue"
export default {
  components: {
    headerNav,
    leftSearch,
    centent,
    footNav,
    appointmentInput,
    patient,
    collection,
    cases
  },
  data() {
    return {
      isHidden: true,
      ip: this.CONSTANT.CONSTANT.WEB_URL,

      token: localStorage.getItem('token'),
      MainData:JSON.parse(localStorage.getItem('nume')),
      isImagePrinted: '',
      status:'',
      folderName: '',
      folderid:'',
      casesid:'',
      casesName:'',
      casesmemo:'',
      dialogVisible: false,
      dialogDoubleVisible: false,
      dialogCollection: false,
      innerVisible:false,
      form:[],
      row:[],
      rowdata:[],
      doubelRow:[],
      state: {
        hospitalList: [],
        hospitalColums: [],
        hospitalTotal: 0,
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
        X: '出诊',
      },
      jiaopianList:{
        'N':'未打印',
        'P':'已打印',
        'S':'已发送',
        'O':'已预订',
      }
      ,
      detailed:[],
      huizhenVisible: false,
      hospitalList:[],   // 医院列表
      masterList:[],    // 医生列表
      huizhenform:{
        hospitalName:[], //医院名字
        //hospitalCode: '',  // 医院编码
        masterName: [],  // 会诊医生名字
        errorShow: false,
        errormsg:'',
      },
      cancelHuizhenDisable:false,
      // masterShow: false,
    }
  },
  created() {
      this.getDataList({});
      // 获取医院数据
      this.getHospitalList();
      // 获取专家的数据
      this.getMasterList();
  },
  computed:{
    masterShow: function(){
      for (var i = 0; i < this.huizhenform.hospitalName.length; i++) { 
        if (this.huizhenform.hospitalName[i] === '专家库') { 
          return true; 
        } 
      }
    }
  },
  methods: {
    focus(){
        console.log("进来了");
          this.dialogVisible = true;
      },
    handleClose(done) {
        done();
    },

    closeCases(done){
       this.casesName='';
       this.casesmemo='';
       this.$refs.theCases.changeData();
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
      
      this.getDataList(this.ParamsList);
    },
    handleSizeChange(val) {
      this.ParamsList.size = val;
      this.getDataList(this.ParamsList);
    },
    handleRow(row){
      this.row=row;
      if(typeof(row.scheduledDatetime) == "undefined"){
                   
        row.scheduledDatetime ='';
      }

      if(typeof(row.arrivedDatetime) == "undefined"){
        row.arrivedDatetime='';
      }

      if(typeof(row.reportDatetime) == "undefined"){
        row.reportDatetime='';
      }

      if(typeof(row.auditDatetime) == "undefined"){
        row.auditDatetime='';
      }

      if(typeof(row.imageDescribe) == "undefined" || row.imageDescribe=='undefined' ){
        row.imageDescribe='';
      }
 
      if(typeof(row.conclusion) == "undefined" || row.conclusion=='undefined' ){
        row.conclusion='';
      }

      if(row.scheduledDatetime !=''){
        var date = new Date(row.scheduledDatetime);
        row.scheduledDatetime = formatDate(date, "yyyy-MM-dd ");
      }

       if(row.arrivedDatetime !=''){
        var date = new Date(row.arrivedDatetime);
        row.arrivedDatetime = formatDate(date, "yyyy-MM-dd ");
      }

       if(row.reportDatetime !=''){
        var date = new Date(row.reportDatetime);
        row.reportDatetime = formatDate(date, "yyyy-MM-dd ");
      }

       if(row.auditDatetime !=''){
        var date = new Date(row.auditDatetime);
        row.auditDatetime = formatDate(date, "yyyy-MM-dd ");
      }
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
        name:'预约时间',
        content: row.scheduledDatetime
      },{
        name: '到达时间',
        content: row.arrivedDatetime
      },{
        name: '状态',
        content: row.status
      },{
        name: '检查项目',
        content: row.procedurename
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
      console.log('this.ParamsList',this.ParamsList);
      this.getDataList(item);
    },
    getDataList(item){
    console.log('item',item)
      var params = {};
      if(item !=null){
        params=item;
      }
     if(this.isImagePrinted){
        params.isImagePrinted=this.isImagePrinted;
     }else{
        delete params['isImagePrinted'];
     }

    if(this.status){
        params.status=this.status;
     }else{
        delete params['status'];
     }

     this.getPatientCheckList(params);
    },
    getPatientCheckList(params) {
      console.log('params',params)
       this.$http.post(this.ip + '/xhhms/rest/interCheckAdminController/v1/findByUserId', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log(data)
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
                  item.isImagePrinted = this.jiaopianList[item.isImagePrinted]
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
      onStatus(str,str1){
        this.status=str;
        this.isImagePrinted=str1;
        console.log('this.ParamsList',this.ParamsList)
        this.getDataList(this.ParamsList);
        this.$refs.centent.thisdata = {};
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
              showClose: true,
              message: '上报影像成功',
              type: 'success'
            });
           this.getDataList(this.ParamsList);
          } else {
             console.log('失败')
             this.$message({
              showClose: true,
              message: '上报影像失败',
              type: 'error'
            });
            return false;
          }
        }).catch(err => {
          console.log(err);
           this.$message({
             showClose: true,
              message: '上报影像失败',
              type: 'error'
            });
        });
     },

     selectCollection(index,params){
       if(!params.isParent){
         if(index==0){
            this.folderName='';
             this.folderid='';
             this.innerVisible = true;   
         }else{
             this.$message({
              showClose: true,
              message: '请先选择一个文件夹',
              type: 'warning'
             });
         }
       }else{
         if(index==0){
           this.folderName='';
           this.folderid='';
         }else{
           this.folderName=params.name;
           this.folderid=params.id;
         }
         this.innerVisible = true;   
       }
     },

     ClickCollection(params){
        if(!params.isParent){
           this.folderid='';
           this.folderName='';
           var paramsls = {};
           paramsls.id =params.id;
           this.$http.post(this.ip + '/xhhms/rest/interCollectController/v1/getlistByid ', paramsls,
              { headers: { 'X-AUTH-TOKEN': this.token }}
            ).then((res) => {
              var data = JSON.parse(res.data);
              console.log(data)
              if (data.status == 1) {
                this.casesName=data.data.name;
                this.casesmemo=data.data.memo;
                this.casesid  =data.data.id;
                var paramlst = {};
                paramlst.id=data.data.patientId;
                this.getListForID(paramlst);
              } else {
                return false;
              }
            }).catch(err => {
              console.log(err);
            });
        }else{
           this.folderName=params.name;
           this.folderid=params.id;
           this.casesid='';
        }
     },
     colleClick(str,str1,str2){
       console.log('进来了',this.folderid,str,str1,str2)
       if(!str2){
         if(!this.folderid){
              this.$message({
                showClose: true,
                message: '请先选择一个需要放入的文件夹',
                type: 'warning'
           });
         }else{
          var params = {};
           params.collectFloderId =this.folderid;
           params.name =str;
           params.memo =str1;
           params.patientId =this.row.id;
           this.getAddForParams(params);
         }
       }else{
           var params = {};
           params.name =str;
           params.memo =str1;
           params.id=str2;
           this.getAddForParams(params);
       }
     },
     getAddForParams(params){
           this.$http.post(this.ip + '/xhhms/rest/interCollectController/v1/add ', params,
              { headers: { 'X-AUTH-TOKEN': this.token }}
            ).then((res) => {
              var data = JSON.parse(res.data);
              console.log(data)
              if (data.status == 1) {
                 this.$message({
                    showClose: true,
                    message: '成功',
                    type: 'success'
                });
                this.closeInner();
                this.folderName='';
                this.folderid='';
                this.dialogCollection = false;
              } else {
                return false;
              }
            }).catch(err => {
              console.log(err);
            });
     },
     getListForID(params){
       this.$http.post(this.ip + '/xhhms/rest/interCheckAdminController/v1/findById', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log(data)
            this.rowdata=data.data;
            this.rowdata.imageDescribe = unescape(this.rowdata.imageDescribe);
            this.rowdata.conclusion = unescape(this.rowdata.conclusion);
          } else {
            return false;
          }
        }).catch(err => {
          console.log(err);
        });
     },
     clickSort(index){
       console.log('点击了',index)
        if(index==0){ //隐藏左侧筛选栏
           this.isHidden=!this.isHidden;
        }else if(index==1){  //刷新列表
          this.ParamsList.page=1;
          this.getDataList(this.ParamsList);
          this.$refs.centent.thisdata = {};
          this.$message({
              showClose:true,
              message: '刷新成功~',
              type: 'success'
            });
        }else if(index==2){ //修改
          if(this.row != false){
             this.$router.push({path: '/edit', query: {patientId:this.row.id}})
          }else{
            this.$message({
              showClose:true,
              message: '请在列表中选择一条病人信息',
              type: 'warning'
            });
          }
        }else if(index==3){
          if(this.row != false){
             this.focus();
          }else{
              this.$message({
              showClose:true,  
              message: '请在列表中选择一条病人信息',
              type: 'warning'
            });
          }
        }else if(index==4){
          this.$router.push('/appointment')
        }else if(index==5){
           var params = {};
           params.id=this.row.id;
           if(this.row.remoteStatus!=1){
              this.reportimage(params);
           }else{
              this.$message({
              showClose:true,
              message: '该病人信息已上报',
              type: 'warning'
              });
           }
        }else if(index==6){
          if(this.row != false){
             this.collectionOf();
          }else{
              this.$message({
              showClose: true,  
              message: '请在列表中选择一条病人信息',
              type: 'warning'
            });
          }
        }else if(index ==7){
          // 进入
          console.log('导出excel');
          console.log('参数--',this.ParamsList);
          // excel导出函数
          this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/exportXls',this.ParamsList,
            { headers: { 'X-AUTH-TOKEN': this.token }, responseType: 'arraybuffer'}
          ).then((res) => {
            console.log(res.data);
            let blob = new Blob([res.data], {type:"application/vnd.ms-excel"});
            const fileName = '病人信息.xls';
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
        }else if(index==8){
          console.log('这里是会诊按钮');
          // 点击打开会诊框
          // 选择会诊医院和会诊医生
          //先判断是否选择病人
          if(this.row != false){
             // 打开会诊框
             this.huizhenVisible = true;
             // 判断状态  是否有分诊  如果存在就请求接口   现在是编辑状态
             if(this.row['applyConsultationStatus'] == 1){
               console.log('修改会诊状态-------');
               var params = new Object();
               params.id = this.row['id'];
               this.$http.post(this.ip + '/xhhms/rest/interMedicalConsultationApplyController/v1/getConsultation',params,
                  { headers: { 'X-AUTH-TOKEN': this.token }}
                ).then((res) => {
                  var data =  JSON.parse(res.data);
                  console.log('-----',data);
                  if(data.status === 1 || data.status === '1'){
                     // 开始给huizhen表单赋值
                    console.log('会诊数据---',data.data);
                    if(data.data.hospital.length > 0){
                      this.huizhenform.hospitalName = [];
                      data.data.hospital.map(item=>{
                        name = item.name;
                        this.huizhenform.hospitalName.push(name);
                      })
                    }
                    if(data.data.master.length > 0){
                      this.huizhenform.masterName = [];
                        data.data.master.map(item=>{
                        name = item.name;
                        this.huizhenform.masterName.push(name);
                      })
                    }
                    
                  }
                }).catch(err => {
                  console.log(err);
                });
             }else{
              this.huizhenform.hospitalName = [];
              this.huizhenform.masterName = [];
             }

          }else{
              this.$message({
                showClose: true,
                message: '请在列表中选择一条病人信息',
                type: 'warning'
            });
          }
        }else if(index == 9){
          console.log('这是取消会诊按钮');
          // 判断是否选择病人
          if(this.row != false){
            // 展开取消分诊的面板
            // 判断当前是否有会诊状态
            if(this.row['applyConsultationStatus'] == 1){
              this.cancelHuizhenDisable = true;
              // 开始请求取消会诊
              // this.cancelhuizen();
            }else{
              this.$message({
                showClose:true,
                message: '当前选择病人未添加会诊信息！',
                type:'warning',
              });
            }
            
          }else{
            this.$message({
              showClose:true,
              message: '请在列表中选择一条病人信息',
              type:'warning',
            });
          }
        }else{
          console.log('这里是上报按钮');

        }
     },
    collectionOf(){
       this.dialogCollection = true;
       this.$refs.leftCollection.getCollectionList();
    },
    closeInner(){
      this.innerVisible = false;       
    },
    addFolder(){
      if(this.folderid){
          var params={};
          params.name=this.folderName;
          params.id=this.folderid;
         this.$http.post(this.ip + '/xhhms/rest/interCollectFolderController/v1/update', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log('成功')
            console.log(data)
            this.$message({
              message: '修改文件夹成功',
              type: 'success'
            });
            this.$refs.leftCollection.getCollectionList();
            this.folderName='';
            this.folderid='';
            this.closeInner();
          } else {
             console.log('失败')
             this.$message({
              message: '修改文件夹失败',
              type: 'error'
            });
            return false;
          }
        }).catch(err => {
          console.log(err);
           this.$message({
              message: '修改文件夹失败',
              type: 'error'
            });
        });    
      }else{
         var params={};
          params.name=this.folderName;
         this.$http.post(this.ip + '/xhhms/rest/interCollectFolderController/v1/add', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log('成功')
            console.log(data)
            this.$message({
              message: '添加文件夹成功',
              type: 'success'
            });
            this.$refs.leftCollection.getCollectionList();
            this.closeInner();
            this.folderName='';
            this.folderid='';
          } else {
             console.log('失败')
             this.$message({
              message: '添加文件夹失败',
              type: 'error'
            });
            return false;
          }
        }).catch(err => {
          console.log(err);
           this.$message({
              message: '添加文件夹失败',
              type: 'error'
            });
        });
      }
    },

     changeHospital: function(){
       // 当医院选择修改之后
       // 医生的数据也会改变
       // 医院和医生的id相同
      //  this.hospitalList.map(item=>{
      //    if(item.departname === this.huizhenform.hospitalName){
      //      // 当前选择医院id
      //     //  this.hospitalid = item.id;
      //      this.huizhenform.hospitalCode = item.orgCode; // 当前选择医院的code
      //     //  console.log('当前医院id------',this.hospitalid);
      //    }
      //  });
     },
     getHospitalList: function(){
       // 获取医院的数据
      var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/interHospitalController/v1/getHospitalList', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          if (!!data) {
            console.log('医院数据---------',data.data);
            this.hospitalList=data.data;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
     },
     getMasterList: function(){
       // 获取专家的数据
       var params = new Object();
       this.$http.post(this.ip + '/xhhms/rest/interHospitalController/v1/getDoctorList', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          if (!!data) {
             console.log('专家的数据--------',data);
            this.masterList=data.data;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
     },
     okhuizhenDialog: function(){
      if(this.huizhenform.hospitalName.length == 0){
        // 缺少医院信息
        this.huizhenform.errorShow = true;
        this.huizhenform.errormsg= '请选择医院';
        return false;
      }else{
        if(this.masterShow && this.huizhenform.masterName.length === 0){
          this.huizhenform.errorShow = true;
          this.huizhenform.errormsg= '请选择专家';
          return false;
        }
        
      }
       // 提交按钮
      var params = new Object();
      params.id = this.row.id;
      // 组装医院name/code
      // params.hospitalName = this.huizhenform.hospitalName;
      // params.hospitalCode = this.huizhenform.hospitalCode;
      params.hospital =  [];
      if(this.huizhenform.hospitalName.length> 0){
        for(let item in this.huizhenform.hospitalName){
            //console.log(item);
            // console.log(this.huizhenform.masterName[item]);
            this.hospitalList.map(hospital=>{
              //  console.log(master);
              if(hospital.departname === this.huizhenform.hospitalName[item]){
                let a = {}
                a.code = hospital.orgCode;
                a.name = hospital.departname;
                params.hospital.push(a);
              }
              })
          } 
      }
      // 组装 医生名字id
      if(this.masterShow){
         params.master =  [];
        if(this.huizhenform.masterName.length>0){
          console.log(this.huizhenform.masterName);
          for(let item in this.huizhenform.masterName){
            //console.log(item);
            console.log(this.huizhenform.masterName[item]);
            this.masterList.map(master=>{
              //  console.log(master);
              if(master.realName === this.huizhenform.masterName[item]){
                let a = {}
                a.id = master.id;
                a.name = master.realName;
                params.master.push(a);
              }
              })
          }
        }
      }
      console.log('传递的参数----',params);
      // 开始请求数据
      // 判断是新增还是编辑
      if(this.row.hasOwnProperty('applyConsultationStatus')){
        console.log('编辑会诊信息');
        var url = 'update';
      }else{
        console.log('新增会诊信息');
        var url = 'apply';
      }
      this.$http.post(this.ip+ '/xhhms/rest/interMedicalConsultationApplyController/v1/'+url,params,{
         headers: {
            'X-AUTH-TOKEN': this.token
          }
      }).then((res) => {
          var data = JSON.parse(res.data);
          console.log('开始更新表格',data);
          if (data.status===1 || data.status==='1') {
            this.$message({
              showClose:true,
              message: '操作成功',
              type: 'success',
            })
            this.huizhenVisible = false;
            console.log('开始更新表格');
            this.getDataList(this.ParamsList);
          } else {
            this.$message({
              showClose:true,
              message: '操作失败',
              type: 'error',
            })
            return false;
          }
        }, (err) => {
          this.$message({
              showClose:true,
              message: '操作失败',
              type: 'error',
          })
          console.log(err);
        });
     },
     empty: function(){
       // 清空表单函数
      //  console.log(this.huizhenform.hospitalName);
      //  console.log(this.huizhenform.doctorName);
       for(let key in this.huizhenform) {
          // console.log(key);
          if (typeof(this.huizhenform[key]) === 'string'){
              this.huizhenform[key] = '';
          }else{
              if(this.huizhenform[key].length >0){
                  this.huizhenform[key].splice(0,this.huizhenform[key].length);
              } 
          }
        }
     },
     cancelhuizen: function(){
       // 确定取消会诊
       console.log('开始取消会诊------');
      var params = new Object();
      params.id = this.row.id;
      console.log(params);
      this.$http.post(this.ip + '/xhhms/rest/interMedicalConsultationApplyController/v1/cancel',params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
          var data =  JSON.parse(res.data);
          console.log('-----',data.data);
          if(data.status === 1 || data.status === '1'){
            this.$message({
              showClose:true,
              message: '操作成功!!',
              type:'success',
            });
            // 更新列表
            // 刷新表格数据
          this.cancelHuizhenDisable = false;
          this.getDataList(this.ParamsList);
          }else{
            this.$message({
              showClose:true,
              message: '操作失败!!',
              type:'error',
            });
          }
        }).catch(err => {
          this.$message({
              showClose:true,
              message: '操作失败!!',
              type:'error',
            });
          console.log(err);
        });

     },
     collect: function(val){
       // 替换this.detailed
       //console.log('传递的数据',val);
       //this.makeinfo(val);
       //console.log('组装的数据',this.detailed);
       this.row = val;
       this.row.imageDescribe =   this.row.imageDescribe !=''? unescape(this.row.imageDescribe) :'';
       this.row.conclusion =  this.row.imageDescribe !=''? unescape(this.row.conclusion) : '';
       this.collectionOf();
     },
     moreinfo:function(val){
       this.makeinfo(val);
       this.focus();
     },
     returninfo:function(val){
       console.log('xxxxx---',val);
       if(val !='' && typeof(val) !='undefined' ){
          return unescape(val)
       }else{
         return '';
       }
     },
     returnDate:function(val){
       console.log('vvvvvv',val);
       if(typeof(val) =='undefined' || val==''){
         return '';
       }else{
         var date = new Date(val);
         return formatDate(date, "yyyy-MM-dd ")
       }
     },
     makeinfo:function(row){
      var date = new Date(row.scheduledDatetime);
      var date1 = new Date(row.arrivedDatetime);
      var date2 = new Date(row.reportDatetime);
      var date3 = new Date(row.auditDatetime);
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
        name:'预约时间',
        content: this.returnDate(row.scheduledDatetime) //formatDate(date, "yyyy-MM-dd ")
      },{
        name: '到达时间',
        content: this.returnDate(row.arrivedDatetime) // formatDate(date1, "yyyy-MM-dd ")
      },{
        name: '状态',
        content: row.status
      },{
        name: '检查项目',
        content: row.procedurename
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
        content: this.returninfo(row.imageDescribe)
      },{
        name: '影像诊断',
        content: this.returninfo(row.conclusion)
      },{
        name: '报告时间',
        content: this.returnDate(row.reportDatetime) //formatDate(date2, "yyyy-MM-dd ")
      },{
        name: '报告医生',
        content: row.reportDoctor
      },{
        name: '审核时间',
        content: this.returnDate(row.auditDatetime) //formatDate(date3, "yyyy-MM-dd ")
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
  overflow: hidden;
  text-align: center;
  background-color :$bgGray;
}


.dialog{
  width:100%;
  height:500 px;
  display :inline-block;
  overflow :hidden;
}
 .leftClass{
   height:99%;
   width :25%;
   display :inline-block;
   border: 1px solid $bgGray ;
   overflow-x :hidden;
   margin:0px 6px;
   border-radius:5px;
   float:left;
  
 }
 .rightClass{
   height:99%;
   width : 72%;
   display: inline-block;
   border :1px solid $bgGray ;
   overflow-x :hidden;
   border-radius:5px;
   float:right
 }
 .el-input__inner{
   font-size:12px !important;
 }

</style>
