<template>
  <div class="block">
    <span>{{name}}</span>
    <el-select class="el-select" v-model="value4" clearable placeholder="请选择" @change="change">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.code + ',' +item.name">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ["name", "options"],
  data() {
    return {
      value4: '',
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

.el-select {
  width: 61%;
}
</style>
