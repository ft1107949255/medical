<template>
  <div class="centent">
<div id="app">
  <div class="collection">
    <a href="#!" class="collection-item"
       v-for="gameName in gameNames"
       @click="selected(gameName)"
       :class="{active: activeName == gameName}">{{gameName}}</a>
  </div>
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
        },
        gameNames: ['魔兽世界', '暗黑破坏神Ⅲ', '星际争霸Ⅱ', '炉石传说', '风暴英雄',
      '守望先锋'
    ],
    activeName: ''
      };
    },
    created() {
      this._getHospitalList();
      this._getDeviceTypeList();
      this._getCheckItemList();
    },
    methods: {
      search() {
        this.$emit('searchParams',this.searchParams);
      },
      clearForm() {
        for(let key in this.searchParams) {
          this.$refs[key].clear();
          
        }
        console.log(this.searchParams);
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
      selected: function(gameName) {
      this.activeName = gameName
    }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import '../../common/styleus/index.styl';

  .centent {
    width: 100%;
    background-color: $gray;
  }
  .padding {
    width 100%;
    margin: 24px 16.24% 24px 7%;
  }
  .btns{
    margin: 40px 16.24% 24px 7%;
    width: 100%;
  }
  .btns>button{
    width :34%;
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
</style>
