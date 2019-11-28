<!--
 @name 列表上的tab中，左边的排序部分，默认宽度占tab的20/24，余下的4用于筛选界面组件
 @author siye
 @参考：
  1、配置可排序参数 sortList: [ { name: '创建时间', key: 'created' }, { name: '需求日期', key: 'requestDate' } ]
  2、定义handle方法 searchBySort: function ( currentSort ) { } 参数为当前排序的字段和排序类型
  3、使用：
    <van-row>
      <lnk-sort-tabs :sortList="sortList" @handle="searchBySort" span="20"></lnk-sort-tabs>
    </van-row>
 -->
<template>
  <div>
    <van-col :span="colSpan" class="tab-col" v-for="(item, index) in sortList" :key="index">
      <div @click="handle( item.key )">
        <span class="tab-col-span">{{ item.name }}</span>
        <label class="iconfont icon-paixujiantoushang tab-col-i-top"
           :class="{'check-iconfont': currentSort.sortType === item.key && currentSort.sortDirection === 'asc'}"></label>
        <label class="iconfont icon-paixujiantouxia tab-col-i-bottom"
           :class="{'check-iconfont': currentSort.sortType === item.key &&currentSort.sortDirection === 'desc'}"></label>
      </div>
    </van-col>
  </div>
</template>

<script>
  export default {
    name: "listTabs",
    props: {
      sortList: Array,          // 可供排序的参数列表
      span: {                   // 宽度
        type: String,
        default: '24'
      }
    },
    created () {
      this.colSpan = this.span / this.sortList.length;
    },
    data () {
      return {
        colSpan: '24',    // 根据排序参数列表的长度，决定各字段所占空间
        currentSort: {
          sortType: '',
          sortDirection: ''
        }           // 当前排序内容
      }
    },
    methods: {
      handle: function ( type ) {
        this.currentSort.sortType = type;
        if (this.$util.isEmpty(this.currentSort.sortDirection)) {
          this.currentSort.sortDirection = 'asc';
        } else {
          if(this.currentSort.sortDirection === 'asc') {
            this.currentSort.sortDirection = 'desc';
          } else {
            this.currentSort.sortDirection = 'asc';
          }
        }
        this.$emit("handle", this.currentSort);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tab-col {
    border-right: 2px solid #fafafa;
    position: relative;
    .tab-col-span {
      margin-right: 2px;
      font-size: 14px;
    }
    .tab-col-i-top {
      position: absolute;
    }
    .tab-col-i-bottom {
      position: absolute;
    }
  }
</style>
