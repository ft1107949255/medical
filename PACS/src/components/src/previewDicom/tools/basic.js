import {cornerstone, cornerstoneTools} from '../initCornerstoneTools'
const mixin = {
  props: {
    patient: {
      type: Object,
      default () {
        return {
          patientName: ''
        }
      }
    }
  },
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
      },
      DICOMINFO: {}
    }
  },
  mounted () {
    
  },
  methods: {
    /**
     * 获取元数据（病人信息等）
    */
    getOneInfo (imageId) {
      this.DICOMINFO = cornerstone.metaData.get('DICOMINFO', imageId) || {}
    },
    /**
     * 获取四角参数值
    */
    getAngleParamsValue (value) {
      let label
      switch (value) {
        case 'WindowWidth': label = this.imageInfo.WW; break
        case 'WindowCenter': label = this.imageInfo.WC; break
        case 'ZOOM': label = this.imageInfo.Zoom; break
        case 'PatientsName': label = this.patient.patientName; break
        case 'SeriesNumber': label = `${this.currentImageIdIndex || this.currentIndex + 1}/${this.imagesLength || this.url.length}`; break
        default: label = this.DICOMINFO[value] || ''
      }
      return label
    },
    /**
     * 设置窗宽窗位
    */
    setWwwc (data) {
      var viewport = cornerstone.getViewport(this.element)
      viewport.voi.windowWidth = data.ww
      viewport.voi.windowCenter = data.wc
      cornerstone.setViewport(this.element, viewport)
    },
    setHeartT (data) {
      this.lengthData = data
    },
    /**
     * 绑定cornerstoneimagerendered事件获取图片基础信息
    */
    bindEvent (element) {
      // this.isTrue = false
      // element.addEventListener('cornerstonetoolsmeasurementmodified', (e) => {
      //   this.isTrue = true
      //   this.lengthData.value = e.detail.measurementData.length
      // })
      element.addEventListener('cornerstoneimagerendered', onImageRendered.bind(this))
      // Listen for changes to the viewport so we can update the text overlays in the corner
      function onImageRendered(e) {
        var viewport = cornerstone.getViewport(e.target)
        this.imageInfo = {
          WW: Math.round(viewport.voi.windowWidth),
          WC: Math.round(viewport.voi.windowCenter),
          Zoom: viewport.scale.toFixed(2)
        }
      };
    },
  }
}

export default mixin