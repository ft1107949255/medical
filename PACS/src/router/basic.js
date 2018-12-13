/**
 * Other route
 * @author wucheshi
 * @time 2018-09-06
 */
const routes = [
    {
        path: '/devicesettings',  // 设备管理
        name: 'devicesettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '设备管理'
        },
        component: () => import('Views/Basic/deviceSettings')
    },
    {
        path: '/printsettings',  // 打印参数设置
        name: 'printsettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '打印参数设置'
        },
        component: () => import('Views/Basic/printSettings')
    },
    {
        path: '/windowsettings',  // 窗口设置
        name: 'windowsettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '调窗模板管理'
        },
        component: () => import('Views/Basic/windowSettings')
    },
    {
        path: '/devicetypesettings',  // 设备类型管理
        name: 'devicetypesettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '设备类型管理'
        },
        component: () => import('Views/Basic/devicetypeSettings')
    },
    {
        path: '/checkwaysettings',  // 检查方法管理
        name: 'checkwaysettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '检查方法管理'
        },
        component: () => import('Views/Basic/checkwaySettings')
    },
    {
        path: '/checkbodytypesettings',  // 检查部位管理
        name: 'checkbodytypesettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '检查部位类型管理'
        },
        component: () => import('Views/Basic/checkbodytypeSettings')
    },
    {
        path: '/checkbodysettings',  // 检查部位管理
        name: 'checkbodysettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '检查部位管理'
        },
        component: () => import('Views/Basic/checkbodySettings')
    },
    {
        path: '/contrastsettings',  // 造影剂管理
        name: 'contrastsettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '造影剂管理'
        },
        component: () => import('Views/Basic/contrastSettings')
    },
    {
        path: '/cameradirectionsettings',  // 摄影方向
        name: 'cameradirectionsettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '摄影方向管理'
        },
        component: () => import('Views/Basic/cameradirectionSettings')
    },
    {
        path: '/camerabodysettings',  
        name: 'camerabodysettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '摄影体位管理'
        },
        component: () => import('Views/Basic/camerabodySettings')
    },
    {
        path: '/patienttypesettings',  
        name: 'patienttypesettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '病人类型管理'
        },
        component: () => import('Views/Basic/patienttypeSettings')
    },
    {
        path: '/checkitemsettings',  
        name: 'checkitemsettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '检查项目管理'
        },
        component: () => import('Views/Basic/checkitemSettings')
    },
    {
        path: '/pricetypesettings',  
        name: 'pricetypesettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '费用类型管理'
        },
        component: () => import('Views/Basic/pricetypeSettings')
    },
    {
        path: '/checktypesettings',  
        name: 'checktypesettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '检查类型管理'
        },
        component: () => import('Views/Basic/checktypeSettings')
    },
    {
        path: '/judgesettings',  
        name: 'judgesettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '综合评价管理'
        },
        component: () => import('Views/Basic/judgeSettings')
    },
    {
        path: '/papersettings',  
        name: 'papersettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '纸张配置管理'
        },
        component: () => import('Views/Basic/paperSettings')
    },
    {
        path: '/makeidsettings',  
        name: 'makeidsettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: 'ID生成器管理'
        },
        component: () => import('Views/Basic/makeidSettings')
    },
    {
        path: '/systemsettings',  
        name: 'systemsettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '系统配置'
        },
        component: () => import('Views/Basic/systemSettings')
    },
    {
        path: '/diseasesettings',  
        name: 'diseasesettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '疾病管理'
        },
        component: () => import('Views/Basic/diseaseSettings')
    },
    {
        path: '/expertssettings',  
        name: 'expertssettings',
        meta: {
            requireAuth: true,  // 判断是否需要登录
            title: '专家库管理'
        },
        component: () => import('Views/Basic/expertsSettings')
    },
    {
        path: '/hospitaldepartmentsettings',
        name: 'hospitaldepartmentsettings',
        meta: {
            requireAuth: true,
            title: '专家科室管理'
        },
        component: () => import('Views/Basic/hospitalDepartmentsSettings')
    },
    {
        path: '/databasesettings',
        name: 'Databasesettings',
        meta: {
            requireAuth: true,
            title: '数据源管理'
        },
        component: () => import('Views/Basic/databaseSettings')
    },
    {
        path: '/camerasettings',
        name: 'camerasettings',
        meta: {
            requireAuth: true,
            title: '相机管理'
        },
        component: () => import('Views/Basic/cameraSettings')
    },
    {
        path: '/doctorlevelsettings',
        name: 'doctorlevelsettings',
        meta: {
            requireAuth: true,
            title: '医生等级管理'
        },
        component: () => import('Views/Basic/doctorlevelSettings')
    },
    {
        path: '/userinfosettings',
        name: 'userinfosettings',
        meta: {
            requireAuth: true,
            title: '用户信息管理'
        },
        component: () => import('Views/Basic/userInfoSettings')
    },
    {
        path: '/departmentsettings',
        name: 'departmentsettings',
        meta: {
            requireAuth: true,
            title: '组织结构管理'
        },
        component: () => import('Views/Basic/departmentSettings')
    },
    {
        path: '/rolesettings',
        name: 'rolesettings',
        meta: {
            requireAuth: true,
            title: '用户角色管理'
        },
        component: () => import('Views/Basic/roleSettings')
    },
    {
        path: '/menusettings',
        name: 'menusettings',
        meta: {
            requireAuth: true,
            title: '菜单管理'
        },
        component: () => import('Views/Basic/menuListSettings')
    },
]

export default routes
