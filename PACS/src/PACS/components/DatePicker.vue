<template>
   <div class="block">
     <span>{{name}}</span>
    <el-date-picker @change="change"
    class="el-date-picker"
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      msg: "",
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      value1: ""
    };
  },
  methods: {
    change(value) {
      this.value1 = value;
      this.$emit('change', value);
    },
    clear() {
      this.value1 = '';
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
  text-align: right;
  font-size: 12px;
  margin-right: 2%;
  color: $black3;
  text-align :right;
}

.el-date-picker {
  width: 61%;
}
</style>
