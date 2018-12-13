<template>
  <div class="editTitle">
      <div class="editTitle-heder">
        <img :src="ip+'/images/bespeak.png'" alt="">
        <div>
          <h2>县一医院</h2>
          <h3>放射影像诊断报告</h3>
        </div>
      </div>
      <div class="editTitle-centent">
        <div>
          <p>检查单位：<span>县一医院</span></p>
          <p>放射检查号：<span>JC001</span></p>
        </div>
        <div>
          <p>姓名：<span>测试01</span></p>
          <p>性别：<span>男</span></p>
          <p>年龄：<span>40岁</span></p>
          <p>病人ID：<span>XY01</span></p>
          <p>门诊号：<span>XY01</span></p>
          <p>住院号：<span>JCH01</span></p>
          <p>科室：<span>县一医院放射科</span></p>
          <p>病床：<span>001</span></p>
        </div>
        <div>
          <p>机型：<span>日立MR</span></p>
          <p>检查次数：<span>1</span></p>
          <p>检查部位：<span>头部</span></p>
          <p>扫描方式：<span></span></p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      ip: this.CONSTANT.CONSTANT.WEB_URL
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">


.editTitle {
  overflow: hidden;
}

.editTitle>div {
  padding-left: 3%;
  padding-right: 3%;
}

.editTitle-heder {
  width: 94%;
  padding: 20px 0;
  overflow: hidden;
}

.editTitle-heder>img {
  width: 100px;
  float: left;
}

.editTitle-heder>div {
  float: left;
  text-align: center;
  color: $black3;
  margin-left: 180px;
  margin-top: 25px;
  overflow: hidden;
}

.editTitle-centent {
  width: 94%;
  clear: both;
}

.editTitle-centent>div {
  overflow: hidden;
  border-bottom: 1px solid #b9b9b9;
}

.editTitle-centent>div>P {
  float: left;
  color: #333;
  font-size: 14px;
}

.editTitle-centent>div:first-child {
  width: 100%;
}

.editTitle-centent>div:first-child p {
  width: 50%;
}

.editTitle-centent>div:nth-child(2) p {
  width: 25%;
}

.editTitle-centent>div:nth-child(3) p {
  width: 50%;
}

.editTitle-centent span {
  font-size: 12px;
}
</style>