import {cornerstone} from './initCornerstoneTools'
const mixin = {
  data () {
    return {
      // Patient info
      imageInfo: {
        WW: '',
        WC: '',
        Zoom: '1.0'
      },
      // Patient info
      patientInfo: {
        patientId: '',
        patientName: ''
      }
    }
  },
  mounted () {
    
  },
  methods: {
    // Get one info
    getOneInfo (imageId) {
      this.patientInfo = cornerstone.metaData.get('patientInfo', imageId)
    },
    // Init magnify
    initBasic () {
      var config = {
        magnifySize: 300, // parseInt(magSizeRange.value, 10)
        magnificationLevel: 1 // parseInt(magLevelRange.value, 10)
      };
      this.$cornerstoneTools.magnify.setConfiguration(config);
    },
    // Magnify
    basic (element) {
      this.$cornerstoneTools.pan.activate(element, 2);
      this.$cornerstoneTools.zoom.activate(element, 4);
      this.$cornerstoneTools.magnify.enable(element);
      this.$cornerstoneTools.magnifyTouchDrag.enable(element);
      this.$cornerstoneTools.magnify.activate(element, 1);
      this.$cornerstoneTools.magnifyTouchDrag.activate(element);
    },
    // Clear magnify
    clearBasic (element) {
      this.$cornerstoneTools.magnify.disable(element);
      this.$cornerstoneTools.magnifyTouchDrag.disable(element);
    }
  }
}

export default mixin