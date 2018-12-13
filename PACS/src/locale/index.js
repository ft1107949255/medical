import messages from './lang'

import Vue from 'vue'
import VueI18n from 'vue-i18n'

// 引入国际化
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh', // 默认语种
  messages
})

export default i18n
