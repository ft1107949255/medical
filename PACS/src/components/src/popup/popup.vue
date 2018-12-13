<template>
    <div class="popup-root" v-if="value" :style="{'z-index': zIndex}" >
        <Mask-ui :value="value" ></Mask-ui>
        <div class="popup" ref="myPopup" v-drag :class="{ max: currentSize === 'max', min: currentSize === 'min' }">
            <!-- 顶部 -->
            <div class="popup-top drag-header" @dblclick="handleMax">
                <span class="title">{{ title }}</span>
                <span class="top-button">
                    <i @click="handleMin" class="el-icon-minus"></i>
                    <i @click="handleMax" :class="{ 'el-icon-zoom-in': currentSize !== 'max', 'el-icon-zoom-out': currentSize === 'max' }"></i>
                    <i @click="handleClose" class="el-icon-close"></i>
                </span>
            </div>
            <!-- 主要内容 -->
            <div class="popup-content" :style="{ 'max-height': showButton ? '80vh' : 'calc(100vh - 40px)' }">
                <slot></slot>
            </div>
            <!-- 底部 -->
            <div class="popup-bottom" v-if="showButton">
                <div class="bottom-button">
                    <span class="cancel" @click="handleClose" v-if="cancelButtonValue.isShow">{{cancelButtonValue.title}}</span>
                    <span class="sure" @click="handleSure" v-if="sureButtonValue.isShow">{{sureButtonValue.title}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * 通用弹窗组件
 * @params {string} title 弹窗标题
 * @params {boolean} value 是否显示弹窗
 * @params {string} size 默认打开弹窗大小(可选列表min, normal, max)
 * @params {boolean} showButton 是否显示确定取消按钮
 * @params {object} sureButton 确认菜单对象
 * @params {string}  -- title 确认按钮文字描述（默认确定）
 * @params {boolean} -- isSHow 是否显示确定按钮 （默认显示）
 * @params {object} cancelButton 取消菜单对象
 * @params {string}  -- title 取消按钮文字描述（默认取消）
 * @params {boolean} -- isSHow 是否显示取消按钮 （默认显示）
 * @function handleClose 关闭弹窗回调方法
 * @function handleSure 确定弹窗回调方法
 */
import store from './store'
import MaskUi from 'Components/src/mask'
export default {
  name: 'popup',
  props: {
    title: {
      type: String,
      default() {
        return '标题'
      }
    },
    value: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal'
    },
    showButton: {
      type: Boolean,
      default: true
    },
    sureButton: {
      type: Object,
      default () {
        return {
          title: '确认',
          isShow: true
        }
      }
    },
    cancelButton: {
      type: Object,
      default () {
        return {
          title: '取消',
          isShow: true
        }
      }
    }
  },
  components: {
    MaskUi
  },
  data() {
    return {
      currentSize: ''
    }
  },
  mounted() {
    store.zIndex += 1
    this.currentSize = this.size
  },
  computed: {
    zIndex () {
      return store.zIndex
    },
    sureButtonValue () {
      return Object.assign({
        title: '确认',
        isShow: true
      }, this.sureButton)
    },
    cancelButtonValue () {
      return Object.assign({
        title: '取消',
        isShow: true
      }, this.cancelButton)
    }
  },
  methods: {
    // 最小化
    handleMin() {
      this.currentSize = 'min'
    },
    // 缩放
    handleMax() {
      this.currentSize === 'max'
        ? (this.currentSize = 'normal')
        : (this.currentSize = 'max')
    },
    // 关闭
    handleClose() {
      this.$emit('input', false)
      this.$emit('handleClose')
    },
    // 确定
    handleSure() {
      this.$emit('handleSure')
    }
  },
  watch: {
    currentSize: function() {
      if (this.$refs.myPopup) {
        this.$refs.myPopup.style.left = '50%'
        this.$refs.myPopup.style.top = '50%'
      }
    }
  }
}
</script>
<style lang="stylus">
.popup-root {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
}

.popup-content::-webkit-scrollbar, .popup::-webkit-scrollbar {
    display: none;
}

.popup {
    position: fixed;
    background: #d4d4d4;
    top: 50%;
    left: 50%;
    overflow-y: scroll;
    transform: translate(-50%, -50%);
    // transition all 0.5s
    max-width: 100%;
    max-height: 100%;
    z-index: 100;
    color: #606266 !important
}

.max {
    width: 100%;
    height: 100%;
}

.min {
    height: 40px;
    overflow: hidden;
}

// popup-top -- start
.popup-top {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: #d4d4d4;
    // color: #fff;

    .top-button {
        float: right;

        i {
            cursor: pointer;
        }
    }
}

// popup-top -- end
.popup-content {
    width: 100%;
    overflow: scroll;
    // padding: 10px 0 0 0
}

// bottom-button --start
.bottom-button {
    float: right;
    margin: 20px;

    span {
        display: inline-block;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 3px;
    }

    .sure {
        background-color: #2d96c4;
        color: #fff;
    }

    .cancel {
        background-color: #ddd;
        border: 1px solid #ddd;
        color: #333;
    }
    .cancel:hover {
      background-color: white;
    }
}
</style>
