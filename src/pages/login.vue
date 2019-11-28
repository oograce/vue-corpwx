<template>
  <div>
    <div class="login-form" v-if="show">
      <van-cell-group>
        <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''"/>
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
      </van-cell-group>
    </div>
    <div class="button-group" v-if="show">
      <van-button type="danger" @click="login" class="login-button">登录</van-button>
    </div>
  </div>
</template>

<script>
  import env from '../env/env'
  import { mapMutations } from 'vuex'
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        show: false
      }
    },
    created () {
      // 自动登录
      document.title = '登录中...';
      if(env.env === 'dev') {
        localStorage.token  = '8c65c583bb7854bef8d7c5901f276592';
        this.setUser ({
          name: '四爷',
          id: 'W-2F30F2A'
        });
        this.downloadMoreId();
        this.loadLov();
        setTimeout(() => {
          this.$router.replace({path: this.$router.currentRoute.query.redirect});
        },1000)
      } else {
        let url = '/mobile/corp/user/login?code=' + this.$router.currentRoute.query.code;
        if(!this.$util.isEmpty(this.$router.currentRoute.query.state)) {
          url += '&state=' + this.$router.currentRoute.query.state;
        }
        this.$http({
          method: 'get',
          url:  url
        }).then((res) => {
          if(res.data.success) {
            // 登录成功之后设置用户对象和TOKEN到用户数据仓库
            localStorage.token  = res.data.token;
            this.setAccountId( res.data.accountId );
            this.setUser (res.data.result);
            this.downloadMoreId();  // 加载row_id
            this.loadLov();         // 加载值列表
            setTimeout(() => {
              // 返回原路由界面
              this.$router.replace({path: this.$router.currentRoute.query.redirect});
            },1000)
          } else {
            this.$dialog.alert({
              message: '登录失败: ' + res.data.message
            });
          }
        })
      }
    },
    methods: {
      ...mapMutations(['setAccountId', 'setUser', 'loadLov', 'downloadMoreId']),
      // 留出的登录方法
      login () {
        if(this.$util.isEmpty(this.username) || this.$util.isEmpty(this.password)) {
          this.$toast('请输入用户名和密码！');
        } else {
          this.$toast.loading({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: '登录中...'
          });
          setTimeout(() => {
            this.$toast.clear();
            this.$toast.success('登录成功');
            // 设置Token
            localStorage.token("hello world");
            this.$router.replace({'path': this.$router.currentRoute.query.redirect});
          }, 2000);
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-form {
    width: 90%;
    margin-left: 5%;
    margin-top: 30px;
  }
  .button-group {
    margin-top: 50px;
    text-align: center;
    .login-button {
      width: 80%;
    }
  }
</style>
