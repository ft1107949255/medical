
<template>
  <div class="edit">
      <div class="centent">
        <div class="left">
          <div class="left_tree">
            <div class="left_header"><span style="color:#606266">术语</span></div>
            <div  style="cursor: pointer;min-height: 200px; max-height:280px; overflow-y: auto; overflow-x:hidden;" >
              <ul id="shuyuSelect" class="ztree"    style=" width: 100%; height: 30%;overflow:auto;cursor: pointer; " ></ul>
            </div>
            <div class="radio">
              <el-radio-group v-model="models" @change="clickitem">
                <el-radio   v-model="models" label="1"  value="1">替换</el-radio>
                <el-radio   v-model="models" checked  label="2" value="2">追加</el-radio>
              </el-radio-group>
            </div>
            <div class="img_button">
              <img style="cursor: pointer;width:20px;" @click="showKnowledge" src="../../static/images/icon/img_button0.png" title="知识库"/>
              <img style="cursor: pointer;width:20px;;" @click="addTwoInfo" src="../../static/images/icon/img_button2.png" title="添加"/>
            </div>
            <div class="kuang">
                <editkuang ref="kuang1" :name="name1" :content="description" @sendcontent="sendDescription"/>
                <editkuang ref="kuang2" :name="name2" :content="conclusion" @sendcontent="sendConclusion"/>
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
import "ztree";
import "ztree/css/metroStyle/metroStyle.css";
import $ from "jquery";
import axios from "axios";
import tree1 from "./../components/trees/Trees1.vue";
import editCentent from "./../components/EditCom/EditCentent.vue";
import page from "./../components/table/Pagination";
import editkuang from "./../components/EditCom/Editkuang.vue";
import right from "./../components/rightSelects.vue";
import knowledgeleft from "./../components/knowledge/knowledgeLeft.vue";
import knowledgeright from "./../components/knowledge/knowledgeRight.vue";
import footNav from "./../components/FooterNav.vue";
import {api} from '../../config/website'
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
      ip: api,
      // ip1: this.CONSTANT.CONSTANT.WEB_IP,
      token: localStorage.getItem("token"),
      MainData: JSON.parse(localStorage.getItem("nume")),
      id: this.$route.query.consultationid
        ? this.$route.query.consultationid
        : "",
      pid: this.$route.query.patientid ? this.$route.query.patientid : "",
      datatype: this.$route.query.type,
      name1: "检查所见",
      name2: "检查提示",
      models: "2",
      defaultProps: {
        children: "son",
        label: "name"
      },
      knowledgetreedata: [],
      shuyusetting: {
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
          onExpand: this.shuyuOnExpand
        }
      },
      description: "",
      conclusion: "",
      zhenduanReportVisable: false,
      ReportBeizhuVisable: false,
      knowledgeBase: false,
      innerVisible: false,
      knowledgeIndex: "",
      knowledgeDic: {},
      delectDic: {},
      zhenduanreportList: [],
      textareaReportBeizhu: "",
      beizhumsg: "", // 备注内容错误信息提示
      statusList: {
        F: "已归档",
        E: "上级撤销",
        V: "已复审",
        R: "已诊断",
        D: "草稿",
        C: "已检查",
        I: "检查中",
        T: "已分诊",
        S: "已预约",
        A: "已审核",
        X: "出诊"
      },
      status: "已分诊",
      imagetype: "",
      repevty: "",
      positivety: "",
      ICD: "",
      ICDID: "",
      acr: "",
      acrId: "",
      savedialog: false,
      noPassdialog: false,
      senddialog: false,
      cancelsenddialog: false,
      chuzhen: false,
      fushen: false,
      shenhe: false,
      btnbtnchuzhen: ["btnbtn"],
      btnbtnshenhe: ["btnbtn"],
      btnbtnfushen: ["btnbtn"],
      btnbtnnopass: ["btnbtn"],
      btnbtnsend: ["btnbtn"],
      btnbtncancelsend: ["btnbtn"],
      nopass: false,
      sendbtn: false,
      cancelsend: false,
      url: ""
    };
  },
  created: function() {
    if (this.id === "") {
      this.$message({
        showClose: true,
        message: "缺少consulationid!!,请回到主页面进入。",
        type: "error"
      });
      var that = this;
      window.setTimeout(function() {
        that.$router.push("/consultation");
      }, 3000);
    }
    this.getPatientInfo();
  },
  beforeMount: function() {},
  mounted: function() {
    const oIframe = document.getElementById("edit-iframe");
    if (this.datatype == 2) {
      oIframe.src =
        this.ip +
        "/xhhms/remoteReportController.do?goCloudConsultationEdit&id=" +
        this.id +
        "&jwtstr=" +
        this.token;
    } else {
      oIframe.src =
        this.ip +
        "/xhhms/remoteReportController.do?goCloudConsultationMyEdit&id=" +
        this.id +
        "&jwtstr=" +
        this.token;
    }
    var that = this;
    window.addEventListener("message", function(res) {
      if (res.data && !res.data.hasOwnProperty("type")) {
        var data = JSON.parse(res.data);
        if (data.doSave) {
          var params = data.doSave;
          if (params.description == "" || params.conclusion == "") {
            this.$message({
              showClose: true,
              message: "请填写检查提示和检查所见",
              type: "error"
            });
            return false;
          }
          if (that.datatype == 2) {
            // that.url =
            //   "/xhhms/rest/interRemoteReportController/v1/saveCloudConsulation";
            that.$api.saveConsulationEditCloudConsulation(params).then(res=>{
              var data = res;
              if (data.status == 1) {
                that.$message({
                  showClose: true,
                  message: "操作成功",
                  type: "success"
                });
                const oIframe = document.getElementById("edit-iframe");
                oIframe.src =
                    that.ip +
                    "/xhhms/remoteReportController.do?goCloudConsultationEdit&id=" +
                    that.id +
                    "&jwtstr=" +
                    that.token;
                that.getPatientInfo();
              } else {
                that.$message({
                  showClose: true,
                  message: "操作失败",
                  type: "error"
                });
                return false;
              }
            })
          } else {
            // that.url = "/xhhms/rest/interRemoteReportController/v1/saveCloudMyConsulation";
            that.$api.saveConsulationEditCloudMyConsulation(params).then(res=>{
              var data = res;
              if (data.status == 1) {
                that.$message({
                  showClose: true,
                  message: "操作成功",
                  type: "success"
                });
                const oIframe = document.getElementById("edit-iframe");
                oIframe.src =
                    that.ip +
                    "/xhhms/remoteReportController.do?goCloudConsultationMyEdit&id=" +
                    that.id +
                    "&jwtstr=" +
                    that.token;
                that.getPatientInfo();
              } else {
                that.$message({
                  showClose: true,
                  message: "操作失败",
                  type: "error"
                });
                return false;
              }
            })
          }
          // that.$http
          //   .post(that.ip + that.url, params, {
          //     headers: {
          //       "X-AUTH-TOKEN": that.token
          //     }
          //   })
          //   .then(
          //     res => {
          //       var data = JSON.parse(res.data);
          //       if (data.status == 1) {
          //         that.$message({
          //           showClose: true,
          //           message: "操作成功",
          //           type: "success"
          //         });
          //         const oIframe = document.getElementById("edit-iframe");
          //         if (that.datatype == 2) {
          //           oIframe.src =
          //             that.ip +
          //             "/xhhms/remoteReportController.do?goCloudConsultationEdit&id=" +
          //             that.id +
          //             "&jwtstr=" +
          //             that.token;
          //         } else {
          //           oIframe.src =
          //             that.ip +
          //             "/xhhms/remoteReportController.do?goCloudConsultationMyEdit&id=" +
          //             that.id +
          //             "&jwtstr=" +
          //             that.token;
          //         }
          //         that.getPatientInfo();
          //       } else {
          //         that.$message({
          //           showClose: true,
          //           message: "操作失败",
          //           type: "error"
          //         });
          //         return false;
          //       }
          //     },
          //     err => {
          //       console.log(err);
          //     }
          //   );
        } else if (data.doPrint) {
          // 开始打印信息
          let newContent = data.doPrint;
          let oldContent = document.body.innerHTML;
          document.body.innerHTML = newContent;
          window.print();
          window.location.reload();
          document.body.innerHTML = oldContent;
          return false;
        }
      }
    });

    var params = new Object();
    // this.$http
    //   .post(
    //     this.ip + "/xhhms/rest/interRemoteReportController/v1/getKnowledge",
    //     params,
    //     {
    //       headers: {
    //         "X-AUTH-TOKEN": this.token
    //       }
    //     }
    //   )
      this.$api.getConsulationEditKnowledge(params).then(res => {
          var data = res;
          if (!!data && data.status == "1") {
            $.fn.zTree.init($("#shuyuSelect"), this.shuyusetting, data.data);
            var treeObj = $.fn.zTree.getZTreeObj("shuyuSelect");
            // var nodes = treeObj.getNodes();
            // treeObj.expandNode(nodes[0]);
          } else {
            return false;
          }
        },
        err => {
          console.log(err);
        }
      );
  },
  beforeUpdate: function() {},
  updated: function() {},
  methods: {
    showKnowledge() {
      this.knowledgeBase = true;
    },
    handleClose(done) {
      this.FreshClick();
      this.$refs.knowledgeright.closeTheShow();
      done();
    },
    leftClick(index, val) {
      this.knowledgeIndex = index;
      this.knowledgeDic = val;
    },
    deleteFole(val) {
      // 点击删除按钮  弹出嵌套弹框
      this.innerVisible = true;
      this.delectDic = val;
    },
    delectClick() {
      //确认删除
      var params = {};
      params.id = this.delectDic.id;
      // this.$http
      //   .post(
      //     this.ip + "/xhhms/rest/interDiagKnowledgeBaseController/v1/del",
      //     params,
      //     { headers: { "X-AUTH-TOKEN": this.token } }
      //   )
        this.$api.delConsulationEditKnowledgeById(params).then(res => {
          var data = res;
          if (data.status == 1) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.FreshClick();
            this.delectDic = {};
            this.$refs.knowledgeright.closeTheShow();
            this.innerVisible = false;
          } else {
            this.$message({
              message: "删除失败",
              type: "error"
            });
            return false;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            message: "删除失败",
            type: "error"
          });
        });
    },
    FreshClick() {
      this.$refs.knowledgeleft.getKnowledgeList();
    },
    clickitem(value) {
      if (value == 1) {
        document
          .getElementById("edit-iframe")
          .contentWindow.postMessage('{"replace":true}', "*");
      } else if (value == 2) {
        document
          .getElementById("edit-iframe")
          .contentWindow.postMessage('{"append":true}', "*"); //父向子传递
      }
    },
    shuyuOnClick(event, treeId, treeNode) {
      if (!treeNode.isParent) {
        var acknowledgeid = treeNode.id;
        var params = { id: acknowledgeid };
        // this.$http
        //   .post(
        //     this.ip +
        //       "/xhhms/rest/interRemoteReportController/v1/getKnowledgeByid",
        //     params,
        //     {
        //       headers: { "X-AUTH-TOKEN": localStorage.getItem("token") }
        //     }
        //   )
          this.$api.getConsulationEditKnowledgeById(params).then(res => {
              var data = res;
              if (!!data && data.status == "1") {
                document
                  .getElementById("edit-iframe")
                  .contentWindow.postMessage(
                    JSON.stringify({
                      DescriptionToReport: data.data.description
                    }),
                    "*"
                  );
                document
                  .getElementById("edit-iframe")
                  .contentWindow.postMessage(
                    JSON.stringify({
                      ConclusionToReport: data.data.conclusion
                    }),
                    "*"
                  );
                this.description = data.data.description;
                this.conclusion = data.data.conclusion;
              } else {
                return false;
              }
            },
            err => {
              console.log(err);
            }
          );
      } else {
        this.shuyuOnExpand(event, treeId, treeNode);
      }
    },
    shuyuOnExpand(event, treeId, treeNode) {
      console.log("shuyuOnExpand");
      var treeNodeId = treeNode.id;
      if (treeNodeId == 0) {
        return;
      } else {
        var params = { parentid: treeNodeId };
        // this.$http
        //   .post(
        //     this.ip + "/xhhms/rest/interRemoteReportController/v1/getKnowledge",
        //     params,
        //     {
        //       headers: { "X-AUTH-TOKEN": localStorage.getItem("token") }
        //     }
        //   )
          this.$api.getConsulationEditKnowledge(params).then(
            res => {
              var data = res;
              console.log("data");
              if (!!data && data.status == "1") {
                var tree = $.fn.zTree.getZTreeObj("shuyuSelect");
                if (!treeNode.zAsync) {
                  tree.addNodes(treeNode, data.data);
                  treeNode.zAsync = true;
                } else {
                  tree.reAsyncChildNodes(treeNode, "refresh");
                }
              } else {
                return false;
              }
            },
            err => {
              console.log(err);
            }
          );
      }
    },
    save: function() {
      // 关闭对话框
      this.savedialog = false;
      // 保存信息
      var params = new Object();
      params.consulationid = this.id;
      params.token = this.token;
      params.id = this.pid;
      console.log(params);
      params.token = this.token;
      var form = this.$refs.forms.form;
      if (form.imagetype !== "") {
        params.grade = form.imagetype;
        if(params.grade == '甲等'){
            params.grade = 'A';
        }
        if(params.grade == '乙等'){
            params.grade = 'B';
        }
        if(params.grade == '丙等'){
            params.grade = 'C';
        }
        if(params.grade == '废图'){
            params.grade = 'D';
        }
      }
      if (form.repevty !== "") {
        params.reportevaluation = form.repevty;
        if(params.reportevaluation == '优'){
            params.reportevaluation = 1;
        }
        if(params.reportevaluation == '良'){
            params.reportevaluation = 2;
        }
        if(params.reportevaluation == '合格'){
            params.reportevaluation = 3;
        }
        if(params.reportevaluation == '不合格'){
            params.reportevaluation = 4;
        }
      }
      if (form.positivety !== "") {
        
        params.positive = form.positivety;
        if(params.positive == '阴'){
            params.positive = -1;
        }
        if(params.positive == '阳'){
            params.positive = 1;
        }
        if(params.positive == '未定性'){
            params.positive = 100;
        }
      }
      if (form.ICD !== "" && form.ICD !== "undefined") {
        params.icd10Index = form.ICDID;
      }
      if (form.acrIdLeft !== "" && form.acrIdLeft !== "undefined") {
        params.acrIndex = form.acrIdLeft + "," + form.acrIdRight;
      }
      console.log('xxxx', params);
      document
        .getElementById("edit-iframe")
        .contentWindow.postMessage(JSON.stringify({ saveReport: params }), "*");
    },
    send: function() {
      // 关闭对话框
      this.senddialog = false;
      // 发送
      var params = new Object();
      params.id = this.id;
      // this.$http
      //   .post(
      //     this.ip + "/xhhms/rest/interRemoteReportController/v1/doSend",
      //     params,
      //     {
      //       headers: { "X-AUTH-TOKEN": localStorage.getItem("token") }
      //     }
      //   )
        this.$api.ConsulationEditDoSend(params).then(
          res => {
            var data = res;
            if (!!data && data.status == "1") {
              this.$message({
                showClose: true,
                message: "发送成功",
                type: "success"
              });
              const oIframe = document.getElementById("edit-iframe");
              if (this.datatype == 2) {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              } else {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationMyEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              }
              this.getPatientInfo();
            } else {
              this.$message({
                showClose: true,
                message: "发送失败",
                type: "error"
              });
              return false;
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    noPass: function() {
      // 关闭对话框
      this.noPassdialog = false;
      //  驳回内容
      var params = new Object();
      params.id = this.id;
      // this.$http
      //   .post(
      //     this.ip + "/xhhms/rest/interRemoteReportController/v1/goReject",
      //     params,
      //     {
      //       headers: { "X-AUTH-TOKEN": localStorage.getItem("token") }
      //     }
      //   )
        this.$api.ConsulationEditGoReject(params).then(
          res => {
            var data = res;
            if (!!data && data.status == "1") {
              this.$message({
                showClose: true,
                message: "驳回成功",
                type: "success"
              });
              const oIframe = document.getElementById("edit-iframe");
              if (this.datatype == 2) {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              } else {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationMyEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              }
              this.getPatientInfo();
            } else {
              this.$message({
                showClose: true,
                message: "驳回失败",
                type: "error"
              });
              return false;
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    cancelSend: function() {
      // 关闭对话框
      this.cancelsenddialog = false;
      // 发送
      var params = new Object();
      params.id = this.id;
      // this.$http
      //   .post(
      //     this.ip + "/xhhms/rest/interRemoteReportController/v1/doCancelSend",
      //     params,
      //     {
      //       headers: { "X-AUTH-TOKEN": localStorage.getItem("token") }
      //     }
      //   )
        this.$api.ConsulationEditDoCancelSend(params).then(
          res => {
            var data = res;
            if (!!data && data.status == "1") {
              this.$message({
                showClose: true,
                message: "取消发送成功",
                type: "success"
              });
              const oIframe = document.getElementById("edit-iframe");
              if (this.datatype == 2) {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              } else {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationMyEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              }
              this.getPatientInfo();
            } else {
              this.$message({
                showClose: true,
                message: "取消发送失败",
                type: "error"
              });
              return false;
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    chargeReport: function() {
      //this.zhenduanreport();
      this.zhenduanReportVisable = true;
      //id  home页面的传递过来
      var params = { id: this.pid };
      // this.$http
      //   .post(
      //     this.ip +
      //       "/xhhms/rest/interMedicalConsultationApplyController/v1/getConsulationList",
      //     params,
      //     {
      //       headers: { "X-AUTH-TOKEN": localStorage.getItem("token") }
      //     }
      //   )
        this.$api.getConsulationEditConsulationList(params).then(
          res => {
            var data = res;
            if (!!data) {
              this.zhenduanreportList = [];
              data.data.map(item => {
                if (
                  typeof item.imageDescribe !== "undefined" &&
                  typeof item.imageDescribe !== "undefined"
                ) {
                  item.imageDescribe = unescape(item.imageDescribe);
                  item.conclusion = unescape(item.conclusion);
                  let d = new Date(item.reportDate);
                  item.reportDate =
                    d.getFullYear() +
                    "-" +
                    (d.getMonth() + 1 > 9
                      ? d.getMonth() + 1
                      : "0" + (d.getMonth() + 1)) +
                    "-" +
                    (d.getDate() > 9 ? d.getDate() : "0" + d.getDate());
                  this.zhenduanreportList.push(item);
                }
              });
            } else {
              return false;
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    reportNote: function() {
      this.ReportBeizhuVisable = true;
    },
    sendDescription: function(val) {
      if (val != "") {
        document
          .getElementById("edit-iframe")
          .contentWindow.postMessage(
            JSON.stringify({ DescriptionToReport: val }),
            "*"
          );
      } else {
        this.$message({
          showClose: true,
          message: "请填写检查所见",
          type: "error"
        });
      }
    },
    sendConclusion: function(val) {
      if (val != "") {
        document
          .getElementById("edit-iframe")
          .contentWindow.postMessage(
            JSON.stringify({ ConclusionToReport: val }),
            "*"
          );
      } else {
        this.$message({
          showClose: true,
          message: "请填写检查提示",
          type: "error"
        });
      }
    },
    zhenduanreport: function() {
      // 打开框
    },
    OkDialogReportBeizhu: function() {
      if (this.textareaReportBeizhu !== "") {
        // 提交备注内容
        var params = new Object();
        params.id = this.pid;
        params.remark = this.textareaReportBeizhu;
        // this.$http
        //   .post(
        //     this.ip + "/xhhms/rest/interRemoteReportController/v1/doCloudConsulationRemark",
        //     params,
        //     {
        //       headers: { "X-AUTH-TOKEN": localStorage.getItem("token") }
        //     }
        //   )
          this.$api.ConsulationEditDoCloudConsulationRemark(params).then(
            res => {
              var data = res;
              if (!!data && data.status == "1") {
                this.$message({
                  showClose: true,
                  message: "报告备注添加成功",
                  type: "success"
                });
                this.ReportBeizhuVisable = false;
              } else {
                this.$message({
                  showClose: true,
                  message: "报告备注添加失败",
                  type: "error"
                });
                return false;
              }
            },
            err => {
              console.log(err);
            }
          );
      } else {
        this.beizhumsg = "内容必填";
      }
    },
    addTwoInfo: function() {
      if (this.$refs.kuang1.content == "" || this.$refs.kuang2.content == "") {
        this.$message({
          showClose: true,
          message: "请填写检查提示和检查所见",
          type: "error"
        });
        return false;
      }
      document
        .getElementById("edit-iframe")
        .contentWindow.postMessage(
          JSON.stringify({ DescriptionToReport: this.$refs.kuang1.content }),
          "*"
        );
      document
        .getElementById("edit-iframe")
        .contentWindow.postMessage(
          JSON.stringify({ ConclusionToReport: this.$refs.kuang2.content }),
          "*"
        );
    },
    seeMedia: function() {
      window.open("/#/patientimages?patientId=" + this.pid +"&code=1", "_blank");
    },
    opensave: function() {
      this.savedialog = true;
    },
    opennoPass: function() {
      this.noPassdialog = true;
    },
    opensend: function() {
      this.senddialog = true;
    },
    opencancelSend: function() {
      this.cancelsenddialog = true;
    },
    getPatientInfo: function() {
      // 获取病人的三个信息
      var params = new Object();
      params.id = this.pid;
      // this.$http
      //   .post(
      //     this.ip + "/xhhms/rest/interRemoteReportController/v1/getCloudReportByPid",
      //     params,
      //     {
      //       headers: {
      //         "X-AUTH-TOKEN": this.token
      //       }
      //     }
      //   )
      this.$api.getConsulationEditCloudReportByPid(params).then(
        res => {
          var data = res;
          console.log('res', data.data);
          if (data.status === "1" && data.data) {
            this.$refs.forms.form.imagetype = data.data.hasOwnProperty(
              "grade"
            )
              ? data.data.grade
              : "";
            this.$refs.forms.form.repevty = data.data.hasOwnProperty(
              "reportevaluation"
            )
              ? data.data.reportevaluation
              : "";
            this.$refs.forms.form.positivety = data.data.hasOwnProperty(
              "positive"
            )
              ? data.data.positive
              : "";

             if (this.$refs.forms.form.repevty == 1) {
                this.$refs.forms.form.repevty = '优';
              } else if(this.$refs.forms.form.repevty == 2){
                this.$refs.forms.form.repevty = '良';
              } else if (this.$refs.forms.form.repevty == 3){
                this.$refs.forms.form.repevty = '合格';
              } else if (this.$refs.forms.form.repevty == 4){
                this.$refs.forms.form.repevty = '不合格';
              } else{
                this.$refs.forms.form.repevty = '';
              }
             if (this.$refs.forms.form.positivety == -1) {
                this.$refs.forms.form.positivety = '阴';
              } else if(this.$refs.forms.form.positivety == 1){
                this.$refs.forms.form.positivety = '阳';
              } else if (this.$refs.forms.form.positivety == 100){
                this.$refs.forms.form.positivety = '未定性';
              } else{
                this.$refs.forms.form.positivety = '';
              }
              if (this.$refs.forms.form.imagetype == "A") {
                this.$refs.forms.form.imagetype = '甲等';
              } else if(this.$refs.forms.form.imagetype == "B"){
                this.$refs.forms.form.imagetype = '乙等';
              } else if (this.$refs.forms.form.imagetype == 'C'){
                this.$refs.forms.form.imagetype = '丙等';
              } else if (this.$refs.forms.form.imagetype == 'D'){
                this.$refs.forms.form.imagetype = '废图';
              } else{
                this.$refs.forms.form.imagetype = '';
              }
              this.$refs.forms.form.ICD = data.data.hasOwnProperty(
                "icdindexname"
              )
                ? data.data.icdindexname
                : "";
              this.$refs.forms.form.acrName = data.data.hasOwnProperty(
                "acrindexname"
              )
                ? data.data.acrindexname
                : "";
            // 获取病人的状态
            this.textareaReportBeizhu = data.data.hasOwnProperty("remark")
              ? data.data.remark
              : "";
          } else {
            return false;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    FirstCharge: function() {
      // 初审
      var params = new Object();
      params.id = this.id;
      // this.$http
      //   .post(
      //     this.ip + "/xhhms/rest/interRemoteReportController/v1/updateStatus",
      //     params,
      //     {
      //       headers: {
      //         "X-AUTH-TOKEN": this.token
      //       }
      //     }
      //   )
        this.$api.ConsulationEditupdateStatus(params).then(
          res => {
            var data = res;
            if (!!data && data.status == "1") {
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success"
              });
              const oIframe = document.getElementById("edit-iframe");
              if (this.datatype == 2) {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              } else {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationMyEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              }
              this.getPatientInfo();
            } else {
              this.$message({
                showClose: true,
                message: "操作失败",
                type: "error"
              });
              return false;
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    Charge: function() {
      // 初审
      var params = new Object();
      params.id = this.id;
      // this.$http
      //   .post(
      //     this.ip + "/xhhms/rest/interRemoteReportController/v1/updateStatus",
      //     params,
      //     {
      //       headers: {
      //         "X-AUTH-TOKEN": this.token
      //       }
      //     }
      //   )
        this.$api.ConsulationEditupdateStatus(params).then(
          res => {
            var data = res;
            if (!!data && data.status == "1") {
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success"
              });
              const oIframe = document.getElementById("edit-iframe");
              if (this.datatype == 2) {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              } else {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationMyEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              }
              this.getPatientInfo();
            } else {
              this.$message({
                showClose: true,
                message: "操作失败",
                type: "error"
              });
              return false;
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    OnceCharge: function() {
      // 初审
      var params = new Object();
      params.id = this.id;
      // this.$http
      //   .post(
      //     this.ip + "/xhhms/rest/interRemoteReportController/v1/updateStatus",
      //     params,
      //     {
      //       headers: {
      //         "X-AUTH-TOKEN": this.token
      //       }
      //     }
      //   )
        this.$api.ConsulationEditupdateStatus(params).then(
          res => {
            var data = res;
            if (!!data && data.status == "1") {
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success"
              });
              const oIframe = document.getElementById("edit-iframe");
              if (this.datatype == 2) {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              } else {
                oIframe.src =
                  this.ip +
                  "/xhhms/remoteReportController.do?goConsultationMyEdit&id=" +
                  this.id +
                  "&jwtstr=" +
                  this.token;
              }
              this.getPatientInfo();
            } else {
              this.$message({
                showClose: true,
                message: "操作失败",
                type: "error"
              });
              return false;
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    clickPrint: function() {
      document
        .getElementById("edit-iframe")
        .contentWindow.postMessage(
          JSON.stringify({ ConclusionPrintReport: "print" }),
          "*"
        );
    },
    backClick: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" rel='stylesheet/stylus'>



body {
  background-color: #bdbebe;
}

.edit {
  width: 100%;
  overflow: hidden;
  background-color: #D4D4D4;

  header {
    width: 100%;
    overflow: hidden;
  }

  .centent {
    min-height: 900px;
    width: 100%;
    overflow: auto;
  }

  .centent>div {
    float: left;
    overflow: hidden;
  }

  .left {
    width: 17%;
    height: 790px;
    min-width: 250px;
    background-color: #e2e0e0;
    margin-top: 40px;
    border-radius: 10px;
    margin-left: 1%;
    float: left;
  }

  .center {
    width: 65% !important;
    height: 830px;
    min-width: 800px;
    margin: 0 1%;
  }

  .print_div {
    width: 100%;
  }

  .right {
    width: 13%;
    min-width: 150px;
    background-color: #e2e0e0;
    margin-top: 40px;
    border-radius: 10px;
    float: right;
    margin-right: 1%;
    font-size: 12px !important;
  }

  .left_tree {
    width: 90%;
    border-radius: 4px;
    margin: 5px auto;
  }

  .tree {
    min-height: 300px;
  }

  .left_header {
    width: 100%;
    border-bottom: 1px solid #d4d4d4;
  }

  .left_header span {
    margin-left: 10px;
  }

  .radio label {
    margin-right: 50px;
    margin-left: 10px;
  }

  .kuang {
    margin: 5px 5px;
  }

  .el-textarea__inner {
    // background-color :white;
  }

  .img_button img {
    margin: 4px 10px;
  }

  .img_right {
    float: right;
    margin-right: 20px;
  }

  .el-tree-node__expand-icon.is-leaf {
    color: #696969;
  }

  .btnbtn {
    cursor: pointer;
  }

  .fontColor {
    color: #b9b9b9 !important;
  }
}

.leftClass {
  height: 500 px;
  width: 27%;
  display: inline-block;
  border: 1px solid $bgGray;
  overflow-x: hidden;
  margin: 0px 0px;
  border-radius: 5px;
}

.rightClass {
  height: 500 px;
  width: 72%;
  display: inline-block;
  border: 1px solid $bgGray;
  overflow-x: hidden;
  border-radius: 5px;
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

.el-form-item__label {
  font-size: 12px;
}

.el-input__inner {
  font-size: 12px;
}

.el-form-item__label {
  line-height: 24px;
}

.el-radio__label {
  font-size: 12px;
}

.el-textarea__inner {
  font-size: 12px;
}
</style>
