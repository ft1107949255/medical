<template>
  <div class="context-menu" ref="contextMenu">
    <div class="menu-list" v-if="isShow">
      <ul>
        <li class="menu" v-for="item in menuList" :key="item.methods" @click="menuClick(item)">{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
// 自定义右键菜单组件
export default {
  name: 'contextMenu',
  props: {
    imageId: {
      type: String
    }
  },
  data () {
    return {
      isShow: false,
      menuList: [
        {
          title: '发送到预打印列表',
          methods: 'sendPrintList'
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    /**
     * 初始化右键事件，禁用浏览器默认，自定义监听
    */
    init () {
      let currentDocument = this.$parent.$el
      currentDocument.oncontextmenu = function (e) {
        let {offsetX, offsetY} = e
        this.isShow = true
        this.$refs.contextMenu.style.left = `${offsetX}px`
        this.$refs.contextMenu.style.top = `${offsetY}px`
        return false;
      }.bind(this)
      // 左键点击取消菜单
      document.addEventListener('click', e => {
        this.isShow = false
      }, false)
    },
    /**
     * 菜单点击事件
    */
    menuClick (item) {
      this[item.methods]()
    },
    /**
     * 发送到打印预览列表
    */
    sendPrintList () {
      if (!this.imageId) {
        this.$message.error('没有选中的图片')
        return
      }
      this.isShow = false
      this.$api.addPrintImage({patientId: this.$route.query.patientId, imageId: this.imageId}).then(res => {
        this.$message(res.message)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.context-menu {
  background: #fff;
  position: absolute;
  border-radius: 5px;
  .menu-list {
    padding: 10px;
  }
  .menu {
    height: 30px;
    line-height: 30px;
    color: #333;
    cursor pointer
  }
  .menu + .menu {
    border-top: 1px solid #ddd;
  }
}
</style>
