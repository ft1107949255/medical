<template>
  <div class="centents">
    <div class="tiaoz">
    <el-select class="paddings"  size="small" clearable  v-model="deviceType" v-if="isAddSelect" placeholder="设备类型" >
        <el-option
        v-for="item in objlist"
        :key="item.id"
        :label="item.name"
        :value="item.name">
      </el-option>
    </el-select>
    <el-select class="paddings" size="small" clearable v-model="device" v-if="isAddSelect" placeholder="检查设备" >
        <el-option
        v-for="item in equipmentlist"
        :key="item.id"
        :label="item.name"
        :value="item.name">
      </el-option>
    </el-select>
    <el-input class="paddings" size="small" placeholder="按名称查询" clearable v-model="inputstr"/>
    <el-button class="setButton" type="primary" size="small" icon="el-icon-search"  @click="isActive">查询</el-button>
    <el-button class="setButton" type="primary"  size="small" icon="el-icon-plus"  @click="addFatherType"  v-if="isAddType">新增父级类别</el-button>
    <el-button class="setButton" type="primary" size="small" icon="el-icon-plus"  @click="isAdd" >新增</el-button>
    <el-button class="setButton" type="primary"  size="small" icon="el-icon-edit"  @click="isUpdate">修改</el-button>
    <el-button class="setButton" type="primary" size="small" icon="el-icon-delete"  @click="isDeleteDialog">删除</el-button>
    
     <el-dialog
          title="警告"
          :visible.sync="deleteialog"
          width="30%">
          <span>确定删除</span>
          <span v-if="state.thisdata">{{state.thisdata.name}}</span>
          <span>么？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteialog = false">取 消</el-button>
            <el-button type="primary" @click="isDelete">确 定</el-button>
          </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "state",
    "getChoiceList",
    "getDATAList",
    "thisdata",
    "isUpdate",
    "isAdd",
    "addFatherType",
    "isAddType",
    "isAddSelect",
    "orgCode"
  ],
  data() {
    return {
      // ip: this.CONSTANT.CONSTANT.WEB_URL,
      // token: localStorage.getItem("token"),
      msg: "",
      inputstr: "",
      objlist:[],
      equipmentlist:[],
      deviceType:"",
      device:"",
      deleteialog:false,
    };
  },
  
  watch: {
      isAddSelect() {
        if(this.isAddSelect){
          this.getlist();
          this.getEquipmentlist();
        }else{
        this.deviceType="";
        this.device="";
        }
      }
    },
  methods: {
     getlist() { // 获取检查类型
      console.log("JINLAI");
      this.$api.getMytitleDeviceTypeApi().then(res => {
        console.log(res);
        var data = res.data;
        if (data.status == 1) {
          this.objlist = data.data;
        } else {
          return false;
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    getEquipmentlist() {  //获取检查设备列表
      console.log("JINLAI");
      this.$api.getMytitleEquipmentApi().then(res => {
        console.log(res);
        var data = res.data;
        if (data.status == 1) {
          this.equipmentlist = data.data;
        } else {
          return false;
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    isActive(index) {
      console.log(passssp);
      const passssp = {};
     if(this.isAddSelect){
       if(this.deviceType){
          this.objlist.map(item=>{
            if(this.deviceType == item.name){
              passssp.deviceType=item.code;
            }
          })
       }
       if(this.device){
          passssp.device=this.device;
       }
       if(this.inputstr){
          passssp.name = this.inputstr;
       }
     }else{
       passssp.name = this.inputstr;
     }
     passssp.orgCode = this.orgCode
      console.log(passssp, this.state.urls);
      if (!!this.state.urls) {
        this.getDATAList(this.state.urls, passssp);
      } else {
        for (var i = 0; i < this.state.data.length; i++) {
          if (this.state.data[i].active == true) {
            console.log(passssp);
            this.getDATAList(this.state.data[i].url, passssp);
            return;
          }
        }
      }
    },
    isDelete() {

      this.deleteialog = false;
      console.log(
        "-------------------------------",
        this.state.urls,
        this.state.thisdata.id
      );
      var params = {};
      params.id = this.state.thisdata.id;
      if (!this.state.urls) {
        console.log(this.state.thisdata);
        if (!this.state.thisdata.id) {
          this.$message({
            showClose: true,
            message: "请选择一个要删除的信息",
            type: "warning"
          });
        }
        this.getChoiceList(this.state.urls + "del", params);
        this.state.thisdata.id = "";
      } else {
        if (!this.state.thisdata.id) {
          this.$message({
            showClose: true,
            message: "请选择一个要删除的信息",
            type: "warning"
          });
        }
        for (var i = 0; i < this.state.data.length; i++) {
          if (this.state.data[i].active == true) {
            this.getChoiceList(this.state.data[i].url + "del", params);
          }
          this.state.thisdata.id = "";
        }
      }
    },
    isDeleteDialog:function(){
        if (!this.state.urls) {
        console.log(this.state.thisdata);
        if (!this.state.thisdata.id) {
          this.$message({
            showClose: true,
            message: "请选择一个要删除的信息",
            type: "warning"
          });
          return false;
        }
        this.getChoiceList(this.state.urls + "del", params);
        this.state.thisdata.id = "";
      } else {
        if (!this.state.thisdata.id) {
          this.$message({
            showClose: true,
            message: "请选择一个要删除的信息",
            type: "warning"
          });
          return false;
        }
      }
      this.deleteialog = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">


.centents {
  width: 100%;
  height: 40px;
  background-color: $bgNav;
}

.isActive {
  background-color: $blue;
  color: $colorWhite;
}

.paddings {
  margin-left: 10px;
  height: 35Px;
  width: 130px;
  float: left;
}

.setButton {
  float: left;
  margin-left: 10px;
  background-color: $blue;
  color: $colorWhite;
}

.tiaoz {
  height: 40Px;
  margin-top: 5px;
}
</style>