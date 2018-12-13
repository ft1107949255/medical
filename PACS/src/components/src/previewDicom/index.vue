<template>
    <div class="dicom" ref="dicom">
      <!-- <div class="dicom-description dicom-description_left dicom-description_top" v-if="isShowInfo && imageId.length">
        <p :style="angleParams.style">姓名：{{patient.patientName || patientInfo.patientName}}</p>
        <p>病人ID：{{patientInfo.patientId}}</p>
      </div>
      <div class="dicom-description dicom-description_right dicom-description_top" v-if="isShowInfo && imageId.length">
        <p>简述：</p>
        <p>拍摄时间：</p>
      </div>
      <div class="dicom-description dicom-description_left dicom-description_bottom" v-if="isShowInfo && imageId.length">
        <p>FPS：60</p>
        <p>图像数目：{{ currentImageIdIndex || currentIndex + 1}}/{{ imagesLength || url.length}}</p>
      </div>
      <div class="dicom-description dicom-description_right dicom-description_bottom" v-if="isShowInfo && imageId.length">
        <p>缩放：{{imageInfo.Zoom}}</p>
        <p>窗宽/窗位：{{imageInfo.WW}}/{{imageInfo.WC}}</p>
      </div> -->
      <div
        class="dicom-description"
        :class="{
          'dicom-description_left': item.position.includes('l'),
          'dicom-description_right': item.position.includes('r'),
          'dicom-description_top': item.position.includes('t'),
          'dicom-description_bottom': item.position.includes('b')
        }"
        v-for="item in currentAngleParams.list"
        :key="item.id"
        v-if="isShowInfo && imageId.length">
        <p
          v-for="list in item.list"
          :style="currentAngleParams.style"
          :key="list.value"
          v-if="list.value">
            {{list.value}}: {{getAngleParamsValue(list.value)}}
          </p>
        <!-- <p>拍摄时间：</p> -->
      </div>

      <!-- 自定义右键菜单组 -->
      <context-menu v-if="customContextMenu && !$route.query.studyinsta" :imageId="currentImageId"></context-menu>

      <div class="dicom-image" ref="dicomImage"></div>
    </div>
</template>
<script>
import contextMenu from './contextMenu'
import Magnify from './tools/Magnify'
import basic from './tools/basic'
import animate from './tools/animate'
import rotate from './tools/rotate'
import other from './tools/other'
import {cornerstone, cornerstoneTools} from './initCornerstoneTools'

