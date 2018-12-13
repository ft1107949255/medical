
<template>
  <div class="edit">
      <!-- <header>
        <editNav />
      </header> -->
      <div class="centent">
        <div class="left">
          <div class="left_tree">
            <div class="left_header"><span style="color:#606266">术语</span></div>
            <!--s-->
            <!--tree1 :data="knowledgetreedata" :defaultProps="defaultProps" @getTreeId="getTreeId"/-->
            <div  style="cursor: pointer;min-height: 200px; max-height:280px; overflow-y: auto; overflow-x:hidden;" >
              <ul id="shuyuSelect" class="ztree"    style=" width: 100%; height: 30%;overflow:auto;cursor: pointer; " ></ul>
            </div>
            <div class="radio">
              <el-radio-group v-model="models" @change="clickitem">
                <el-radio   v-model="models" label="1"  value="1">替换</el-radio>
                <el-radio   v-model="models" checked  label="2" value="2">追加</el-radio>
              </el-radio-group>
            </div>
            <div class="kuang">
                <editkuang ref="kuang1" :name="name1" :content="description" @sendcontent="sendDescription"/>
                <editkuang ref="kuang2" :name="name2" :content="conclusion" @sendcontent="sendConclusion"/>
            </div>
            <div class="img_button">
              <img style="cursor: pointer;" @click="showKnowledge" src="../../static/images/icon/img_button0.png" title="知识库"/>
              <img style="cursor: pointer;" @click="addTwoInfo" src="../../static/images/icon/img_button2.png" title="添加"/>
              <!-- <img class="img_right" src="../../static/images/icon/img_button1.png" />-->
            </div> 
          </div>
        </div>
        <div class="center">
          <img class="btnbtn" @click="backClick" src='../../static/images/icon/back.png' title="返回"/>
         <img class="btnbtn" @click="opensave" src='../../static/images/icon/save.png' title="保存"/>
          <img class="btnbtn" @click="reportNote" src="../../static/images/icon/reportBeizhu.png" title="报告备注" />
          <img class="btnbtn" @click="seeMedia" src="../../static/images/icon/seeMedia.png" title="查看影像"/>
          <img :class="btnbtnfushen" @click="clickPrint" title="打印" src="../../static/images/icon/print.png"/>
            <div id="print_div">
            <iframe class="" v-show="true" id="edit-iframe"
            frameborder=0 name="showHere" scrolling="no"
            style="width: 100%;height:800px; min-width: 900px; margin: 0 auto;"
            src="">
            </iframe>
            </div>
        </div>
        <div class="right" ><right ref="forms" /></div>
        <footer id="footer"> 
          <foot-nav :theIndex="3" :data="MainData"/>
         </footer>
        <el-dialog
          title="会诊记录"
          :visible.sync="zhenduanReportVisable"
          width="30%">
          <div v-if="zhenduanreportList.length >0">
            <div style="width:100%; height:400px;  overflow-y: auto;">
              <!--<doutrees :data="selectTree"  :defaultselectProps="defaultselectProps" @getselectTreeId="getselectTreeId" @getselectTreeInfo="getselectTreeInfo" />-->
              <div  style="width:500px; margin: 10px auto; border-bottom:1px dashed #606266;" v-for="(item,index) in zhenduanreportList" v-bind:key="index">
                <div style="margin-top: 10px;">
                  <span>记录{{index +1}}</span>
                  <span>会诊医生：{{item.doctorname}}</span>
                  <span>报告时间：{{item.reportDate}}</span>
                  <!-- <span >{{statusList[item.status]}}</span> -->
                </div>
                <div style="width:500px; word-break:break-all">
                  <div style="margin: 20px 0px;">
                    检查所见：<span v-html="item.conclusion"></span>
                  </div>
                  <div>
                    检查提示：<span v-html="item.imageDescribe"></span>
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-top: 10px;">
              <page />
            </div>
          </div>
          <div v-else style="text-align: center">
            暂无记录
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="zhenduanReportVisable = false">确 定</el-button>
              <!--<el-button type="primary" @click="OkDialogZhenduanReport">确 定</el-button>-->
            </span>
        </el-dialog>
        <el-dialog
          title="报告备注"
          :visible.sync="ReportBeizhuVisable"
          width="30%">
          <div style="width:100%; height:300px;  overflow-y: auto;">
            <!--<doutrees :data="selectTree"  :defaultselectProps="defaultselectProps" @getselectTreeId="getselectTreeId" @getselectTreeInfo="getselectTreeInfo" />-->
           <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入备注内容"
            v-model="textareaReportBeizhu">
          </el-input>
            <span>{{beizhumsg}}</span>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="ReportBeizhuVisable = false">取 消</el-button>
              <el-button type="primary" @click="OkDialogReportBeizhu">提 交</el-button>
            </span>
        </el-dialog>
        <el-dialog
          title="警告"
          :visible.sync="savedialog"
          width="30%">
          <span>确定保存么？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="savedialog = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="警告"
          :visible.sync="noPassdialog"
          width="30%">
          <span>确定驳回么？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="noPassdialog = false">取 消</el-button>
            <el-button type="primary" @click="noPass">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="警告"
          :visible.sync="senddialog"
          width="30%">
          <span>确定发送么？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="senddialog = false">取 消</el-button>
            <el-button type="primary" @click="send">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="警告"
          :visible.sync="cancelsenddialog"
          width="30%">
          <span>确定取消发送么？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelsenddialog = false">取 消</el-button>
            <el-button type="primary" @click="cancelSend">确 定</el-button>
          </span>
        </el-dialog>
      </div>
       
   <!-- 收藏夹弹出框 -->
     <div>
       <el-dialog
          title="知识库管理"
          :visible.sync="knowledgeBase"
          width="60%"
          center
          :before-close="handleClose"
          >
          <hr/>
          <div class="leftClass">
           <knowledgeleft ref="knowledgeleft" @KnowledgeLeftClick="leftClick" @deleteFole="deleteFole"/>
          </div>
          <div class="rightClass">
            <knowledgeright ref="knowledgeright" :index="knowledgeIndex"  :thisVal="knowledgeDic" @leftFresh="FreshClick"/>
          </div>

          <el-dialog
              width="30%"
              title="确定删除该目标节点吗？"
              :visible.sync="innerVisible"
              center
              append-to-body>
           <div slot="footer" class="dialog-footer">
              <el-button @click="innerVisible = false">取 消</el-button>
              <el-button type="primary" @click="delectClick">确定</el-button>
            </div>
          </el-dialog>
        </el-dialog>
    </div>
  </div>
