<template>
  <div style="height:100%;width:100%;">
    <div id="windowindex41">
      <div id="windowindex4son1" @click="clickjig(1)" :class="active1">
       <preview-dicom ref="p1" ></preview-dicom>
      </div>
      <div id="windowindex4son2" @click="clickjig(2)" :class="active2">
      <preview-dicom ref="p2" ></preview-dicom>
      </div>
    </div>
     <div id="windowindex4son3" @click="clickjig(3)" :class="active3">
      <preview-dicom ref="p3" ></preview-dicom>
    </div>
     <div id="windowindex4son4" @click="clickjig(4)" :class="active4">
      <preview-dicom ref="p4" ></preview-dicom>
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
        active3:[],
        active4:[],
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
        this.active3=[];
        this.active4=[];
      },
      jigclass1(){
        this.jigclass0()
        this.active1.push('active');
      },
      jigclass2(){
         this.jigclass0()
        this.active2.push('active');
      },
      jigclass3(){
         this.jigclass0()
        this.active3.push('active');
      },
      jigclass4(){
         this.jigclass0()
        this.active4.push('active');
      }
    }
  }
</script>

<style scoped lang="stylus">
  #windowindex41{
    width:100%;
    height:calc(50% - 2px);
    height:-moz-calc(50% - 2px);
    height:-webkit-calc(50% - 2px); 
    height:-o-calc(50% - 2px);
    height:-ms-calc(50% - 2px);
    border-bottom:2px solid white;
  }
  #windowindex4son1{
    width:calc(50% - 2px);
    width:-moz-calc(50% - 2px);
    width:-webkit-calc(50% - 2px); 
    width:-o-calc(50% - 2px);
    width:-ms-calc(50% - 2px);
    height:100%;
    border-right:2px solid white;
    float:left;
  }
  #windowindex4son2{
    width:50%;
    height:100%;
    display:inline-block;
    float:left;
  }
  #windowindex4son3{
    width:calc(50% - 2px);
    width:-moz-calc(50% - 2px);
    width:-webkit-calc(50% - 2px); 
    width:-o-calc(50% - 2px);
    width:-ms-calc(50% - 2px);
    height:50%;
    border-right:2px solid white;
    display:inline-block;
    float:left;
  }
  #windowindex4son4{
    width:50%;
    height:50%;
    display:inline-block;
    float:left;
  }
  .active{
    background-color:#C0C0C0;
  }
</style>
