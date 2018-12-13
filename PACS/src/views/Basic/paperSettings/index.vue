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
      <div>
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

    <!--纸张配置设置-->
    <div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="windowdialogVisible"
        width="35%"
        :before-close="handleClose"
        center
        >
        <el-form ref="window" :model="CurrentValue" label-width="80px">
          <el-row>
              <el-col :span="11">
                <el-form-item label="纸张名称:">
                  <el-input v-model="CurrentValue.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="宽度:">
                  <el-input v-model="CurrentValue.paperWidth"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="高度:">
                  <el-input v-model="CurrentValue.paperHeight"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="纸张来源:">
                    <el-select v-model="CurrentValue.paperResoure" placeholder="请选择" >
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
                  <el-input v-model="CurrentValue.description"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="默认纸张:">
                  <el-select v-model="CurrentValue.defaultPaper"  placeholder="请选择" >
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
export default {
  components: {
    layout,
    Table,
    pagination
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
        paperWidth: '',
        paperHeight: '',
        paperResoure: '',
        description: '',
        defaultPaper: '',
        id: ''
      },  // 当前值
      thisdata: {},
      size: 15,  // 分页数量
      page: 1,   // 当前页
      pageS: 1,  // 搜索当前页
      otherHeight: 160,
      windowdialogVisible: false, // 增加或修改弹框
      deleteialog: false,  // 删除框
      deviceTypeList: {},
      dialogTitle: '新增纸张配置管理',
      options: [{
          value: 0,
          label: '系统默认'
        }, {
          value: 1,
          label: '用户自定义'
        }],
    };
  },
  created() {
    // this.getDevictTypeList();
    this.getWindowSettingsList();
  },
  methods: {
    isSearch() {
      var params = {};
      params.name = this.inputstr;
      if (params.name !== '') {
        params.page = this.pageS;
      } else {
        params.page = this.page;
      }
      params.size = this.size;
      this.$api.paperSettingGetAll(params).then(res => {
        if (res.status === 1 || res.status === '1') {
           res.list.map(item=>{
            if(item.defaultPaper == 0){
                item.defaultPaper = '系统默认';
            }else{
              item.defaultPaper = '用户自定义';
            }
            if(item.paperResoure == 0){
                item.paperResoure = '系统默认';
            }else{
              item.paperResoure = '用户自定义';
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
    isAdd() {
      this.CurrentValue.name = '';
      this.CurrentValue.paperWidth = '';
      this.CurrentValue.paperHeight = '';
      this.CurrentValue.paperResoure = '';
      this.CurrentValue.description = '';
      this.CurrentValue.defaultPaper = '';
      this.CurrentValue.id = '';
      // 取消表格高亮
      this.$refs.Table.cancelHightLight();
      this.dialogTitle = '新增纸张配置管理';
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
      this.dialogTitle = '修改纸张配置管理'
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
      this.$api.paperSettingDel(params).then(res => {
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
      this.CurrentValue.name = val.name;
      this.CurrentValue.paperWidth = val.paperWidth;
      this.CurrentValue.paperHeight = val.paperHeight;
      this.CurrentValue.paperResoure = val.paperResoure;
      this.CurrentValue.description = val.description;
      this.CurrentValue.defaultPaper = val.defaultPaper;
      this.CurrentValue.id = val.id;
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
       if(params.paperResoure == "系统默认"){
             params.paperResoure=0;
          }else {
            if(params.paperResoure != 0){
               params.paperResoure=1; 
            }else{
              params.paperResoure=0;
            }
          }
         if(params.defaultPaper == "系统默认"){
             params.defaultPaper=0;
          }else {
            if(params.defaultPaper != 0){
              paramsdefaultPaper=1; 
            }else{
              params.defaultPaper=0;
            }
         }
      if (this.dialogTitle === '新增纸张配置管理') {
        // add
        this.$api.paperSettingAdd(params).then(res =>{
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
        this.$api.paperSettingUpdate(params).then(res =>{
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
      this.$api.paperSettingGetAll(params).then(res => { 
        if (res.status === 1 || res.status === '1') {
          res.list.map(item=>{
           if(item.defaultPaper == 0){
              item.defaultPaper = '系统默认';
           }else{
             item.defaultPaper = '用户自定义';
           }
           if(item.paperResoure == 0){
              item.paperResoure = '系统默认';
           }else{
             item.paperResoure = '用户自定义';
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
  >>> .el-select-dropdown__item span{
    font-size: 12px !important;
  }
}
  .el-select-dropdown__item {
    font-size: 12px !important;
  }
  .el-select-dropdown__item span{
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
