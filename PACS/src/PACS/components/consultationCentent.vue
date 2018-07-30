<template>
  <div class="content_main">
    <!-- <centerNav v-on:Active="active" :num='state.hospitalTotal'/> -->
    <div style="background-color:#cdd0d3;">
      <ul>
        <li @click="isActive(index)" :class="{isActive:item.active}" :key="index" v-for="(item,index) in navList1">
          {{item.text}}
          <span>{{item.num}}</span>
        </li>
      </ul>
    </div>

    <div class="content-table">
    <Table
    :typeMouse='type'
    ref="Table"
    :list='state.hospitalList'
    :columns='state.hospitalColums'
    :otherHeight = 'otherHeight'
    @handleSelectionChange='handleSelectionChange'
    @handleRowClick='handleRowClick'
    :thisdata='thisdata'
    ></Table>
    </div>
    <div class="pagination">
    <pagination :pageSize="pageSize"
    :currentPage = "state.hospitalPage"
    :total = "state.hospitalTotal"
    @handleIndexChange = "handleIndexChange"
    @handleSizeChange = "handleSizeChange"
    ></pagination>
    </div>
    <div class="content-bottom">
       <bottomNav ref="bottomNav" :rowData="thisdata" :paramsList='paramsList'/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import centerNav from "./../components/CenterNav.vue";
import pagination from "./../components/table/Pagination.vue";
import Table from "./../components/table/Table.vue";

import bottomNav from "./../components/BottomNav.vue";
export default {
  props:['state','navList1'],
  data() {
    return {
       paramsList:{
        startTime:'',
        endTime: '',
      },
      thisdata: {},
      otherHeight: 470,
      pageSize: 10,
      options:{},
      type:0,// 是否显示右键 0 1
    };
  },
  created() {
  },
  methods: {
    // 切换页码
    handleIndexChange(val) {
      this.$emit('handleIndexChange', val);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit('handleSizeChange', val);
    },
    // 选中行
    handleSelectionChange(val) {
      console.log("val:", val);
    },
    // 点击行
    handleRowClick(row) {
      console.log("获取值", row);
      row.imageDescribe = unescape(row.imageDescribe);
      row.conclusion=unescape(row.conclusion);
      row.remark=unescape(row.remark);
      this.thisdata = row;
      this.$emit('handleRow',row);
      //这里是table点击 单击   是这边？
      // this.$refs.bottomNav.rowData1 = row;
      this.$refs.bottomNav.state.hospitalList = [];
      this.$refs.bottomNav.state1.hospitalList = [];
      this.$refs.bottomNav.getDataList(row.id);
    },
    handledblRowClick(row){
     //这里是table点击  双击  是这边？
     this.$emit('handledblRow',row);
    },
    active(str){
       console.log(str)
       this.$emit('statusClick',str);
    },
    isActive(index){
      this.navList1.map((item)=>{
        item.active = false;
      });
      this.pageSize=10;
      this.navList1[index].active = true;
      this.$emit('getIndex',index);
    }
  },
  components: {
    // centerNav,
    bottomNav,
    Table,
    pagination
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

.content_main {
  width: 100%;
  height :100%;
  display: flex;
  flex-direction: column;

  .content-table {
    flex: 1;
    overflow-y: auto;
    background-color :$gray;
    // overflow: hidden;
  }

.pagination {
    height: 36px;
    text-align: center;
    background-color :$gray;
  }
  .content-bottom {
    height: 280px;
    width: 100%;
  }
  ul {
  width: 100%;
  overflow: hidden;
}

li {
  width: 12%;
  height: 42px;
  float: left;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  line-height: 42px;
}

span {
  font-size: 18px;
}

.isActive{
  background-color: $blue;
  color: $colorWhite;
}
  
}
</style>
