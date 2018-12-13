<template>
  <div class="edit-dicom">
    <div class="left-module">
      <!-- Dicom list -->
      <div class="dicom-list" >
        <bottom-footer :serialNumber="serialNumber"></bottom-footer>
        <!-- <print-list v-else></print-list> -->
      </div>
      <!-- Edit-group -->
      <div class="edit-group">
          <top-header @changeMode="changeMode" @changeLayout="changeLayout"></top-header>
      </div>

      <!-- menu params -->
      <menu-params
        ref="menuParams"
        @getPrintParam="(val) => printParams = val"
        @previewPrint="imagePrint"
        :currentMode="currentMode"
        :currentImage="currentImage"></menu-params>
    </div>

    <!-- Dicom content -->
    <div class="dicom-content">
      <!-- Dicom preview -->
      <div :style="printStyle" class="print-window" ref='dicomContent'>
        <div class="dicom-preview" :style="containerStyle">
          <div class="preview"
            ref="preview"
            v-for="(item, index) in currentDicomQueue"
            @click="handleImageSelect(item, index, $event)"
            @drop="currentDrop"
            @dragover="currentDropOver"
            :data-id="index"
            :patient="item.patient"
            :angleParams="angleParams"
            :class="{isActive: currentIndex === index}" :key="index" >
            <preview-dicom
              ref="previewDicom"
              v-if="!item.isSub"
              hasOperate
              :imageId="item.list"
              customContextMenu
              :patient="item.patient"
              :angleParams="angleParams"
              :currentIndex="(item && item.currentIndex) || 0"
              @selectImage="selectImage"></preview-dicom>
            <preview-sub
              v-else
              ref="previewDicom"
              customContextMenu
              hasOperate
              :imageId="item.list"></preview-sub>
              <!-- {{index}} -->
            <!-- <div class="subGrid" v-for="(sub, index) in item.list" :key="index" v-if="item.list.length">
              <preview-dicom
              ref="previewDicom"
              :data-id="index"
              :hasOperate="true"
              :imageId="sub.imageId"
              :playSpeed="10"
              @drop.native="currentDrop"
              @dragover.native="currentDropOver"
              :currentIndex="index + 1"
              @selectImage="selectImage"></preview-dicom>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 页面配置参数 -->
    <page-params></page-params>

    <!-- 打印图片预览 -->
    <popup v-model="showPrint" title="预览打印" class="preview-print" :sureButton="{ title: '打印' }" @handleSure="printSubmit">
      <div class="print-list">
        <img :src="printImage" alt="">
      </div>
    </popup>
  </div>
</template>

