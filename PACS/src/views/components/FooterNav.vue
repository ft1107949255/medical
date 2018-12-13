<template>
    <div  style="height:60px;">
      <div class="centents">
        <el-row :gutter="20" type="flex"  justify="space-around">
          <el-col :span="4">
            <div class="leftimage">
              <img src="../../static/images/logo.png" alt="" class="leftimage">
            </div>
          </el-col>
          <el-col :span="16">
            <ul>
              <li :key="index" v-for="(item,index) in data" @click="liClick(item,index)" class="li" >
                <img :src="$apiUrl +item.icon_path" :alt="item.menu_name" :title="item.menu_name">
                <h1 v-if="currentIndex === index"> </h1>
              </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <div class="rightdiv">
              <img class="head" src="../../static/images/head.png" @click="ShowExitSystem" alt="退出系统" title="退出系统">
              <p>{{name}}</p>
            </div>
          </el-col>
        </el-row>
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
      </div>
    </div>
</template>

<script>
export default {
  components: {
  },
  props:['theIndex' , 'data'],
  data() {
    return {
      ip: this.baseURL,
      currentIndex :"",
      codeImgUrl: '',
      imgs:{login:'../../static/images/logo.png'},
      name:localStorage.getItem('userName') ,
      systemMsg:false,
      msg:'',
      // footerShow: false,
    };
  },

  mounted() {
    this.currentIndex=this.$props.theIndex;
    this.getCodeImg();
  },
  methods: {
    liClick: function (item,index) {
      console.log(index);
      this.currentIndex=index;
      this.$router.push({name:item.menu_name});
    },
    getCodeImg() {
      this.codeImgUrl = this.ip+ "/xhhms/" ;
    },
    exitSystem(){
      // 退出系统
      console.log('退出系统');
      // 开始清空数据
      localStorage.clear();
      console.log(localStorage);
      var that  = this;
      // this.msg = '3s之后即将退出系统！！再会。';
      // window.setTimeout(function () {
      //   that.$router.push('/');
      // },3000)
      this.systemMsg = false;
      this.$message({
        showClose: false,
        message: '系统将在3s之后退出，再会！！',
        type :'warning',
      });
       window.setTimeout(function () {
        that.$router.push('/');
      },3000)
    },
    ShowExitSystem(){
      this.systemMsg = true;
      this.msg = '你确定退出系统么？';
      console.log(3211111111111111);
    },
    // showfooter(){
    //   // 显示footer
    //   console.log('显示footer');
    //   this.footerShow = true;
      
    // },
    // closefooter(){
    //   console.log('隐藏footer');
    //   this.footerShow = false;
    // }
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

</style>
<style>
.el-dialog__title{
  color:#606266;
}
.v-modal{
  z-index: 0 !important;
}
</style>
