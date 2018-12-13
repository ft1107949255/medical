<template>
  <div class="bottomList">
    <div class="tables">
        <tables :list='tabelList.hospitalList'
                  :columns='tabelList.hospitalColums'
                  :options='options'
                  @bottomTableClick= "bottomTableClick"
                   >
        </tables>
    </div>
    <div class="bottom_div">
      <div class="pagination">
            <pagination :pageSize="pageSize"
                        :currentPage = "tabelList.hospitalPage"
                        :total = "tabelList.hospitalTotal"
                        @handleIndexChange = "handleIndexChange"
                        @handleSizeChange = "handleSizeChange"
            ></pagination>
      </div>
      <div class="from">
        <el-row type="flex" justify="space-around">
         <el-col :span="2" >
           <span>从</span>
            <el-date-picker class="el-date-picker"  size="mini" v-model="from.startTime" @change="change1" type="date" placeholder="开始">
            </el-date-picker>
         </el-col>
         <el-col :span="2">
           <span>到</span>
           <el-date-picker type="date"  class="el-date-picker" v-model="from.endTime"  size="mini"  @change="change2" placeholder="结束" >
           </el-date-picker>
         </el-col>
         <el-col :span="3">
           <span>病人ID</span>
           <el-input v-model="from.patientId" clearable class="el-input"  size="mini" @change="change3"></el-input>
         </el-col>
          <el-col :span="3">
           <span>姓名</span>
           <el-input v-model="from.name" clearable  class="el-input"  size="mini" @change="change4"></el-input>
         </el-col>
         <!-- <el-col :span="2">
          <span>性别</span>
          <el-select class="el-select" v-model="from.sex" clearable placeholder=""  size="mini" @change="change5">
          <el-option
            v-for="item in gender"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
          </el-select>
         </el-col> -->
         <el-col :span="3">
         <span>设备类型</span>
         <el-select class="el-select" v-model="from.deviceType" clearable placeholder=""  size="mini" @change="chnage8">
          <el-option
             v-for="(item,key) in deviceType"
             :key="key"
             :label="item.name"
             :value="item.name">
          </el-option>
         </el-select>
         </el-col>
        <el-col :span="3">
          <span>检查号</span>
          <el-input v-model="from.CheckCode" clearable class="el-input"  size="mini" @change="change7"></el-input>  
         </el-col>
        <el-col :span="2">
          <el-button class="setButton" type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

   
<script>
import tables from "./HomeBottomTables.vue";
import datePicker from "../DatePicker.vue";
import pagination from "./../table/Pagination.vue";
import {formatDate} from "../../common/js/date"; 
export default {
  name: 'bottomlist',
  props:['tabelList'],
  data() {
    return {
      // ip: this.CONSTANT.CONSTANT.WEB_URL,
      // token: localStorage.getItem('token'),
      msg: "",
      pageSize: 10,
      options: {},
      deviceType:[],
      input10: '',
      currentPage4: 4,
      from:{
          startTime: '',//开始时间
          endTime: '' ,// 结束时间
          patientId: '',//病人ID
          name: '',//病人姓名
          sex: '', //病人性别
          deviceType:'',// 设备类型
          CheckCode: '', // 检查号
      },
      gender: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "0",
          label: "女"
        },
      ],
    };
  },
  
 created() {
      this._getDeviceTypeList();
      
    },

  methods: {
    // 切换页码
    handleIndexChange(val) {
      this.$emit('handleIndexChange', val);
    },
    //切换条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit('handleSizeChange', val);
    },
   _getDeviceTypeList() {
      var params = {};
      this.$api.getBottomlistDevictTypeList(params).then((res) => {
        var data = res;
        if (data.status == 1) {
          this.deviceType = data.data;
        } else {
          return false;
        }
      }).catch(err => {
        console.log(err);
      });
      },

      search() {
        this.$emit('search',this.from);
      },
      change1(value) {
        this.from.startTime = formatDate(value, 'yyyy-MM-dd');
      },
      change2(value) {
        this.from.endTime = formatDate(value, 'yyyy-MM-dd');
      },
      change3(value) {
        this.from.patientId = value;
      },
      change4(value) {
        this.from.name = value;
      },
      change5(value) {
        this.from.sex = value;
      },
      change7(value) {
        this.from.CheckCode = value;
      },
      chnage8(value){
        this.from.deviceType = value;
      },
      bottomTableClick: function(val){
        // 接收下方的表单的值
        this.$emit('bottomTableClick',val);
      }
  },
  components: {
    tables,
    datePicker,
    pagination
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

#bottomkuang{
  width:100%;
  height:240px;
  background-color:$gray
}

.bottomList{
  background-color:$gray;
  width:100%;
  height:240px;
}

.tables{
  width:100%;
  height:150px;
  background-color:$gray;
}

.bottom_div{
  width:100%;
  height:50px;
  padding-top:5px;
  background-color:$gray;
}

.el-col {
    height 40px;
    display inline-block;
}

span{
  font-size :12px;
}

.el-input{
  width:70% !important;
  height:34px;
}

.el-date-picker{
 width:80% !important;
  height:34px;
}

.bottom_select{
  width:14%;
}

.el-select{
  width:60%;
  height:34px;
}

.setButton{
  margin-top: -3px;
  height:34px;
}

.bottom{
  display: inline-block;
}

.pagination{
  margin-bottom:8px;
  height: 20px;
  text-align: center;
  // margin :0 auto;
}

.from{
  margin-top :20px;
  margin-left :5px;
  width :100%;
  min-width :1150px;
}


>>> .el-input__icon{
  height :28px;
}
</style>
