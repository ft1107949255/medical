<template>
  <div class="centenWidnowHospital">
    <layout>
      <div slot="botton-group">
        <div class="tiaoz">
          <el-input class="paddings"   size="small" placeholder="按名称查询" clearable v-model="inputstr"/>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-search"  @click="isSearch">查询</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-plus"  @click="isAddFather" >新增父类</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-plus"  @click="isAdd" >新增</el-button>
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
        <el-form ref="window" :model="CurrentValue" label-width="80px" :rules='rules'>
          <el-form-item label="科室名称:" prop='officeName'>
            <el-input v-model="CurrentValue.officeName" clearable></el-input>
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
export default {
  components: {
    layout,
    TreeGrid,
    Popup,
  },
  data() {
    return {
      inputstr: '',
      state:{
        List: [],
        Colums: [],
        Page: 0,
        Total: 0,
      },
      CurrentValue: {
        officeName: '',
        id: ''
      },  // 当前值
      thisdata: {},
      size: 15,  // 分页数量
      page: 0,   // 当前页
      pageS: 0,  // 搜索当前页
      otherHeight: 160,
      windowdialogVisible: false, // 增加或修改弹框
      deleteialog: false,  // 删除框
      deviceTypeList: {},
      dialogTitle: '新增医院科室',
      addType: 0,  //0:添加  1:添加父类 2：更新
      rules: {
        officeName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ]
      } 
    };
  },
  created() {
    this.getWindowSettingsList();
  },
  methods: {
    isSearch() {
      var params = {};
      params.officeName = this.inputstr;
      if (params.officeName !== '') {
        params.page = this.pageS;
      } else {
        params.page = this.page;
      }
      params.size = this.size;
      this.$api.hdSettingGetAll(params).then(res => {
        if (res.status === 1 || res.status === '1') {
            this.state.List = [];
            this.state.List = res.list;
            this.state.Colums = res.table;
            this.state.Page = res.page;
            this.state.Total = res.total;
        } else {
            console.log('error');
        }
      })
    },
    isAdd() {
      this.CurrentValue.officeName = '';
      if(this.CurrentValue.id == '') {
        this.$message({
            showClose: true,
            message: '请选中一条数据！！',
            type: 'warning'
        });
        return
      }
      // 取消表格高亮
      this.addType = 0;
      this.dialogTitle = '新增医院科室';
      this.windowdialogVisible = true;
    },
    isAddFather(){
      this.CurrentValue.officeName = '';
      this.CurrentValue.id = '';
      this.addType = 1;
      // 取消表格高亮
      this.dialogTitle = '新增医院科室';
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
      this.dialogTitle = '修改医院科室'
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
      this.$api.hdSettingDel(params).then(res => {
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
      this.CurrentValue.officeName = val.officeName;
    },
    RowClick(val) {
      console.log("row", val);
      this.CurrentValue.id = val.id;
      this.CurrentValue.officeName = val.officeName;
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
      var params = {};
      params = this.CurrentValue;
      if(params.officeName === '') {
          this.$message({
            showClose: true,
            message: '请填写科室名称！！',
            type: 'error'
          });
          return 
      }
      // 对参数进行处理
      if(params.sysCompanyCode !== '') {
      }
      if(params.sysOrgCode !== '') {
      }
      if (this.dialogTitle === '新增医院科室') {
        if(this.addType == 0) {
          params.parientId = this.CurrentValue.id;
        } else {
          params.parientId = '';
        }  
        // add
        this.$api.hdSettingAdd(params).then(res =>{
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
        this.$api.hdSettingUpdate(params).then(res =>{
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
      this.$api.hdSettingGetAll(params).then(res => {
        if (res.status === 1 || res.status === '1') {
            this.state.List = res.list;
            this.state.Colums = res.table;
            this.state.Page = res.page;
            this.state.Total = res.total;
        } else {
            console.log('error');
        }
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
    width:80%
    font-size: 12px !important;
  }
  >>> .el-select-dropdown__item {
    font-size: 12px !important;
  }
  >>> .el-select-dropdown__item span{
    font-size: 12px !important;
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
