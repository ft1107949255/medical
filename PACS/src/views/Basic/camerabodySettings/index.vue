<template>
  <div class="centenWidnow">
    <layout>
      <!-- <div slot="left-module">1
      </div> -->
      <div slot="botton-group">
        <div class="tiaoz">
          <el-input class="paddings"   size="small" placeholder="按名称查询" clearable v-model="inputstr"/>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-search"  @click="isSearch">查询</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-plus"  @click="isAdd" >新增</el-button>
          <el-button class="setButton" type="primary"  size="small" icon="el-icon-edit"  @click="isUpdate">修改</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-delete"  @click="isDeleteDialog">删除</el-button>
        </div>
      </div>
      <div style="width:100%;">
          <Table 
            ref="Table"
            :list='state.List'
            :columns='state.Colums'
            :otherHeight = 'otherHeight'
            @handleIndexChange='handleIndexChange'
            @handleRowClick='handleRowClick'
            :thisdata='thisdata'>
          </Table>
      </div>
      <div slot="paging">
        <div class="pagination">
          <pagination :pageSize="size"
          :currentPage = "state.Page"
          :total = "state.Total"
          @handleIndexChange = "handleIndexChange"
          @handleSizeChange = "handleSizeChange"
          >
          </pagination>
        </div>
        
      </div>
    </layout>

    <!--窗口设置类型-->
    <div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="windowdialogVisible"
        width="35%"
        :before-close="handleClose"
        center
        >
       <el-form ref="window" :model="CurrentValue" label-width="80px">
          <el-form-item label="编码:">
            <el-input v-model="CurrentValue.code"></el-input>
          </el-form-item>
          <el-form-item label="名称:">
            <el-input v-model="CurrentValue.name"></el-input>
          </el-form-item>
          <el-form-item label="拼音:">
            <el-input v-model="CurrentValue.spelling"></el-input>
          </el-form-item>
          <el-form-item label="设备类型:">
            <el-select v-model="CurrentValue.deviceType" placeholder="请选择类型" >
                <el-option
                v-for="item in objlist"
                :key="item.id"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="CurrentValue.memo"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="windowdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
          title="警告"
          :visible.sync="deleteialog"
          width="30%">
          <span>确定删除</span>
          <span>{{CurrentValue.name}}</span>
          <span>么？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteialog = false">取 消</el-button>
            <el-button type="primary" @click="isDelete">确 定</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 私有组件
