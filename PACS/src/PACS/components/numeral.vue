<template>
  <div class="centent">
    <nav >
      <el-row>
        <el-col :span="20">
          <ul>
            <li @click="isActive(index)" :class="{isActive:item.active}" :key="index" v-for="(item,index) in dates">
              {{item.Date}}
            </li>
          </ul>
        </el-col>
        <el-col :span="4">
          <el-button  icon="el-icon-arrow-left"   size="medium" circle  class="el-button" @click="leftClick"></el-button>
          <el-button  icon="el-icon-arrow-right"  size="medium" circle  class="el-button" @click="rightClick"></el-button>
          <button  class="days"  @click="istodayClick">今天</button>
        </el-col>
      </el-row>
    </nav>
    <div class="progress" >
      <span class="span" v-if="today.thistime == dates[trueindex].Date">{{time}}</span>
      <span class="span" v-else ></span>
      <el-progress :show-text="false" :stroke-width="10" :percentage="progress"  class="el-progress"></el-progress>
      <span class="span">{{numeral.current}}/{{numeral.total}}人</span>
      <span class="spans">下一号：{{numeral.next}} ( {{numeral.name}} ) </span>
    </div>
    <div class="buttons">
      <!-- <button class="spanButton">扫描申请单</button>
      <button class="spanButton">分诊</button>
      <button class="spanButton">清空</button> -->
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
      data() {
        return {
          ip: this.CONSTANT.CONSTANT.WEB_URL,
          msg: "",
          trueindex:0,
          createindex:0,
          dates:[
            {Date:"",active:"",tt:""}
          ],
          time:"",
          numeral:{},
          today:{},
          progress:0,
          token:localStorage.getItem('token') ,
        };
      },

      created(){
        this.getTime();
        this.getdates(this.createindex);
        this.getTodyDates();
       
      },

      methods: {

        getTodyDates(){
           this.today = this.main.getDate(0);
           this.getManNumber(this.today.tt);
        },
        isActive(index){
          this.trueindex=index;
          this.dates.map((item)=>{
            item.active = false;
          });
          this.dates[index].active = true;
          this.getManNumber(this.dates[index].tt);
          this.getTime();
        },

       leftClick :function () {
         this.getTime();
          if (this.dates[0].active == true) {
            this.createindex=this.createindex-1;
            this.getdates(this.createindex);
            this.getManNumber(this.dates[0].tt);
            this.trueindex=0;
          }else {
            this.dates.map((item)=>{
              item.active = false;
            });
            console.log(this.trueindex);
            this.dates[this.trueindex-1].active=true;
            this.getManNumber(this.dates[this.trueindex-1].tt);
            this.trueindex=this.trueindex-1;
          }
       },
        rightClick :function () {
          this.getTime();
          if (this.dates[6].active == true) {
            this.createindex=this.createindex+1;
            this.getdates(this.createindex);
            this.dates[0].active=false;
            this.dates[6].active=true;
            this.getManNumber(this.dates[6].tt);
            this.trueindex=6;
          }else {
            this.dates.map((item)=>{
              item.active = false;
            });
            console.log(this.trueindex);
            this.dates[this.trueindex+1].active=true;
            this.getManNumber(this.dates[this.trueindex+1].tt);
            this.trueindex=this.trueindex+1;
          }
        },
        getdates(index){
          let data0 = this.main.getDate(index);
          let data1 = this.main.getDate(index+1);
          let data2 = this.main.getDate(index+2);
          let data3 = this.main.getDate(index+3);
          let data4 = this.main.getDate(index+4);
          let data5 = this.main.getDate(index+5);
          let data6 = this.main.getDate(index+6);
          this.dates=[
            {Date:data0.thistime,active:true,tt:data0.tt},
            {Date:data1.thistime,active:false,tt:data1.tt},
            {Date:data2.thistime,active:false,tt:data2.tt},
            {Date:data3.thistime,active:false,tt:data3.tt},
            {Date:data4.thistime,active:false,tt:data4.tt},
            {Date:data5.thistime,active:false,tt:data5.tt},
            {Date:data6.thistime,active:false,tt:data6.tt},
          ];
          console.log(this.dates);
        },
        istodayClick: function () {
          this.getTime();
          if (this.today.thistime < this.dates[0].Date) {
            this.createindex=0;
            this.getdates(this.createindex);
            this.getManNumber(this.dates[0].tt);
            this.trueindex=0;
          }else if (this.today .thistime > this.dates[6].Date ) {
            this.createindex=-6;
            this.getdates(this.createindex);
            this.dates[0].active=false;
            this.dates[6].active=true;
            this.getManNumber(this.dates[6].tt);
            this.trueindex=6;
          }else {
            for (var i=0;i<this.dates.length;i++) {
                let  item=this.dates[i];
                if(this.today.thistime!=item.Date){
                  item.active = false;
                }else {
                  item.active = true;
                  this.getManNumber(item.tt);
                  this.trueindex=i;
                }
            }
          }
        },
        getTime(){
          var now =new Date()
          var hours= now.getHours()+" : 00";
          var nexthours= now.getHours()+1+" : 00";
          this.time=hours+" - "+nexthours
        },
        getManNumber(time){
          console.log("time");
          console.log(time+"time");
          var params=new Object();
          params.arrivedDatetime=time;
          this.$http.post(this.ip + '/xhhms/rest/interClinicalController/v1/getManNumber', params, {
            headers: {
              'X-AUTH-TOKEN': this.token
            }
          }).then((res) => {
            var data = JSON.parse(res.data);
            if (!!data) {
              this.numeral=data.data;
              if (data.data.total === 0) {
                this.progress=0;
              }else {
                this.progress=Math.round((data.data.current/data.data.total)*100*Math.pow(10, 0))/Math.pow(10, 0)
              }
            } else {
              return false;
            }
          }, (err) => {
            console.log(err);
          })
        }


      }
    }
</script>

<style scoped lang="stylus">
  @import '../../common/styleus/index.styl';

  .centent {
    width: 98%;
  }

  ul {
    width: 100%;
    overflow: hidden;
  }

  li {
    width: 13.5%;
    min-width :60px;
    margin-right :5px;
    height: 32px;
    float: left;
    font-size: 13px;
    text-align: center;
    line-height: 32px;
    border-top-left-radius:3px;
    border-top-right-radius:3px;
    background-color :#b0b1b2;
    cursor:pointer;
  }

  span {
    font-size: 13px;
  }

  .isActive{
    background-color: $blue;
    color: $colorWhite;
  }

  .progress {
    background-color:#e2e0e0;;
    width: 100%;
    height:100px;
    padding-top: 15px;
    
  }

  .span{
    margin-left :2%;
  }
  .spans{
    float :right
    margin-right :2%;
  }
  .el-progress{
    width :96%;
    margin-top :15px;
    margin-left :2%;
    margin-bottom :12px;
  }
  .el-button{
    width :28px;
    text-align: center;
    padding :5px;
    margin-left :5px;
  }
    .days{
      height :28px;
      width :60px;
      text-align: center;
      font-size: 13px;
      margin-left :10px;
      border-radius :20px ;
    }
  .buttons{
    margin-top :5px;
  }
  .buttons::after{
    clear:both;
  }
 .spanButton{
   width :12%;
   float:right;
   margin-right :10px;
   margin-top :10px;
   border: 1px solid #8c939d;
   border-radius: 4px;
 }
  >>> .el-progress-bar__outer{
    background-color:#cacaca!important;
  }
</style>
