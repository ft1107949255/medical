<template>
  <div class="countDIV">
    <ball @click='fullScreen'/>
    <div>
      <div class="countHospital">
        <div v-for="(v,k) in countList" :key="k" class="hospital"><span>{{v[1]}}</span>: {{v[2]}}人</div>
        <!-- <div v-for="(v,k) in countList" :key="k" class="hospital"><span>{{v[1]}}</span>: {{v[2]}}人</div> -->
      </div>
    </div>
    <div class="table">
      <el-table
        :data="messageList"
        :height="tableHeight"
        stripe
        otherHeight='170'
        style="width: 100%">
        <el-table-column v-for='(v,k) in Colums' :prop="v.prop" :label="v.label" :key='k' > </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import {formatDate} from "../../common/js/date";
import {api} from '../../config/website';
import ball from './components/ball.vue'
export default {
  name: 'index',
  components: {
    api,
    ball
  },
  data() {
    return {
      lockReconnect: false,
      wsUrl: '',
      ws: '',
      tt: '',
      heartCheck: {
        timeout: 3000,
        timeoutObj: null,
        serverTimeoutObj: null,
      },
      messageList:[
        {
          'locationName': 'xqxq',
          'createDate':'2012',
          'name': '',
          'consultationLocationName':'',
          'doctorname': ''
        },
        {
          'locationName': 'xqxq',
          'createDate':'2012',
          'name': '',
          'consultationLocationName':'',
          'doctorname': ''
        },
        {
          'locationName': 'xqxq',
          'createDate':'2012',
          'name': '',
          'consultationLocationName':'',
          'doctorname': ''
        },
        {
          'locationName': 'xqxq',
          'createDate':'2012',
          'name': '',
          'consultationLocationName':'',
          'doctorname': ''
        }
      ],  // list
      countList: [], //count
      btnMsg: '全屏',
      fullscreen: false,
      Colums: [
          {"label":"会诊医院","prop":"locationName"},
          {"label":"创建时间","prop":"createDate"},
          {"label":"病人信息","prop":"name"},
          {"label":"会诊医生","prop":"consultationLocationName"}, 
          {"label":"会诊专家","prop":"doctorname"},
        ],
        otherHeight: 170,
        showBtn: true,
        screenHeight: document.documentElement.clientHeight,
    };
  },
  mounted() {
    let protocolStr = document.location.protocol;
    if (protocolStr == "http:") {
      this.wsUrl = 'ws://'+ api +'/xhhms/websocket';
    } else {
      this.wsUrl = 'wss://'+ api +'/xhhms/websocket';
    }
    this.getCountData();
    this.createWebSocket();
  },
  computed: {
      tableHeight() {
        return this.screenHeight;
      }
  },
  methods: {
    // 创建socket
    createWebSocket() {
      try {
        this.ws = new WebSocket(this.wsUrl);
        this.init();
      } catch(e) {
        if (!'WebSocket' in window) {
          console.log('当前浏览器不支持websocket！！');
          this.$message({
            showClose: true,
            message: '请更换其他支持websocket的浏览器！！',
            type: 'warning'
          });
          return
        }
        console.log('catch');
        this.reconnect(this.wsUrl);
      }
    },
    init() {
      var that = this;
      this.ws.onclose = function () {
        console.log('链接关闭');
        that.reconnect(that.wsUrl);
      };
      this.ws.onerror = function() {
        console.log('发生异常了');
        that.reconnect(that.wsUrl);
      };
      this.ws.onopen = function () {
        //心跳检测重置
        that.ws.send('xxxxx');
        //that.start();
      };
      this.ws.onmessage = function (event) {
        //拿到任何消息都说明当前连接是正常的
        console.log('接收到消息', event.data);
        //that.start();
        if(event.data !== '' && event.data !=='已接收消息'){
          let data = JSON.parse(event.data);
          that.messageList.unshift(data)
            // 增加长度
            that.countList.map(item=>{
              if (item[0] == data.locationCode) {
                item[2] +=  + 1;
              }
            })
          console.log(that.countList);
        }
      }
    },

    reconnect() {
      if(this.lockReconnect) {
        return;
      };
      this.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      var that = this;
      this.tt && clearTimeout(this.tt);
      this.tt = setTimeout(function () {
        that.createWebSocket();
        that.lockReconnect = false;
      }, 4000);
    },

    start() {
      var that = this;
      this.heartCheck.timeoutObj && clearTimeout(this.heartCheck.timeoutObj);
      this.heartCheck.serverTimeoutObj && clearTimeout(this.heartCheck.serverTimeoutObj);
      this.heartCheck.timeoutObj = setTimeout(function(){
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        that.ws.send("hello");
        var tthat =  that;
        that.heartCheck.serverTimeoutObj = setTimeout(function() {
          // tthat.ws.close();
        }, that.heartCheck.timeout);
      }, this.heartCheck.timeout)
    },

    fullScreen() {
      let element = document.documentElement; 
      if (this.fullscreen) { 
        if (document.exitFullscreen) { 
          document.exitFullscreen(); 
        } else if (document.webkitCancelFullScreen) { 
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) { 
          document.mozCancelFullScreen(); 
        } else if (document.msExitFullscreen) { 
          document.msExitFullscreen(); 
        }
        this.btnMsg = '全屏';
        this.showBtn = true;          
      } else { 
        if (element.requestFullscreen) { 
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) { 
          element.webkitRequestFullScreen(); 
        } else if (element.mozRequestFullScreen) { 
          element.mozRequestFullScreen();  
        } else if (element.msRequestFullscreen) { 
          element.msRequestFullscreen(); 
        }
        this.btnMsg = '返回';
        this.showBtn = false;    
      } 
      this.fullscreen = !this.fullscreen;
    },
    // 初始化统计数据
    getCountData() {
      this.$api.getCount().then(res=> {
        if(res.status === '1' || res.status === 1) {
          this.countList = res.data.countList;
          this.messageList = res.data.resultList;
          console.log('[*] 当前数据', this.countList);
        }
      })  
    },
    handleIndexChange() {},
    handleRowClick() {},
    enter() {
      console.log(1111);
      console.log(this.fullscreen);
      if(this.fullscreen) {
        this.showBtn = true;
      }
    },
    leave() {
      if(this.fullscreen) {
        this.showBtn = false;
      }
    },
  },  
  filters:{
    changeData(value){
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd"); 
    }
  }
};
</script>

<style lang='stylus' scoped>
.left {
  width:20%;
  p{
    width:30%;
    height:40px;
    line-height:40px;
    display: inline-block;
  }
}
.countHospital{
  width:100%;
  margin:0 auto;
  color:#777;
}
.countDIV{
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
  .hospital{
    background-color:#d4d4d4;
    font-size:13px;
    padding-left:10px;
  }
  .table{
    width:100%;
    margin 0 auto;
    >>> .el-table th, .el-table tr{
      background:#409eff;
    }
    overflow: auto;
  }
  .el-table::before{
    height:0px;
  }
  .btnDiv{
    width:100%;
  }
  overflow-y: hidden;
  height:100vh;
  background:#d4d4d4;
}
>>> .count .cell{
  text-align center;
} 
</style>
