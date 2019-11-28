<template>
  <div>
    <lnk-search-tab @handle="searchByParameter" :search="search" placeholder="客户名称"></lnk-search-tab>
    <van-row>
      <lnk-sort-tabs :sortList="sortList" @handle="searchBySort" span="20"></lnk-sort-tabs>
      <lnk-filter-tab :filters="filters" @handle="searchByFilter" span="4"></lnk-filter-tab>
    </van-row>
    <lnk-list :onLoad="onLoad" :pageInfo="pageInfo" :emptyFlag="emptyFlag" @handleItem="opportunityItem">
      <template slot="content" slot-scope="{ item }">
        <div class="lnk-row">
          <div class="row-left-col-5">
            {{ item.accountName }}
          </div>
          <div class="row-right-col-5">
            {{ item.requestDate }}
          </div>
        </div>
        <div class="lnk-row">
          <van-tag plain type="success">
            {{ item.optyStatus|lovTransform('OPTY_STATUS') }}
          </van-tag>
          <van-tag plain type="primary">
            {{ item.currentStage|lovTransform('ACCNT_STAGE') }}
          </van-tag>
          <van-tag plain type="danger">
            {{ item.budget|cny }}
          </van-tag>
        </div>
        <div class="lnk-row">
          <label class="iconfont icon-lbs" style="font-size: 18px;"></label>
          {{ item.city }}{{ item.district }}{{ item.address }}
        </div>
      </template>
    </lnk-list>
    <div class="float-button" @click="newOpportunity($event)">
      <label class="iconfont icon-xinjian" style="color: white;font-size: 22px;"></label>
    </div>
  </div>
</template>

<script>
  import LnkSearchTab from '@/components/lnk.search.tab'
  import LnkFilterTab from '@/components/lnk.filter.tab'
  import LnkSortTabs from '@/components/lnk.sort.tabs'
  import LnkList from '@/components/lnk.list'
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    name: 'opportunityList',
    computed: {
      ...mapGetters(['getId', 'getUser', 'getAccountId'])
    },
    created () {
      document.title = '商机列表';
      this.accountId = this.getAccountId();
      this.user = this.getUser();
      this.initPageInfo();
      // 处理筛选popup上的数据
      for(let i=0;i<this.filters.length;i++) {
        this.filters[i].lov = this.$store.getters.getLov(this.filters[i].type);
        for(let j=0;j<this.filters[i].lov.length;j++) {
          this.filters[i].lov[j] = Object.assign( {}, this.filters[i].lov[j], { selected: false });
        }
      }
    },
    components: {
      LnkSearchTab,
      LnkFilterTab,
      LnkSortTabs,
      LnkList
    },
    data () {
      return {
        title: '商机列表',
        user: {},
        accountId: '',
        emptyFlag: false,    // 列表是否为空
        search: {
          text: ''           // 模糊查询参数
        },
        filters: [           // 筛选面板上可供筛选值
          {
            name: '购买原因',
            select: [],
            type: 'BUY_REASON',
            lov: []
          }
        ],
        sortList: [                                        // 可供排序的内容
          {
            name: '创建时间',
            key: 'created'
          },{
            name: '需求日期',
            key: 'requestDate'
          }
        ],
        pageInfo: {}
      }
    },
    methods: {
      ...mapMutations(['setOpportunityItem']),
      // 初始化pageInfo
      initPageInfo: function () {
        this.pageInfo = {
          url: '/mobile/QidianOpty/queryByExamplePage',
          params: {
            queryProdsFlag: 'Y'
          },
          list: [],
          loading: false,
          finished: false,
          firstLoad: true
        };
        if(!this.$util.isEmpty(this.accountId)) {
          this.pageInfo.params = Object.assign({}, this.pageInfo.params, { accountId: this.accountId});
        }
      },
      // 初始化商机列表
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
          if(!this.$util.isEmpty(this.accountId)) {
            this.newOpportunity( event );
          }
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
          buyReason: this.filters[0].select.toString(),
        });
        this.onLoad();
      },
      // 商机明细
      opportunityItem: function ( item ) {
        this.setOpportunityItem( {item: item, reset: true});
        this.$router.push('/opportunity/list/item');
      },
      // 新建商机
      newOpportunity: function ( event ) {
        event.preventDefault();
        let item = {
          id: this.getId(),
          dataOperationType: 'new',
          accountId: '',
          accountName: '',
          gender: 'MALE',
          birthday: '',
          sources: 'NATURAL_CUSTOMER',
          addrList: [],
          province: '',
          city: '',
          district: '',
          address: '',
          housingEstate: '',
          houseType: '',
          mobilePhone1: '',
          mobilePhone2: '',
          mainAddrId: '',
          qqNum: '',
          weichatNum: '',
          guideId: this.user.id,
          salesmanId: this.user.id,
          hasPayed: 'N',
          buyReason: 'newHouse',
          accountStatus: '初步沟通',
          optyStatus: 'POTENTIAL_ACCNT',
          fitUpProgress: 'Rough',
          stylePreference: 'MODERN_SIMPLE',
          colorPreference: 'WARM_COLOR',
          preferenceProdList: [],
          qdStatusId: '1',
          customerPersuasiveness: 'twenty',
          intendProdList: [],
          currentStage: 'NEED_VALIDATION',
          previousStage: 'CUSTOMER_REGISTRATION',
          qdTypeId: '1',
          accntSourceFrom: 'STORE',     //pad 上创建的默认 是门店
          wxOpenId: '',
          wxHeadImgUrl: '',
          subscribe_time_date: ''
        };
        if(this.$util.isEmpty(this.accountId)) {
          this.setOpportunityItem({ item: item, reset: true });
          this.$router.push('/opportunity/list/item');
        } else {
          // store中的accountId不为空时，即为客户资料页签点击进入，此时新建商机时，自动带出客户信息
          this.$http.get('/mobile/QidianAccount/queryById', {
            cache: false,
            params: {
              id: this.accountId
            }
          }).then((res) => {
            if(res.data.success) {
              let account = res.data.result;
              item.accountId = account.id;
              item.accountName = account.accountName;
              item.gender = account.gender;
              item.birthday = account.birthday;
              item.sources = account.sources;
              // item.addrList = account.addrList;
              item.province = account.province;
              item.city = account.city;
              item.district = account.district;
              item.address = account.address;
              item.mainAddrId = account.mainAddrId;
              item.housingEstate = account.housingEstate;
              item.houseType = account.houseType;
              item.mobilePhone1 =  account.mobilePhone1;
              item.mobilePhone2 = account.mobilePhone2;
              item.qqNum = account.qqNum;
              item.weichatNum = account.weichatNum;
              this.setOpportunityItem({ item: item, reset: true });
              this.$router.push('/opportunity/list/item');
            } else {
              this.$toast("获取客户信息失败：" + res.data.message);
            }
          }).catch((error) => {
            this.$toast("请求失败：" + error);
          });
        }

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
