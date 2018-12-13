const common = [
  {
    methodsName: 'userLogin',
    method: 'POST',
    desc: '用户登录接口',
    path: '/xhhms/rest/interfacesLoginController/login',
    mockPath: '',
    params: {
      userName: '',
      password: '',
      code: '',
      codeid: '',
      clientid: ''
    }
  },
  {
    methodsName: 'getMenu',
    method: 'POST',
    desc: '获取首页菜单',
    path: '/xhhms/rest/interFunctionController/v1/findStairFunction',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getCode',
    method: 'POST',
    desc: '获取验证码',
    path: '/xhhms/rest/interRandomCodeController/gererateRandomCode',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'getPublicKey',
    method: 'POST',
    desc: '获取公钥',
    path: '/xhhms/rest/interRandomCodeController/clientIdAndPublicKey',
    mockPath: '',
    params: {
    }
  },
  {
    methodsName: 'changePassword',
    method: 'POST',
    desc: '修改密码',
    path: '/xhhms/rest/interUserController/v1/savePassword',
    mockPath: '',
    params: {
      password: '',
      newpassword: ''
    }
  }
]
export default common
