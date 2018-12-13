<template>
  <div class="main">
    <!-- Main background image -->
    <!-- <img src="../../static/images/login/bg-img.png" alt="" class="login-bg"/> -->
    <div class="main-container">
      <router-view />
    </div>
    <div class="main-footer">
      <foot-nav />
    </div>
  </div>
</template>

<script>
import footNav from "./FooterNav.vue";
export default {
  components: {
    footNav
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    
  }
};
</script>


<style lang='stylus' rel='stylesheet/stylus' scoped>

.main {
  width: 100%;
  height: 100vh;
}
.main-container {
  height: calc(100% - 60px);
  overflow: hidden;
}

.main-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 60px;
  background-color: $bgGray;
}
</style>
