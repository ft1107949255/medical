import types from "./mutations_type";
import { isObject, isArray, isNumber, isString } from "lodash";
import { KEEP_ALIVE_ENABLE } from "Config";
const mutations = {
  // 更新用户信息
  [types.UPDATE_USER_INFO](state, data) {
    state.user = Object.assign(state.user, data);
    sessionStorage.setItem("user", JSON.stringify(data));
  },

  // 清空用户数据
  [types.DELETE_USER_INFO](state) {
    // 清除vuex用户数据
    state.user = {};
    // clear currentPathRecode
    state.currentPathRecode = [];
    // 清除当前网站数据
    state.currentSite = {};
    // 清除session数据
    sessionStorage.clear();
    //localStorage.clear();
  },

  // 修改当前网站
  [types.CHANGE_CURRENT_SITE](state, data) {
    state.currentSite = data;
    sessionStorage.setItem("currentSite", JSON.stringify(data));
  },

  // 修改当前角色
  [types.CHANGE_CURRENT_ROLE](state, data) {
    state.currentRole = data;
    sessionStorage.setItem("currentRole", JSON.stringify(data));
  },

  // 修改当前菜单列表
  [types.CHANGE_CURRENT_MENULIST](state, data) {
    state.menuList = data;
    let menuPathList = [];

    // 获取所有菜单的地址数组
    mapPath(data);
    function mapPath(list) {
      list.forEach(item => {
        menuPathList.push(item.menu_url);
        if (item.children) {
          mapPath(item.children);
        }
      });
    }
    state.menuPathList = menuPathList;
    sessionStorage.setItem("menuList", JSON.stringify(data));
  },

  // 修改当前访问路径记录
  [types.CHANGE_CURRENT_PATH_RECODE](state, data) {
    // 添加
    if (isObject(data)) {
      !state.currentPathRecode.some(item => item.fullPath === data.fullPath) &&
        state.currentPathRecode.push(data);
    }
    // 删除记录
    if (isNumber(data)) {
      state.currentPathRecode.splice(data, 1);
    }
    // 批量删除
    if (isString(data)) {
      let indexArr = data.split(",");
      state.currentPathRecode = state.currentPathRecode.filter(
        (item, index) => !indexArr.includes(`${index}`)
      );
    }
    // 本地读取赋值、全部删除、删除其他
    if (isArray(data)) {
      state.currentPathRecode = data;
    }
    sessionStorage.setItem(
      "currentPathRecode",
      JSON.stringify(state.currentPathRecode)
    );
  },

  // 修改当前菜单id
  [types.CHANGE_CURRENT_MENUID](state, id) {
    state.currentMenuId = id;
    sessionStorage.setItem("currentMenuId", id);
  },

  // 修改缓存组件列表
  [types.CHANGE_KEEP_ALIVE](state, name) {
    if (!KEEP_ALIVE_ENABLE) {
      state.keepAlive = [];
      return;
    }
    // 本地读取、全部删除、删除其他
    if (isArray(name)) {
      state.keepAlive = name;
    }
    // 删除
    if (isNumber(name)) {
      state.keepAlive.splice(name, 1);
    }
    if (isString(name)) {
      if (name.includes(",")) {
        // 添加
        !state.keepAlive.includes(name) && state.keepAlive.push(name);
      } else {
        // 批量删除
        let indexArr = name.split(",");
        state.keepAlive = state.keepAlive.filter(
          (item, index) => !indexArr.includes(`${index}`)
        );
      }
    }
    sessionStorage.setItem("currentKeepAlive", JSON.stringify(state.keepAlive));
  }
};

export default mutations;
