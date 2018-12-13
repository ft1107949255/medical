<template>
  <div id="container">
    <div class="div left">
      <div class="table">
        <ul>
          <li class="li">
            <div class="title">病人姓名</div>
            <div class="title">检查时间</div>
            <div class="title">打印状态</div>
          </li>
          <li v-for="(item,key) in patientList" :key="key" :class="key === currentIndex?active:0" @click="liclick(item,key)" >
            <div class="title">{{item.name}}</div>
            <div class="title">{{item.arrivedDatetime}}</div>
            <div class="title">{{item.isImagePrinted === 'N'?'未打印':'已打印'}}</div>
          </li>
        </ul>
      </div>
      <div style="margin-top:10px;">
        <page :total="searchForm.total" :currentPage="searchForm.currentPage" :pageSize="searchForm.pageSize" @handleIndexChange="handleIndexChange"/>
      </div>  
      <div class="psearch">
        <div class="psearchTitle">病人查询</div>
        <div class="searchForm">
            <el-form :model="searchForm">
            <el-row>
                <el-col >
                  <el-form-item label="病人ID:">
                    <el-input v-model="searchForm.patientId" clearable></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col >
                  <el-form-item label="姓名:">
                    <el-input v-model="searchForm.name" clearable></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col >
                  <el-form-item label="检查时间:">
                    <el-date-picker type="date" placeholder="请选择" v-model="searchForm.arrivedDatetime" clearable></el-date-picker>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col >
                  <el-form-item label="打印状态:">
                    <el-select v-model="searchForm.isImagePrinted" placeholder="请选择"  clearable class="el-input" >
                      <el-option  :key="index" v-for="(item,index) in printStatusList" :label="item.label" :value="item.value" ></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
            </el-row>
        </el-form>
          <div class="btn">
            <el-button type="primary" @click="okSearch">确 定</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="div middle">
      <div class="header">
        <div class="box_f">
          <div class="title">窗格设置</div>
          <div class="box_f_s" @click="selectWindow(0)"></div>
          <div class="box_f_s" @click="selectWindow(1)">
            <div style="width:100%;height:49px;border-bottom:2px solid #9d9e9f"></div>
          </div>
          <div class="box_f_s" @click="selectWindow(2)">
            <div style="width:50%;height:100px;border-right:2px solid #9d9e9f"></div>
          </div>
          <div class="box_f_s" style="position:relative" @click="selectWindow(3)">
            <div style="border-bottom:2px solid #9d9e9f">
              <div style="width:50%;height:50px;border-right:2px solid #9d9e9f;"></div>
            </div>
            <div class="bottom" style="height:48px;border-right:2px solid #9d9e9f;"></div>
          </div>
        </div>
        <div class="box_f">
          <div class="title">拼图设置</div>
          <div class="box_f_s" @click="selectJigsaw(0)"></div>
          <div class="box_f_s" @click="selectJigsaw(1)">
            <div style="width:100%;height:49px;border-bottom:2px solid #9d9e9f"></div>
          </div>
          <div class="box_f_s" @click="selectJigsaw(2)">
            <div style="width:50%;height:100px;border-right:2px solid #9d9e9f"></div>
          </div>
          <div class="box_f_s" style="position:relative" @click="selectJigsaw(3)">
            <div style="border-bottom:2px solid #9d9e9f">
              <div style="width:50%;height:50px;border-right:2px solid #9d9e9f;"></div>
            </div>
            <div class="bottom" style="height:48px;border-right:2px solid #9d9e9f;"></div>
          </div>
        </div>
      </div>
      <div class="blackBox">
         <preview-dicom ref="xxoo" v-show="xxooshow"></preview-dicom>
         <windowindex1 ref="window1"  v-show="showWindowIndex[0]"  @windowIndex="windowIndex"  @jigclick="jigclick"/>  <!-- 上下格式 -->
         <windowindex2 ref="window2" v-show="showWindowIndex[1]" @windowIndex="windowIndex" @jigclick="jigclick"/>  <!-- 上下格式 -->
         <windowindex3 ref="window3"  v-show="showWindowIndex[2]" @windowIndex="windowIndex" @jigclick="jigclick"/>  <!-- 上下格式 -->
      </div>
      <div class="blackSmallBox">
        <div class="son" v-for="(item,key) in dicomList" :key="key" @click="imgClcik(item.url,item.id)">
          <preview-dicom :imageId="item.url"></preview-dicom>
        </div>
      </div>
    </div>
    <div class="div right">
      <div class="info">
        <div class="infotitle">病人信息</div>
        <div class="li"><div style="width:40%;display:inline-block;text-align:center">病人ID</div><div style="width:60%;display:inline-block;text-align:center">{{row.patientId}}</div></div>
        <div class="li"><div style="width:40%;display:inline-block;text-align:center">姓名</div><div style="width:60%;display:inline-block;text-align:center">{{row.name}}</div></div>
        <div class="li"><div style="width:40%;display:inline-block;text-align:center">年龄</div><div style="width:60%;display:inline-block;text-align:center">{{row.age}}{{row.ageUnit}}</div></div>
        <div class="li"><div style="width:40%;display:inline-block;text-align:center">性别</div><div style="width:60%;display:inline-block;text-align:center">{{row.sex}}</div></div>
      </div>
      <div class="icon">
        <img src="../../static/images/print/1.png" />
        <img src="../../static/images/print/2.png" />
        <img src="../../static/images/print/3.png" />
        <img src="../../static/images/print/4.png" />
        <img src="../../static/images/print/5.png" />
        <img src="../../static/images/print/6.png" />
        <img src="../../static/images/print/7.png" />
        <img src="../../static/images/print/8.png" />
        <img src="../../static/images/print/9.png" />
        <img src="../../static/images/print/10.png" />
        <img src="../../static/images/print/11.png" />
        <img src="../../static/images/print/12.png" />
        <img src="../../static/images/print/13.png" />
      </div>
      <div class="rightForm">
        <el-form :model="searchForm">
      <el-row>
            <el-col >
              <el-form-item label="选择相机:">
                <el-select v-model="searchForm.printStatus" placeholder="请选择"  clearable class="el-input"  >
                  <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
              </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col >
              <el-form-item label="打印尺寸:">
                <el-select v-model="searchForm.printStatus" placeholder="请选择"  clearable class="el-input" >
                  <el-option  :key="index" v-for="(item,index) in sizeList" :label="item.name" :value="item.name" ></el-option>
              </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col >
              <el-form-item label="打印方向:">
                <el-select v-model="searchForm.printStatus" placeholder="请选择"  clearable class="el-input"  >
                  <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
              </el-select>
              </el-form-item>
            </el-col>
        </el-row>
      </el-form>
        <!-- <div class="btn">
          <el-button type="primary" @click="">照相</el-button>
        </div> -->
        <div class="btn">
          <el-button type="primary" @click="showSettings">打印设置</el-button>
        </div>
        <!-- <div class="btn">
          <el-button type="primary" @click="">关闭</el-button>
        </div> -->
      </div>
    </div>
    <div class="dialog">
        <el-dialog
          title="打印设置"
          :visible.sync="PrintDialogVisible"
          width="40%"
          center>
          <!-- 搜索条件-->
           <el-form :model="patientForm">
            <div class="patientSearch">
              <div class="title">病人查询</div>
              <el-row>
              <el-col :span="12">
                <el-form-item label="相机名称:">
                  <el-select v-model="patientForm.cname" placeholder="请选择"  clearable class="el-input"  >
                    <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button  @click="add">添  加</el-button>
              </el-col>
              <el-col :span="6">
                <el-button  @click="cancel">删  除</el-button>
              </el-col>
              </el-row>
            </div>
            <div class="patientSearch">
              <div class="title">相机通讯设置</div>
              <el-row>
              <el-col :span="12">
                <el-form-item label="相机名称:">
                  <el-select v-model="patientForm.cname" placeholder="请选择"  clearable class="el-input" >
                    <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="相机名称:">
                  <el-select v-model="patientForm.cname" placeholder="请选择"  clearable class="el-input" >
                    <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              </el-row>
              <el-row>
              <el-col :span="12">
                <el-form-item label="相机名称:">
                  <el-select v-model="patientForm.cname" placeholder="请选择"  clearable class="el-input" >
                    <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="相机名称:">
                  <el-select v-model="patientForm.cname" placeholder="请选择"  clearable class="el-input"  >
                    <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              </el-row>
            </div>
            <div class="patientSearch">
              <div class="title">相机通讯设置</div>
              <el-row>
              <el-col :span="12">
                <el-form-item label="相机名称:">
                  <el-select v-model="patientForm.cname" placeholder="请选择"  clearable class="el-input"  >
                    <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="相机名称:">
                  <el-select v-model="patientForm.cname" placeholder="请选择"  clearable class="el-input">
                    <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              </el-row>
              <el-row>
              <el-col :span="12">
                <el-form-item label="相机名称:">
                  <el-select v-model="patientForm.cname" placeholder="请选择"  clearable class="el-input"  >
                    <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="相机名称:">
                  <el-select v-model="patientForm.cname" placeholder="请选择"  clearable class="el-input" >
                    <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              </el-row>
            </div>
            <div class="patientSearch">
              <div class="title">病人查询</div>
              <el-row>
              <el-col :span="12">
                <el-form-item label="相机名称:">
                  <el-select v-model="patientForm.cname" placeholder="请选择"  clearable class="el-input" >
                    <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="相机名称:">
                  <el-select v-model="patientForm.cname" placeholder="请选择"  clearable class="el-input" >
                    <el-option  :key="index" v-for="(item,index) in cameraList" :label="item.name" :value="item.name" ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              </el-row>
            </div>
           </el-form>
           <div class="btn">
            <el-button type="primary" @click="saveInfo">保存设置</el-button>
            <el-button type="primary" @click="PrintDialogVisible=false">取消</el-button>
           </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import windowindex1 from './../components/window/windowindex2.vue';
