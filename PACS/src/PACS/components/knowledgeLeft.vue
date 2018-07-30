<template>
  <div class="Knowledge_centents">
    <div class="Knowledge_heard">
      <ul class="ul">
      <li :key="index" v-for="(item,index) in data" @click="selectSort(index)">
        <img :src=item.img :alt="item.alt" :title="item.alt">
      </li>
    </ul>
    </div>
    <div class="Knowledge_tree" style="width:100%; height:460px; overflow-y: scroll; overflow-x: hidden" >
       <ul id="KnowledgeTree" class="ztree" style=" width: 100%; cursor: pointer; " ></ul>
    </div>
  </div>
</template>

<script>
  import  'ztree'
  import 'ztree/css/metroStyle/metroStyle.css'
  import $ from 'jquery'
export default {
  data() {
    return {
      msg: "",
      ip: this.CONSTANT.CONSTANT.WEB_URL,
      token:localStorage.getItem('token') ,
      folf:{},
      data: [
        {
          img: require("../../static/images/collection_add.png"),
          alt:'添加',
        },
        {
          img: require("../../static/images/collection_modify.png"),
          alt:'修改',
        },
        {
          img: require("../../static/images/collection_del.png"),
          alt:'删除',
        }],
    shuyusetting:{
          view: {
            showLine: false
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            onClick: this.KnowledgeOnClick,
            onExpand: this.KnowledgeOnExpand,
          }
        }
    }
  },
  created(){
      this.getKnowledgeList(); 
  },
  methods: {
    getKnowledgeList(){
        var params=new Object();
          this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/getKnowledge ', params, {
            headers: {
              'X-AUTH-TOKEN': this.token
            }
          }).then((res) => {
            var data = JSON.parse(res.data);
            console.log(data);
            if (!!data&&data.status=="1") {
              $.fn.zTree.init($("#KnowledgeTree"), this.shuyusetting, data.data);
            } else {
              return false;
            }
          }, (err) => {
            console.log(err);
          });
    },
    KnowledgeOnClick(event, treeId, treeNode){
        this.folf=treeNode;
        console.log('treeNode',treeNode)
        if(!treeNode.isParent){
          var acknowledgeid = treeNode.id;
          var params= {id:acknowledgeid};
          this.$http.post(this.ip+'/xhhms/rest/interRemoteReportController/v1/getKnowledgeByid', params, {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
          }).then((res) => {
            var data = JSON.parse(res.data);
            if (!!data&&data.status=="1") {
              // document.getElementById('edit-iframe').contentWindow.postMessage(JSON.stringify({"DescriptionToReport":data.data.description}),"*");
              // document.getElementById('edit-iframe').contentWindow.postMessage(JSON.stringify({"ConclusionToReport":data.data.conclusion}) ,"*");
              // this.description = data.data.description;
              // this.conclusion = data.data.conclusion;
            } else {
              return false;
            }
          }, (err) => {
                console.log(err);
          });
        }else{
          this.shuyuOnExpand(event, treeId, treeNode);
        }
      },
      KnowledgeOnExpand(event, treeId, treeNode){
          var treeNodeId = treeNode.id;
          if(treeNodeId == 0){
            return;
          }else{
          var params={parentid:treeNodeId};
          this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/getKnowledge', params, {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
          }).then((res) => {
            var data = JSON.parse(res.data);
            console.log("data");
            if (!!data&&data.status=="1") {
              var tree = $.fn.zTree.getZTreeObj("KnowledgeTree");
              if (!treeNode.zAsync){
                  tree.addNodes(treeNode, data.data);
                  treeNode.zAsync = true;
              } else{
                  tree.reAsyncChildNodes(treeNode, "refresh");
              }
            } else {
              return false;
            }
          }, (err) => {
                console.log(err);
          });
          }

      },
    selectSort(index){
       if(index==0){
        console.log(this.folf.id)
        if(this.folf.id || this.folf.id==0 ){
           if(this.folf.isParent){
             this.$emit('KnowledgeLeftClick',index,this.folf);
           }else{
               this.$message({
               message: '请选择需要添加的父节点',
                type: 'error'
              });
           }
        }else{
         this.$message({
            message: '请选择需要添加的父节点',
            type: 'error'
            });
        }
       }else if (index==1){
        if(this.folf.id || this.folf.id==0){
           this.$emit('KnowledgeLeftClick',index,this.folf);  
        }else{
            this.$message({
            message: '请选择需要修改的节点',
            type: 'error'
            });
            
        }
       }else{
        if(!this.folf.id){
          this.$message({
            message: '请选择需要删除的节点',
            type: 'error'
            });
        }else{
           this.$emit('deleteFole',this.folf);
        }
       }
    },



  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

.Knowledge_centents {
  width: 100%;
  background-color: $bgNav;
}

.Knowledge_heard {
  width: 100%;
  height  40px;
  background-color $bgGray;
}

.Knowledge_tree {
  width: 100%;
  height 460px;
  display inline-block;
  overflow-y auto;
  overflow-x hidden;
  margin 0px 0px;
}


.ul {
  width: 100%;
  overflow: hidden;
  margin-left :8px;
}

li {
  overflow: hidden;
  font-size: 0;
  float: left;
  cursor: pointer;
  margin-top :13px;
}

li:not(:last-child) {
  margin-right: 20px;
}

li>img {
  height : 15px;
  width  : 15px;
}
</style>