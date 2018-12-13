<template>
  <div class="centenWidnowHospital">
    <layout>
      <div slot="botton-group">
        <div class="tiaoz">
          <el-input class="paddings"   size="small" placeholder="按名称查询" clearable v-model="inputstr"/>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-search"  @click="isSearch">查询</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-plus"  @click="isAddFather" >新增医院</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-plus"  @click="isAdd" >新增部门</el-button>
          <el-button class="setButton" type="primary"  size="small" icon="el-icon-edit"  @click="isUpdate">修改</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-delete"  @click="isDeleteDialog">删除</el-button>
        </div>
      </div>
      <div class="dieasetree" style="height:100%">
          <tree-grid  ref="tableTree" :columns="state.Colums" @handleRowClick='RowClick' :tree-structure="true" :otherHeight = 'otherHeight' :data-source="state.List"></tree-grid>
          <div class="pagination">
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
           </div>
      </div>
      <div slot="paging">
      </div>
    </layout>
    <!--检查方法设置类型-->
    <div>
      <Popup v-model="windowdialogVisible" @handleSure="handleSave">
        <el-form ref="window" :model="CurrentValue" label-width="120px" :rules='rules'>
          <el-form-item label="组织机构名称:" prop='departname'>
            <el-input v-model="CurrentValue.departname" clearable></el-input>
          </el-form-item>
          <div v-show='addHospital'>
            <el-form-item label="医院类型:" prop='hospitalType'>
              <el-select v-model="CurrentValue.hospitalType" filterable @change='chnageHospital'>
                <el-option 
                  v-for='(item,k) in hospitalTypeList'
                  :key='k'
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否中心:" prop='centerFlag' v-show='showCenter'>
              <el-radio v-model="CurrentValue.centerFlag" label="0">否</el-radio>
              <el-radio v-model="CurrentValue.centerFlag" label="1">是</el-radio>
            </el-form-item>
          </div>
          <el-form-item label="电话:" prop='mobile'>
            <el-input v-model="CurrentValue.mobile" clearable></el-input>
          </el-form-item>
          <el-form-item label="传真:" prop='fax'>
            <el-input v-model="CurrentValue.fax" clearable></el-input>
          </el-form-item>
          <el-form-item label="地址:" prop='address'>
            <el-input v-model="CurrentValue.address" clearable></el-input>
          </el-form-item>
          <el-form-item label="组织机构描述:" prop='description'>
            <el-input type="textarea" v-model="CurrentValue.description" clearable></el-input>
          </el-form-item>
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
    var checkPhone = (rule, value, callback) => {
      // 判断是否手机
      // 先判断长度
      if (value.length !== 11) {
        callback('请输入11位长度的手机号');
      }
      // 普通
      let reg1 = /^1[345789]\d{9}$/

      // 移动 134,135,136,137,138,139,150,151,152,157,158,159,182,183,184,187,188,147,178,1705,198
      let reg2 = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8]|9[8])\d{8}$/

      // 联通  130,131,132,155,156,185,186,145,176,1709,166
      let reg3 = /^1(3[0-2]|4[5]|5[56]|6[6]|7[6]|8[56]|)\d{8}$/;
      let reg31 = /^1709\d{7}$/

      // 电信  133,153,180,181,189,177,1700,199
      let reg4 = /^1(33|53|77|99|8[019])\d{8}$/;
      let reg41 = /^1700\d{7}$/

      let arr = [reg1, reg2, reg3, reg31, reg4, reg41]
      let result = false
      for (var i=0;i<arr.length;i++){
        if(arr[i].test(value)) {
          result = true;
          break;
        }
      }
      if(result) {
        callback();
      } else {
        callback('请输入正确手机号码');
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
        departname: '',
        id: '',
        orgType: '',
        mobile: '',
        fax: '',
        address: '',
        description: '',
        hospitalType: '', // 机构类型
        centerFlag: 0, // 是否中心
      },  // 当前值
      thisdata: {},
      size: 15,  // 分页数量
      page: 1,   // 当前页
      pageS: 1,  // 搜索当前页
      otherHeight: 160,
      windowdialogVisible: false, // 增加或修改弹框
      deleteialog: false,  // 删除框
      deviceTypeList: {},
      dialogTitle: '',
      addType: 0,  //0:添加  1:添加父类 2：更新
      rules: {
        departname: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
        ],
        orgCode: [
          { required: true, message: '请输入机构编码', trigger: 'blur' },
        ],
        // orgType: [
        //   { required: true, message: '请输入机构编码', trigger: 'change' },
        // ],
        mobile: [
          { required: true, validator:checkPhone, trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入组织机构描述', trigger: 'blur' },
        ]
      },
      hospitalTypeList: [
        {
          label: '私立',
          value: '1'
        },
        {
          label: '公立',
          value: '2'
        },
        {
          label: '专家库',
          value: '3'
        }
      ],
      addHospital: false,
      showCenter: false
    };
  },
  created() {
    this.getWindowSettingsList();
  },
  methods: {
    isSearch() {
      var params = {};
      params.departname = this.inputstr;
      if (params.departname !== '') {
        params.page = this.pageS;
      } else {
        params.page = this.page;
      }
      params.size = this.size;
      this.$api.getDepartPageList(params).then(res => {
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
    isAdd() {
      this.CurrentValue.departname = '';
      this.CurrentValue.orgCode = '';
      this.CurrentValue.mobile = '';
      this.CurrentValue.fax = '';
      this.CurrentValue.address = '';
      this.CurrentValue.description = '';
      this.CurrentValue.hospitalType = '';
      this.CurrentValue.centerFlag = '';
      if(this.CurrentValue.id == '') {
        this.$message({
            showClose: true,
            message: '请选中一条数据！！',
            type: 'warning'
        });
        return
      }
      // 判断是否部门
      if (this.CurrentValue.orgType === '2') {
        this.$message('部门下面不能再添加部门！！');
        return
      }
      // 取消表格高亮
      this.addType = 0;
      this.dialogTitle = '新增部门';
      this.addHospital = false
      this.windowdialogVisible = true;
    },
    chnageHospital() {
      // 如果是公立
      if (this.CurrentValue.hospitalType === '2') {
        this.showCenter = true
      } else {false
        this.showCenter = false
        this.CurrentValue.centerFlag = 0
      }
    },
    isAddFather(){
      this.CurrentValue.departname = '';
      this.CurrentValue.id = '';
      this.CurrentValue.orgCode = '';
      this.CurrentValue.mobile = '';
      this.CurrentValue.fax = '';
      this.CurrentValue.address = '';
      this.CurrentValue.description = '';
      this.CurrentValue.hospitalType = '';
      this.CurrentValue.centerFlag = '';
      this.addType = 1;
      // 取消表格高亮
      this.dialogTitle = '新增医院';
      this.addHospital = true
      this.windowdialogVisible = true;
    },
    isUpdate() {
      if (this.CurrentValue.id ==='') {
        this.$message({
            showClose: true,
            message: '请选中一条数据！！',
            type: 'warning'
        });
        return
      }
      this.addType = 2;
      this.dialogTitle = '修改医院或部门'
      // 判断是否医院编辑
      if (this.CurrentValue.hospitalType !== '' && this.CurrentValue.hospitalType !== null) {
        this.addHospital = true
        this.showCenter = this.CurrentValue.centerFlag !== null ? true: false
      } else {
        this.addHospital = false
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
      this.$api.delDepartInfo(params).then(res => {
        if(res.status === 1 || res.status === '1') {
            this.$message({
              showClose: true,
              message: '删除成功！！',
              type: 'success'
            });
            // 刷新列表
            this.deleteialog = false;
            this.isSearch();
          } else {
            this.$message({
              showClose: true,
              message: '删除失败！！',
              type: 'error'
            });
          }
      })
    },
    handleIndexChange(val) {
      if (this.inputstr !=='') {
        this.pageS = val;
        this.isSearch();
      } else {
        this.page = val;
        this.getWindowSettingsList();
      }
    },
    handleCurrentChange(val) {
      if (this.inputstr !=='') {
        this.pageS = val;
        this.isSearch();
      } else {
        this.page = val;
        this.getWindowSettingsList();
      }
    },
    handleRowClick(val) {
      console.log('当前行的值', val);
      this.CurrentValue.id = val.id;
      this.CurrentValue.departname = val.departname;
      this.CurrentValue.orgCode = val.orgCode;
      this.CurrentValue.mobile = val.mobile;
      this.CurrentValue.fax = val.fax;
      this.CurrentValue.address = val.address;
      this.CurrentValue.description = val.description;
      this.CurrentValue.hospitalType = val.hospitalType;
      this.CurrentValue.centerFlag = val.centerFlag;
      this.CurrentValue.orgType = val.orgType;
      
    },
    RowClick(val) {
      console.log("row", val);
      this.CurrentValue.id = val.id;
      this.CurrentValue.departname = val.departname;
      this.CurrentValue.orgCode = val.orgCode;
      this.CurrentValue.mobile = val.mobile;
      this.CurrentValue.fax = val.fax;
      this.CurrentValue.address = val.address;
      this.CurrentValue.description = val.description;
      this.CurrentValue.hospitalType = val.hospitalType;
      this.CurrentValue.centerFlag = val.centerFlag;
      this.CurrentValue.orgType = val.orgType;
    },
    handleSizeChange() {},
    submitForm() {
      this.$refs.window.validate((valid) => {
        if (valid) {
          console.log('验证ok');
          this.submitData();
        } else {
          console.log('验证失败');
          return false; 
        }
      });
    },   
    submitData() {
      // 判断是添加还是修改
      var params = this.CurrentValue;
      // params.TSPDepart = {}
      if(params.departname === '') {
          this.$message({
            showClose: true,
            message: '请填写组织机构名称！！',
            type: 'error'
          });
          return 
      }
      params.orgType = this.addHospital? 1: 2
      // console.log('参数', params)
      // return
      if (this.dialogTitle === '新增医院' || this.dialogTitle === '新增部门') {
        if(this.addType == 0) {
          params.parentId = this.CurrentValue.id;
          params.id = '';
        } else {
          params.id = '';
        }
        // add
        this.$api.saveDepartInfo(params).then(res =>{
            if(res.status === 1 || res.status === '1') {
              this.$message({
                showClose: true,
                message: '添加成功！！',
                type: 'success'
              });
              // 刷新列表
              this.windowdialogVisible = false;
              this.isSearch();
            } else {
              this.$message({
                showClose: true,
                message: '添加失败！！',
                type: 'error'
              });
            }
        })
      } else {
        // update
        this.$api.saveDepartInfo(params).then(res =>{
          if(res.status === 1 || res.status === '1') {
            this.$message({
              showClose: true,
              message: '修改成功！！',
              type: 'success'
            });
            // 刷新列表
            this.windowdialogVisible = false;
            this.isSearch();
          } else {
            this.$message({
              showClose: true,
              message: '添加失败！！',
              type: 'error'
            });
          }
        })
      }
    },
    handleClose() {
      // 手动点击关闭
      this.$refs.window.resetFields();
      this.windowdialogVisible = false;
    },
    getWindowSettingsList() {
      // 获取列表
      var params = {}
      params.size = this.size;
      params.page = this.page;
      this.$api.getDepartPageList(params).then(res => {
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
