/**
 * All routes
 * @author wucheshi
 * @time 2018-09-06
 */
import other from './other'
import common from './common'
const routes = [
  ...common,
  {
    path: '/main',// 主页
    name: 'Main',
    meta: {
        requireAuth: true,  // 判断是否需要登录
        title: '首页'
    },
    component: () => import('Views/Main'),
    children: [
      ...other
    ]
  }
]

export default routes
