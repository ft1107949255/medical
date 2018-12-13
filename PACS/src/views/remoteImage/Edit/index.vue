
<template>
  <div class="edit">
      <div class="centent">
        <div class="left">
          <div class="left_tree">
            <div class="left_header">
              <span style="color:#606266;font-size:12px;">术语</span>
              <img style="cursor: pointer;width: 20px;float:right;" @click="showKnowledge" src="../../../static/images/icon/img_button0.png" title="知识库"/>
            </div>
            <div  style="cursor: pointer;min-height: 200px; max-height:280px; overflow-y: auto; overflow-x:hidden;" >
              <ul id="shuyuSelect" class="ztree"    style=" width:100%; height: 30%;overflow:auto;cursor: pointer; " ></ul>
            </div>
            <div class="radio">
              <el-radio-group v-model="models" @change="clickitem">
                <el-radio   v-model="models" label="1"  value="1">替换</el-radio>
                <el-radio   v-model="models" checked  label="2" value="2">追加</el-radio>
              </el-radio-group>
            </div>
            <div class="img_button">
              <img style="cursor: pointer;width:20px;" @click="showKnowledge" src="../../../static/images/icon/img_button0.png" title="知识库"/>
              <img style="cursor: pointer;width:20px;" @click="addTwoInfo" src="../../../static/images/icon/img_button2.png" title="添加"/>
            </div>
            <div class="kuang">
                <editkuang ref="kuang1" :name="name1" :content="description" @sendcontent="sendDescription"/>
                <editkuang ref="kuang2" :name="name2" :content="conclusion" @sendcontent="sendConclusion"/>
            </div>
          </div>
        </div>
        <div  class="center" >
          <img class="btnbtn" @click="backClick" src='../../../static/images/icon/back.png' title="返回"/>
          <img class="btnbtn" @click="opensave" src='../../../static/images/icon/save.png' title="保存"/>
          <img :class="btnbtnnopass"  @click="opennoPass" title="驳回" src='../../../static/images/icon/noPass.png'/>
          <img :class="btnbtnnopass"  @click="openUpload" title="上报" src='../../../static/images/icon/upload.png'/>
          <img  :class="btnbtnsend"  @click="opensend" src="../../../static/images/icon/send.png" title="发送" />
          <img  :class="btnbtncancelsend"  @click="opencancelSend" src="../../../static/images/icon/cancelSend.png" title="取消发送">
          <img class="btnbtn" @click="chargeReport" src="../../../static/images/icon/consulationReport.png" title="诊断记录" />
          <img class="btnbtn" @click="reportNote" src="../../../static/images/icon/reportBeizhu.png" title="报告备注" />
          <img class="btnbtn" @click="seeMedia" src="../../../static/images/icon/seeMedia.png" title="查看影像"/>
          <!--<button class="btnbtn" @click="">{{status}}</button>-->
          <img :class="btnbtnchuzhen"  @click="FirstCharge" title="初诊" src="../../../static/images/icon/firstCharge.png"/>
          <img :class="btnbtnshenhe"  @click="Charge" title="审核" src="../../../static/images/icon/charge.png"/>
          <img :class="btnbtnfushen"  @click="OnceCharge" title="复审" src="../../../static/images/icon/secondCharge.png"/>
          <img :class="btnbtnfushen" @click="clickPrint" title="打印" src="../../../static/images/icon/print.png"/>
          <div id="print_div" style="width: 100% ;height:800px; min-width: 900px; margin: 0 auto;">
            <iframe class="" v-show="true" id="edit-iframe" align="center"
            frameborder=0 name="showHere" scrolling="no"
            style="width: 100%;height:800px; min-width: 900px; margin: 0 auto;"
            src="">
            </iframe>
          </div>
        </div>
        <div class="right" ><right ref="forms" /></div>
        <footer id="footer">
          <foot-nav :theIndex="6" :data="MainData"/>
        </footer>
        <el-dialog
          title="诊断记录"
          :visible.sync="zhenduanReportVisable"
          width="50%">
          <div v-if="zhenduanreportList.length >0">
            <div style="width:100%; height:400px;  overflow-y: auto; overflow-x:hidden;">
              <div  style="width:98%; margin: 10px auto; border-bottom:1px dashed #606266; padding-left:2%;" v-for="(item,index) in zhenduanreportList" v-bind:key="index">
                <div style="margin-top: 10px;">
                  <span>记录{{index +1}}</span>
                  <span>修改医生：{{item.updateName}}</span>
                  <span>修改时间：{{ item.createDate}}</span>
                  <span >{{statusList[item.status]}}</span>
                </div>
                <div style=" word-break:break-all">
                  <div style="margin: 20px 0px;width:98%;">
                    检查所见：<span v-html="item.conclusion"></span>
                  </div>
                  <div style="margin: 20px 0px;width:98%;">
                    检查提示：<span v-html="item.imageDescribe"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="text-align: center">
            暂无记录
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="zhenduanReportVisable = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
          title="报告备注"
          :visible.sync="ReportBeizhuVisable"
          width="30%">
          <div style="width:100%; height:300px;  overflow-y: auto;">
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
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入驳回原因"
            v-model="rejectReason">
          </el-input>
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
    <!-- 上报信息框 -->
    <el-dialog
          title="添加上报医院信息"
          :visible.sync="upReportHospitalVisible"
          width="50%">
          <!-- 会诊表单 -->
          <el-form  ref="upReportform" :model="upReportform"  label-width="80px" :show-message="false" >
              <el-row>
                <el-col :span="10"  >
                  <el-form-item label="上报医院" :rules="[{ required: true, message: '上报医院不能为空'}]" :show-message="false">
                      <el-select v-model="upReportform.hospitalName"  placeholder="请选择"   clearable class="el-input" >
                          <el-option  :key="index" v-for="(item,index) in hospitalList" :label="item.departname" :value="item.departname"></el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
          </el-form>
          <span v-if="upReportform.errorShow" style="color:red;">{{upReportform.errormsg}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="upReportHospitalVisible=false">取 消</el-button>
            <el-button type="primary" @click="saveUpload">确 定</el-button>
          </span>
      </el-dialog>

  </div>
</template>

<script>
import "ztree";
import "ztree/css/metroStyle/metroStyle.css";
import $ from "jquery";
// 私有组件
// 公共组件
import axios from "axios";
import tree1 from "../../components/trees/Trees1.vue";
import editCentent from "../../components/EditCom/EditCentent.vue";
import page from "../../components/table/Pagination";
import editkuang from "../../components/EditCom/Editkuang.vue";
import right from "../../components/rightSelects.vue";
import knowledgeleft from "../../components/knowledge/knowledgeLeft.vue";
import knowledgeright from "../../components/knowledge/knowledgeRight.vue";
import footNav from "../../components/FooterNav.vue";
import {api} from '../../../config/website'
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
      token: localStorage.getItem("token"),
      id: this.$route.query.patientId ? this.$route.query.patientId : "",
      typeEdit: this.$route.query.type,
      MainData: JSON.parse(localStorage.getItem("nume")),
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
          onClick: this.shuyuOnClick, //点击函数
          onExpand: this.shuyuOnExpand // 展开内容
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
      btnbtnchuzhen: ["btnbtn"],
      btnbtnshenhe: ["btnbtn"],
      btnbtnfushen: ["btnbtn"],
      btnbtnnopass: ["btnbtn"],
      btnbtnsend: ["btnbtn"],
      btnbtncancelsend: ["btnbtn"],
      zhenduantotal: 0,
      btnStatus: "", // 诊断状态
      remoteStatus: "", // 远程状态
      rejectReason: "", // 驳回原因
      upReportHospitalVisible: false, // 上报框
      upReportform:{
        hospitalName:'',
        errorShow: false,
        errormsg:'',
      },
      hospitalList:[]
    };
  },
  created: function() {
    if (this.id === "") {
      this.$message({
        showClose: true,
        message: "缺少Patientid!!,请回到主页面进入。",
        type: "error"
      });
      var that = this;
      window.setTimeout(function() {
        that.$router.push("/home");
      }, 3000);
    }
    // 获取当前patientid的病人的影响质量，报告质量，阴阳未定性
    this.getPatientInfo();
  },
  beforeMount: function() {},
  mounted: function() {
    const oIframe = document.getElementById("edit-iframe");
    if (this.typeEdit === 0) {
      oIframe.src =
        this.ip +
        "/xhhms/remoteReportController.do?goCloudEdit&id=" +
        this.id +
        "&jwtstr=" +
        this.token;
    } else {
      oIframe.src =
        this.ip +
        "/xhhms/remoteReportController.do?goEdit&id=" +
        this.id +
        "&jwtstr=" +
        this.token;
    }
    var that = this;
    window.addEventListener("message", function(res) {
      if (res.data && !res.data.hasOwnProperty("type")) {
        console.log(res.data);
        if (res.data.indexOf("webpackHotUpdate") != -1) {
          return false;
        }
        var data = JSON.parse(res.data);
        if (data.doSave) {
          var params = data.doSave;
          if (params.imageDescribe == "" || params.conclusion == "") {
            this.$message({
              showClose: true,
              message: "请填写检查提示和检查所见",
              type: "error"
            });
            return false;
          }
          console.log('xxxxxxxxxxxxxxxxxxx',params);
          if (that.typeEdit == 0) {
            that.$api.remoteEditdoCloudSave(params).then(
              res => {
                var data = res;
                if (!!data && data.status == "1") {
                  that.$message({
                    showClose: true,
                    message: "操作成功",
                    type: "success"
                  });
                  const oIframe = document.getElementById("edit-iframe");
                  oIframe.src =
                    that.ip +
                    "/xhhms/remoteReportController.do?goCloudEdit&id=" +
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
              },
              err => {
                console.log(err);
              }
            );
          } else {
            that.$api.remoteEditdoSave(params).then(
              res => {
                var data = res;
                if (!!data && data.status == "1") {
                  that.$message({
                    showClose: true,
                    message: "操作成功",
                    type: "success"
                  });
                  const oIframe = document.getElementById("edit-iframe");
                  oIframe.src =
                    that.ip +
                    "/xhhms/remoteReportController.do?goEdit&id=" +
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
              },
              err => {
                console.log(err);
              }
            );
          }   
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
    params.parentid = '';
    this.$api.remoteEditgetKnwoledgeTree(params).then(
      res => {
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
      this.$api.remoteEditgetKnwoledgeTreedel(params).then(res => {
          var data = res;
          if (data.status == 1) {
            console.log(data);
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.FreshClick();
            this.delectDic = {};
            this.$refs.knowledgeright.closeTheShow();
            this.innerVisible = false;
            this.getPatientInfo();
          } else {
            console.log("失败");
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "error"
            });
            return false;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
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
        // 判断当前节点不是父级节点
        var acknowledgeid = treeNode.id;
        var params = { id: acknowledgeid };
        this.$api.remoteEditgetKnwoledgeTreeById(params).then(
            res => {
              var data = res;
              if (!!data && data.status == "1") {
                //console.log(data.data);
                console.log(event);
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
        // 是父级  请求子级增加内容
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
        this.$api.remoteEditgetKnwoledgeTree(params).then(
            res => {
              var data = res;
              console.log("data");
              if (!!data && data.status == "1") {
                var tree = $.fn.zTree.getZTreeObj("shuyuSelect"); //重新渲染
                if (!treeNode.zAsync) {
                  tree.addNodes(treeNode, data.data);
                  treeNode.zAsync = true;
                } else {
                  tree.reAsyncChildNodes(treeNode, "refresh"); //刷新内容
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
      params.id = this.id;
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
      document
        .getElementById("edit-iframe")
        .contentWindow.postMessage(JSON.stringify({ saveReport: params }), "*");
    },
    send: function() {
      this.senddialog = false;
      var params = new Object();
      params.id = this.id;
      this.$api.remoteEditdoSend(params).then(
          res => {
            var data = res;
            if (!!data && data.status == "1") {
              this.$message({
                showClose: true,
                message: "发送成功",
                type: "success"
              });
              const oIframe = document.getElementById("edit-iframe");
              oIframe.src =
                this.ip +
                "/xhhms/remoteReportController.do?goEdit&id=" +
                this.id +
                "&jwtstr=" +
                this.token;
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
      if (this.rejectReason == "") {
        this.$message({
          showClose: true,
          message: "请输入驳回原因！！",
          type: "error"
        });
        return false;
      }
      this.noPassdialog = false;
      var params = new Object();
      params.id = this.id;
      params.rejectReason = this.rejectReason;
        this.$api.remoteEditGoReject(params).then(
          res => {
            var data = res;
            if (!!data && data.status == "1") {
              this.$message({
                showClose: true,
                message: "驳回成功",
                type: "success"
              });
              const oIframe = document.getElementById("edit-iframe");
              oIframe.src =
                this.ip +
                "/xhhms/remoteReportController.do?goEdit&id=" +
                this.id +
                "&jwtstr=" +
                this.token;
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
      var params = new Object();
      params.id = this.id;
      this.$api.remoteEditDoCancelSend(params).then(
        res => {
          var data = res;
          if (!!data && data.status == "1") {
            this.$message({
              showClose: true,
              message: "取消发送成功",
              type: "success"
            });
            const oIframe = document.getElementById("edit-iframe");
            oIframe.src =
              this.ip +
              "/xhhms/remoteReportController.do?goEdit&id=" +
              this.id +
              "&jwtstr=" +
              this.token;
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
      this.zhenduanReportVisable = true;
      //id  home页面的传递过来
      var params = { id: this.id };
      this.$api.remoteEditdiagnosticrecord(params).then(
          res => {
            var data = res;
            if (!!data && data.status == "1") {
              this.zhenduanreportList = [];
              this.zhenduantotal = data.total;
              data.data.map(item => {
                if (
                  typeof item.imageDescribe != "undefined" &&
                  typeof item.conclusion != "undefined" &&
                  item.conclusion != "" &&
                  item.imageDescribe != ""
                ) {
                  item.imageDescribe = unescape(item.imageDescribe);
                  item.conclusion = unescape(item.conclusion);
                  let d = new Date(item.createDate);
                  item.createDate =
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
        params.id = this.id;
        params.remark = this.textareaReportBeizhu;
        this.$api.remoteEditDoRemark(params).then(
            res => {
              // console.log(res.data);
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
      window.open("/#/patientimages?patientId=" + this.id, "_blank");
    },
    opensave: function() {
      this.savedialog = true;
    },
    opennoPass: function() {
      if (this.remoteStatus == 2 || this.remoteStatus == 0) {
        this.$message({
          showClose: true,
          message: "当前远程状态不可以进行此操作！！",
          type: "error"
        });
        return false;
      }
      this.noPassdialog = true;
    },
    opensend: function() {
      if (this.remoteStatus == 2 || this.remoteStatus == 0) {
        this.$message({
          showClose: true,
          message: "当前远程状态不可以进行此操作！！",
          type: "error"
        });
        return false;
      }
      this.senddialog = true;
    },
    opencancelSend: function() {
      if (this.remoteStatus == 1 || this.remoteStatus == 0) {
        this.$message({
          showClose: true,
          message: "当前远程状态不可以进行此操作！！",
          type: "error"
        });
        return false;
      }
      this.cancelsenddialog = true;
    },
    getPatientInfo: function() {
      // 获取病人的三个信息
      console.log("开始查询病人的三个信息");
      var params = new Object();
      params.id = this.id;
      this.$api.remoteEditgetReportByid(params).then(
          res => {
            var data = res;
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
              this.btnStatus = data.data.status;
              console.log("[*] 当前病人状态----", this.btnStatus);
              // 查看远程状态
              this.remoteStatus =
                typeof data.data.remoteStatus == "undefined"
                  ? 0
                  : data.data.remoteStatus;
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
      // 判断当前状态
      if (this.btnStatus == "A" || this.btnStatus == "R") {
        // 已诊断 已审核不可以操作
        this.$message({
          showClose: true,
          message: "当前状态不可以进行该操作！！",
          type: "error"
        });
        return false;
      }
      // 初审
      var params = new Object();
      params.id = this.id;
      this.$api.remoteEditUpdateStatus(params).then(
          res => {
            var data = res;
            //console.log(data);
            if (!!data && data.status == "1") {
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success"
              });
              const oIframe = document.getElementById("edit-iframe");
              oIframe.src =
                this.ip +
                "/xhhms/remoteReportController.do?goEdit&id=" +
                this.id +
                "&jwtstr=" +
                this.token;
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
      // 审核
      if (this.btnStatus == "A" || this.btnStatus == "C") {
        // 已诊断 已审核不可以操作
        this.$message({
          showClose: true,
          message: "当前状态不可以进行该操作！！",
          type: "error"
        });
        return false;
      }
      var params = new Object();
      params.id = this.id;
      this.$api.remoteEditUpdateStatus(params).then(
          res => {
            var data = res;
            if (!!data && data.status == "1") {
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success"
              });
              const oIframe = document.getElementById("edit-iframe");
              oIframe.src =
                this.ip +
                "/xhhms/remoteReportController.do?goEdit&id=" +
                this.id +
                "&jwtstr=" +
                this.token;
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
      // 复审
      if (this.btnStatus == "C" || this.btnStatus == "R") {
        // 已诊断 已审核不可以操作
        this.$message({
          showClose: true,
          message: "当前状态不可以进行该操作！！",
          type: "error"
        });
        return false;
      }
      console.log("复审");
      var params = new Object();
      params.id = this.id;
      this.$api.remoteEditUpdateStatus(params).then(
          res => {
            var data = res;
            //console.log(data);
            if (!!data && data.status == "1") {
              console.log("复审");
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success"
              });
              const oIframe = document.getElementById("edit-iframe");
              oIframe.src =
                this.ip +
                "/xhhms/remoteReportController.do?goEdit&id=" +
                this.id +
                "&jwtstr=" +
                this.token;
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
    },
    openUpload: function() {
      console.log('显示会诊框');
      var params = {}
      params.id = this.id;
      this.$api.IndexcaneditReport(params).then((res) => {
          var data = res.data;
          console.log('判断权限中--',data);
          if(data.canedit == 0 || data.canedit == '0'){
            // 不能进行编辑
            this.$message({
              showClose:'true',
              message: '影像已上报不能再进行上报',
              type:'warning',
            });
            return false;
          }else if(data.canedit == 2 || data.canedit == '2'){
            this.$message({
              showClose:'true',
              message: '已经添加会诊信息不能再进行上报',
              type:'warning',
            });
          return false;
        } else {
          // 获取医院列表
          var params=new Object();
          this.$api.IndexgetCloudHospitalList(params).then((res) => {
            var data = res;
            this.hospitalList=data.data;
          })
          this.upReportHospitalVisible = true;
        }
      })
      
    },
    saveUpload: function() {
       // 确定上报医院
      if(this.upReportform.hospitalName == ''){
          this.upReportform.errorShow = true;
          this.upReportform.errormsg = '请选择上报医院';
          return false;
      }else{
        var params = new Object();
        params.id = this.id;
        params.hospitalName = this.upReportform.hospitalName;
        this.hospitalList.map(hospital=>{
          //  console.log(master);
          if(hospital.departname === this.upReportform.hospitalName){
            let a = {}
            a.code = hospital.orgCode;
            params.hospitalCode = hospital.orgCode;
          }
          })
          console.log('[*]当前参数+++++++++',params);
        // 开始提交上报医院  修改状态  
        this.$api.Indexreportimage(params).then((res) => {
          this.$message({
            showClose:true,
            message: '操作成功!!',
            type:'success',
          });
          // 更新列表
          // 刷新表格数据   隐藏上传
          this.upReportHospitalVisible = false;
        })
      }     
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style   lang="stylus" rel='stylesheet/stylus'>

@import '../../../common/styleus/index.styl';

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

.el-radio__label {
  font-size: 12px;
}

.el-textarea__inner {
  font-size: 12px;
}
</style>
