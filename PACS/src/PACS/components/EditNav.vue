<template>
  <div class="centent_Edit">
    <div class="leftbutton">
      <el-button type="text" class="el-button" icon="el-icon-arrow-left" @click="exitClick" size="small" ></el-button>
    </div>  
  </div>
</template>
 
<script>
 
export default {
  data() { 
    return {
      msg: "",
     
    };
  },
  methods: {
    
     exitClick(){
         this.$router.go(-1)
     },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

.centent_Edit {
  width: 100%;
  height :100%;
  background-color:#D4D4D4;;
}

.leftbutton{
  padding: 0 20px;
  height :40px;
}

.el-button{
  margin-top :5px;
}

</style>