</template>

<script>
  import  'ztree'
  import 'ztree/css/metroStyle/metroStyle.css'
  import $ from 'jquery'
  import axios from 'axios';
  import tree1 from './../components/trees/Trees1.vue';
  import editCentent from "./../components/EditCom/EditCentent.vue";
  import page from './../components/table/Pagination'
  import editkuang from './../components/EditCom/Editkuang.vue'
  import right from "./../components/rightSelects.vue";
  import knowledgeleft from "./../components/knowledge/knowledgeLeft.vue";
  import knowledgeright from "./../components/knowledge/knowledgeRight.vue";
  import footNav from "./../components/FooterNav.vue";
  export default {
    components: {
      editCentent,
      tree1,
      editkuang,
      right,
      page,
      knowledgeleft,
      knowledgeright,
      footNav
    },
    data() {
      return {
        msg: "",
        ip: this.CONSTANT.CONSTANT.WEB_URL,
        ip1: this.CONSTANT.CONSTANT.WEB_IP,
        token:localStorage.getItem('token'),
        MainData:JSON.parse(localStorage.getItem('nume')),
        id:this.$route.query.consultationid ? this.$route.query.consultationid: '' ,
        pid: this.$route.query.patientid ? this.$route.query.patientid: '' ,
        datatype:this.$route.query.type,
        name1: '检查所见',
        name2: '检查提示',
        models: '2',
        defaultProps: {
          children: 'son',
          label: 'name'
        },
        knowledgetreedata:[],
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
        },
        description:'',
        conclusion:'',
        zhenduanReportVisable: false,
        ReportBeizhuVisable: false,
        knowledgeBase: false,
        innerVisible:false,
        knowledgeIndex:'',
        knowledgeDic:{},
        delectDic:{},
        zhenduanreportList:[],
        textareaReportBeizhu: '',
        beizhumsg: '',  // 备注内容错误信息提示
        statusList: {
          F: '已归档',
          E: '上级撤销',
          V: '已复审',
          R: '已诊断',
          D: '草稿',
          C: '已检查',
          I: '检查中',
          T: '已分诊',
          S: '已预约',
          A: '已审核',
          X: '出诊',
        },
        status: '已分诊',
        imagetype: '',
        repevty: '',
        positivety: '',
        ICD: '',
        ICDID: '',
        acr:'',
        acrId: '',
        savedialog: false,
        noPassdialog: false,
        senddialog: false,
        cancelsenddialog: false,
        chuzhen: false,
        fushen: false,
        shenhe: false,
        btnbtnchuzhen: ['btnbtn'],
        btnbtnshenhe: ['btnbtn'],
        btnbtnfushen: ['btnbtn'],
        btnbtnnopass:['btnbtn'],
        btnbtnsend:['btnbtn'],
        btnbtncancelsend:['btnbtn'],
        nopass:false,
        sendbtn:false,
        cancelsend:false,
        url:'',
        // btnbtn: 'btnbtn',
        // color:'fontColor',
      };
    },
    created: function () {
      // this.getTree1();
      // this.getknowledgetreedata();
      // 如果当前缺少id，就跳转到上一页
      if(this.id ===''){
        this.$message({
          showClose: true,
          message: '缺少consulationid!!,请回到主页面进入。',
          type: 'error'
        });
        var that  = this
        window.setTimeout(function () {
          that.$router.push('/consultation');
        },3000)
      }
      // 获取当前patientid的病人的影响质量，报告质量，阴阳未定性
      this.getPatientInfo();
    },
    beforeMount: function () {
    },
    mounted: function () {
     const oIframe = document.getElementById('edit-iframe');
     // console.log("http://127.0.0.1:8080/xhhms/remoteReportController.do?goEdit&id=1&jwtstr="+this.token)
     // this.id=1;
     if(this.datatype==2){
        oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationEdit&id="+this.id+"&jwtstr="+this.token;
     }else{
       oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationMyEdit&id="+this.id+"&jwtstr="+this.token;
     }
     
     //$.fn.zTree.init($("#shuyuSelect"), this.shuyusetting, this.knowledgetreedata);
      var that =  this;
      window.addEventListener('message',function(res){
        console.log('------save',res);
        if(res.data && !res.data.hasOwnProperty('type')){
          var data =JSON.parse(res.data);
          console.log('-----',data.doSave);
          if(data.doSave){
            var params=data.doSave;
            if(params.description =='' || params.conclusion ==''){
              this.$message({
                showClose: true,
                message: '请填写检查提示和检查所见',
                type:'error',
              });
              return false;
            }
            if(that.datatype==2){
              that.url = "/xhhms/rest/interRemoteReportController/v1/saveConsulation";
            }else{
              that.url = '/xhhms/rest/interRemoteReportController/v1/saveMyConsulation';
            }
            // console.log(that.url);
            that.$http.post(that.ip + that.url, params, {
              headers: {
                'X-AUTH-TOKEN': this.token
              }
            }).then((res) => {
              var data = JSON.parse(res.data);
              console.log('数据---',data);
              if (data.status== 1 ) {
                console.log('成功');
                 that.$message({
                   showClose: true,
                    message: '操作成功',
                    type: 'success'
                });
                if(this.datatype==2){
                  oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationEdit&id="+this.id+"&jwtstr="+this.token;
                }else{
                  oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationMyEdit&id="+this.id+"&jwtstr="+this.token;
                }
                this.getPatientInfo();
              } else {
                 that.$message({
                   showClose: true,
                    message: '操作失败',
                    type: 'error'
                });
                return false;
              }
            }, (err) => {
              console.log(err);
            });
          }else if(data.doPrint){
            // 开始打印信息
            console.log(data.doPrint);
            let newContent =data.doPrint;
            let oldContent = document.body.innerHTML;
            document.body.innerHTML = newContent;
            window.print();
            window.location.reload();
            document.body.innerHTML = oldContent;
            return false;
          }
        }

      });

      var params=new Object();
          this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/getKnowledge', params, {
            headers: {
              'X-AUTH-TOKEN': this.token
            }
          }).then((res) => {
            var data = JSON.parse(res.data);
            //console.log(data);
            if (!!data&&data.status=="1") {
              $.fn.zTree.init($("#shuyuSelect"), this.shuyusetting, data.data);
              var treeObj = $.fn.zTree.getZTreeObj("shuyuSelect");
               var nodes = treeObj.getNodes();
              // treeObj.expandAll(nodes[0],false);
             	treeObj.expandNode(nodes[0]);
              // console.log(this.knowledgetreedata);
            } else {
              return false;
            }
          }, (err) => {
            console.log(err);
          });
    },
    beforeUpdate: function () {
    },
    updated: function () {

    },
    methods:{

      getknowledgetreedata () {
          var params=new Object();
          this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/getKnowledge', params, {
            headers: {
              'X-AUTH-TOKEN': this.token
            }
          }).then((res) => {
            var data = JSON.parse(res.data);
            //console.log(data);
            if (!!data&&data.status=="1") {
              //console.log(data.data[0].name);
              let tmp = {};
              tmp.name = data.data[0].name;
              tmp.id = data.data[0].id;
              tmp.son = [];
              var i =0;
              data.data.map(item=>{
                item.index = i-1;
                //console.log(item);
                if (item.id !==0){
                    console.log(item);
                    item.son = [];
                    tmp.son.push(item);
                }
                i++;
              })
              // console.log(data.data)
              this.knowledgetreedata.push(tmp);
              // console.log(this.knowledgetreedata);
            } else {
              return false;
            }
          }, (err) => {
            console.log(err);
          });
        },
      getTree1 :function () {

      },
      showKnowledge() {
        this.knowledgeBase = true;
      },
      handleClose(done) {
        this.FreshClick();
        this.$refs.knowledgeright.closeTheShow();
        done();
      },
      leftClick(index,val){
         this.knowledgeIndex=index;
         this.knowledgeDic=val;
      },
      deleteFole(val){ // 点击删除按钮  弹出嵌套弹框
        this.innerVisible =true;
        this.delectDic=val;
      },
      delectClick(){ //确认删除
        var params={};
        params.id=this.delectDic.id;
        this.$http.post(this.ip +'/xhhms/rest/interDiagKnowledgeBaseController/v1/del', params,
        { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
        var data = JSON.parse(res.data);
        if (data.status == 1) {
            console.log(data)
            this.$message({
            message: '删除成功',
            type: 'success'
            });
          this.FreshClick();
          this.delectDic={};
          this.$refs.knowledgeright.closeTheShow();
          this.innerVisible =false;
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
      FreshClick(){
        this.$refs.knowledgeleft.getKnowledgeList();
      },
      getTreeId : function (father) {
        console.log(father);
        var params=new Object();
        params.parentid = father.id
        //console.log(father.id);
        // console.log(this.knowledgetreedata);
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/getKnowledge', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          if (!!data&&data.status=="1") {
            console.log('father---',father);
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
            console.log(index);
            if (index instanceof Array){
              var Newdata = this.knowledgetreedata[0]['son'];
              index.map(item=>{
                  Newdata = Newdata[item]['son'];
              })
                Newdata = data.data;
            }else{
              this.knowledgetreedata[0]['son'][index]['son'] = data.data;
            }
            console.log(this.knowledgetreedata);
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

      clickitem(value){
          if(value==1){
             document.getElementById('edit-iframe').contentWindow.postMessage('{"replace":true}',"*");
          }else if(value==2){

             document.getElementById('edit-iframe').contentWindow.postMessage('{"append":true}',"*");//父向子传递
          }
      },
      shuyuOnClick(event, treeId, treeNode){
        if(!treeNode.isParent){
          var acknowledgeid = treeNode.id;
          var params= {id:acknowledgeid};
          this.$http.post(this.ip+'/xhhms/rest/interRemoteReportController/v1/getKnowledgeByid', params, {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
          }).then((res) => {
            var data = JSON.parse(res.data);
            if (!!data&&data.status=="1") {
              //console.log(data.data);
              document.getElementById('edit-iframe').contentWindow.postMessage(JSON.stringify({"DescriptionToReport":data.data.description}),"*");
              document.getElementById('edit-iframe').contentWindow.postMessage(JSON.stringify({"ConclusionToReport":data.data.conclusion}) ,"*");
              this.description = data.data.description;
              this.conclusion = data.data.conclusion;
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
      shuyuOnExpand(event, treeId, treeNode){
        console.log("shuyuOnExpand");
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
      save: function () {
        // 关闭对话框
        this.savedialog = false;
        // 保存信息
        var params = new Object();
        params.consulationid = this.id;
        params.token = this.token;
        params.id = this.pid;
        console.log(params);
        // var form = this.$refs.forms.form;
        // console.log(form);
        // if(form.imagetype !==''){
        //   params.imagetype = form.imagetype;
        // }
        // if(form.repevty !==''){
        //   params.repevty = form.repevty;
        // }
        // if(form.positivety !== ''){
        //   params.positivety = form.positivety;
        // }
        // if(form.ICD !== '' && form.ICD !=='undefined'){
        //   console.log(form.ICD);
        //   params.ICD = form.ICD;
        //   params.ICDID = form.ICDID
        // }
        // if(form.acr !=='' && form.acr !=='undefined'){
        //   params.acr = form.acr;
        //   params.acrId = form.acrId;
        // }
        // console.log(params);
        document.getElementById('edit-iframe').contentWindow.postMessage(JSON.stringify({"saveReport":params}),"*");
      },
      send: function () {
        // 关闭对话框
        this.senddialog = false;
        // 发送
        var params = new Object();
        params.id = this.id;
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/doSend', params, {
          headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
        }).then((res) => {
          var data = JSON.parse(res.data);
          if (!!data&&data.status=="1") {
            console.log(data.data);
            console.log('发送成功');
            this.$message({
                showClose: true,
                message: '发送成功',
                type: 'success'
            });
            const oIframe = document.getElementById('edit-iframe');
            if(this.datatype==2){
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationEdit&id="+this.id+"&jwtstr="+this.token;
            }else{
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationMyEdit&id="+this.id+"&jwtstr="+this.token;
            }
            this.getPatientInfo();
          } else {
            this.$message({
              showClose: true,
              message: '发送失败',
              type: 'error'
            });
            return false;
          }
        }, (err) => {
          console.log(err);
        });
      },
      noPass: function () {
        // 关闭对话框
        this.noPassdialog = false;
        //  驳回内容
        var params = new Object();
        params.id = this.id;
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/goReject', params, {
          headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
        }).then((res) => {
          var data = JSON.parse(res.data);
          if (!!data&&data.status=="1") {
            console.log(data.data);
            console.log('驳回成功');
            this.$message({
              showClose: true,
              message: '驳回成功',
              type: 'success'
            });
            const oIframe = document.getElementById('edit-iframe');
            if(this.datatype==2){
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationEdit&id="+this.id+"&jwtstr="+this.token;
            }else{
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationMyEdit&id="+this.id+"&jwtstr="+this.token;
            }
            this.getPatientInfo();
          } else {
            this.$message({
              showClose: true,
              message: '驳回失败',
              type: 'error'
            });
            return false;
          }
        }, (err) => {
          console.log(err);
        });
      },
      cancelSend: function () {
        // 关闭对话框
        this.cancelsenddialog = false;
        // 发送
        var params = new Object();
        params.id = this.id;
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/doCancelSend', params, {
          headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
        }).then((res) => {
          var data = JSON.parse(res.data);
          if (!!data&&data.status=="1") {
            console.log(data.data);
            console.log('取消发送成功');
            this.$message({
              showClose: true,
              message: '取消发送成功',
              type: 'success'
            });
            const oIframe = document.getElementById('edit-iframe');
            if(this.datatype==2){
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationEdit&id="+this.id+"&jwtstr="+this.token;
            }else{
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationMyEdit&id="+this.id+"&jwtstr="+this.token;
            }
            this.getPatientInfo();
          } else {
            this.$message({
              showClose: true,
              message: '取消发送失败',
              type: 'error'
            });
            return false;
          }
        }, (err) => {
          console.log(err);
        });
      },
      chargeReport: function () {
        //this.zhenduanreport();
        this.zhenduanReportVisable = true;
        //id  home页面的传递过来
        var params={id:this.pid};
        this.$http.post(this.ip + '/xhhms/rest/interMedicalConsultationApplyController/v1/getConsulationList', params, {
          headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
        }).then((res) => {
          var data = JSON.parse(res.data);
          console.log('会诊记录----',data.data);
          if (!!data) {
            this.zhenduanreportList=[];
            data.data.map(item=>{
              console.log(item.imageDescribe);
              // if(typeof(item.imageDescribe) =='undefined'){
              //     console.log(1);
              // }
              if(typeof(item.imageDescribe) !=='undefined' && typeof(item.imageDescribe) !=='undefined'){
                item.imageDescribe = unescape(item.imageDescribe);
                item.conclusion = unescape(item.conclusion);
                let d = new Date(item.reportDate);
                item.reportDate = d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
                this.zhenduanreportList.push(item);
              }
            })
            // this.zhenduanreportList = data.data;
            // // console.log(data.data[0]);
             console.log(this.zhenduanreportList[0]);
            
          } else {
            return false;
          }
        }, (err) => {
          console.log(err);
        });
      },
      reportNote: function () {
        this.ReportBeizhuVisable = true;
      },
      // seeMedia: function () {

      // },
      sendDescription:function (val) {
        console.log(11);
        if(val !=''){
          document.getElementById('edit-iframe').contentWindow.postMessage(JSON.stringify({"DescriptionToReport":val}),"*");
        }else{
          this.$message({
            showClose: true,
            message: '请填写检查所见',
            type: 'error',
          });
        }
        
      },
      sendConclusion:function (val) {
        if(val !=''){
            document.getElementById('edit-iframe').contentWindow.postMessage(JSON.stringify({"ConclusionToReport":val}),"*");
        }else{
          this.$message({
            showClose: true,
            message: '请填写检查提示',
            type: 'error',
          });
        }
        
      },
      zhenduanreport:function () {
        // 打开框
      },
      OkDialogReportBeizhu: function () {
        if (this.textareaReportBeizhu !== '') {
          // 提交备注内容
          var params = new Object();
          params.id = this.pid;
          params.remark = this.textareaReportBeizhu;
          console.log(params);
          this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/doRemark', params, {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('token')}
          }).then((res) => {
            // console.log(res.data);
            var data = JSON.parse(res.data);
            console.log(data);
            if (!!data && data.status == "1") {
                console.log(data.data);
                console.log('报告备注添加成功');
                this.$message({
                  showClose: true,
                  message: '报告备注添加成功',
                  type: 'success'
                });
                this.ReportBeizhuVisable = false;
            } else {
              this.$message({
                showClose: true,
                message: '报告备注添加失败',
                type: 'error'
                });
              return false;
            }
          }, (err) => {
            console.log(err);
          });
        }else{
          this.beizhumsg ='内容必填';
        }
      },
      addTwoInfo: function () {
        // console.log(1231313);
        // console.log(this.$refs.kuang1.content);
        // console.log(this.$refs.kuang2.content);
        if(this.$refs.kuang1.content =='' || this.$refs.kuang2.content == ''){
           this.$message({
                  showClose: true,
                  message: '请填写检查提示和检查所见',
                  type: 'error'
            });
            return false;
        }
        document.getElementById('edit-iframe').contentWindow.postMessage(JSON.stringify({"DescriptionToReport":this.$refs.kuang1.content}),"*");
        document.getElementById('edit-iframe').contentWindow.postMessage(JSON.stringify({"ConclusionToReport":this.$refs.kuang2.content}),"*");
      },
      seeMedia: function () {
        // window.open(this.ip1 + '/#/patientimages','newwindow', 'width='+ (window.screen.availWidth-10)+',height='+(window.screen.availHeight-30)+ ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
        window.open('/#/patientimages?patientId='+ this.pid,'_blank');
      },
      opensave: function () {
        this.savedialog = true;
      },
      opennoPass: function () {
        this.noPassdialog = true;
      },
      opensend: function () {
        this.senddialog = true;
      },
      opencancelSend: function () {
        this.cancelsenddialog = true;
      },
      getPatientInfo: function () {
        // 获取病人的三个信息
        console.log('开始查询病人的三个信息');
        var params = new Object();
        params.id = this.pid;
        this.$http.post(this.ip+'/xhhms/rest/interRemoteReportController/v1/getReportByid',params,{
          headers:{
            'X-AUTH-TOKEN': this.token
          }
        }).then((res)=>{
          console.log(res.data);
          var data = JSON.parse(res.data);
            // console.log('dadad',data.data);
          if(data.status === '1' && data.data){
            // if(data.data.hasOwnProperty("imagetype")){
            //      this.$refs.forms.form.imagetype = data.data.imagetype;
            // }
              this.$refs.forms.form.imagetype  = data.data.hasOwnProperty("imagetype") ? data.data.imagetype : '';
              this.$refs.forms.form.repevty = data.data.hasOwnProperty("repevty") ? data.data.repevty : '';
              this.$refs.forms.form.positivety = data.data.hasOwnProperty("positivety") ? data.data.positivety : '';
              // 获取病人的状态
              console.log('当前状态----',this.statusList[data.data.status]);
              console.log('当前病人的报告备注---',data.data.remark);
              this.textareaReportBeizhu = data.data.hasOwnProperty("remark") ? data.data.remark: '';
               // data.datat.status = 'C';
              // let a =  'C';
              // if(data.data.status === 'C'){
              //   //this.chuzhen = true;
              //   this.shenhe = '111';
              //   this.fushen = '111';
              //   this.btnbtnfushen.push('fontColor');
              //   this.btnbtnshenhe.push('fontColor');
              // } else if(data.data.status ==='R'){
              //   this.chuzhen = '111';
              //   // this.shenhe = true;
              //   this.fushen = '111';
              //   this.btnbtnchuzhen.push('fontColor');
              //   this.btnbtnfushen.push('fontColor');
              // } else if(data.data.status === 'A'){
              //   this.chuzhen = '111';
              //   this.shenhe = '111';
              //   this.btnbtnchuzhen.push('fontColor');
              //   this.btnbtnshenhe.push('fontColor');
              //   // this.fushen = true;
              // }else{
              //   console.log(11);
              //   this.chuzhen = '111';
              //   this.btnbtnchuzhen.push('fontColor')
              //   this.shenhe = '111';
              //   this.btnbtnshenhe.push('fontColor')
              //   this.fushen = '111';
              //   this.btnbtnfushen.push('fontColor')
              // }
              // // 查看远程状态
              // console.log('远程状态-----------',data.data.remoteStatus);
              // // data.data.remoteStatus = 2;
              // if(data.data.remoteStatus === ''|| typeof(data.data.remoteStatus) === 'undefined'){
              //   console.log('当前远程状态为空或者未定义');
              //   this.nopass = '111';
              //   this.btnbtnnopass.push('fontColor');
              //   this.sendbtn = '111';
              //   this.btnbtnsend.push('fontColor');
              //   this.cancel = '111';
              //   this.btnbtncancelsend.push('fontColor');
              // }else if(data.data.remoteStatus === 1 || data.data.remoteStatus==='1'){
              //     this.cancalsend = '111';
              //     this. btnbtncancelsend.push('fontColor');
              // } else if(data.data.remoteStatus === 2 || data.data.remoteStatus === '2'){
              //     this.nopass = '111';
              //     this.btnbtnnopass.push('fontColor');
              //     this.sendbtn = '111';
              //     this.btnbtnsend.push('fontColor');
              // }
          }else{
              return false;
          }
        }, (err) => {
          console.log(err);
        })
        console.log('结束查询病人的三个信息');
      },
      FirstCharge: function () {
        // 初审
        console.log('初诊')
        var params=new Object();
        params.id =this.id;
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/updateStatus', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          //console.log(data);
          if (!!data&&data.status=="1") {
            console.log('初诊');
             this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              });
           const oIframe = document.getElementById('edit-iframe');
            if(this.datatype==2){
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationEdit&id="+this.id+"&jwtstr="+this.token;
            }else{
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationMyEdit&id="+this.id+"&jwtstr="+this.token;
            }
            this.getPatientInfo();
          } else {
            this.$message({
              showClose: true,
              message: '操作失败',
              type: 'error'
              });
            return false;
          }
        }, (err) => {
          console.log(err);
        });
      },
      Charge: function () {
        // 初审
        console.log('审核')
        var params=new Object();
        params.id =this.id;
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/updateStatus', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          //console.log(data);
          if (!!data&&data.status=="1") {
            console.log('审核');
             this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              });
           const oIframe = document.getElementById('edit-iframe');
            if(this.datatype==2){
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationEdit&id="+this.id+"&jwtstr="+this.token;
            }else{
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationMyEdit&id="+this.id+"&jwtstr="+this.token;
            }
            this.getPatientInfo();
          } else {
              this.$message({
                showClose: true,
                message: '操作失败',
                type: 'error'
              });
            return false;
          }
        }, (err) => {
          console.log(err);
        });
      },
      OnceCharge: function () {
        // 初审
        console.log('复审')
        var params=new Object();
        params.id =this.id;
        this.$http.post(this.ip + '/xhhms/rest/interRemoteReportController/v1/updateStatus', params, {
          headers: {
            'X-AUTH-TOKEN': this.token
          }
        }).then((res) => {
          var data = JSON.parse(res.data);
          //console.log(data);
          if (!!data&&data.status=="1") {
            console.log('复审');
             this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              });
            const oIframe = document.getElementById('edit-iframe');
            if(this.datatype==2){
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationEdit&id="+this.id+"&jwtstr="+this.token;
            }else{
              oIframe.src = this.ip+ "/xhhms/remoteReportController.do?goConsultationMyEdit&id="+this.id+"&jwtstr="+this.token;
            }
            this.getPatientInfo();
          } else {
             this.$message({
                showClose: true,
                message: '操作失败',
                type: 'error'
              });
            return false;
          }
        }, (err) => {
          console.log(err);
        });
      },
       clickPrint: function(){
         document.getElementById('edit-iframe').contentWindow.postMessage(JSON.stringify({"ConclusionPrintReport":"print"}),"*");
      },
      backClick: function(){
        this.$router.go(-1)
      }
      // go: function () {
      //   console.log(111);
      // }
    },

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" rel='stylesheet/stylus'>


