<template>
  <div class="content_main">
    <centerNav v-on:Active="active" :num='state.hospitalTotal'/>
    <div class="content-table">
        <Table
              :typeMouse='type'
              ref="tabel"
              @collect='collect'
              @moreinfo='moreinfo'
              :list='state.hospitalList'
              :columns='state.hospitalColums'
              :options='options'
              :otherHeight = 'otherHeight'
              @handleSelectionChange='handleSelectionChange'
              @handleRowClick='handleRowClick'
              @handledblRowClick='handledblRowClick'
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
       <bottomNav ref="bottomNav"   :rowData='thisdata' :paramsList='paramsList'/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import centerNav from "./../components/CenterNav.vue";
import pagination from "./../components/table/Pagination.vue";
import Table from "./../components/table/Table.vue";
import bottomNav from "./../components/BottomNav.vue";
export default {
  props: ["state","params"],
  data() {
    return {
      thisdata: {},
      paramsList:{
        startTime:'',
        endTime: '',
      },
      otherHeight: 468,
      pageSize: 10,
      options:{},
      type:1,
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
      // 开始更新值
      // this.$refs.bottomNav.rowData1 = row;
      this.$refs.bottomNav.state.hospitalList = [];
      this.$refs.bottomNav.state1.hospitalList = [];
      this.$refs.bottomNav.getDataList(row.id);
    },
    handledblRowClick(row){
     //这里是table点击  双击  是这边？
     this.$emit('handledblRow',row);
    },
    active(str,str1){
       console.log(str)
       this.$emit('statusClick',str,str1);
    },
    cenle(){
      this.$refs.tabel.setCurrentRow();
    },
    collect(val){
      console.log('第一级',val);
      this.$emit('collect',val);
    },
    moreinfo(val){
      console.log('第一级信息',val);
      this.$emit('moreinfo',val);
    }
  },
  components: {
    centerNav,
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
    // overflow: hidden;
  }

  .pagination {
      height: 36px;
      text-align: center;
      background-color :$gray;;
    }
  .content-bottom {
    height: 280px;
    width: 100%;
  }
}
</style>
