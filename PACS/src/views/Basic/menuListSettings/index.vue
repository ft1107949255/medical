<template>
  <div class="centenWidnowHospital">
    <layout>
      <div slot="botton-group">
        <div class="tiaoz">
          <el-input class="paddings"   size="small" placeholder="按名称查询" clearable v-model="inputstr"/>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-search"  @click="isSearch">查询</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-plus"  @click="isAdd" >新增</el-button>
          <el-button class="setButton" type="primary"  size="small" icon="el-icon-edit"  @click="isUpdate">修改</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-delete"  @click="isDeleteDialog">删除</el-button>
        </div>
      </div>
      <div class="dieasetree" style="height:100%">
          <tree-grid  ref="tableTree" :columns="state.Colums" @handleRowClick='RowClick' :tree-structure="true" :otherHeight = 'otherHeight' :data-source="state.List"></tree-grid>
          <!-- <div class="pagination">
            <el-pagination
                slot="paging"
                background
                @handleIndexChange = "handleIndexChange"
                @handleSizeChange = "handleSizeChange"
                @current-change="handleCurrentChange(state.Page)"
                :pageSize="size"
                :current-page.sync="state.Page"
                layout="total, prev, pager, next"
                :total="state.Total">
            </el-pagination>
           </div> -->
      </div>
      <div slot="paging">
      </div>
    </layout>
    <!--检查方法设置类型-->
    <div>
      <Popup v-model="windowdialogVisible" @handleSure="handleSave">
        <el-form ref="window"  :model="CurrentValue" label-width="120px" :rules='rules'>

          <el-form-item label="菜单名称:" prop='functionName'>
            <el-input v-model="CurrentValue.functionName" clearable></el-input>
          </el-form-item>

          <!-- <el-form-item label="菜单等级:" prop='functionLevel'>
            <el-input v-model="CurrentValue.functionLevel" clearable></el-input>
          </el-form-item> -->

          <el-form-item label="菜单地址:" prop='functionUrl'>
            <el-input v-model="CurrentValue.functionUrl" clearable></el-input>
          </el-form-item>

          <!-- <el-form-item label="打开方式:" prop='functionIframe'>
            <el-input v-model="CurrentValue.functionIframe" clearable></el-input>
          </el-form-item> -->

          <el-form-item label="菜单排序:" prop='functionOrder'>
            <el-input  v-model="CurrentValue.functionOrder" clearable></el-input>
          </el-form-item>

          <!-- <el-form-item label="菜单类型:" prop='functionType'>
            <el-input v-model="CurrentValue.functionType" clearable></el-input>
          </el-form-item> -->

           <el-form-item label="菜单图标:" prop='iconId'>
            <!-- <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
               <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> 
            </el-upload>
            <img src=''/> -->
            <el-select v-model="CurrentValue.iconId" clearable filterable>
              <el-option v-for='(v, k) in menuIcoList' :key='k' :label='v.iconName' :value='v.id'></el-option>
            </el-select>
          </el-form-item>
        
        <!--
          <el-form-item label="菜单图标样式:" prop='functionIconStyle'>
            <el-input v-model="CurrentValue.functionIconStyle" clearable></el-input>
          </el-form-item>
          
          <el-form-item label="云桌面菜单图标:" prop='iconDeskId'>
            <el-input v-model="CurrentValue.iconDeskId" clearable></el-input>
          </el-form-item>

          <el-form-item label="前端标识:" prop='frontFlag'>
            <el-input v-model="CurrentValue.frontFlag" clearable></el-input>
          </el-form-item> -->

        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </Popup>
    </div>
  </div>
</template>

