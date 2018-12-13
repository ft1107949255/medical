<template>
  <div >
    <div id="windowindex41">
      <div id="windowindex4son1"  @click="showSon(1)">
        <preview-dicom ref="p1" v-show="pshow[0]"></preview-dicom>
        <jigsawindex2 ref="jig1_2"  v-show="showjigsawindex[0][0]"  @clickjig="clickjig1_2"/>
        <jigsawindex3 ref="jig1_3"  v-show="showjigsawindex[0][1]" @clickjig="clickjig1_3"/>
        <jigsawindex4 ref="jig1_4"  v-show="showjigsawindex[0][2]" @clickjig="clickjig1_4" />
      </div>
      <div id="windowindex4son2"  @click="showSon(2)">
        <preview-dicom ref="p1" v-show="pshow[1]"></preview-dicom>
        <jigsawindex2 ref="jig2_2"  v-show="showjigsawindex[1][0]" @clickjig="clickjig2_2"/>
        <jigsawindex3 ref="jig2_3"  v-show="showjigsawindex[1][1]" @clickjig="clickjig2_3"/>
        <jigsawindex4 ref="jig2_4"  v-show="showjigsawindex[1][2]" @clickjig="clickjig2_4"/>
      </div>
    </div>
     <div id="windowindex4son3"  @click="showSon(3)">
       <preview-dicom ref="p1" v-show="pshow[2]"></preview-dicom>
        <jigsawindex2 ref="jig3_2"  v-show="showjigsawindex[2][0]" @clickjig="clickjig3_2"/>
        <jigsawindex3 ref="jig3_3"  v-show="showjigsawindex[2][1]" @clickjig="clickjig3_3"/>
        <jigsawindex4 ref="jig3_4"  v-show="showjigsawindex[2][2]" @clickjig="clickjig3_4" />
    </div>
     <div id="windowindex4son4"  @click="showSon(4)">
       <preview-dicom ref="p1" v-show="pshow[3]"></preview-dicom>
        <jigsawindex2 ref="jig4_2"  v-show="showjigsawindex[3][0]" @clickjig="clickjig4_2"/>
        <jigsawindex3 ref="jig4_3"  v-show="showjigsawindex[3][1]"  @clickjig="clickjig4_3"/>
        <jigsawindex4 ref="jig4_4"  v-show="showjigsawindex[3][2]"  @clickjig="clickjig4_4"/>
    </div>
  </div>
</template>

<script>
import jigsawindex2 from './../jigsaw/jigsawindex2.vue';
import jigsawindex3 from '../jigsaw/jigsawindex3.vue';
import jigsawindex4 from '../jigsaw/jigsawindex4.vue';
import previewDicom from 'Components/src/previewDicom';
  export default {
    components:{
      jigsawindex2,
      jigsawindex3,
      jigsawindex4,
      previewDicom
    },
    data() {
      return {
        // ip: this.CONSTANT.CONSTANT.WEB_URL,
        showjigsawindex: [
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false]
        ],
        xname: '',
        p1show: true,
        p2show: true,
        p3show: true,
        p4show: true,
        pshow: [true, true, true, true]
      }
    },
    watch:{
      xname: function(){
        eval('this.'+ this.xname+'()');
      }
    },
    created: function () {
    },
    mounted: function () {

    },
    methods: {
      showSon(index){
        this.$emit('windowIndex', index)
      },
      changejigsawindex(index, index1){
        if(index1 == -1 ){
          this.showjigsawindex[index].forEach((item, key) => {
            this.$set(this.showjigsawindex[index], key, false);
          })
          console.log(this.showjigsawindex,1111);
        }else{
          this.showjigsawindex[index].forEach((item, key) => {
          this.$set(this.showjigsawindex[index], key, false);
          })
          this.$set(this.showjigsawindex[index], index1, true);
          console.log(this.showjigsawindex[index][index1], '111');
        }
      },
      clickjig1_2(val){
        console.log('[*] 内部点击', val);
        this.clearAll();
        this.$refs.jig1_2.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig1_3(val){
        console.log('[*] 1-3内部点击', val);
        this.clearAll();
        this.$refs.jig1_3.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig1_4(val){
        console.log('[*] 1-3内部点击', val);
        this.clearAll();
        this.$refs.jig1_4.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig2_2(val){
        console.log('[*] 内部点击', val);
        this.clearAll();
        this.$refs.jig2_2.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig2_3(val){
        console.log('[*] 内部点击', val);
        this.clearAll();
        this.$refs.jig2_3.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig2_4(val){
        console.log('[*] 1-3内部点击', val);
        this.clearAll();
        this.$refs.jig2_4.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clearAll(){
        this.$refs.jig1_2.xclass = 'jigclass0';
        this.$refs.jig1_3.xclass = 'jigclass0';
        this.$refs.jig1_4.xclass = 'jigclass0';
        this.$refs.jig2_2.xclass = 'jigclass0';
        this.$refs.jig2_3.xclass = 'jigclass0';
        this.$refs.jig2_4.xclass = 'jigclass0';
        this.$refs.jig3_2.xclass = 'jigclass0';
        this.$refs.jig3_3.xclass = 'jigclass0';
        this.$refs.jig3_4.xclass = 'jigclass0';
        this.$refs.jig4_2.xclass = 'jigclass0';
        this.$refs.jig4_3.xclass = 'jigclass0';
        this.$refs.jig4_4.xclass = 'jigclass0';
      },
      clickjig3_2(val){
        console.log('[*] 内部点击', val);
        this.clearAll();
        this.$refs.jig3_2.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig3_3(val){
        console.log('[*] 内部点击', val);
        this.clearAll();
        this.$refs.jig3_3.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig3_4(val){
        console.log('[*] 1-3内部点击', val);
        this.clearAll();
        this.$refs.jig3_4.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig4_2(val){
        console.log('[*] 内部点击', val);
        this.clearAll();
        this.$refs.jig4_2.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig4_3(val){
        console.log('[*] 内部点击', val);
        this.clearAll();
        this.$refs.jig4_3.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig4_4(val){
        console.log('[*] 1-3内部点击', val);
        this.clearAll();
        this.$refs.jig4_4.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
    }
  }
</script>

<style scoped lang="stylus">
  #windowindex41{
    height:298px;
    border-bottom:2px solid white;
  }
  #windowindex4son1{
    width:calc(50% - 2px);
    width:-moz-calc(50% - 2px);
    width:-webkit-calc(50% - 2px); 
    width:-o-calc(50% - 2px);
    width:-ms-calc(50% - 2px);
    height:298px;
    border-right:2px solid white;
    display:inline-block;
    float left
  }
  #windowindex4son2{
    width:50%;
    height:298px;
    display:inline-block;
  }
  #windowindex4son3{
    width:calc(50% - 2px);
    width:-moz-calc(50% - 2px);
    width:-webkit-calc(50% - 2px); 
    width:-o-calc(50% - 2px);
    width:-ms-calc(50% - 2px);
    height:300px;
    border-right:2px solid white;
    display:inline-block;
    float left
  }
  #windowindex4son4{
    width:50%;
    height:300px;
    display:inline-block;
  }
</style>
