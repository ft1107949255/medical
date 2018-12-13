import {api} from './website'

// 当前平台
export const HOST_PLATFORM = 'WEB'
// 当前环境
export const NODE_ENV = process.env.NODE_ENV || 'prod'

// 路由默认配置
export const ROUTER_DEFAULT_CONFIG = {
  // mode: 'history',
  waitForData: true,
  transitionOnLoad: true
}

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 2000,
  headers: {}
}

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
  strict: process.env.NODE_ENV !== 'production'
}

// API 默认配置
export const API_DEFAULT_CONFIG = {
  baseURL: api,
  // 图标地址
  imgUrl: `${api}/api/system/icon.do?name=`,
  // 菜单图标地址
  menuImgUrl: `${api}/xhhms/`,
  // 请求参数格式 json/form-data
  isJSON: false,
  // 请求加载效果， 支持element-ui所有参数配置
  loading: { text: '加载中' }, // , spinner: 'el-icon-loading'
  // 是否开启mock
  mock: false,
  // 是否开启debug
  debug: false
}

// 默认需要验证单sitecode接口配置项
export const ONE_SITECODE_API = [
]

// 是否开启组件缓存
export const KEEP_ALIVE_ENABLE = true

// 是否开启国际化功能
export const TRANSLATE_ENABLE = true

export const CONSOLE_REQUEST_ENABLE = true // 开启请求参数打印
export const CONSOLE_RESPONSE_ENABLE = false // 开启响应参数打印
export const CONSOLE_ROUTER_ENABLE = false // 打印路由信息