import layout from 'Components/src/layout';
import Table from "../../components/table/Table.vue";
import pagination from  "../../components/table/Pagination.vue";
import tree from "../../components/trees/tree.vue";
export default {
  components: {
    layout,
    Table,
    pagination,
    tree
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
        name: '',
        deviceTypeCode: '',
        deviceType: '',
        code: '',
        id: '',
        memo: '',
        spelling: ''
      },  // 当前值
      thisdata: {},
      size: 15,  // 分页数量
      page: 1,   // 当前页
      pageS: 1,  // 搜索当前页
      otherHeight: 160,
      windowdialogVisible: false, // 增加或修改弹框
      deleteialog: false,  // 删除框
      deviceTypeList: {},
      dialogTitle: '新增摄影体位',
      isShowTree: true,
      departmentlist: [],
      objlist: [],
      orgcode: ''
    };
  },
  created() {
    this.getObjList();
    // this.getDevictTypeList();
    this.getWindowSettingsList();
    this.getDepartmentlist();
  },
  methods: {
    isSearch() {
      var params = {};
      params.name = this.inputstr;
      // params.orgCode = this.orgCode;
      if (params.name !== '') {
        params.page = this.pageS;
      } else {
        params.page = this.page;
      }
      params.size = this.size;
      this.$api.camerabodySettingGetAll(params).then(res => {
        if (res.status === 1 || res.status === '1') {
          this.state.List = [];
            res.list.map(item=>{
              this.objlist.map(item1=>{
                if(item.deviceType == item1.code){
                  item.deviceType = item1.name;
                }
              })
            })
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
      this.dialogTitle = '新增摄影体位';
      this.CurrentValue.id = '';
      this.CurrentValue.deviceTypeCode = '';
      this.CurrentValue.deviceType = '';
      this.CurrentValue.name = '';
      this.CurrentValue.code = '';
      this.CurrentValue.spelling = '';
      this.CurrentValue.memo = '';
      // 取消表格高亮
      this.$refs.Table.cancelHightLight();
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
      this.dialogTitle = '修改摄影体位'
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
      this.deleteialog = true;
    },
    isDelete() {
      var params  = {};
      params.id = this.CurrentValue.id;
      this.$api.camerabodySettingDel(params).then(res => {
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
    handleRowClick(val) {
      console.log('当前行的值', val);
      this.CurrentValue.id = val.id;
      this.CurrentValue.deviceTypeCode = val.deviceTypeCode;
      this.CurrentValue.deviceType = val.deviceType;
      this.CurrentValue.name = val.name;
      this.CurrentValue.code = val.code;
      this.CurrentValue.spelling = val.spelling;
      this.CurrentValue.memo = val.memo;
    },
    handleSizeChange() {},
    submitData() {
      // 判断是添加还是修改
      var params = {};
      params = this.CurrentValue;
      
      if(params.name === '') {
          this.$message({
            showClose: true,
            message: '请填写窗体名称！！',
            type: 'error'
          });
          return 
        }
      // 对参数进行处理
      if (params.code == null) {
          params.code = "01";
        }
        if(params.deviceType !=''){
          console.log('[*] 设备类型数据++++',this.objlist);
          this.objlist.map(item=>{
            if(params.deviceType == item.name){
              params.deviceType = item.code;
            }
          });
        }
      
      if (this.dialogTitle === '新增摄影体位') {
        // add
        this.$api.camerabodySettingAdd(params).then(res =>{
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
        this.$api.camerabodySettingUpdate(params).then(res =>{
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
      this.windowdialogVisible = false;
    },
    getWindowSettingsList() {
      // 获取列表
      var params = {}
      params.size = this.size;
      params.page = this.page;
      this.$api.camerabodySettingGetAll(params).then(res => {
        if (res.status === 1 || res.status === '1') {
           res.list.map(item=>{
              this.objlist.map(item1=>{
                if(item.deviceType == item1.code){
                  item.deviceType = item1.name;
                }
              })
            })
            this.state.List = res.list;
            this.state.Colums = res.table;
            this.state.Page = res.page;
            this.state.Total = res.total;
        } else {
            console.log('error');
        }
      })
    },
    getDevictTypeList() {
      // 获取设备类型列表
      this.$api.getwindowDevictTypeList().then(res => {
        if (res.status === 1 || res.status === '1') {
            this.deviceTypeList = res.data;   
        } else {
            console.log('error');
        }
      })
    },
    changeDecideType() {
      this.deviceTypeList.map(item => {
        if (item.name === this.CurrentValue.deviceType ) {
          this.CurrentValue.deviceTypeCode =  item.code;
          console.log(this.CurrentValue);
        }
      })
    },
    changeHeight() {
      let newValue = this.CurrentValue.height.replace(/[^0-9]/ig,"");
      return newValue;
    },
    changeWidth() {
      let newValue = this.CurrentValue.width.replace(/[^0-9]/ig,"");
      return newValue;
    },
    handleLeafNode (item) {
      // this.orgCode = item.id
      console.log(item.id)
      var params = {}
      params.size = this.size;
      params.page = this.page;
      this.orgCode = item.id;
      params.orgCode = item.id;
      this.$api.deviceSettingGetList(params).then(res => {
        if (res.status === 1 || res.status === '1') {
           res.list.map(item=>{
              this.objlist.map(item1=>{
                if(item.deviceType == item1.code){
                  item.deviceType = item1.name;
                }
              })
              this.departmentlist.map(item2=>{
                if(item.sysOrgCode == item2.sysOrgCode){
                  item.sysOrgCode = item2.departname;
                }
              })
              if(item.supportChinese == 0){
                item.supportChinese ='否';
              } else {
                item.supportChinese ='是';
              }
            })
            this.state.List = res.list;
            this.state.Colums = res.table;
            this.state.Page = res.page;
            this.state.Total = res.total;
        } else {
            console.log('error');
        }
      })
    },
    // 获取部门数据
    getDepartmentlist() {  //获取检查科室列表
      this.$api.getBasicDepartmentlistApi().then(res => {
          console.log(res);
          var data = res
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
    // 获取设备类型数据
    getObjList() {  //获取检查科室列表
      this.$api.getLeftDeviceTypeListApi().then(res => {
          console.log(res);
          var data = res
          if (data.status == 1) {
            console.log("-----&&&&-----" + data.data);
            this.objlist = data.data;
          } else {
            return false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

.centenWidnow{
  background-color: #bdbebe;
  >>> .el-dialog__title {
    font-size: 12px !important;
    color: #606266 !important;
  }
  >>> .el-form-item__label{
    font-size: 12px !important;
  }
  >>> .el-input__inner{
    font-size: 12px !important;
  }
  >>> .el-select-dropdown__item {
    font-size: 12px !important;
  }
  >>> .el-textarea__inner{
    font-size: 12px !important;
  }
  >>> .el-select-dropdown__item span{
    font-size: 12px !important;
  }
  .left-tree {
    // flex: none;
    width: 300px;
    float:left;
  }
  >>> .el-table .cell{
    font-size:12px;
  }
}
.el-select-dropdown__item{
  font-size: 12px !important;
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
    text-align: center;
    background-color: #e2e0e0;
  }
</style>
