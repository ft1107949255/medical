<template>
  <div class="centenWidnow">
    <layout>
      <!-- <div slot="left-module">1
      </div> -->
      <div slot="botton-group">
        <div class="tiaoz">
          <el-input class="paddings"   size="small" placeholder="按名称查询" clearable v-model="inputstr"/>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-search"  @click="isSearch">查询</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-plus"  @click="handleAdd" >新增</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-edit"  @click="handleEdit">修改</el-button>
          <el-button class="setButton" type="primary" size="small" icon="el-icon-delete"  @click="handleDel">删除</el-button>
        </div>
      </div>
      <div style="height:100%">
       <custom-list >
      <!-- table模块 -->
      <el-table
          ref="multipleTable"
          :data="data"
          :height="tableHeight"
          class="screen-height"
          tooltip-effect="dark"
          highlight-current-row
          show-overflow-tooltip
          @current-change="handleCurrentChange"
          @selection-change="handleSelectionChange"
          >
          <!-- 索引 -->
          <el-table-column type="index" width="40" fixed="left"></el-table-column>
          <!-- 多选 -->
          <el-table-column type="selection" width="45" fixed="left"></el-table-column>
          <!-- table数据主体 -->
          <el-table-column show-overflow-tooltip v-for="(item, index) in filteredHead" :key="index" :min-width="item.width" :prop="item[mixinOptions.value]" :label="item[mixinOptions.label]">
            <template slot-scope="scope">
              {{ findParamsLabel(scope.row[item[mixinOptions.value]], item[[mixinOptions.dict]]) }}
            </template>
          </el-table-column>
      </el-table>
      <Popup v-model="isShowForm" @handleSure="handleSave" :title="formTitle">
        <el-form :model="ruleForm" :rules="rules" :inline="inline" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="用户账号:" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户名称:" prop="realName">
            <el-input v-model="ruleForm.realName"></el-input>
          </el-form-item>
          <el-form-item label="用户密码:" prop="password" v-show="isvapwd">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="checkpassword" v-show="isvapwd">
            <el-input type="password" v-model="ruleForm.checkpassword"></el-input>
          </el-form-item>
          <el-form-item label="手机:" prop="mobilePhone">
            <el-input v-model="ruleForm.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="办公电话:" prop="officePhone">
            <el-input v-model="ruleForm.officePhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="组织机构:" prop="departId">
            <!-- <el-input v-model="ruleForm.realName"></el-input> -->
            <el-cascader
              :options="departmentListTree"
              v-model="ruleForm.departId"
              :props = "props"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="角色名称:" prop="roleId">
            <el-select v-model="ruleForm.roleId" filterable>
              <el-option 
                v-for='(item,k) in roleList'
                :key='k'
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医生等级:" prop="doctorLevelCode">
            <el-select v-model="ruleForm.doctorLevelCode" filterable>
              <el-option 
                v-for='(item,k) in doctorLevelList'
                :key='k'
                :label="item.levelName"
                :value="item.levelCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </Popup>
      <el-pagination
          slot="paging"
          background
          @size-change="handleSizeChange"
          @current-change="getData(currentPage)"
          :current-page.sync="currentPage"
          :page-sizes="pageSizes"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
      </custom-list>
      </div>
      <div slot="paging">
      </div>
    </layout>
    <!-- 表单 -->
    
  </div>
</template>

