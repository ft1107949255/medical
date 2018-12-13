<template>
<div class="content_main" >
  <div class="left-tree" v-if="isShowTree">
    <tree @handleLeafNode="handleLeafNode"></tree>
  </div>
<div v-show="showContent_main" style="flex: auto;">
  <centerNav v-on:Active="active"  :state="state" :orgCode="orgCode"  :getChoiceList="getChoiceList"  :getDATAList="getDATAList" :isUpdate="isUpdate" :isAdd="isAdd"  :addFatherType="addFatherType" :isAddType="isOpen"  :isAddSelect="SelectIsOpen"/>
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
width="50%"
:before-close="handleClose"
center
>
<el-form ref="thisdata" :model="thisdata" label-width="80px" >
   <el-row>
      <el-col :span="11">
        <el-form-item label="名称:" >
            <el-input v-model="thisdata.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="代码:">
            <el-input v-model="thisdata.code"></el-input>
        </el-form-item>
      </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <el-form-item label="拼音:">
        <el-input v-model="thisdata.spelling"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="房间:">
        <el-input v-model="thisdata.room"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <el-form-item label="IP地址:">
        <el-input v-model="thisdata.ip"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">
        <el-form-item label="端口:">
          <el-input v-model="thisdata.port"></el-input>
        </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <el-form-item label="AETitle:">
        <el-input v-model="thisdata.aetitle"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="生产商:">
        <el-input v-model="thisdata.factory"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
      <el-col :span="11">
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
    </el-col>
    <el-col :span="11">
      <el-form-item label="所属科室:">
          <el-select v-model="thisdata.sysOrgCode" placeholder="请选择" >
            <el-option
            v-for="item in departmentlist"
            :key="item.id"
            :label="item.departname"
            :value="item.orgCode">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row>
      <el-col :span="11">
      <el-form-item label="中文支持:">
        <el-select v-model="thisdata.supportChinese" placeholder="请选择" >
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="字体编码:">
          <el-select v-model="thisdata.characterSet" placeholder="请选择" >
            <el-option label="GBK" value="GBK"></el-option>
            <el-option label="GB18030" value="GB18030"></el-option>
            <el-option label="utf8" value="utf8"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="22">
      <el-form-item label="备注:">
        <el-input type="textarea" v-model="thisdata.memo"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
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
<el-row>
  <el-col :span="11">
    <el-form-item label="代码:">
    <el-input v-model="thisdata.code"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="11">
    <el-form-item label="名称:">
      <el-input v-model="thisdata.name"></el-input>
    </el-form-item>
  </el-col>
</el-row>
<el-row>
  <el-col :span="11">
    <el-form-item label="拼音:">
      <el-input v-model="thisdata.spelling"></el-input>
    </el-form-item>
  </el-col>
   <el-col :span="11">
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
  </el-col>
</el-row>
<el-row>
  <el-col :span="11">
    <el-form-item label="检查类型:">
    <el-select v-model="thisdata.checkItem" placeholder="请选择" >
        <el-option
        v-for="item in Projectlist"
        :key="item.id"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
  </el-form-item>
  </el-col>
    <el-col :span="11">
    <el-form-item label="设备类型:">
      <el-select v-model="thisdata.deviceType" placeholder="请选择" >
          <el-option
          v-for="item in objlist"
          :key="item.id"
          :label="item.name"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
  </el-col>
 
</el-row>

<el-row>
  <el-col :span="22">
    <el-form-item label="备注:">
      <el-input type="textarea" v-model="thisdata.memo"></el-input>
    </el-form-item>
  </el-col>
</el-row>
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
<el-row>
  <el-col :span="12">
    <el-form-item label="名称:">
      <el-input v-model="thisdata.name"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="12">
    <el-form-item label="代码:">
      <el-input v-model="thisdata.code"></el-input>
    </el-form-item>
  </el-col>
</el-row>
<el-row> 
  <el-col :span="12"> 
   <el-form-item label="拼音:">
    <el-input v-model="thisdata.spelling"></el-input>
  </el-form-item>
  </el-col>
  <el-col :span="12">
    <el-form-item label="类型选择:">
      <el-select v-model="thisdata.chekBodyType" placeholder="请选择类型"  >
          <el-option
          v-for="item in Typelist"
          :key="item.id"
          :label="item.name"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
  </el-col>
