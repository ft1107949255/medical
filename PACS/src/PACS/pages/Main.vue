<template>
  <div class="main">
    <img src="../../static/images/login/bg-img.png" alt="" class="login-bg"/>
    <div class="login-main">
      <img width="90px" src="../../static/images/logoContent.png" alt="" class="login-logo"/>
      <div class="footer">
        <foot-nav :theIndex="100"  :data="MainData"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import footNav from "./../components/FooterNav.vue";
  export default {
    components: {
        footNav
    },
    data() {
      return {
        msg: "",
        token:localStorage.getItem('token') ,
        ip: this.CONSTANT.CONSTANT.WEB_URL,
        MainData:{},
      };
    },
    created() {
      console.log("进来了");
      this.getMune();
    },
    methods:{
      getMune () {
        var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/interfacesLoginController/getMenu', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          if (!!data) {
            console.log(data);
            this.MainData=data.data[0].children;
            localStorage.setItem('nume', JSON.stringify(data.data[0].children));
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      }
    }
  }
</script>


<style lang='stylus' rel='stylesheet/stylus'>
  @import './../../common/styleus/index.styl';

  .main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .login-bg {
    position: absolute;
    display block;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .login-main {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    overflow: hidden;
  }
  .login-logo {
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }

  .footer {
    position: absolute;
    left: 0;
    bottom:0;
    z-index: 10;
    width: 100%;
    height: 60px;
    background-color :$bgGray;
  }

</style>
