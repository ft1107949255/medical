<template>
  <div class="block">
    <span>{{name}}</span>
    <el-input @change="change"
    class="el-input"
      placeholder="请输入内容"
      v-model="value4"
      clearable>
    </el-input>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      value4: ''
    };
  },
  methods: {
    change(value) {
      this.$emit('change', value);
    },
    clear() {
      this.value4 = '';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

.block {
  width: 100%;
}

span {
  display: inline-block;
  width: 58px;
  font-size: 12px;
  margin-right: 2%;
  color: $black3;
  text-align :right;
}

.el-input {
  width: 61%;
  background-color: $gray;
}

.el-input input.el-input__inner {
  width: 10px;
  border: 1px solid;
  background-color: $gray;
}
</style>
