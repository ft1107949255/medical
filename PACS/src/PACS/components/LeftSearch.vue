<template>
  <div class="left-search" style="font-size:12px; !important">
    <selects style="font-size:12px; !important" class="padding" name='医疗机构' :options="medicalOrganizationOptions" @change="change1" ref="medicalOrganization"/>
    <inputs class="padding" name='病人ID'  @change="change2" ref="patientNo"/>
    <inputs class="padding" name='姓名' @change="change3" ref="name"/>
    <selects class="padding" name='性别' :options="sexOptions" @change="change4" ref="sex"/>
    <selects class="padding" name='设备类型' :options="deviceTypeOptions" @change="change5" ref="deviceType"/>
    <selects class="padding" name='检查项目' :options="checkItemOptions" @change="change6" ref="checkItem"/>
    <times class="padding" name='到达时间' @change="change7" ref="arrivalTime"/>
    <datePicker class="padding" name='从' @change="change8" ref="startTime"/>
    <datePicker class="padding" name='到' @change="change9" ref="endTime"/>
    <div class="btns">
      <el-button class="setButton" type="primary" icon="el-icon-search" @click="search">查询</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="clearForm">清空</el-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import datePicker from "./DatePicker.vue";
  import inputs from "./Input.vue";
  import selects from "./Select.vue";
  import times from "./Times.vue";
  import {formatDate} from "../common/js/date";
  export default {
    components: {
      datePicker,
      inputs,
      selects,
      times
    },
    data() {
      return {
        ip: this.CONSTANT.CONSTANT.WEB_URL,
        token: localStorage.getItem('token'),
        medicalOrganizationOptions: [],
        deviceTypeOptions: [],
        checkItemOptions: [],
        sexOptions: [
          {
            code: "0",
            name: "男"
          },
          {
            code: "1",
            name: "女"
          },
        ],
        searchParams: {
          locationCode: '', // 医疗机构编码
          locationName: '', // 医疗机构名称
          patientNo: '',
          name: '',
          sex: '',
          modalityTypeCode: '', // 设备类型
          modalityTypeName: '', // 设备名称
          modalityCode: '', // 设备编码
          modalityName: '', // 设备名称
          arrivalTime: '',
          startTime: '',
          endTime: ''
        }
      };
    },
    created() {
      this._getHospitalList();
      this._getDeviceTypeList();
      this._getCheckItemList();
    },
    mounted(){
      // this.changeFontSize();
    },
    methods: {
      search() {
        this.$emit('searchParams',this.searchParams);
      },
      clearForm() {
        for(let key in this.searchParams) {
          console.log(key);
          this.searchParams[key] = '';
        }
        this.$refs.medicalOrganization.clear();
        this.$refs.patientNo.clear();
        this.$refs.name.clear();
        this.$refs.sex.clear();
        this.$refs.deviceType.clear();
        this.$refs.checkItem.clear();
        this.$refs.arrivalTime.clear();
        this.$refs.startTime.clear();
        this.$refs.endTime.clear();
      //console.log(this.searchParams);
      },
      _getHospitalList() {
        var params = {};
        this.$http.post(this.ip + '/xhhms/rest/interHospitalController/v1/getHospitalList', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
          var data = JSON.parse(res.data);
          if (data.status == 1) {
              data.data.map(item => {
              item.code = item.orgCode;
              item.name = item.departname;
            });
            this.medicalOrganizationOptions = data.data;
          } else {
            return false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      _getDeviceTypeList() {
        var params = {};
        this.$http.post(this.ip + '/xhhms//rest/interMedicalDeviceTypeController/v1/getlist', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            this.deviceTypeOptions = data.data;
          } else {
            return false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      _getCheckItemList() {
        var params = {};
        this.$http.post(this.ip + '/xhhms/rest/interMedicalCheckTypeController/v1/getlist', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then((res) => {
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            this.checkItemOptions = data.data;
          } else {
            return false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      change1(value) {
        var data = value.split(',');
        this.searchParams.locationCode = data[0];
        this.searchParams.locationName = data[1];
      },
      change2(value) {
        this.searchParams.patientNo = value;
      },
      change3(value) {
        this.searchParams.name = value;
      },
      change4(value) {
        var data = value.split(',');
        this.searchParams.sex = data[0];
      },
      change5(value) {
        var data = value.split(',');
        this.searchParams.modalityTypeCode = data[0];
        this.searchParams.modalityTypeName = data[1];
      },
      change6(value) {
        var data = value.split(',');
        this.searchParams.modalityCode = data[0];
        this.searchParams.modalityName = data[1];
      },
      change7(value) {
        this.searchParams.arrivalTime = value;
      },
      change8(value) {
        this.searchParams.startTime = formatDate(value, 'yyyy-MM-dd');
      },
      change9(value) {
        this.searchParams.endTime = formatDate(value, 'yyyy-MM-dd');
      },
      // changeFontSize:function(){
      //   var input = document.getElementsByClassName('el-input__inner');
      //   input.style.fontSize = '12px;';
      // }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="stylus">
  @import '../../common/styleus/index.styl';

  .left-search {
    width: 100%;
    background-color: $gray;
  }
  .padding {
    width 100%;
    margin: 15px 11% 13px 2%;
  }
  .btns{
    margin: 40px 11% 24px 2%;
    width: 100%;
  }
  .btns>button{
    width :38%;
    background-color: $gray;
    color: $blue;
    border: 1px solid $blue;

  }
  .btns>.setButton{
    margin-left  :5%;
    margin-right :5%;
    background-color: $blue;
    color:$colorWhite;
  }
  
  .left-search{
    font-size:12px !important;
  }
  .el-input__inner{
    font-size:12px;
  }
</style>
<style>
 .el-input__inner{
   font-size:12px !important;
 }
 .el-select-dropdown__item{
    font-size:12px !important;
 }
</style>
