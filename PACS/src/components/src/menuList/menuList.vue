<template>
  <div>
    <template v-for="(item, index) in data" >
      <el-submenu v-if="item[options.children]" :index="item[options.value]" class="item" :key="index">
        <template slot="title">
          <img class="icon" :src="menuImgUrl + item.icon_path" v-if="item.icon_path"/>
          <img class="icon-active" :src="menuImgUrl + item[options.iconActive]" v-if="item[options.iconActive]"/>
          <span class="name" slot="title">{{item[options.label]}}</span>
        </template>
        <menu-item :data="item[options.children]" :options="options"></menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item[options.value]" :key="index" @click="changeIndex(item, data)">
        <img class="icon" :src="menuImgUrl + item.icon_path" v-if="item.icon_path"/>
        <img class="icon-active" :src="menuImgUrl + item[options.iconActive]" v-if="item[options.iconActive]"/>
        <span class="name" slot="title">{{item[options.label]}}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {
          icon: 'icon_url',
          iconActive: 'icon_url',
          value: 'id',
          label: 'functionname',
          children: 'children'
        }
      }
    }
  },
  methods: {
    changeIndex (data, parentData) {
      sessionStorage.setItem('currentMenuId', data.id)
      sessionStorage.setItem('currentMenuTitle', data.menu_name)
      this.$router.push({ path: data.menu_url })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .icon, .icon-active {
    display: inline-block
    width: 20px;
    height: 20px;
    margin-right: 8px
    filter: brightness(50%);
  }
  .icon-active {
    display: none;
  }
  .el-menu-item, .item {
    margin: 0 10px;
  }
  .el-menu--collapse .el-menu-item.is-active img, .el-menu--collapse .el-submenu.is-active img, .el-menu--vertical .el-menu-item.is-active img{
    filter: brightness(100%);
  }
  .el-menu--collapse .el-menu-item span, .el-menu--collapse .el-submenu .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  >>> .el-submenu__title, >>> .el-menu-item {
    font-size: $font-size-small-x
    height: 45px
    line-height: 45px
  }
</style>
