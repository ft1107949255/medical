<template>
  <div class="centent">
    <nav>
      <ul class="ul">
        <li @click="isActive(index,item.type)" :class="{isActive:item.active}" :key="index" v-for="(item,index) in data1">
          {{item.text}} <span>{{item.number}}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: ['data1'],
  data() {
    return {
      msg: "",
      //data1:[]
    };
  },
  methods: {
    isActive(index, type){
      this.data1.map((item)=>{
        item.active = false;
        this.$emit('getIndex', index)  // 传递给父页面参数
      });
      this.data1[index].active = true;
    }
  },
  // created(){
  //   this.data1=this.data;
  // },
  // watch:{
  //   data(newval,oldval){
  //      if(newval){
  //         console.log('传递新的值---',newval);
  //         this.data1=newval;
  //      }
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

.centent {
  width: 100%;
  margin-top: 10px;
  // background-color: $bottomNav;
}

ul {
  width: 100%;
  overflow: hidden;
}

li {
  width: 100px;
  height: 30px;
  float: left;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  // border-radius:4px;
  background-color:#b0b1b2;
  margin-right: 5px;
}
.ul{}
span {
  font-size: 17px;
}

.isActive{
  background-color: $blue;
  color: $colorWhite;
}
</style>
