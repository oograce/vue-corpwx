/**
 * 过滤器
 * @author siye
 * */
import Vue from 'vue'
import store from '../vuex/store.js'
import util from '../common/util'
/**
 * 更换字符串日期 yyyy-mm-dd hh:mm:ss.0 为 yyyy.mm.dd
 */
Vue.filter('formatPointDate', function (value) {
  if (value != null) {
    value = value.substring(0, 10);
    value = value.replace(/-/g, ".");
    return value;
  }
});
/**
 * 转换值列表信息
 * */
Vue.filter('lovTransform', function (value, lovType) {
  let lov = store.getters.getLov(lovType);
  for(let i=0;i<lov.value.length;i++) {
    let temp = lov.value[i];
    if(temp.val === value) {
      return temp.name
    }
  }
  return value;
});
/**
 * 处理金额浮点数
 * */
Vue.filter('fixed', function (value) {
  if(!util.isEmpty(value)) {
    value = parseFloat(value);
    return value.toFixed(2);
  }
  return value;
});
/**
 * 过滤金额的展示效果
 * */
Vue.filter('cny', function ( value ) {
  if (util.isEmpty(value)) {
    return "￥0";
  }
  let dd = parseFloat(value);
  return "￥" + (dd.toFixed(0) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
});
