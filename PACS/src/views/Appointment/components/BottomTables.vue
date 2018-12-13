<template>
  <table>
     <thead>
       <tr>
         <th :key="index" v-for="(item,index) in theadData">
           {{item.label}}
         </th>
       </tr>
     </thead>
     <tbody>
       <tr :key="index" v-for="(item,index) in tbodyData">
         <td :key="index2" v-for="(i,index2) in item ">{{i}}</td>
       </tr>
     </tbody>
   </table>
</template>

<script>
export default {
  props: ["theadData","tbodyData"],
  data() {
    return {
      msg: "",
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">


.centent {
  height: 400px;
}

table {
  width: 100%;
  height: 100%;
  font-size: 14px;
}

table tbody{
  height:90px;
  min-height:90px;
}
th {
  // width:12.5%;
  height: 30px;
  padding: 0 20px;
  color: $tableHead;
  text-align: left;
}

tbody {
  background-color: #e2e0e0;
}

td {
  width:12.5%;
  height: 30px;
  /*min-width: 120px;*/
  padding: 0 20px;
  color: $tableHead;
  text-align: left;
}

tbody>tr:hover {
  background-color: $haver;
}
table tr th {
  border-right: 1px solid #d4d8da;
}
table tr th {
  background: #9d9e9f;
}

  /*
table tr:first-child th:first-child {
  border-top-left-radius: 12px;
}

table tr:first-child th:last-child {
  border-top-right-radius: 12px;
}

table tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

table tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
} * /
</style>
