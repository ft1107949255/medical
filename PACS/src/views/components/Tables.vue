<template>
<div class="centent">
  <table>
     <thead>
       <tr>
         <th :key="index" v-for="(item,index) in theadData">
           {{item.name}}
         </th>
       </tr>
     </thead>
     <tbody>
       <tr :key="index" v-for="(item,index) in tbodyData">
         <td :key="index2" v-for="(i,index2) in item ">{{i}}</td>
       </tr>
     </tbody>
   </table>
</div>
</template>

<script>
export default {
  // props: ["theadData"],
  data() {
    return {
      msg: "",
      theadData: [
        {
          name: "病人ID"
        },
        {
          name: "姓名"
        },
        {
          name: "年龄"
        }
      ],
      tbodyData: [
        {
          text: "123",
          name: "张三",
          age: 13
        },
        {
          text: "111",
          name: "小王",
          age: 18
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">


.centent {
  height:  400px;
}

table {
  width: 100%;
  max-height: 600px;
  font-size: 14px;
}

table thead {
  background-color: #9d9e9f;
}
th {
  height: 52px;
  padding: 0 20px;
  color: $tableHead;
  text-align: left;
}

tbody {
  background-color: $gray;
}

td {
  height: 52px;
  min-width: 120px;
  padding: 0 20px;
  color: $tableHead;
  text-align: left;
}

tbody>tr:hover {
  background-color: $haver;
}
</style>
