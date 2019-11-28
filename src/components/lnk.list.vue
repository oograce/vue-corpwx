<!--
  @name lnk列表
  @author siye
  @desc：
    1、封装vant列表，支持更多箭头、空查询提示，同时返回item对象，提供插槽允许自定义主要内容部分
    2、针对主要内容的插槽，提供行css、左col、右col等，支持扩展
  @param onLoad: 查询方法
  @param pageInfo: 查询结果对象
  @param emptyFlag: 空数据标识
  @param handleItem: 点击处理操作
  @实例：
  <lnk-list :onLoad="onLoad" :pageInfo="pageInfo" :emptyFlag="emptyFlag" @handleItem="accountItem">
      <template slot="content" slot-scope="{ item }">
          第一行分左右col
          <div class="lnk-row">
            左边col 占70%
            <div class="row-left-col-7">
              {{ item.accountName }}
              <van-tag plain type="primary">
                {{ item.gender|lovTransform('GENDER') }}
              </van-tag>
              <van-tag plain type="danger">
                {{ item.sources|lovTransform('SOURCE_FROM') }}
              </van-tag>
            </div>
            右边边col 占30%
            <div class="row-right-col-3">
              {{ item.created|formatPointDate }}
            </div>
          </div>
          第二行整体占100%
          <div class="lnk-row">
            <label class="iconfont icon-lbs" style="font-size: 18px;"></label>
            {{ item.city }}{{ item.district }}{{ item.address }}
          </div>
      </template>
    </lnk-list>
-->
<template>
  <div class="lnk-list-page">
    <van-list v-model="pageInfo.loading" :finished="pageInfo.finished"
               @load="onLoad" style="border-top: 8px solid #fafafa;">
      <lnk-content-empty v-if="emptyFlag"></lnk-content-empty>
      <div class="lnk-list" v-for="item in pageInfo.list" :key="item.id" @click="handleItem( item )">
        <div class="list-left-col">
          <slot name="content" :item="item">
            Item Content
          </slot>
        </div>
        <div class="list-right-col">
          <label class="iconfont icon-more"></label>
        </div>
      </div>
    </van-list>
    <div class="no-more" v-if="pageInfo.finished&&!emptyFlag">
      没有更多内容了...
    </div>
  </div>
</template>

<script>
  import LnkContentEmpty from '@/components/lnk.content.empty'
  export default {
    name: "lnkList",
    props: {
      pageInfo: Object,      // pageInfo
      onLoad: {},
      emptyFlag: {
        type: Boolean,
        default: false
      }
    },
    components: {
      LnkContentEmpty
    },
    methods: {
      handleItem: function ( item ) {
        this.$emit('handleItem', item);
      }
    }
  }
</script>

<style scoped>

</style>
