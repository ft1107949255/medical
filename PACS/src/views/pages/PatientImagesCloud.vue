<template>
    <iframe class="" v-show="iframeState" id="show-iframe"
      frameborder=0 name="showHere" scrolling="no"
      v-bind:style="{width: myWidth,height:myheight}"
      src="">
    </iframe>
</template>

<script>
import {api} from '../../config/website'
export default {
  data () {
    return {
      ip: api,
      cloudip:this.CONSTANT.CONSTANT.REMOTE_URL,
      iframeState:true,
      myWidth: '100%',
      myheight: (window.innerHeight - 10) + 'px',
      patientId: this.$route.query.patientId ? this.$route.query.patientId :'',
      studyinsta: this.$route.query.studyinsta ? this.$route.query.studyinsta : '',
      id: this.$route.query.id ? this.$route.query.id :'',
      compareid: this.$route.query.compareid ? this.$route.query.compareid :'',
    }
  },
  mounted(){
    window.onresize = function windowResize () {
        // 通过捕获系统的onresize事件触发我们需要执行的事件
        this.myWidth = (window.innerWidth - 5) + 'px';
        this.myheight = (window.innerHeight - 10) + 'px';
    }
    const oIframe = document.getElementById('show-iframe');
    var cloudip = this.cloudip;
    if(this.patientId){
      oIframe.src = cloudip+ "/xhhms/studyImageController.do?goStudyinfo&id="+this.patientId;
    }else if(this.studyinsta){
      console.log(this.studyinsta);
      oIframe.src = cloudip+ "/xhhms/studyImageController.do?goImageinfo&studyinsta="+this.studyinsta;
    }else if(this.id && this.compareid){
      oIframe.src = cloudip+ "/xhhms/studyImageController/goCompareStudyinfo&id="+ this.studyinsta+ "&compareid="+this.compareid ;
    }
    
    // const deviceWidth = document.documsentElement.clientWidth;
    // const deviceHeight = document.documentElement.clientHeight;
    // console.log(deviceWidth,deviceHeight)
    // oIframe.style.width = deviceWidth + 'px';
    // oIframe.style.height = deviceHeight + 'px';

  
    //window.open("http://127.0.0.1:8080/xhhms/studyImageController.do?goStudyinfo&id=1")
  },
  methods:{
    showIframe(){
      this.goBackState = true;
    }
  }
}

</script>
<style scoped>
iframe{
  width: 200px;
  height: 200px;
  overflow-y: hidden;
}

</style>
