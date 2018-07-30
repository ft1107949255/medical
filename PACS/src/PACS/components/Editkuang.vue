<template>
  <div id="editmkuang">
    <div class="title">
      <div class="spanClass">
      <span style="color:#606266">{{name}}</span>
      </div>
      <div class="imgClass">
      <img @click="click" src="../../static/images/icon/edit_button.png" width="16"/>
      </div>
    </div>
    <el-input
      type="textarea"
      :rows="8"
      v-model="content">
    </el-input>

  </div>
</template>

<script>
export default {
  name: 'editmkuang',
  props: ['name','content'],
  data() {
    return {
      msg: "",
      ip: this.CONSTANT.CONSTANT.WEB_URL,
      textarea: '',
      data:[
      ]
    };
  },
  methods: {
    click: function () {
      console.log(this.content);
      this.$emit('sendcontent',this.content);
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';
#bottomkuang{
  width:100%;
  height:190px;
  background-color:#e2e0e0;
}

#editmkuang{
  margin-top:20px;
}

.div{
  width:32%;
  height:190px;
  // border:1px solid $bottomKuangBorder;
  display:inline-block;
  margin:10px 0.3%;
  position: relative
}
.div .span{
  width:100px;
  height:20px;
  text-align:center;
  line-height:20px;
  position: absolute;
  top:-8px;
  left:50%;
  margin-left:-50px;
}
  .title{
    font-size :12px;
    height :30px;
    line-height :30px;
    background-color :#e2e0e0;
    position: relative;
  }

.spanClass{
  margin-left :0px;
  float :left;
}
.imgClass{
  margin-right :40px;
  float :right;
}
.el-textarea{
  width :100%;
  margin:0 auto;
  display:block;
}

.el-textarea__inner{
  background-color :white;
}
.title img{
  position: absolute;
  top:5px;
  margin-left :8px;
}
img{
  cursor:pointer;
  margin-left :60px;
}
</style>
