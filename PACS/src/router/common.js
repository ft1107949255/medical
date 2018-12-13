/**
 * Common route
 * @author wucheshi
 * @time 2018-09-06
 */
const routes = [
    {
        path: '/login',// 登录
        name: 'Login',
        requireAuth: true,
        component: () => import('Views/Login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/patientImages',
        name: 'PatientImages',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '查看影像'
        },
        component: () => import('Views/patientImages') // Views/pages/PatientImages
    },
    {
        path: '/test',
        name: 'test',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '测试页面'
        },
        component: () => import('Views/simplePage') // Views/pages/PatientImages
    },
    {
        path: '/count',  // 统计数据
        name: 'count',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '统计数据'
        },
        component: () => import('Views/Count')
    },
]

export default routes
