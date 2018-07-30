<template>
<div class="content_main">
<centerNav v-on:Active="active"  :state="state"  :getChoiceList="getChoiceList"  :getDATAList="getDATAList" :isUpdate="isUpdate" :isAdd="isAdd"  :addFatherType="addFatherType" :isAddType="isOpen"  :isAddSelect="SelectIsOpen"/>
<!-- 可以展开 -->
<div class="content-table" v-if="isOpen"> 
 <tree-grid  ref="tableTree" :columns="state.hospitalColums" @handleRowClick='RowClick' :tree-structure="true" :otherHeight = 'otherHeight' :data-source="state.hospitalList"></tree-grid>
</div>  
<!--不可以展开 -->
<div class="content-table" v-else>
<Table 
ref="Table"
:list='state.hospitalList'
:columns='state.hospitalColums'
:otherHeight = 'otherHeight'
@handleSelectionChange='handleSelectionChange'
@handleIndexChange='handleIndexChange'
@handleRowClick='handleRowClick'
:thisdata='thisdata'
></Table>
</div>
<div class="pagination">
<pagination :pageSize="pageSize"
:currentPage = "state.hospitalPage"
:total = "state.hospitalTotal"
@handleIndexChange = "handleIndexChange"
@handleSizeChange = "handleSizeChange"
></pagination>
</div>

<!--类型管理-->

<!-- *********************弹框************************************** -->
<!--设备管理类型-->
<div>
<el-dialog
:title="this.tilte"
:visible.sync="dialogVisible"
:item="state.thisdata"
width="35%"
:before-close="handleClose"
center
>
<el-form ref="thisdata" :model="thisdata" label-width="80px">
  <el-form-item label="代码:">
    <el-input v-model="thisdata.code"></el-input>
  </el-form-item>
  <el-form-item label="名称:">
    <el-input v-model="thisdata.name"></el-input>
  </el-form-item>
   <el-form-item label="拼音:">
    <el-input v-model="thisdata.spelling"></el-input>
  </el-form-item>
  <el-form-item label="备注:">
    <el-input type="textarea" v-model="thisdata.memo"></el-input>
  </el-form-item>
</el-form>
<span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible = false">取 消</el-button>
<el-button type="primary" @click="submitData">确 定</el-button>
</span>
</el-dialog>
</div>




<!-- 设备管理-->
<div>
<el-dialog
:title="this.tilte"
:visible.sync="dialogVisible1"
width="35%"
:before-close="handleClose"
center
>
<el-form ref="thisdata" :model="thisdata" label-width="80px">
  <el-form-item label="名称:">
    <el-input v-model="thisdata.name"></el-input>
  </el-form-item>
   <el-form-item label="编码:">
    <el-input v-model="thisdata.code"></el-input>
  </el-form-item>
   <el-form-item label="拼音:">
    <el-input v-model="thisdata.spelling"></el-input>
  </el-form-item>
   <el-form-item label="房间:">
    <el-input v-model="thisdata.room"></el-input>
  </el-form-item>
  <el-form-item label="产地:">
    <el-input v-model="thisdata.productLocation"></el-input>
  </el-form-item>
  <el-form-item label="维护人员:">
    <el-input v-model="thisdata.maintainPerson"></el-input>
  </el-form-item>
   <el-form-item label="手机号:">
    <el-input v-model="thisdata.maintainTel"></el-input>
  </el-form-item>
  <el-form-item label="IP地址:">
    <el-input v-model="thisdata.ip"></el-input>
  </el-form-item>
  <el-form-item label="生产商:">
    <el-input v-model="thisdata.factory"></el-input>
  </el-form-item>
  <el-form-item label="类型选择:">
    <el-select v-model="thisdata.deviceType" placeholder="请选择类型" >
        <el-option
        v-for="item in objlist"
        :key="item.id"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="备注:">
    <el-input type="textarea" v-model="thisdata.memo"></el-input>
  </el-form-item>
</el-form>

<span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible1 = false">取 消</el-button>
<el-button type="primary" @click="submitData">确 定</el-button>
</span>
</el-dialog>
</div>



