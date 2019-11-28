/**
 * 客户数据仓库
 * @author siye
 *  */
export default {
  getters: {
    getAccountItem: (state) => () => {
      return state.accountItem;
    }
  },
  state: {
    accountItem: {}
  },
  mutations: {
    setAccountItem (state, res) {
      state.accountItem = res;
    }
  }
}
