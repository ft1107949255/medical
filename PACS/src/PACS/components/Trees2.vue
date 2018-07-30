<template>
  <div class="tree">
    <el-tree :data="data" ref="tree" show-checkbox node-key="id"  :props="defaultselectProps" :render-content="renderContent" @node-click="showMsg" @check="checkMsg">
    </el-tree>
  </div>
</template>

<script>
export default {
  props: ["data",'defaultselectProps'],
  data() {
    return {
      count: 1,
      ip: this.CONSTANT.CONSTANT.WEB_URL
    };
  },
  methods: {
    renderContent: function () {
      var createElement = arguments[0];
      var level = arguments[1].node.level;
      if (level == 1) {
        return createElement('span', [
          createElement('img',),
          // createElement('span', "     "),
          createElement('span', arguments[1].node.label)
        ]);
      } else {
        return createElement('span', [
          createElement('img',),
          // createElement('span', "     "),
          createElement('span', arguments[1].node.label)
        ]);
      }
  },
    showMsg: function (data) {
      console.log('当前',data)
      if(data.hasOwnProperty('isParent')){
        // 继续请求下面的节点
        this.$emit('getselectTreeId',data);
      }else{
        // 已经是叶子节点
        console.log('叶子节点');
      }
    },
    checkMsg: function (data) {
      console.log('点击选择框');
      if(data.hasOwnProperty('isParent')){
        // 继续请求下面的节点
        this.$emit('getselectTreeId',data);
      }else{
        // 已经是叶子节点
        console.log('叶子节点');
        if(this.$refs.tree.getCheckedKeys().length > 1){
          this.$emit('getselectTreeInfo',data)
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';
.tree{
  width:100%;
}
</style>
