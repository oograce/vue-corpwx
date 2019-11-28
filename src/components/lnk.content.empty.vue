<!--
  @name 界面没有数据时显示
  @author siye
  @desc:
    1、import ContentEmpty from '@/components/content.empty'
    2、components: {
        ContentEmpty
       }
    3、<lnk-content-empty v-if="emptyFlag"></lnk-content-empty>
 -->
<template>
  <div class="is-empty">
    <div class="error"></div>
  </div>
</template>

<script>
  export default {
    name: 'empty'
  }
</script>

<style lang="scss" scoped>
  .is-empty {
    .error{
      width: 240px;
      height: 240px;
      margin: 20px auto 10px auto;
      background: url(../assets/img/is_empty.png) no-repeat;
      background-size: 100%;
    }
  }
</style>
