/**
 * Other route
 * @author wucheshi
 * @time 2018-09-06
 */
import basic from './basic'
const routes = [
    {
        path: '/index',
        name: 'Index',
        meta: {
            requireAuth: true,
            title: '首页'
        },
        component: () => import('Views/Index')
    },
    { //基础信息
        path: '/basicInformation',
        name: '基础管理',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '基础管理'
        },
        children: [
          ...basic
        ],
        component: () => import('Views/Basic')
    },
    { //会诊页面
        path: '/consultation',
        name: '远程会诊',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '远程会诊'
        },
        component: () => import('Views/remoteConsultation')
    },
    {
        path: '/home',
        name: '远程影像',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '远程影像'
        },
        component: () => import('Views/remoteImage')
    },
    {
        path: '/templateeditor',
        name: '模板配置',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '模板配置'
        },
        component: () => import('Views/TemplateEditor'),
    },
    {
        path: '/appointment', // 预约分诊
        name: '预约分诊',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '预约分诊'
        },
        component: () => import('Views/Appointment')
    },
    {
        path: '/scanreport',  // 影像编辑
        name: '浏览报告',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '浏览报告'
        },
        component: () => import('Views/remoteConsultation/ScanReport')
    },
    {
        path: '/edit',  // 影像编辑
        name: 'Edit',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '影像编辑'
        },
        component: () => import('Views/remoteImage/Edit')
    },
    {
        path: '/patientimagescloud',
        name: 'PatientImagesCloud',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '云端影像查看'
        },
        component: () => import('Views/pages/PatientImagesCloud')
    },
    {
        path: '/consultationedit',  // 影像编辑
        name: 'consultationEdit',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '会诊-编辑报告'
        },
        component: () => import('Views/pages/consultationEdit')
    },
    {
        path: '/printpage',  // 胶片打印
        name: '胶片打印',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '胶片打印'
        },
        component: () => import('Views/pages/PrintPage')
    },
    {
        path: '/editcloud',  // 胶片打印
        name: '上报编辑',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '上报编辑'
        },
        component: () => import('Views/pages/EditCloud')
    },
    {
        path: '/printreport',  // 打印弹出页面
        name: 'printreport',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '打印病人报告页面'
        },
        component: () => import('Views/pages/PrintReport')
    },
    {
        path: '/excelcount',  // 统计数据
        name: 'excelcount',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '报表统计数据'
        },
        component: () => import('Views/excelCount')
    }
]

export default routes
