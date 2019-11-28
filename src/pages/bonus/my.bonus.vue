<template>
  <div>
    <div class="title">积分记录</div>
    <div class="module-item">
      <div class="item-title" style="margin-top: 10px;font-size: 2.6vh;border-left: 3px solid #FEBF41;">本月</div>
      <div class="item-body">
        <div class="bonus-list" v-for="item in list" :key="item.id">
          <div class="bonus-line">
            <span class="title">{{item.name}}</span>
            <span class="bonus">+{{item.bonus}}</span>
          </div>
          <div class="bonus-line">
            <span class="date">{{item.date}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "myBonus",
    data () {
      return {
        list: [
          { id: '1', name: '活动积分',  date: this.$util.getNowDate(),  bonus: '1000' },
          { id: '2', name: '消费积分',  date: this.$util.getNowDate(),  bonus: '600' },
          { id: '3', name: '签到积分',  date: this.$util.getNowDate(),  bonus: '50' },
          { id: '4', name: '赠送积分',  date: this.$util.getNowDate(),  bonus: '100' }
        ]
      }
    },
    created () {
      document.title = '我的积分';
    }
  }
</script>

<style scoped lang="scss">
  .title {
    font-size: 3vh;
    font-weight: bold;
    margin: 8px 8px 14px 8px;
  }
  .bonus-list {
    height: 60px;
    border-bottom: 1px solid rgb(242, 242, 242);
    margin: 10px;
    .bonus-line {
      display: flex;
      height: 30px;
      align-items: center;
      .title {
        font-weight: bold;
        color: black;
        font-size: 2.4vh;
        margin: 0;
        flex: 1;
      }
      .date {
        color: darkolivegreen;
        font-size: 2vh;
      }
      .bonus {
        color: #FEBF41;
        font-size: 2vh;
        font-weight: bold;
      }
    }
  }
</style>
