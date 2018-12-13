<template>
  <div style="height:100%;">
    <div id="windowindex2son1" @click="clickjig(1)" :class="active1">
      <preview-dicom ref="p1" ></preview-dicom>
    </div>
    <div id="windowindex2son2"  @click="clickjig(2)" :class="active2">
      <preview-dicom ref="p2" ></preview-dicom>
    </div>
  </div>
</template>

<script>
import previewDicom from 'Components/src/previewDicom';
  export default {
    components:{
      previewDicom
    },
    data() {
      return {
        ip: this.CONSTANT.CONSTANT.WEB_URL,
        windowindex2son1:[],
        active1:[],
        active2:[],
        xclass: ''
      }
    },
    watch: {
      xclass: function(){
        eval('this.'+ this.xclass+'()');
      },
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: {
      clickjig(index){
        this.$emit('clickjig', index);
      },
      jigclass0(){
        this.active2=[];
        this.active1=[];
      },
      jigclass1(){
        this.active2=[];
        this.active1.push('active');
      },
      jigclass2(){
        this.active1=[];
        this.active2.push('active');
      }
    }
  }
</script>

<style scoped lang="stylus">
  #windowindex2son1{
    width:100%;
    height:calc(50% - 2px);
    height:-moz-calc(50% - 2px);
    height:-webkit-calc(50% - 2px); 
    height:-o-calc(50% - 2px);
    height:-ms-calc(50% - 2px);
    border-bottom:2px solid white;
  }
  #windowindex2son2{
    width:100%;
    width:100%;
    height:calc(50%);
    height:-moz-calc(50% );
    height:-webkit-calc(50%); 
    height:-o-calc(50%);
    height:-ms-calc(50%);
  }
  .active{
    background-color:#C0C0C0;
  }
</style>
