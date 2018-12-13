/**
 * 处理主题逻辑
*/

// 页面刷新读取本地主题色
let themeClass = localStorage.getItem('themeClass') || 'default'
themeClass && (document.documentElement.className += `theme-${themeClass}`)
