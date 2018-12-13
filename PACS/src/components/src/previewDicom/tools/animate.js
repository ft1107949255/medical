/**
 * animate
*/
import {cornerstone, cornerstoneTools} from '../initCornerstoneTools'
const mixin = {
  data() {
    return {
      // 当前图片索引
      currentIndex: 0,
      // 当前播放速度
      playSpeed: 60,
      // 当前播放还是暂停
      playType: '',
      // 循环体
      loop: null
    }
  },
  watch: {
    currentIndex () {
      this.selectImage()
    }
  },
  methods: {
    // next
    next() {
      if (this.currentIndex === this.imageId.length - 1) {
        this.currentIndex = -1
      }
      this.currentIndex++
    },
    // prev
    prev () {
      if (this.currentIndex === 0) {
        this.currentIndex = this.imageId.length
      }
      this.currentIndex--
    },
    /**
     * 设置播放速度
    */
    setPlaySpeed (speed) {
      this.playSpeed = speed
      if (this.playType === 'play') {
        this.playClip('pause')
        this.playClip('play')
      }
    },
    /**
     * 控制图片动画
     * @params {string} type （play：开始动画，pause：结束动画）
    */
    playClip (type) {
      this.playType = type
      if (type === 'play' && !this.loop) {
        this.loop = setInterval(() => {
          this.currentIndex++
          if (this.currentIndex === this.imageId.length) {
            this.currentIndex = 0
          }
        }, 1000/this.playSpeed)
      }
      if (type === 'pause') {
        clearInterval(this.loop)
        this.loop = null
      }
    },
    // Change image
    selectImage(index) {
      var targetElement = this.$refs.dicomImage

      // Get the range input value
      var newImageIdIndex = index || this.currentIndex

      // Get the stack data
      var stackToolDataSource = cornerstoneTools.getToolState(targetElement, 'stack')
      if (stackToolDataSource === undefined) {
        return
      }
      var stackData = stackToolDataSource.data[0]

      // Switch images, if necessary
      if (newImageIdIndex !== stackData.currentImageIdIndex && stackData.imageIds[newImageIdIndex] !== undefined) {
        cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]).then(function(image) {
          var viewport = cornerstone.getViewport(targetElement)
          stackData.currentImageIdIndex = newImageIdIndex
          cornerstone.displayImage(targetElement, image, viewport)
        })
      }
    },
  }
}

export default mixin