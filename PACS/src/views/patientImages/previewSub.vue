<template>
    <!-- preview-sub -->
    <div class="preview-sub" ref="previewSub" :style="styles">
      <div class="sub" ref="sub" v-for="item in imageList" :key="item.imageId">
        <preview-dicom
          :imageId="item.imageId"
          :id="item.id"
          :hasOperate="true"
          customContextMenu
          :currentImageIdIndex="item.index + 1"
          :imagesLength="imageId.length"
          :isShowInfo="true"
          ></preview-dicom>
      </div>
    </div>
</template>

<script>
import previewDicom from 'Components/src/previewDicom'
export default {
  name: 'previewSub',
  components: {
    previewDicom
  },
  props: {
    // 当前模式
    imageId: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      styles: {},
      page: 0,
      pageSize: 0,
      localList: []
    }
  },
  mounted () {
    this.initWheelEvent()
  },
  computed: {
    imageList () {
      let currentImages = this.imageId
        .map((item, index) => Object.assign({index: index}, item))
        .filter((item, index) => this.page * this.pageSize <= index && index < (this.page + 1) * this.pageSize)
      return currentImages.length ? currentImages : this.localList
    }
  },
  methods: {
    // 设置当前布局模式
    setLayout (mode) {
      this.styles = this.standardMode(mode)
    },
    // Standard mode
    standardMode (layoutArr) {
      if (layoutArr.length > 2) {
        console.error('layout: There are only 2 values in standard mode')
      }
      this.$nextTick(() => {
        this.$refs.sub && this.$refs.sub.forEach(item => {
          item.$el.style.gridRow = ''
        })
      })
      let [x, y] = layoutArr
      let styles = {}
      this.pageSize = +x * +y
      this.localList = new Array(this.pageSize).fill({})
      console.log(this.localList)
      styles.gridTemplate = `repeat(${+x}, 1fr) / repeat(${+y}, 1fr)`
      return styles
    },
    // 初始化局部滚轮事件监听
    initWheelEvent () {
      this.$refs.previewSub.addEventListener('mousewheel', e => {
        if (!this.imageId.length) {
          return
        }
        let maxPageSize = Math.ceil(this.imageId.length / this.pageSize)
        // 向上滚动
        if (e.wheelDelta < 0) {
          if (this.page === 0) {
            this.page = maxPageSize
          }
          this.page--
        }
        // 向下滚动
        if (e.wheelDelta > 0) {
          this.page++
          if (this.page === maxPageSize) {
            this.page = 0
          }
        }
        console.log(this.page)
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
.preview-sub {
  display: grid;
  width: 100%;
  height: 100%;
}
.sub {
  border: 1px solid #ddd;
  overflow hidden;
}
</style>
