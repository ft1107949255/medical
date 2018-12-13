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
        <div class="left-tree" v-if="isShowTree">
          <tree @handleLeafNode="handleLeafNode"></tree>
        </div>
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
        <form-list
          ref="formList"
          v-model="currentRow"
          :renderMode="formMode"
          :options="mixinOptions"
          v-if="filterFormHead.length"
          :inline="true"
          :formData="filterFormHead"
          ></form-list>
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
import tree from "../../components/trees/tree.vue";
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
    formList,
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
      thisdata: {},
      size: 15,  // 分页数量
      page: 1,   // 当前页
      pageS: 1,  // 搜索当前页
      otherHeight: 160,
      isShowTree: true,
      tableHeader: [
        {
          label: '名称',
          value: 'name',
          isShowList: true,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
          validate: '*'
        },
        {
          label: '代码',
          value: 'code',
          isShowList: false,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
          validate: '*',
        },
        {
          label: '拼音',
          value: 'spelling',
          isShowList: false,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '房间',
          value: 'room',
          isShowList: false,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: 'IP地址',
          value: 'ip',
          isShowList: true,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
          validate: '*, ip'
        },
        {
          label: '端口',
          value: 'port',
          isShowList: true,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
          validate: '*, port'
        },
        {
          label: 'AETitle',
          value: 'aetitle',
          isShowList: true,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
          validate: '*'
        },
        {
          label: '生产商',
          value: 'factory',
          isShowList: false,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'text',
        },
        {
          label: '设备类型',
          value: 'deviceType',
          isShowList: true,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'list',
          validate: '*',
          dict:this.getDevictTypeList()
        },
        {
          label: '所属科室',
          value: 'sysOrgCode',
          isShowList: true,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'list',
          validate: '*',
          dict:this.getDepartmentList()
        },
        {
          label: '中文支持',
          value: 'supportChinese',
          isShowList: true,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'list',
          validate: '*',
          dict:[
            {
              label: '是',
              value: '1'
            },
            {
              label: '否',
              value: '0'
            }
          ]
        },
        {
          label: '字体编码',
          value: 'characterSet',
          isShowList: true,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'list',
          validate: 'checkCharact',
          dict:[
            {
              label: 'GBK',
              value: 'GBK'
            },
            {
              label: 'GB18030',
              value: 'GB18030'
            },
            {
              label: 'utf8',
              value: 'utf8'
            }
          ]
        },
        {
          label: '备注',
          value: 'memo',
          isShowList: true,
          isQuery: true,
          isForm: true,
          fieldType: 'text',
          formType: 'textarea',
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
        list: 'deviceSettingGetList',
        add: 'deviceSettingAdd',
        update: 'deviceSettingUpdate',
        del: 'deviceSettingdel'
      },
      orgCode: ''
    };
  },
  created() {
    this.getData();
    // this.getDevictTypeList();
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
      this.mixinTableAdd()
    },
    // 保存
    handleSave() {
      // console.log({ table: this.tableName, data: [this.currentRow] })
      this.$refs.formList.validate().then(res => {
        if (res) {
          this.mixinTableSave(this.currentRow)
        }
      })
    },
    // 编辑按钮
    handleEdit() {
      this.mixinTableEdit()
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
        this.mixinGetData({page: cpage, sysOrgCode: this.orgCode})
      } else {
        this.mixinGetData({sysOrgCode: this.orgCode})
      } 
    },
    isSearch() {
      this.mixinGetData({name: this.inputstr, sysOrgCode: this.orgCode})
    },
    handleIndexChange() {},
    handleSizeChange() {},
    getDevictTypeList() {
      // 获取设备类型列表
      let deviceTypeList = []
      this.$api.getwindowDevictTypeList().then(res => { 
        res.data.map(item=>{
          let m = {}
          m['label'] = item.name;
          m['value'] = item.code;
          deviceTypeList.push(m);
        })
      })
      return deviceTypeList;
    },
    getDepartmentList() {
      // 获取设备类型列表
      let departmentList = []
      this.$api.getBasicDepartmentlistApi().then(res => { 
        res.data.map(item=>{
          let m = {}
          m['label'] = item.departname;
          m['value'] = item.orgCode;
          departmentList.push(m);
        })
      })
      return departmentList;
    },
    handleLeafNode(item) {
      this.orgCode = item.id;
      this.mixinGetData({sysOrgCode: this.orgCode})
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
  >>> .el-select-dropdown__item {
    font-size: 12px !important;
  }
  >>> .el-select-dropdown__item span{
    font-size: 12px !important;
  }
  .el-table{
    width: calc(100% - 300px);
    height:100% !important;
    >>> td, th, th.is-leaf {
      border: none !important;
    }
    >>> .cell{
      font-size:12px;
    }
  }
  >>> .is-leaf{
    border: none;
  }
    >>> .el-tree-node__label{
    font-size:12px;
  }
  >>> .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color:#c8c8c8;
  }
}
.isActive {
  background-color: $blue;
  color: $colorWhite;
}
.left-tree {
    // flex: none;
    width: 300px;
    float:left;
    height:100%;
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
