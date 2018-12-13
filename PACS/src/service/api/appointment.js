/**
 * Appointment 预约分诊
 */

const api = [
  // index.vue
  {
    methodsName: 'getFenzhenListApi',
    method: 'POST',
    desc: '获取分诊列表数据',
    path: '/xhhms/rest/interClinicalController/v1/getMandata',
    mockPath: '',
    params: {
      page: 0,
      size: 10
    }
  },
  {
    methodsName: 'getProcedureOfficeListApi',
    method: 'POST',
    desc: '获取检查科室列表数据',
    path: '/xhhms/rest/interHospitalController/v1/getMyHospitalList',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getMedicalListApi',
    method: 'POST',
    desc: '获取检查设备列表数据',
    path: '/xhhms/rest/interMedicalDeviceController/v1/getListByTypeAndOrgCode',
    mockPath: '',
    params: {
      deviceType: '',
      sysOrgCode: ''
    }
  },
  {
    methodsName: 'getYuyueListApi',
    method: 'POST',
    desc: '获取今日预约列表数据',
    path: '/xhhms/rest/interClinicalController/v1/getScheduledManNumber',
    mockPath: '',
    params: {
      page: 0,
      size: 10
    }
  },
  {
    methodsName: 'getAllYuyueListApi',
    method: 'POST',
    desc: '获取所有预约列表数据',
    path: '/xhhms/rest/interClinicalController/v1/getFutureScheduledManNumber',
    mockPath: '',
    params: {
      page: 0,
      size: 10
    }
  },
  {
    methodsName: 'AddYuyueDataApi',
    method: 'POST',
    desc: '添加预约数据',
    path: '/xhhms/rest/interClinicalController/v1/add',
    mockPath: '',
    params: {
      id: '',
      name: '',
      sex: '',
      age: '',
      phone: '',
      ageUnit: '',
      birthDate: '',
      patientType: '',
      patientNo: '',
      patientId: '',
      checkItemIds: '',
      modalityTypeCode: '',
      scheduledDatetime: '',
      applyOfficeName: '',
      applyOfficeCode: '',
      applyDoctor: '',
      bedNo: '',
      accessionNo: '',
      modalityTypeName: '',
      modalityTypeCode: '',
      clinicalDiagnosis: '',
    }
  },
  {
    methodsName: 'DoCheckApi',
    method: 'POST',
    desc: '修改检查状态',
    path: '/xhhms/rest/interClinicalController/v1/doCheck',
    mockPath: '',
    params: {
      id: '',
      accessionNo: '',
      exposureCount: ''
    }
  },
  {
    methodsName: 'DoFenzhenApi',
    method: 'POST',
    desc: '修改分诊状态',
    path: '/xhhms/rest/interClinicalController/v1/branchUpdate',
    mockPath: '',
    params: {
      id: '',
      mppsInstanceUid: '',
      modalityName: '',
      modalityCode: '',
      procedureOfficeName: '',
      procedureOfficeCode: ''
    }
  },
  {
    methodsName: 'GetCheckItemsByDeviceType',
    method: 'POST',
    desc: '根据设备类型获取检查项目',
    path: '/xhhms/rest/interMedicalDeviceTypeController/v1/boundCheckTemplate',
    mockPath: '',
    params: {
      id: ''
    }
  },
  // AppointmentNav.vue
  // basicinfo.vue
  {
    methodsName: 'getDepartmentListApi',
    method: 'POST',
    desc: '获取申请科室列表',
    path: '/xhhms/rest/interHospitalController/v1/getHospitalList',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getDeviceListApi',
    method: 'POST',
    desc: '获取设备类型列表',
    path: '/xhhms/rest/interMedicalDeviceTypeController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getDoctorListByDepartmentApi',
    method: 'POST',
    desc: '根据申请科室获取医生列表',
    path: '/xhhms/rest/interHospitalController/v1/getDoctorListByDepartid',
    mockPath: '',
    params: {
      id: ''
    }
  },
  {
    methodsName: 'getCheckItemListApi',
    method: 'POST',
    desc: '获取检查项目列表',
    path: '/xhhms/rest/interMedicalDeviceTypeController/v1/boundCheckTemplate',
    mockPath: '',
    params: {
      id: ''
    }
  },
  {
    methodsName: 'getPatientTypeListApi',
    method: 'POST',
    desc: '获取病人类型列表',
    path: '/xhhms/rest/interMedicalPatientTypeController/v1/getAll',
    mockPath: '',
    params: {
      id: ''
    }
  },
  {
    methodsName: 'getPatientInfoApi',
    method: 'POST',
    desc: '获取病人信息',
    path: '/xhhms/rest/interCheckAdminController/v1/queryPatient',
    mockPath: '',
    params: {
      patientId:'',
      name:'',
      sex:'',
      startTime:'',
      endTime:''
    }
  },
  // numeral.vue
  {
    methodsName: 'getManNumberApi',
    method: 'POST',
    desc: '获取预约进度条总数',
    path: '/xhhms/rest/interClinicalController/v1/getManNumber',
    mockPath: '',
    params: {
      arrivedDatetime: ''
    }
  },
]

export default api
