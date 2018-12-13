<template>
  <div class="form-list">
    <!-- 表单模块 -->
    <el-form ref="formList" class="inline-form" :model="currentRow" :rules="formRules" :inline="inline" :label-width="labelWidth" v-if="formData.length">
      <el-form-item :label="item[options.label]" v-for="(item, index) in formData" :key="index" :prop="item[options.value]">

        <!-- 文本框 -->
        <el-input class="item-width" v-model="currentRow[item[options.value]]" :disabled="!canEdit" v-if="fieldShowMethods(item, ['text', 'int', 'double', 'string']) && !item[options.dict]" >
          <el-select v-model="currentRow[item[options.value]+'_express']" slot="prepend" v-if="renderMode === 'search' && showExpress" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in filterExpress(item[options.fieldType])" :key="index"></el-option>
          </el-select>
        </el-input>

        <!-- 下拉框 -->
        <el-select class="item-width" v-model="currentRow[item[options.value]]" :disabled="!canEdit" placeholder="请选择" v-if="fieldShowMethods(item, ['list', 'string', 'int']) && item[options.dict]">
          <el-option v-for="(item, index) in item[options.dict]" :key="index" :label="item[options.label]" :value="item[options.value]"></el-option>
        </el-select>

        <!-- 文本域 -->
        <el-input class="item-width" :type="item[options.formType]" v-model="currentRow[item[options.value]]" :disabled="!canEdit" v-if="fieldShowMethods(item, ['textarea', 'password'])"></el-input>

        <!-- 级联选择器 -->
        <el-cascader class="item-width" :options="item[options.dict]" :props="item.cascaderOption" v-model="currentRow[item[options.value]]" v-if="fieldShowMethods(item, 'cascader') && item[options.dict]"></el-cascader>

        <!-- 单选 -->
        <el-radio-group v-model="currentRow[item[options.value]]" v-if="fieldShowMethods(item, 'radio') && item[options.dict]" :disabled="!canEdit">
          <el-radio :label="item[options.value]" v-for="(item, index) in item[options.dict]" :key="index">{{ item[options.label]}}</el-radio>
        </el-radio-group>

        <!-- 复选 -->
        <el-checkbox-group v-model="currentRow[item[options.value]]"  v-if="fieldShowMethods(item, 'checkbox') && item[options.dict]" :disabled="!canEdit">
          <el-checkbox :label="item[options.value]" v-for="(item, index) in item[options.dict]" :key="index">{{ item[options.label]}}</el-checkbox>
        </el-checkbox-group>

        <!-- 时间日期选择器 -->
        <el-date-picker class="item-width" v-model="currentRow[item[options.value]]" :type="item[options.formType]" :disabled="!canEdit" placeholder="选择日期时间" v-if="fieldShowMethods(item, ['date', 'datetime']) && !isSearch"></el-date-picker>

        <!-- 搜索时间范围模块 -->
        <el-date-picker
          v-if="isSearch && fieldShowMethods(item, ['date', 'datetime', 'Date'])"
          v-model="currentRow[item[options.value] + dateTimeKeyWord.start]"
          clearable
          value-format="yyyy-MM-dd"
          placeholder="开始时间"
          class="item-width start-date"
          type="date">
        </el-date-picker>
        <br/>
        <el-date-picker
          v-if="isSearch && fieldShowMethods(item, ['date', 'datetime', 'Date'])"
          v-model="currentRow[item[options.value] + dateTimeKeyWord.end]"
          clearable
          class="item-width end-date"
          value-format="yyyy-MM-dd"
          placeholder="结束时间"
          type="date">
        </el-date-picker>
      </el-form-item>
      <!-- 搜索状态按钮组 -->
      <el-form-item v-if="renderMode === 'search'">
        <el-button size="small" type="primary" @click="handleSave">查询</el-button>
        <el-button size="small" @click="handleReset()">重置</el-button>
        <el-button size="small" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/**
 * 通用表单渲染组件
 * @params {array} formData 表单数据列表
 * @params {object} options  数据key值配置项
 * @params {string} renderMode 渲染模式（可选edit、search, see）
*/
export default {
  name: 'formList',
  props: {
    formData: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {
          label: 'CONTENT',
          value: 'FIELD_NAME',
          fieldType: 'TYPE',
          formType: 'SHOW_TYPE',
          validate: 'FIELD_VALID_TYPE',
          dict: 'DICT_LIST'
        }
      }
    },
    renderMode: {
      type: String,
      default: 'edit'
    },
    inline: {
      type: Boolean,
      default: true
    },
    value: {
      type: Object
    },
    costomeValidate: {
      type: Object
    },
    showExpress: {
      type: Boolean,
      default: true
    }
  },
  data() {
    var check = (rule, value, callback) => {
      // 判断是否包含中文
      if(/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        callback(new Error('不能输入中文'));
      } else {
        callback();
      }
    };
    var checkinter = (rule, value, callback) => {
      // 判断是否包含中文
      if(/^[0-9]+$/.test(value)) {
        callback();
      } else {
        callback('请输入数字');
      }
    }
    var checkdevicetype = (rule, value, callback) => {
      console.log(111111);
      // 判断是否包含中文
      console.log(this.currentRow.type, value);
      if(this.currentRow.type != '' && this.currentRow.type != '0'  && (value == '' || typeof(value) === 'undefined' )) {
        callback(new Error('需要选择设备类型！！'));
      } else {
        callback();
      }
    }
    var checkCharact = (rule, value, callback) => {
      console.log(111111);
      // 判断是否包含中文
      console.log(this.currentRow.type, value);
      if(this.currentRow.supportChinese != '' && this.currentRow.supportChinese == '1'  && (value == '' || typeof(value) === 'undefined' )) {
        callback(new Error('需要选择编码！！'));
      } else {
        callback();
      }
    }
    var checkuneccessary = (rule, value, callback) => {
      // 判断是否包含中文
      if(this.formTitle == '录入' && value === '') {
        callback(new Error('需要添加密码！！'));
      } else {
        callback();
      }
    }
    var checkpassword = (rule, value, callback) => {
      // 判断是否包含中文
      if(this.currentRow.password !== '' && value === '') {
        callback(new Error('需要确认密码！！'));
      } else if(this.currentRow.password !== '' && this.currentRow.password !== value) {
        callback(new Error('密码不一致！！'))
      } else {
        callback();
      }
    }
    var checkPort = (rule, value, callback) => {
      // 判断是否端口
      // 0~1024 端口是系统端口  1025~65534 是为用户预留的端口 65535是系统预留端口
      // 先判断是否数字
      if(/^[0-9]+$/.test(value)) {
        // 再判断范围
        if (value < 1025) {
          callback(new Error('请输入1025-65534的端口'));
        } else if (value > 65535) {
          callback(new Error('请输入1025-65534的端口'));
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入数字'));
      }
    }
    var checkIp = (rule, value, callback) => {
      // 判断是否ip
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (reg.test(value) === false) {
        callback(new Error('请输入正确ip'));
      } else {
        callback();
      }
    }
    var checkPhone = (rule, value, callback) => {
      // 判断是否手机
      // 先判断长度
      if (value.length !== 11) {
        callback(new Error('请输入11位长度的手机号'));
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
        callback(new Error('请输入正确手机号码'));
      }
    }
    
    var checkIdcard = (rule, value, callback) => {
      // 判断是否idcard
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(value) && value !== '') {
        callback();
      } else {
        callback(new Error('请填写正确的身份证号！！'));
      }
    }
    return {
      currentRow: {},
      // 表达式
      express: [
        {
          value: '=',
          label: '等于',
          type: ['int', 'double', 'string']
        },
        {
          value: '<',
          label: '小于',
          type: ['int', 'double', 'date', 'dataTime']
        },
        {
          value: '<=',
          label: '小于等于',
          type: ['int', 'double', 'date', 'dataTime']
        },
        {
          value: '>',
          label: '大于',
          type: ['int', 'double', 'date', 'dataTime']
        },
        {
          value: '>=',
          label: '大于等于',
          type: ['int', 'double', 'date', 'dataTime']
        },
        {
          value: 'like',
          label: '模糊查询',
          type: ['string']
        }
      ],

      // 时间范围开始和结束关键字
      dateTimeKeyWord: {
        start: '_start',
        end: '_end'
      },

      // 表单验证规则
      formRules: {},
      // 可选规则
      validateList: {
        // 必填
        '*': { required: true, message: '必填', trigger: 'blur' },
        'n': { type: 'number', message: '请输入一个数字', trigger: 'blur' },
        's': { type: 'string', message: '请输入一个字符串', trigger: 'blur' },
        // 'p': { require: true, message: '请输入一个邮政编码', trigger: 'blur' },
        // 'm': { require: true, message: '请输入一个手机号', trigger: 'blur' },
        'e': { type: 'email', message: '请输入一个邮箱地址', trigger: 'blur' },
        // 'url': { require: true, message: '请输入一个网址', trigger: 'blur' },
        '*6-16': { min: 6, max: 16, message: '请输入6-16位任意字符', trigger: 'blur' },
        'n6-16': { type: 'number', min: 6, max: 16, message: '请输入6-16位数字', trigger: 'blur' },
        's6-18': { type: 'string', min: 6, max: 18, message: '请输入6-18的字符串', trigger: 'blur' },
        'no-chinese': {validator: check, trigger: 'blur'},
        'inter': {validator: checkinter, trigger: 'blur'},
        'makeid_devicetype': {validator: checkdevicetype, trigger: 'blur'},  // id生成器规则
        'checkCharact': {validator: checkCharact, trigger: 'blur'}, // 是否包含中文
        'uneccessary':{validator: checkuneccessary, trigger: 'blur'},  
        'checkpassword':{validator: checkpassword, trigger: 'blur'},
        'port':{validator:checkPort, trigger: 'blur'},  // 判断端口号
        'ip': {validator: checkIp, trigger: 'blur'}, // 判断ip地址
        'phone':{validator:checkPhone, trigger: 'blur'},  // 判断phone
        'idcard':{validator:checkIdcard, trigger: 'blur'},
        ...this.costomeValidate
        // 'd': { require: true, message: '请输入一个金额', trigger: 'blur' }
        
      }
    }
  },
  created() {
    this.currentRow = Object.assign({}, this.value)
    // 生成表单验证规则
    if (this.renderMode === 'edit') {
      this.formRules = this.addformRules()
    }
  },
  computed: {
    labelWidth () {
      let arr = []
      arr.push(...this.formData)
      let maxLabel = arr.map(item => item[this.options.label]).sort((a, b) => b.length - a.length)[0]
      return `${maxLabel.length * 20 > 50 ? maxLabel.length * 20 : 50}px`
    },
    canEdit () {
      return this.renderMode === 'edit' || this.renderMode === 'search'
    },
    isSearch () {
      return this.renderMode === 'search'
    }
  },
  watch: {
    currentRow: {
      handler () {
        this.$emit('input', this.currentRow)
      },
      deep: true
    }
  },
  methods: {
    /**
     * 判断该表单字段渲染模式
     * @params {object} item 当前对象
     * @params {string|array} types 表单字段类型
    */
    fieldShowMethods (item, types) {
      // 模式判断
      let type = this.renderMode === 'search' ? 'fieldType' : 'formType'
      if (typeof types === 'string') {
        return item[this.options[type]] === types
      } else {
        return types.includes(item[this.options[type]])
      }
    },
    /**
     * 过滤表达式值
    */
    filterExpress (type) {
      return this.express.filter(item => item.type.includes(type))
    },
    // 动态生成表单rule
    addformRules () {
      let ruleList = {}
      this.formData.forEach(item => {
        if (item[this.options.validate]) {
          let rules = []
          // 处理表单字段验证类型格式
          item[this.options.validate].split(',').forEach(validate => {
            rules.push(this.validateList[validate.trim()])
          })
          ruleList[item[this.options.value]] = rules
        }
      })
      return ruleList
    },
    // 保存事件
    handleSave () {
      let condition = []
      let currentRowKeyArr = Object.keys(this.currentRow)
      let express = currentRowKeyArr.filter(item => item.indexOf('express') > -1).map(item => { return { name: item, value: this.currentRow[item] } })
      currentRowKeyArr.forEach(item => {
        // 不包含手动添加的值才进入
        if (!['express'].some(key => item.indexOf(key) > -1)) {
          let itemExpress = express.find(items => items.name.indexOf(item) > -1)
          // 筛选条件表达式
          let itemExpressValue = itemExpress ? itemExpress.value : ''
          // 筛选条件value值
          let itemValue = ''
          // 筛选条件name值
          let itemName = ''

          // like查询处理
          if (itemExpressValue === 'like' && this.currentRow[item]) {
            itemValue = `%${this.currentRow[item]}%`
          } else {
            itemValue = this.currentRow[item]
          }

          // 默认不处理
          itemName = item

          // 时间范围特殊处理
          // 开始时间
          if (item.indexOf(this.dateTimeKeyWord.start) > -1) {
            itemName = item.replace(this.dateTimeKeyWord.start, '')
            itemValue = `str_to_date('${itemValue}','%Y-%m-%d')`
            itemExpressValue = '>='
          }
          // 结束时间
          if (item.indexOf(this.dateTimeKeyWord.end) > -1) {
            itemName = item.replace(this.dateTimeKeyWord.end, '')
            itemValue = `str_to_date('${itemValue}','%Y-%m-%d')`
            itemExpressValue = '<'
          }
          console.log(itme)

          // 插入该条数据
          (itemValue !== '') && condition.push({
            name: itemName,
            value: itemValue,
            express: itemExpressValue
          })
        }
      })
      if (!this.showExpress) {
        let search = {}
        condition.forEach(item => {
          search[item.name] = item.value
        })
        this.$emit('submitSave', search)
      } else {
        this.$emit('submitSave', condition)
      }
    },
    // 取消
    handleCancel () {
      this.$emit('handleCancel')
    },
    // 重置
    handleReset () {
      Object.keys(this.currentRow).forEach(item => {
        this.currentRow[item] = ''
      })
    },
    // 表单验证
    validate(formName = 'formList') {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
          console.log(111);
          if (valid) {
            console.log(1112222);
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
>>> .el-input-group__prepend {
  width: auto;
}
.end-date {
  margin-top: 10px;
}
.inline-form {
  width: auto!important;
  padding: 10px 10px 10px;
}
.item-width {
  width: 220px;
}
</style>
