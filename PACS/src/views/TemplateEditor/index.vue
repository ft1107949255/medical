<template>
  <div style="background-color:#989697;">
    <div class="box">
    <iframe   class="" v-show="iframeState" id="contentFrame_Template_View"  
      frameborder=0 name="contentFrame_Template_View" scrolling="no" 
      v-bind:style="{width: myWidth,height:myheight}"
      :src="iframurl">
    </iframe>
    <footer id="footer">
      <foot-nav :theIndex="7" :data="MainData"/>
    </footer>
   </div>
  </div>
  
</template>
<script>
import $ from 'jquery'
import footNav from "./../components/FooterNav.vue";
import {api} from '../../config/website'
let parentDomain = window.location.hostname;
document.domain = parentDomain;
export default {
  data () {
    return {
      ip: api,
      iframurl: api + "/xhhms/medicalTemplateController.do?doTemplateEditor" ,
      iframeState:true,
      // myWidth: (window.innerWidth - 5) + 'px',
      myWidth:'100%',
      myheight: (window.innerHeight - 60) + 'px',
      MainData:JSON.parse(localStorage.getItem('nume')),
    }
  },
  components: {
    footNav
  },
  mounted(){
    window.onresize = function windowResize () {
        // 通过捕获系统的onresize事件触发我们需要执行的事件
        this.myWidth = (window.innerWidth - 5) + 'px';
        this.myheight = (window.innerHeight - 60) + 'px';
    }
    var that = this;
    window.addEventListener('message',function(res){ 
      if(!!res.data){
        if(!res.data.type){
          //console.log(res.data); 
          var message = JSON.parse(res.data);
          console.log('[*] 参数',message)
          if(!!message.updatewindow){
            let oIframe = document.getElementById('contentFrame_Template_View');
            $("#contentFrame_Template_View").attr("src", that.ip + "/xhhms/"+message.updatewindow);
          }else if(!!message.savetemplate){
            // that.$http.post(that.ip + '/xhhms/rest/interMedicalTemplateController/v1/save', message.savetemplate, {
            //     headers: {
            //       'X-AUTH-TOKEN': that.token
            //     }
            // })
            console.log(message.savetemplate);
            that.$api.templateEditorsave(message.savetemplate).then((res) => {
                var data = res;
                if (!!data&&data.status=="1") {
                    that.$message({
                      showClose:true,
                      message:data.message,
                      type:'success'});
                } else {
                    that.$message({
                      showClose:true,
                      message:data.message,
                      type:'error'});
                  return false;
                }
              }, (err) => {
                console.log(err);
                
              });
          }else if(!!message.doPrint){
              console.log(message.doPrint);
              let newContent =message.doPrint;
              let oldContent = document.body.innerHTML;
              document.body.innerHTML = newContent;
              window.print();
              window.location.reload();
              document.body.innerHTML = oldContent;
              return false;  
          }
        }
      }
    });
  },
  methods:{
    showIframe(){
      this.goBackState = true;
    }
  }
}

</script>
<style scoped lang="stylus">


body{
  background-color:#989697, 
}

.box{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
iframe{
  width: 200px;
  height: 200px;
  flex: 1;
}

#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  background-color: $bgGray; 
}

</style>