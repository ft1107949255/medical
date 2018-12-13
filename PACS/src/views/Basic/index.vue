<template>
  <div class="basic-info">
    <!-- Left nav -->
    <div class="left-nav">
      <!-- <ul  class="noSelect">
        <li @click="isActive(item)" :class="{isActive: item.active}" :key="item.id" v-for="item in menuList">
          <img :src="item.active ? item.iconPath : item.iconPath" />
          {{item.title}}
        </li>
      </ul> -->
      <!-- @select="selectMenu" -->
      <el-menu
          :default-active="defaultActive"
          unique-opened
          class="menu-item">
          <menu-item :data="menuList" :options="options"></menu-item>
        </el-menu>
    </div>
    <!--context -->
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// 私有组件
import menuList from "./leftMenu";
import MenuItem from 'Components/src/menuList'
import {formatTree} from '../../utils/tools.js'
export default {
  components: {
    MenuItem
  },
  data() {
    return {
      options: {
        icon: 'functionurl',
        iconActive: '',
        value: 'id',
        label: 'menu_name',
        children: 'children'
      },
      defaultActive: '-1',
      menuList: [
        // {
        //   title: "设备管理",
        //   path: "/devicesettings",
        //   iconPath: require("./images/01.png"),
        //   selecticonPath: require("./images/001.png"),
        //   active: false
        // },
        // {
        //   title: "设备类型管理",
        //   path: "/devicetypesettings",
        //   iconPath: require("./images/02.png"),
        //   selecticonPath: require("./images/002.png"),
        //   active: false
        // },
        // {
        //   title: "病人类型管理",
        //   path: "/patienttypesettings",
        //   iconPath: require("./images/09.png"),
        //   selecticonPath: require("./images/009.png"),
        //   active: false
        // },
        // {
        //   title: "检查项目管理",
        //   path: "/checkitemsettings",
        //   iconPath: require("./images/10.png"),
        //   selecticonPath: require("./images/010.png"),
        //   active: false
        // },
        // {
        //   title: "检查类型管理",
        //   path: "/checktypesettings",
        //   iconPath: require("./images/12.png"),
        //   selecticonPath: require("./images/012.png"),
        //   active: false
        // },
        // {
        //   title: "疾病管理",
        //   path: "/diseasesettings",
        //   iconPath: require("./images/15.png"),
        //   selecticonPath: require("./images/015.png"),
        //   active: false
        // },
        // {
        //   title: "ID生成器",
        //   path: "/makeidsettings",
        //   iconPath: require("./images/16.png"),
        //   selecticonPath: require("./images/016.png"),
        //   active: false
        // },
        // {
        //   title: "系统配置",
        //   path: "/systemsettings",
        //   iconPath: require("./images/17.png"),
        //   selecticonPath: require("./images/017.png"),
        //   active: false
        // },
        // {
        //   title: "调窗模板管理",
        //   path: "/windowsettings",
        //   iconPath: require("./images/18.png"),
        //   selecticonPath: require("./images/018.png"),
        //   active: false
        // },
        // {
        //   title: "专家库管理",
        //   path: "/expertssettings",
        //   iconPath: require("./images/19.png"),
        //   selecticonPath: require("./images/019.png"),
        //   active: false
        // },
        // {
        //   title: "专家科室管理",
        //   path: "/hospitaldepartmentsettings",
        //   iconPath: require("./images/20.png"),
        //   selecticonPath: require("./images/020.png"),
        //   active: false
        // },
        // {
        //   title: "数据源管理",
        //   path: "/databasesettings",
        //   iconPath: require("./images/21.png"),
        //   selecticonPath: require("./images/021.png"),
        //   active: false
        // },
        // {
        //   title: "相机管理",
        //   path: "/camerasettings",
        //   iconPath: require("./images/22.png"),
        //   selecticonPath: require("./images/022.png"),
        //   active: false
        // },
        // {
        //   title: "医生等级管理",
        //   path: "/doctorlevelsettings",
        //   iconPath: require("./images/23.png"),
        //   selecticonPath: require("./images/023.png"),
        //   active: false
        // },
        // {
        //   title: "用户信息管理",
        //   path: "/userinfosettings",
        //   iconPath: require("./images/24.png"),
        //   selecticonPath: require("./images/024.png"),
        //   active: false
        // },
        // {
        //   title: "组织结构管理",
        //   path: "/departmentsettings",
        //   iconPath: require("./images/25.png"),
        //   selecticonPath: require("./images/025.png"),
        //   active: false
        // },
        // {
        //   title: "用户角色管理",
        //   path: "/rolesettings",
        //   iconPath: require("./images/26.png"),
        //   selecticonPath: require("./images/026.png"),
        //   active: false
        // },
        // {
        //   title: "菜单列表管理",
        //   path: "/menusettings",
        //   iconPath: require("./images/27.png"),
        //   selecticonPath: require("./images/027.png"),
        //   active: false
        // }
      ]
    };
  },
  created() {
    this.getBasicMenuList();
  },
  computed: {},
  methods: {
    // 切换菜单
    isActive(item) {
      this.menuList.forEach(item1 => {
        item1.active = false;
      });
      item.active = true;
      if (item.path !=='') {
        this.$router.push(item.path);
      }
    },
    getBasicMenuList() {
      this.$api.getBasicMenuList().then(res => {
        // 根据需要组装数据
        let options = {
          parentId: 'parentfunctionid',
          id: 'id',
          childrens: 'children'
        }
        this.menuList = res.data.length > 0 ? formatTree(res.data, options) : [];
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.basic-info {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: $bgGray;
  overflow: hidden;
  .noSelect{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
}

.left-nav {
  width: 250px;
  height: 100%;
  flex: none;
  background-color: $gray;
  border-right: 7px solid $bgGray;
  box-sizing: border-box;
  overflow-y: scroll;
}
.left-nav::-webkit-scrollbar {
  display: none;
}
.container {
  flex: auto;
  height: 100%;
  background-color: $gray;
}

ul {
  width: 100%;
}

li {
  width: 100%;
  // height: 42px;
  cursor: pointer;
  font-size: 12px;
  line-height: 42px;
  // display: flex;
  align-items: center;
}

li img {
  width: 18px;
  height: 18px;
  margin: 0 15px 0 30px;
}

span {
  font-size: 18px;
}

// .isActive {
//   background-color: $blue;
//   color: $colorWhite;
// }
</style>
