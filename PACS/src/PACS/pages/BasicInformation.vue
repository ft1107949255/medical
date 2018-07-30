<template>
  <div class="cententBox">
    <nav>
      <!-- <headerNav @selectSort="clickSort"/> -->
    </nav>
    <div class="center">
      <div class="left" v-if="isHidden">
      <ul>
        <li @click="isActive(index)" :class="{isActive:item.active}" :key="index" v-for="(item,index) in state.data">
          <img  :src="item.active ? item.ActionImg : item.img"  width="18"/>
          {{item.text}}
        </li>
      </ul>
    
      </div>

      <div class="centent">
    
        <centent :state="state" 
                 ref="BasicInfor"   
                 :objlist="objlist"
                 :getChoiceList="getChoiceList" 
                 :getDATAList="getDATAList"
                 @handleIndexChange="handleIndexChange"
                 @handleSizeChange="handleSizeChange" 
                 getPatientCheckList 
                 :addObjectdata="addObjectdata"
                 :isOpen="open"
                 :SelectIsOpen="SelectOpen"
                 />
      </div>

    
    </div>
    <div class="bottom">
      <footNav :theIndex="0" :data="MainData"/>
    </div>
  </div>
</template>

<script>
import headerNav from "./../components/Nav.vue";
import leftSearch from "./../components/left.vue";
import centent from "./../components/BasicInformation.vue";
import footNav from "./../components/FooterNav.vue";
export default {
  components: {
    headerNav,
    leftSearch,
    centent,
    footNav
  },
  data() {
    return {
      ip: this.CONSTANT.CONSTANT.WEB_URL,
      token: localStorage.getItem("token"),
      MainData: JSON.parse(localStorage.getItem("nume")),
      status: "",
      isHidden: true,
      open: false,
      SelectOpen :false,
      loading: {},
      objlist:[],
      needActive: false,
      paramsData:{
         page: 0,
         size: 10
      },
      state: {
        hospitalList: [],
        hospitalColums: [],
        hospitalTotal: 0,
        hospitalPage: 1,
        data: [
          {
            text: "设备管理",
            active: true,
            url: "/xhhms/rest/interMedicalDeviceController/v1/",
            tilte: "设备",
            img:require('../../static/images/icon/01.png'),
            ActionImg:require('../../static/images/icon/001.png'),
          },
          {
            text: "设备类型管理",
            active: false,
            url: "/xhhms/rest/interMedicalDeviceTypeController/v1/",
            tilte: "设备类型",
            img:require('../../static/images/icon/02.png'),
            ActionImg:require('../../static/images/icon/002.png'),
          },
          {
            text: "检查部位管理",
            active: false,
            url: "/xhhms/rest/interMedicalCheckBodypartController/v1/",
            tilte: "检查部位",
            relationUrl: "/xhhms/rest/interMedicaBodyTypeController",
            img:require('../../static/images/icon/03.png'),
            ActionImg:require('../../static/images/icon/003.png'),
          },
          {
            text: "检查部位类型",
            active: false,
            url: "/xhhms/rest/interMedicaBodyTypeController/v1/",
            tilte: "检查部位类型",
            img:require('../../static/images/icon/04.png'),
            ActionImg:require('../../static/images/icon/004.png'),
          },
          {
            text: "检查方法管理",
            active: false,
            url: "/xhhms/rest/interMedicalCheckTypeController/v1/",
            tilte: "检查方法",
            img:require('../../static/images/icon/05.png'),
            ActionImg:require('../../static/images/icon/005.png'),
          },
          {
            text: "造影剂管理",
            active: false,
            url: "/xhhms/rest/interMedicalContrastMediumController/v1/",
            tilte: "造影剂",
            img:require('../../static/images/icon/06.png'),
            ActionImg:require('../../static/images/icon/006.png'),
          },
          {
            text: "摄影方向管理",
            active: false,
            url: "/xhhms/rest/interMedicalImageDirectionController/v1/",
            tilte: "摄影方向",
            img:require('../../static/images/icon/07.png'),
            ActionImg:require('../../static/images/icon/007.png'),
          },
          {
            text: "摄影体位管理",
            active: false,
            url: "/xhhms/rest/interMedicalImageBodypartController/v1/",
            tilte: "摄影体位",
            img:require('../../static/images/icon/08.png'),
            ActionImg:require('../../static/images/icon/008.png'),
          },
          {
            text: "病人类型管理",
            active: false,
            url: "/xhhms/rest/interMedicalPatientTypeController/v1/",
            tilte: "病人类型",
            img:require('../../static/images/icon/09.png'),
            ActionImg:require('../../static/images/icon/009.png'),
          },
          {
            text: "检查模板管理",
            active: false,
            url: "/xhhms/rest/intermedicaCheckTemplateController/v1/",
            tilte: "检查模板",
            projectUrl:"/xhhms/rest/interMedicaCheckItemController",//检查项目
            departmentUrl: "/xhhms/rest/interHospitalController/v1/getMyHospitalList", //检查科室
            equipmentUrl:"/xhhms/rest/interMedicalDeviceController",//检查设备
            img:require('../../static/images/icon/10.png'),
            ActionImg:require('../../static/images/icon/010.png'),
          },
          {
            text: "费用类型管理",
            active: false,
            url: "/xhhms/rest/interMedicaChargeTypeController/v1/",
            tilte: "费用类型",
            img:require('../../static/images/icon/11.png'),
            ActionImg:require('../../static/images/icon/011.png'),
          },
          {
            text: "检查项目管理",
            active: false,
            url: "/xhhms/rest/interMedicaCheckItemController/v1/",
            tilte: "检查项目",
            img:require('../../static/images/icon/12.png'),
            ActionImg:require('../../static/images/icon/012.png'),
          },
          {
            text: "综合评价管理",
            active: false,
            url: "/xhhms/rest/interMedicaEvaluationController/v1/",
            tilte: "综合评价",
            img:require('../../static/images/icon/13.png'),
            ActionImg:require('../../static/images/icon/013.png'),
          },
           {
            text: "纸张配置管理",
            active: false,
            url: "/xhhms/rest/interMedicalPaperController/v1/",
            tilte: "纸张配置",
            img:require('../../static/images/icon/14.png'),
            ActionImg:require('../../static/images/icon/014.png'),
          },
          {
            text: "疾病管理",
            active: false,
            url: "/xhhms/rest/interIdcController/v1/",
            tilte: "疾病",
            img:require('../../static/images/icon/15.png'),
            ActionImg:require('../../static/images/icon/015.png'),
          }
        ],
        dialogVisible: false
      }
    };
  },
  created() {
    this.isActive(0);
  },


  methods: {
     getlist(url,datalist) {
      console.log("JINLAI");
      this.$http
        .post(this.ip + url, { headers: { "X-AUTH-TOKEN": this.token } })
        .then(res => {
          console.log(res);
          var data = JSON.parse(res.data);
          this.state.hospitalPage = 0;
          if (data.status == 1) {
            this.objlist = data.data;
            datalist.list.map(item=>{
              data.data.map(items=>{
                if(item.deviceType==items.code){
                  item.deviceType=items.name;
                }
              })
            })
            this.state.hospitalList = datalist.list;
            this.state.hospitalColums = datalist.table;
            this.state.hospitalTotal = datalist.total;
            this.state.hospitalPage = datalist.page;
          } else { 
            return false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleIndexChange(val) {
      this.paramsData.page = val;
      this.getDATAList(this.state.obje.url, this.paramsData);
    },
    handleSizeChange(val) {
      this.paramsData.size = val;
      this.getDATAList(this.state.obje.url, this.paramsData);
    },
    activeFun(data) {
      this.navList.forEach(function(obj) {
        obj.isActive = false;
      });
      data.isActive = !data.isActive;
    },
    isActive(index) {
      if(this.needActive == false)
      {
      
        this.needActive = true;
        this.state.data.map(item => {
        item.active = false;
        });

        if (this.state.data[index].tilte == "疾病") {
          this.open = true;
        } else {
          this.open = false;
        }


        if (this.state.data[index].tilte == "检查模板") {
          this.SelectOpen = true;
        } else {
          this.SelectOpen = false;
        }
     
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        target: ".centent"
      }); 
      console.log('loading',this.loading)
      this.state.data[index].active = true;
      this.$emit("Active", this.state.data[index].status);
      this.state.urls = this.state.data[index].url;
      this.state.obje = this.state.data[index];
      this.state.hospitalPage=0;
      this.paramsData.name = '';
      // this.$refs.thisdata.name = '';
      this.getDATAList(this.state.data[index].url ,this.paramsData);
      setTimeout(() => {
        this.$refs.BasicInfor.clearThisdata();
      }, 3);
      console.log('getDATAList',this.state.data[index].url)
     }else{
        // 未加载完 不允许点击
        this.$message({
              message: '请数据加载完毕后 重试',
              type: 'warning'
         });
      }

    },

    getChoiceList(url, params) {
      this.loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                target: ".centent"
        }); 
      this.$http
        .post(this.ip + url, params, {
          headers: { "X-AUTH-TOKEN": this.token }
        })
        .then(res => {        
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log('data',data);
            console.log(this.state.obje.url);
            this.getDATAList(this.state.obje.url ,{});
          } else {
            return false;
            this.loading.close();
            this.needActive = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.loading.close();
          this.needActive = false;
        });
    },

   getDATAList(url,params) {
    //  if(params.name !=''){
        params.page=this.paramsData.page;
        this.paramsData.name=params.name;
        // this.paramsData.page = params.name ==''? 0 :this.paramsData.page; 
    //  }else{

    //  }
      console.log('params',params,url);
      this.$http
        .post(this.ip + url + "getAll",params, {
          headers: { "X-AUTH-TOKEN": this.token }
        })
        .then(res => {
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            console.log(data);
            this.loading.close();
            this.needActive = false;
              if(data.list){
               data.list.map(item=>{
                  console.log(item.sex);
                  if(item.defaultPaper == 0){
                    item.defaultPaper = '系统默认'
                  }else {
                    item.defaultPaper = '用户自定义'
                  }

                  if(item.paperResoure == 0){
                    item.paperResoure = '系统默认'
                  }else {
                    item.paperResoure = '用户自定义'
                  }

                   if(item.active == "1"){
                    item.active = '有效'
                  }else {
                    item.active = '无效'
                  }
                 })
              }
              console.log
            this.getlist("/xhhms/rest/interMedicalDeviceTypeController/v1/getlist",data);
          } else {
            return false;
            this.loading.close();
            this.needActive = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.loading.close();
          this.needActive = false;
        });
    },

    
    addObjectdata(url, params) {
       this.loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                target: ".centent"
        }); 
      this.$http
        .post(this.ip + url, params, {
          headers: { "X-AUTH-TOKEN": this.token }
        })
        .then(res => {
          console.log(res);
          var data = JSON.parse(res.data);
          if (data.status == 1) {
            this.getDATAList(this.state.obje.url,{});
          } else {
            this.loading.close();
            return false;
          }
        })
        .catch(err => {
          this.loading.close();
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';

.cententBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: $bgGray;
  overflow: hidden;
}

nav {
  width: 100%;
  height: 20px;
  background-color: $bgGray;
  overflow: hidden;
}

.center {
  flex: 1;
  width: 100%;
  overflow: hidden;
}

.left {
  width: 250px;
  height: 100%;
  float: left;
  background-color: $gray;
  border-right: 7px solid $bgGray;
  box-sizing: border-box;

}

.centent {
  margin-left :250px;
  height: 100%;
  background-color: $gray;
}

footer {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: $bgGray;
}

ul {
  width: 100%;
  overflow: hidden;
}

li {
  width: 100%;
  height: 42px;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  line-height: 42px;
  position:relative; 
}

li img{
  position:absolute;
  top:8px;
  top:12px;
  left:25%; 
}
span {
  font-size: 18px;
}

.isActive {
  background-color: $blue;
  color: $colorWhite;
}
</style>
