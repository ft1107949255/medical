<template>
  <div class="bottom_nav">
    <nav>
      <ul>
        <li @click="isActive(index)" :class="{isActive:item.active}" :key="index" v-for="(item,index) in data">
          {{item.text}}
        </li>
      </ul>
    </nav>
    <bottomkuang v-if="show0" :rowData="rowData"/>
    <bottomlist v-if="show1" :tabelList="state" v-on:search="searchClick" @handleIndexChange="handleIndexChange"
                 @handleSizeChange="handleSizeChange"/>
    <bottomlist v-if="show2" :tabelList="state1" v-on:search="searchClick" @handleIndexChange="handleIndexChange"
                 @handleSizeChange="handleSizeChange"/>
  </div>
</template>

<script>
import bottomkuang from "./../components/Bottomkuang.vue";
import bottomlist from "./../components/Bottomlist.vue";
export default {
  components: {
    bottomkuang,
    bottomlist
  },
   props:['rowData','paramsList'],
  data() {
    return {
      ip: this.CONSTANT.CONSTANT.WEB_URL,
      token: localStorage.getItem('token'),
      msg: "",
      data:[
        {text:'报告摘要',active:true},
        {text:'已匹配列表',active:false},
        {text:'未匹配列表',active:false},
      ],
      isMatched: '',
      show0: true,
      show1: false,
      show2: false,
      state: {
        hospitalList: [],
        hospitalColums: [],
        hospitalTotal: 0,
        hospitalPage: 1,
      },
      state1: {
        hospitalList: [],
        hospitalColums: [],
        hospitalTotal: 0,
        hospitalPage: 1,
      },
      searchParams: {},
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
      },
      rowData1:[],
      formParams:{},
      isMatched:'Y'
    };
  },
  mounted() {
    this.rowdata=this.$props.rowData;
    console.log("rowdata=");
    console.log(this.rowdata);
  },
  methods: {
    isActive(index){
      this.data.map((item)=>{
        item.active = false;
      });
      this.data[index].active = true;
      if (index ===0){
        this.show0 =true;
        this.show1 = false;
        this.show2 = false;
        this.isMatched='Y';
      }else if(index ===1){
        this.isMatched='M';
        this.show1 =true;
        this.show0 = false;
        this.show2 = false;
        // 查询已匹配列表
        //this.getDataList();
      }else{
        this.isMatched='N';
        this.show2 =true;
        this.show0 = false;
        this.show1 = false;
        //查询未匹配列表
        //this.getDataList();
      }
    },

    getDataList(id){
      var params = {};
      console.log('当前id',id);
      // console.log(typeof(this.rowData));
      if(!id){
        // 判断是否选中病人
          this.$message({
            showClose:true,
            message: '请在上方的表格选择一条数据',
            type:'warning'
          });
          return false;
      }
        // if(valParams.hasOwnProperty('consulationId')){
        //   // 判断是否是会诊查询
        //   params.consulationId = valParams.consulationId;
        // }else{
        //   params.id = valParams.id;
        // }
        console.log('表格参数--',this.formParams);
        if(!this.formParams.hasOwnProperty('patientNo')){
          params.id = id;
           params.isMatched=this.isMatched;
           params.startTime = this.paramsList.startTime;
           params.endTime   = this.paramsList.endTime;
        }else{
          console.log(1);
          params = this.formParams;
          params.id = id;
          params.isMatched=this.isMatched;
        }
        console.log('当前的参数',params);
        this.getPatientCheckList(params);
    },
    getPatientCheckList(params) {
      // this.searchParams=params;
      if(params.isMatched =='Y'){
        console.log('第一个tab');
        return false;
      }else if(params.isMatched =='M'){
          this.$http.post(this.ip + '/xhhms/rest/interDicomstudiesController/v1/getAll', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
          ).then((res) => {
            var data = JSON.parse(res.data);
            if (data.status == 1) {
              console.log('xxxxx',data);
              this.state.hospitalList =[];
            if(data.list){
              data.list.map(item=>{
                  console.log(item.patientsex);
                  if(item.patientsex == 'M'){
                    item.patientsex = '男'
                  }else {
                    item.patientsex = '女'
                  }
                  item.accesstime = new Date(parseInt(item.accesstime) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
                  item.status = this.statusList[item.status];
                  // var myDate = new Date();
                  // var year = myDate.getYear(); //获取当前年份(2位)
                  // console.log('当前年份',year);
                  // item.patientbir = year-parseInt(item.patientbir.substr(0, 4));
                })
                this.state.hospitalList =data.list;
              }
              this.state.hospitalColums = data.table;
              this.state.hospitalTotal = data.total;
              this.state.hospitalPage = data.page;
            } else {
              return false;
            }
          }).catch(err => {
            console.log(err);
          });
      }else{
        this.$http.post(this.ip + '/xhhms/rest/interDicomstudiesController/v1/getunmatch', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
          ).then((res) => {
            var data = JSON.parse(res.data);
            if (data.status == 1) {
              console.log(data);
              this.state1.hospitalList =[];
            if(data.list){
              data.list.map(item=>{
                  console.log(item.patientsex);
                  if(item.patientsex == "M"){
                    item.patientsex = '男'
                  }else {
                    item.patientsex = '女'
                  }
                  item.status = this.statusList[item.status];
                })
                this.state1.hospitalList =data.list;
              }
              this.state1.hospitalColums = data.table;
              this.state1.hospitalTotal = data.total;
              this.state1.hospitalPage = data.page;
            } else {
              return false;
            }
          }).catch(err => {
            console.log(err);
          });
      }
       
      },
  //搜索
    searchClick(form){
        console.log(form)
        let valParams = {};
        valParams.startTime = form.startTime;
        valParams.endTime = form.endTime;
        valParams.patientNo = form.patientNo;
        valParams.name = form.name;
        // valParams.sex = form.sex;
        valParams.studymodal  = form.deviceType;
        valParams.accessionNo   = form.CheckCode;
        console.log('xxxxxxxxxxxxxxx',valParams);
        this.formParams  = valParams;
        this.getDataList(this.rowData.id);
        // this.getPatientCheckList(from);
    },
    //
    handleIndexChange(val) {
      this.searchParams.page = val;
      this.getPatientCheckList(this.searchParams);
    },
    handleSizeChange(val) {
      this.searchParams.size = val;
      this.getPatientCheckList(this.searchParams);
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

.bottom_nav {
  width: 100%;
  height: 100% 
  background-color: #9d9e9f;
}
.centent::after{
  clear: both
}

ul {
  width: 100%;
  overflow: hidden;
}

li {
  width: 120px;
  height: 40px;
  float: left;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  line-height: 40px;
}

span {
  font-size: 26px;
}

.isActive{
  background-color: $blue;
  color: $colorWhite;
}
</style>
