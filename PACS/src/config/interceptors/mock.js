import mock from 'Mock'
/**
 * makeMockData 生成mock数据
 * @params {string} path 接口请求地址
 * @returns {object} data 接口请求mock数据
 */
export function makeMockData(path) {
  if (!Array.isArray(mock)) {
    console.log('mock数据组必须为一个数组')
    return
  }
  // 获取匹配的mock数据
  let mockData = mock.filter(item => new RegExp(path).test(item.path))
  if (mockData.length > 1) {
    console.log('已匹配多条数据，请检查')
    return
  }
  return new Promise((resolve, reject) => {
    resolve(mockData[0].data)
  })
}
