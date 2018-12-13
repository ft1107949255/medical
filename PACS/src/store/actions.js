// import router from 'Plugins/router'
// import md5 from 'js-md5'
import {JSEncrypt} from 'jsencrypt'
import router from "Plugins/router";
const actions = {
  // 用户登录
  userLogin({ commit }, data) {
    let sendData = Object.assign({}, data);
    let publicKey = `-----BEGIN RSA PUBLIC KEY-----
    ${data.pukey}
    -----END RSA PUBLIC KEY-----`
    let encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey)
    sendData.password = encryptor.encrypt(sendData.password)
    return new Promise((resolve, reject) => {
      this._vm.$api.userLogin(sendData).then(res => {
        // 存储token
        localStorage.setItem("token", res.token);
        // 更新用户信息
        commit("UPDATE_USER_INFO", res);
        resolve(res);
      });
    });
  },
  // 退出登录
  userLogout({ commit }) {
    this._vm.$api.logout().then(res => {
      // 清除用户信息
      commit("DELETE_USER_INFO");
      router.push("/login");
    });
  }
};

export default actions;
