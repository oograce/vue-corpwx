import { Toast } from 'vant';
import http from '../http/http.js'
import util from '../common/util'

/**
 * 分页查询方法
 * @author siye
 * */
export default {
  initPageInfo: {
    list: [],
    count: '0',
    currentCount: 0,
    params: {},
    endMessage: "",      //"正在加载数据中,请稍等...",
    url: "",
    totalFlag: true,
    formatRequestFlag: true //改变请求参数格式
  },
  queryPageInfo: function (pageInfo, successFun) {
    let defaultInfo = {};
    Object.assign(defaultInfo, this.initPageInfo, pageInfo);
    Object.assign(defaultInfo.params, {
      currentCount: 0,
      totalFlag: defaultInfo.totalFlag,
      noToast: true
    });
    if (defaultInfo.url === null || defaultInfo.url === '') {
      Toast("查询URL不能为空，请重试!");
      return defaultInfo;
    }
    let params = {};
    if (defaultInfo.formatRequestFlag) {
      params = util.formatRequest(defaultInfo.params)
    } else {
      params = defaultInfo.params;
    }
    defaultInfo.loading = true;
    http.get(defaultInfo.url,
      {
        params: params,
        cache: false
      }
    ).then((res) => {
      defaultInfo.loading = false;
      if (res.data.success) {
        defaultInfo.list = res.data.result;
        defaultInfo.currentCount = defaultInfo.list.length;
        defaultInfo.count = res.data.count;
        if (defaultInfo.count === '0') {
          defaultInfo.finished = true;
          defaultInfo.endMessage = "暂无更多记录";
        } else if (defaultInfo.currentCount < defaultInfo.count) {
          defaultInfo.endMessage = defaultInfo.currentCount + " of " + defaultInfo.count + ", 上滑加载更多...";
        } else {
          defaultInfo.finished = true;
          defaultInfo.endMessage = defaultInfo.currentCount + " of " + defaultInfo.count + ", 已经加载完毕";
        }
        if (typeof(successFun) !== "undefined") {
          successFun(defaultInfo);
        }
      } else {
        Toast(res.data.message);
      }
    }).catch((error) => {
      defaultInfo.loading = false;
      Toast("请求失败: " + error);
      defaultInfo.endMessage = "暂无更多记录";
    });
    return defaultInfo;
  },
  queryNextPageInfo: function (pageInfo, successFun) {
    pageInfo.loading = true;
    let defaultInfo = {};
    if (pageInfo.currentCount >= pageInfo.count) {
      return pageInfo;
    } else {
      Object.assign(defaultInfo, this.initPageInfo, pageInfo);
    }
    Object.assign(defaultInfo.params, {
      currentCount: defaultInfo.currentCount,
      totalFlag: defaultInfo.totalFlag,
      noToast: true
    });
    if (defaultInfo.url === null || defaultInfo.url === '') {
      Toast("查询URL不能为空，请重试!");
      return defaultInfo;
    }
    let params = {};
    if (defaultInfo.formatRequest) {
      params = util.formatRequest(defaultInfo.params)
    } else {
      params = defaultInfo.params;
    }
    http.get(defaultInfo.url,
      {
        params: params,
        cache: false
      }
    ).then((res) => {
      defaultInfo.loading = false;
      if (res.data.success) {
        Array.prototype.push.apply(defaultInfo.list, res.data.result);
        defaultInfo.currentCount = defaultInfo.list.length;
        if (defaultInfo.count === '0') {
          defaultInfo.finished = true;
          defaultInfo.endMessage = "暂无更多记录";
        } else if (defaultInfo.currentCount < defaultInfo.count) {
          defaultInfo.endMessage = defaultInfo.currentCount + " of " + defaultInfo.count + ", 上滑加载更多...";
        } else {
          defaultInfo.finished = true;
          defaultInfo.endMessage = defaultInfo.currentCount + " of " + defaultInfo.count + ", 已经加载完毕";
        }
        if (typeof(successFun) !== "undefined") {
          successFun(defaultInfo);
        }
      } else {
        Toast(res.data.message);
      }
    }).catch((error) => {
      defaultInfo.loading = false;
      Toast("请求失败: " + error);
      defaultInfo.endMessage = "暂无更多记录";
    });
    return defaultInfo;
  },
  spliceOne: function (pageInfo, delId) {
    for (let i = 0; i < pageInfo.list.length; i++) {
      let temp = pageInfo.list[i];
      if (temp.id === delId) {
        pageInfo.list.splice(i, 1);
        pageInfo.currentCount = pageInfo.currentCount - 1;
        if (pageInfo.count === pageInfo.currentCount) {
          if (pageInfo.count === 0) {
            pageInfo.endMessage = "暂无更多记录";
          } else {
            pageInfo.endMessage = pageInfo.currentCount + " of " + pageInfo.count + ", 已经加载完毕";
          }
        } else {
          pageInfo.endMessage = pageInfo.currentCount + " of " + pageInfo.count + ", 上滑加载更多...";
        }
        break;
      }
    }
    return pageInfo;
  }
}
