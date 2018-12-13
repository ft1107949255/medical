import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import home from './modules/home.js' // 首页
import custom from './modules/custom' // 首页
import patientImage from './modules/patientImage' // 病人影像查看

Vue.use(Vuex)

export default new Vuex.Store({
  state: store,
  getters,
  mutations,
  actions,
  modules: {
    home,
    custom,
    patientImage
  }
})
