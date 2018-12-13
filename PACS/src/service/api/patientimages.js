/**
 * Patient images
 */

const api = [
  {
    methodsName: 'getPatientImage',
    method: 'POST',
    desc: '获取本地病人dicom',
    path: '/xhhms/rest/studyImageController/v1/goStudyinfo',
    mockPath: '',
    params: {
      id: ''
    }
  },
  {
    methodsName: 'getCloudPatientImage',
    method: 'POST',
    desc: '获取云端病人dicom',
    path: '/xhhms/rest/studyImageController/v1/goCloudStudyinfo',
    mockPath: '',
    params: {
      id: ''
    }
  },
  {
    methodsName: 'getStudyPatientImage',
    method: 'POST',
    desc: '获取已匹配或者未匹配图片列表',
    path: '/xhhms/rest/studyImageController/v1/goImageinfo',
    mockPath: '',
    params: {
      studyinsta: ''
    }
  },
  {
    methodsName: 'getWwwcTemplateList',
    method: 'POST',
    desc: '获取窗位模板列表',
    path: '/xhhms/rest/interMedicalImageWinsetController/v1/getlist',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'addPrintImage',
    method: 'POST',
    desc: '添加图片到预打印队列',
    path: '/xhhms/rest/interPrintController/v1/addPrintImage',
    mockPath: '',
    params: {
      patientId: '',
      imageId: ''
    }
  },
  {
    methodsName: 'getPrintImage',
    method: 'POST',
    desc: '获取预打印队列',
    path: '/xhhms/rest/interPrintController/v1/getPrintImage',
    mockPath: '',
    params: {
      patientId: ''
    }
  },
  {
    methodsName: 'sendPrint',
    method: 'POST',
    desc: '发送图片到打印',
    path: '/xhhms/rest/interPrintController/printImage',
    mockPath: '',
    params: {
      orienation: '',
      cameraId: '',
      filmsize: '',
      filmimage: ''
    }
  },
  {
    methodsName: 'getTagsList',
    method: 'POST',
    desc: '获取dicom Tags列表',
    path: '/xhhms/rest/interDicomController/v1/getlist',
    mockPath: '',
    params: {
    }
  }
]

export default api
