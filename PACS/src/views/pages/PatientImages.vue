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
      iframeState:true,
      myWidth: '100%',
      myheight: (window.innerHeight - 10) + 'px',
      patientId: this.$route.query.patientId ? this.$route.query.patientId :'',
      studyinsta: this.$route.query.studyinsta ? this.$route.query.studyinsta : '',
      id: this.$route.query.id ? this.$route.query.id :'',
      idstr:this.$route.query.idstr ? this.$route.query.idstr :'',
    }
  },
  mounted(){
    window.onresize = function windowResize () {
        // 通过捕获系统的onresize事件触发我们需要执行的事件
        this.myWidth = (window.innerWidth - 5) + 'px';
        this.myheight = (window.innerHeight - 10) + 'px';
    }
    const oIframe = document.getElementById('show-iframe');
    if(this.patientId && this.patientId !== ''){
      oIframe.src = this.ip+ "/xhhms/studyImageController.do?goStudyinfo&id="+this.patientId;
    }else if(this.studyinsta && this.studyinsta !== ''){
      console.log(this.studyinsta);
      oIframe.src = this.ip+ "/xhhms/studyImageController.do?goImageinfo&studyinsta="+this.studyinsta;
    // }else if(this.id && this.compareid){
    //   oIframe.src = this.ip+ "/xhhms/studyImageController.do?goCompareStudyinfo&id="+ this.studyinsta+ "&compareid="+this.compareid ;
    }else if(this.id && this.compareid == ''){
      console.log(this.id);
      oIframe.src =  this.ip+ "/xhhms/studyImageController.do?goStudyinfo&id="+this.id;
    }else if(this.idstr && this.idstr !== ''){
      // base64
      this.idstr = window.atob(this.idstr);
      oIframe.src = this.ip+ "/xhhms/studyImageController.do?goCompareStudyinfo&ids="+ this.idstr;
    }
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
