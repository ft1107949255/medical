import Vue from 'vue'

// 自定义拖拽指令
Vue.directive('drag', {
  inserted (el, binding, vnode) {
    let title = el.querySelector('.drag-header') || el
    title.style.cursor = 'move'

    const sty = el.currentStyle || window.getComputedStyle(el, null)

    title.onmousedown = (e) => {
      const disX = e.clientX - title.offsetLeft
      const disY = e.clientY - title.offsetTop

      // 获取到的值带px 正则匹配替换
      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY

        // 移动当前元素
        el.style.left = `${l + styL}px`
        el.style.top = `${t + styT}px`
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

export default Vue
