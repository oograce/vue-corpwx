<!--
  @name 路由匹配404
  @author siye
 -->
<template>
  <div class="not-found">
    <div class="error"></div>
  </div>
</template>

<script>
  export default {
    name: 'notFound'
  }
</script>

<style lang="scss" scoped>
  .not-found {
    .error{
      width: 200px;
      height: 200px;
      margin: 120px auto 10px auto;
      background: url(../assets/img/error.png) no-repeat;
      background-size: 100%;
      background-position: -10px center;
    }
  }
</style>
