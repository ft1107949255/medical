/**
 * table 混入
 */
const mixin = {
  data() {
    return {
      data: [],
      head: [],
      // 自定义tableHeader
      tableHeader: [],

      // 表单头部标题
      formTitle: '',

      // 操作表名
      tableName: '',
      // 当前选中行
      currentRow: {},
      // 是否显示表单信息
      isShowForm: false,
      // 表单模式
      formMode: 'edit',
      // 是否能编辑数据
      canEdit: true,

      // 主表表单头部字段
      filterFormHead: [],
      // 主表列表头部字段
      filteredHead: [],
      // 主表查询表单data
      searchFormData: [],
      formRules: {},
      // 查询表单对象
      condition: [],
      // 按钮权限字段
      buttons: [''],
      // 自定义规则
      costomeValidate: {},

      // 分页操作
      total: 0,
      pageSize: 10,
      currentPage: 1,
      pageSizes: [10, 30, 50, 100],

      // 多选数组
      selectArr: [],

      // 是否显示搜索栏
      isShowSearch: false,
      // 搜索栏宽度
      searchWidth: 0,
      // 搜索栏查询对象
      searchData: {},

      // 接口方法对象
      tableApi: {},
      // 默认接口方法对象
      defaultApi: {
        list: 'querySingle', // 获取列表
        add: 'addSingle', // 添加
        del: 'delSingle', // 删除
        update: 'editSingle', // 编辑
        export: '', // 导出execl
        import: '' // 导入execl
      },

      // 默认配置参数
      defaultOptions: {
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
      // 自定义配置参数,
      customOptions: {
      }
    }
  },
  computed: {
    mixinApi () {
      return Object.assign(this.defaultApi, this.tableApi)
    },
    mixinOptions () {
      return Object.assign(this.defaultOptions, this.customOptions)
    }
  },
  methods: {
    // 点击搜索按钮
    search () {
      this.isShowSearch = !this.isShowSearch
    },
    // 表单验证
    submitForm(sendData, formName = 'form') {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.mixinTableSave(sendData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改pageSIze
    changePageSize (val) {
      this.pageSize = val
      this.getData()
    },
    // 多选
    handleSelectionChange(val) {
      this.selectArr = val
    },
    // 单选
    handleCurrentChange(row) {
      this.toggleSelection()
      this.toggleSelection([row])
    },
    // 设置选中项
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 判断是否有选中项
    hasSelect () {
      if (!this.selectArr.length) {
        this.$message.error('亲，您还没选中任何的一条数据哦！')
        return false
      }
      return true
    },
    // 判断是否只选择了一个项
    hasOneSelect () {
      if (this.selectArr.length > 1) {
        this.$message.error('亲，同时只能操作一条数据的哦!')
        return false
      }
      return true
    },
    // 添加按钮
    mixinTableAdd() {
      this.currentRow = {}
      // this.filterFormHead.forEach(item => {
      //   Object.defineProperty(this.currentRow, item.FIELD_NAME, {
      //     value: '',
      //     configurable: true,
      //     writable: true,
      //     emumerable: true
      //   })
      // })
      this.formTitle = '录入'
      this.isShowForm = true
      this.canEdit = true
    },
    // 保存
    mixinTableSave(sendData) {
      this.$confirm('您确定保存当前数据？').then(res => {
        let apiName = this.formTitle === '编辑' ? this.mixinApi.update : this.mixinApi.add
        this.mixinAjax(apiName, sendData)
      })
    },
    // 添加请求
    mixinAjax(apiName, sendData) {
      this.$api[apiName](sendData)
        .then(({ message }) => {
          this.isShowForm = false
          this.getData()
          this.$message(message)
        })
    },
    // 批量删除
    mixinTableDel(data) {
      if (!this.hasSelect()) {
        return
      }
      let idArr = this.selectArr.map(item => item.id)
      if (idArr.length > 1) {
        this.$message({
          showClose: 'true',
          message: '暂不支持删除多个！！',
          type: 'warning',
        })
        return 
      }
      let id = idArr.join(',')
      // 判断是否是单表操作
      let sendData = this.mixinApi.del === 'delSingle' ? { table: this.tableName, data: idArr } : { id }
      this.$confirm('您确定删除当前选中数据？').then(res => {
        this.$api[this.mixinApi.del](data || sendData)
          .then(({ message }) => {
            this.getData()
            this.$message(message)
          })
      })
    },
    // 查看
    mixinTableSee() {
      if (!this.hasSelect() || !this.hasOneSelect()) {
        return
      }
      this.currentRow = Object.assign({}, this.selectArr[0])
      this.formTitle = '查看'
      this.formMode = 'see'
      this.isShowForm = true
      this.canEdit = false
    },
    // 编辑按钮
    mixinTableEdit() {
      if (!this.hasSelect() || !this.hasOneSelect()) {
        return false
      }
      this.currentRow = Object.assign({}, this.selectArr[0])
      this.formTitle = '编辑'
      this.formMode = 'edit'
      this.isShowForm = true
      this.canEdit = true
      return true
    },
    // execl导入
    mixinImportExecl() {},
    // execl导出
    mixinExportExecl() {
      this.$confirm('您确定导出当前所有数据？').then(res => {
        this.$api[this.mixinApi.export]().then(({ message }) => {
          this.$message(message)
        })
      })
    },
    // 获取数据方法
    mixinGetData (data, options) {
      this.data = []
      this.head = []
      this.filteredHead = []
      return new Promise((resolve, reject) => {
        this.$api[this.mixinApi.list](Object.assign({pageSize: this.pageSize, page: this.currentPage}, {condition: this.condition}, this.searchData, data), options).then(({ total, pageSize, data, head }) => {
          this.total = total || 0
          this.pageSize = +pageSize
          this.data = data
          let header
          // 头部字段类型兼容
          if (head) {
            header = typeof head.table_field === 'string' ? JSON.parse(head.table_field) : head.table_field
            // 合并自定义tableHeader
            if (this.tableHeader.length) {
              this.tableHeader = this.tableHeader.map(item => {
                let merge = {}
                for (let i in item) {
                  merge[this.mixinOptions[i]] = item[i]
                }
                return Object.assign(item, merge)
              })
              header.forEach(item => {
                let currentHead = this.tableHeader.find(itemHead => itemHead[this.mixinOptions.value] === item[this.mixinOptions.value])
                currentHead && (item = Object.assign(item, currentHead))
              })
            }
          } else {
            header = this.tableHeader
          }
          
          this.head.push(...header)
          // 按钮权限
          this.buttons = head ? head.table_hiddens : ['']
          // 表单头部数组
          this.filterFormHead = this.head.filter(item => (item[this.mixinOptions.isForm] === true || typeof item[this.mixinOptions.isForm] === 'undefined'))
          // 搜索栏头部树组
          this.searchFormData = this.head.filter(item => item[this.mixinOptions.isQuery] === true)
          this.$nextTick(() => {
            this.searchWidth = this.$refs.searchList ? (this.$refs.searchList.$el.offsetWidth || this.$refs.searchList.offsetWidth) : 0
          })
          // 列表头部数组
          this.filteredHead = this.head
            .filter(item => (item[this.mixinOptions.isShowList] || typeof !item[this.mixinOptions.isShowList] === 'undefined'))
            .map(item => {
              let temporary = {}
              // 功能sql处理的表头
              if (item.name || item.title) {
                temporary = {
                  width: item.width || Math.floor(item.title.length * 25 > 100 ? item.title.length * 25 : 100)
                }
                temporary[this.mixinOptions.value] = item.name
                temporary[this.mixinOptions.label] = item.title
              } else {
                // 单表操作的表头
                temporary = {
                  width: item.width || Math.floor(item[this.mixinOptions.label].length * 25 > 100 ? item[this.mixinOptions.label].length * 25 : 100)
                }
              }
              return Object.assign(item, temporary)
            })
          resolve({ filterFormHead: this.filterFormHead, filteredHead: this.filteredHead, searchFormData: this.searchFormData })
        })
      })
    }
  }
}

export default mixin
