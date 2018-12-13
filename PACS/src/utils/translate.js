/**
 * 翻译
 */
import jsonp from 'jsonp'
import Qs from 'qs'
import MD5 from 'js-md5'
import {isObject, isString} from 'lodash'
var http = require('http')

class Translate {
  constructor(options) {
    this.options = options
    this.cacheData = []
  }
  // 格式化翻译参数
  async toTranslate (data, language = this.options.language) {
    let query
    let transResult
    this.cacheData = data
    // 待翻译内容参数格式化
    if (isString(this.cacheData)) {
      try {
        this.cacheData = JSON.parse(this.cacheData)
      } catch (e) {
        transResult = await this.translate(this.cacheData, language)
      }
    }
    if (isObject(this.cacheData)) {
      query = this.formatObjectQuery(this.cacheData)
    }
    // 处理翻译后的逻辑
    transResult = await this.translate(query, language)
    transResult = this.formatObjectResult(this.cacheData, transResult)
    return transResult
  }
  // 处理翻译前object对象数据
  formatObjectQuery (data) {
    var q = []
    for (var attr in data) {
      if (isObject(data[attr])) {
        q.push(...this.formatObjectQuery(data[attr]))
      } else if (this.options.mode.includes(this.typeValidate(data[attr]))) {
        // 待处理翻译类型过滤
        q.push(data[attr])
      }
    }
    return q
  }
  // 验证翻译参数格式
  typeValidate (param) {
    if (this.isChinese(param)) {
      return 'ch'
    }
  }
  // 判断是否是中文
  isChinese(str) {
    if (/[\u4e00-\u9fa5]/g.test(str)) {
      return true
    } else {
      return false
    }
  }
  // 处理翻译后的数据
  formatObjectResult (data, result) {
    let cacheData = data
    result.forEach(item => {
      this.mapCacheData(cacheData, item)
    })
    return cacheData
  }
  // 格式化处理数组或者树形数据
  mapCacheData (data, row) {
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        if (isObject(data[i])) {
          this.mapCacheData(data[i], row)
        } else if (data[i] === row.src) {
          data[i] = row.dst
        }
      }
    }
  }
  // 翻译函数
  translate (queryParams, language) {
    var appid = this.options.appid
    var key = this.options.key
    var salt = new Date().getTime()
    var query = queryParams.join('\n')
    var str1 = appid + query + salt + key
    var sign = MD5(str1)
    var param = {
      q: query,
      appid: appid,
      salt: salt,
      from: 'zh',
      to: language,
      sign: sign
    }
    return new Promise((resolve, reject) => {
      let url = this.options.api + '?' + Qs.stringify(param)
      if (typeof window === 'undefined') {
        // node端
        var req = http.request(url, (res) => {
          res.setEncoding('utf8')
          let result = ''
          res.on('data', function (chunk) {
            result += chunk
          })
          res.on('end', () => {
            result = JSON.parse(result)
            resolve(result.trans_result)
          })
        })
        req.on('error', function (e) {
          console.log('problem with request: ' + e.message)
        })
        req.end()
      } else {
        // H5 端
        jsonp(url, null, (err, res) => {
          if (err) {
            reject(err)
          }
          let transResult = res.trans_result
          console.log(transResult)
          resolve(transResult)
        })
      }
    })
  }
}

export default new Translate({
  appid: '20180829000200118',
  key: 'cxkE24sr4iZieWPlnAnR',
  language: 'en',
  mode: ['ch', 'en'],
  api: 'http://api.fanyi.baidu.com/api/trans/vip/translate'
})
