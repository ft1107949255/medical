import router from 'Plugins/router'
import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE, ONE_SITECODE_API, TRANSLATE_ENABLE } from '../index.js'
import { MessageBox, Message, Loading } from 'element-ui'
import store from 'Store'
import translate from 'Utils/translate'

import Qs from 'qs'
let bus = {}

/**
 * 请求拦截器(成功)
 * @param {object} request 请求对象
 * @return {object} request 处理后的请求对象
 */
export function requestSuccessFunc(request) {
  CONSOLE_REQUEST_ENABLE &&
    console.info('requestInterceptorFunc', `url: ${request.url}`, request)
  // 自定义请求拦截逻辑，可以处理权限，请求发送监控等

  // 登录token携带
  request.headers['X-AUTH-TOKEN'] = localStorage.getItem('token')

  // 当前语种
  let currentLangage = localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')).value : 'zh'

  // 兼容性写法，如果request里边没得site_code 就用全局site_code
  let publicParams = {
    currentLangage: currentLangage
  }

  if (!window.navigator.onLine) {
    console.log('亲， 您断网了')
  }

  let newData
  // 判断是否是formdata类型
  if (Object.prototype.toString.call(request.data) === '[object FormData]') {
    // 合并formdata格式公共参数
    Object.keys(publicParams).forEach(key => {
      request.data.append(key, publicParams[key])
    })
    newData = request.data
  } else {
    // 合并公共参数
    newData = Object.assign(request.data, publicParams)

    // 输出请求数据
    CONSOLE_REQUEST_ENABLE &&
    console.info(`%c
请求接口地址：${request.url}

请求接口名称：${request.desc}

请求接口方法：${request.methodsName}

请求参数JSON: 

${JSON.stringify(newData, '', 2)}

`, 'color: #f60')

    // 判断是否采用json格式提交参数
    !request.isJSON && (newData = Qs.stringify(newData))
  }

  // 不同提交参数方式给不同的字段赋值
  if (request.method.toUpperCase() === 'POST') {
    request.data = newData
  } else if (request.method.toUpperCase() === 'GET') {
    request.params = newData
  }

  // 加载效果
  request.loading && (bus.loading = Loading.service(request.loading))

  return request
}

/**
 * 请求拦截器(失败)
 * @param {object} requestError 请求报错对象
 * @return {object} 返回promise对象
 */
export function requestFailFunc(requestError) {
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  return Promise.reject(requestError)
}

/**
 * 首次响应拦截成功
*/
export async function responseFirstSuccessFunc (responseObj) {
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  // 加载效果
  bus.loading && bus.loading.close()
  // 响应对象
  let resData =
    typeof responseObj.data === 'object'
      ? responseObj.data
      : JSON.parse(responseObj.data)
  // 前端国际化处理
  if (TRANSLATE_ENABLE) {
    let language = localStorage.getItem('language')
    if (language) {
      language = JSON.parse(language)
      if (language.value !== 'zh') {
        return translate.toTranslate(resData, language.value)
      }
    }
  }
  return resData
}

/**
 * 首次响应拦截失败
*/
export function responseFirstFailFunc (err) {
  return Promise.reject(err)
}

/**
 * 响应拦截器(成功)
 * @param {object} responseObj 响应对象
 */
export function responseSuccessFunc(responseObj) {
  // 处理数据流
  if (Object.prototype.toString.call(responseObj) === '[object Blob]') {
    return responseObj
  }
  let resData = responseObj
  let { status, message } = resData
  
  // 响应接口地址： ${responseObj.config.url}

// 响应接口描述： ${responseObj.config.desc}
  // 输出响应体
  CONSOLE_RESPONSE_ENABLE && console.info(responseObj)
  // 输出返回JSON数据
  CONSOLE_RESPONSE_ENABLE &&
    console.info(`%c

响应数据JSON：

${JSON.stringify(resData, '', 2)}
    `, 'color: blue')

  // 自定义处理业务逻辑
  // if (responseObj.config.customErrorHandle) {
  //   return resData
  // }
  

  // 统一逻辑处理
  switch (+status) {
    case 0: // 常规错误
      Message.error(message)
      return Promise.reject(resData)
    case 1: // 如果业务成功，直接进成功回调
      return resData
    case 401: // 登录失效
      store.commit('DELETE_USER_INFO')
      router.push({ path: '/login', redirect: router.app._route.fullPath })
      Message.error(message)
      break
    default:
      // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下方它们到业务层
      // !responseObj.config.noShowDefaultError && GLOBAL.vbus.$emit('global.$dialog.show', resData.msg);
      return Promise.reject(resData)
  }
}

/**
 * 响应拦截器(失败)
 * @param {object} responseError 响应报错对象
 * @return {object} 返回promise对象
 */
export function responseFailFunc(responseError) {
  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
  // ...
  // 加载效果
  bus.loading && bus.loading.close()
  // 错误码处理
  switch (responseError.response.status) {
    case 401:
      console.error('401错误')
      store.commit('DELETE_USER_INFO')
      router.push({ path: '/login', redirect: router.app._route.fullPath })
      store.state.user.username && MessageBox('登录超时')
      break
    case 403:
      console.error('403错误')
      router.push({ path: '/403' })
      break
    case 500:
      console.error('500错误')
      router.push({ path: '/500' })
      break
  }
  return Promise.reject(responseError)
}