import windowindex2 from './../components/window/windowindex3.vue';
import windowindex3 from './../components/window/windowindex4.vue';
import {formatDate} from "../common/js/date";
import page from './../components/table/Pagination.vue';
import previewDicom from 'Components/src/previewDicom'
import api from '../../config/website'
export default {
  components: {
    windowindex1,
    windowindex2,
    windowindex3,
    page,
    previewDicom
  },
  data() {
    return {
      ip:api,
      patientList:[
      ],
      searchForm:{
        patientId: '',
        name: '',
        arrivedDatetime: '',
        isImagePrinted: '',
        total:0,
        currentPage:0,
        page:0,
        size:20,
        pageSize:20,
      },
      PrintDialogVisible:false,
      printForm: {
        name: ''
      },
      patientForm:{
        cname:'',  //相机名称
      },
      showWindowIndex2: false,
      showWindowIndex3: false,
      showWindowIndex4: false,
      showWindowIndex:[
        false,false,false
      ],
      windowindex:'', // 左侧选择的窗口
      windowClickIndex: '',  // 左侧内部选择的窗口
      jigsawindex: '',  // 右侧选择的窗口
      sizeList:[   //尺寸列表
        {
          name: '8INX10IN',
        },
        {
          name: '10INX12IN',
        },
        {
          name: '10INX14IN',
        },
        {
          name: '11INX14IN',
        },
        {
          name: '14INX14IN',
        },
        {
          name: '14INX17IN',
        },
        {
          name: '24CMX24CM',
        },
        {
          name: '24CMX30CM',
        },
      ],
      cameraList: [],
      printStatusList: [{label:'未打印',value:'N'},{label:'已打印',value:'P'}],
      row:{},  //当前行的数据
      currentIndex: '', // 判断当前选择的li
      active:['active'],
      dicomList:[
        // {
        //   url:'http://127.0.0.1/testDICOM/CTStudy/3.719KB.DCM',
        // },
        // {
        //   url:'http://127.0.0.1/testDICOM/CTStudy/3.719KB.DCM',
        // },
        // {
        //   url:'http://127.0.0.1/testDICOM/CTStudy/test.dcm',
        // },
        // {
        //   url:'http://127.0.0.1/testDICOM/CTStudy/1.5191KB.DCM',
        // },
        // {
        //   url:'http://127.0.0.1/testDICOM/CTStudy/1.5191KB.DCM',
        // },
        // {
        //   url:'http://127.0.0.1/testDICOM/CTStudy/1.5191KB.DCM',
        // }
      ],
      saveurl: '',
      jigclickIndex:'',  // 右侧窗口内部点击的div
      xxooshow: true,    // 最大的div显示
      xxxxChange: 'big'  // big 默认右边栏第一个    small 表示显示右边栏其它的三个  
    }
  },
  created() {
    this.getPatientInfo({size:20});
  },
  computed: {
    xname :function (){
      return this.windowClickIndex +'_' + this.jigsawindex;
    }
  },
  methods: {
    showSettings() {
      console.log('[*]显示设置框');
      this.PrintDialogVisible = true;
    },
    selectWindow(index) {
      console.log('[*] window is -------', index)
      this.windowindex = index;
      this.xxxxChange = 'big';
      if( index === 0) {
        this.xxooshow = true;
        this.showWindowIndex = this.showWindowIndex.map((item) => {
          item = false;
          return item;
        });
        console.log('is',this.showWindowIndex)
      } else {
        this.xxooshow = false;
        this.showWindowIndex = this.showWindowIndex.map((item) => {
          item = false;
          return item;
        });
        this.showWindowIndex[index-1]  = true;
      }
    },
    selectJigsaw(index) {
      console.log('[*] jigsaw is -------', index)
      // 清除所有父窗口
      if(index === 0){
        this.xxxxChange = 'big';
        // 可以显示
        if(this.windowindex === 1){
          this.$refs.window1.pshow[this.windowClickIndex-1] = true;
          this.$refs.window1.changejigsawindex(this.windowClickIndex-1, -1);
        }else if(this.windowindex === 2){
          this.$refs.window2.pshow[this.windowClickIndex-1] = true;
          this.$refs.window2.changejigsawindex(this.windowClickIndex-1, -1);
        }else if(this.windowindex === 3){
          this.$refs.window3.pshow[this.windowClickIndex-1] = true;
          this.$refs.window3.changejigsawindex(this.windowClickIndex-1, -1);
        }
      }else{
        this.xxxxChange = 'small';
      if(this.windowindex === 1){
        this.$refs.window1.pshow[this.windowClickIndex-1] = false;
      }else if(this.windowindex === 2){
        this.$refs.window2.pshow[this.windowClickIndex-1] = false;
      }else if(this.windowindex === 3){
        this.$refs.window3.pshow[this.windowClickIndex -1] = false;
      }
      this.jigsawindex = index;
      if(this.windowClickIndex === ''){
         return false
      }else{
        if(this.windowindex ===1){
          this.$refs.window1.changejigsawindex(this.windowClickIndex-1, this.jigsawindex-1);
        }else if(this.windowindex === 2){
          this.$refs.window2.changejigsawindex(this.windowClickIndex-1, this.jigsawindex-1);
        } else if(this.windowindex ===3){
          this.$refs.window3.changejigsawindex(this.windowClickIndex-1, this.jigsawindex-1);
        }
      }
      }
    },
    windowIndex(index){
      console.log('[*] windowclcik is -------', index)
      //点击之后给个选中状态
      this.windowClickIndex = index;
    },
    saveInfo(){},  //保存信息
    okSearch(){
      console.log('[*] 病人信息参数------', this.searchForm);
      this.searchForm.page = 0;
      if(this.searchForm.arrivedDatetime !=''){
        var date = new Date(this.searchForm.arrivedDatetime);
        this.searchForm.arrivedDatetime = formatDate(date, "yyyy-MM-dd");
      }
      // 开始进行搜索
      this.getPatientInfo(this.searchForm)
    },  //搜索
    add(){},       //添加
    cancel(){},    //取消 
    getPatientInfo(params){
       // var params = {}
      // this.$http.post(this.ip + '/xhhms/rest/print/v1/queryRemotePatient', params,
      //   { headers: { 'X-AUTH-TOKEN': this.token }}
      // )
      this.$api.printPagequeryRemotePatient(params).then((res) => {
        var data = res;
        console.log('[*]==========', data)
        if (data.status == 1) {
          data.list.map(item=>{
            var date = new Date(item.arrivedDatetime);
            item.arrivedDatetime = formatDate(date, "yyyy-MM-dd");
            if(item.sex !== '' && item.sex == 1){
              item.sex = '女';
            } else if(item.sex !== '' && item.sex == 0){
              item.sex = '男';
            }
          })
          this.patientList =data.list;
          this.searchForm.total = data.total;
          this.searchForm.currentPage = data.page;
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
    handleIndexChange(val){  // 切换页码
      console.log('[*] 当前页数',val);
      this.searchForm.page = val;
      this.getPatientInfo(this.searchForm);
    },
    liclick(row, index){
      console.log('[*] 单击li！！', row);
      this.row = row;
      this.currentIndex = index;
      // 查询影像数据
      var params = {}
      params.id  = this.row.id;
      console.log('[*] params is ', params);
      // this.$http.post(this.ip + '/xhhms/rest/print/v1/queryPatientDicom', params,
      //   { headers: { 'X-AUTH-TOKEN': this.token }}
      // )
      this.$api.printPagequeryPatientDicom(params).then((res) => {
        var data = res;
        console.log('[*]影像数据==========', data)
        this.dicomList = [];
        if (data.status == 1) {
          if(data.data.length > 0) {
            data.data.map(item=>{
            let url = {};
            url.url = this.ip + '/xhhms/testDICOM/'+item.imagepat+'/'+item.objectfile;
            this.dicomList.push(url);
          })
            console.log('[*] 当前打印-----', this.dicomList);
          }
        }else {
          this.$message({
            showClose: true,
            message: '当前病人没有影像！！',
            type: 'error'
          });
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
    imgClcik(url, id){
      console.log('[*] 当前点击的图片+++++', url);
      // this.$refs.window2.imgurl  = url;
      var id = id;  // 当前影像id
      var url = `wadouri:`+url; // 当前影像路径
      console.log('[*] 当前点击的窗口', this.windowClickIndex);
      if(this.windowindex == 0 || this.windowindex ==''){
          this.$refs.xxoo.loadAndViewImage(url);
      }
      // 没有小窗口时    xxxxxx
      console.log('[*] 这里应该是没有小窗口的时候-----',this.xxxxChange);
      if(this.windowClickIndex && this.xxxxChange === 'big'){
        if(this.windowindex == 1){
           if(this.windowClickIndex == 1){
            this.$refs.window1.$refs.p1.loadAndViewImage(url);
          }else if(this.windowClickIndex == 2){
            this.$refs.window1.$refs.p2.loadAndViewImage(url);
          }
        }
        if(this.windowindex == 2){
           if(this.windowClickIndex == 1){
            this.$refs.window2.$refs.p1.loadAndViewImage(url);
          }else if(this.windowClickIndex == 2){
            this.$refs.window2.$refs.p2.loadAndViewImage(url);
          }
        }
        if(this.windowindex == 3){
           if(this.windowClickIndex == 1){
            this.$refs.window3.$refs.p1.loadAndViewImage(url);
          }else if(this.windowClickIndex == 2){
            this.$refs.window3.$refs.p2.loadAndViewImage(url);
          }else if(this.windowClickIndex == 3){
            this.$refs.window3.$refs.p3.loadAndViewImage(url);
          }else{
            this.$refs.window3.$refs.p4.loadAndViewImage(url);
          }
        }
      }else{
        console.log('左侧当前选中的是哪个窗格+++', this.windowindex);
        console.log('左侧内部当前选中的是哪个窗格+++', this.windowClickIndex);
        console.log('右侧当前选中的是哪个窗格+++', this.jigsawindex);
        console.log('内部当前选中的是哪个窗格+++', this.jigclickIndex);
         if(this.windowindex == 1) {  // 横格
           if(this.windowClickIndex === 1){ // 第一个windowindexson
             if(this.jigsawindex === 2){   // 第一个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window1.$refs.jig1_2.$refs.p1.loadAndViewImage(url);
               }else if( this.jigclickIndex === 2){
                 this.$refs.window1.$refs.jig1_2.$refs.p2.loadAndViewImage(url);
               }
             }
             // 第二个窗口
            if(this.jigsawindex === 3){  // 第二个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window1.$refs.jig1_3.$refs.p1.loadAndViewImage(url);
               }
              if( this.jigclickIndex === 2){
                 this.$refs.window1.$refs.jig1_3.$refs.p2.loadAndViewImage(url);
               }
             }
            if(this.jigsawindex === 4){  // 第三个jigsawindex
              if( this.jigclickIndex === 1){
                this.$refs.window1.$refs.jig1_4.$refs.p1.loadAndViewImage(url);
              }else if( this.jigclickIndex === 2){
                this.$refs.window1.$refs.jig1_4.$refs.p2.loadAndViewImage(url);
              }else if(this.jigclickIndex === 3){
                this.$refs.window1.$refs.jig1_4.$refs.p3.loadAndViewImage(url);
              }else if(this.jigclickIndex === 4){
                this.$refs.window1.$refs.jig1_4.$refs.p4.loadAndViewImage(url);
              }
            }
           }else if(this.windowClickIndex === 2){
             if(this.jigsawindex === 2){   // 第一个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window1.$refs.jig2_2.$refs.p1.loadAndViewImage(url);
               }else if( this.jigclickIndex === 2){
                 this.$refs.window1.$refs.jig2_2.$refs.p2.loadAndViewImage(url);
               }
             }
             // 第二个窗口
            if(this.jigsawindex === 3){  // 第二个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window1.$refs.jig2_3.$refs.p1.loadAndViewImage(url);
               }
              if( this.jigclickIndex === 2){
                 this.$refs.window1.$refs.jig2_3.$refs.p2.loadAndViewImage(url);
               }
             }
            if(this.jigsawindex === 4){  // 第三个jigsawindex
              if( this.jigclickIndex === 1){
                this.$refs.window1.$refs.jig2_4.$refs.p1.loadAndViewImage(url);
              }else if( this.jigclickIndex === 2){
                this.$refs.window1.$refs.jig2_4.$refs.p2.loadAndViewImage(url);
              }else if(this.jigclickIndex === 3){
                this.$refs.window1.$refs.jig2_4.$refs.p3.loadAndViewImage(url);
              }else if(this.jigclickIndex === 4){
                this.$refs.window1.$refs.jig2_4.$refs.p4.loadAndViewImage(url);
              }
            }
           }
          }else if(this.windowindex == 2){ // 竖格
            if(this.windowClickIndex === 1){ // 第一个windowindexson
             if(this.jigsawindex === 2){   // 第一个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window2.$refs.jig1_2.$refs.p1.loadAndViewImage(url);
               }else if( this.jigclickIndex === 2){
                 this.$refs.window2.$refs.jig1_2.$refs.p2.loadAndViewImage(url);
               }
             }
             // 第二个窗口
            if(this.jigsawindex === 3){  // 第二个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window2.$refs.jig1_3.$refs.p1.loadAndViewImage(url);
               }
              if( this.jigclickIndex === 2){
                 this.$refs.window2.$refs.jig1_3.$refs.p2.loadAndViewImage(url);
               }
             }
            if(this.jigsawindex === 4){  // 第三个jigsawindex
              if( this.jigclickIndex === 1){
                this.$refs.window2.$refs.jig1_4.$refs.p1.loadAndViewImage(url);
              }else if( this.jigclickIndex === 2){
                this.$refs.window2.$refs.jig1_4.$refs.p2.loadAndViewImage(url);
              }else if(this.jigclickIndex === 3){
                this.$refs.window2.$refs.jig1_4.$refs.p3.loadAndViewImage(url);
              }else if(this.jigclickIndex === 4){
                this.$refs.window2.$refs.jig1_4.$refs.p4.loadAndViewImage(url);
              }
            }
           }else if(this.windowClickIndex === 2){
             if(this.jigsawindex === 2){   // 第一个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window2.$refs.jig2_2.$refs.p1.loadAndViewImage(url);
               }else if( this.jigclickIndex === 2){
                 this.$refs.window2.$refs.jig2_2.$refs.p2.loadAndViewImage(url);
               }
             }
             // 第二个窗口
            if(this.jigsawindex === 3){  // 第二个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window2.$refs.jig2_3.$refs.p1.loadAndViewImage(url);
               }
              if( this.jigclickIndex === 2){
                 this.$refs.window2.$refs.jig2_3.$refs.p2.loadAndViewImage(url);
               }
             }
            if(this.jigsawindex === 4){  // 第三个jigsawindex
              if( this.jigclickIndex === 1){
                this.$refs.window2.$refs.jig2_4.$refs.p1.loadAndViewImage(url);
              }else if( this.jigclickIndex === 2){
                this.$refs.window2.$refs.jig2_4.$refs.p2.loadAndViewImage(url);
              }else if(this.jigclickIndex === 3){
                this.$refs.window2.$refs.jig2_4.$refs.p3.loadAndViewImage(url);
              }else if(this.jigclickIndex === 4){
                this.$refs.window2.$refs.jig2_4.$refs.p4.loadAndViewImage(url);
              }
            }
           }
          }else if(this.windowindex == 3){  // 田字格
            if(this.windowClickIndex === 1){ // 第一个windowindexson
             if(this.jigsawindex === 2){   // 第一个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window3.$refs.jig1_2.$refs.p1.loadAndViewImage(url);
               }else if( this.jigclickIndex === 2){
                 this.$refs.window3.$refs.jig1_2.$refs.p2.loadAndViewImage(url);
               }
             }
             // 第二个窗口
            if(this.jigsawindex === 3){  // 第二个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window3.$refs.jig1_3.$refs.p1.loadAndViewImage(url);
               }
              if( this.jigclickIndex === 2){
                 this.$refs.window3.$refs.jig1_3.$refs.p2.loadAndViewImage(url);
               }
             }
            if(this.jigsawindex === 4){  // 第三个jigsawindex
              if( this.jigclickIndex === 1){
                this.$refs.window3.$refs.jig1_4.$refs.p1.loadAndViewImage(url);
              }else if( this.jigclickIndex === 2){
                this.$refs.window3.$refs.jig1_4.$refs.p2.loadAndViewImage(url);
              }else if(this.jigclickIndex === 3){
                this.$refs.window3.$refs.jig1_4.$refs.p3.loadAndViewImage(url);
              }else if(this.jigclickIndex === 4){
                this.$refs.window3.$refs.jig1_4.$refs.p4.loadAndViewImage(url);
              }
            }
           }else if(this.windowClickIndex === 2){
             if(this.jigsawindex === 2){   // 第一个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window3.$refs.jig2_2.$refs.p1.loadAndViewImage(url);
               }else if( this.jigclickIndex === 2){
                 this.$refs.window3.$refs.jig2_2.$refs.p2.loadAndViewImage(url);
               }
             }
             // 第二个窗口
            if(this.jigsawindex === 3){  // 第二个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window3.$refs.jig2_3.$refs.p1.loadAndViewImage(url);
               }
              if( this.jigclickIndex === 2){
                 this.$refs.window3.$refs.jig2_3.$refs.p2.loadAndViewImage(url);
               }
             }
            if(this.jigsawindex === 4){  // 第三个jigsawindex
              if( this.jigclickIndex === 1){
                this.$refs.window3.$refs.jig2_4.$refs.p1.loadAndViewImage(url);
              }else if( this.jigclickIndex === 2){
                this.$refs.window3.$refs.jig2_4.$refs.p2.loadAndViewImage(url);
              }else if(this.jigclickIndex === 3){
                this.$refs.window3.$refs.jig2_4.$refs.p3.loadAndViewImage(url);
              }else if(this.jigclickIndex === 4){
                this.$refs.window3.$refs.jig2_4.$refs.p4.loadAndViewImage(url);
              }
            }
           }else if(this.windowClickIndex === 3){
             if(this.jigsawindex === 2){   // 第一个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window3.$refs.jig2_2.$refs.p1.loadAndViewImage(url);
               }else if( this.jigclickIndex === 2){
                 this.$refs.window3.$refs.jig2_2.$refs.p2.loadAndViewImage(url);
               }
             }
             // 第二个窗口
            if(this.jigsawindex === 3){  // 第二个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window3.$refs.jig3_3.$refs.p1.loadAndViewImage(url);
               }
              if( this.jigclickIndex === 2){
                 this.$refs.window3.$refs.jig3_3.$refs.p2.loadAndViewImage(url);
               }
             }
            if(this.jigsawindex === 4){  // 第三个jigsawindex
              if( this.jigclickIndex === 1){
                this.$refs.window3.$refs.jig3_4.$refs.p1.loadAndViewImage(url);
              }else if( this.jigclickIndex === 2){
                this.$refs.window3.$refs.jig3_4.$refs.p2.loadAndViewImage(url);
              }else if(this.jigclickIndex === 3){
                this.$refs.window3.$refs.jig3_4.$refs.p3.loadAndViewImage(url);
              }else if(this.jigclickIndex === 4){
                this.$refs.window3.$refs.jig3_4.$refs.p4.loadAndViewImage(url);
              }
            }
           }else if(this.windowClickIndex === 4){
             if(this.jigsawindex === 2){   // 第一个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window3.$refs.jig4_2.$refs.p1.loadAndViewImage(url);
               }else if( this.jigclickIndex === 2){
                 this.$refs.window3.$refs.jig4_2.$refs.p2.loadAndViewImage(url);
               }
             }
             // 第二个窗口
            if(this.jigsawindex === 3){  // 第二个jigsawindex
               if( this.jigclickIndex === 1){
                 this.$refs.window3.$refs.jig4_3.$refs.p1.loadAndViewImage(url);
               }
              if( this.jigclickIndex === 2){
                 this.$refs.window3.$refs.jig4_3.$refs.p2.loadAndViewImage(url);
               }
             }
            if(this.jigsawindex === 4){  // 第三个jigsawindex
              if( this.jigclickIndex === 1){
                this.$refs.window3.$refs.jig4_4.$refs.p1.loadAndViewImage(url);
              }else if( this.jigclickIndex === 2){
                this.$refs.window3.$refs.jig4_4.$refs.p2.loadAndViewImage(url);
              }else if(this.jigclickIndex === 3){
                this.$refs.window3.$refs.jig4_4.$refs.p3.loadAndViewImage(url);
              }else if(this.jigclickIndex === 4){
                this.$refs.window3.$refs.jig4_4.$refs.p4.loadAndViewImage(url);
              }
            }
           }
          } 
        }
    },
    jigclick(val){
      this.jigclickIndex = val;
      console.log(this.jigclickIndex);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">


#container {
  width: 100%;
  background-color: #d4d4d4;
  // overflow: auto;
  padding-top:20px;
  min-width:1500px;
  height:100vh;
  min-height:970px;
  .div{
    float:left
  }
  .left{
    width:20%;
    .table{
      height:600px;
      max-height:500px;
      overflow-y:auto;
      border:1px solid #9d9e9f;
      color:#606266;
      .title{
        width:32%;
        display:inline-block;
        font-size:12px;
        text-align:center;
      }
    }
    .table li{
        height:30px;
        line-height:30px;
      }
      .table li:first-child{
        background-color:#9d9e9f;
      }
      .table li:hover{
        background-color:#9d9e9f;
      }
    .psearch{
      margin-top:40px;
      min-height:200px;
      border:1px solid #9d9e9f;
      color:#606266
      .psearchTitle{
          width:30%;
          height:20px;
          line-height:20px;
          margin:-10px auto;
          background-color:#d4d4d4;
          text-align:center;
        }
      .searchForm{
        margin:20px 0px;
        .btn{
          width:40%;
          margin:10px auto;
          min-width:200px;
        }
        .el-button{
          width:80px;
          margin-left:30%;
        } 
      }
     
    } 
  }
  .middle{
    width:60%;
    height:400px;
    // background-color:white;
    .header{
      height:160px;
      .box_f{
        width:45%;
        height:140px;
        border:1px solid #9d9e9f;
        margin-top:10px;
        margin-left:3%;
        display:inline-block;
        color:#606266
        .title{
          width:30%;
          height:20px;
          line-height:20px;
          margin:-10px auto;
          background-color:#d4d4d4;
          text-align:center;
        }
        .box_f_s{
          width:20%;
          height:100px;
          border:2px solid #9d9e9f;
          display:inline-block;
          margin-top:16px;
          margin-left:3%;
          .bottom{
            width:50%;
          }
        }
      }
    }
    .blackBox{
      width:93%;
      height:600px;
      background-color:black;
      margin:0 auto;
    }
    .blackSmallBox{
      width:93%;
      height:140px;
      margin: 20px auto;
      white-space:nowrap;
      // min-width:1000px;
      overflow-x:auto;
      overflow-y:hidden;
      .son{
        width:16%;
        height:140px;
        background-color:black;
        margin-right:0.2%;
        display:inline-block;
      }
    }
  }
  .right{
    width:19%;
    // background-color:yellow;
    .info{
      width:100%;
      height:200px;
      margin-top:10px;
      border:1px solid #9d9e9f;
      color:#606266
      .infotitle{
          width:30%;
          height:20px;
          line-height:20px;
          margin:-10px auto;
          background-color:#d4d4d4;
          text-align:center;
      }
      .li{
        height:40px;
        line-height:40px;
        margin:10px 0px;
        font-size:12px; 
      }
    }
    .icon img{
      margin:14px 4%;
      cursor:pointer;
    }
    .btn{
      width:40%;
      margin:60px auto;
      min-width:200px;
    }
    .rightForm{
      margin-top:20px;
    }
  }
  .dialog .patientSearch{
    width:90%;
    margin:20px auto;
    border:1px solid #9d9e9f;
    .title{
        width:30%;
        height:20px;
        line-height:20px;
        margin:-10px auto;
        background-color:#d4d4d4;
        text-align:center;
    }
  }
  .dialog .btn{
    width:50%;
    margin:0 auto;
  }
  .active{
    background-color:#9d9e9f;
  }
}

</style>
<style>
.psearch .searchForm .el-form-item__content{
   width: 68% !important;
   float:left;
}
.psearch .searchForm  .el-form-item__label{
  width: 20% !important;
  min-width: 80px;
  font-size: 12px;
}
.psearch .searchForm .el-input{
  width:100%;
}
.psearch .searchForm .el-form{
  width:100%;
}
.right .rightForm .el-input{
  width:100%;
}
.right .rightForm .el-form-item{
  margin-bottom: 0px;
}
.right .rightForm .el-form-item__label{
  font-size: 12px;
}
.right .btn .el-button{
  width:100%;
}
.dialog .el-dialog__header{
  background-color:#9d9e9f;
}
.dialog .el-select{
  width:60%;
}
.dialog .el-form-item{
  margin-left:4px;
  margin-top:10px;
  margin-bottom:4px;
}
.dialog .patientSearch .el-button{
  width:80%;
  margin-top:10px;
  background-color: #9d9e9f;
}
.dialog .patientSearch .el-row{
  margin-bottom: 10px;
}
.dialog .btn .el-button{
  width: 45%;
}
.banner .swiper-slide{
  width:16% !important;
}
</style>
