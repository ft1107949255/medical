<template>
  <div class="login">
    <img src="../../static/images/login/bg-img.png" alt="" class="login-bg"/>
    <div class="login-main">
      <img width="90px" src="../../static/images/logoContent.png" alt="" class="login-logo"/>
      <div class="login-box">
        <h1 class="title">登录</h1>
        <el-form :model="loginParams" :rules="rules" ref="loginForm" label-width="0" class="form">
          <el-form-item label="" prop="userName" required class="item">
            <el-input class="login-input" placeholder="用户名" v-model="loginParams.userName" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password" class="item">
            <el-input class="login-input" type="password" placeholder="密码" v-model="loginParams.password" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="" class="item">
            <el-col :span="14">
              <el-form-item prop="code" required>
                <el-input class="login-input code-input" placeholder="验证码" v-model="loginParams.code" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <div class="code-btn" @click="getCodeImg">
                  <img :src="codeImgUrl" alt="" width="100" height="38">
                </div>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item class="item">
            <el-button type="primary" class="login-btn" @click="login('loginForm')">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import axios from 'axios';
  export default {
    name: "Login",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入验证码'));
        } else {
          this.$http.post(this.ip + '/xhhms/rest/interfacesLoginController/login', this.loginParams).then((res) => {
            var data = JSON.parse(res.data);
            if (data.status == 0) {
              callback(new Error(data.message));
            } else {
              callback();
            }
          }).catch(err => {
            callback(new Error('网络异常'));
          });
        }
      };
      return {
        ip: this.CONSTANT.CONSTANT.WEB_URL,
        loginParams: {
          userName: "test01",
          password: "123456",
          code: "1234"
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          code: [
            { required: true, validator: validatePass }
          ]

        },
        codeImgUrl: ''
      };
    },
    mounted() {
      this.getCodeImg();
    },
    methods: {
      login(loginForm) {
        var params=new Object();
        params.userName="admin";
        params.password="123456";
        params.code="1234";
        this.$refs[loginForm].validate((valid) => {
          if (valid) {
            this.$http.post(this.ip + '/xhhms/rest/interfacesLoginController/login', this.loginParams).then((res) => {
              var data = JSON.parse(res.data);
              // console.log(JSON.parse(data));
              console.log(data.token);
              if (data.status == 1) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.user.realName);
                localStorage.setItem('userId', data.user.id);
                if(this.$route.query.redirect){
                  // let redirect = decodeURIComponent(this.$route.query.redirect);
                  let redirect = this.$route.query.redirect;
                  this.$router.push(redirect);
                }else{
                  this.$router.push({ name: 'Main'});
                }
              } else {
                return false;
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            return false;
          }
        });
      },
      getCodeImg() {
        var num = Math.floor(Math.random()*(100000000)+0);
        this.codeImgUrl = this.ip + "/xhhms/randCodeImage?" + num;
      }
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import './../../common/styleus/index.styl';
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .login-main {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -300px;
    margin-left: -321px;
    width: 642px;
    height: 560px;
    text-align: center;
    z-index: 10;
  }

  .login-bg {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .login-logo {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 90px;
    // height: 50px;
  }

  .login-box {
    position: relative;
    width: 642px;
    height: 392px;
    margin-top: 58px;
    padding-top: 50px;
    background: #dcdbdb;
    border-radius: 4px;
    box-shadow: 0 0 5px #929090;

    .title {
      text-align: center;
      font-size: 21px;
      font-weight: normal;
      color: #222;
    }
    .form {
      width: 290px;
      margin-left: 174px;
      .item {
        margin-top: 16px;
        &:first-child {
          margin-top: 0;
        }
        &:last-child {
          margin-top: 30px;
        }
        .code-input {
          width: 173px;
        }
        .code-btn {
          margin-left: 10px;
          width: 100px;
          display: inline-block;
          border: 1px solid #b9b9b9;
          border-radius: 4px;
          height: 38px;
          line-height: 38px;
          background: #d3d3d3;
          cursor: pointer;
          img {
            opacity: .6;
          }
        }
        .login-btn {
          width: 100%;
          background: $blue;
        }
      }
    }
    .login-input {
      input.el-input__inner {
        background-color: #dcdbdb;
        border-color: #b9b9b9;
      }
    }
  }
}
</style>