<!-- 检查模板-->
<div>
<el-dialog
:title="this.tilte"
:visible.sync="dialogVisible3"
width="35%"
:before-close="handleClose"
center
>
<el-form ref="thisdata" :model="thisdata" label-width="80px">
  <el-form-item label="代码:">
  <el-input v-model="thisdata.code"></el-input>
  </el-form-item>
  <el-form-item label="名称:">
    <el-input v-model="thisdata.name"></el-input>
  </el-form-item>
   <el-form-item label="拼音:">
    <el-input v-model="thisdata.spelling"></el-input>
  </el-form-item>
   <el-form-item label="检查项目:">
    <el-select v-model="thisdata.checkItem" placeholder="请选择" >
        <el-option
        v-for="item in Projectlist"
        :key="item.id"
        :label="item.name"
        :value="item.name">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="检查科室:">
      <el-select v-model="thisdata.department" placeholder="请选择" >
        <el-option
        v-for="item in departmentlist"
        :key="item.id"
        :label="item.departname"
        :value="item.departname">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="设备类型:">
     <el-select v-model="thisdata.deviceType" placeholder="请选择类型" >
        <el-option
        v-for="item in objlist"
        :key="item.id"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="检查设备:">
      <el-select v-model="thisdata.device" placeholder="请选择" >
        <el-option
        v-for="item in equipmentlist"
        :key="item.id"
        :label="item.name"
        :value="item.name">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="收费:">
    <el-input v-model="thisdata.charge"></el-input>
  </el-form-item>
  <el-form-item label="备注:">
    <el-input type="textarea" v-model="thisdata.memo"></el-input>
  </el-form-item>
</el-form>

<span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible3 = false">取 消</el-button>
<el-button type="primary" @click="submitData">确 定</el-button>
</span>
</el-dialog>
</div>

<!--检查部位管理-->
<div>
<el-dialog
:title="this.tilte"
:visible.sync="dialogVisible2"
:item="state.thisdata"
width="35%"
:before-close="handleClose"
center
>

<el-form ref="thisdata" :model="thisdata" label-width="80px">
  <el-form-item label="名称:">
    <el-input v-model="thisdata.name"></el-input>
  </el-form-item>
   <el-form-item label="编码:">
    <el-input v-model="thisdata.code"></el-input>
  </el-form-item>
   <el-form-item label="拼音:">
    <el-input v-model="thisdata.spelling"></el-input>
  </el-form-item>
  <el-form-item label="类型选择:">
    <el-select v-model="thisdata.deviceType" placeholder="请选择类型" >
        <el-option
        v-for="item in Typelist"
        :key="item.id"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="备注:">
    <el-input type="textarea" v-model="thisdata.memo"></el-input>
  </el-form-item>
</el-form>
<span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible2 = false">取 消</el-button>
<el-button type="primary" @click="submitData">确 定</el-button>
</span>
</el-dialog>
</div>


<!--疾病管理-->
<div>
<el-dialog
:title="this.tilte"
:visible.sync="dialogVisible4"
:item="state.thisdata"
width="35%"
:before-close="handleClose"
center
>
<el-form ref="thisdata" :model="thisdata" label-width="80px">
  <el-form-item label="名称:">
    <el-input v-model="thisdata.name"></el-input>
  </el-form-item>
   <el-form-item label="拼音:">
    <el-input v-model="thisdata.spelling"></el-input>
  </el-form-item>
  <el-form-item label="英文名:">
    <el-input v-model="thisdata.ename"></el-input>
  </el-form-item>
  <el-form-item label="编码:">
    <el-input v-model="thisdata.code"></el-input>
  </el-form-item>
</el-form>
<span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible4 = false">取 消</el-button>
<el-button type="primary" @click="submitData">确 定</el-button>
</span>
</el-dialog>
</div>



<!--病人类型-->
<div>
<el-dialog
:title="this.tilte"
:visible.sync="dialogVisible5"
:item="state.thisdata"
width="35%"
:before-close="handleClose"
>
<el-form ref="thisdata" :model="thisdata" label-width="80px">
  <el-form-item label="代码:">
    <el-input v-model="thisdata.code"></el-input>
  </el-form-item>
  <el-form-item label="名称:">
    <el-input v-model="thisdata.name"></el-input>
  </el-form-item>
   <el-form-item label="拼音:">
    <el-input v-model="thisdata.spelling"></el-input>
  </el-form-item>
  <el-form-item label="关联号码:">
    <el-input v-model="thisdata.associate"></el-input>
  </el-form-item>
  <el-form-item label="是否急诊:">
    <el-select v-model="thisdata.emergency" placeholder="请选择" >
        <el-option label="是" value="是"></el-option>
        <el-option label="否" value="否"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="备注:">
    <el-input type="textarea" v-model="thisdata.memo"></el-input>
  </el-form-item>
