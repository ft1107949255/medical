<template>
  <div class="theme-list">
    <ul v-drag>
      <li class="theme" :class="{'active': isActive === item.themeClass}" v-for="(item, index) in themeList" :key="index" @click="handleChangeTheme(item)">
        <i class="theme-color" :style="{background: item.themeColor}"></i>
        <span class="theme-title">{{item.themeTitle}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
let themeList = require('../config')
export default {
  name: 'theme',
  data () {
    return {
      themeList,
      // body 样式
      bodyClass: '',
      isActive: localStorage.getItem('themeClass') ? localStorage.getItem('themeClass') : 'default'
    }
  },
  methods: {
    // 切换主题色
    handleChangeTheme (item) {
      // this.bodyClass = document.documentElement.className.indexOf('theme') === -1 ? document.body.className : this.bodyClass
      document.documentElement.className = `theme-${item.themeClass}`
      localStorage.setItem('themeClass', item.themeClass)
      this.isActive = item.themeClass
    }
  }
}
</script>
<style scoped>
.theme {
  display: flex;
  align-items: center;
  height: 20px;
  padding: 10px;
  cursor: pointer;
  width: 100px;
  background: #fff;
  border-bottom: none;
  z-index: 100;
}
.theme-color {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
