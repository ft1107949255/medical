<template>
  <div class="details">
    <div>病人编号:{{rowdata.patientNo}}</div>
    <div>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名:{{rowdata.name}}</div>
    <div>医疗机构:{{rowdata.locationName}}</div>
    <div>性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别:{{rowdata.sex}}</div>
    <div>联系电话:{{rowdata.phone}}</div>
    <div>身份证号:{{rowdata.Idcard }}</div>
    <div>身&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp高:{{rowdata.patientHeight}}</div>
    <div>体&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp重:{{rowdata.patientWeight}}</div>
    <div>病&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp区:{{rowdata.patientArea}}</div>
    <div>出生日期:{{rowdata.birthDate}}</div>
    <div>家庭住址:{{rowdata.address}}</div>
    <div>工作单位:{{rowdata.work}}</div>
  </div>
</template>

<script>
export default {
  props: ["rowdata"],
  data() {
    return {

    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

</style>
