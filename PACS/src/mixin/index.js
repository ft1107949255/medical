import Vue from 'vue'

import { API_DEFAULT_CONFIG } from 'Config'
import event from 'Utils/events'

Vue.mixin({
  computed: {
    // 图片根地址
    imgUrl () {
      return API_DEFAULT_CONFIG.imgUrl
    },
    // 菜单图片地址
    menuImgUrl () {
      return API_DEFAULT_CONFIG.menuImgUrl
    },
    // 获取通用列表高度
    tableHeight () {
      return document.documentElement.clientHeight - 300
    },
    // 事件监听器
    events () {
      return event
    },
    menuUrl () {
      return API_DEFAULT_CONFIG.menuUrl
    }
  },
  methods: {
    /**
     * 获取数组里边匹配的labe值
     * @params {string} params 待处理参数
     * @params {array} array 数组
     * @params {object} options value值和label值的参数名称配置
     *                  --value value值字段名称
     *                  --label label值字段名称
     * @return {string} 匹配后的参数值
     * params = 1
     * array: [
     *   value: 0, label: '测试0',
     *   value: 1, label: '测试1'
     * ]
     * return '测试1'
    */
    findParamsLabel (params, array, options = { value: 'value', label: 'label' }) {
      
      // 没有字典直接返回参数值
      if (!array) {
        return params
      }
      // 获取匹配对象
      let current = array.find(item => item[options.value] === `${params}`)
      if (current) {
        return current[options.label]
      }
      return params
    }
  }
})
