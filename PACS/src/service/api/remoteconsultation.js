/**
 * 远程会诊下面的接口
 */

const api = [
  // index.vue
  {
    methodsName: 'IndexgetPatientCheck',
    method: 'POST',
    desc: '获取会诊用户数据',
    path: '/xhhms/rest/interMedicalConsultationDetailController/v1/findByUserId',
    mockPath: '',
    params: {
      arrivalTime:'',
      endTime: '',
      locationCode: '',
      locationName: '',
      modalityTypeCode: '',
      modalityTypeName: '',
      name: '',
      patientId: '',
      procedureCode: '',
      procedurename: '',
      sex: '',
      startTime: '',
      page: 0,
      size:10,
      sortMethod: '',
      sortField: ''
    }
  },
  {
    methodsName: 'conIndexexportExcel',
    method: 'POST',
    desc: '导出会诊用户数据',
    path: '/xhhms/rest/interMedicalConsultationDetailController/v1/exportXls',
    mockPath: '',
    params: {
      arrivalTime:'',
      endTime: '',
      locationCode: '',
      locationName: '',
      modalityTypeCode: '',
      modalityTypeName: '',
      name: '',
      patientId: '',
      procedureCode: '',
      procedurename: '',
      sex: '',
      startTime: ''
    }
  },
  {
    methodsName: 'conIndexfindUpload',
    method: 'POST',
    desc: '获取我的上报用户数据',
    path: '/xhhms/rest/interVisitUploadController/v1/findUpload',
    mockPath: '',
    params: {
      arrivalTime:'',
      endTime: '',
      locationCode: '',
      locationName: '',
      modalityTypeCode: '',
      modalityTypeName: '',
      name: '',
      patientId: '',
      procedureCode: '',
      procedurename: '',
      sex: '',
      startTime: '',
      page: 0,
      size:10,
      sortMethod: '',
      sortField: ''
    }
  },
  {
    methodsName: 'conIndexfindByMyApply',
    method: 'POST',
    desc: '获取我的申请会诊信息',
    path: '/xhhms/rest/interMedicalConsultationApplyController/v1/findByMyApply',
    mockPath: '',
    params: {
      arrivalTime:'',
      endTime: '',
      locationCode: '',
      locationName: '',
      modalityTypeCode: '',
      modalityTypeName: '',
      name: '',
      patientId: '',
      procedureCode: '',
      procedurename: '',
      sex: '',
      startTime: '',
      page: 0,
      size:10,
      sortMethod: '',
      sortField: ''
    }
  },
  // leftsearch.vue
  {
    methodsName: 'LeftSearchgetHospitalList',
    method: 'POST',
    desc: '获取医院信息',
    path: '/xhhms/rest/interHospitalController/v1/getHospitalList',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'LeftSearchgetDeviceTypeList',
    method: 'POST',
    desc: '获取设备信息',
    path: '/xhhms//rest/interMedicalDeviceTypeController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'LeftSearchgetCheckItemList',
    method: 'POST',
    desc: '获取检查项目信息',
    path: '/xhhms/rest/interMedicaCheckItemController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
]

export default api
