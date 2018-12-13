/**
 * Pages 目录下的接口
 */

const api = [
  // consulationEdit.vue
  {
    methodsName: 'getConsulationEditKnowledge',
    method: 'POST',
    desc: '获取知识库初始数据',
    path: '/xhhms/rest/interRemoteReportController/v1/getKnowledge',
    mockPath: '',
    params: {
      id: '',
      parentid: ''
    }
  },
  {
    methodsName: 'getConsulationEditKnowledgeById',
    method: 'POST',
    desc: '根据id获取知识节点',
    path: '/xhhms/rest/interRemoteReportController/v1/getKnowledgeByid',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'delConsulationEditKnowledgeById',
    method: 'POST',
    desc: '根据id删除知识节点',
    path: '/xhhms/rest/interDiagKnowledgeBaseController/v1/del',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'ConsulationEditDoSend',
    method: 'POST',
    desc: '发送信息',
    path: '/xhhms/rest/interRemoteReportController/v1/doSend',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'ConsulationEditGoReject',
    method: 'POST',
    desc: '驳回信息',
    path: '/xhhms/rest/interRemoteReportController/v1/goReject',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'ConsulationEditDoCancelSend',
    method: 'POST',
    desc: '取消发送',
    path: '/xhhms/rest/interRemoteReportController/v1/doCancelSend',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'getConsulationEditConsulationList',
    method: 'POST',
    desc: '获取诊断记录列表',
    path: '/xhhms/rest/interMedicalConsultationApplyController/v1/getConsulationList',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'ConsulationEditDoCloudConsulationRemark',
    method: 'POST',
    desc: '提交备注信息',
    path: '/xhhms/rest/interRemoteReportController/v1/doCloudConsulationRemark',
    mockPath: '',
    params: {
      id: '',
      remark: ''
    }
  },
  {
    methodsName: 'getConsulationEditCloudReportByPid',
    method: 'POST',
    desc: '获取病人信息',
    path: '/xhhms/rest/interRemoteReportController/v1/getCloudReportByPid',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'ConsulationEditupdateStatus',
    method: 'POST',
    desc: '修改病人状态，初诊,',
    path: '/xhhms/rest/interRemoteReportController/v1/updateStatus',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'saveConsulationEditCloudConsulation',
    method: 'POST',
    desc: '保存会诊信息',
    path: '/xhhms/rest/interRemoteReportController/v1/saveCloudConsulation',
    mockPath: '',
    params: {
      id: '',
      consulationid: '',
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
    methodsName: 'saveConsulationEditCloudMyConsulation',
    method: 'POST',
    desc: '修改我的会诊信息',
    path: '/xhhms/rest/interRemoteReportController/v1/saveCloudMyConsulation',
    mockPath: '',
    params: {
      id: '',
      consulationid: '',
      imageDescribe: '',
      conclusion: '',
      grade: '',
      positive: '',
      reportevaluation: '',
      icd10Index: '',
      acrIndex: '',
    }
  },
  // EditCloud.vue
  {
    methodsName: 'EditClouddoCloudSend',
    method: 'POST',
    desc: '发送远程信息',
    path: '/xhhms/rest/interRemoteReportController/v1/doCloudSend',
    mockPath: '',
    params: {
      id: ''
    }
  },
  {
    methodsName: 'EditClouddoCloudReject',
    method: 'POST',
    desc: '远程驳回信息',
    path: '/xhhms/rest/interRemoteReportController/v1/doCloudReject',
    mockPath: '',
    params: {
      id: '',
      rejectReason: ''
    }
  },
  {
    methodsName: 'EditClouddoCloudCancelSend',
    method: 'POST',
    desc: '取消远程发送信息',
    path: '/xhhms/rest/interRemoteReportController/v1/doCloudCancelSend',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'EditClouddiagnosticCloudrecord',
    method: 'POST',
    desc: '远程诊断记录',
    path: '/xhhms/rest/interRemoteReportController/v1/diagnosticCloudrecord',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'EditClouddoCloudRemark',
    method: 'POST',
    desc: '远程提交备注',
    path: '/xhhms/rest/interRemoteReportController/v1/doCloudRemark',
    mockPath: '',
    params: {
      id: '',
      remakr: ''
    }
  },
  {
    methodsName: 'EditCloudgetCloudReportByid',
    method: 'POST',
    desc: '获取病人信息',
    path: '/xhhms/rest/interRemoteReportController/v1/getCloudReportByid',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'EditCloudupdateCloudStatus',
    method: 'POST',
    desc: '修改病人的状态',
    path: '/xhhms/rest/interRemoteReportController/v1/updateCloudStatus',
    mockPath: '',
    params: {
      id: '',
    }
  },
  {
    methodsName: 'EditCloudDocloudSave',
    method: 'POST',
    desc: '保存远程状态信息',
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
  // printPage.vue
  {
    methodsName: 'printPagequeryRemotePatient',
    method: 'POST',
    desc: '获取病人信息',
    path: '/xhhms/rest/print/v1/queryRemotePatient',
    mockPath: '',
    params: {
      patientId: '',
      name: '',
      arrivedDatetime: '',
      isImagePrinted: '',
      total:0,
      currentPage:0,
      page:0,
      size:20,
      pageSize:20,
    }
  },
  {
    methodsName: 'printPagequeryPatientDicom',
    method: 'POST',
    desc: '获取病人影像',
    path: '/xhhms/rest/print/v1/queryPatientDicom',
    mockPath: '',
    params: {
      id: ''
    }
  },
]

export default api
