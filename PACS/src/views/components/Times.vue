<template>
  <div class="block">
    <span>{{name}}</span>
    <el-time-select @change="change"
      class="el-time-select"
      v-model="value1"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30'
      }"
      placeholder="选择时间">
    </el-time-select>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      value1: ''
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

.el-time-select {
  width: 61% !important;
}
</style>
