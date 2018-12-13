<template>
  <div id="container">
    <iframe id="edit-iframe" align="center" frameborder=0 name="showHere" scrolling="no" style="display:none" src=""> </iframe>
  </div>
</template>

<script>
import {api} from '../../config/website'
export default {
  components: {
  },
  data() {
    return {
      ip: api,
      id: this.$route.query.id,
      token:localStorage.getItem('token'),
      load: false
    }
  },
  mounted() {
    var that = this;
    window.addEventListener("message", function(res) {
      if (res.data && !res.data.hasOwnProperty("type")) {
        if (res.data.indexOf("webpackHotUpdate") != -1) {
          return false;
        }
        var data = JSON.parse(res.data);
        if (data.doPrint) {
          // 开始打印信息
          let newContent = data.doPrint;
          let oldContent = document.body.innerHTML;
          document.body.innerHTML = newContent;
          window.print();
          // window.location.reload();
          // document.body.innerHTML = oldContent;
          window.close();
          return false;
        }
      }
    });
    if(this.load == false) {
      this.startPrint();
    }
    
  },
  created() {
  },
  computed: {
  },
  methods: {
    startPrint() {
      this.load = true;
      // 加载打印报告 开始发送消息
      if (this.id === '' || typeof(this.id) === 'undefined') {
        this.$message({
          message: '参数缺失！！',
          type: 'error'
        });
        return false
      }
      var oIframe = document.getElementById("edit-iframe");
      console.log(oIframe);
      oIframe.src = this.ip + "/xhhms/remoteReportController.do?goEdit&id=" + this.id + "&jwtstr=" + this.token;
      // 开始发送消息
      oIframe.onload = function(){
        oIframe.contentWindow.postMessage(JSON.stringify({ ConclusionPrintReport: "print" }),"*");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

#container {
}
</style>
