import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import CONSTANT from '../../common/js/constant';

Vue.use(Vuex);

// let IP = CONSTANT.CONSTANT.WEB_URL;
let TOKEN = localStorage.getItem('token');

export default ({
  state: {
    hospitalList: [],
    hospitalColums: [],
    hospitalTotal: 0,
    hospitalPage: 1,
  },

  // 同步
  mutations: {
    a_get_hospitalList(state, obj) {
      if (obj.status == 1) {
        state.hospitalList = obj.medicalPatients.results;
        state.hospitalColums = obj.table;
        state.hospitalTotal = obj.medicalPatients.total;
        state.hospitalPage = obj.medicalPatients.page;
      }
    },
    a_get_UserList(state, obj) {
      if (obj.status == 1) {
        state.hospitalList = obj.list;
        state.hospitalColums = obj.table;
        state.hospitalTotal = obj.total;
        state.hospitalPage = obj.page;
      }
    }
  },

  // 异步
  actions: {
    a_get_hospitalList(context, params) {

        this.$http.post(this.ip + '/xhhms/rest/interCheckAdminController/v1/findByUserId', params,
          { headers: { 'X-AUTH-TOKEN': this.token }}
        ).then(msg => {
          console.log("jinglail");
            context.commit('a_get_hospitalList', msg.data);
        });

    },
    a_get_UserList(context, params) {
      this.$http.post(this.ip + '/xhhms/rest/interCheckAdminController/v1/findByUserId', params,
      { headers: { 'X-AUTH-TOKEN': this.token }}
      ).then(msg => {
        console.log("jinglail");
        context.commit('a_get_UserList', msg.data);
    });

    },


  }
})
