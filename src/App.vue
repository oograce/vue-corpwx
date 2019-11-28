<template>
  <div>
    <!-- <keep-alive> -->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created () {
      // 配置微信 config信息
      let wxData = {
        appid: 'wxc81d7e20fa7b9564',
        noncestr: 'Wm3WZYTPz0wzccnW',
        timestamp: '1414587457',
        url: window.location.href.split('#')[0],
        jsApiList: ['chooseImage', 'selectEnterpriseContact', 'openEnterpriseChat']
      };
      this.$http.get('/crm-bin/corpwx/access/getSignature', {
        cache: false,
        params: {
          jsUrl: wxData.url
        }
      }).then((res) => {
        if (res.data.success) {
          this.$wx.config({
            beta: true,                     // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false,                   // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wxData.appid,            // 必填，公众号的唯一标识
            timestamp: wxData.timestamp,    // 必填，生成签名的时间戳
            nonceStr: wxData.noncestr,      // 必填，生成签名的随机串
            signature: res.data.signature,  // 必填，签名，见附录1
            jsApiList: wxData.jsApiList     // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          this.$wx.ready(()=>{
            console.log('wx.ready');
          });
          this.$wx.error(function(res){
            console.log('wx err',res);
          });
        } else {
          this.$toast("获取微信签名：" + res.data.message);
        }
      }).catch((error) => {
        this.$toast("请求失败：" + error);
      })
    }
  }
</script>

<style>
  @import "../static/iconfont/iconfont.css";
</style>