<script>
import topHeader from './header'
import bottomFooter from './footer'
import previewDicom from 'Components/src/previewDicom'
import popup from 'Components/src/popup'
import menuParams from './menuParams'
import pageParams from './pageParams'
import previewSub from './previewSub'
import html2canvas from 'html2canvas'
import {isArray, isObject} from 'lodash'
import {staticPath, cloudPath} from 'Config/website'
import {mapState} from 'vuex'
export default {
  name: 'editDicom',
  components: {
    topHeader,
    bottomFooter,
    previewDicom,
    menuParams,
    previewSub,
    pageParams,
    popup
  },
  data () {
    return {
      currentItem: {
        instanceList: [{}]
      },
      // Current Mode
      currentMode: {},
      // Current imageId
      currentIndex: 0,
      // 所有序列号列表
      serialNumber: [],
      // Image info
      imageInfo: {},
      // Patient info
      patientInfo: {
        patientId: '',
        patientName: ''
      },
      // Current layout mode, example: row\2,3 col\1,3 standard\3,4
      currentLayoutMode: 'standard\\1,1',
      // Current DICOM queue
      currentDicomQueue: [],
      // Current container style
      containerStyle: {},
      // 当前选中图片dom对象
      currentImage: {},
      // 打印图片预览
      printImage: '',
      // 是否显示预览模块
      showPrint: false,
      // 打印设置参数
      printParams: {},
      // 打印页面样式
      printStyle: {}
    }
  },
  mounted () {
    this.getData()
    // 初始化图片队列
    this.initCurrentDicomQueue()
  },
  computed: {
    ...mapState('patientImage', [
      'angleParams'
    ]),
    currentImageId () {
      return this.currentItem.instanceList // || './static/testDICOM/shidisanrenminyiyuan/0004674/1.5191KB.DCM'
    },
    // DICOM window height
    WindowHeight () {
      return document.documentElement.clientHeight - 50
    }
  },
  watch: {
    printParams: {
      handler () {
        if (this.printParams.open) {
          let [width, height] = this.printParams.size.split('X')
          // 英寸
          if (width.indexOf('IN') > -1) {
            width = +width.replace('IN', '') * 2.54 * 25
            height = +height.replace('IN', '') * 2.54 * 25
          } else if (width.indexOf('CM') > -1) {
            width = +width.replace('CM', '') * 25
            height = +height.replace('CM', '') * 25
          }

          // 胶片方向
          if (this.printParams.direction === 'LANDSCAPE') {
            // 水平
            [width, height] = [height, width]
          } else {
            // 垂直
          }

          this.printStyle = {
            width: `${width}px`,
            height: `${height}px`
          }
        } else {
          this.printStyle = {
            width: '100%',
            height: '100%'
          }
        }
        this.initCurrentDicomQueue()
      },
      deep: true
    },
    'printParams.open' () {
      this.currentLayoutName = ''
      this.getData()
    },
    currentIndex () {
      // 获取当前图片对象组
      let imageList = this.$refs.preview
      if (!imageList) {
        return
      }
      // 获取当前选中对象
      let current = this.currentIndex !== undefined ? imageList[this.currentIndex].childNodes[0].__vue__ : {}
      // 有序列布局则取到所有子集
      if (current.$children && current.$children.length > 1) {
        this.currentImage = current.$children
      } else {
        // 否则取本身
        this.currentImage = current
      }
    }
  },
  methods: {
    // currentDrop
    currentDrop (e) {
      // e.preventDefault()
      console.log(e.dataTransfer)
      let data = JSON.parse(e.dataTransfer.getData('data'))
      let currentDOM = e.target
      let currentId = ''
      while (!currentId) {
        if (currentDOM.dataset.id) {
          currentId = currentDOM.dataset.id
          break;
        } else {
          if (currentDOM.parentNode) {
            currentDOM = currentDOM.parentNode
          } else {
            break;
          }
        }
      }
      this.currentDicomQueue[+currentId].list = data.instanceList
      let patient = {
        patientName: data.patientName
      }
      this.currentDicomQueue[+currentId].patient = patient
    },
    // currentDropOver
    currentDropOver (e) {
      e.preventDefault()
    },
    // changeLayout
    changeLayout (item) {
      this.currentLayoutMode = item.mode
      this.currentLayoutName = item.name
      this.ChangeCurrentLayoutMode()
    },
    // Change current layout mode
    ChangeCurrentLayoutMode () {
      let [mode, layout] = this.currentLayoutMode.split('\\')
      let layoutArr = layout.split(',')
      // 自定义布局
      if (this.currentLayoutName === 'custom') {
        if (!this.currentImage || !this.currentImage.$el) {
          this.$message.error('该模式只支持排布序列图哦！！')
        } else {
          this.currentItem.isSub = true
          this.$nextTick(() => {
            // 获取当前选中的previewSub组件对象
            this.currentImage = this.$refs.preview[this.currentIndex].childNodes[0].__vue__
            // 设置子集布局
            this.currentImage.setLayout(layoutArr)
            // 当前操作对象为子集对象数组（同步子集相关操作）当前操作对象为子集对象数组（同步子集相关操作）
            this.currentImage = this.currentImage.$children
          })
        }
        return
      }
      // 初始化图片队列
      this.initCurrentDicomQueue()
      let styles = {}
      switch (mode) {
        case 'row': styles = this.rowsMode(layoutArr); break
        case 'col': styles = this.columnsMode(layoutArr); break
        case 'standard': styles = this.standardMode(layoutArr); break
      }
      this.containerStyle = styles
      // this.$refs.preview.forEach(item => {
      //   // item.querySelector('.dicom-image').innerHTML = ''
      //   let element = item.querySelector('.dicom-image')
        
      //   // current.__vue__.updateImage(current)
      // })
      this.currentImage = this.$refs.previewDicom
      this.currentImage.length && this.batchDicom('resize')
    },
    // Rows mode
    rowsMode (layoutArr) {
      let styles = {}
      let layoutNumber = layoutArr.reduce((prev, next) => +prev + +next)
      this.initCurrentDicomQueue(layoutNumber)
      let rows = Math.max.apply(null, layoutArr)
      let columns = layoutArr.length
      styles.gridTemplate = `repeat(${rows}, 1fr) / repeat(${columns}, 1fr)`
      this.$nextTick(() => {
        this.$refs.preview && this.$refs.preview.forEach(item => {
          item.style.gridRow = ''
        })
        let currentMin = Math.min.apply(null, layoutArr)
        let currentMax = Math.max.apply(null, layoutArr)
        let index = layoutArr.indexOf(`${currentMin}`)
        let minIndex = layoutArr.filter((item, layoutIndex) => layoutIndex < index).reduce((prev, next) => +prev + +next)
        this.$refs.preview[minIndex].style.gridColumn = `${currentMin}/${currentMax + 1}`
      })
      return styles
    },
    // Columns mode
    columnsMode (layoutArr) {
      let styles = {}
      let layoutNumber = layoutArr.reduce((prev, next) => +prev + +next)
      this.initCurrentDicomQueue(layoutNumber)
      let rows = Math.max.apply(null, layoutArr)
      let columns = layoutArr.length
      styles.gridTemplate = `repeat(${rows}, 1fr) / repeat(${columns}, 1fr)`
      // styles.gridTemplate = `${rowsArr.fill('1fr ').join('')} / ${columnsArr.fill('1fr ').join('')}`
      this.$nextTick(() => {
        this.$refs.preview && this.$refs.preview.forEach(item => {
          item.style.gridColumn = ''
        })
        let currentMin = Math.min.apply(null, layoutArr)
        let currentMax = Math.max.apply(null, layoutArr)
        let index = layoutArr.indexOf(`${currentMin}`)
        let minIndex = layoutArr.filter((item, layoutIndex) => layoutIndex <= index).reduce((prev, next) => +prev + +next)
        this.$refs.preview[index].style.gridRow = `${minIndex}/${+currentMax + 1}`
      })
      return styles
    },
    // Standard mode
    standardMode (layoutArr) {
      if (layoutArr.length > 2) {
        console.error('layout: There are only 2 values in standard mode')
      }
      this.$nextTick(() => {
        // 重置grid row和column参数
        this.$refs.preview && this.$refs.preview.forEach(item => {
          item.style.gridRow = ''
          item.style.gridColumn = ''
        })
      })
      let [x, y] = layoutArr
      let styles = {}
      this.initCurrentDicomQueue(+x * +y)
      styles.gridTemplate = `repeat(${+x}, 1fr) / repeat(${+y}, 1fr)`
      // styles.gridTemplateColumns = 
      return styles
    },
    /**
     * 初始化图片数组
     * @params {number} length 数组长度
    */
    initCurrentDicomQueue (length = 1) {
      this.currentDicomQueue = []
      for (let i = 0; i < length; i++) {
        this.currentDicomQueue.push({isSub: false, list: []})
      }
    },
    // Change mode
    changeMode (item) {
      // 处理用户未选中操作项时验证
      if (!this.currentIndex && this.currentIndex !== 0) {
        let index = this.currentDicomQueue.findIndex(item => Boolean(item))
        if (index === -1) {
          this.$message.error('您的可视区域还没有可以操作的图片哦！请拖动图片到可视区在操作哦')
          return
        } else if (this.currentDicomQueue.length === 1) {
          this.currentIndex = 0
        } else {
          this.currentIndex = index
          this.$message.warning(`您当前未选中需要操作的具体图片，默认将选中可视的第1张哦！`)
        }
      }
      // 延迟绑定
      this.$nextTick(() => {
        let currentImage = this.currentImage
        this.currentMode = item
        let mode = item.mode
        this.batchDicom('disabledAllTools');
        switch (mode) {
          // 动画操作
          case 'next':
            currentImage.next()
            break
          case 'prev':
            currentImage.prev()
            break
          case 'play':
          // case 'pause':
            // currentImage.playClip(mode);
            break;
          // 其他
          case 'invert':
            this.batchDicom('setInvert');
            break;
          case 'save':
            currentImage.saveToImage();
            break;
          case 'Lrotate':
            this.batchDicom('setRotate', 'left');
            break;
          case 'Rrotate':
            this.batchDicom('setRotate', 'right');
            break;
          case 'flipVertical':
            this.batchDicom('setFlip', 'v');
            break;
          case 'flipHorizontal':
            this.batchDicom('setFlip', 'h');
            break;
          case 'enlarge':
            this.batchDicom('Magnify')
            // currentImage.Magnify();
            break;
          case 'eraser':
            this.batchDicom('clearAll')
            // currentImage.clearAll();
            break;
          case 'remark':
            this.batchDicom('arrowAnnotate')
            // currentImage.arrowAnnotate();
            break;
          // 打印
          case 'print':
            // this.imagePrint();
            break;
          case 'lengthHeart':
            // this.imagePrint();
            break;
          default:
            this.batchDicom('activeTool', mode)
            // currentImage.activeTool(mode)
        }
      })
    },
    // Serial number change
    handleImageSelect (item, index) {
      this.currentItem = item
      this.currentIndex = index
      this.currentDom = this.$refs.previewDicom[index]
      // this.getImageInfo()
    },
    // Change image
    selectImage (val) {
      this.currentItem.currentIndex = val
    },
    // 预览
    imagePrint () {
      // 添加预览提示
      let load = this.$loading('预览文件生成中。。请稍后')
      var shareContent = this.$refs.dicomContent;//需要截图的包裹的（原生的）DOM 对象
      let imageList = shareContent.querySelectorAll('.preview')
      let preview = shareContent.querySelector('.dicom-preview')
      // 生成预览图片时移除边框样式
      imageList.forEach(item => {
        item.style.border = 'none'
      })
      preview.style.borderTop = 'none'
      preview.style.borderBottom = 'none'

      var width = shareContent.offsetWidth; //获取dom 宽度
      var height = shareContent.offsetHeight; //获取dom 高度
      var canvas = document.createElement("canvas"); //创建一个canvas节点
      var scale = 3; //定义任意放大倍数 支持小数
      canvas.width = width * scale; //定义canvas 宽度 * 缩放
      canvas.height = height * scale; //定义canvas高度 *缩放
      canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 
      var opts = {
          scale: scale, // 添加的scale 参数
          canvas: canvas, //自定义 canvas
          // logging: true, //日志开关，便于查看html2canvas的内部执行流程
          width: width, //dom 原始宽度
          height: height
      }; 
      html2canvas(shareContent, opts).then(canvas => {
        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        let image = canvas.toDataURL("image/png")
        this.printImage = image
        // 还原边线样式
        imageList.forEach(item => {
          item.style.border = '1px solid #ccc'
        })
        preview.style.borderTop = '2px solid #999'
        preview.style.borderBottom = '2px solid #999'
        // 终止预览提示
        load.close()
        this.showPrint = true        
      })
    },
    // 提交打印
    printSubmit () {
      this.$confirm('您确认打印该预览？').then(res => {
        let blob = this.dataURLtoFile(this.printImage, 'test.png')
        let formData = new FormData()
        console.log(blob)
        formData.append('file', blob)
        formData.append('orienation', this.printParams.direction)
        formData.append('cameraId', this.printParams.device)
        formData.append('filmsize', this.printParams.size)
        // let sendData = {
        //   filmimage: this.printImage.replace(/^(data:image\/png;base64,)/g, ''),
        //   orienation: this.printParams.direction,
        //   cameraId: this.printParams.device,
        //   filmsize: this.printParams.size
        // }
        this.$api.sendPrint(formData, {isFormData: true}).then(res => {
          this.showPrint = false
          this.$message(res.message)
        })
      })
    },
    dataURLtoFile (dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    },
    /**
     * 处理dicom文件操作
     * @param {string} methodsName 处理方法名称
    */
    batchDicom () {
      let [methodsName, ...args] = arguments
      // 如果是数组则批量执行
      if (isArray(this.currentImage)) {
        this.currentImage.forEach(item => {
          item[methodsName](...args)
        })
      } else if (isObject(this.currentImage)) {
        this.currentImage[methodsName](...args)
      }
    },
    // Get Data
    getData () {
      let methodsName
      let data = {}
      if (this.$route.query.studyinsta) {
        methodsName = 'getStudyPatientImage'
        data = {studyinsta: this.$route.query.studyinsta}
      } else {
        methodsName = this.$route.query.cloud ? 'getCloudPatientImage' : 'getPatientImage'
        data = {id: this.$route.query.patientId}
      }
      // 打印模式
      if (this.printParams.open) {
        methodsName = 'getPrintImage'
        data = {patientId: this.$route.query.patientId}
      }
      this.$api[methodsName](data).then(res => {
        // this.patientInfo.patientId = res.data.patientId
        // this.patientInfo.patientName = res.data.patientName
        this.serialNumber = []
        res.data.map(item => {
          let newItem = {}
          let list = []
          list.push(...item.seriesList)
          delete item.seriesList
          list.forEach(listKey => {
            this.serialNumber.push(Object.assign({}, listKey, item))
          })
        })
        this.serialNumber.forEach(item => {
          this.$set(item, 'currentIndex', 0)
          item.instanceList.forEach(id => {
            // id.imageId = id.imageId.replace('../static/', '/static/')
            // id.imageId = `/static/${id.imageId}`
            id.imageId = `${this.$route.query.cloud ? cloudPath : staticPath}${id.imageId}`
            // console.log(id.imageId)
          })
        })
        // Default select first
        this.handleImageSelect(this.serialNumber[0])
        this.ChangeCurrentLayoutMode()
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
.edit-dicom {
  display: flex;
  background: #444;
}
.dicom-preview, .dicom-list {
  background: #000;
}
.edit-group {
  width: 100%;
  height: auto;
  overflow: hidden;
  background: #333;
  color: #fff;
  margin-top: 20px;
}
.dicom-content {
  flex: auto;
  overflow: scroll;
}
.dicom-preview {
  height: 100%;
  overflow: hidden;
  border-top: 2px solid #999;
  border-bottom: 2px solid #999;
  box-sizing: border-box;
  position: relative;
  display: grid;
  grid-template-areas: none;
}
.preview {
  overflow: hidden;
  border: 1px solid #ccc;
  box-sizing: border-box;
  &:hover {
    border: 1px sliod #999;
  }
}
// .preview + .preview {
//   border-left: 1px dashed #ccc;
//   border-top: 1px dashed #ccc;
// }
.isActive {
  border: 2px solid #169bb9;
}
.dicom-list {
  width: 100%;
  height: 50vh;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #333;
  box-shadow: 0 0 5px #000 inset;
}
::-webkit-scrollbar {
  display: none;
}
.left-module {
  width: 300px;
  flex: none;
  height: 100vh;
  padding: 10px;
  background: #666;
  box-sizing: border-box;
}
.print-list {
  max-width: 80vw;
  max-height: 80vh;
  overflow: scroll;
  img {
    width: 100%;
  }
}
.print-window {
  width: 100%;
  height: 100%;
}
</style>
