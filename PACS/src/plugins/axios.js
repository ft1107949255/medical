import axios from 'axios'
import {AXIOS_DEFAULT_CONFIG} from 'Config/index'
import {
  requestSuccessFunc,
  requestFailFunc,
  responseFirstSuccessFunc,
  responseFirstFailFunc,
  responseSuccessFunc,
  responseFailFunc} from 'Config/interceptors/axios'

let axiosInstance = {}

axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

// 注入请求拦截
axiosInstance
  .interceptors.request.use(requestSuccessFunc, requestFailFunc)
// 注入首次响应拦截（处理国际化）
axiosInstance
  .interceptors.response.use(responseFirstSuccessFunc, responseFirstFailFunc)
// 注入二次响应拦截（处理逻辑）
axiosInstance
  .interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance
