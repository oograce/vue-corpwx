<template>
  <div>
    <lnk-search-tab @handle="searchByParameter" :search="search" placeholder="产品名称"></lnk-search-tab>
    <van-list v-model="pageInfo.loading" :finished="pageInfo.finished"
               @load="onLoad">
      <lnk-content-empty v-if="emptyFlag"></lnk-content-empty>
      <div v-for="item in pageInfo.list" @click="check( item )" :key="item.id">
        <div class="check">
          <label class="iconfont icon-fangxingxuanzhong icon" v-if="item.checked"></label>
          <label class="iconfont icon-fangxingweixuanzhong icon" v-if="!item.checked"></label>
        </div>
        <div style="width: 90%;float: left;border-bottom: 5px solid white;">
          <van-card
            :title="item.prodName"
            :desc="item.prodModeName"
            :price="item.promoPrice|fixed"
            :thumb="item.prodImgUrl">
            <div slot="tags">
              <van-tag plain type="danger">{{ item.tagName }}</van-tag>
            </div>
          </van-card>
        </div>
      </div>
    </van-list>
    <div class="float-button" @click="commit($event)">
      <label class="iconfont icon-iconset0237" style="color: white;font-size: 20px;"></label>
    </div>
  </div>
</template>

<script>
  import LnkContentEmpty from '@/components/lnk.content.empty'
  import LnkSearchTab from '@/components/lnk.search.tab'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: "productList",
    computed: {
      ...mapGetters(['getOpportunityItem'])
    },
    created () {
      document.title = '产品列表';
      this.initPageInfo();
      this.opportunityItem = this.getOpportunityItem();
    },
    components: {
      LnkContentEmpty,
      LnkSearchTab
    },
    data () {
      return {
        search: {
          text: ''            // 模糊查询参数
        },
        emptyFlag: false,
        pageInfo: {},
        opportunityItem: {}   // 商机
      }
    },
    methods: {
      ...mapMutations(['setOpportunityItem']),
      // 初始化pageInfo
      initPageInfo: function () {
        this.pageInfo = {
          url: '/mobile/QidianProduct/queryByExamplePage',
          params: {},
          list: [],
          loading: false,
          finished: false,
          firstLoad: true
        }
      },
      // 初始化产品列表
      onLoad () {
        if(this.pageInfo.firstLoad) {
          this.pageInfo = this.$page.queryPageInfo(this.pageInfo, this.successFun);
          this.pageInfo.firstLoad = false;
        } else {
          this.pageInfo = this.$page.queryNextPageInfo(this.pageInfo, this.successFun);
        }
      },
      // 对返回的列表进行数据操作，设置是否勾选的值，与商机下已有的产品列表匹配
      successFun: function ( pageInfo ) {
        if(pageInfo.list.length === 0){
          this.emptyFlag = true;
        } else {
          this.emptyFlag = false;
        }
        for(let i=0;i<pageInfo.list.length;i++) {
          let findFlag = false;
          for(let j=0;j<this.opportunityItem.intendProdList.length;j++) {
            if(pageInfo.list[i].id === this.opportunityItem.intendProdList[j].prodId) {
              findFlag = true;
              break;
            }
          }
          if(findFlag) {
            pageInfo.list[i] = Object.assign( {}, pageInfo.list[i], { checked: true });
          } else {
            pageInfo.list[i] = Object.assign( {}, pageInfo.list[i], { checked: false });
          }
        }
      },
      // 产品列表查询框-模糊搜索
      searchByParameter: function () {
        this.initPageInfo();
        this.pageInfo.params = Object.assign( {}, this.pageInfo.params, { searchText: this.search.text });
        this.onLoad ();
      },
      // 选择意向产品后提交
      commit: function ( event ) {
        event.preventDefault();
        // 筛选出勾选的意向产品
        let tempProduct = [];
        for(let i=0;i<this.pageInfo.list.length;i++) {
          if(this.pageInfo.list[i].checked) {
            tempProduct.push(this.pageInfo.list[i]);
          }
        }
        // 判断需要删除的数据
        for(let i=0;i<this.opportunityItem.intendProdList.length;i++) {
          let temp = this.opportunityItem.intendProdList[i];
          let findFlag = false;
          for(let j=0;j<tempProduct.length;j++) {
            if(temp.prodId === tempProduct[j].id) {
              findFlag = true;
              break;
            }
          }
          if(!findFlag) {
            this.opportunityItem.intendProdList[i].deleteFlag = 'Y';
          }
        }
        // 判断需要添加的数据
        for(let i=0;i<tempProduct.length;i++) {
          let temp = tempProduct[i];
          let findFlag = false;
          for(let j=0;j<this.opportunityItem.intendProdList.length;j++) {
            if(temp.id === this.opportunityItem.intendProdList[j].prodId) {
              findFlag = true;
              break;
            }
          }
          if(!findFlag) {
            this.opportunityItem.intendProdList.push({
              optyId: this.opportunityItem.id,
              prodId: temp.id,
              prodName: temp.prodName,
              prodModeName: temp.prodModeName,
              price: temp.promoPrice,
              prodImgUrl: temp.prodImgUrl,
              tagName : temp.tagName
            });
          }
        }
        this.setOpportunityItem({item: this.opportunityItem, reset: false});
        this.$router.go(-1);
      },
      // 选中or取消选中产品行
      check: function ( item ) {
        item.checked = !item.checked;
        this.$forceUpdate();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .check {
    width: 8%;
    float: left;
    background: #fafafa;
    height: 100px;
    line-height: 100px;
    text-align: center;
    .icon {
      color: #26a2ff;
      font-size: 18px;
    }
  }
</style>
