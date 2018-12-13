let config = require('./config')
let fs = require('fs')

// 基础模板
let str = `@import './theme.stylus'\n`

// 遍历主题配置文件
config.forEach(item => {
  let colorArr = []
  Object.keys(item).forEach(keys => {
    if (keys.toLowerCase().indexOf('color') > -1) {
      colorArr.push(item[keys])
    }
  })
  str += `
.theme-${item.themeClass} {
  theme(${colorArr.join(', ')});
}`
})

// 重写index.stylus文件
fs.writeFile(`${__dirname}/index.stylus`, str)