body{
  background-color:#bdbebe;
}
.edit {
  width: 100%;
  overflow: hidden;
  background-color:#D4D4D4;

  header {
    width: 100%;
    overflow: hidden;
  }

  .centent {
    min-height:900px;
    width: 100%;
    overflow: auto ;
  }

  .centent>div {
    float: left;
    overflow: hidden;
  }

  .left {
    width: 17%; 
    height:790px; 
    min-width: 250px;
    background-color :#e2e0e0;
    margin-top:40px;
    border-radius:10px;
    margin-left:1%;
    float: left;
  }

  .center {
    width: 65% !important;
    height:830px; 
    min-width: 800px;
    margin: 0 1%;
  }
  
  .print_div{
    width:100%;
  }

  .right {
    width: 13%; 
    min-width: 150px;
    background-color :#e2e0e0;
    margin-top:40px;
    border-radius:10px;
    float: right;
    margin-right:1%;
    font-size:12px !important;
  }


  .left_tree{
    width:90%;
    border-radius:4px;
    margin:5px auto;

  }
  .tree{
    min-height:300px;
  }
  .left_header {
    width: 100%;
    border-bottom: 1px solid #d4d4d4;
  }
  .left_header span{
    margin-left:10px;
  }
  .radio label{
    margin-right:50px;
    margin-left:10px;
  }
  .kuang{
    margin: 10px 5px;
  }
  .el-textarea__inner{
   // background-color :white;
  }
  .img_button img{
    margin :10px 4px;
  }
  .img_right{
    float:right;
    margin-right :20px;
  }
  .el-tree-node__expand-icon.is-leaf{
    color:#696969;
  }
  .btnbtn{
    cursor:pointer;
  }
  .fontColor{
    color:#b9b9b9 !important;
  }
}

 .leftClass{

   height:500 px;
   width 27%;
   display inline-block;
   border 1px solid $bgGray ;
   overflow-x :hidden;
   margin:0px 0px;
   border-radius:5px;
  
 }
 .rightClass{
   height:500 px;
   width 72%;
   display inline-block;
   border 1px solid $bgGray ;
   overflow-x :hidden;
   border-radius:5px;
 }
 #footer {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  clear: both;
  background: $bgGray;
}
.el-form-item__label{
  font-size:12px;
}
.el-input__inner{
  font-size:12px;
}
.el-form-item__label{
  line-height:24px;
}
.el-radio__label{
  font-size:12px;
}
.el-textarea__inner{
  font-size:12px;
}
</style>
