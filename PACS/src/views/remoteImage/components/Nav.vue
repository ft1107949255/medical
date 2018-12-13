<template>
  <div class="centent">
    <ul>
      <li :key="index" v-for="(item,index) in data" @click="selectSort(index)">
        <img v-if='item.isShow' :src=item.img :alt="item.alt" :title="item.alt">
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      msg: "",
      data: [
        {
          img: require("../../../static/images/1.png"),
          alt:'收缩左侧栏',
          isShow: true
        },
        {
          img: require("../../../static/images/refresh.png"),
          alt:'刷新',
          isShow: true
        },
        {
          img: require("../../../static/images/material.png"),
          alt:'选择病人进入编辑页面',
          isShow: true
        },
        {
          img: require("../../../static/images/enlarge.png"),
          alt:'选择病人查看详细信息',
          isShow: true
        },
        {
          img: require("../../../static/images/addTalent.png"),
          alt:'添加病人',
          isShow: true
        },
        {
          img: require("../../../static/images/upReport.png"),
          alt:'上报医院',
          isShow: false,
        },
        {
          img: require("../../../static/images/collection.png"),
          alt: '收藏管理',
          isShow: true
        },
        {
          img: require("../../../static/images/exl.png"),
          alt: '将搜索的数据导出excel',
          isShow: true
        },
         {
          img: require("../../../static/images/consultation.png"),
          alt: '选择一个病人添加会诊/修改会诊状态',
          isShow: false,
        },
        {
          img: require("../../../static/images/cancelHuizhen.png"),
          alt:'取消会诊',
          isShow: false,
        },
        {
          img: require("../../../static/images/mate.png"),
          alt:'选择主列表和未匹配的列表进行手动匹配',
          isShow: true
        },
        {
          img: require("../../../static/images/selectPatients.png"),
          alt:'选择多人查看影像',
          isShow: true
        },
        {
          img: require("../../../static/images/print.png"),
          alt:'选择病人打印信息',
          isShow: true
        },
        {
          img: require("../../../static/images/count.png"),
          alt:'会诊数据实时统计',
          isShow: true
        },
        {
          img: require("../../../static/images/excount.png"),
          alt:'会诊报表统计',
          isShow: true
        }
      ],
    };
  },
  created (){
    this.remotecheckFunction();
  },
  methods: {
    selectSort(index){
      this.$emit('selectSort', index);
    },
     remotecheckFunction() {
       this.$api.remotecheckFunction().then(res => {
        if (res.data.consultationFlag === null || res.data.consultationFlag == 0) {
          this.$set(this.data[8],'isShow', false);
          this.$set(this.data[9],'isShow', false);
        } else {
          this.$set(this.data[8],'isShow', true);
          this.$set(this.data[9],'isShow', true);
        }
        if (res.data.remoteDiagnosisFlag === null || res.data.remoteDiagnosisFlag == 0) {
          this.$set(this.data[5],'isShow', false);
        } else {
          console.log(111222333444);
          this.$set(this.data[5],'isShow', true);
        }
       })
     }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/styleus/index.styl';

.centent {
  width: 100%;
  height :100%;
  background-color: $bgGray;
}

ul {
  width: 100%;
  overflow: hidden;
  padding-left: 1.43%;
}

li {
  overflow: hidden;
  font-size: 0;
  float: left;
  padding-top: 15px;
  cursor: pointer;
}

li>img {
  height : 25px;
  margin-right: 40px;
}



</style>
