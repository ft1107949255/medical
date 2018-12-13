<template>
  <div class="tree">
    <el-tree :data="data" show-checkbox node-key="id"  :props="defaultProps" :render-content="renderContent">
    </el-tree>
  </div>
</template>

<script>
export default {
  props: ["data",'defaultProps'],
  data() {
    return {
      count: 1,
      // ip: this.CONSTANT.CONSTANT.WEB_URL
    };
  },
  methods: {
    renderContent: function () {
      var createElement = arguments[0];
      var level = arguments[1].node.level;
      if (level == 1) {
        return createElement('span', [
          createElement('img', {attrs: {src: this.ip + '/images/icon/tree_f.png'}}),
          createElement('span', arguments[1].node.label)
        ]);
      } else {
        return createElement('span', [
          createElement('img', {attrs: {src: this.ip + '/images/icon/tree_s.png'}}),
          createElement('span', arguments[1].node.label)
        ]);
      }
  }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

.tree{
  width:100%;
}
</style>
