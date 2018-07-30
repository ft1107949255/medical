<template>
  <div class="editBtns">
    <el-button class="el-button" :key="index" v-for="(item,index) in data" type="primary" icon="">{{item.text}}</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      data: [
        {
          text: "保存"
        },
        {
          text: "驳回"
        },
        {
          text: "发送"
        },
        {
          text: "取消发送"
        },
        {
          text: "诊断记录"
        },
        {
          text: "报告备注"
        },
        {
          text: "查看影像"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
@import '../../common/styleus/index.styl';

.editBtns {
  width: 100%;

  .el-button {
    font-size: 12px;
  }
}
</style>