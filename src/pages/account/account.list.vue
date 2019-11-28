<template>
  <div>
    <lnk-search-tab @handle="searchByParameter" :search="search" placeholder="客户名称"></lnk-search-tab>
    <van-row>
      <lnk-sort-tabs :sortList="sortList" @handle="searchBySort" span="20"></lnk-sort-tabs>
      <lnk-filter-tab :filters="filters" @handle="searchByFilter" span="4" isMultiple></lnk-filter-tab>
    </van-row>
    <lnk-list :onLoad="onLoad" :pageInfo="pageInfo" :emptyFlag="emptyFlag" @handleItem="accountItem">
      <template slot="content" slot-scope="{ item }">
        <div class="lnk-row">
          <div class="row-left-col-7">
            {{ item.accountName }}
            <van-tag plain type="primary">
              {{ item.gender|lovTransform('GENDER') }}
            </van-tag>
            <van-tag plain type="danger">
              {{ item.sources|lovTransform('SOURCE_FROM') }}
            </van-tag>
          </div>
          <div class="row-right-col-3">
            {{ item.created|formatPointDate }}
          </div>
        </div>
        <div class="lnk-row">
          <label class="iconfont icon-lbs" style="font-size: 18px;"></label>
          {{ item.city }}{{ item.district }}{{ item.address }}
        </div>
      </template>
    </lnk-list>
  </div>
</template>

<script>
  import LnkSearchTab from '@/components/lnk.search.tab'
  import LnkFilterTab from '@/components/lnk.filter.tab'
  import LnkSortTabs from '@/components/lnk.sort.tabs'
  import LnkList from '@/components/lnk.list'
  import { mapMutations } from 'vuex'
  export default {
    name: 'accountList',
    created () {
      document.title = '客户列表';
      this.initPageInfo();
    },
    components: {
      LnkSearchTab,
      LnkFilterTab,
      LnkSortTabs,
      LnkList
    },
    data () {
      return {
        title: '客户列表',
        emptyFlag: false,    // 列表是否为空
        search: {
          text: ''           // 模糊查询参数
        },
        filters: [           // 筛选面板上可供筛选值
          {
            name: '客户性别',
            select: [],
            type: 'GENDER',
            lov: []
          }, {
            name: '客户类型',
            type: 'ACCOUNT_TYPE',
            select: [],
            lov: []
          }
        ],
        sortList: [                                        // 可供排序的内容
          {
            name: '创建时间',
            key: 'created'
          },{
            name: '客户类型',
            key: 'accountType'
          }
        ],
        pageInfo: {}
      }
    },
    methods: {
      ...mapMutations(['setAccountItem']),
      // 初始化pageInfo
      initPageInfo: function () {
        this.pageInfo = {
          url: '/mobile/QidianAccount/queryByExamplePage',
          params: {},
          list: [],
          loading: false,
          finished: false,
          firstLoad: true
        }
      },
      // 初始化客户列表
      onLoad () {
        if(this.pageInfo.firstLoad) {
          this.pageInfo = this.$page.queryPageInfo(this.pageInfo, this.successFun);
          this.pageInfo.firstLoad = false;
        } else {
          this.pageInfo = this.$page.queryNextPageInfo(this.pageInfo, this.successFun);
        }
      },
      // 对返回的列表进行数据操作
      successFun: function ( pageInfo ) {
        if (pageInfo.list.length === 0) {
          this.emptyFlag = true;
        } else {
          this.emptyFlag = false;
        }
      },
      // 模糊查询
      searchByParameter: function () {
        this.initPageInfo();
        this.pageInfo.params = Object.assign( {}, this.pageInfo.params, { searchText: this.search.text });
        this.onLoad();
      },
      // 排序查询
      searchBySort: function ( currentSort ) {
        this.initPageInfo();
        this.pageInfo.params = Object.assign( {}, this.pageInfo.params, currentSort);
        this.pageInfo.params = Object.assign( {}, this.pageInfo.params, { searchText: this.search.text });
        this.onLoad();
      },
      // 筛选页面完成 - 查询数据
      searchByFilter: function ( filters ) {
        this.filters = filters;
        this.initPageInfo();
        this.pageInfo.params = Object.assign( {}, this.pageInfo.params, {
          filterType: 'accountFilter',
          formatRequestFlag: false,
          genders: this.filters[0].select.toString(),
          accntTypes: this.filters[1].select.toString(),
          contactWays: '',       // 补全参数
          guides:''              // 补全参数
        });
        this.onLoad();
      },
      // 客户明细
      accountItem: function ( item ) {
        this.setAccountItem( item );
        this.$router.push('/account/list/item');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
