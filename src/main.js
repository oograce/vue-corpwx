// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import store from './vuex/store.js'
import util from './common/util'
import http from './http/http.js'
import './assets/css/style.css'
import './assets/css/vant.var.css'
import './common/filter'
import pageService from './http/page.service'
import wx from 'weixin-js-sdk'

// vant 组件部分
import { Swipe, SwipeItem, NoticeBar, Search, Button, Tab, Tabs, Popup,
  Icon, Row, Col, Tabbar, TabbarItem, Tag, DatetimePicker, Dialog,
  Picker, Toast, Area, Card, List, RadioGroup, Radio, Cell, CellGroup, CouponCell, CouponList} from 'vant';
Vue.use(Swipe).use(SwipeItem).use(NoticeBar).use(Search).use(Swipe).use(Button)
  .use(Tab).use(Tabs).use(Popup).use(Icon).use(Row).use(Col)
  .use(Tabbar).use(TabbarItem).use(Tag).use(DatetimePicker).use(Dialog)
  .use(Picker).use(Toast).use(Area).use(Card).use(List).use(RadioGroup).use(Radio)
  .use(Cell).use(CellGroup).use(CouponCell).use(CouponList);

Vue.prototype.$wx = wx;
Vue.prototype.$util = util;
Vue.prototype.$http = http;
Vue.prototype.$page = pageService;

FastClick.attach(document.body);
Vue.config.productionTip = false;     // 设置为 false 以阻止 vue 在启动时生成生产提示

// 用钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
  // 需要权限,进一步进行判断
  if (to.meta.requireAuth) {
    // 查询参数带了code，说明是企业微信授权重定向过来的，此时需要进行登录以换取服务器token
    // 其中state参数是工作台应用过来才会带，用于后台获取用户信息时是使用外部联系人token还是应用token
    if (!util.isEmpty(to.query.code)) {
      console.log("前往登录...");
      next({
        path: '/login',
        replace: true,
        query: { redirect: to.path ,code: to.query.code, state: to.query.state}   // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {                                        // 如果没有权限,重定向到登录页,进行登录
      next()
    }
  }
  next();
});

new Vue({
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