</el-row>
<el-row>
  <el-col :span="12">
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
  </el-col>
    <el-col :span="12">
      <el-form-item label="检查方法:">
      <el-select v-model="thisdata.checkType" placeholder="请选择" >
          <el-option
          v-for="item in checkWayList"
          :key="item.id"
          :label="item.name"
          :value="item.code">
        </el-option>
        </el-select>
      </el-form-item>
    </el-col>
</el-row>
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
center
>
<el-form ref="thisdata" :model="thisdata" label-width="80px">
  <el-row>
    <el-col :span="11">
      <el-form-item label="代码:">
        <el-input v-model="thisdata.code"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="名称:">
        <el-input v-model="thisdata.name"></el-input>
      </el-form-item>
    </el-col>  
  </el-row>
  <el-row>
    <el-col :span="11">
      <el-form-item label="拼音:">
        <el-input v-model="thisdata.spelling"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="关联号码:">
        <el-input v-model="thisdata.associate"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
     <el-col :span="11">
      <el-form-item label="是否急诊:">
        <el-select v-model="thisdata.emergency" placeholder="请选择" >
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="22">
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="thisdata.memo"></el-input>
        </el-form-item>
    </el-col>
  </el-row>
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
  <el-row>
    <el-col :span="11">
      <el-form-item label="纸张名称:">
        <el-input v-model="thisdata.name"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="宽度:">
        <el-input v-model="thisdata.paperWidth"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <el-form-item label="高度:">
        <el-input v-model="thisdata.paperHeight"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">
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
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <el-form-item label="纸张描述:">
        <el-input v-model="thisdata.description"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">
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
    </el-col>
  </el-row>
  
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
  <el-form-item label="编码:">
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

<!-- id生成器模板 -->
<div>
<el-dialog
:title="this.tilte"
:visible.sync="dialogVisible8"
:item="state.thisdata"
width="35%"
:before-close="handleClose"
center
>
<el-form ref="thisdata" :model="thisdata" label-width="80px">
  <el-row>
    <el-col :span="11">
       <el-form-item label="名称:">
        <el-input v-model="thisdata.codeName"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">  
      <el-form-item label="前缀:">
          <el-input v-model="thisdata.prefixCode"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
       <el-form-item label="后缀:">
        <el-input v-model="thisdata.suffixCode"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">  
      <el-form-item label="包含时间:">
            <el-select v-model="thisdata.timeCode" placeholder="请选择" >
            <el-option label="不包含" value="0"></el-option>
            <el-option label="包含" value="1"></el-option>
          </el-select>
      </el-form-item>
    </el-col>
  </el-row>
   <el-row>
    <el-col :span="11">
       <el-form-item label="随机位数:">
        <el-input v-model="thisdata.randomCode"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">  
      <el-form-item label="当前值:">
          <el-input v-model="thisdata.current"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
        <el-form-item label="生成类型:">
          <el-select v-model="thisdata.type" placeholder="请选择类型" >
            <el-option label="病人编号" value="0"></el-option>
            <el-option label="检查号" value="1"></el-option>
            <el-option label="门诊号" value="2"></el-option>
            <el-option label="住院号" value="3"></el-option>
            <el-option label="体检号" value="4"></el-option>
            <el-option label="急诊号" value="5"></el-option>
          </el-select>
        </el-form-item>
    </el-col>
    <el-col :span="11">
        <el-form-item label="设备类型:">
          <el-select v-model="thisdata.devicetype" placeholder="请选择类型">
              <el-option
              v-for="item in objlist"
              :key="item.id"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="22">
     <el-form-item label="备注:">
        <el-input type="textarea" v-model="thisdata.comments"></el-input>
    </el-form-item>
    </el-col>
  </el-row>
</el-form>
<span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible8 = false">取 消</el-button>
<el-button type="primary" @click="submitData">确 定</el-button>
</span>
</el-dialog>
</div>
</div>
<!-- 系统配置 -->
<div>
<el-dialog
:title="this.tilte"
:visible.sync="dialogVisible9"
:item="state.thisdata"
width="35%"
:before-close="handleClose"
center
>
<el-form ref="thisdata" :model="thisdata" label-width="80px">
  <el-row>
    <el-col :span="11">
       <el-form-item label="分诊设置:">
       <el-select v-model="systeml.label" placeholder="请选择类型">
          <el-option label="是" value='是'></el-option>
          <el-option label="否" value='否'></el-option>
       </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</el-form>
