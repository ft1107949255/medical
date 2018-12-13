const mixin = {
  methods: {
    // Init magnify
    initMagnify () {
      var config = {
        magnifySize: 300, // parseInt(magSizeRange.value, 10)
        magnificationLevel: 1 // parseInt(magLevelRange.value, 10)
      };
      this.$cornerstoneTools.magnify.setConfiguration(config);
    },
    // Magnify
    Magnify (element) {
      this.$cornerstoneTools.pan.activate(element, 2);
      this.$cornerstoneTools.zoom.activate(element, 4);
      this.$cornerstoneTools.magnify.enable(element);
      this.$cornerstoneTools.magnifyTouchDrag.enable(element);
      this.$cornerstoneTools.magnify.activate(element, 1);
      this.$cornerstoneTools.magnifyTouchDrag.activate(element);
    },
    // Clear magnify
    clearMagnify (element) {
      this.$cornerstoneTools.magnify.disable(element);
      this.$cornerstoneTools.magnifyTouchDrag.disable(element);
    }
  }
}

export default mixin