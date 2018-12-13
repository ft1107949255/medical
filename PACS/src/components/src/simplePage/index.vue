<template>
  <div class="simplePage">
    <custom-list :isShowSearch="isShowSearch" :searchWidth="searchWidth">
      <!-- table模块 -->
      <el-table
          ref="multipleTable"
          :data="data"
          stripe
          border
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

      <!-- 搜索模块 -->
      <div class="search" slot="search">
        <form-list
          ref="searchList"
          renderMode="search"
          v-if="searchFormData.length"
          :inline="false"
          :options="mixinOptions"
          :formData="searchFormData"
          @submitSave="submitSave"
          @handleCancel="handleCancel"
          ></form-list>
      </div>

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

      <!-- 按钮组 -->
      <el-button-group class="button-group" slot="btn-group">
          <el-button type="default" plain size="mini" icon="el-icon-plus" v-if="buttons.indexOf('#add') === -1 && filterFormHead.length" @click="handleAdd">添加</el-button>
          <el-button type="default" plain size="mini" icon="el-icon-edit" v-if="buttons.indexOf('#update') === -1 && filterFormHead.length" @click="handleEdit">编辑</el-button>
          <el-button type="default" plain size="mini" icon="el-icon-delete" v-if="buttons.indexOf('#delete') === -1" @click="handleDel">删除</el-button>
          <el-button type="default" plain size="mini" icon="el-icon-search" v-if="buttons.indexOf('#detail') === -1 && filterFormHead.length" @click="handleSee">查看</el-button>
          <el-button type="default" plain size="mini" icon="el-icon-refresh" @click="getData">刷新</el-button>
          <el-button type="default" plain size="mini" icon="el-icon-search" v-if="searchFormData.length" @click="search">搜索</el-button>
          <!-- <el-button type="default" plain size="mini" class="import" v-if="buttons.indexOf('#import') === -1" icon="el-icon-upload2" @click="mixinImportExecl">
            Execl导入
            <input type="file">
          </el-button>
          <el-button type="default" size="mini" v-if="buttons.indexOf('#excel') === -1" icon="el-icon-download" @click="mixinExportExecl">Execl导出</el-button> -->
      </el-button-group>

      <!-- 分页 -->
      <el-pagination
        slot="paging"
        background
        @size-change="changePageSize"
        @current-change="getData"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </custom-list>

    <Popup v-model="isShowForm" @handleSure="handleSave" :title="formTitle" v-show="false">
        <!-- 表单模块  :rules="formRules" -->
        <el-form ref="form" class="inline-form" :model="currentRow" :inline="true" label-width="140px" v-if="filterFormHead.length">
          <el-form-item :label="item.CONTENT" v-for="(item, index) in filterFormHead" :key="index">

            <!-- 文本框 -->
            <el-input class="item-width" v-model="currentRow[item.FIELD_NAME]" :disabled="!canEdit" v-if="item.SHOW_TYPE === 'text'"></el-input>

            <!-- 下拉框 -->
            <el-select class="item-width" v-model="currentRow[item.FIELD_NAME]" :disabled="!canEdit" placeholder="请选择" v-if="item.SHOW_TYPE === 'list'">
              <el-option v-for="(item, index) in item.DICT_LIST" :key="index" :label="item.TYPENAME" :value="item.TYPECODE"></el-option>
            </el-select>

            <!-- 文本域 -->
            <el-input class="item-width" type="textarea" autosize v-model="currentRow[item.FIELD_NAME]" :disabled="!canEdit" v-if="item.SHOW_TYPE === 'textarea'"></el-input>

            <!-- 单选 -->
            <el-radio-group v-model="currentRow[item.FIELD_NAME]" v-if="item.SHOW_TYPE === 'radio'" :disabled="!canEdit">
              <el-radio :label="item.TYPECODE" v-for="(item, index) in item.DICT_LIST" :key="index">{{ item.TYPENAME }}</el-radio>
            </el-radio-group>

            <!-- 复选 -->
            <el-checkbox-group v-model="currentRow[item.FIELD_NAME]"  v-if="item.SHOW_TYPE === 'checkbox'" :disabled="!canEdit">
              <el-checkbox :label="item.TYPECODE" v-for="(item, index) in item.DICT_LIST" :key="index">{{ item.TYPENAME }}</el-checkbox>
            </el-checkbox-group>

            <!-- 时间日期选择器 -->
            <el-date-picker
              class="item-width"
              v-model="currentRow[item.FIELD_NAME]"
              :type="item.SHOW_TYPE"
              :default-value="currentDate"
              :disabled="!canEdit"
              :value-format="getDateFormat(item.SHOW_TYPE)"
              placeholder="选择日期时间"
              v-if="item.SHOW_TYPE === 'date' || item.SHOW_TYPE === 'datetime'"
              ></el-date-picker>
          </el-form-item>
        </el-form>

        <!-- 副表标题组 -->
        <el-tabs v-model="currentSubTable" type="card" @tab-click="changeSubTable">
          <el-tab-pane :label="item.TABLENAME" :name="item.table" v-for="(item, index) in sub_list" :key="index">
            <!-- 副表列表 -->
            <el-table
                ref="multipleTable"
                :data="currentSubTableData"
                stripe
                border
                tooltip-effect="dark"
                v-if="currentSubTableData.length"
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
                <el-table-column show-overflow-tooltip v-for="(item, index) in item.table_field" :key="index" :min-width="item.width" :prop="item.FIELD_NAME" :label="item.CONTENT">
                  <template slot-scope="scope">
                    <span v-if="!canEdit"></span>
                    <div v-else>
                      <el-input v-model="scope.row[item.FIELD_NAME]" v-if="item.SHOW_TYPE === 'text'"></el-input>
                    </div>
                  </template>
                </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>

      </Popup>
  </div>
</template>

<script>
import Popup from 'Components/src/popup'
import Card from 'Components/src/card'
import CustomList from 'Components/src/customList'
import myTable from 'Components/src/table'
import mixin from 'Mixin/events'
import mixinTable from 'Mixin/table'
import formList from '../formList'
// Random string
let stamp = Math.random().toString(36).substr(2)
export default {
  name: 'singlePage' + stamp,
  mixins: [mixin, mixinTable],
  components: {
    myTable,
    Popup,
    Card,
    CustomList,
    formList
  },
  data() {
    return {

      // 自定义表头字段
      tableHeader: [
        {
          label: '名称',
          value: 'name',
          isShowList: true,
          isQuery: true,
          isForm: true
        }
      ],
      // 自定义配置项
      customOptions: {
        label: 'CONTENT',
        value: 'FIELD_NAME',
        isShowList: 'IS_SHOW_LIST',
        isQuery: 'IS_QUERY',
        isForm: 'IS_SHOW',
        dict: 'DICT_LIST',
        fieldType: 'TYPE',
        formType: 'SHOW_TYPE',
        validate: 'FIELD_VALID_TYPE'
      },

      // tableApi
      tableApi: {
        list: 'getBasicDepartmentlistApi'
      }
    }
  },
  created() {
    this.getData()
  },
  computed: {
    currentDate () {
      return new Date().getTime()
    }
  },
  methods: {
    // 获取当前时间控制格式化方案
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
          this.submitForm({ table: this.tableName, data: [this.currentRow] })
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
    getData() {
      this.mixinGetData()
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
}
</script>

<style lang='stylus' scoped>
.import {
  position: relative;
}

.simplePage .content {
  width: 100%;
  display: flex;
  .content-table {
    flex: 1;
    transition: width 1s;
  }
  .content-search {
    flex: none;
    background: red;
    transition: width 1s;
  }
}
</style>
