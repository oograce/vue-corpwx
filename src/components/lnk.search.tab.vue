<!--
  @name 列表头上的搜索框
  @author siye
  @参考：
    1、data中定义search: { text: '' }参数
    2、定义searchByParameter: function () { }  查询方法
    3、使用 <lnk-search-tab @handle="searchByParameter" :search="search" placeholder="客户名称"></lnk-search-tab>
-->
<template>
  <div>
    <van-search
      v-model="search.text"
      show-action
      :placeholder="placeholder"
      @search="searchByParameter">
      <div slot="action" @click="searchByParameter">
        <van-button type="primary" class="header-search-button">查询</van-button>
      </div>
    </van-search>
  </div>
</template>

<script>
  export default {
    name: "searchTab",
    props: {
      placeholder: String,
      search: Object
    },
    methods: {
      // 查询方法
      searchByParameter: function () {
        this.$emit("handle")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-search-button {
    height: 30px;
    line-height: 30px;
    margin: 0 5px;
    background-color: #26a2ff;
    border: none
  }
</style>
