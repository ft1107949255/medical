/**
 * Patient images
 */

const api = [
  {
    methodsName: 'getDevictTypeList',
    method: 'POST',
    desc: '获取设备类型数据',
    path: '/xhhms/rest/interMedicalDeviceTypeController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'addWindowSettings',
    method: 'POST',
    desc: '添加窗口设置',
    path: '/xhhms/rest/interMedicalImageWinsetController/v1/add',
    mockPath: '',
    params: {
      name: '',
      deviceTypeCode: '',
      deviceType: '',
      width: '',
      height: '',
    }
  },
  {
    methodsName: 'updateWindowSettings',
    method: 'POST',
    desc: '修改窗口设置',
    path: '/xhhms/rest/interMedicalImageWinsetController/v1/update',
    mockPath: '',
    params: {
      id: '',
      name: '',
      deviceTypeCode: '',
      deviceType: '',
      width: '',
      height: '',
    }
  },
  {
    methodsName: 'getWindowSettingsList',
    method: 'POST',
    desc: '获取窗口设置列表',
    path: '/xhhms/rest/interMedicalImageWinsetController/v1/list',
    mockPath: '',
    params: {
      page: 1,
      size: 15,
      name: ''
    }
  },
  {
    methodsName: 'delWindowSettings',
    method: 'POST',
    desc: '删除窗口设置',
    path: '/xhhms/rest/interMedicalImageWinsetController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
]

export default api
