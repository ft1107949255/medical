import axios from './axios'
import api from './api'
import apiUrl from 'Config/website'
export default {
  install: (Vue, options) => {
    Vue.prototype.$api = api
    Vue.prototype.$ajax = axios
    Vue.prototype.$apiUrl = apiUrl.api
    // 需要挂载的都放在这里
  }
}
