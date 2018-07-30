import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',// 登录
      name: 'Login',
      requireAuth: true,
      component: resolve => require(['@/PACS/pages/Login'],resolve)
    },{
      path: '/home',
      name: 'Home',
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
      component: resolve => require(['@/PACS/pages/Home'],resolve)
    },{
      path: '/home',
      name: '远程影像',
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
      component: resolve => require(['@/PACS/pages/Home'],resolve)
    },{
      path: '/main',// 主页
      name: 'Main',
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
      component: resolve => require(['@/PACS/pages/Main'],resolve)
    },{
      path: '/appointment', // 预约分诊
      name: '远程病理',
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
      component: resolve => require(['@/PACS/pages/Appointment'],resolve)
    },{
      path: '/edit',  // 影像编辑
      name: 'Edit',
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
      component: resolve => require(['@/PACS/pages/Edit'],resolve)
    },{
      path: '/reporttemplate',  // 报告模板
      name: 'ReportTemplate',
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
      component: resolve => require(['@/PACS/pages/ReportTemplate'],resolve)
    },{
      path: '/patientimages',
      name: 'PatientImages',
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
      component: resolve => require(['@/PACS/pages/PatientImages'],resolve)
    },{
      path: '/templateeditor',
      name: '子系统',
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
      component: resolve => require(['@/PACS/pages/TemplateEditor'],resolve),
    }
    ,{ //基础信息
      path: '/basicInformation',
      name: '基础管理',
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
      component: resolve => require(['@/PACS/pages/BasicInformation'],resolve)
    },
    { //会诊页面
      path: '/consultation',
      name: '远程会议',
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
      component: resolve => require(['@/PACS/pages/Consultation'],resolve)
    },
    {
      path: '/consultationedit',  // 影像编辑
      name: 'consultationEdit',
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
      component: resolve => require(['@/PACS/pages/consultationEdit'],resolve)
    }
  ],

})
