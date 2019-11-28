<template>
  <div class="module-item">
    <div class="item-title">地址信息</div>
    <div class="item-body">
      <lnk-lov-field v-model="addressItem.addrType" label="地址类型" required lovType="ADDR_TYPE"/>
      <lnk-field v-model="addressItem.consignee" label="收货人" required />
      <lnk-field v-model="addressItem.mobilePhone" label="联系方式" required type="tel"/>
      <lnk-address-field :province="addressItem.province"
                     :city="addressItem.city"
                     :district="addressItem.district"
                     label="地区" @change="changeAddress" required/>
      <lnk-field v-model="addressItem.addr" label="详细地址" required />
      <lnk-field v-model="addressItem.housingEstate" label="小区" required />
      <lnk-lov-field v-model="addressItem.houseType" label="户型" lovType="HOUSE_TYPE"/>
    </div>
    <div class="item-body">
      <van-tabbar>
        <van-tabbar-item icon="passed" @click="saveAddress()">保存地址</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  import LnkField from '@/components/lnk.field'
  import LnkLovField from '@/components/lnk.lov.field'
  import LnkAddressField from '@/components/lnk.address.field'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: "editAddress",
    computed: {
      ...mapGetters(['getAddressItem', 'getOpportunityItem'])
    },
    components: {
      LnkField,
      LnkLovField,
      LnkAddressField
    },
    created () {
      document.title = "地址";
      // 获取待编辑地址数据
      this.addressItem = this.getAddressItem();
      // 获取相应的商机数据
      this.opportunityItem = this.getOpportunityItem();
      // 来源
      this.from = this.$router.currentRoute.query.from;
    },
    data () {
      return {
        addressItem: {},
        from: ''            // 标示此地址基本信息进入还是地址列表进入
      }
    },
    methods: {
      ...mapMutations(['setOpportunityItem', 'pushAddressList']),
      // 地址改变时，回写省市县
      changeAddress: function ( value ) {
        this.addressItem.province = value[0].code === '-1' ? '': value[0].name;
        this.addressItem.city = value[1].code === '-1' ? '': value[1].name;
        this.addressItem.district = value[2].code === '-1' ? '': value[2].name;
      },
      // 保存地址，包括新建
      saveAddress: function () {
        // 必输控制
        if(this.$util.isEmpty(this.addressItem.addrType) || this.$util.isEmpty(this.addressItem.consignee)
        || this.$util.isEmpty(this.addressItem.mobilePhone) || this.$util.isEmpty(this.addressItem.addr)
        || this.$util.isEmpty(this.addressItem.housingEstate) || (this.$util.isEmpty(this.addressItem.province)
        && this.$util.isEmpty(this.addressItem.city) && this.$util.isEmpty(this.addressItem.district))) {
          this.$toast('请补充必填信息.');
          return;
        }
        // 新建情况下，添加的地址将commit到store，否则直接提交到服务器
        if(this.opportunityItem.dataOperationType === 'new') {
          this.$store.commit('pushAddressList', this.addressItem);
          // 商机新建模式下，新添加的地址默认为主要地址，故需要回写地址信息到商机基本信息
          this.opportunityItem.mainAddrId = this.addressItem.id;
          this.opportunityItem.district = this.addressItem.district;
          this.opportunityItem.address = this.addressItem.addr;
          this.opportunityItem.housingEstate = this.addressItem.housingEstate;
          this.opportunityItem.houseType = this.addressItem.houseType;
          this.setOpportunityItem({item: this.opportunityItem, reset: false});
          this.$router.go(-1);
        } else {
          let url = '';
          if(this.addressItem.dataOperationType === 'new') {
            url = '/mobile/QidianAccntAddr/insert';
          } else {
            url = '/mobile/QidianAccntAddr/update';
          }
          this.$http.post(url,
            this.addressItem
          ).then((res) => {
            if(res.data.success) {
              // 回写信息
              if(this.from === 'basicInfo' || this.addressItem.isDefault === 'Y') {
                this.opportunityItem.mainAddrId = this.addressItem.id;
                this.opportunityItem.district = this.addressItem.district;
                this.opportunityItem.address = this.addressItem.addr;
                this.opportunityItem.housingEstate = this.addressItem.housingEstate;
                this.opportunityItem.houseType = this.addressItem.houseType;
                this.setOpportunityItem({item: this.opportunityItem, reset: false});
              }
              this.$toast.success("保存成功！");
              this.$router.go(-1);
            } else {
              this.$toast("保存失败：" + res.data.message);
            }
          }).catch((error) => {
            this.$toast("请求失败：" + error);
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
