/**
 * 工具函数
 * @author 一生为倾狂
 * @time 2018-07-23
 */

export function _formatTree (data) {
  console.time('_formatTree')
  let ptree = []
  // 获取父元素
  for (var i = 0; i < data.length; i++) {
    if (data[i].pid == null || !data.some(item => item.id === data[i].pid)) {
      let o = sonsTree(data[i], data)
      ptree.push(o)
    }
  }

  function sonsTree(obj, arr) {
    var children = []
    for (var i = 0; i < arr.length; i++) {
      // pid等于加入数组
      if (arr[i].pid === obj.id) {
        sonsTree(arr[i], arr) // 递归出子元素
        arr[i].pname = obj.name
        children.push(arr[i])
      }
    }
    if (children.length > 0) {
      obj.children = children
    }
    return obj
  }
  console.timeEnd('_formatTree')
  return ptree
}

export function _formatTreeKeys(data) {
  let arr = []
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i].id)
      if (data[i].children && data[i].children.length > 0) {
        getId(data[i].children)
      }
    }
  }
  function getId (children) {
    children.map(item => {
      arr.push(item.id)
      if (item.children && item.children.length > 0) {
        getId(item.children)
      }
    })
  }
  return arr
}

/**
 * 格式化二维数组为树形结构
 * @param data {array} 二位数组
 * @param options {object} 配置参数
 * @param --parentId {string} 父级Id键名
 * @param --id {string} id 自身Id键名
 * @param --children {string} 子集键名
 * {
 *  parentId: 'parentId',
 *  id: 'id',
 *  children: 'children'
 * }
 * @return arr {array} 格式化之后的数组
 */
export function formatTree(data, options) {
  console.time('formatTree')
  if (Object.prototype.toString.call(data) !== '[object Array]') {
    console.error(`formatTree - data：不是一个数组`)
    return
  }

  // 配置项
  let defaultOptions = Object.assign(
    {
      parentId: 'parentId',
      id: 'id',
      childrens: 'children'
    },
    options
  )

  let {parentId, id, childrens} = defaultOptions

  let arr = []
  // let level = 0

  // let ptree = []/
  data.forEach(item => {
    if (!item[parentId] || !data.some(items => items[id] === item[parentId])) {
      let o = formatData(item, data)
      arr.push(o)
    }
  })

  function formatData(obj, arr) {
    var children = []
    arr.forEach(item => {
      if (item[parentId] === obj[id]) {
        formatData(item, arr)
        children.push(item)
      }
    })
    if (children.length) {
      obj[childrens] = children
    }
    return obj
  }

  console.timeEnd('formatTree')
  return arr
}

export function getNumb() {
  var num = []
  for (var i = 0; i < 10; i++) {
    var val = Math.ceil(Math.random() * 30)
    var isEqu = false
    for (var idx in num) {
      if (num[idx] === val) {
        isEqu = true
        break
      }
    }
    if (isEqu) i--
    else num[num.length] = val
  }
  return num
}

// scrollTop animation
export function scrollTo(el, from = 0, to, duration = 500, direction = 'top') {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil((difference / duration) * 5)

  function scroll(start, end, step) {
    if (start === end) return

    let d = start + step > end ? end : start + step
    if (start > end) {
      d = start - step < end ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el['scroll' + titleCase(direction)] = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

export function titleCase (str) {
  return str.substr(0, 1).toUpperCase() + str.substr(1)
}

export function assert(condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`)
}

/*判断是否是内网IP*/  
export function isInnerIPFn () {
  // 获取当前页面url
   var curPageUrl = window.location.href;

   var reg1 = /(http|ftp|https|www):\/\//g;//去掉前缀
   curPageUrl =curPageUrl.replace(reg1,'');
   // console.log('curPageUrl-1  '+curPageUrl);

   var reg2 = /\:+/g;//替换冒号为一点
   curPageUrl =curPageUrl.replace(reg2,'.');
   // console.log('curPageUrl-2  '+curPageUrl);

   curPageUrl = curPageUrl.split('.');//通过一点来划分数组

   var ipAddress = curPageUrl[0]+'.'+curPageUrl[1]+'.'+curPageUrl[2]+'.'+curPageUrl[3];

   var isInnerIp = false;//默认给定IP不是内网IP      
   var ipNum = getIpNum(ipAddress);      
   /** 
    * 私有IP：A类  10.0.0.0    -10.255.255.255 
    *       B类  172.16.0.0  -172.31.255.255    
    *       C类  192.168.0.0 -192.168.255.255   
    *       D类   127.0.0.0   -127.255.255.255(环回地址)  
    **/     
   var aBegin = getIpNum("10.0.0.0");      
   var aEnd = getIpNum("10.255.255.255");      
   var bBegin = getIpNum("172.16.0.0");      
   var bEnd = getIpNum("172.31.255.255");      
   var cBegin = getIpNum("192.168.0.0");      
   var cEnd = getIpNum("192.168.255.255");   
   var dBegin = getIpNum("127.0.0.0");      
   var dEnd = getIpNum("127.255.255.255");  
   isInnerIp = isInner(ipNum,aBegin,aEnd) || isInner(ipNum,bBegin,bEnd) || isInner(ipNum,cBegin,cEnd) || isInner(ipNum,dBegin,dEnd);  
   return isInnerIp;  
}  
function getIpNum(ipAddress) {/*获取IP数*/      
   var ip = ipAddress.split(".");      
   var a = parseInt(ip[0]);      
   var b = parseInt(ip[1]);      
   var c = parseInt(ip[2]);      
   var d = parseInt(ip[3]);  
   var ipNum = a * 256 * 256 * 256 + b * 256 * 256 + c * 256 + d;      
   return ipNum;      
}     

function isInner(userIp,begin,end){      
   return (userIp>=begin) && (userIp<=end);      
}
