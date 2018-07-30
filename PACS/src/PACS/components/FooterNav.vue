<template>
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
            <img :src="codeImgUrl +item.icon_path" :alt="item.menu_name" :title="item.menu_name">
            <h1 v-if="currentIndex === index"> </h1>
          </li>
        </ul>
      </el-col>
      <el-col :span="4">
        <div class="rightdiv">
          <img class="head" src="../../static/images/head.png" alt="">
          <p>{{name}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
  },
  props:['theIndex' , 'data'],
  data() {
    return {
      ip: this.CONSTANT.CONSTANT.WEB_URL,
      msg: "",
      currentIndex :"",
      codeImgUrl: '',
      imgs:{login:'../../static/images/logo.png'},
      name:localStorage.getItem('userName') ,
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

.centents {
  width: 100%;
  height: 60px;
  overflow: hidden;
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
  height: 45px;

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
