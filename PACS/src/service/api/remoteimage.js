/**
 * remoteimage
 */

const api = [
  // index.vue
  {
    methodsName: 'IndexcaneditReport',
    method: 'POST',
    desc: '根据id判断是否有操作权限',
    path: '/xhhms/rest/interCheckAdminController/v1/caneditReport',
    mockPath: '',
    params: {
      id: ''
    }
  },
  {
    methodsName: 'IndexfindByUserId',
    method: 'POST',
    desc: '获取用户',
    path: '/xhhms/rest/interCheckAdminController/v1/findByUserId',
    mockPath: '',
    params: {
      arrivalTime: '',
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
      size: 10,
      status: '',
      isImagePrinted: '',
      sortMethod: '',
      sortField: ''
    }
  },
  {
    methodsName: 'IndexClickCollection',
    method: 'POST',
    desc: '收藏',
    path: '/xhhms/rest/interCollectController/v1/getlistByid',
    mockPath: '',
    params: {
      id: ''
    }
  },
  {
    methodsName: 'IndexAddForParams',
    method: 'POST',
    desc: '添加文件夹',
    path: '/xhhms/rest/interCollectController/v1/add',
    mockPath: '',
    params: {
      id: '',
      name: '',
      memo: ''
    }
  },
  {
    methodsName: 'IndexgetListForID',
    method: 'POST',
    desc: '获取id信息',
    path: '/xhhms/rest/interCheckAdminController/v1/findById',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'IndexexportXls',
    method: 'POST',
    desc: '导出excel',
    path: '/xhhms/rest/interRemoteReportController/exportXls',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'IndexgetConsultations',
    method: 'POST',
    desc: '修改会诊状态',
    path: '/xhhms/rest/interMedicalConsultationApplyController/v1/getConsultation',
    mockPath: '',
    params: {
      id: ''
    }
  },
  {
    methodsName: 'Indexmatchstudy',
    method: 'POST',
    desc: '手动匹配列表',
    path: '/xhhms/rest/interDicomstudiesController/v1/matchstudy',
    mockPath: '',
    params: {
      id: '',
      pid: ''
    }
  },
  {
    methodsName: 'IndexqueryRemotePatient',
    method: 'POST',
    desc: '选择多人查看影像',
    path: '/xhhms/rest/interRemoteReportController/v1/queryRemotePatient',
    mockPath: '',
    params: {
      patientId: '',
      name: '',
      hospital: '',
      arrivedDatetime: '',
      accessionNo: ''
    }
  },
  {
    methodsName: 'Indexupdate',
    method: 'POST',
    desc: '修改文件夹',
    path: '/xhhms/rest/interCollectFolderController/v1/update',
    mockPath: '',
    params: {
      id: '',
      name: ''
    }
  },
  {
    methodsName: 'Indexadd',
    method: 'POST',
    desc: '添加文件夹',
    path: '/xhhms/rest/interCollectFolderController/v1/add',
    mockPath: '',
    params: {
      name: ''
    }
  },
  {
    methodsName: 'IndexgetCloudHospitalList',
    method: 'POST',
    desc: '获取医院的数据',
    path: '/xhhms/rest/interHospitalController/v1/getCloudHospitalList',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'IndexgetuploadHospitalList',
    method: 'POST',
    desc: '获取上报医院的数据',
    path: '/xhhms/rest/interHospitalController/v1/getReportHospitalList',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'IndexgetCloudExportDoctorList',
    method: 'POST',
    desc: '获取专家的数据',
    path: '/xhhms/rest/interHospitalController/v1/getCloudExportDoctorList',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'Indexconupdate',
    method: 'POST',
    desc: '编辑会诊信息',
    path: '/xhhms/rest/interMedicalConsultationApplyController/v1/update',
    mockPath: '',
    params: {
      id: '',
      hospital: '',
      master: ''
    }
  },
  {
    methodsName: 'Indexconapply',
    method: 'POST',
    desc: '新增会诊信息',
    path: '/xhhms/rest/interMedicalConsultationApplyController/v1/apply',
    mockPath: '',
    params: {
      id: '',
      hospital: '',
      master: ''
    }
  },
  {
    methodsName: 'Indexconcancel',
    method: 'POST',
    desc: '取消会诊信息',
    path: '/xhhms/rest/interMedicalConsultationApplyController/v1/cancel',
    mockPath: '',
    params: {
      id: ''
    }
  },
  {
    methodsName: 'Indexreportimage',
    method: 'POST',
    desc: '上报医院信息',
    path: '/xhhms/rest/interRemoteReportController/v1/reportimage',
    mockPath: '',
    params: {
      id: '',
      hospitalCode: '',
      hospitalName: ''
    }
  },
  {
    methodsName: 'IndexfindallUpload',
    method: 'POST',
    desc: '获取上报信息',
    path: '/xhhms/rest/interVisitUploadController/v1/findallUpload',
    mockPath: '',
    params: {
      id: '',
      endTime: '',
      isImagePrinted: '',
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
      status: '',
      page: 0,
      size: 10,
      status:'',
      sortMethod: '',
      sortField: ''
    }
  },
  {
    methodsName: 'IndexCanPrint',
    method: 'POST',
    desc: '判断当前病人是否可以进行打印',
    path: '/xhhms/rest/interCheckAdminController/v1/canPrintReport',
    mockPath: '',
    params: {
      id: ''
    }
  },
  // collectiondir.vue
  {
    methodsName: 'IndexgetCollectionlist',
    method: 'POST',
    desc: '获取收藏信息',
    path: '/xhhms/rest/interCollectFolderController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'IndexgetCollectionlistById',
    method: 'POST',
    desc: '根据id获取收藏信息',
    path: '/xhhms/rest/interCollectController/v1/getlistByPid',
    mockPath: '',
    params: {
      // parentId: '',
      // patientId: '',
      collectFloderId: ''
    }
  },
  {
    methodsName: 'Indexdelone',
    method: 'POST',
    desc: '根据id删除收藏病例',
    path: '/xhhms/rest/interCollectController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
  {
    methodsName: 'IndexdelFolder',
    method: 'POST',
    desc: '根据id删除收藏文件夹',
    path: '/xhhms/rest/interCollectFolderController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
  // Edit.vue
  {
    methodsName: 'remoteEditdoSave',
    method: 'POST',
    desc: 'save编辑报告信息信息',
    path: '/xhhms/rest/interRemoteReportController/v1/doSave',
    mockPath: '',
    params: {
      id: '',
      imageDescribe: '',
      conclusion: '',
      grade: '',
      positive: '',
      reportevaluation: '',
      icd10Index: '',
      acrIndex: '',
    }
  },
  {
    methodsName: 'remoteEditdoCloudSave',
    method: 'POST',
    desc: 'save编辑报告信息信息',
    path: '/xhhms/rest/interRemoteReportController/v1/doCloudSave',
    mockPath: '',
    params: {
      id: '',
      imageDescribe: '',
      conclusion: '',
      grade: '',
      positive: '',
      reportevaluation: '',
      icd10Index: '',
      acrIndex: '',
    }
  },
  {
    methodsName: 'remoteEditgetKnwoledgeTree',
    method: 'POST',
    desc: '初始化tree节点',
    path: '/xhhms/rest/interRemoteReportController/v1/getKnowledge',
    mockPath: '',
    params: {
      id: '',
      parentid: ''
    }
  },
  {
    methodsName: 'remoteEditgetKnwoledgeTreedel',
    method: 'POST',
    desc: '删除tree节点',
    path: '/xhhms/rest/interDiagKnowledgeBaseController/v1/del',
    mockPath: '',
    params: {
      id: '', 
    }
  },
  {
    methodsName: 'remoteEditgetKnwoledgeTreeById',
    method: 'POST',
    desc: '根据id获取节点信息',
    path: '/xhhms/rest/interRemoteReportController/v1/getKnowledgeByid',
    mockPath: '',
    params: {
      id: '', 
    }
  },
  {
    methodsName: 'remoteEditdoSend',
    method: 'POST',
    desc: '发送病人',
    path: '/xhhms/rest/interRemoteReportController/v1/doSend',
    mockPath: '',
    params: {
      id: '', 
    }
  },
  {
    methodsName: 'remoteEditGoReject',
    method: 'POST',
    desc: '驳回病人',
    path: '/xhhms/rest/interRemoteReportController/v1/goReject',
    mockPath: '',
    params: {
      id: '',
      rejectReason: ''
    }
  },
  {
    methodsName: 'remoteEditDoCancelSend',
    method: 'POST',
    desc: '取消发送',
    path: '/xhhms/rest/interRemoteReportController/v1/doCancelSend',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'remoteEditdiagnosticrecord',
    method: 'POST',
    desc: '诊断记录',
    path: '/xhhms/rest/interRemoteReportController/v1/diagnosticrecord',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'remoteEditDoRemark',
    method: 'POST',
    desc: '提交备注',
    path: '/xhhms/rest/interRemoteReportController/v1/doRemark',
    mockPath: '',
    params: {
      id: '',
      remark: ''
    }
  },
  {
    methodsName: 'remoteEditgetReportByid',
    method: 'POST',
    desc: '获取病人信息',
    path: '/xhhms/rest/interRemoteReportController/v1/getReportByid',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'remoteEditUpdateStatus',
    method: 'POST',
    desc: '修改病人状态',
    path: '/xhhms/rest/interRemoteReportController/v1/updateStatus',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'remotecheckFunction',
    method: 'POST',
    desc: '根据系统配置判断会诊、上报流程是否启用',
    path: '/xhhms/rest/interCheckAdminController/v1/checkFunction',
    mockPath: '',
    params: {
    }
  },
]

export default api
