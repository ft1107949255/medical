<template>
  <div class="aaa">
    <el-input type="textarea" :rows="rows" placeholder="请输入内容" v-model="textarea">
    </el-input>
  </div>
</template>

<script>
export default {
  props: ["data2"],
  data() {
    return {
      textarea: '',
      rows: 10
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';
.aaa{
}
</style>
