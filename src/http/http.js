import axios from 'axios'
import store from '../vuex/store.js'
import router from '../router'
import env from '../env/env'
import util from '../common/util'
import { Toast } from 'vant';
/**
 * http拦截器：
 * 1、为发出的请求进行遮罩处理以及拼接TOKEN
 * 2、对返回的报文进行STATUS的判断
 * @author siye
 * */
const http = axios.create();
http.defaults.baseURL = env.baseUrl;
http.defaults.timeout = 30000;
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// 请求拦截
http.interceptors.request.use(function (config) {
  // 设置token参数
  config.headers = Object.assign({}, config.headers, {token: localStorage.token});
  // 在发送请求之前做些什么
  if(config.method === 'get') {
    let _copy_config_params = config.params;
    config.params = Object.assign({}, config.params, {noToast: false});
    config.params = Object.assign({}, config.params, _copy_config_params);
    if(!config.params.noToast) {
      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      });
    }
  } else {
    if(store.state.common.hasToast) {
      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      });
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  Toast('网络错误,请稍后再试！');
  Toast.clear();
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  Toast.clear();
  // 对响应数据做点什么
  if(response.status === 220) {
    console.log(response);
    // Token失效
    localStorage.removeItem('token');
    Toast('Token已失效！');
    return Promise.reject("会话已过期，请退出重新进入！");
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  Toast.clear();
  if(error.response) {
    if(error.response.status === 401) {
      // 如果返回401 即没有权限，跳到登录页重新登录
      localStorage.removeItem('token');
      Toast('请重新登录！');
      router.replace({
        path: 'login',
        query: { redirect: router.currentRoute.fullPath }
      })
    }
  }
  return Promise.reject(error);
});
export default http
