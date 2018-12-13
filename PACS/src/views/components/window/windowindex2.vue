<template>
  <div>
    <div id="windowindex2son1"  @click="showSon(1)" :class="active1">
      <preview-dicom ref="p1" v-show="pshow[0]"></preview-dicom>
      <jigsawindex2 ref="jig1_2"  v-show="showjigsawindex[0][0]"  @clickjig="clickjig1_2"/>
      <jigsawindex3 ref="jig1_3"  v-show="showjigsawindex[0][1]"  @clickjig="clickjig1_3"/>
      <jigsawindex4 ref="jig1_4"  v-show="showjigsawindex[0][2]"  @clickjig="clickjig1_4" />
    </div>
    <div id="windowindex2son2" @click="showSon(2)" :class="active2">
      <preview-dicom ref="p2" v-show="pshow[1]"></preview-dicom>
      <jigsawindex2 ref="jig2_2"  v-show="showjigsawindex[1][0]" @clickjig="clickjig2_2"/>
      <jigsawindex3 ref="jig2_3" v-show="showjigsawindex[1][1]" @clickjig="clickjig2_3"/>
      <jigsawindex4 ref="jig2_4"  v-show="showjigsawindex[1][2]" @clickjig="clickjig2_4"/>
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
        showjigsawindex:[
          [false, false, false],
          [false, false, false]
        ],
        xname: '',
        xclass: '',
        active1:[],
        active2:[],
        imgurl:'',
        pshow: [true, true]
      }
    },
    watch:{
      xname: function(){
        eval('this.'+ this.xname+'()');
      },
      xclass: function(){
        eval('this.'+ this.xclass+'()');
      },
    },
    created: function () {
    },
    methods: {
      showSon(index){
        console.log(index)
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
        this.active1 = [];
        this.active2 = [];
        this.clearAll();
        this.$refs.jig1_2.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig1_3(val){
        console.log('[*] 1-3内部点击', val);
        this.active1 = [];
        this.active2 = [];
        this.clearAll();
        this.$refs.jig1_3.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig1_4(val){
        console.log('[*] 1-3内部点击', val);
        this.active1 = [];
        this.active2 = [];
        this.clearAll();
        this.$refs.jig1_4.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig2_2(val){
        console.log('[*] 内部点击', val);
        this.active1 = [];
        this.active2 = [];
        this.clearAll();
        this.$refs.jig2_2.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig2_3(val){
        console.log('[*] 内部点击', val);
        this.active1 = [];
        this.active2 = [];
        this.clearAll();
        this.$refs.jig2_3.xclass = 'jigclass'+val;
        this.$emit('jigclick', val);
      },
      clickjig2_4(val){
        console.log('[*] 1-3内部点击', val);
        this.active1 = [];
        this.active2 = [];
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
      }
    }
  }
</script>

<style scoped lang="stylus">
  #windowindex2son1{
    width:100%;
    height:298px;
    border-bottom:2px solid white;
  }
  #windowindex2son2{
    width:100%;
    height:300px;
  }
  .active{
    background-color:#C0C0C0;
  }
</style>