<script>
// 私有组件
import layout from 'Components/src/layout';
import TreeGrid from "../../components/treeTable/vue/TreeGrid.vue";
import Popup from 'Components/src/popup';
import {formatTree} from '../../../utils/tools.js'
export default {
  components: {
    layout,
    TreeGrid,
    Popup,
  },
  data() {
    var checkFunOrder = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入排序值'));
      } else {
        var type="^[0-9]*[1-9][0-9]*$"; 
        var r=new RegExp(type); 
        var flag=r.test(value);
        if(!flag && value !== '0'){
          callback(new Error('请输入正整数'));
        } else {
          callback()
        }
      }
    }
    return {
      inputstr: '',
      state:{
        List: [],
        Colums: [],
        Page: 0,
        Total: 0,
      },
      CurrentValue: {
        id: '',
        parentId: '',
        functionName: '',
        functionLevel: '',
        functionUrl: '',
        functionIframe: '',
        functionOrder: '',
        // functionType: '',
        iconId: '',
        functionIconStyle: '',
        iconDeskId: '',
      },  // 当前值
      thisdata: {},
      otherHeight: 160,
      windowdialogVisible: false, // 增加或修改弹框
      deleteialog: false,  // 删除框
      rules: {
        functionName: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
        ],
        // functionLevel: [
        //   { required: true, message: '请输入菜单等级', trigger: 'blur' },
        // ],
        // functionUrl: [
        //   { required: true, message: '请输入菜单地址', trigger: 'blur' },
        // ],
        functionOrder: [
          {  validator:checkFunOrder, trigger: 'blur' },
        ],
        iconId: [
          { required: true, message: '请选择菜单图标', trigger: 'change' }
        ]
      },
      inline: true,
      isAddEdit: true,   // 判断是新增 还是编辑
      menuIcoList: []
    };
  },
  created() {
    this.getWindowSettingsList();
    this.getMenuIconList();
  },
  methods: {
    isSearch() {
      var params = {};
      params.functionName = this.inputstr;
      // if (params.functionName !== '') {
      //   params.page = this.pageS;
      // } else {
      //   params.page = this.page;
      // }
      // params.size = this.size;
      this.$api.getFunctionMenuList(params).then(res => {
       let options = {
          parentId: 'parentId',
          id: 'id',
          childrens: 'list'
        }
        this.state.List = formatTree(res.data, options);
        this.state.Colums = res.table;
        this.state.Page = res.page;
        this.state.Total = res.total;
      })
    },
    getMenuIconList() {
      this.$api.getMenuIcon().then(res => {
        this.menuIcoList = res.data
      })
    },
    isAdd() {
      this.isAddEdit = true
      if(this.CurrentValue.id !== '') {
        this.CurrentValue.parentId = this.CurrentValue.id
      }
      if(this.CurrentValue.functionLevel === '') {
        this.CurrentValue.functionLevel = 0
      } else {
        this.CurrentValue.functionLevel  += 1
      }
      this.CurrentValue.id = '';
      this.CurrentValue.functionName = '';
      this.CurrentValue.functionUrl = '';
      this.CurrentValue.functionOrder = '';
      this.CurrentValue.functionIframe = '';
      this.CurrentValue.iconId = '';
      // 取消表格高亮
      this.windowdialogVisible = true;
    },
    isUpdate() {
      this.isAddEdit = false
      if (this.CurrentValue.id ==='') {
        this.$message({
            showClose: true,
            message: '请选中一条数据！！',
            type: 'warning'
        });
        return
      }
      this.windowdialogVisible = true;
    },
    isDeleteDialog() {
      if (this.CurrentValue.id ==='') {
        this.$message({
            showClose: true,
            message: '请选中一条数据！！',
            type: 'warning'
        });
        return
      }
      // this.deleteialog = true;
      this.$confirm('您确定删除当前选中数据？').then(res => {
        this.isDelete();
      })
    },
    isDelete() {
      var params  = {};
      params.id = this.CurrentValue.id;
      this.$api.delFunctionMenu(params).then(res => {
        this.$message('成功')
        this.getWindowSettingsList()
      })
    },
    handleRowClick(val) {
      console.log('当前行的值', val);
      this.CurrentValue.id = val.id;
      this.CurrentValue.functionName = val.functionName;
      this.CurrentValue.functionUrl = val.functionUrl;
      this.CurrentValue.functionOrder = val.functionOrder;
      this.CurrentValue.functionLevel = val.functionLevel;
      this.CurrentValue.iconId = val.iconId;
    },
    RowClick(val) {
      console.log("row", val);
      this.CurrentValue.id = val.id;
      this.CurrentValue.functionName = val.functionName;
      this.CurrentValue.functionUrl = val.functionUrl;
      this.CurrentValue.functionOrder = val.functionOrder;
      this.CurrentValue.functionLevel = val.functionLevel;
      this.CurrentValue.iconId = val.iconId;
    },
    handleSizeChange() {},
    submitForm() {
    },   
    submitData() {
      // 判断是添加还是修改
      var params = this.CurrentValue;
      if(!this.isAddEdit) {
        params.parentId = ''
      }
      // console.log(params)
      // return
      this.$api.saveFunctionMenu(params).then(res =>{
        this.$message('成功')
        this.windowdialogVisible = false
        this.getWindowSettingsList()
      })
    },
    handleClose() {
      // 手动点击关闭
      this.$refs.window.resetFields();
      this.windowdialogVisible = false;
    },
    getWindowSettingsList() {
      // 获取列表
      var params = {}
      this.$api.getFunctionMenuList(params).then(res => {
        let options = {
          parentId: 'parentId',
          id: 'id',
          childrens: 'list'
        }
        this.state.List = formatTree(res.data, options);
        console.log(this.state.List)
        this.state.Colums = res.table;
        this.state.Page = res.page;
        this.state.Total = res.total;
      })
    },
    handleSave() {
      console.log(111);
      this.$refs.window.validate((valid) => {
        if (valid) {
          console.log('验证ok');
          this.submitData();
        } else {
          console.log('验证失败');
          return false; 
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

.centenWidnowHospital{
  background-color: #bdbebe;
  >>> .el-dialog__title {
    font-size: 12px !important;
    color: #606266 !important;
  }
  >>> .el-form-item__label{
    font-size: 12px !important;
  }
  >>> .el-form .el-input__inner, >>> .el-form .el-textarea__inner{
    font-size: 12px !important;
  }
  >>> .el-select-dropdown__item {
    font-size: 12px !important;
  }
  >>> .el-select-dropdown__item span{
    font-size: 12px !important;
  }
    >>> .popup .el-input,     >>> .popup .el-textarea {
    width:90%;
  }
  >>> .el-form-item__content {
    width:178px;
  }
  .dieasetree{
    background: #d4d4d4;
    >>> .cell{
      font-size: 12px;
    }
    >>> .el-table td, >>> .el-table th{
      border: none !important;
      cursor pointer;
    }
  }
}
.isActive {
  background-color: $blue;
  color: $colorWhite;
}

.paddings {
  margin-left: 10px;
  height: 35Px;
  width: 130px;
  float: left;
}

.setButton {
  float: left;
  margin-left: 10px;
  background-color: $blue;
  color: $colorWhite;
}
.tiaoz {
  height: 40Px;
  margin-top: 5px;
}
.pagination {
  height: 36px;
  text-align: right;
  // background-color: #e2e0e0;
}
</style>
