<template>
    <div class="mask" v-if="value">
    </div>
</template>
<script>
export default {
  name: 'maskUi',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentSize: ''
    }
  },
  mounted() {
    this.currentSize = this.size
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
  }
}
</script>
<style lang="stylus">
.mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.6);
}
</style>