<script>
// 私有组件
import layout from 'Components/src/layout';
import Popup from 'Components/src/popup'
import Card from 'Components/src/card'
import CustomList from 'Components/src/customList'
import mixinTable from 'Mixin/table'
import pagination from  "../../components/table/Pagination.vue";
import {formatTree} from '../../../utils/tools.js'
let stamp = Math.random().toString(36).substr(2)
export default {
  name: 'singlePage' + stamp,
  mixins: [mixinTable],
  components: {
    layout,
    mixinTable,
    pagination,
    Popup,
    Card,
    CustomList,
  },
  data() {
    var checkPassword = (rule, value, callback) => {
      // 先判断是否需要验证密码
      if (this.isvapwd) {
        if (this.ruleForm.password !== '' && value === '') {
         callback('请确认密码！！') 
        } else if (this.ruleForm.password !== value ) {
          callback('两次密码输入不一致！！')
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var vpassword = (rule, value, callback) => {
      // 先判断是否需要验证密码
      if (this.isvapwd) {
        if (value === '') {
         callback('请输入密码！！') 
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var checkPhone = (rule, value, callback) => {
      // 判断是否手机
      // 先判断长度 当手机不为空的时候验证
      if (value !== '') {
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
      } else {
        callback();
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
      thisdata: {},
      size: 15,  // 分页数量
      page: 1,   // 当前页
      pageS: 1,  // 搜索当前页
      otherHeight: 160,
      tableHeader: [
        {
          label: '手机',
          value: 'mobilePhone',
          isShowList: false,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '办公电话',
          value: 'officePhone',
          isShowList: false,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '邮箱',
          value: 'email',
          isShowList: false,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '用户账号',
          value: 'userName',
          isShowList: true,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '用户名称',
          value: 'realName',
          isShowList: true,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '密码',
          value: 'password',
          isShowList: false,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'password',
        },
        {
          label: '用户类型',
          value: 'userTypeName',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '组织机构',
          value: 'departName',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '角色',
          value: 'userKey',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '创建日期',
          value: 'createDate',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '状态',
          value: 'statusName',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '医生等级',
          value: 'doctorLevelName',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
        },
      ],
      // 自定义配置项
      customOptions: {
        label: 'label',
        value: 'value',
        isShowList: 'isShowList',
        isQuery: 'isQuery',
        isForm: 'isForm',
        dict: 'dict',
        fieldType: 'fieldType',
        formType: 'formType',
        validate: 'validate'
      },

      // tableApi
      tableApi: {
        list: 'getUserInfoList',
        add: 'saveUserInfo',
        update: 'saveUserInfo',
        del: 'delUserInfo'
      },
      ruleForm: {
        mobilePhone: '',
        officePhone: '',
        email: '',
        userName: '',
        realName: '',
        departId: [],
        roleId : '',
        doctorLevelCode: '' ,
        doctorLevelName: '',
        password: '',
        checkpassword: ''
      },
      inline:true,
      rules: {
        departname: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
        ],
        mpnile: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
        ],
        realName: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
        ],
        mobilePhone: [
          { validator:checkPhone, trigger:'blur'},
        ],
        departId: [
          { required: true, message: '请选择组织', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger:'change'} 
        ],
        doctorLevelCode: [
          { required: true, message: '请选择医生等级', trigger:'change'} 
        ],
        password: [
          { required: true, validator:vpassword, trigger:'blur'}
        ],
        checkpassword: [
          { required: true, validator:checkPassword, trigger:'blur'}
        ]
      },
      roleList: [], // 角色列表
      departmentList: [], // 组织结构列表
      departmentListTree: [], // tree状
      selectedOptions: [],
      doctorLevelList: [], // 医生等级列表
      props: {
        value: 'id',
        label: 'departname',
        children: 'list'
      },
      isvapwd: true  // 判断是否需要验证密码
    };
  },
  created() {
    this.getData();
    this.departmentInfo()
    this.roleInfo()
    this.doctorlevelInfo()
  },
  computed: {
    currentDate () {
      return new Date().getTime()
    }
  },
  methods: {
    getDateFormat (type) {
      return (type === 'date') ? 'yyyy-MM-dd' : 'yyyy-MM-dd hh:mm:ss'
    },
    // 添加按钮
    handleAdd() {
      // 显示密码框
      this.isvapwd = true
      this.ruleForm.mobilePhone = '';
      this.ruleForm.officePhone = '';
      this.ruleForm.email = '';
      this.ruleForm.userName =  '';
      this.ruleForm.realName = '';
      this.ruleForm.departId =  [];
      this.ruleForm.roleId =  '';
      this.ruleForm.doctorLevelCode = '' ;
      this.ruleForm.doctorLevelName = '';
      this.ruleForm.password =  '';
      this.isShowForm = true
    },
    // 保存
    handleSave() {
      this.$refs.ruleForm.validate().then(res => {
        if (res) {
          console.log(111)
          console.log(this.ruleForm.departId)
          if(typeof(this.ruleForm.departId) === 'string') {
            this.ruleForm.departId = [this.ruleForm.departId]
          }
          this.ruleForm.departId = this.ruleForm.departId.pop()
          this.doctorLevelList.forEach(item => {
            if (item.levelCode === this.ruleForm.doctorLevelCode) {
              this.ruleForm.doctorLevelName = item.levelName
            }
          })
          this.$api.saveUserInfo(this.ruleForm).then(res => {
            this.isShowForm = false
            this.getData()
          })
        }
      })
    },
    // 编辑按钮
    handleEdit() {
      // 修改的时候不需要弹出密码框
      this.isvapwd = false
      this.mixinTableEdit()
      this.ruleForm.id = this.currentRow.id
      this.ruleForm.mobilePhone = this.currentRow.mobilePhone
      this.ruleForm.officePhone = this.currentRow.officePhone
      this.ruleForm.email = this.currentRow.email
      this.ruleForm.userName = this.currentRow.userName
      this.ruleForm.realName = this.currentRow.realName
      this.ruleForm.departId =  [];
      this.ruleForm.roleId = ''
      this.ruleForm.doctorLevelCode = this.currentRow.doctorLevelCode ;
      this.ruleForm.password = ''
      this.roleList.forEach(item => {
        if (this.currentRow.userKey === item.roleName) {
          this.ruleForm.roleId =  item.id;
        }
      })
      this.departmentList.forEach(item => {
        if (this.currentRow.departName === item.departname) {
          this.ruleForm.departId = this.familyTree(this.departmentList, item.id).reverse()
        }
      })
      
      // this.$refs.ruleForm.validate().then(res => {
      //   if (res) {
      //     this.ruleForm.departId = this.ruleForm.departId.pop()
      //     this.doctorLevelList.forEach(item => {
      //       if (item.levelCode === this.ruleForm.doctorLevelCode) {
      //         this.ruleForm.doctorLevelName = item.levelName
      //       }
      //     })
      //     this.$api.saveUserInfo(this.ruleForm).then(res => {
      //       this.isShowForm = false
      //       this.getData()
      //     })
      //   }
      // })
    },
    // 批量删除
    handleDel() {
      this.mixinTableDel()
    },
    // 查看
    handleSee() {
      this.mixinTableSee()
    },
    // 切换副表数据
    changeSubTable () {
      this.currentSubTableData = this.sub_list.filter(item => item.tableName === this.currentSubTable)
    },
    // 查询数据
    // submitSave () {
    //   this.handleSave()
    //   this.getData()
    // },
    // 搜索取消按钮
    handleCancel () {
      this.isShowSearch = false
    },
    // 请求数据
    getData(cpage) {
      if (typeof(cpage) !== 'undefined' && cpage >= 0) {
        this.mixinGetData({page: cpage})
      } else {
        this.mixinGetData()
      }
    },
    isSearch() {
      this.mixinGetData({userName: this.inputstr})
    },
    handleChange(val) {
      // console.log(val)
      // console.log(this.ruleForm.departid)
    },
    handleIndexChange() {},
    handleSizeChange() {},
    departmentInfo() {
      this.$api.getAllDepart().then(res => {
        let options = {
          parentId: 'parentId',
          id: 'id',
          childrens: 'list'
        }
        this.departmentListTree =  formatTree(res.data,options)
        this.departmentList = res.data
      })
    },
    roleInfo() {
      this.$api.getAllRoles().then(res => {
        this.roleList = res.data
      })
    },
    doctorlevelInfo() {
      this.$api.getAllDoctorlevel().then(res => {
        this.doctorLevelList = res.data
      })
    },
    familyTree(arr, parentId) {
      var temp = [];
      var forFn = function(arr, parentId) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          if (item.id == parentId) {
            temp.push(item.id);
            forFn(arr, item.parentId);
          }
        }
      };
      forFn(arr, parentId);
      return temp;
    }
  },
  watch: {
    $route: function() {
      // 路由是否变化
      this.tableName = this.$route.query.id
      this.site_code_format = this.$route.query.site_code_format
      this.getData()
    }
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
  >>> .el-textarea__inner{
    font-size:12px !important;
  }

  >>> .popup .el-input {
    width:90%;
  }
  >>> .el-form-item__content {
    width:178px;
  }
  .el-table{
    width:99%;
    height:100% !important;
    >>> td, th, th.is-leaf {
      border: none !important;
    }
    >>> .cell {
      font-size:12px;
    }
  }
  >>> .is-leaf{
    border: none;
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
  text-align: center;
  background-color: #e2e0e0;
}
</style>
