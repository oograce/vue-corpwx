/**
 * 登录用户信息数据仓库
 * @author siye
 *  */
export default {
  getters: {
    getAccountId: (state) => () => {
      return state.accountId;
    },
    getUser: (state) => () => {
      return JSON.parse(localStorage.user);
    }
  },
  state: {
    accountId: ''        // 客户Id，从客户资料出进入会有此参数
  },
  mutations: {
    setUser (state, res) {
      localStorage.user = JSON.stringify(res);
    },
    setAccountId (state, res) {
      state.accountId = res;
    }
  }
}
