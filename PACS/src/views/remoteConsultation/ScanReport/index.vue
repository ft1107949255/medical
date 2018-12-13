
<template>
  <div class="edit">
      <header>
        <editNav />
      </header>
      <div class="centent">
          <div id="print_div" style="width: 100% ;height:800px; min-width: 900px; margin: 0 auto;">
            <iframe class="" v-show="true" id="edit-iframe" align="center"
            frameborder=0 name="showHere" scrolling="no"
            style="width: 100%;height:800px; min-width: 900px; margin: 0 auto;"
            src="">
            </iframe>
          </div>
        </div>
        <!-- <div class="right" ><right ref="forms" /></div> -->
        <footer id="footer">
          <foot-nav :theIndex="6" :data="MainData"/>
        </footer>
  </div>
</template>

<script>
  import footNav from "../../components/FooterNav.vue";
  import {api} from '../../../config/website'
  export default {
    components: {
      footNav
    },
    data() {
      return {
        msg: "",
        ip: api,
        token:localStorage.getItem('token') ,
        id:this.$route.query.patientId ? this.$route.query.patientId: '' ,
        consultationid:this.$route.query.consultationid,
        MainData:JSON.parse(localStorage.getItem('nume')),
        type:this.$route.query.type ? this.$route.query.type: '' ,
      };
    },
    created: function () {
      if(this.id ==='' || this.type ==''){
        this.$message({
          showClose: true,
          message: '非法操作,请回到主页面进入。',
          type: 'error'
        });
        var that  = this
        window.setTimeout(function () {
          that.$router.push('/home');
        },3000)
      }
    },
    beforeMount: function () {
    },
    mounted: function () {
     // 0 诊断  2 我参加的会诊  1 我申请的会诊    3 已上报
     console.log('xxxxxx',this.ip)
     const oIframe = document.getElementById('edit-iframe');
     if(this.type == 0){
        oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goView&id="+this.id+"&jwtstr="+this.token;
     }else if(this.type==2){
        oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goCloudConsultationView&id="+this.id+"&consultationid="+this.consultationid+"&jwtstr="+this.token;
     }else if(this.type==3){
       oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goCloudView&id="+this.id+"&jwtstr="+this.token;
     }else{
       oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationMyView&id="+this.id+"&consultationid="+this.consultationid+"&jwtstr="+this.token;
     }
    },
    beforeUpdate: function () {
    },
    updated: function () {
    },
    methods:{
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" rel='stylesheet/stylus'>
@import '../../../common/styleus/index.styl';

body{
  background-color:#8A8A8A;
}
.edit {
  width: 100%;

  overflow: hidden;
  // background-color:#D4D4D4;

  header {
    width: 100%;
    overflow: hidden;
  }

  .centent {
    min-height:900px;
    width: 100%;
    overflow: auto ;
  }

  .centent>div {
    float: left;
    overflow: hidden;
  }


  .center {
    width: 100%;
    height:830px; 
    min-width: 800px;
    margin: 0 1%;
  }
  #footer{
     background-color:#D4D4D4;
  }
}
</style>
