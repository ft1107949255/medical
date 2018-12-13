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
            @bottomTableClick="bottomTableClick"
            @sortTable = "sortTable"
        />
      </div>
    </div>
    <footer id="footer">
      <foot-nav :theIndex="6" :data="MainData" />
    </footer>
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
            <el-input v-model="folderName"></el-input>
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
  <!-- 上报医院弹出框 -->
      <el-dialog
          title="添加上报医院信息"
          :visible.sync="upReportHospitalVisible"
          width="50%">
          <!-- 会诊表单 -->
          <el-form  ref="upReportform" :model="upReportform"  label-width="80px" :show-message="false" >
              <el-row>
                <el-col :span="10"  >
                  <el-form-item label="上报医院" :rules="[{ required: true, message: '上报医院不能为空'}]" :show-message="false">
                      <el-select v-model="upReportform.hospitalName"  placeholder="请选择"   clearable class="el-input" >
                          <el-option  :key="index" v-for="(item,index) in uploadHospitalList" :label="item.departname" :value="item.departname"></el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
          </el-form>
          <span v-if="upReportform.errorShow" style="color:red;">{{upReportform.errormsg}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="upReportHospitalVisible=false">取 消</el-button>
            <el-button type="primary" @click="okupReportDialog">确 定</el-button>
          </span>
      </el-dialog>
    <!-- 多选医院弹出框 -->
    <el-dialog
          title="选择多个病人查看影像"
          :visible.sync="selectPatientsVisible"
          width="50%"
          height="400px">
          <div class="selectPatieninfo">
          <selectTable :list="selectPatientsList" :columns="selectPatientsColumns" @sendids="sendids"/>
          </div>
          <!-- 会诊表单 -->
          <el-form  :model="selectPatientsForm"  label-width="80px" >
              <el-row>
                <el-col :span="7">
                <el-form-item label="病人ID:">
                  <el-input v-model="selectPatientsForm.patientId" clearable></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="病人姓名:">
                    <el-input v-model="selectPatientsForm.name" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="医疗机构:">
                    <el-input v-model="selectPatientsForm.hospital" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="7">
                <el-form-item label="检查号:">
                  <el-input v-model="selectPatientsForm.accessionNo" clearable></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="检查日期:">
                  <el-date-picker type="date" placeholder="请选择" v-model="selectPatientsForm.arrivedDatetime" clearable></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
          </el-form>
          <span v-if="selectPatientsForm.errorShow" style="color:red;">{{selectPatientsForm.errormsg}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="selectPatientsVisible=false">取 消</el-button>
            <el-button type="primary" @click="searchselectPatientsDialog">搜 索</el-button>
            <el-button type="primary" @click="okselectPatientsDialog">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
// 私有组件
import patient from "./components/Patientdetails.vue";
import collection from "./components/Collectiondir.vue";
import cases from "./components/Cases.vue";
import headerNav from "./components/Nav.vue";
import centent from "./components/Centent.vue";
// remoteConsultation 组件
import leftSearch from "../remoteConsultation/components/LeftSearch.vue";
// 公共组件
import footNav from "./../components/FooterNav.vue";
import appointmentInput from "../Appointment/components/basicInfo.vue";
import {formatDate} from "../common/js/date";
import selectTable from './../components/table/selectTable.vue';
import {api} from '../../config/website'
export default {
  components: {
    headerNav,
    leftSearch,
    centent,
    footNav,
    appointmentInput,
    patient,
    collection,
    cases,
    selectTable
  },
  data() {
    return {
      isHidden: true,
      ip: api,
      token: localStorage.getItem('token'),
      MainData:JSON.parse(localStorage.getItem('nume')),
      isImagePrinted: '',
      status:'',
      folderName: '',
      folderid:'',
      casesid:'',
      casesName:'',
      casesmemo:'',
      // dialogVisible: false,
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
        R: '已初诊',
        D: '草稿',
        C: '已检查',
        I: '检查中',
        T: '已分诊',
        S: '已预约',
        A: '已审核',
      },
      jiaopianList:{
        'N':'未打印',
        'P':'已打印',
        'S':'已发送',
        'O':'已预订',
      }
      ,
      // detailed:[],
      huizhenVisible: false,
      hospitalList:[],   // 医院列表
      uploadHospitalList: [],  // 上报医院列表
      masterList:[],    // 医生列表
      huizhenform:{
        hospitalName:[], //医院名字
        //hospitalCode: '',  // 医院编码
        masterName: [],  // 会诊医生名字
        errorShow: false,
        errormsg:'',
      },
      cancelHuizhenDisable:false,
      bottomrow:{},
      upReportHospitalVisible:false,
      upReportform:{
        hospitalName:'',
        errorShow: false,
        errormsg:'',
      },
      selectPatientsVisible: false,
      selectPatientsForm:{
        errorShow: false,
        errormsg:'',
        patientId:'',
        name: '',
        hospital: '',
        accessionNo:'',
        arrivedDatetime:''
      },
      selectPatientsList:[],
      selectPatientsColumns:[],
      ids: [],
      // 定时器
      loop: null,
      findUserPage:0,
      upUserPage:0
    }
  },
  created() {
      // 定时更新数据
      this.loop = setInterval(() => {
        // 根据状态判断接口
       if( this.status === 'upload'){
        // 已上报
          this.getUploadList(this.ParamsList, {loading: false});
        } else {
          this.getDataList(this.ParamsList, {loading: false});
          this.$refs.centent.thisdata = {};
        }
        // this.getDataList(this.ParamsList, {loading: false});
      }, 1000 * 60)
      this.getDataList({});
      // 获取医院数据
      this.getHospitalList();
      // 获取上报医院数据
      this.getUploadHospitalList();
      // 获取专家的数据
      this.getMasterList();
  },
  destroyed () {
    clearInterval(this.loop)
    this.loop = null
  },
  mounted () {
    // 开始判断浏览器
    
  },
  computed:{
    masterShow: function(){
      for (var i = 0; i < this.huizhenform.hospitalName.length; i++) { 
        if (this.huizhenform.hospitalName[i] === '专家库') { 
          return true; 
        } 
      }
    },
  },
  methods: {
    focus(){
        console.log("进来了");
          this.dialogDoubleVisible = true;
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
      // this.dialogDoubleVisible =true;
      if(row.isMatched === '未匹配'){
        this.$message({
          showClose:'true',
          message: '影像状态必须是已匹配才可以进行编辑',
          type:'error',
        });
        return false;
      }
      // 判断远程状态
      // 根据远程状态判断当前用户是否对该条数据有操作权限
      var params = new Object();
      params.id = row.id;
      this.$api.IndexcaneditReport(params).then((res) => {
        var data = res.data;
        console.log(res);
        // canedit=1 进入本地goEdit ; canedit=0 进入远程goCloudEdit
        if (data.canedit == 1) {
          this.$router.push({path: '/edit', query: {patientId:this.row.id, type: 1}})
        } else {
          // this.$router.push({path: '/edit', query: {patientId:this.row.id, type: 0}})
          this.$message({
              showClose: true,
              message: '不能进行编辑,可以浏览报告',
              type: 'warning'
          });
        }
      })
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
      this.doubelRow=row;
    },
    search(item){
      console.log('search',item)
      this.ParamsList=item;
      this.$refs.centent.paramsList = this.ParamsList;
      console.log('this.ParamsList',this.ParamsList);
      if( this.status === 'upload'){
        // 已上报
        console.log('[*] 已上报的fun', this.ParamsList);
        this.getUploadList(this.ParamsList);
      }else{
        this.getDataList(item);
      }
    },
    getDataList(item, options){
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
     this.getPatientCheckList(params, options);
    },
    getPatientCheckList(params, options) {
      console.log('params',params)
        this.$api.IndexfindByUserId(params, options).then((res) => {
          console.log(res,'xxxxxx')
          var data = res;
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
                  }else if(item.remoteStatus == 3 || item.remoteStatus == '3'){
                      item.remoteStatus='上级驳回';
                  }
                  item.isImagePrinted = this.jiaopianList[item.isImagePrinted]
                  if(typeof(item.scheduledDatetime) == "undefined"){
                    item.scheduledDatetime ='';
                  }
                  // console.log(item.auditDatetime);
                   if(typeof(item.auditDatetime) == "undefined"){
                    item.auditDatetime='';
                  }
                   if(typeof(item.arrivedDatetime) == "undefined"){
                    item.arrivedDatetime='';
                   }
                  if(item.arrivedDatetime !='' && item.arrivedDatetime !== null ){
                    var date = new Date(item.arrivedDatetime);
                    item.arrivedDatetime = formatDate(date, "yyyy-MM-dd ");
                   }
                  if(item.scheduledDatetime !='' && item.scheduledDatetime !== null){
                    var date = new Date(item.scheduledDatetime);
                    item.scheduledDatetime = formatDate(date, "yyyy-MM-dd ");
                  }
                  if(item.auditDatetime !='' && item.auditDatetime !== null){
                    var date1 = new Date(item.auditDatetime);
                    item.auditDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.startTime) == "undefined"){
                    item.startTime='';
                   }
                  if(item.startTime !='' && item.startTime !== null){
                    var date1 = new Date(item.startTime);
                    item.startTime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.endTime) == "undefined"){
                    item.endTime='';
                   }
                  if(item.endTime !='' && item.endTime !== null){
                    var date1 = new Date(item.endTime);
                    item.endTime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.verifyDatetime) == "undefined"){
                    item.verifyDatetime='';
                   }
                  if(item.verifyDatetime !='' && item.verifyDatetime !== null){
                    var date1 = new Date(item.verifyDatetime);
                    item.verifyDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.printDatetime) == "undefined"){
                    item.printDatetime='';
                   }
                  if(item.printDatetime !='' && item.printDatetime !== null){
                    var date1 = new Date(item.printDatetime);
                    item.printDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.rejectDatetime) == "undefined"){
                    item.rejectDatetime='';
                   }
                  if(item.rejectDatetime !='' && item.rejectDatetime !== null){
                    var date1 = new Date(item.rejectDatetime);
                    item.rejectDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.remarkDatetime) == "undefined" || item.remarkDatetime === null){
                    item.remarkDatetime='';
                   }
                  // 解密检查提示
                  if(typeof(item.conclusion) !== 'undefined' && item.conclusion !== '' && item.conclusion !== null){
                    item.conclusion = unescape(item.conclusion);
                  } else {
                    item.conclusion = '';
                  }
                  // 获取检查检查所见
                  if(typeof(item.imageDescribe) !== 'undefined' && item.imageDescribe !== '' && item.imageDescribe !== null){
                    item.imageDescribe = unescape(item.imageDescribe);
                  } else {
                    item.imageDescribe = '';
                  }
                  if(typeof(item.remark) !== 'undefined' && item.remark !== '' && item.remark !== null){
                    console.log('获取备注');
                  } else {
                    item.remark = '';
                  }
                  console.log('[*]xxxxxxxxxxxxxx',item.remarkDatetime)
                  if(item.remarkDatetime !== null && item.remarkDatetime !== ''){
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
            // this.findUserPage = data.page;
          } else {
            return false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      onStatus(str,str1){
        this.status=str;
        if( this.status === 'upload'){
          // 已上报
          console.log('[*] 已上报的fun', this.ParamsList);
          this.ParamsList.page = this.upUserPage;
          this.getUploadList(this.ParamsList);
        } else {
          this.ParamsList.page = 0;
          this.isImagePrinted=str1;
          //console.log('this.ParamsList',this.ParamsList)
          this.getDataList(this.ParamsList);
          this.$refs.centent.thisdata = {};
        }
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
        this.$api.IndexClickCollection(params).then((res) => {
          var data = res;
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
       //console.log('进来了',this.folderid,str,str1,str2)
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
      this.$api.IndexAddForParams(params).then((res) => {
        var data = res;
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
      this.$api.IndexgetListForID(params).then((res) => {
        var data = res;
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
        //console.log('点击了',index)
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
            // 先判断该条数据影像状态是否是已匹配
            if(this.row.isMatched === '未匹配'){
              this.$message({
                showClose:'true',
                message: '影像状态必须是已匹配才可以进行编辑',
                type:'error',
              });
              return false;
            }
            // 判断远程状态
            // 根据远程状态判断当前用户是否对该条数据有操作权限
            var params = new Object();
            params.id = this.row.id;
            this.$api.IndexcaneditReport(params).then((res) => {
              var data = res.data;
              console.log('判断权限中--',data.status);
              if (data.canedit == 1) {
                this.$router.push({path: '/edit', query: {patientId:this.row.id, type: 1}})
              } else {
              this.$message({
                showClose: true,
                message: '不能进行编辑,可以浏览报告',
                type: 'warning'
              });
              }
            }).catch(err => {
              console.log(err);
            });
           
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
          if(this.row == false){
            this.$message({
              showClose:true,  
              message: '请在列表中选择一条病人信息',
              type: 'warning'
            });
            return false;
          }
          // 判断病人状态
          var statusListNew = ['已初诊','已审核','已复审'];
          if (statusListNew.indexOf(this.row.status) == -1){
            this.$message({
              showClose:true,  
              message: '病人状态必须是已初诊、已审核、已复审之一',
              type: 'warning'
            });
            return false;
          }
          // 判断是否上报
          var params = {}
          params.id = this.row.id;
          this.$api.IndexcaneditReport(params).then((res) => {
              var data = res.data;
              console.log('判断权限中--',data);
              if(data.canedit == 0 || data.canedit == '0'){
                // 不能进行编辑
                this.$message({
                  showClose:'true',
                  message: '影像已上报不能再进行上报',
                  type:'warning',
                });
                return false;
              }else if(data.canedit == 2 || data.canedit == '2'){
                this.$message({
                  showClose:'true',
                  message: '已经添加会诊信息不能再进行上报',
                  type:'warning',
                });
                return false;
              } else {
                this.upReportHospitalVisible = true;
              }
            })
                    
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
          this.$api.IndexexportXls({}, { responseType: 'blob' }).then((res) => {
            let blob = new Blob([res], {type:"application/vnd.ms-excel"});
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
          //console.log('这里是会诊按钮');
          // 点击打开会诊框
          // 选择会诊医院和会诊医生
          //先判断是否选择病人
          if(this.row != false){
            // 判断病人状态
            var statusListNew = ['已初诊','已审核','已复审'];
            if (statusListNew.indexOf(this.row.status) == -1){
              this.$message({
                showClose:true,  
                message: '病人状态必须是已初诊、已审核、已复审之一',
                type: 'warning'
              });
              return false;
            }
            // 判断该数据是否已经上报
            var params = new Object();
            params.id = this.row.id;
            this.$api.IndexcaneditReport(params).then((res) => {
              var data = res.data;
              console.log('判断权限中--',data);
              if(data.canedit == 0 || data.canedit == '0'){
                // 不能进行编辑
                this.$message({
                  showClose:'true',
                  message: '影像已上报不能进行会诊',
                  type:'warning',
                });
                return false;
              }else if(data.canedit == 2 || data.canedit == '2'){
                // 已经添加会诊信息
                this.$message({
                  showClose:'true',
                  message:'该数据已经添加会诊信息,不能重复添加',
                  type: 'warning'
                });
              }else{
                // 打开会诊框
                this.huizhenVisible = true;
                // 判断状态  是否有分诊  如果存在就请求接口   现在是编辑状态
                if(this.row['applyConsultationStatus'] == 1){
                  //console.log('修改会诊状态-------');
                  var params = new Object();
                  params.id = this.row['id'];
                  this.$api.IndexgetConsultations(params).then((res) => {
                      var data =  res;
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
                  }
            })
          }else{
              this.$message({
                showClose: true,
                message: '请在列表中选择一条病人信息',
                type: 'warning'
            });
          }
        }else if(index == 9){
          // console.log('这是取消会诊按钮');
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
        }else if(index ==10){
          // 匹配功能
          console.log('手动匹配按钮');
          if(this.row == false){
            this.$message({
                showClose:true,
                message: '请选择一条病人信息！！',
                type:'error',
            });
            return false;
          }
          if(!this.bottomrow.hasOwnProperty('id') || this.bottomrow.id ==''){
            this.$message({
                showClose:true,
                message: '请选择一条未匹配列表病人信息！！',
                type:'error',
            });
            return false;
          }
          let id = this.row.id;   // 主列表的数据id
          let pid = this.bottomrow.id;  // 未匹配列表的id
          // 是否进行核对   核对的话显示提示框
          // 展示信息也比较多
          var params = new Object();
          params.id = id;
          params.pid = pid;
          this.$api.Indexmatchstudy(params).then((res) => {
            var data =  res;
            console.log('-----',data);
            if(data.status === 1 || data.status === '1'){
              this.$message({
                showClose:'true',
                message: '手动匹配成功',
                type: 'success',
              });
              this.getDataList(this.ParamsList);
            }else{
              this.$message({
                showClose: 'true',
                message: '手动匹配失败',
                type: 'error',
              });
            }
          }).catch(err => {
            console.log(err);
          });
        }else if(index == 11) {
          console.log('选择多人查看影像');
          this.selectPatientsVisible = true;
          var params = {}
        this.$api.IndexqueryRemotePatient().then((res) => {
          var data = res;
          console.log('[*]==========', data)
          if (data.status == 1) {
            data.list.map(item=>{
              var date = new Date(item.arrivedDatetime);
              item.arrivedDatetime = formatDate(date, "yyyy-MM-dd ");
            })
            this.selectPatientsList =data.list;
            this.selectPatientsColumns =data.table;
          }
        }).catch(err => {
          console.log(err);
           this.$message({
              showClose: true,
              message: '失败',
              type: 'error'
            });
        });
        }else if(index == 12){
          console.log('print')
          if (!this.row.id) {
            this.$message({
              showClose: true,
              message: '请选择一个病人！！',
              type: 'warning'
            });
            return false;
          }
          let params = {};
          params.id = this.row.id;
          // 判断当前病人信息是否可以打印
          this.$api.IndexCanPrint(params).then(res => {
            console.log(res.data.canprint);
            if (res.data.canprint == 1) {
              // 如果可以
              // 打开打印报告页面
              const {href} = this.$router.resolve({
                path: "printreport",
                query: {
                  id: this.row.id
                }
              });
              window.open(href, '_blank');
            } else {
              this.$message({
                showClose: '',
                message: '当前报告不可以进行打印',
                type: 'warning'
              });
            }
          })
        }else if(index === 13){
          this.$router.push('/count')
        }else if(index === 14){
          this.$router.push('excelcount')
        }else{
          console.log('这里是未知按钮');
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
        this.$api.Indexupdate(params).then((res) => {
          var data = res;
          if (data.status == 1) {
            console.log('成功')
            console.log(data)
            this.$message({
              showClose: true,
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
              showClose: true,
              message: '修改文件夹失败',
              type: 'error'
            });
            return false;
          }
        }).catch(err => {
          console.log(err);
           this.$message({
              showClose: true,
              message: '修改文件夹失败',
              type: 'error'
            });
        });    
      }else{
        var params={};
        params.name=this.folderName;
        this.$api.Indexadd(params).then((res) => {
          var data = res;
          if (data.status == 1) {
            console.log('成功')
            console.log(data)
            this.$message({
              showClose: true,
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
              showClose: true,
              message: '添加文件夹失败',
              type: 'error'
            });
            return false;
          }
        }).catch(err => {
          console.log(err);
           this.$message({
              showClose: true,
              message: '添加文件夹失败',
              type: 'error'
            });
        });
      }
    },

     changeHospital: function(){
     },
     getHospitalList: function(){
       // 获取医院的数据
      var params=new Object();
      this.$api.IndexgetCloudHospitalList(params).then((res) => {
        var data = res;
        console.log('[*]xxxxx',data)
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
     getUploadHospitalList() {
       var params=new Object();
      this.$api.IndexgetuploadHospitalList(params).then((res) => {
        var data = res;
        if (!!data) {
          this.uploadHospitalList=data.data;
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
       this.$api.IndexgetCloudExportDoctorList(params).then((res) => {
          // console.log('专家库信息',res.data);
          var data = res;
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

      params.hospital =  [];
      if(this.huizhenform.hospitalName.length> 0){
        for(let item in this.huizhenform.hospitalName){
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
          params.hospital  = JSON.stringify(params.hospital);
      }
      console.log(params.hospital);
      // return false;
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
           params.master = JSON.stringify(params.master);
        }
      }
      console.log('传递的参数----',params);
      // 开始请求数据
      // 判断是新增还是编辑
      if(this.row.hasOwnProperty('applyConsultationStatus')&&this.row.applyConsultationStatus==1){
        console.log('编辑会诊信息');
        // var url = 'update';
        this.$api.Indexconupdate(params).then((res) => {
          var data = res;
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
      }else{
        console.log('新增会诊信息');
        var url = 'apply';
        this.$api.Indexconapply(params).then((res) => {
          var data = res;
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
      }
     },
     empty: function(){
       // 清空表单函数
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
        this.$api.Indexconcancel(params).then((res) => {
          var data =  res;
          // console.log('-----',data.data);
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
       this.row = val;
       this.row.imageDescribe =   this.row.imageDescribe !=''? unescape(this.row.imageDescribe) :'';
       this.row.conclusion =  this.row.imageDescribe !=''? unescape(this.row.conclusion) : '';
       this.collectionOf();
     },
     moreinfo:function(val){
       this.doubelRow=val;
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
     bottomTableClick: function(val){
       console.log('[*] 传递到home页面的值', val);
       this.bottomrow = val;
     },
     okupReportDialog: function(){
       // 确定上报医院
       console.log('[*]上报医院+++++');
       if(this.upReportform.hospitalName == ''){
           this.upReportform.errorShow = true;
           this.upReportform.errormsg = '请选择上报医院';
           return false;
       }else{
         var params = new Object();
         params.id = this.row.id;
         params.hospitalName = this.upReportform.hospitalName;
        this.uploadHospitalList.map(hospital=>{
          //  console.log(master);
          if(hospital.departname === this.upReportform.hospitalName){
            let a = {}
            a.code = hospital.orgCode;
            params.hospitalCode = hospital.orgCode;
          }
          })
          console.log('[*]当前参数+++++++++',params);
        // 开始提交上报医院  修改状态  
        this.$api.Indexreportimage(params).then((res) => {
          var data =  res;
          console.log('-----', res);
          if(data.status === 1 || data.status === '1'){
            this.$message({
              showClose:true,
              message: '操作成功!!',
              type:'success',
            });
            // 更新列表
            // 刷新表格数据   隐藏上传
          this.upReportHospitalVisible = false;
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
       }
     },
     okselectPatientsDialog(){
       // 组装ids  base64
       var ids =  this.ids.join(',');
       // var idstr =  window.btoa(ids);
       this.$router.push({path:'/patientimages', query:{patientId:ids}})
     },
     searchselectPatientsDialog(){
       console.log('当前的参数是---------------', this.selectPatientsForm);
       var params = {}
       params.patientId = this.selectPatientsForm.patientId;
       params.name = this.selectPatientsForm.name;
       params.hospital = this.selectPatientsForm.hospital;
       if(this.selectPatientsForm.arrivedDatetime != ''){
          var date = new Date(this.selectPatientsForm.arrivedDatetime);
          this.selectPatientsForm.arrivedDatetime = formatDate(date, 'yyyy-MM-dd');
       }
       params.arrivedDatetime = this.selectPatientsForm.arrivedDatetime;
       params.accessionNo = this.selectPatientsForm.accessionNo
      this.$api.IndexqueryRemotePatient(params).then((res) => {
          var data = res;
          console.log('[*]==========', data)
          if (data.status == 1) {
            data.list.map(item=>{
              var date = new Date(item.arrivedDatetime);
              item.arrivedDatetime = formatDate(date, "yyyy-MM-dd ");
            })
            this.selectPatientsList =data.list;
            this.selectPatientsColumns =data.table;
          }
        }).catch(err => {
          console.log(err);
           this.$message({
              showClose: true,
              message: '失败',
              type: 'error'
            });
        });    
     },
     sendids(ids) {
       console.log('[*]---传递过来的ids',ids);
       this.ids = ids;
     },
     getUploadList(params) {
       params.status = '';
       params.isImagePrinted = '';
       console.log(params);
        this.$api.IndexfindallUpload(params).then((res) => {
          var data = res;
          // console.log('[*]==========', data)
          if (data.status == 1) {
            this.state.hospitalList = [];
            if(data.list){
                data.list.map(item=>{
                  if(item.sex == 0){
                    item.sex = '男';
                  }else {
                    item.sex = '女';
                  }
                  if(item.remoteStatus == 1){
                    item.remoteStatus = '从下级到中心';
                  }else if(item.remoteStatus == 2){
                    item.remoteStatus = '从中心到下级';
                  }else if(item.remoteStatus == 3 || item.remoteStatus == '3') {
                    item.remoteStatus = '上级驳回';
                  }
                  item.isImagePrinted = this.jiaopianList[item.isImagePrinted];
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
                  if(item.arrivedDatetime !='' && item.arrivedDatetime !== null){
                      //console.log(111);
                    var date = new Date(item.arrivedDatetime);
                    item.arrivedDatetime = formatDate(date, "yyyy-MM-dd ");
                   }

                  if(item.scheduledDatetime !='' && item.scheduledDatetime !== null){
                    var date = new Date(item.scheduledDatetime);
                    item.scheduledDatetime = formatDate(date, "yyyy-MM-dd ");
                  }

                  if(item.auditDatetime !='' && item.auditDatetime !== null){
                    console.log('[*]',item.auditDatetime)
                    var date1 = new Date(item.auditDatetime);
                    item.auditDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  console.log('[*] new',item.auditDatetime)
                  if(typeof(item.startTime) == "undefined"){
                      //console.log(111);
                    item.startTime='';
                   }
                  if(item.startTime !='' && item.startTime !== null){
                    var date1 = new Date(item.startTime);
                    item.startTime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.endTime) == "undefined"){
                      //console.log(111);
                    item.endTime='';
                   }
                  if(item.endTime !='' && item.endTime !== null){
                    var date1 = new Date(item.endTime);
                    item.endTime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.verifyDatetime) == "undefined"){
                      //console.log(111);
                    item.verifyDatetime='';
                   }
                  if(item.verifyDatetime !='' && item.verifyDatetime !== null){
                    var date1 = new Date(item.verifyDatetime);
                    item.verifyDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.printDatetime) == "undefined"){
                      //console.log(111);
                    item.printDatetime='';
                   }
                  if(item.printDatetime !='' && item.printDatetime !== null){
                    var date1 = new Date(item.printDatetime);
                    item.printDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.rejectDatetime) == "undefined"){
                      //console.log(111);
                    item.rejectDatetime='';
                   }
                  if(item.rejectDatetime !='' && item.rejectDatetime !== null){
                    var date1 = new Date(item.rejectDatetime);
                    item.rejectDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(typeof(item.remarkDatetime) == "undefined"){
                      //console.log(111);
                    item.remarkDatetime='';
                   }
                  if(item.remarkDatetime !='' && item.remarkDatetime !== null){
                    var date1 = new Date(item.remarkDatetime);
                    item.remarkDatetime = formatDate(date1, "yyyy-MM-dd ");
                  }
                  if(item.applyConsultationStatus == 0 || item.applyConsultationStatus ==''){
                    item.applyConsultationStatus = '';
                  }else if(item.applyConsultationStatus == 1){
                    item.applyConsultationStatus = '已会诊';
                  }
                  if(typeof(item.conclusion) !== 'undefined' && item.conclusion !== '' && item.conclusion !== null){
                    item.conclusion = unescape(item.conclusion);
                  } else {
                    item.conclusion = '';
                  }
                  // 获取检查检查所见
                  if(typeof(item.imageDescribe) !== 'undefined' && item.imageDescribe !== '' && item.imageDescribe !== null){
                    item.imageDescribe = unescape(item.imageDescribe);
                  } else {
                    item.imageDescribe = '';
                  }
                  if(typeof(item.remark) !== 'undefined' && item.remark !== '' && item.remark !== null){
                    console.log('获取备注');
                  } else {
                    item.remark = '';
                  }
                  console.log(item.status, 'xxxxxxxxxxx');
                  item.status = this.statusList[item.status];

                })
                this.row = [];//清空数据
                this.state.hospitalList =data.list;
                this.state.hospitalColums = data.table;
                this.state.hospitalTotal = data.total;
                // this.state.hospitalPage = data.page;
                this.upUserPage = data.page;
            } 
          }
        }).catch(err => {
          console.log(err);
           this.$message({
              showClose: true,
              message: '失败',
              type: 'error'
            });
        });    
     },
     sortTable(coulmn) {
       console.log(111, coulmn);
       if(coulmn['order'] === 'ascending') {
         this.ParamsList.sortMethod = 'ASC';
       } else {
         this.ParamsList.sortMethod = 'DESC';
       }
       this.ParamsList.sortField = coulmn['prop'];
       // 根据状态判断接口
       if( this.status === 'upload'){
          // 已上报
          this.getUploadList(this.ParamsList);
        } else {
          this.getDataList(this.ParamsList);
          this.$refs.centent.thisdata = {};
        }
     },
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
  background-color: $bgGray;
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
   overflow :hidden;
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
  body{
   
  }
  .selectPatieninfo{
    margin-bottom:10px;
  }
   .el-input {
    width: 100% !important;
    background-color: $gray;
  }
</style>
