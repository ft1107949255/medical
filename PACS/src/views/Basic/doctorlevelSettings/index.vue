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

      <!-- 表单模块 -->
      <Popup v-model="isShowForm" @handleSure="handleSave" :title="formTitle">
        <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="等级code:" prop="levelCode">
            <el-input v-model="ruleForm.levelCode" :disabled="canshow"></el-input>
          </el-form-item>
          <el-form-item label="等级名称:" prop="levelName">
            <el-input v-model="ruleForm.levelName"></el-input>
          </el-form-item>
          <el-form-item label="启用状态:" prop="levelStatus">
            <el-select v-model="ruleForm.levelStatus" filterable>
              <el-option 
                label="否"
                value="0">
              </el-option>
              <el-option 
                label="是"
                value="1">
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
  </div>
</template>

<script>
// 私有组件
import layout from 'Components/src/layout';
import Popup from 'Components/src/popup'
import Card from 'Components/src/card'
import CustomList from 'Components/src/customList'
import mixinTable from 'Mixin/table'
import formList from 'Components/src/formList'
import pagination from  "../../components/table/Pagination.vue";
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
    formList
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
      thisdata: {},
      size: 15,  // 分页数量
      page: 1,   // 当前页
      pageS: 1,  // 搜索当前页
      otherHeight: 160,
      tableHeader: [
        {
          label: '创建人',
          value: 'createName',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '创建时间',
          value: 'createTime',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '更新人',
          value: 'updateName',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '更新时间',
          value: 'updateTime',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '等级Code',
          value: 'levelCode',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
          validate: '*',
          editNoShow: true
        },
        {
          label: '等级名称',
          value: 'levelName',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'text',
          validate: '*'
        },
        {
          label: '等级状态',
          value: 'levelStatus',
          isShowList: true,
          isQuery: true,
          isForm: false,
          fieldType: 'text',
          formType: 'list',
          validate: '*',
          dict: [
            {
              label: '未启用',  
              value: '0'
            },
            {
              label: '启用',  
              value: '1'
            },
          ],
        }
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
        list: 'getDoctorLevelList',
        add: 'saveDoctorLevel',
        update: 'saveDoctorLevel',
        del: 'delDoctorLevel'
      },
      ruleForm: {
        levelCode: '',
        levelName: '',
        levelStatus: '',
        id: ''
      },
      rules:{
        levelCode: [
          {required: true, message: '请输入编码', trigger: 'blur'}
        ],
        levelName: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        levelStatus: [
          {required: true, message: '请选择启用状态', trigger: 'change'}
        ],
      },
      canshow: true
    };
  },
  created() {
    this.getData();
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
      this.ruleForm.id = '';
      this.ruleForm.levelCode = '';
      this.ruleForm.levelName =  '';
      this.ruleForm.levelStatus =  '';
      this.canshow = false
      this.mixinTableAdd()
    },
    // 保存
    handleSave() {
      // console.log({ table: this.tableName, data: [this.currentRow] })
      this.$refs.ruleForm.validate().then(res => {
        if (res) {
          this.mixinTableSave(this.ruleForm)
        }
      })
    },
    // 编辑按钮
    handleEdit() {
      this.mixinTableEdit()
      this.ruleForm.id = this.currentRow.id;
      this.ruleForm.levelCode = this.currentRow.levelCode;
      this.ruleForm.levelName =  this.currentRow.levelName;
      this.ruleForm.levelStatus =  this.currentRow.levelStatus;
      this.canshow = true
      
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
    submitSave (data) {
      this.condition = data
      this.getData()
    },
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
      this.mixinGetData({levelName: this.inputstr})
    },
    handleIndexChange() {},
    handleSizeChange() {},
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
