<template>
  <div style="height:100%;">
    <div id="windowindex3son1" @click="clickjig(1)" :class="active1">
      <preview-dicom ref="p1" ></preview-dicom>
    </div>
    <div id="windowindex3son2" @click="clickjig(2)" :class="active2">
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
  #windowindex3son1{
    width:calc(50% - 2px);
    width:-moz-calc(50% - 2px);
    width:-webkit-calc(50% - 2px); 
    width:-o-calc(50% - 2px);
    width:-ms-calc(50% - 2px);
    height:100%;
    border-right:2px solid white;
    float:left;
  }
  #windowindex3son2{
    width:50%;
    height:100%;
    display:inline-block;
  }
  .active{
    background-color:#C0C0C0;
  }
</style>
