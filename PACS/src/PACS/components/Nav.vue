<template>
  <div class="centent">
    <ul>
      <li :key="index" v-for="(item,index) in data" @click="selectSort(index)">
        <img :src=item.img :alt="item.alt" :title="item.alt">
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
          img: require("../../static/images/1.png"),
          alt:'收缩左侧栏',
        },
        {
          img: require("../../static/images/refresh.png"),
          alt:'刷新',
        },
        {
          img: require("../../static/images/material.png"),
          alt:'选择病人进入编辑页面',
        },
        {
          img: require("../../static/images/enlarge.png"),
          alt:'选择病人查看详细信息',
        },
        {
          img: require("../../static/images/addTalent.png"),
          alt:'添加病人',
        },
        {
          img: require("../../static/images/upReport.png"),
          alt:'上传影像',
        },
        {
          img: require("../../static/images/collection.png"),
          alt: '收藏管理',
        },
        {
          img: require("../../static/images/exl.png"),
          alt: '将搜索的数据导出excel',
        },
         {
          img: require("../../static/images/consultation.png"),
          alt: '选择一个病人添加会诊/修改分诊状态',
        },
        {
          img: require("../../static/images/cancelHuizhen.png"),
          alt:'取消分诊',
        },
        // {
        //   img: require("../../static/images/upReport.png"),
        //   alt: '上报数据',
        // }
      ],
      ip: this.CONSTANT.CONSTANT.WEB_URL
    };
  },
  methods: {
     selectSort(index){
        this.$emit('selectSort', index);
     }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

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

li:not(:last-child) {
  margin-right: 40px;
}

li>img {
  height : 25px;
}

</style>