<span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible9 = false">取 消</el-button>
<el-button type="primary" @click="submitDataSystem">确 定</el-button>
</span>
</el-dialog>
</div>
<div v-show="showSystem" style="width:100%;">
  <div style="background-color:#9d9e9f; height:40px;font-size:12px; line-height:40px;"><span style="margin-left:10px;">系统配置信息</span></div>
  <div  class="systemInfo">
    <span style="font-size:12px;">分诊流程是否存在：{{systeml.value}}</span>
  </div>
  <el-button type="primary" @click="OkDialogsystem">修 改</el-button>
</div>
</div>
</template>

<script>
import { mapState } from "vuex";
import centerNav from "./MyTilte.vue";
import pagination from "../../components/table/Pagination.vue";
import Table from "../../components/table/Table.vue";

import TreeGrid from "../../components/treeTable/vue/TreeGrid.vue";
import selects from "../../components/MySelect.vue";
import bottomNav from "../../components/BottomNav";
import inputs from "../../components/Input.vue";
import tree from "../../components/trees/tree.vue";

export default {
  components: {
    centerNav,
    bottomNav,
    Table,
    selects,
    pagination,
    inputs,
    tree,
    TreeGrid
  },
  props: ["state", "getChoiceList", "getDATAList", "addObjectdata", "isOpen", "SelectIsOpen", "objlist","dataEdit", "isShowTree" ],
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
      dialogVisible8: false,
      dialogVisible9: false,
      tilte: "",
      Projectlist: [],
      departmentlist: [], 
      equipmentlist:[],
      checkWayList:[],
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
      showContent_main:true,
      showSystem: false,
      systeml:{
        label: '',
        id: '',
        value:''
      },
      orgCode: ''
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
    // 树节点点击
    handleLeafNode (item) {
      this.orgCode = item.id
      this.$emit('handleTreeLeaf', item.id)
    },
    handleRowClick(row) {
      // 开始替换row
       console.log('[*] 当前行数据++++',this.dataEdit);
      let id = row.id;
      this.dataEdit.map(item=>{
        if(id == item.id){
          this.thisdata = Object.assign({}, item);
          this.state.thisdata = item;
        }
      })
      console.log('[*] 转换完毕的数据',this.thisdata);
      // this.state.thisdata = row;
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
          this.getDepartmentlist(this.state.obje.departmentUrl);
        } else if (tiltes == "检查部位") {
          this.tilte = "修改" + tiltes + "信息";
          this.dialogVisible2 = true;
          this.getlist(this.state.obje.relationUrl + "/v1/getlist");
          this.getCheckWaylist(this.state.obje.checkUrl + "/v1/getlist");
        } else if (tiltes == "检查项目") {
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
          this.dialogVisible7 = true;
        } else if (tiltes == "摄影体位") {
          this.tilte = "修改" + tiltes + "信息";
          this.dialogVisible7 = true;
        } else if (tiltes == "ID生成") {
          this.tilte = "修改" + tiltes + "信息";
          this.dialogVisible8 = true;
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
        this.getDepartmentlist(this.state.obje.departmentUrl);
        this.tilte = "添加" + tiltes + "信息";
      } else if (tiltes == "检查部位") {
        this.tilte = "添加" + tiltes + "信息";
        this.dialogVisible2 = true;
        this.getlist(this.state.obje.relationUrl + "/v1/getlist");
        this.getCheckWaylist(this.state.obje.checkUrl + "/v1/getlist");
      } else if (tiltes == "检查项目") {
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
        this.dialogVisible7 = true;
      }else if (tiltes == "摄影体位") {
        this.tilte = "添加" + tiltes + "信息";
        this.dialogVisible7 = true;
      } else if (tiltes == "ID生成") {
        this.tilte = "添加" + tiltes + "信息";
        this.dialogVisible8 = true;
      } else if (tiltes == "系统配置") {
        this.showContent_main = false;
        this.showSystem = true;
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
      console.log('当前url',url);
      this.$http
        .post(this.ip + url, { headers: { "X-AUTH-TOKEN": this.token } })
        .then(res => {
          console.log(res);
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log("当前数据",data.data);
            this.Typelist = data.data;
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
      
      this.$http
        .post(this.ip + url, { headers: { "X-AUTH-TOKEN": this.token } })
        .then(res => {
          console.log(res);
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log("-----&&&&-----" + data.data);
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
    getCheckWaylist(url) {  //获取检查方法
      console.log("JINLAI");
      this.$http
        .post(this.ip + url, { headers: { "X-AUTH-TOKEN": this.token } })
        .then(res => {
          console.log(res);
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log("---------------",data);
            this.checkWayList = data.data;
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
        console.log(this.thisdata);
        const object = {
          id: id,
          name: this.thisdata.name,
          code: this.thisdata.code,
          spelling: this.thisdata.spelling,
          room: this.thisdata.room,
          //productLocation: this.thisdata.productLocation,
          //maintainPerson: this.thisdata.maintainPerson,
          //maintainTel: this.thisdata.maintainTel,
          port: this.thisdata.port,
          aetitle: this.thisdata.aetitle,
          ip: this.thisdata.ip,
          sysOrgCode:this.thisdata.sysOrgCode,
          factory: this.thisdata.factory,
          memo: this.thisdata.memo,
          deviceType: this.thisdata.deviceType,
          supportChinese:this.thisdata.supportChinese,
          characterSet:this.thisdata.characterSet
        };
        if (object.code == null) {
          object.code = "01";
        }
        if(object.deviceType !=''){
          console.log('[*] 设备类型数据++++',this.objlist);
          this.objlist.map(item=>{
            if(object.deviceType == item.name){
              object.deviceType = item.code;
            }
          });
        }
        if(object.sysOrgCode !=''){
          console.log('[*] 部门数据',this.departmentlist);
          this.departmentlist.map(item=>{
            if(object.sysOrgCode == item.departname){
              object.sysOrgCode = item.orgCode;
            }
          });
        }
        if(object.supportChinese !=''){
          if(object.supportChinese === '是') {
            object.supportChinese = 1;
          } else {
            object.supportChinese = 0;
          }
        }
        console.log('[*] 当前参数++++',object);
        this.addObjectdata(url, object);
      } else if (tiltes == "检查部位") {
        console.log("---------检查部位--------------");
        const object = {
          id: id,
          name: this.thisdata.name,
          code: this.thisdata.code,
          spelling: this.thisdata.spelling,
          memo: this.thisdata.memo,
          deviceType:this.thisdata.deviceType,
          chekBodyType:this.thisdata.chekBodyType,
          checkType:this.thisdata.checkType,
        };
        if (object.code == null) {
          object.code = "01";
        }
        if(object.deviceType !=''){
          console.log('[*] 设备类型数据++++',this.objlist);
          this.objlist.map(item=>{
            if(object.deviceType == item.name){
              object.deviceType = item.code;
            }
          });
        }
        if(object.chekBodyType !=''){
          console.log('[*] 检查体位++++',this.Typelist);
          this.Typelist.map(item=>{
            if(object.chekBodyType == item.name){
              object.chekBodyType = item.code;
            }
          });
        }
        if(object.checkType !=''){
          console.log('[*] 设备检查方法++++',this.checkWayList);
          this.checkWayList.map(item=>{
            if(object.checkType == item.name){
              object.checkType = item.code;
            }
          });
        }
        console.log('[*]当前参数++++',object);
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

        console.log('[*] 当前参数',object);
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
      }else if (tiltes == "检查项目") {
        console.log("---------检查项目--------------");
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
        if(object.deviceType !=''){
          console.log('[*] 设备类型数据++++',this.objlist);
          this.objlist.map(item=>{
            if(object.deviceType == item.name){
              object.deviceType = item.code;
            }
          });
        }
        if(object.checkItem !=''){
          console.log('[*] 设备类型数据++++',this.Projectlist);
          this.Projectlist.map(item=>{
            if(object.checkItem == item.name){
              object.checkItem = item.code;
            }
          });
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
        if(object.deviceType !=''){
          console.log('[*] 设备类型数据++++',this.objlist);
          this.objlist.map(item=>{
            if(object.deviceType == item.name){
              object.deviceType = item.code;
            }
          });
        }
        console.log('[*] 当前参数',object);
        this.addObjectdata(url, object);
      } else if (tiltes == "ID生成") {
        console.log("---------ID生成--------------");
        const object = {
          id: id,
          // code: this.thisdata.code,
          codeName: this.thisdata.codeName,
          prefixCode: this.thisdata.prefixCode,
          timeCode: this.thisdata.timeCode,
          randomCode: this.thisdata.randomCode,
          current: this.thisdata.current,
          suffixCode: this.thisdata.suffixCode,
          type: this.thisdata.type,
          devicetype: this.thisdata.devicetype,
          comments:this.thisdata.comments
        };
        // 需要转换的字符  timeCode 0=不包含   1=包含  type  devicetype
        if(object.timeCode!='' && object.timeCode =='不包含'){
          object.timeCode = 0;
        }else if(object.timeCode !='' && object.timeCode =='包含'){
          object.timeCode = 1;
        }
        if(object.type !='' && object.type == '病人编号'){
          object.type = 0;
        }else if(object.type !='' && object.type =='检查号'){
          object.type = 1;
        }else if(object.type !='' && object.type == '门诊号'){
          object.type = 2;
        }else if(object.type !='' && object.type == '住院号'){
          object.type = 3;
        }else if(object.type !='' && object.type == '体检号'){
          object.type = 4;
        }else if(object.type !='' && object.type == '急诊号'){
          object.type = 5;
        }
        if(object.devicetype !=''){
          console.log('[*] 设备类型数据++++',this.objlist);
          this.objlist.map(item=>{
            if(object.devicetype == item.name){
              object.devicetype = item.code;
            }
          });
        }
        console.log('object',object) 
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
      this.dialogVisible8 = false;
      this.dialogVisible = false;
      console.log('清空数据');
      this.state.thisdata = {};
    },
    OkDialogsystem() {
      this.dialogVisible9 = true;
    },
    getSystem() {
      this.$api.getBasicSystemConfigApi().then(res => {
        var data = res.data;
        console.log(data.data.id);
        this.systeml.label = data.data.needProcess==0?'否':'是';
        this.systeml.value = data.data.needProcess==0?'否':'是';
        if(typeof(data.data.id) !='undefined'){
          this.systeml.id = data.data.id;
        }
      },err => {
          console.log(err);
        }
      );
    },
    submitDataSystem() {
      var params =  new Object();
      console.log(this.systeml.label);
      if(this.systeml.label === '是'){
        params.needProcess   = 1;
      } else if(this.systeml.label === '否'){
        params.needProcess   = 0;
      }else{
        params.needProcess   = this.systeml.label;
      }
      if(this.systeml.id !=''){
        params.id = this.systeml.id;
      }
      console.log('【】',params);
      this.$api.updateBasicSystemConfigApi(params).then(
        res => {
          var data = JSON.parse(res.data);
          if(data.status === '1' || data.status==1){
            this.$message({
              showClose: true,
              message:'修改成功',
              type: 'success'
            });
            this.dialogVisible9 = false;
            this.getSystem();
          }
        },err => {
          console.log(err);
        }
      ); 
    }
  }
};
</script>

<style scoped lang="stylus">


.content_main {
  width: 100%;
  height: 100%;
  display: flex;
  .left-tree {
    flex: none;
    width: 300px;
  }
  // flex-direction: column;

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
.content_main .el-select{
  width:100%;
}
.systemInfo{
  height:30px;
  line-height:30px;
  margin:10px;
}

</style>
<style>
  .el-dialog__title{
    font-size: 12px !important; 
    color:#606266 !important;
  }
  .el-form-item__label{
    font-size: 12px !important; 
  }
  .el-input__inner{
    font-size: 12px !important; 
  }
  .el-select-dropdown__item{
    font-size: 12px !important; 
  }
  .el-icon-arrow-right{
    cursor: pointer;
  }
  .el-icon-arrow-down{
    cursor: pointer;
  }
 .content_main .el-textarea__inner{
  font-size:12px !important;
  } 
</style>