/**
 * Preview DICOM file
 * @params imageId {string | array} DICOM file path
 * @params hasOperate {boolean} Whether it can operate
 * @params type {string | array} Oprate type (['panTouchDrag', 'rotateTouchDrag', 'rotateTouch', 'ellipticalRoiTouch', 'angleTouch', 'rectangleRoiTouch', 'lengthTouch', 'probeTouch', 'zoomTouchDrag', 'wwwcTouchDrag', 'stackScrollTouchDrag'])
 * @params currentIndex {number} Current image index
 * @function statusChange Viewport status change event
*/
export default {
  name: 'previewDicom',
  components: {
    contextMenu
  },
  mixins: [
    basic,
    Magnify,
    animate,
    rotate,
    other
  ],
  props: {
    imageId: {
      type: String | Array,
      required: false,
      default: ''
    },
    id: {
      type: String
    },
    hasOperate: {
      type: Boolean,
      default () {
        return false
      }
    },
    isShowInfo: {
      type: Boolean,
      default () {
        return true
      }
    },
    imagesLength: {
      type: Number
    },
    currentImageIdIndex: {
      type: Number,
      default: 0
    },
    customContextMenu: {
      type: Boolean,
      default: false
    },
    angleParams: {
      type: Object,
      default () {
        return {
          style: {
            fontFamily: '微软雅黑',
            color: '#FFFFFF',
            fontSize: '12px'
          },
          list: []
        }
      }
    }
  },
  data () {
    return {
      url: '',
      element: {},
      stack: {}
    }
  },
  watch: {
    imageId(newValue, oldValue) {
      this.initRender()
      this.loop && clearInterval(this.loop)
    },
    'angleParams.list' () {
      console.log(this.angleParams)
    }
  },
  created () {
  },
  mounted() {
    this.initRender()
  },
  computed: {
    currentImageId () {
      if (typeof this.imageId === 'string') {
        return this.id
      } else {
        return this.imageId[this.currentIndex] ? this.imageId[this.currentIndex].id : ''
      }
    },
    currentAngleParams () {
      if (!this.angleParams.list.length) {
        let angleParams = localStorage.getItem('angleParams')
        if (angleParams) {
          return JSON.parse(angleParams)
        }
      }
      return this.angleParams
    }
  },
  methods: {
    // Init render
    initRender () {
      if (!this.imageId.length) {
        console.error('imageId must not be undefined')
        return
      }
      if (typeof this.imageId === 'string') {
        this.url = [{imageId: this.imageId}]
      } else {
        this.url = this.imageId
      }
      this.url = this.url.map(item => `wadouri:${item.imageId}`)
      this.loadAndViewImage(this.url[0])
    },
    // Init cornerstone tools
    initCornerstoneTools () {
      this.initMagnify()
      var configuration = {
        minScale: 0.25,
        maxScale: 20,
        preventZoomOutsideImage: true
      }
      var orientationMarkersConfig = {
        drawAllMarkers: true
      }

      var arrowAnnotateConfig = {
        // getTextCallback : getTextCallback,
        // changeTextCallback : changeTextCallback,
        drawHandles : false,
        drawHandlesOnHover : true,
        arrowFirst : true
      }

      cornerstoneTools.arrowAnnotate.setConfiguration(arrowAnnotateConfig);

      // Comment this out to draw only the top and left markers
      cornerstoneTools.orientationMarkers.setConfiguration(orientationMarkersConfig);
      cornerstoneTools.zoom.setConfiguration(configuration)
      // cornerstoneTools.magnify.setConfiguration(config);
    },
    // Init tool state
    initToolState (element) {
      this.stack = {
        currentImageIdIndex: 0,
        imageIds: this.url
      }

      // Set the stack as tool state
      cornerstoneTools.addStackStateManager(element, ['stack'])
      cornerstoneTools.addToolState(element, 'stack', this.stack)
      // cornerstoneTools.stackScrollWheel.activate(element);
      cornerstoneTools.mouseInput.enable(element)
      cornerstoneTools.mouseWheelInput.enable(element);

      // Enable all tools we want to use with this element
      // this.activeTool('stackScrollTouchDrag', element)
      this.bindEvent(element)
      cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
      cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
      cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
      cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
      cornerstoneTools.probe.activate(element);
      cornerstoneTools.length.activate(element);
      cornerstoneTools.ellipticalRoi.activate(element);
      cornerstoneTools.rectangleRoi.activate(element);
      cornerstoneTools.angle.activate(element);
      cornerstoneTools.highlight.activate(element);
      cornerstoneTools.eraser.activate(element);
    },
    // Disable all tools
    disabledAllTools () {
      cornerstoneTools.wwwc.disable(this.element);
      cornerstoneTools.pan.deactivate(this.element, 1); // 2 is middle mouse button
      cornerstoneTools.zoom.deactivate(this.element, 1); // 4 is right mouse button
      cornerstoneTools.probe.deactivate(this.element, 1);
      cornerstoneTools.length.deactivate(this.element, 1);
      cornerstoneTools.ellipticalRoi.deactivate(this.element, 1);
      cornerstoneTools.rectangleRoi.deactivate(this.element, 1);
      cornerstoneTools.angle.deactivate(this.element, 1);
      cornerstoneTools.highlight.deactivate(this.element, 1);
      cornerstoneTools.freehand.deactivate(this.element, 1);
      cornerstoneTools.eraser.deactivate(this.element, 1);
      cornerstoneTools.arrowAnnotate.deactivate(this.element, 1);
      cornerstoneTools.arrowAnnotateTouch.deactivate(this.element);
      this.removeAutoRotate()
      this.clearMagnify()
    },
    // Active tool
    activeTool (type) {
      cornerstoneTools[type].activate(this.element, 1)
    },
    loadAndViewImage(imageId) {
      // 找到 要放置 Dicom Image 的元素
      let element = this.$refs.dicomImage
      this.element = element
      cornerstone.enable(element)
      // cornerstone.loadAndCacheImage 函数 负责加载图形 需要 图像地址 imageId // loadImage
      cornerstone.loadAndCacheImage(imageId).then(
        function(image) {
          var viewport = cornerstone.getDefaultViewportForImage(element, image)
          cornerstone.displayImage(element, image, viewport)
          cornerstoneTools.mouseInput.enable(element);
          // 判断canvas是否显示（更新布局的时候设置display值为none，不然影响布局）
          if (element.querySelector('canvas').style.display === 'none') {
            element.querySelector('canvas').style.display = 'block'
          }
          this.getOneInfo(imageId)
          this.hasOperate && this.initToolState(element)
        }.bind(this),
        function(err) {
          // throw new Error(err)
          console.error(err)
        }
      )
    }
  }
}
</script>
<style scoped lang="stylus">
canvas {
  overflow: hidden;
}
.dicom-image {
  height: 100%;
}
.dicom{
    width: 100%;
    height: 100%;
    position: relative;
    .dicom-description {
      position: absolute;
      color: #fff;
      z-index: 10;
      line-height: 20px;
      font-size: 12px;
      transform: scale(0.9);
    }
    .dicom-description_left {
      left: 10px;
    }
    .dicom-description_right {
      right: 10px;
    }
    .dicom-description_top {
      top: 10px;
    }
    .dicom-description_bottom {
      bottom: 10px;
    }
}
.dicom::after{
    clear: both;
}
/deep/ .magnifyTool{
  border: 4px white solid;
  box-shadow: 2px 2px 10px #1e1e1e;
  border-radius: 50%;
  display: none;
  cursor: none;
  z-index: 100;
}
</style>

