/**
 * count 
 */

const api = [
  {
    methodsName: 'getCount',
    method: 'POST',
    desc: '获取统计数据',
    path: '/xhhms/rest/interWebsocketController/initWebsocketMessage',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getExcelCountData1',
    method: 'POST',
    desc: '获取上级医院会诊数据',
    path: '/xhhms/rest/interCountControler/v1/countSuperiorHospitalConsultation',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getExcelCountData2',
    method: 'POST',
    desc: '获取下级医院会诊数据',
    path: '/xhhms/rest/interCountControler/v1/countJuniorHospitalConsultation',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'exportData',
    method: 'POST',
    desc: '导出数据',
    path: '/xhhms/rest/interCountControler/v1/exportSuperiorHospitalConsultation',
    mockPath: '',
    params: {
    }
  }
]

export default api
