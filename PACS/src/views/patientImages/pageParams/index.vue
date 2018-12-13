<template>
    <!-- page-params -->
    <div class="basic-config">
      <ul>
        <li v-for="item in pageParams" :key="item.value" @click="currentValue === item.value ? currentValue = '' : currentValue = item.value">{{item.label}}</li>
      </ul>
      <!-- 可配置模块 -->
      <div class="config-module">
        <!-- 配置页面参数 -->
        <four-angles v-show="currentValue === 'page'" v-model="currentValue"></four-angles>
      </div>
      
    </div>
</template>

<script>
import {isArray, isObject} from 'lodash'
import fourAngles from './fourAngles'
export default {
  name: 'pageParams',
  props: {
  },
  components: {
    fourAngles
  },
  data () {
    return {
      pageParams: [
        {
          value: 'page',
          label: '页面四角参数配置'
        }
        // {
        //   value: 'print',
        //   label: '打印页面参数配置'
        // }
      ],
      currentValue: '',
      isShow: true
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped lang='stylus'>
.basic-config {
  width: 30px;
  flex: none;
  height: 100vh;
  color: #fff;
  background: #333;
  position: relative;
  > ul {
    li {
      // writing-mode vertical-rl
      padding: 5px 0;
      width: 80%;
      margin: 0 auto;
      text-align: center;
      line-height: 1.2;
      font-size: 14px;
      cursor pointer
    }
    li + li {
      border-top: 1px solid #999;
    }
  }
}
.config-module {
  position: absolute;
  top: 0;
  right: 30px;
  z-index: 100;
  background: #666;
}
</style>
