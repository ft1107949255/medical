<template>
  <div class="list">
    <el-tabs type="border-card">
      <el-tab-pane :label="item.label" v-for="item in tabsList" :key="item.value">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'appointment',
  data () {
    return {
      tabsList: [
        {
          label: '分诊列表',
          value: '1'
        },
        {
          label: '今日预约',
          value: '2'
        },
        {
          label: '预约列表',
          value: '3'
        }
      ]
    }
  },
  mounted () {

  },
  methods: {
    // 获取分诊列表
    getList () {
      // this.$api.
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
