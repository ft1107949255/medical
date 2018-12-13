import {cornerstone, cornerstoneTools} from '../initCornerstoneTools'
const mixin = {
  methods: {
    // Init magnify
    initMagnify (config = {}) {
      var defautlConfig = {
        magnifySize: 100, // parseInt(magSizeRange.value, 10)
        magnificationLevel: 1 // parseInt(magLevelRange.value, 10)
      };
      let mergeConfig = Object.assign(defautlConfig, config)
      let magnifyTool = this.$refs.dicom.querySelector('.magnifyTool')
      magnifyTool.width = mergeConfig.magnifySize
      magnifyTool.height = mergeConfig.magnifySize
      cornerstoneTools.magnify.setConfiguration(mergeConfig);
      cornerstone.updateImage(this.element);
    },
    // Magnify
    Magnify () {
      cornerstoneTools.pan.activate(this.element, 2);
      cornerstoneTools.zoom.activate(this.element, 4);
      cornerstoneTools.magnify.enable(this.element);
      cornerstoneTools.magnifyTouchDrag.enable(this.element);
      cornerstoneTools.magnify.activate(this.element, 1);
      cornerstoneTools.magnifyTouchDrag.activate(this.element);
    },
    // Clear magnify
    clearMagnify () {
      cornerstoneTools.magnify.disable(this.element);
      cornerstoneTools.magnifyTouchDrag.disable(this.element);
    }
  }
}

export default mixin