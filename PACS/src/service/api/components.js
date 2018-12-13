/**
 * components 组件
 */

const api = [
  // BottomNav Bottomlist.vue
  {
    methodsName: 'getBottomlistDevictTypeList',
    method: 'POST',
    desc: '获取设备类型数据',
    path: '/xhhms/rest/interMedicalDeviceTypeController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  // BottomNav BottomNavCloud.vue
  {
    methodsName: 'getBottomNavCloudgetCloudAll',
    method: 'POST',
    desc: '获取远程云端已匹配列表数据',
    path: '/xhhms/rest/interDicomstudiesController/v1/getCloudAll',
    mockPath: '',
    params: {
      patientid: '',
      patientnam: '',
      studymodal: '',
      accessionn: '',
      startTime: '',
      endTime: '',
      id: '',
      page: 0,
      size: 10
    }
  },
  {
    methodsName: 'getBottomNavCloudgetCloudunmatch',
    method: 'POST',
    desc: '获取远程云端未匹配列表数据',
    path: '/xhhms/rest/interDicomstudiesController/v1/getCloudunmatch',
    mockPath: '',
    params: {
      patientid: '',
      patientnam: '',
      studymodal: '',
      accessionn: '',
      startTime: '',
      endTime: '',
      id: '',
      page: 0,
      size: 10
    }
  },
  // BottomNav index.vue
  {
    methodsName: 'getBottomNavIndexgetAll',
    method: 'POST',
    desc: '获取已匹配列表',
    path: '/xhhms/rest/interDicomstudiesController/v1/getAll',
    mockPath: '',
    params: {
      patientid: '',
      patientnam: '',
      studymodal: '',
      accessionn: '',
      startTime: '',
      endTime: '',
      id: '',
      page: 0,
      size: 10
    }
  },
  {
    methodsName: 'getBottomNavIndexgetunmatch',
    method: 'POST',
    desc: '获取未匹配列表',
    path: '/xhhms/rest/interDicomstudiesController/v1/getunmatch',
    mockPath: '',
    params: {
      patientid: '',
      patientnam: '',
      studymodal: '',
      accessionn: '',
      startTime: '',
      endTime: '',
      id: '',
      page: 0,
      size: 10
    }
  },
  // knowledge knowledgeLeft.vue
  {
    methodsName: 'getknowledgeLeftKnowledge',
    method: 'POST',
    desc: '获取tree节点',
    path: '/xhhms/rest/interRemoteReportController/v1/getKnowledge',
    mockPath: '',
    params: {
      parentid: '',
    }
  },
  {
    methodsName: 'getknowledgeLeftKnowledgeById',
    method: 'POST',
    desc: '根据id获取tree节点内容',
    path: '/xhhms/rest/interRemoteReportController/v1/getKnowledgeByid',
    mockPath: '',
    params: {
      id: '',
    }
  },
  // knowledge knowledgeRight.vue
  {
    methodsName: 'knowledgeRightKnowledgeAdd',
    method: 'POST',
    desc: '添加tree节点',
    path: '/xhhms/rest/interDiagKnowledgeBaseController/v1/add',
    mockPath: '',
    params: {
      id: '',
      nodeType: '',
      name: '',
      nodeorders: '',
      description: '',
      conclusion: '',
      checkMethod: '',
      clinicalDiagnosis: '',
      procRequirement: '',
      parentId: ''
    }
  },
  {
    methodsName: 'getknowledgeRightKnowledgeBaseById',
    method: 'POST',
    desc: '根据id获取tree',
    path: '/xhhms/rest/interDiagKnowledgeBaseController/v1/getByid',
    mockPath: '',
    params: {
      id: '',
    }
  },
  // knowledge sTable.vue
  {
    methodsName: 'sTablecaneditReport',
    method: 'POST',
    desc: '根据id判断当前病人是否可以进行编辑',
    path: '/xhhms/rest/interCheckAdminController/v1/caneditReport',
    mockPath: '',
    params: {
      id: '',
    }
  },
  // rightSelects.vue
  {
    methodsName: 'rightSelectsidc10SelectTree',
    method: 'POST',
    desc: '初始化id10tree',
    path: '/xhhms/rest/interRemoteReportController/v1/idc10SelectTree',
    mockPath: '',
    params: {
      id: '',
      parentid: ''
    }
  },
  {
    methodsName: 'rightSelectsacrPartSelectTree',
    method: 'POST',
    desc: '初始化acrPartSelectTree',
    path: '/xhhms/rest/interRemoteReportController/v1/acrPartSelectTree',
    mockPath: '',
    params: {
      parentid: '',
      id: ''
    }
  },
  {
    methodsName: 'rightSelectsacrDiseaseSelectTree',
    method: 'POST',
    desc: '初始化acrDiseaseSelectTree',
    path: '/xhhms/rest/interRemoteReportController/v1/acrDiseaseSelectTree',
    mockPath: '',
    params: {
      id: '',
      parentid: '',
      acrpartid: ''
    }
  },
]

export default api
