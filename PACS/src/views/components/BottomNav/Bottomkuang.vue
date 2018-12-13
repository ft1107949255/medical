<template>
  <div id="bottomkuang">
  <div class="div">
    <span class="span">检查所见</span>
    <div class="spans" v-if="rowData.imageDescribe!=null && rowData.imageDescribe!='undefined'" v-html="rowData.imageDescribe"></div>
    <div class="spans" v-else></div>
  </div>
  <div class="div">
    <span class="span">检查提示</span>
    <div class="spans" v-if="rowData.conclusion!=null && rowData.conclusion!='undefined'" v-html="rowData.conclusion" ></div>
     <div class="spans" v-else></div>
  </div>
  <div class="div">
    <span class="span">备注</span>
    <div class="spans" v-if="rowData.remark!=null  && rowData.remark!='undefined' " v-html="rowData.remark"  ></div>
    <div class="spans" v-else></div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'bottomkuang',
  props:['rowData'],
  data() {
    return {
      msg: "",
      imageDescribe: "",
      conclusion: "",
      remark: "",
    };
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

#bottomkuang{
  width:100%;
  height:240px;
  background-color:$gray
  /*min-width:1400px;*/
}
.div{
  width:32%;
  height:220px;
  border:1px solid $bottomKuangBorder;
  display:inline-block;
  margin:10px 0.3%;
  position: relative
  
}
.span{
  width:100px;
  height:20px;
  text-align:center;
  line-height:20px;
  position: absolute;
  top:-8px;
  left:50%;
  margin-left:-50px;
  background-color:#d4d4d4;
  font-size :10px;

}

.spans{
  width:100%;
  margin-left :0%;
  margin-top:16px;
  height :200px;
  white-space: normal ;
  position: absolute;
  background-color:#d4d4d4;
  font-size :12px;
  overflow : auto ;
}
</style>

