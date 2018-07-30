// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// 引入的重置文件
import './common/css/normalize.css'
import './common/css/index.css'

import store from "./PACS/store/index.js"

// 引入js配置文件
import CONSTANT from './common/js/constant'
Vue.prototype.CONSTANT = CONSTANT
// 引入通用的方法
import main from './common/js/main'
Vue.prototype.main = main

Vue.config.productionTip = false
import VueResource from 'vue-resource';
Vue.use(VueResource);
// Vue.http.options.xhr = { withCredentials: true };
// Vue.http.options.emulateHTTP = true;
// Vue.http.options.headers = {
//   'Content-Type': 'application/json;charset=UTF-8'
// }
// Vue.http.headers.common['token'] = 'YXBpOnBhc3N3b3Jk';
Vue.http.interceptors.push((request, next) => {
  request.headers.set('X-AUTH-TOKEN', localStorage.getItem("token"))
  // request.headers.set('Access-Control-Allow-Origin', '*');
  // request.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  // request.headers.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  request.headers.set('Content-Type', 'application/json')
  //console.log(request.headers)
  next(response => {
    //console.log();
    // console.log('状态----',response.data.status);
    if(response.data.status == 0){
      router.push('/');
    }
    return response;
  })
})
//  路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    console.log('需要登录');
    if (localStorage.token) {  // 判断当前的token是否存在
      next();
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


