// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入国际化
import i18n from './locale'

// 注入插件
import inject from './plugins/inject'

// 引入混入
import 'Mixin'

// 引入指令
import './directives'

// 引入路由
import router from 'Plugins/router'

// Import Element-ui
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './common/stylus/elementui.css'
Vue.use(ElementUI);

// Import reset css
import './common/css/normalize.css'
import './common/css/index.css'

Vue.config.productionTip = false

// pending --start *****************

// Import Vuex
import store from "Store"

// 引入js配置文件
import CONSTANT from './common/js/constant'
Vue.prototype.CONSTANT = CONSTANT

// 引入通用的方法
import main from './common/js/main'
Vue.prototype.main = main
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
  request.headers.set('X-AUTH-TOKEN', localStorage.getItem("token"))
  request.headers.set('Content-Type', 'application/json')
  next(response => {
    if(response.data.status == 0){
      router.push('/');
    }
    return response;
  })
})
// pending --end  *****************

Vue.use(inject)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})


