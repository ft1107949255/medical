<template>
  <div class="centents">
    <nav>
      <ul>
        <li @click="isActive(index)" :class="{isActive:item.active}" :key="index" v-for="(item,index) in data">
          {{item.text}}
          <span v-if="item.active==true">{{num}}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props:['num'],
  data() {
    return {
      msg: "",
      data:[
        {text:'查询结果',active:true,status:'',isImagePrinted:''},
        {text:'已上报',active:false,status:'upload',isImagePrinted:''},
        {text:'已检查',active:false,status:'C',isImagePrinted:''},
        {text:'已审核',active:false,status:'A',isImagePrinted:''},
        {text:'未打印',active:false,status:'',isImagePrinted:'N'},
        {text:'已打印',active:false,status:'',isImagePrinted:'P'},
      ]
    };
  },
  methods: {
    isActive(index){
      this.data.map((item)=>{
        item.active = false;
      });
      this.data[index].active = true;
      this.$emit('Active',this.data[index].status,this.data[index].isImagePrinted);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/styleus/index.styl';

.centents {
  width: 100%;
  background-color: $bgNav;
}

ul {
  width: 100%;
  overflow: hidden;
}

li {
  width: 10%;
  height: 42px;
  float: left;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  line-height: 42px;
}

span {
  font-size: 18px;
}

.isActive{
  background-color: $blue;
  color: $colorWhite;
}
</style>