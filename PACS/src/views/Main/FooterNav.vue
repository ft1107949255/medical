<template>
    <div style="height:60px;">
      <div class="centents">

        <!-- Logo -->
        <el-row :gutter="20" type="flex"  justify="space-around">
          <el-col :span="4">
            <div class="leftimage">
              <img src="../../static/images/logo.png" alt="" class="leftimage">
            </div>
          </el-col>

          <!-- Menu List -->
          <el-col :span="16">
            <ul>
              <li :key="index" v-for="(item,index) in menuList" @click="liClick(item,index)" class="li" >
                <img :src="`${$apiUrl}/xhhms/${item.icon_path}`" :alt="item.menu_name" :title="item.menu_name">
                <h1 v-if="currentIndex === index"> </h1>
              </li>
            </ul>
          </el-col>

          <!-- User info -->
          <el-col :span="4">
            <div class="rightdiv">
              <img class="head" src="../../static/images/head.png" @click="ShowSystem" alt="退出系统" title="用户操作">
              <p>{{name}}</p>
            </div>
            <div class="leftdiv" v-show="showSystemOperation">
              <ul>
                <li @click="ShowExitSystem">退出登录</li>
                <li @click="ShowRepassword">修改密码</li>
              </ul>
            </div>
          </el-col>
        </el-row>

        <!-- Logout Tips -->
        <el-dialog
            title="提示"
            :visible.sync="systemMsg"
            width="25%">
            {{msg}}
            <span slot="footer" class="dialog-footer">
                <el-button  @click="systemMsg=false;">取 消</el-button>
                <el-button type="primary" @click="exitSystem" >确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改密码弹框 -->
        <el-dialog 
          title="提示"
          :visible.sync="systempwd"
          width="25%"
        >
        <el-form :model="passwordForm" :rules="rules"  ref="passwordForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="输入原密码:" prop="oldpassword">
            <el-input type="password" v-model="passwordForm.oldpassword"></el-input>
          </el-form-item>
          <el-form-item label="输入新密码:" prop="newpassword">
            <el-input type="password" v-model="passwordForm.newpassword"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码:" prop="repassword">
            <el-input type="password" v-model="passwordForm.repassword"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button  @click="systempwd=false;">取 消</el-button>
          <el-button type="primary" @click="submitPassword" >确 定</el-button>
        </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import {_set, _get} from 'Utils/storage'
export default {
  name: 'mainFooter',
  data() {
    var checkPassword = (rule, value, callback) => {
    // 先判断是否需要验证密码
      if (this.passwordForm.newpassword !== '' && value === '') {
        callback('请确认密码！！') 
      } else if (this.passwordForm.newpassword !== value ) {
        callback('两次密码输入不一致！！')
      } else {
        callback()
      }
    }
    return {
      msg: '你确定退出系统么？',
      currentIndex: "",
      name: _get('userName', 'l'),
      systemMsg: false,
      menuList: [],
      showSystemOperation: false,
      systempwd: false,
      passwordForm: {
        oldpassword: '',
        newpassword: '',
        repassword: ''
      },
      rules: {
        oldpassword: [
          { required: true, message: '请输入旧的密码！！', trigger: 'blur'}
        ],
        newpassword: [
          { required: true, message:'请输入新密码！！', trigger:'blur'}
        ],
        repassword: [
          { required: true, validator:checkPassword, trigger:'blur'}
        ]
      }
    };
  },

  mounted() {
    // this.currentIndex=this.$props.theIndex;
    this.getMenu();
  },
  methods: {
    // Select menu
    liClick: function (item,index) {
      this.currentIndex=index;
      this.$router.push({path: item.menu_url});
    },
    // Exit system
    exitSystem(){
      // 退出系统
      // 开始清空数据
      localStorage.clear();
      this.systemMsg = false;
      this.$message({
        showClose: false,
        message: '系统将在3s之后退出，再会！！',
        type :'warning',
      });
      setTimeout(() => {
        this.$router.push('/');
      },3000)
    },
    ShowExitSystem(){
      this.systemMsg = true;
      this.showSystemOperation = false;
    },
    ShowRepassword() {
      this.systempwd = true;
      this.showSystemOperation = false;
    },
    submitPassword() {
      // 提交修改密码
      console.log(this.$refs.passwordForm)
      // return 
      this.$refs.passwordForm.validate().then(res => {
        if (res) {
          var params = {
            password: this.passwordForm.oldpassword,
            newpassword: this.passwordForm.newpassword
          }
          // 修改密码
          var config = {}
          config.customErrorHandle = true
          this.$api.changePassword(params, config).then(res => {
            // 密码修改成功
            if (res.status === 1 || res.status === '1') {
              this.$message('密码修改成功,下次登录时生效！！')
              this.systempwd = false;
            }
          })
        }
      })
    },
    ShowSystem() {
      // 显示系统信息
      this.showSystemOperation = !this.showSystemOperation
    },
    // Get menu list
    getMenu() {
      this.$api.getMenu().then(res => {
        this.menuList = res.data[0].children;
        _set('nume', this.menuList)
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">


.centents {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #bdbebe;
}

.leftimage {
  width: 110px;
  height :40px;
  display: block;
  margin-top :10px;
  margin-left :4%;
  cursor: pointer;
}

.leftdiv{
  width:50px;
  float: right;
  li {
    width:100%;
    height: 20px;
    line-height: 28px;
    margin: 0px;
    text-align: center;
    font-size: 12px;
    color: white;
    text-decoration: underline
  }
  // li:hover {
  //   text-decoration: underline
  // }
}
.rightdiv {
  width: 50px;
  float: right;
  color: $colorWhite;
  font-size: 0;
  margin-top:5px;
  margin-right :4%;
}

.head {
  width: 25px;
  height: 35px;
  display: block;
  margin: auto;
  cursor:pointer; 
}

ul {
  text-align: center;
  overflow: hidden;

}

ul>li {
  display :inline-block;
  overflow: hidden;
  font-size: 0;
  padding-top: 5 px;
  cursor: pointer;
  height :50px;
}

li:not(:last-child) {
  margin-right: 30 px;
}

li>img {
  height: 50px;

}

li>h1 {
  height: 4px;
  width : 4px;
  background-color $blue;
  margin: auto;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  margin-top: 0px;
}

div>p {
  text-align: center;
  font-size: 11px;
}

.el-dialog__title{
  color:#606266;
}

</style>
<style>
.v-modal{
  z-index: 0 !important;
  display: none !important;
}
</style>

