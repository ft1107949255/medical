<template>
  <div class="Collection_centents">
    <div class="Collection_heard">
      <ul class="ul">
      <li :key="index" v-for="(item,index) in data" @click="selectSort(index)">
        <img :src=item.img :alt="item.alt" :title="item.alt">
      </li>
    </ul>
    </div>
    <div class="Collection_tree" style="width:100%; height:460px; overflow-y: scroll; overflow-x: hidden" >
       <ul id="shuyuSelect" class="ztree" style=" width: 100%; cursor: pointer; " ></ul>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import  'ztree'
  import 'ztree/css/metroStyle/metroStyle.css'
import index from './treeTable/utils';
export default {
  data() {
    return {
      msg: "",
      ip: this.CONSTANT.CONSTANT.WEB_URL,
      token:localStorage.getItem('token') ,
      rowdata:{},
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
            onClick: this.shuyuOnClick,
            onExpand: this.shuyuOnExpand,
          }
        }
    }
  },
  methods: {
    getCollectionList(){
      var params=new Object();
          this.$http.post(this.ip + '/xhhms/rest/interCollectFolderController/v1/getlist', params, {
            headers: {
              'X-AUTH-TOKEN': this.token
            }
          }).then((res) => {
            var data = JSON.parse(res.data);
            console.log(data);
            this.rowdata={};
            if (!!data&&data.status=="1") {
              $.fn.zTree.init($("#shuyuSelect"), this.shuyusetting, data.data);
            } else {
              return false;
            }
          }, (err) => {
            console.log(err);
          });
    },
    shuyuOnClick(event, treeId, treeNode){
        this.rowdata.id=treeNode.id;
        this.rowdata.name=treeNode.name;
        this.rowdata.isParent=treeNode.isParent;
        this.$emit('ClickCollection',this.rowdata);
    },
    shuyuOnExpand(event, treeId, treeNode){
          var treeNodeId = treeNode.id;
          console.log('id',treeNodeId)
          if(treeNodeId == 0){
            return;
          }else{
          var params={};
          params.parentid=treeNodeId
          this.$http.post(this.ip + '/xhhms/rest/interCollectController/v1/getlistByPid', params, {
            headers: {
                 'X-AUTH-TOKEN': this.token
            }
          }).then((res) => {
            var data = JSON.parse(res.data);
            console.log(res);
            if (!!data&&data.status=="1") {
              var tree = $.fn.zTree.getZTreeObj("shuyuSelect");
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
        console.log('index',index)
        if(index == 2){
        var params={};
        params.id=this.rowdata.id;
            if(!this.rowdata.isParent){
              if(!this.rowdata.id){
               this.$message({
               message: '请在选择一个需要删除的收藏病例',
               type: 'warning'
               });
              }else{
                this.delete('/xhhms/rest/interCollectController/v1/del',params);
              }
            }else
            {
            if(!this.rowdata.id){
               this.$message({
              message: '请在选择一个需要删除的文件夹',
              type: 'warning'
              });
            }else{
                this.delete('/xhhms/rest/interCollectFolderController/v1/del',params);
            } 
          }
        }else if (index == 1 ){
            if(!this.rowdata.id){
               this.$message({
              message: '请在选择一个需要修改的文件夹',
              type: 'warning'
              });
            }else{
               this.$emit('selectCollection',index,this.rowdata);
            }
        }else{
           this.$emit('selectCollection', index,this.rowdata);
        }
    },
    delete(url,params){
     this.$http.post(this.ip +url, params,
    { headers: { 'X-AUTH-TOKEN': this.token }}
    ).then((res) => {
    var data = JSON.parse(res.data);
    if (data.status == 1) {
        this.$message({
        message: '删除成功',
        type: 'success'
        });
        this.getCollectionList();
    } else {
        console.log('失败')
        this.$message({
        message: '删除失败',
        type: 'error'
        });
        return false;
    }
    }).catch(err => {
    console.log(err);
    this.$message({
        message: '删除失败',
        type: 'error'
        });
    });
  },
  },
  created(){
      this.getCollectionList(); 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

.Collection_centents {
  width: 100%;
  background-color: $bgNav;
}

.Collection_heard {
  width: 100%;
  height: 40px;
  background-color: $bgGray;
}

.Collection_tree {
  width: 100%;
  height:460px;
  display inline-block;
  overflow-y auto;
  overflow-x :hidden;
  margin:0px 0px;
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
