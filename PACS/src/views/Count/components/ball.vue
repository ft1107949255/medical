<template>
    <div id="drag" >
      <div v-drag class="toolBarTitle move" @dblclick="click">{{buttonName}}</div>
    </div>
</template>

<script>
  export default {
    name: 'Window',
    props: {
      titlex: String,
      id: [String, Number]
    },
    data() {
      return {
        title: '标题',
        selectElement: '',
        buttonName: '全屏'
      }
    },
    directives:{
    drag(el){
     el.onmousedown = function(e){
       //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
       var divx = e.clientX - document.getElementById('drag').offsetLeft;
       var divy = e.clientY - document.getElementById('drag').offsetTop;
       //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
       document.onmousemove = function(e){
         //获取移动后div的位置：鼠标位置-divx/divy
         var l = e.clientX - divx;
         var t = e.clientY - divy;
         // 获取浏览器的宽度
         let width = '';
         let height = '';
         if (window.innerWidth)
            width = window.innerWidth;
         else if(document.body && document.body.clientWidth)
            width  = document.body.clientWidth;
         
         if (window.innerHeight)
            height = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            height = document.body.clientHeight;
         if(l > (width-50)) {
            l = width-50;
         }
         if(l < 0) {
            l = 0;
         }
         if(t > (height-50)) {
            t = (height-50);
         }
         if(t < 0) {
            t = 0;
         }
         document.getElementById('drag').style.left=l+'px';
         document.getElementById('drag').style.top=t+'px';
       }
       document.onmouseup = function(e){
         document.onmousemove = null;
         document.onmouseup = null;
       }
     }
    }
  },
  methods:{
   click() {
      if(this.buttonName === '全屏'){
        this.buttonName = '取消';
      } else {
        this.buttonName = '全屏';
      }
      this.$emit('click');
   }   
  },
 
}
</script>

<style scoped>
#drag{
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: absolute;
    font-size: 12px;
    top: 200px;
    left: 130px;
    color:#777;
    font-weight: bold;
    border:1px solid #777;
    border-radius: 20px;
    background: #d4d4d4;
    cursor: pointer;
    z-index: 200001;
}
</style>