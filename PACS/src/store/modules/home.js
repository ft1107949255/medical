import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

import '../../common/js/constant'
import CONSTANT from '../../common/js/constant';
Vue.use(Vuex)
let ip = CONSTANT.CONSTANT.WEB_URL;
export default ({

    state: {
        data: []
    },


    // 同步
    mutations: {

        m_get_simple(state, obj) {
            state.data = obj
        },
    },
    // 异步
    actions: {

        // 搜索
        a_get_simple(context, params) {
            axios.post(ip + "/movieList/simple", params).then(msg => {
                context.commit('m_get_simple', msg.data);
            })
        },
    }
})