</el-form>
<span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible5 = false">取 消</el-button>
<el-button type="primary" @click="submitData">确 定</el-button>
</span>
</el-dialog>
</div>




<!--纸张管理-->
<div>
<el-dialog
:title="this.tilte"
:visible.sync="dialogVisible6"
:item="state.thisdata"
width="35%"
:before-close="handleClose"
center
>
<el-form ref="thisdata" :model="thisdata" label-width="80px">
  <el-form-item label="纸张名称:">
    <el-input v-model="thisdata.name"></el-input>
  </el-form-item>
  <el-form-item label="宽度:">
    <el-input v-model="thisdata.paperWidth"></el-input>
  </el-form-item>
  <el-form-item label="高度:">
    <el-input v-model="thisdata.paperHeight"></el-input>
  </el-form-item>
  <el-form-item label="纸张来源:">
       <el-select v-model="thisdata.paperResoure" placeholder="请选择" >
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="纸张描述:">
    <el-input v-model="thisdata.description"></el-input>
  </el-form-item>
  <el-form-item label="默认纸张:">
    <el-select v-model="thisdata.defaultPaper"  placeholder="请选择" >
        <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
  </el-form-item>
</el-form>
<span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible6 = false">取 消</el-button>
<el-button type="primary" @click="submitData">确 定</el-button>
</span>
</el-dialog>
</div>


<!--摄影体位-->
<div>
<el-dialog
:title="this.tilte"
:visible.sync="dialogVisible7"
:item="state.thisdata"
width="35%"
:before-close="handleClose"
center
>
<el-form ref="thisdata" :model="thisdata" label-width="80px">
  <el-form-item label="编号:">
    <el-input v-model="thisdata.code"></el-input>
  </el-form-item>
  <el-form-item label="名称:">
    <el-input v-model="thisdata.name"></el-input>
  </el-form-item>
  <el-form-item label="拼音:">
    <el-input v-model="thisdata.spelling"></el-input>
  </el-form-item>
  <el-form-item label="设备类型:">
     <el-select v-model="thisdata.deviceType" placeholder="请选择类型" >
        <el-option
        v-for="item in objlist"
        :key="item.id"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="备注:">
    <el-input type="textarea" v-model="thisdata.memo"></el-input>
  </el-form-item>
</el-form>
<span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible7 = false">取 消</el-button>
<el-button type="primary" @click="submitData">确 定</el-button>
</span>
</el-dialog>
</div>


</div>
</template>

<script>
import { mapState } from "vuex";
import centerNav from "./../components/MyTilte.vue";
import pagination from "./../components/table/Pagination.vue";
import Table from "./../components/table/Table.vue";

import TreeGrid from "./../components/treeTable/vue/TreeGrid.vue";
import selects from "./MySelect.vue";
import bottomNav from "./../components/BottomNav.vue";
import inputs from "./Input.vue";

