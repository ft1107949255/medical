/**
 * Rotate
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
    // Open auto rotate
    /**
     * 添加自动旋转
    */
    addAutoRotate () {

    },
    /**
     * 移除自动旋转
    */
    removeAutoRotate () {
      cornerstoneTools.rotate.disable(this.element);
      cornerstoneTools.rotateTouchDrag.disable(this.element);
    },
    /**
     * 触发水平翻转或者垂直翻转
     * @params {string} type （h：垂直翻转，l：水平翻转）
    */
    setFlip (type = 'h') {
      let viewport = cornerstone.getViewport(this.element);
      switch (type) {
        case 'h':
          viewport.hflip = !viewport.hflip;          
          break;
        case 'v':
          viewport.vflip = !viewport.vflip;          
          break;
      }
      cornerstone.setViewport(this.element, viewport);
    },
    /**
     * 触发旋转
     * @params {string} type （left：垂直翻转，right：水平翻转）
     * @params {number} rotate 旋转角度
    */
    setRotate (type = 'left', rotate = 90) {
      let viewport = cornerstone.getViewport(this.element);
      switch (type) {
        case 'left':
          viewport.rotation -= rotate;        
          break;
        case 'right':
          viewport.rotation += rotate;           
          break;
      }
      cornerstone.setViewport(this.element, viewport);
    }
  }
}

export default mixin