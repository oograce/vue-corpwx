<template>
  <div class="bonus-body" :style="backgroundStyle">
    <div class="content">
      <van-button round type="danger" class="button" :class="{ getBonusCss: getBonusCss }" @click="get()">{{buttonText}}</van-button>
      <div class="title"> ── • 积分规则 • ── </div>
      <div class="info">1、扫码即可获得1000积分，多扫多得</div>
      <div class="info">2、每位员工扫描同一二维码只能领奖一次</div>
      <div class="info">3、活动有效期：2019.01.01 - 2019.12.31</div>
      <div class="info">4、本活动最终解释权归泸州老窖所有</div>
    </div>
    <van-popup v-model="show" class="popup">
      <div class="popup-content">
        <div class="exit">
          <img @click="exit()" src="../../assets/img/bonus/exit.png" alt="">
        </div>
        <div class="img-div">
          <img src="../../assets/img/bonus/bonus.png" alt="">
        </div>
        <div class="tips">
          <span>恭喜您，获得1000积分，亲可在"我的账户-我的积分"中找到积分哦！</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "getBonus",
    created () {
      document.title = '积分领取';
    },
    data() {
      return {
        show: false,
        getBonusCss: false,
        buttonText: '领取积分',
        backgroundStyle: {
          backgroundImage: `url("${require('../../assets/img/bonus/getBonus.png')}`
        }
      }
    },
    methods: {
      get: function () {
        if (!this.getBonusCss) {
          this.$toast.loading({
            message: '正在领取中...',
            duration: 2000
          });
          setTimeout( () => {
            this.show = true;
          }, 2000)
        } else {
          this.$toast('您已领取，感谢您的热情参与！');
        }
      },
      exit: function () {
        this.show = false;
        this.getBonusCss = true;
        this.buttonText = '已领取';
      }
    }
  }
</script>

<style scoped lang="scss">
  .bonus-body {
    position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    z-index:-10;
    zoom: 1;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    .content {
      width: 80%;
      margin-left: 10%;
      margin-top: 55vh;
      color: #FFFFFF;
      .getBonusCss {
        background-color: #D65E04 !important;
      }
      .button {
        height: 48px;
        width: 100%;
        border-radius: 30px;
        background-color: #FEBF41;
        border: none;
        font-size: 3vh;
        margin-bottom: 30px;
      }
      .title {
        font-size: 2.4vh;
        text-align: center;
        margin-bottom: 20px;
      }
      .info {
        font-size: 2.2vh;
        margin-top: 5px;
      }
    }
    .popup {
      height: 100%;
      background: transparent;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .popup-content {
        width: 80%;;
        .exit {
          position: relative;
          height: 4vh;
          img {
            position: absolute;
            right: 0;
            top: 0;
            width: 3.5vh;
          }
        }
        .img-div {
          width: 70%;
          margin-left: 15%;
          img {
            width: 100%;
          }
        }
        .tips {
          color: white;
          font-size: 2.2vh;
          margin-top: 20px;
          text-align: center;
        }
      }
    }
  }
</style>
