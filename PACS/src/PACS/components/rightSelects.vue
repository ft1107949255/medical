<template>
  <div class="block">
    <el-form :label-position="labelPosition" label-width="100px" :model="form" class="el-form" >
      <el-form-item label="影像质量" >
        <el-select v-model="form.imagetype" clearable placeholder="请选择" >
          <el-option label="甲等" value="A"></el-option>
          <el-option label="乙等" value="B"></el-option>
          <el-option label="丙等" value="C"></el-option>
          <el-option label="废图" value="D"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报告质量" >
        <el-select v-model="form.repevty" clearable placeholder="请选择" >
          <el-option  label="优" value="1"></el-option>
          <el-option label="良" value="2"></el-option>
          <el-option label="合格" value="3"></el-option>
          <el-option label="不合格" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阴阳未定性" >
        <el-select v-model="form.positivety" clearable placeholder="请选择" >
          <el-option label="阴" value="-1"></el-option>
          <el-option label="阳" value="1"></el-option>
          <el-option label="未定性" value="100"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="ICD10" >
        <el-input v-model="form.ICD" @focus="focus" ></el-input>
          <el-dialog
            title="ICD10"
            :visible.sync="dialogVisible"
            width="42%"
            :before-close="handleClose">
            <div style="width:100%; height:400px; overflow-y: scroll; overflow-x: hidden">
              <!--<doutrees :data="selectTree"  :defaultselectProps="defaultselectProps" @getselectTreeId="getselectTreeId" @getselectTreeInfo="getselectTreeInfo" />-->
              <ul id="shuyuSelecticd" class="ztree"    style=" width: 100%; cursor: pointer; " ></ul>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="OkDialog">确 定</el-button>
            </span>
          </el-dialog>
      </el-form-item>
      <el-form-item label="ACR" >
        <el-input  v-model="form.acrName"  @focus="doufocus"  ></el-input>
        <el-dialog
          title="提示"
          :visible.sync="dialogDouVisible"
          width="60%"
          height="400px"
          :before-close="handleClose">
          <div class="trees">
          <!--<doutrees :data="acrPartSelectTree"  :defaultselectProps="defaultselectProps" @getselectTreeId="getacrPartSelectTreeId" @getselectTreeInfo="getselectTreeInfo" />-->
            <ul id="shuyuSelectleft" class="ztree"    style=" width: 100%; cursor: pointer; " ></ul>
          </div>
          <div class="trees">
            <!--<doutrees :data="acrDiseaseSelectTree"  :defaultselectProps="defaultselectProps" @getselectTreeId="getacrDiseaseSelectTreeId" />-->
            <ul id="shuyuSelectright" class="ztree"    style=" width: 100%; cursor: pointer; " ></ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDouVisible = false">取 消</el-button>
            <el-button type="primary" @click="okAcrRight">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import trees from "./Trees1.vue";
  import doutrees from "./Trees2.vue";
  import $ from 'jquery'
  import  'ztree'
  import 'ztree/css/metroStyle/metroStyle.css'
  export default {
    components:{
      trees,
      doutrees,
    },
    data() {
      return {
        ip: this.CONSTANT.CONSTANT.WEB_URL,
        msg: "",
        dialogVisible: false,
        dialogDouVisible: false,
        labelPosition: 'top',
        form: {
          imagetype: '',
          repevty: '',
          positivety: '',
          ICD: '', // ICD10 name
          ICDID: '', // ICD10 ID
          acrIdLeft: '',
          acrIdRight: '',
          acrRightName:'',
          acrName:'',
        },
        defaultselectProps: {
          children: 'son',
          label: 'name'
        },
        selectTree:[],
        selectTreeInfo:{},
        acrPartSelectTree:[],
        acrPartSelectTreeInfo:{},
        acrDiseaseSelectTree:[],
        shuyusetting1:{
          view: {
            showLine: false
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            onClick: this.shuyuOnClick1,
            onExpand: this.shuyuOnExpand1,
          }
        },
        shuyusettingleft:{
          view: {
            showLine: false
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            onClick: this.shuyuOnClickleft,
            onExpand: this.shuyuOnExpandleft,
          }
        },
        shuyusettingright:{
          view: {
            showLine: false
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            onClick: this.shuyuOnClickright,
            onExpand: this.shuyuOnExpandright,
          }
        },
      }
    },
    created: function () {
      // this.getknowledgetselectreedata();
      // this.getacrPartSelectTreedata();
      // this.getacrDiseaseSelectTreedata();
    },
    mounted: function () {

    },
    methods: {
      focus(){
        console.log("进来了");
          this.dialogVisible = true;
        var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/idc10SelectTree', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);

          if (!!data&&data.status=="1") {
            console.log( data.data);
            $.fn.zTree.init($("#shuyuSelecticd"), this.shuyusetting1, data.data);
            console.log( data.data);
            // console.log(this.knowledgetreedata);
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        });
          // this.$refs.selectTree1.$refs.tree.setCheckedKeys([]);
      },
      handleClose(done) {
        done();
      },
      doufocus(){
        this.dialogDouVisible = true;
        var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/acrPartSelectTree', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);

          if (!!data&&data.status=="1") {
            console.log( data.data);
            $.fn.zTree.init($("#shuyuSelectleft"), this.shuyusettingleft, data.data);
            console.log( data.data);
            // console.log(this.knowledgetreedata);
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        });
        // 初始化右边的树
        var params=new Object();
        params.acrpartid = 0;
        params.id = 0;
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/acrDiseaseSelectTree', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);

          if (!!data&&data.status=="1") {
            console.log( data.data);
            $.fn.zTree.init($("#shuyuSelectright"), this.shuyusettingright, data.data);
            console.log( data.data);
            // console.log(this.knowledgetreedata);
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        });
      },
      OkDialog(){
        if(this.form.ICD==''){
          this.$message({
            showClose:true,
            message:'请选择ICD信息',
            type:'error',
          });
          return false;
        }
         this.dialogVisible = false;
         // this.form.ICD = this.selectTreeInfo.name;
         // this.form.ICDID = this.selectTreeInfo.id;
      },
      getknowledgetselectreedata () {
        var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/idc10SelectTree', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          //console.log(data);
          if (!!data&&data.status=="1") {
            console.log( 'a',data.data);
            let tmp = [];
            var i =0;
            data.data.map(item=>{
              item.index = i;
              //console.log(item);
              item.son = [];
              tmp.push(item);
              i++;
            })
            this.selectTree = tmp;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      getselectTreeId : function (father) {
        var params=new Object();
        params.parentid = father.id
        //console.log(father.id);
        // console.log(this.knowledgetreedata);
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/idc10SelectTree', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          if (!!data&&data.status=="1") {
            console.log('data--',data);
            var index = father.index ;
            //console.log(index)
            //console.log(this.knowledgetreedata[0].son[index].son);
            var i =0;
            data.data.map(item=>{
              item.index = index + '-'+  i;
              item.son = [];
              i++;
            })
            // console.log(data.data);
            //  console.log(data.data)
            // console.log(index);
            index = index.length> 1? index.split("-"):index;
            // console.log(index);
            if (index instanceof Array){
              // var Newdata = this.knowledgetreedata[0]['son'];
              console.log('进来了1');
              if( index.length === 2){
                console.log('进来了');
                this.selectTree[index[0]]['son'][index[1]]['son'] = data.data;
              }else if(index.length === 3){
                console.log('耳机',data.data)
                this.selectTree[index[0]]['son'][index[1]]['son'][index[2]]['son'] = data.data;
              }else if(index.length === 4){
                this.selectTree[index[0]]['son'][index[1]]['son'][index[2]]['son'][index[3]]['son'] = data.data;
              }
            }else{
              console.log('一级');
              this.selectTree[index]['son'] = data.data;
            }
            // console.log(Newdata);
            // this.knowledgetreedata[0]['son'][index]['son'] = data.data;
            // var a ="0-1-1";
            // this.knowledgetreedata[0].son[a.split("-")[0]].son[a.split("-")[1]].son[a.split("-")[2]] = data.data;
            // this.knowledgetreedata[0].son[a.split("-")[0]] +'.son'[]
            // this.knowledgetreedata[0].son.map(item=>{
            //   if (item.id === data.id){
            //     item.son = data.data;
            //   }
            // })
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      getselectTreeInfo: function (val) {
        console.log(val)
        this.selectTreeInfo = val;
      },
      getacrPartSelectTreedata () {
        var params=new Object();
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/acrPartSelectTree', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          //console.log(data);
          if (!!data&&data.status=="1") {
            console.log( 'a',data.data);
            let tmp = [];
            var i =0;
            data.data.map(item=>{
              item.index = i;
              //console.log(item);
              item.son = [];
              tmp.push(item);
              i++;
            })
            this.acrPartSelectTree = tmp;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      getacrPartSelectTreeId : function (father) {
        var params=new Object();
        params.parentid = father.id
        //console.log(father.id);
        // console.log(this.knowledgetreedata);
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/acrPartSelectTree', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          if (!!data&&data.status=="1") {
            console.log('data--',data);
            var index = father.index ;
            //console.log(index)
            //console.log(this.knowledgetreedata[0].son[index].son);
            var i =0;
            data.data.map(item=>{
              item.index = index + '-'+  i;
              item.son = [];
              i++;
            })
            // console.log(data.data);
            //  console.log(data.data)
            // console.log(index);
            index = index.length> 1? index.split("-"):index;
            // console.log(index);
            if (index instanceof Array){
              // var Newdata = this.knowledgetreedata[0]['son'];
              console.log('进来了1');
              if( index.length === 2){
                console.log('进来了');
                this.acrPartSelectTree[index[0]]['son'][index[1]]['son'] = data.data;
              }else if(index.length === 3){
                console.log('耳机',data.data)
                this.acrPartSelectTree[index[0]]['son'][index[1]]['son'][index[2]]['son'] = data.data;
              }else if(index.length === 4){
                this.acrPartSelectTree[index[0]]['son'][index[1]]['son'][index[2]]['son'][index[3]]['son'] = data.data;
              }
            }else{
              console.log('一级');
              this.acrPartSelectTree[index]['son'] = data.data;
            }
            // console.log(Newdata);
            // this.knowledgetreedata[0]['son'][index]['son'] = data.data;
            // var a ="0-1-1";
            // this.knowledgetreedata[0].son[a.split("-")[0]].son[a.split("-")[1]].son[a.split("-")[2]] = data.data;
            // this.knowledgetreedata[0].son[a.split("-")[0]] +'.son'[]
            // this.knowledgetreedata[0].son.map(item=>{
            //   if (item.id === data.id){
            //     item.son = data.data;
            //   }
            // })
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      getacrDiseaseSelectTreedata(){
        var params=new Object();
        params.acrpartid = 0;
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/acrDiseaseSelectTree', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          console.log('right------------',data);
          if (!!data&&data.status=="1") {
            console.log( 'a',data.data);
            let tmp = [];
            var i =0;
            data.data.map(item=>{
              item.index = i;
              //console.log(item);
              item.son = [];
              tmp.push(item);
              i++;
            })
            this.acrDiseaseSelectTree = tmp;
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      getacrDiseaseSelectTreeId : function (father) {
        var params=new Object();
        params.parentid = father.id;
        params.acrpartid = 0;
        //console.log(father.id);
        // console.log(this.knowledgetreedata);
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/acrDiseaseSelectTree', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          if (!!data&&data.status=="1") {
            console.log('data--',data);
            var index = father.index ;
            //console.log(index)
            //console.log(this.knowledgetreedata[0].son[index].son);
            var i =0;
            data.data.map(item=>{
              item.index = index + '-'+  i;
              item.son = [];
              i++;
            })
            // console.log(data.data);
            //  console.log(data.data)
            // console.log(index);
            index = index.length> 1? index.split("-"):index;
            // console.log(index);
            if (index instanceof Array){
              // var Newdata = this.knowledgetreedata[0]['son'];
              console.log('进来了1');
              if( index.length === 2){
                console.log('进来了');
                this.acrDiseaseSelectTree[index[0]]['son'][index[1]]['son'] = data.data;
              }else if(index.length === 3){
                console.log('耳机',data.data)
                this.acrDiseaseSelectTree[index[0]]['son'][index[1]]['son'][index[2]]['son'] = data.data;
              }else if(index.length === 4){
                this.acrDiseaseSelectTree[index[0]]['son'][index[1]]['son'][index[2]]['son'][index[3]]['son'] = data.data;
              }
            }else{
              console.log('一级');
              this.acrDiseaseSelectTree[index]['son'] = data.data;
            }
            // console.log(Newdata);
            // this.knowledgetreedata[0]['son'][index]['son'] = data.data;
            // var a ="0-1-1";
            // this.knowledgetreedata[0].son[a.split("-")[0]].son[a.split("-")[1]].son[a.split("-")[2]] = data.data;
            // this.knowledgetreedata[0].son[a.split("-")[0]] +'.son'[]
            // this.knowledgetreedata[0].son.map(item=>{
            //   if (item.id === data.id){
            //     item.son = data.data;
            //   }
            // })
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        })
      },
      shuyuOnClick1(event, treeId, treeNode){
        if(!treeNode.isParent){
          var acknowledgeid = treeNode.id;
          var params= {id:acknowledgeid};
          this.$http.post(this.ip+'/xhhms/rest/interRemoteReportController/v1/idc10SelectTree', params, {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
          }).then((res) => {
            var data = JSON.parse(res.data);
            if (!!data&&data.status=="1") {
              this.form.ICD = treeNode.name;
              this.form.ICDID = treeNode.id;
            } else {
              return false;
            }
          }, (err) => {
            console.log(err);
          });
        }else{
          this.shuyuOnExpand1(event, treeId, treeNode);
        }
      },
      shuyuOnExpand1(event, treeId, treeNode){
        console.log("shuyuOnExpand");
        var treeNodeId = treeNode.id;
        if(treeNodeId == 0){
          return;
        }else{
          var params={parentid:treeNodeId};
          this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/idc10SelectTree', params, {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
          }).then((res) => {
            var data = JSON.parse(res.data);
            console.log("data");
            if (!!data&&data.status=="1") {
              var tree = $.fn.zTree.getZTreeObj("shuyuSelecticd");
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
      shuyuOnClickleft(event, treeId, treeNode){
        if(!treeNode.isParent){
          // var acknowledgeid = treeNode.id;
          // var params= {id:acknowledgeid};
          var params= new Object();
          params.acrpartid = 0;
          params.id = treeNode.id;
          this.form.acrIdLeft = treeNode.id;
          console.log('左边的叶子节点--',treeNode.id);
          this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/acrDiseaseSelectTree', params, {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
          }).then((res) => {
            var data = JSON.parse(res.data);
            console.log("data");
            if (!!data&&data.status=="1") {
              console.log( data.data);
              $.fn.zTree.init($("#shuyuSelectright"), this.shuyusettingright, data.data);
            } else {
              return false;
            }
          }, (err) => {
            console.log(err);
          });

          /*this.$http.post(this.ip+'/xhhms/rest/interRemoteReportController/v1/acrPartSelectTree', params, {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
          }).then((res) => {
            var data = JSON.parse(res.data);
            if (!!data&&data.status=="1") {
              console.log(data.data);

            } else {
              return false;
            }
          }, (err) => {
            console.log(err);
          });*/
        }else{
          this.shuyuOnExpandleft(event, treeId, treeNode);
          
        }
      },
      shuyuOnExpandleft(event, treeId, treeNode){
        console.log("shuyuOnExpand");
        var treeNodeId = treeNode.id;
        if(treeNodeId == 0){
          return;
        }else{
          var params={parentid:treeNodeId};
          this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/acrPartSelectTree', params, {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
          }).then((res) => {
            var data = JSON.parse(res.data);
            console.log("data");
            if (!!data&&data.status=="1") {
              var tree = $.fn.zTree.getZTreeObj("shuyuSelectleft");
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
      shuyuOnClickright(event, treeId, treeNode){
        if(!treeNode.isParent){
          var acknowledgeid = treeNode.id;
          var params= {id:acknowledgeid};
          params.acrpartid = 0;
          this.form.acrIdRight = treeNode.id;
          this.form.acrRightName = treeNode.name;
          console.log('右边的叶子节点----',treeNode.id,treeNode.name);
          this.$http.post(this.ip+'/xhhms/rest/interRemoteReportController/v1/acrDiseaseSelectTree', params, {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
          }).then((res) => {
            var data = JSON.parse(res.data);
            if (!!data&&data.status=="1") {
              console.log(data.data);
            } else {
              return false;
            }
          }, (err) => {
            console.log(err);
          });
        }else{
          this.shuyuOnExpandright(event, treeId, treeNode);
        }
      },
      shuyuOnExpandright(event, treeId, treeNode){
        console.log("shuyuOnExpand");
        var treeNodeId = treeNode.id;
        if(treeNodeId == 0){
          return;
        }else{
          var params={parentid:treeNodeId};
          params.acrpartid = 0;
          //id:$("#acrdiseaseid").val()
          //{parentid:treeNodeId,acrpartid:$("#acrpartid").val(),id:$("#acrdiseaseid").val()},
          this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/acrDiseaseSelectTree', params, {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
          }).then((res) => {
            var data = JSON.parse(res.data);

            if (!!data&&data.status=="1") {
              console.log(data.data);
              var tree = $.fn.zTree.getZTreeObj("shuyuSelectright");
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
      okAcrRight: function(){
      if(this.form.acrIdLeft ==''){
          this.$message({
            showClose: true,
            message: '请选择左侧树叶子节点，再选择右侧树叶子节点，',
            type: 'error'
          });
          return false;
      }
      if(this.form.acrIdRight ==''){
          this.$message({
            showClose: true,
            message: '请选择左侧树叶子节点，再选择右侧树叶子节点，',
            type: 'error'
          });
          return false;
      }  
       this.dialogDouVisible = false;
       this.form.acrName = this.form.acrRightName
      //  console.log('this.form.acrRightName');
      //  this.$emit('getAcrRightName', this.form.acrRightName); 
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../common/styleus/index.styl';

  .block {
    width: 100%;
    height: 785px;
    margin :auto;
  }

  .el-form{
    margin-left  :5%;
    width: 90%;
  }

.el-select-dropdown/deep/ .el-select-dropdown__item {
  font-size:12px;   
} 

 .trees{
   height:400 px;
   width 47.5%;
   display inline-block;
   border 1px solid $bgGray ;
   overflow-y auto;
   overflow-x :hidden;
   margin:0px 8px;
 }
 .el-select{
    width: 85%;
 }
  .el-input{
     width: 85%;
  }

  .el-dialog{
    height:600px !important;
    overflow-y: scroll !important;
  }
  .el-form-item{
    margin-top:10px;
    margin-bottom:10px !important;
  }


</style>
