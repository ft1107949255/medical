import axios from './axios'
import _pick from 'lodash/pick'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'

import { assert } from 'Utils/tools'
import { API_DEFAULT_CONFIG } from 'Config'
import API_CONFIG from 'Service/api'
import {makeMockData} from 'Config/interceptors/mock'

class MakeApi {
  constructor (options) {
    this.api = {}
    this.options = Object.assign({}, options)
    this.apiBuilder(options)
  }

  apiBuilder ({
    config = {}
  }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        config: config[namespace]
      })
    })
  }
  _apiSingleBuilder ({
    namespace,
    config = {}
  }) {
    config.forEach(api => {
      const { methodsName, desc, params, method, path, mockPath } = api
      let { mock, mockBaseURL, baseURL, debug, isJSON, loading } = this.options
      let url = mock ? (mockBaseURL + mockPath) : (baseURL + path)
      debug && assert(methodsName, `${url} :接口methodsName属性不能为空`)
      debug && assert(url.indexOf('/') === 0, `${url} :接口路径path，首字符应为/`)

      Object.defineProperty(this.api, methodsName, {
        value (outerParams, outerOptions) {
          let allowtParam = (outerOptions && outerOptions.allowParams) || []
          let _data = (outerOptions && outerOptions.isFormData) ? outerParams : _isEmpty(outerParams) ? Object.assign({}, params) : _pick(_assign({}, params, outerParams), Object.keys(params).concat(allowtParam))
          return mock ? makeMockData(path) : axios(_assign({
            url,
            desc,
            method,
            isJSON,
            methodsName,
            loading
          }, outerOptions, { data: _data }))
        }
      })
    })
  }
}

export default new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']
