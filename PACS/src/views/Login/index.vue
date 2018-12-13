<template>
  <div class="login">
    <img src="../../static/images/login/bg-img.png" alt="" class="login-bg"/>
    <div class="login-main">
      <img width="90px" src="../../static/images/logoContent.png" alt="" class="login-logo"/>
      <div class="login-box">
        <h1 class="title">登录</h1>
        <el-form :model="loginParams" :rules="rules" ref="loginForm" label-width="0" class="form">
          <el-form-item label="" prop="userName" required class="item">
            <el-input class="login-input" placeholder="用户名" v-model="loginParams.userName" @keydown.enter.native="login('loginForm')" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password" class="item">
            <el-input class="login-input" type="password" placeholder="密码" v-model="loginParams.password" @keydown.enter.native="login('loginForm')" clearable>
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="" class="item">
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
          </el-form-item> -->
          <el-form-item class="item">
            <el-button type="primary" class="login-btn" @click="login('loginForm')">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {_set} from 'Utils/storage'
export default {
  name: "Login",
  data() {
    return {
      loginParams: {
        userName: "",
        password: "",
        //code: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        // code: [
        //   { required: true, message: "请输入验证码", trigger: "blur" }
        // ]
      },
      //codeImgUrl: ""
    };
  },
  mounted() {
    this.getCodeImg();
    this.getPublicKey()
  },
  methods: {
    ...mapActions(["userLogin"]),
    login(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.ajaxLogin();
        } else {
          return false;
        }
      });
    },
    // login function
    ajaxLogin() {
      this.userLogin(this.loginParams).then(data => {
        _set("userName", data.user.realName, 'l');
        _set("userId", data.user.id, 'l');
        let redirect = this.$route.query.redirect;
        redirect ? this.$router.push(redirect) : this.$router.push({ path: "/index" });
      });
    },
    // Get verification code
    getCodeImg() {
      this.$api.getCode({}, {loading: false}).then(res => {
        this.codeImgUrl = res.data.image
        this.loginParams.codeid = res.data.codeid
      })
    },
    // Get public key
    getPublicKey () {
      this.$api.getPublicKey({}, {loading: false}).then(res => {
        this.loginParams = Object.assign(this.loginParams, res.data)
      })
    }
  }
};
</script>

<style lang='stylus' scoped>
.login {
  width: 100%;
  height: 100vh;
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
            opacity: 0.6;
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
