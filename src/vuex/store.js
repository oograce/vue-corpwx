/**
 * 对外数据仓库
 * @author siye
 * */
import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import common from './modules/common'
import opportunity from './modules/opportunity'
import account from './modules/account'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    common,
    opportunity,
    account
  }
})
