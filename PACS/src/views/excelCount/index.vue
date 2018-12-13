<template>
  <div class="excelCountDIV">
    <div class="container">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">上级医院会诊</el-menu-item>
        <el-menu-item index="2">下级医院会诊</el-menu-item>
        <li class='el-menu-item'><el-button type="primary" size="medium" @click="exportData">导出</el-button></li>
      </el-menu>
    <div class="excelCountTable1" v-show="showTable1">
      <el-table
        :data="tableData1.countList"
        border
        height="800"
        style="width: 100%">
        <el-table-column v-for="(col, index) in tableData1.tableList" :key="index" :prop="col.prop" show-overflow-tooltip :label="col.label" width="col.width">
        </el-table-column>
      </el-table>
      <!-- <div class="excelPage">
        <el-pagination
          small
          background
          layout="prev, pager, next"
          page-size="15"
          current-page.sync = ''
          current-change='getTable1Data()'
          :total="30">
        </el-pagination>
      </div> -->
    </div>
    <div class="excelCountTable2" v-show="showTable2">
      <el-table
        :data="tableData2.countList"
        border
        height="800"
        style="width: 100%">
        <el-table-column v-for="(col, index) in tableData2.tableList" :key="index" :prop="col.prop" show-overflow-tooltip :label="col.label" width="col.width">
        </el-table-column>
      </el-table>
      <!-- <div class="excelPage">
        <el-pagination
          background
          small
          layout="prev, pager, next"
          page-size="15"
          current-page.sync = ''
          current-change='getTable1Data()'
          :total="30">
        </el-pagination>
      </div> -->
    </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "../../common/js/date";
import {api} from '../../config/website';
export default {
  name: 'index',
  components: {
    api,
  },
  data() {
    return {
      tableData1:[],
      tableData2:[],
      showTable1: true,
      showTable2: false,
      activeIndex: '1',  // 设置表默认选择项
    };
  },
  created() {
    this.getTable1Data()
    this.getTable2Data()
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    // 第一个table 接口
    getTable1Data() {
      this.$api.getExcelCountData1().then(res => {
        this.tableData1 = res.data
        let row = {
          "SS":0,
          "DD":0,
          "CT":0,
          "location_name":"第三人民医院",
          "MR":0,
          "count":1,
          "DR":0,
          "consultation_doctor_name":'冯子阳',
          "SR":0
        }
        // for(var i=0; i<=20; i++){
        //   this.tableData1.countList.push(row)
        // }
      })
    },
    getTable2Data() {
      this.$api.getExcelCountData2().then(res => {
        this.tableData2 = res.data
        let row = {
            "SS":0,
            "DD":0,
            "CT":0,
            "consultation_location_name":"专家库",
            "MR":2,
            "count":3,
            "DR":1,
            "realname":"马号",
            "consultation_doctor_name":"专家1",
            "SR":0
        }
        // for(var i=0; i<=20; i++){
        //   this.tableData2.countList.push(row)
        // }
      })
    },
    handleSelect(val) {
      if(val !=='3'){
        this.showTable1 = val === '1'? true  : false
        this.showTable2 = val === '1'? false : true
      } else {
        this.exportData()
      }
    },
    exportData() {
      this.$api.exportData({}, { responseType: 'blob' }).then(res => {
        let blob = new Blob([res], {type:"application/vnd.ms-excel"});
        const fileName = '会诊信息.xls';
        const elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      })
    }
  },  
  filters:{
    changeData(value){
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd"); 
    }
  }
};
</script>

<style lang='stylus' scoped>
  .excelCountDIV{
    .container{
       min-height 861px
      .excelCountTable1{
        height 800px
        .excelPage{
          float right
          >>> li{
            font-size 12px
          }
        }
      }
      .excelCountTable2{
        height 800px
        .excelPage{
          float right
          >>> li{
            font-size 12px
          }
        }
      }
      .el-menu-item{
        font-size 12px
      }
    }  
    height 100%
    background-color #d4d4d4
    overflow auto
    >>> .el-table .cell{
      font-size 12px
    }
  }
</style>
