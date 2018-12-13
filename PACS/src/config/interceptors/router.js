/**
 * 路由beforeach拦截器
 */

import {CONSOLE_ROUTER_ENABLE} from '../index'
import store from 'Store'

export function routerBeforeEachFunc (to, from, next) {
  // 打印路由数据
  CONSOLE_ROUTER_ENABLE && console.info(`%c
路由to: 

fullPath: ${to.fullPath},
query: ${JSON.stringify(to.query, '', 2)},
meta: ${JSON.stringify(to.meta, '', 2)}

路由from: 

fullPath: ${from.fullPath}

  `, 'color: green;font-weight: bold;')
  // 防止死循环
  if (to.fullpath === from.fullPath) return

  // 地址权限验证(当前路由地址必须在菜单列表里边)
  // let menuPathList = store.state.menuPathList
  // let hasPower = menuPathList.some(item => {
  //   // 单表页面全等验证
  //   if (to.path === '/simplePage') {
  //     let routePath = item.split('?')[1] || ''
  //     routePath = `/simplePage?${routePath.replace('&route=simplePage', '')}`
  //     return routePath === to.fullPath
  //   } else {
  //     // 其他页面包含关键字即可（）
  //     return item.indexOf(to.path.substr(1)) > -1
  //   }
  // })

  // 没有菜单权限跳转403页面
  // if (!['/403'].includes(to.path) && !to.meta.title && !hasPower) {
  //   next('/403')
  //   return
  // }

  // 404错误
  // if (!to.name) {
  //   next('/404')
  //   return
  // }

  // 记录访问地址
  if (!['/login', '/403', '/404', '/500', '/main', '/home'].includes(to.path)) {
    store.commit('CHANGE_CURRENT_PATH_RECODE', {
      title: to.meta.title || sessionStorage.getItem('currentMenuTitle'),
      code: sessionStorage.getItem('c urrentMenuId') || '',
      path: to.path,
      fullPath: to.fullPath,
      query: to.query,
      name: to.name
    })
    store.commit('CHANGE_KEEP_ALIVE', to.path === '/simplePage' ? to.query.id : to.name)
  }

  // 登录状态验证
  if (to.meta.requireAuth) {
    (localStorage.getItem('token')) ? next() : next({path: '/login', query: { redirect: to.fullPath }})
    return
  }

  next()
}
