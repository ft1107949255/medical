const state = {
  // 用户数据
  user: {
    username: '', // 用户名
    realname: '', // 真实姓名
    officePhone: '', // 办公室电话
    mobilePhone: '', // 手机
    ip: '', // 登录IP
    head: '', // 头像
    email: '', // 邮箱
    createDate: '', // 注册时间
    departs: '' // 上级
  },
  // 当前角色
  currentRole: {
    roleId: '',
    roleName: '请选择角色'
  },
  // 当前网站
  currentSite: {
    name: '请选择', // 网站名称
    code: '' // 网站code
  },
  // 菜单列表
  menuList: [],
  // 菜单地址数组
  menuPathList: [],
  // 当前访问路径
  currentPathRecode: [],
  // 当前菜单id
  currentMenuId: '',
  // 换成组件列表
  keepAlive: []
}

export default state