export default {
  components: {
    centerNav,
    bottomNav,
    Table,
    selects,
    pagination,
    inputs,
    TreeGrid
  },
  props: ["state", "getChoiceList", "getDATAList", "addObjectdata", "isOpen", "SelectIsOpen", "objlist" ],
  data() {
    return {
      otherHeight: 170,
      thisdata: {},
      datalist:{},
      optionlsit: {},
      Typelist:[],
      pageSize: 10,
      dialogVisible1: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,
      dialogVisible6: false,
      dialogVisible7: false,
      tilte: "",
      Projectlist: [],
      departmentlist: [], 
      equipmentlist:[],
      isaddClick: false,
      ip: this.CONSTANT.CONSTANT.WEB_URL,
      type: 0,
      options: [{
          value: 0,
          label: '系统默认'
        }, {
          value: 1,
          label: '用户自定义'
        }],
    };
  },
  methods: {
    // 切换页码
    handleIndexChange(val) {
      this.$emit("handleIndexChange", val);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit("handleSizeChange", val);
    },
    // 选中行
    handleSelectionChange(val) {},
    // 点击行 保存thisdata

    handleRowClick(row) {
      this.thisdata = Object.assign({}, row);
      this.state.thisdata = row;
    },

    //清空thisdata 数据
    clearThisdata() {
      console.log('1111111111')
      this.thisdata = {};
      this.state.thisdata = {};
    },

    active(str) {
      console.log(str);
      this.$emit("statusClick", str);
    },

    //修改点击事件
    isUpdate() {
      this.type = 0;
      this.thisdata = Object.assign({}, this.state.thisdata);
      const tiltes = this.state.obje.tilte;
      console.log("-----------------jiancha -------", this.thisdata);
      if (!this.thisdata.id) {
        this.$message({
          showClose:true,
          message: "请选择一个要修改的信息",
          type: "warning"
        });
      } else {
        if (tiltes == "设备") {
          this.dialogVisible1 = true;
          this.tilte = "修改" + tiltes + "信息";
        } else if (tiltes == "检查部位") {
          this.tilte = "修改" + tiltes + "信息";
          this.dialogVisible = true;
          this.getlist(this.state.obje.relationUrl + "/v1/getlist");
        } else if (tiltes == "检查模板") {
          this.tilte = "修改" + tiltes + "信息";
          this.dialogVisible3 = true;
          this.getProjectlist(this.state.obje.projectUrl + "/v1/getlist");
          this.getDepartmentlist(this.state.obje.departmentUrl);
          this.getEquipmentlist(this.state.obje.equipmentUrl +"/v1/getlist");
        } else if (tiltes == "病人类型") {
          this.tilte = "修改" + tiltes + "信息";
          this.dialogVisible5 = true;

        } else if (tiltes == "疾病") {
          this.tilte = "修改" + tiltes + "信息";
          if(this.isaddClick == true){
            this.isaddClick =false;
            this.thisdata=this.datalist;
          }
          this.dialogVisible4 = true;
        } else if (tiltes == "纸张配置") {
          this.tilte = "修改" + tiltes + "信息";
          this.dialogVisible6 = true;
        }else if (tiltes == "摄影方向") {
          this.tilte = "修改" + tiltes + "信息";
          this.dialogVisible2 = true;
        } else if (tiltes == "摄影体位") {
          this.tilte = "修改" + tiltes + "信息";
          this.dialogVisible7 = true;
        } else {
          this.tilte = "修改" + tiltes + "信息";
          this.dialogVisible = true;
        }
      }
      // // 清空数据
      // this.thisdata = []; 
    },

    //添加点击事件
    isAdd() {
      this.type = 1;
      const tiltes = this.state.obje.tilte;
      if (tiltes != "疾病") {
        this.thisdata = {};
        this.state.thisdata = {};
        this.$refs.Table.setCurrentRow();
        this.addIsBisease(tiltes);
      } else {
        if (!this.thisdata.id) {
          this.$message({
            showClose: true,
            message: "请选择一个要添加的信息类型",
            type: "warning"
          });
        } else {
          this.addIsBisease(tiltes);
        }
      }
    },

    addIsBisease(tiltes) {
      if (tiltes == "设备") {
        this.dialogVisible1 = true;
        this.tilte = "添加" + tiltes + "信息";
      } else if (tiltes == "检查部位") {
        this.tilte = "添加" + tiltes + "信息";
        this.dialogVisible2 = true;
        this.getlist(this.state.obje.relationUrl + "/v1/getlist");
      } else if (tiltes == "检查模板") {
        this.tilte = "添加" + tiltes + "信息";
        this.dialogVisible3 = true;
        this.getProjectlist(this.state.obje.projectUrl + "/v1/getlist");
        this.getDepartmentlist(this.state.obje.departmentUrl);
        this.getEquipmentlist(this.state.obje.equipmentUrl +"/v1/getlist");
      } else if (tiltes == "病人类型") {
        this.tilte = "添加" + tiltes + "信息";
        this.dialogVisible5 = true;
      } else if (tiltes == "疾病") {
        this.tilte = "添加" + tiltes + "信息";
        this.datalist=this.thisdata;
        this.isaddClick=true;
        this.thisdata = {};
        this.state.thisdata = {};
        this.thisdata.id=this.datalist.id;
        this.state.thisdata.id=this.datalist.id;
        this.dialogVisible4 = true;
      } else if (tiltes == "纸张配置") {
        this.tilte = "添加" + tiltes + "信息";
        this.dialogVisible6 = true;
      }else if (tiltes == "摄影方向") {
          this.tilte = "添加" + tiltes + "信息";
          this.dialogVisible2 = true;
      }else if (tiltes == "摄影体位") {
          this.tilte = "添加" + tiltes + "信息";
          this.dialogVisible7 = true;
      } else {
        this.tilte = "添加" + tiltes + "信息";
        this.dialogVisible = true;
      }
    },

    addFatherType() {
      this.type = 1;
      const tiltes = this.state.obje.tilte;
      this.thisdata = {};
      this.state.thisdata = {};
      this.$refs.tableTree.setCurrentRow();
      this.tilte = "添加" + tiltes + "信息";
      this.dialogVisible4 = true;
      this.getlist(this.state.obje.relationUrl + "/v1/getlist");
    },
  
    handleClose(done) {
      this.state.dialogVisible = false;
      done();
    },
    
    getlist(url) {
      console.log("JINLAI");
      this.$http
        .post(this.ip + url, { headers: { "X-AUTH-TOKEN": this.token } })
        .then(res => {
          console.log(res);
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log("---------------" + data.data);
            this.objlist = data.data;
          } else {
            return false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // **********************  检查模版  **********************//
     getProjectlist(url) {  //获取检查项目列表
      console.log("JINLAI");
      this.$http
        .post(this.ip + url, { headers: { "X-AUTH-TOKEN": this.token } })
        .then(res => {
          console.log(res);
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log("---------------" + data.data);
            this.Projectlist = data.data;
          } else {
            return false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    getDepartmentlist(url) {  //获取检查科室列表
      console.log("JINLAI");
      this.$http
        .post(this.ip + url, { headers: { "X-AUTH-TOKEN": this.token } })
        .then(res => {
          console.log(res);
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log("---------------" + data.data);
            this.departmentlist = data.data;
          } else {
            return false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

     getEquipmentlist(url) {  //获取检查设备列表
      console.log("JINLAI");
      this.$http
        .post(this.ip + url, { headers: { "X-AUTH-TOKEN": this.token } })
        .then(res => {
          console.log(res);
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log("---------------" + data.data);
            this.equipmentlist = data.data;
          } else {
            return false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //展开table 点击事件
    RowClick(row) {
      console.log("row", row);
      this.thisdata = Object.assign({}, row);
      this.state.thisdata = row;
    },
    // 提交数据
    submitData() {
      var id = "";
      var url = this.state.obje.url;
      if (this.type == 0) {
        id = this.thisdata.id;
        url += "update";
      } else {
        url += "add";
      }

      const tiltes = this.state.obje.tilte;
      if (tiltes == "设备") {
        const object = {
          id: id,
          name: this.thisdata.name,
          code: this.thisdata.code,
          spelling: this.thisdata.spelling,
          room: this.thisdata.room,
          productLocation: this.thisdata.productLocation,
          maintainPerson: this.thisdata.maintainPerson,
          maintainTel: this.thisdata.maintainTel,
          ip: this.thisdata.ip,
          factory: this.thisdata.factory,
          memo: this.thisdata.memo,
          deviceType: this.thisdata.deviceType
        };

        if (object.code == null) {
          object.code = "01";
        }
        console.log(object);
        this.addObjectdata(url, object);
      } else if (tiltes == "检查部位") {
        console.log("---------检查部位--------------");
        const object = {
          id: id,
          name: this.thisdata.name,
          code: this.thisdata.code,
          spelling: this.thisdata.spelling,
          memo: this.thisdata.memo,
          deviceType: this.thisdata.deviceType
        };

        if (object.code == null) {
          object.code = "01";
        }
        this.addObjectdata(url, object);
      } else if (tiltes == "病人类型") {
        console.log("---------病人类型--------------");
        const object = {
          id: id,
          name: this.thisdata.name,
          code: this.thisdata.code,
          spelling: this.thisdata.spelling,
          associate: this.thisdata.associate,
          emergency: this.thisdata.emergency,
          memo: this.thisdata.memo
        };

        if (object.code == null) {
          object.code = "01";
        }
        this.addObjectdata(url, object);
      } else if (tiltes == "疾病") {
        console.log("---------疾病管理--------------");
        const object = {
          name: this.thisdata.name,
          code: this.thisdata.code,
          spelling: this.thisdata.spelling,
          ename: this.thisdata.ename
        };

        if (object.code == null) {
          object.code = "01";
        }

        if (this.type != 0) {   //添加 
           if(this.thisdata.id){
            object.parentId = this.thisdata.id;
           }
        }else{
          object.id = this.thisdata.id;
        }

        console.log('object',object)
        this.addObjectdata(url, object);
      } else if (tiltes == "纸张配置") {
        const object = {
          id: id,
          name: this.thisdata.name,
          paperWidth: this.thisdata.paperWidth,
          paperHeight: this.thisdata.paperHeight,
          description: this.thisdata.description,
        };
        
        console.log('object',object)
        var data=object;
          if(this.thisdata.paperResoure == "系统默认"){
             data.paperResoure=0;
          }else {
            if(this.thisdata.paperResoure != 0){
               data.paperResoure=1; 
            }else{
              data.paperResoure=0;
            }
          }
         if(this.thisdata.defaultPaper == "系统默认"){
             data.defaultPaper=0;
          }else {
            if(this.thisdata.defaultPaper != 0){
               data.defaultPaper=1; 
            }else{
              data.defaultPaper=0;
            }
         }

         
        this.addObjectdata(url, data);
      }else if (tiltes == "检查模板") {
        console.log("---------检查模版--------------");
        const object = {
          id: id,
          code: this.thisdata.code,
          name: this.thisdata.name,
          spelling: this.thisdata.spelling,
          checkItem: this.thisdata.checkItem,
          department: this.thisdata.department,
          deviceType: this.thisdata.deviceType,
          device: this.thisdata.device,
          charge: this.thisdata.charge,
          memo: this.thisdata.memo
        };

        if (object.code == null) {
          object.code = "01";
        }

        console.log('object',object) 
        this.addObjectdata(url, object);
      } else if (tiltes == "摄影体位") {
        console.log("---------摄影体位--------------");
        const object = {
          id: id,
          name: this.thisdata.name,
          code: this.thisdata.code,
          spelling: this.thisdata.spelling,
          deviceType: this.thisdata.deviceType,
          memo: this.thisdata.memo,
          active: 1,
        };
        
        this.addObjectdata(url, object);
      } else {
        const object = {
          id: id,
          name: this.thisdata.name,
          code: this.thisdata.code,
          spelling: this.thisdata.spelling,
          memo: this.thisdata.memo,
          deviceType: this.thisdata.deviceType
        };

        if (object.code == null) {
          object.code = "01";
        }
        this.addObjectdata(url, object);
      }
      this.dialogVisible1 = false;
      this.dialogVisible2 = false;
      this.dialogVisible3 = false;
      this.dialogVisible4 = false;
      this.dialogVisible5 = false;
      this.dialogVisible6 = false;
      this.dialogVisible7 = false;
      this.dialogVisible = false;
      console.log('清空数据');
      this.state.thisdata = {};
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

.content_main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content-table {
    flex: 1;
    overflow-y: auto;
    background-color: #e2e0e0;

    .el-table {
      width: 100%;
      font-size: 10px;
      overflow-y: auto;
      background-color: $gray;

      &::before {
        height: 0;
      }
    }
  }

  >>> .el-table__expanded-cell[class*=cell] {
    padding: 0px 10px;
  }

  >>> .el-table td, >>> .el-table th.is-leaf {
    border-bottom: 0px solid #ebeef5;
  }

  >>> .el-table thead th {
    background-color: #9d9e9f;
    color: #333;
    font-weight: 500;
  }

  .pagination {
    height: 36px;
    text-align: center;
    background-color: #e2e0e0;
  }
}

.space {
  width: 20px;
  display: inline-block;
}

.arrow-width {
  width: 14px;
  display: inline-block;
}
</style>
