/**
 * 其他操作
*/
import {cornerstone, cornerstoneTools} from '../initCornerstoneTools'
const mixin = {
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
    /**
     * 文件保存成图片
    */
    saveToImage () {
      let fileName = prompt('请输入保存文件名')
      cornerstoneTools.saveAs(this.element, `${fileName || 'default'}.png`);
    },
    /**
     * 设置反片
    */
    setInvert () {
      var viewport = cornerstone.getViewport(this.element)
      if (viewport.invert === true) {
        viewport.invert = false
      } else {
        viewport.invert = true
      }
      cornerstone.setViewport(this.element, viewport)
    },
    // 清除现有标记
    clearAll (mode = 'all') {
      if (mode === 'all') {
        let modes = [
          'probe',
          'ellipticalRoi',
          'rectangleRoi',
          'angle',
          'highlight',
          'freehand',
          'eraser',
          'length'
        ]
        modes.forEach(item => {
          cornerstoneTools.clearToolState(this.element, item);
        })
        // 清除所有
        // var toolStateManager = cornerstoneTools.getElementToolStateManager(this.element);
        // toolStateManager.clear(this.element)
      } else {
        // 清除指定
        cornerstoneTools.clearToolState(this.element, mode);
      }
      cornerstone.updateImage(this.element);
    },
    // 更新图片
    resize () {
      // 更新图片
      if (this.isDOM(this.element)) {
        let canvas = this.element.querySelector('canvas')
        canvas.style.display = 'none'
        let {clientHeight, clientWidth} = this.element
        canvas.width = clientWidth
        canvas.height = clientHeight
        canvas.style.width = `${clientWidth}px`
        canvas.style.height = `${clientHeight}px`
      }
    },
    // 判断是否是DOM对象
    isDOM (obj) {
      if (typeof HTMLElement === 'object') {
        if (obj && obj instanceof HTMLElement) return true
      } else {
        if (obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string') return true
      }
      return false
    },
    // 添加备注
    arrowAnnotate () {
      cornerstoneTools.arrowAnnotate.activate(this.element, 1);
      cornerstoneTools.arrowAnnotateTouch.activate(this.element);
    }
  }
}

export default mixin