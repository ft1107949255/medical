<template>
  <div class="centent">
      <ul>
        <li>
          <img src="../../static/images/left.png" alt="">
        </li>
        <li v-show="showData[2].num>=5 ">...</li>
        <li v-show="!(item.num==data.total)" :key="index" :class="{lis:item>999 , isActiove:item.isActiove}" v-for="(item,index) in showData">{{item.num}}</li>
        <li v-if="showData[4].num<data.total">...</li>
        <li :class="{lis:data.total>999}" v-if="data.total>5">{{data.total}}</li>        
        <li>
          <img src="../../static/images/right.png" alt="">
        </li>        
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      // ip: this.CONSTANT.CONSTANT.WEB_URL,
      data: {
        pageSize: 10,
        total: 8
      },
      showData: [
        {
          num: 3,
          isActiove: true
        },
        {
          num: 4,
          isActiove: false
        },
        {
          num: 5,
          isActiove: false
        },
        {
          num: 6,
          isActiove: false
        },
        {
          num: 7,
          isActiove: false
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">


.centent {
  width: 370px;
  overflow: hidden;
}

ul {
  width: 370px;
  // margin :auto;
  overflow: hidden;
}

li {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  text-align: center;
  line-height: 20px;
  background-color: #f7f7f7;
  margin-right: 6px;
  font-size :8px;
  cursor: pointer;
}

// li:hover {
//   background-color: #858585;
//   color: #f7f7f7;
// }

.lis {
  width: auto;
  padding: 0 5px;
}

.isActiove {
  background-color: #858585;
  color: #f7f7f7;
}
</style>