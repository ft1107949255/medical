<template>
  <div class="tree">
    <el-tree :data="data" :props="defaultProps" :render-content="renderContent" @node-click="showMsg"/>
  </div>
</template>

<script>
export default {
  props: ["data",'defaultProps'],
  data() {
    return {
      ip: this.CONSTANT.CONSTANT.WEB_URL,
    };
  },
  methods: {
    renderContent: function () {
      var createElement = arguments[0];
      var level = arguments[1].node.level;
      if (level == 1) {
        return createElement('span', [
          createElement('img', {attrs: {class:'icon_all',}}),
          createElement('span', arguments[1].node.label)
        ]);
      } else {
        return createElement('span', [
          createElement('img', {attrs: {class:'icon_all',}}),
          createElement('span', arguments[1].node.label)
        ]);
      }
    },
    showMsg: function (data) {
      console.log('当前',data)
      if(data.hasOwnProperty('isParent')){
        // 继续请求下面的节点
        this.$emit('getTreeId',data);
      }else{
        // 已经是叶子节点
        console.log('叶子节点');
        this.$emit('getTreeInfo',data.id)
      }

    }
  },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

.tree{
  width:100%;
}
.icon_all{
  margin-right:4px !important;
}
.el-tree{
  background:none;
}
.el-tree-node__expand-icon.is-leaf{
  color:rotate(90deg) !important;
}
</style>
