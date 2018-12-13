/**
 * Basic 基础管理
 */

const api = [
  // index.vue
  {
    methodsName: 'getBasicDepartmentlistApi',
    method: 'POST',
    desc: '获取检查科室列表',
    path: '/xhhms/rest/interHospitalController/v1/getMyHospitalList',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getBasicCheckItemlistApi',
    method: 'POST',
    desc: '获取检查项目列表',
    path: '/xhhms/rest/interMedicaCheckItemController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getBasicCheckTypelistApi',
    method: 'POST',
    desc: '获取检查方法列表',
    path: '/xhhms/rest/interMedicalCheckTypeController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getBasicCheckBodyTypelistApi',
    method: 'POST',
    desc: '获取检查部位类型列表',
    path: '/xhhms/rest/interMedicaBodyTypeController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  // components  Basicinformation.vue
  {
    methodsName: 'getBasicSystemConfigApi',
    method: 'POST',
    desc: '获取系统配置列表',
    path: '/xhhms/rest/interMedicalSysconfig/v1/get',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'updateBasicSystemConfigApi',
    method: 'POST',
    desc: '更新系统配置列表',
    path: '/xhhms/rest/interMedicalSysconfig/v1/update',
    mockPath: '',
    params: {
      id: '',
      needProcess: '',
      remoteDiagnosisFlag:'',
      consultationFlag: '',
      shareCodeUseFlag: ''
    }
  },
  // components  left.vue
  {
    methodsName: 'getLeftHospitalListApi',
    method: 'POST',
    desc: '获取检查部门列表',
    path: '/xhhms/rest/interHospitalController/v1/getHospitalList',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getLeftDeviceTypeListApi',
    method: 'POST',
    desc: '获取设备类型列表',
    path: '/xhhms/rest/interMedicalDeviceTypeController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getLeftCheckItemListApi',
    method: 'POST',
    desc: '获取检查类型列表',
    path: '/xhhms/rest/interMedicalCheckTypeController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  // components  MyTitle.vue
  {
    methodsName: 'getMytitleDeviceTypeApi',
    method: 'POST',
    desc: '获取设备类型列表',
    path: '/xhhms/rest/interMedicalDeviceTypeController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getMytitleEquipmentApi',
    method: 'POST',
    desc: '获取检查设备列表',
    path: '/xhhms/rest/interMedicalDeviceController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  // windowseings/index.vue
  {
    methodsName: 'getwindowDevictTypeList',
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
      size: 12,
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
  // printseings/index.vue
  // index.vue
  {
    methodsName: 'basicGetTree',
    method: 'POST',
    desc: '获取tree部门结构',
    path: '/xhhms/rest/interHospitalController/v1/getTree',
    mockPath: '',
    params: {
    }
  },
  // deviceSettings.vue 
  {
    methodsName: 'deviceSettingGetList',
    method: 'POST',
    desc: '获取设备管理列表',
    path: '/xhhms/rest/interMedicalDeviceController/v1/getAll',
    mockPath: '',
    params: {
      name: '',
      page: 1,
      size: 12,
      sysOrgCode: ''
    }
  },
  {
    methodsName: 'deviceSettingAdd',
    method: 'POST',
    desc: '添加设备管理',
    path: '/xhhms/rest/interMedicalDeviceController/v1/add',
    mockPath: '',
    params: {
      name: '',
      deviceTypeCode: '',
      deviceType: '',
      code: '',
      spelling: '',
      room: '',
      ip: '',
      port: '',
      aetitle: '',
      factory: '',
      sysOrgCode: '',
      supportChinese: '',
      characterSet: '',
      memo: ''
    }
  },
  {
    methodsName: 'deviceSettingUpdate',
    method: 'POST',
    desc: '添加设备管理',
    path: '/xhhms/rest/interMedicalDeviceController/v1/update',
    mockPath: '',
    params: {
      name: '',
      deviceTypeCode: '',
      deviceType: '',
      code: '',
      spelling: '',
      room: '',
      ip: '',
      port: '',
      aetitle: '',
      factory: '',
      sysOrgCode: '',
      supportChinese: '',
      characterSet: '',
      memo: '',
      id: ''
    }
  },
  {
    methodsName: 'deviceSettingdel',
    method: 'POST',
    desc: '添加设备管理',
    path: '/xhhms/rest/interMedicalDeviceController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
  // devicetypeSettings.vue
  {
    methodsName: 'devicetypeSettingGetAll',
    method: 'POST',
    desc: '获取设备类型列表',
    path: '/xhhms/rest/interMedicalDeviceTypeController/v1/getAll',
    mockPath: '',
    params: {
      name: '',
      page: 1,
      size: 12,
    }
  },
  {
    methodsName: 'devicetypeSettingAdd',
    method: 'POST',
    desc: '添加设备类型',
    path: '/xhhms/rest/interMedicalDeviceTypeController/v1/add',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: ''
    }
  },
  {
    methodsName: 'devicetypeSettingUpdate',
    method: 'POST',
    desc: '更新设备类型',
    path: '/xhhms/rest/interMedicalDeviceTypeController/v1/update',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: '',
      id: ''
    }
  },
  {
    methodsName: 'devicetypeSettingDel',
    method: 'POST',
    desc: '删除设备类型',
    path: '/xhhms/rest/interMedicalDeviceTypeController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
  //checkwaySettings.vue
  {
    methodsName: 'checkwaySettingGetAll',
    method: 'POST',
    desc: '获取检查方法列表',
    path: '/xhhms/rest/interMedicalCheckTypeController/v1/getAll',
    mockPath: '',
    params: {
      name: '',
      page: 1,
      size: 15,
    }
  },
  {
    methodsName: 'checkwaySettingAdd',
    method: 'POST',
    desc: '添加检查方法',
    path: '/xhhms/rest/interMedicalCheckTypeController/v1/add',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: ''
    }
  },
  {
    methodsName: 'checkwaySettingUpdate',
    method: 'POST',
    desc: '更新检查方法',
    path: '/xhhms/rest/interMedicalCheckTypeController/v1/update',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: '',
      id: ''
    }
  },
  {
    methodsName: 'checkwaySettingDel',
    method: 'POST',
    desc: '删除检查方法',
    path: '/xhhms/rest/interMedicalCheckTypeController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
  // checkbodytypeSettings.vue
  {
    methodsName: 'checkbodytypeSettingGetAll',
    method: 'POST',
    desc: '获取检查部位类型列表',
    path: '/xhhms/rest/interMedicaBodyTypeController/v1/getAll',
    mockPath: '',
    params: {
      name: '',
      page: 1,
      size: 15,
    }
  },
  {
    methodsName: 'checkbodytypeSettingAdd',
    method: 'POST',
    desc: '添加检查部位类型',
    path: '/xhhms/rest/interMedicaBodyTypeController/v1/add',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: ''
    }
  },
  {
    methodsName: 'checkbodytypeSettingUpdate',
    method: 'POST',
    desc: '更新检查部位类型',
    path: '/xhhms/rest/interMedicaBodyTypeController/v1/update',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: '',
      id: ''
    }
  },
  {
    methodsName: 'checkbodytypeSettingDel',
    method: 'POST',
    desc: '删除检查部位类型',
    path: '/xhhms/rest/interMedicaBodyTypeController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
  // checkbodySettings.vue
  {
    methodsName: 'checkbodySettingGetAll',
    method: 'POST',
    desc: '获取检查部位列表',
    path: '/xhhms/rest/interMedicalCheckBodypartController/v1/getAll',
    mockPath: '',
    params: {
      name: '',
      page: 1,
      size: 15,
    }
  },
  {
    methodsName: 'checkbodySettingAdd',
    method: 'POST',
    desc: '添加检查部位',
    path: '/xhhms/rest/interMedicalCheckBodypartController/v1/add',
    mockPath: '',
    params: {
      name: '',
      deviceType: '',
      code: '',
      spelling: '',
      id: '',
      memo: '',
      chekBodyType: '',
      checkType: ''
    }
  },
  {
    methodsName: 'checkbodySettingUpdate',
    method: 'POST',
    desc: '更新检查部位',
    path: '/xhhms/rest/interMedicalCheckBodypartController/v1/update',
    mockPath: '',
    params: {
      name: '',
      deviceType: '',
      code: '',
      spelling: '',
      id: '',
      memo: '',
      chekBodyType: '',
      checkType: ''
    }
  },
  {
    methodsName: 'checkbodySettingDel',
    method: 'POST',
    desc: '删除检查部位',
    path: '/xhhms/rest/interMedicalCheckBodypartController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
   //contrastSettings.vue
   {
    methodsName: 'contrastSettingGetAll',
    method: 'POST',
    desc: '获取造影剂列表',
    path: '/xhhms/rest/interMedicalContrastMediumController/v1/getAll',
    mockPath: '',
    params: {
      name: '',
      page: 1,
      size: 15,
    }
  },
  {
    methodsName: 'contrastSettingAdd',
    method: 'POST',
    desc: '添加造影剂',
    path: '/xhhms/rest/interMedicalContrastMediumController/v1/add',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: ''
    }
  },
  {
    methodsName: 'contrastSettingUpdate',
    method: 'POST',
    desc: '更新造影剂',
    path: '/xhhms/rest/interMedicalContrastMediumController/v1/update',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: '',
      id: ''
    }
  },
  {
    methodsName: 'contrastSettingDel',
    method: 'POST',
    desc: '删除造影剂',
    path: '/xhhms/rest/interMedicalContrastMediumController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },

  //cameradirectionSettings.vue
  {
    methodsName: 'cameradirectionSettingGetAll',
    method: 'POST',
    desc: '获取摄影方向列表',
    path: '/xhhms/rest/interMedicalImageDirectionController/v1/getAll',
    mockPath: '',
    params: {
      name: '',
      page: 1,
      size: 15,
    }
  },
  {
    methodsName: 'cameradirectionSettingAdd',
    method: 'POST',
    desc: '添加摄影方向',
    path: '/xhhms/rest/interMedicalImageDirectionController/v1/add',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: '',
      deviceType: ''
    }
  },
  {
    methodsName: 'cameradirectionSettingUpdate',
    method: 'POST',
    desc: '更新摄影方向',
    path: '/xhhms/rest/interMedicalImageDirectionController/v1/update',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: '',
      id: '',
      deviceType: ''
    }
  },
  {
    methodsName: 'cameradirectionSettingDel',
    method: 'POST',
    desc: '删除摄影方向',
    path: '/xhhms/rest/interMedicalImageDirectionController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
  //camerabodySettings.vue
  {
    methodsName: 'camerabodySettingGetAll',
    method: 'POST',
    desc: '获取摄影体位列表',
    path: '/xhhms/rest/interMedicalImageBodypartController/v1/getAll',
    mockPath: '',
    params: {
      name: '',
      page: 1,
      size: 15,
    }
  },
  {
    methodsName: 'camerabodySettingAdd',
    method: 'POST',
    desc: '添加摄影体位',
    path: '/xhhms/rest/interMedicalImageBodypartController/v1/add',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: '',
      deviceType: ''
    }
  },
  {
    methodsName: 'camerabodySettingUpdate',
    method: 'POST',
    desc: '更新摄影体位',
    path: '/xhhms/rest/interMedicalImageBodypartController/v1/update',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: '',
      id: '',
      deviceType: ''
    }
  },
  {
    methodsName: 'camerabodySettingDel',
    method: 'POST',
    desc: '删除摄影体位',
    path: '/xhhms/rest/interMedicalImageBodypartController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
   //patienttypeSettings.vue
   {
    methodsName: 'patienttypeSettingGetAll',
    method: 'POST',
    desc: '获取病人类型列表',
    path: '/xhhms/rest/interMedicalPatientTypeController/v1/getAll',
    mockPath: '',
    params: {
      name: '',
      page: 1,
      size: 12,
    }
  },
  {
    methodsName: 'patienttypeSettingAdd',
    method: 'POST',
    desc: '添加病人类型',
    path: '/xhhms/rest/interMedicalPatientTypeController/v1/add',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: '',
      deviceType: '',
      associate: '',
      emergency: ''
    }
  },
  {
    methodsName: 'patienttypeSettingUpdate',
    method: 'POST',
    desc: '更新病人类型',
    path: '/xhhms/rest/interMedicalPatientTypeController/v1/update',
    mockPath: '',
    params: {
      name: '',
      code: '',
      spelling: '',
      memo: '',
      id: '',
      deviceType: '',
      associate: '',
      emergency: ''
    }
  },
  {
    methodsName: 'patienttypeSettingDel',
    method: 'POST',
    desc: '删除病人类型',
    path: '/xhhms/rest/interMedicalPatientTypeController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
  //checkitemSettings.vue
  {
    methodsName: 'checkitemSettingGetAll',
    method: 'POST',
    desc: '获取检查项目列表',
    path: '/xhhms/rest/intermedicaCheckTemplateController/v1/getAll',
    mockPath: '',
    params: {
      name: '',
      page: 1,
      size: 12,
    }
  },
  {
    methodsName: 'checkitemSettingAdd',
    method: 'POST',
    desc: '添加检查项目',
    path: '/xhhms/rest/intermedicaCheckTemplateController/v1/add',
    mockPath: '',
    params: {
      name: '',
        deviceType: '',
        code: '',
        spelling: '',
        memo: '',
        department: '',
        checkItem: ''
    }
  },
  {
    methodsName: 'checkitemSettingUpdate',
    method: 'POST',
    desc: '更新检查项目',
    path: '/xhhms/rest/intermedicaCheckTemplateController/v1/update',
    mockPath: '',
    params: {
      name: '',
      deviceType: '',
      code: '',
      spelling: '',
      id: '',
      memo: '',
      department: '',
      checkItem: ''
    }
  },
  {
    methodsName: 'checkitemSettingDel',
    method: 'POST',
    desc: '删除检查项目',
    path: '/xhhms/rest/intermedicaCheckTemplateController/v1/del',
    mockPath: '',
    params: {
      id: ''
    }
  },
    //pricetypeSettings.vue
    {
      methodsName: 'pricetypeSettingGetAll',
      method: 'POST',
      desc: '获取费用类型列表',
      path: '/xhhms/rest/interMedicaChargeTypeController/v1/getAll',
      mockPath: '',
      params: {
        name: '',
        page: 1,
        size: 15,
      }
    },
    {
      methodsName: 'pricetypeSettingAdd',
      method: 'POST',
      desc: '添加费用类型',
      path: '/xhhms/rest/interMedicaChargeTypeController/v1/add',
      mockPath: '',
      params: {
        name: '',
        code: '',
        spelling: '',
        memo: ''
      }
    },
    {
      methodsName: 'pricetypeSettingUpdate',
      method: 'POST',
      desc: '更新费用类型',
      path: '/xhhms/rest/interMedicaChargeTypeController/v1/update',
      mockPath: '',
      params: {
        name: '',
        code: '',
        spelling: '',
        memo: '',
        id: ''
      }
    },
    {
      methodsName: 'pricetypeSettingDel',
      method: 'POST',
      desc: '删除费用类型',
      path: '/xhhms/rest/interMedicaChargeTypeController/v1/del',
      mockPath: '',
      params: {
        id: ''
      }
    },
    //checktypeSettings.vue
    {
      methodsName: 'checktypeSettingGetAll',
      method: 'POST',
      desc: '获取检查类型列表',
      path: '/xhhms/rest/interMedicaCheckItemController/v1/getAll',
      mockPath: '',
      params: {
        name: '',
        page: 1,
        size: 12,
      }
    },
    {
      methodsName: 'checktypeSettingAdd',
      method: 'POST',
      desc: '添加检查类型',
      path: '/xhhms/rest/interMedicaCheckItemController/v1/add',
      mockPath: '',
      params: {
        name: '',
        code: '',
        spelling: '',
        memo: ''
      }
    },
    {
      methodsName: 'checktypeSettingUpdate',
      method: 'POST',
      desc: '更新检查类型',
      path: '/xhhms/rest/interMedicaCheckItemController/v1/update',
      mockPath: '',
      params: {
        name: '',
        code: '',
        spelling: '',
        memo: '',
        id: ''
      }
    },
    {
      methodsName: 'checktypeSettingDel',
      method: 'POST',
      desc: '删除检查类型',
      path: '/xhhms/rest/interMedicaCheckItemController/v1/del',
      mockPath: '',
      params: {
        id: ''
      }
    },
    //judgeSettings.vue
    {
      methodsName: 'judgeSettingGetAll',
      method: 'POST',
      desc: '获取综合评价列表',
      path: '/xhhms/rest/interMedicaEvaluationController/v1/getAll',
      mockPath: '',
      params: {
        name: '',
        page: 1,
        size: 15,
      }
    },
    {
      methodsName: 'judgeSettingAdd',
      method: 'POST',
      desc: '添加综合评价',
      path: '/xhhms/rest/interMedicaEvaluationController/v1/add',
      mockPath: '',
      params: {
        name: '',
        code: '',
        spelling: '',
        memo: ''
      }
    },
    {
      methodsName: 'judgeSettingUpdate',
      method: 'POST',
      desc: '更新综合评价',
      path: '/xhhms/rest/interMedicaEvaluationController/v1/update',
      mockPath: '',
      params: {
        name: '',
        code: '',
        spelling: '',
        memo: '',
        id: ''
      }
    },
    {
      methodsName: 'judgeSettingDel',
      method: 'POST',
      desc: '删除综合评价',
      path: '/xhhms/rest/interMedicaEvaluationController/v1/del',
      mockPath: '',
      params: {
        id: ''
      }
    },
    //judgeSettings.vue
    {
      methodsName: 'paperSettingGetAll',
      method: 'POST',
      desc: '获取纸张配置列表',
      path: '/xhhms/rest/interMedicalPaperController/v1/getAll',
      mockPath: '',
      params: {
        name: '',
        page: 1,
        size: 15,
      }
    },
    {
      methodsName: 'paperSettingAdd',
      method: 'POST',
      desc: '添加纸张配置',
      path: '/xhhms/rest/interMedicalPaperController/v1/add',
      mockPath: '',
      params: {
        name: '',
        paperWidth: '',
        paperHeight: '',
        paperResoure: '',
        description: '',
        defaultPaper: '',
      }
    },
    {
      methodsName: 'paperSettingUpdate',
      method: 'POST',
      desc: '更新纸张配置',
      path: '/xhhms/rest/interMedicalPaperController/v1/update',
      mockPath: '',
      params: {
        name: '',
        paperWidth: '',
        paperHeight: '',
        paperResoure: '',
        description: '',
        defaultPaper: '',
        id: ''
      }
    },
    {
      methodsName: 'paperSettingDel',
      method: 'POST',
      desc: '删除纸张配置',
      path: '/xhhms/rest/interMedicalPaperController/v1/del',
      mockPath: '',
      params: {
        id: ''
      }
    },
    //makeidSettings.vue
    {
      methodsName: 'makeidSettingGetAll',
      method: 'POST',
      desc: '获取ID生成器列表',
      path: '/xhhms/rest/interBsResourceCodeController/v1/getAll',
      mockPath: '',
      params: {
        codeName: '',
        page: 1,
        size: 12,
      }
    },
    {
      methodsName: 'makeidSettingAdd',
      method: 'POST',
      desc: '添加ID生成器',
      path: '/xhhms/rest/interBsResourceCodeController/v1/add',
      mockPath: '',
      params: {
        codeName: '',
        prefixCode: '',
        timeCode: '',
        randomCode: '',
        current: '',
        suffixCode: '',
        type: '',
        devicetype: '',
        comments:''
      }
    },
    {
      methodsName: 'makeidSettingUpdate',
      method: 'POST',
      desc: '更新ID生成器',
      path: '/xhhms/rest/interBsResourceCodeController/v1/update',
      mockPath: '',
      params: {
        codeName: '',
        prefixCode: '',
        timeCode: '',
        randomCode: '',
        current: '',
        suffixCode: '',
        type: '',
        devicetype: '',
        comments:'',
        id: ''
      }
    },
    {
      methodsName: 'makeidSettingDel',
      method: 'POST',
      desc: '删除ID生成器',
      path: '/xhhms/rest/interBsResourceCodeController/v1/del',
      mockPath: '',
      params: {
        id: ''
      }
    },
     //dieaseSettings.vue
    {
      methodsName: 'dieaseSettingGetAll',
      method: 'POST',
      desc: '获取疾病列表',
      path: '/xhhms/rest/interIdcController/v1/getAll',
      mockPath: '',
      params: {
        name: '',
        page: 1,
        size: 12,
      }
    },
    {
      methodsName: 'dieaseSettingAdd',
      method: 'POST',
      desc: '添加疾病',
      path: '/xhhms/rest/interIdcController/v1/add',
      mockPath: '',
      params: {
        code: '',
        ename: '',
        name: '',
        spelling: '',
        parentId: ''
      }
    },
    {
      methodsName: 'dieaseSettingUpdate',
      method: 'POST',
      desc: '更新疾病',
      path: '/xhhms/rest/interIdcController/v1/update',
      mockPath: '',
      params: {
        code: '',
        ename: '',
        name: '',
        spelling: '',
        id: ''
      }
    },
    {
      methodsName: 'dieaseSettingDel',
      method: 'POST',
      desc: '删除疾病',
      path: '/xhhms/rest/interIdcController/v1/del',
      mockPath: '',
      params: {
        id: ''
      }
    },
    // expertsSetting.vue
    {
      methodsName: 'expertsSettingGetAll',
      method: 'POST',
      desc: '获取专家库列表',
      path: '/xhhms/rest/interExpertDatabaseController/v1/getAll',
      mockPath: '',
      params: {
        name:'',
        page: 1,
        size: 12,
      }
    },
    {
      methodsName: 'expertsSettingGetAllByName',
      method: 'POST',
      desc: '根据名字获取专家库列表',
      path: '/xhhms/rest/interExpertDatabaseController/v1/getlistByIdAndName',
      mockPath: '',
      params: {
        name: '',
        page: 1,
        size: 15,
      }
    },
    {
      methodsName: 'expertsSettingDel',
      method: 'POST',
      desc: '删除专家库',
      path: '/xhhms/rest/interExpertDatabaseController/v1/delete',
      mockPath: '',
      params: {
        id: ''
      }
    },
    {
      methodsName: 'expertsSettingAdd',
      method: 'POST',
      desc: '添加专家库信息',
      path: '/xhhms/rest/interExpertDatabaseController/v1/add',
      mockPath: '',
      params: {
        name: '',
        sex: '',
        birthday: '',
        nationnality: '',
        idcard: '',
        hospital: '',
        office: '',
        professional: '',
        research: '',
        expertField: '',
        doctorDesc: '',
        address: '',
        phone: '',
        email: '',
        remarks: '',
        userName: '',
        password: '',
        checkPassword: ''
      }
    },
    {
      methodsName: 'expertsSettingUpdate',
      method: 'POST',
      desc: '更新专家库信息',
      path: '/xhhms/rest/interExpertDatabaseController/v1/update',
      mockPath: '',
      params: {
        id: '',
        name: '',
        sex: '',
        birthday: '',
        nationnality: '',
        idcard: '',
        hospital: '',
        office: '',
        professional: '',
        research: '',
        expertField: '',
        doctorDesc: '',
        address: '',
        phone: '',
        email: '',
        remarks: '',
        userName: '',
        password: '',
        checkPassword: ''
      }
    },
    // 次级联动信息
    {
      methodsName: 'getHdListById',
      method: 'POST',
      desc: '更新专家库信息',
      path: '/xhhms/rest/interMedicalOfficesController/v1/getMedicalOffice',
      mockPath: '',
      params: {
        id: 0,
      }
    },
    //根据子级查询父级
    
    {
      methodsName: 'getFatherById',
      method: 'POST',
      desc: '根据子级查询父级',
      path: '/xhhms/rest/interMedicalOfficesController/v1/getParentOffice',
      mockPath: '',
      params: {
        id: '',
      }
    },
    // hospitalDepartmentsSettings.vue
    {
      methodsName: 'hdSettingGetAll',
      method: 'POST',
      desc: '获取医院科室信息列表',
      path: '/xhhms/rest/interMedicalOfficesController/v1/getAll',
      mockPath: '',
      params: {
        officeName: '',
        page: 1,
        size: 12,
      }
    },
    {
      methodsName: 'hdSettingAdd',
      method: 'POST',
      desc: '添加医院科室信息',
      path: '/xhhms/rest/interMedicalOfficesController/v1/add',
      mockPath: '',
      params: {
        parientId: '',
        // sysOrgCode: '',
        // sysCompanyCode: '',
        officeName: ''
      }
    },
    {
      methodsName: 'hdSettingUpdate',
      method: 'POST',
      desc: '修改医院科室信息',
      path: '/xhhms/rest/interMedicalOfficesController/v1/update',
      mockPath: '',
      params: {
        id: '',
        // sysOrgCode: '',
        // sysCompanyCode: '',
        officeName: ''
      }
    },
    {
      methodsName: 'hdSettingDel',
      method: 'POST',
      desc: '删除医院科室信息',
      path: '/xhhms/rest/interMedicalOfficesController/v1/del',
      mockPath: '',
      params: {
        id: '',
      }
    },
    //databaseSettings index.vue
    {
      methodsName: 'databaseSettingGetlist',
      method: 'POST',
      desc: '获取数据源列表',
      path: '/xhhms/rest/interTsDynamicDbController/v1/findByPage',
      mockPath: '',
      params: {
        page: 1,
        size: 12,
        dbName: ''
      }
    },
    {
      methodsName: 'databaseSettingAdd',
      method: 'POST',
      desc: '添加数据源',
      path: '/xhhms/rest/interTsDynamicDbController/v1/add',
      mockPath: '',
      params: {
        dbName: '',
        dbType: '',
        dbDriver:'',
        dbAddress: '',
        dbUserName: '',
        dbPassword: '',
        dbStatus: '',  // 0 -未使用 1-使用
        dbDesc: ''
      }
    },
    {
      methodsName: 'databaseSettingUpdate',
      method: 'POST',
      desc: '更新数据源',
      path: '/xhhms/rest/interTsDynamicDbController/v1/update',
      mockPath: '',
      params: {
        id: '',
        dbName: '',
        dbType: '',
        dbDriver:'',
        dbAddress: '',
        dbUserName: '',
        dbPassword: '',
        dbStatus: '',  // 0 -未使用 1-使用
        dbDesc: ''
      }
    },
    {
      methodsName: 'databaseSettingDel',
      method: 'POST',
      desc: '删除数据源',
      path: '/xhhms/rest/interTsDynamicDbController/v1/delete',
      mockPath: '',
      params: {
        id: ''
      }
    },
    // cameraSettings index.vue
    {
      methodsName: 'cameraSettingsGetlist',
      method: 'POST',
      desc: '获取相机列表数据',
      path: '/xhhms/rest/interMedicalCameraController/v1/getAll',
      mockPath: '',
      params: {
        name: '',
        page: 1,
        size: 15
      }
    },
    {
      methodsName: 'cameraSettingsAdd',
      method: 'POST',
      desc: '添加相机列表数据',
      path: '/xhhms/rest/interMedicalCameraController/v1/add',
      mockPath: '',
      params: {
        name: '',
        ip: '',
        port: '',
        aetitle: '',
        manufacturer: ''
      }
    },
    {
      methodsName: 'cameraSettingsUpdate',
      method: 'POST',
      desc: '更新相机列表数据',
      path: '/xhhms/rest/interMedicalCameraController/v1/update',
      mockPath: '',
      params: {
        id: '',
        name: '',
        ip: '',
        port: '',
        aetitle: '',
        manufacturer: ''
      }
    },
    {
      methodsName: 'cameraSettingsdel',
      method: 'POST',
      desc: '删除相机列表数据',
      path: '/xhhms/rest/interMedicalCameraController/v1/del',
      mockPath: '',
      params: {
        id: ''
      }
    },
    {
      methodsName: 'getDoctorLevelList',
      method: 'POST',
      desc: '获取医院等级列表',
      path: '/xhhms/rest/interDoctorLevelController/v1/getPageList',
      mockPath: '',
      params: {
        levelName: '',
        page: 1,
        size: 10
      }
    },
    {
      methodsName: 'saveDoctorLevel',
      method: 'POST',
      desc: '保存医院等级列表(新增或修改)',
      path: '/xhhms/rest/interDoctorLevelController/v1/saveDoctorLevel',
      mockPath: '',
      params: {
        levelCode: '',
        levelName: '',
        levelStatus: '',
        id: ''
      }
    },
    {
      methodsName: 'delDoctorLevel',
      method: 'POST',
      desc: '删除获取医院等级列表',
      path: '/xhhms/rest/interDoctorLevelController/v1/delDoctorLevel',
      mockPath: '',
      params: {
        id: ''
      }
    },
    {
      methodsName: 'getUserInfoList',
      method: 'POST',
      desc: '获取用户信息列表',
      path: '/xhhms/rest/interUserController/v1/getUserPageList',
      mockPath: '',
      params: {
        userName: '',
        page: 1,
        size: 10
      }
    },
    {
      methodsName: 'saveUserInfo',
      method: 'POST',
      desc: '添加用户信息',
      path: '/xhhms/rest/interUserController/v1/saveUserInfo',
      mockPath: '',
      params: {
        id: '',
        mobilePhone: '',
        officePhone: '',
        email: '',
        userName: '',
        realName: '',
        departId: '',
        roleId: '',
        doctorLevelCode: '' ,
        doctorLevelName: '',
        password: ''
      }
    },
    {
      methodsName: 'delUserInfo',
      method: 'POST',
      desc: '删除用户信息',
      path: '/xhhms/rest/interUserController/v1/delUserInfo',
      mockPath: '',
      params: {
        id: ''
      }
    },
    {
      methodsName: 'UserInfoOrg',
      method: 'GET',
      desc: '用户组织机构信息',
      path: '/xhhms/departController.do?departSelect&orgIds=8a8ab0b246dc81120146dc8180ba0017',
      mockPath: '',
      params: {
      }
    },
    {
      methodsName: 'UserInfoActor',
      method: 'POST',
      desc: '用户角色信息',
      path: '/xhhms/userController.do?roles&ids=8a8ab0b246dc81120146dc8181870050',
      mockPath: '',
      params: {
      }
    },
    {
      methodsName: 'getDepartPageList',
      method: 'POST',
      desc: '获取组织机构列表',
      path: '/xhhms/rest/interDepartController/v1/getDepartPageList',
      mockPath: '',
      params: {
        departname: '',
        page: 1,
        size: 15
      }
    },
    {
      methodsName: 'saveDepartInfo',
      method: 'POST',
      desc: '保存组织机构信息',
      path: '/xhhms/rest/interDepartController/v1/saveDepartInfo',
      mockPath: '',
      params: {
        id: '',
        parentId: '',
        departname: '',
        // orgCode: '',
        orgType: '',
        mobile: '',
        fax: '',
        address: '',
        description: '',
        hospitalType: '',
        centerFlag: ''
      }
    },
    {
      methodsName: 'delDepartInfo',
      method: 'POST',
      desc: '删除组织机构信息',
      path: '/xhhms/rest/interDepartController/v1/delDepartInfo',
      mockPath: '',
      params: {
        id: ''
      }
    },
    {
      methodsName: 'getRoleList',
      method: 'POST',
      desc: '获取用户角色列表',
      path: '/xhhms/rest/interRoleController/v1/getRolePageList',
      mockPath: '',
      params: {
        roleName: '',
        page: 1,
        size: 10
      }
    },
    {
      methodsName: 'saveRoleInfo',
      method: 'POST',
      desc: '保存用户角色信息',
      path: '/xhhms/rest/interRoleController/v1/saveRoleInfo',
      mockPath: '',
      params: {
        id: '',
        roleCode: '', // 角色编码
        roleName: '', // 角色名称
      }
    },
    {
      methodsName: 'delRoleInfo',
      method: 'POST',
      desc: '删除用户角色信息',
      path: '/xhhms/rest/interRoleController/v1/delRoleInfo',
      mockPath: '',
      params: {
        id: ''
      }
    },
    {
      methodsName: 'getAllRoles',
      method: 'POST',
      desc: '获取所有的角色',
      path: '/xhhms/rest/interRoleController/v1/getAllRoles',
      mockPath: '',
      params: {
      }
    },
    {
      methodsName: 'getAllDepart',
      method: 'POST',
      desc: '获取所有的组织结构',
      path: '/xhhms/rest/interDepartController/v1/findAllDepart',
      mockPath: '',
      params: {
      }
    },
    {
      methodsName: 'getAllDoctorlevel',
      method: 'POST',
      desc: '获取医生等级',
      path: '/xhhms/rest/interDoctorLevelController/v1/getAllDoctorLevel',
      mockPath: '',
      params: {
      }
    },
    {
      methodsName: 'getFunctionMenuList',
      method: 'POST',
      desc: '获取菜单列表',
      path: '/xhhms/rest/interFunctionController/v1/getFunctionList',
      mockPath: '',
      params: {
        functionName: ''   //菜单名称
      }
    },
    {
      methodsName: 'saveFunctionMenu',
      method: 'POST',
      desc: '保存菜单',
      path: '/xhhms/rest/interFunctionController/v1/saveFunctionInfo',
      mockPath: '',
      params: {
        id: '',   // 菜单id
        parentId: '', //父级菜单id
        functionName: '', // 菜单名称
        functionLevel: '', // 菜单等级
        functionUrl: '', //菜单地址
        functionIframe: '', //菜单地址打开方式
        functionOrder: '', // 菜单排序
        // functionType:'', //菜单类型
        iconId: '', // 菜单图标
        functionIconStyle: '', //菜单图标样式
        iconDeskId:'' , // 云桌面菜单图标
        // frontFlag: '', // 前端标识 1-是  0、null-否
      }
    },
    {
      methodsName: 'delFunctionMenu',
      method: 'POST',
      desc: '删除菜单',
      path: '/xhhms/rest/interFunctionController/v1/delFunctionInfo',
      mockPath: '',
      params: {
        id: ''   // 菜单id
      }
    },
    {
      methodsName: 'getAllFunctionMenu',
      method: 'POST',
      desc: '获取前端所有的菜单',
      path: '/xhhms/rest/interFunctionController/v1/getAllFrontMenu',
      mockPath: '',
      params: {
      }
    },
    {
      methodsName: 'getAllFunctionMenuByRoleid',
      method: 'POST',
      desc: '根据角色id获取所有的菜单',
      path: '/xhhms/rest/interFunctionController/v1/getFrontMenuByRoleId',
      mockPath: '',
      params: {
        roleId: '' //角色id
      }
    },
    {
      methodsName: 'saveMenuWithRoleid',
      method: 'POST',
      desc: '对角色进行菜单授权',
      path: '/xhhms/rest/interFunctionController/v1/saveRoleFunction',
      mockPath: '',
      params: {
        roleId: '', //角色id
        functionIds: '', // 未全选的菜单id
        selectFunctionIds: '' //全选的菜单id
      }
    },
    {
      methodsName: 'getMenuIcon',
      method: 'POST',
      desc: '获取系统菜单图标',
      path: '/xhhms/rest/interIconController/v1/getSystemIcon',
      mockPath: '',
      params: {
      }
    },
    {
      methodsName: 'getBasicMenuList',
      method: 'POST',
      desc: '获取基础管理菜单',
      path: '/xhhms/rest/interFunctionController/v1/findChildrenFunction',
      mockPath: '',
      params: {
      }
    }
]

export default api
