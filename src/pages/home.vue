<template>
  <div>
    <!-- swipe -->
    <div class="swipe">
      <van-swipe :autoplay="6000">
        <van-swipe-item>
          <img class="swipe-item" src="../assets/img/home/y-banner01.jpg">
        </van-swipe-item>
        <van-swipe-item>
          <img class="swipe-item" src="../assets/img/home/y-banner02.jpg">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- Notice -->
    <van-notice-bar :text="hello" />
    <!-- menu -->
    <div class="module-item">
      <div class="item-title">我的应用</div>
    </div>
    <div class="more-content">
      <div @click="goAccount()">
        <i class="iconfont icon-kehu"></i>
        <span>客户</span>
      </div>
      <div @click="goOpportunity()">
        <i class="iconfont icon-wodeshangjizhuanhuan"></i>
        <span>商机</span>
      </div>
      <div @click="community()">
        <i class="iconfont icon-Community"></i>
        <span>交流</span>
      </div>
      <div @click="getBonus()">
        <i class="iconfont icon-daiban"></i>
        <span>我的积分</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'home',
    created () {
      document.title = '工作台';
      this.user = this.getUser();
      this.hello = `欢迎你，${this.user.name}，现在是${this.$util.getNowDateLong()}`;
    },
    data () {
      return {
        user: {},
        hello: ''
      }
    },
    computed: {
      ...mapGetters(['getId', 'getUser'])
    },
    methods: {
      goAccount: function () {
        this.$router.push('/account/list');
      },
      goOpportunity: function () {
        this.$router.push('/opportunity/list');
      },
      community: function () {
        this.$router.push('/community/item');
      },
      getBonus: function () {
        this.$router.push('/bonus/myBonus');
      }
     }
  }
</script>

<style lang="scss" scoped>
  .swipe {
    height: 0;
    overflow: hidden;
    width: 100%;
    padding-bottom: 51.25%;
    .swipe-item {
      width: 100%;
    }
  }
  .more-content{
    display: flex;
    display: -webkit-flex;
    font-size: 14px;
  }
  .more-content:first-child{
    background-image: -webkit-linear-gradient(top, #ddd 0%, #ddd 50%, transparent 50%);
    background-image: linear-gradient(180deg, #ddd 0%, #ddd 50%, transparent 50%);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: bottom;
  }
  .more-content >div{
    background-image: -webkit-linear-gradient(left, #ddd, #ddd 50%, transparent 50%);
    background-image: linear-gradient(90deg, #ddd 0%, #ddd 50%, transparent 50%);
    background-size: 1px 100%;
    background-repeat: no-repeat;
    text-align: center;
    height: 100px;
    flex: 1;
    -webkit-flex: 1;
    span{
      display: block;
      color: #444;
    }
    .iconfont{
      font-size: 22px;
      display: inline-block;
      margin-top: 20px;
      width: 40px;
      height: 40px;
      text-align: center;
      margin-bottom: 5px;
      line-height: 40px;
      border-radius: 5px;
      font-weight: bolder;
      color: #fff;
    }
    .icon-kehu{
      text-shadow: 1px 1px 2px #0a69a5;
      background: #20A6FC;
      background: -moz-linear-gradient(top, #bfdfff, #64b0fc);
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#bfdfff), to(#64b0fc));
      background: -o-linear-gradient(top, #bfdfff, #64b0fc);
    }
    .icon-wodeshangjizhuanhuan{
      text-shadow: 1px 1px 2px #d28f1c;
      background: #fcac22;
      background: -moz-linear-gradient(top, #fed58e, #fcac22);
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fed58e), to(#fcac22));
      background: -o-linear-gradient(top, #fed58e,#fcac22);
    }
    .icon-Community{
      font-size: 20px;
      text-shadow: 1px 1px 2px #a9c126;
      background: #cee64e;
      background: -moz-linear-gradient(top, #dff085, #c6e717);
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#dff085), to( #c6e717));
      background: -o-linear-gradient(top, #dff085, #c6e717);
    }
    .icon-daiban{
      font-size: 20px;
      text-shadow: 1px 1px 2px #1f95bc;
      background: #72dcff;
      background: -moz-linear-gradient(top, #a2e5fb, #3bcefe);
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#a2e5fb), to(#3bcefe));
      background: -o-linear-gradient(top, #a2e5fb, #3bcefe);
    }
  }
</style>
