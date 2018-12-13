import types from './types'
const mutations = {
  // 更新四角参数样式
  [types.SET_ANGLES_STYLE] (state, data) {
    state.angleParams.style = Object.assign({}, data)
  },
  // 更新四角参数列表
  [types.SET_ANGLES_LIST] (state, data) {
    state.angleParams.list = JSON.parse(JSON.stringify(data))
  }
}

export default mutations
