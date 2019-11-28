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
      ...mapGetters(['getAddressItem', 'getAccountItem'])
    },
    components: {
      LnkField,
      LnkLovField,
      LnkAddressField
    },
    created () {
      document.title = "地址";
      this.addressItem = this.getAddressItem();
    },
    data () {
      return {
        addressItem: {}
      }
    },
    methods: {
      ...mapMutations(['setAccountItem']),
      // 地址改变时，回写省市县
      changeAddress: function ( value ) {
        this.addressItem.province = value[0].code === '-1' ? '': value[0].name;
        this.addressItem.city = value[1].code === '-1' ? '': value[1].name;
        this.addressItem.district = value[2].code === '-1' ? '': value[2].name;
      },
      // 保存or新建地址
      saveAddress: function () {
        if(this.$util.isEmpty(this.addressItem.addrType) || this.$util.isEmpty(this.addressItem.consignee)
        || this.$util.isEmpty(this.addressItem.mobilePhone) || this.$util.isEmpty(this.addressItem.addr)
        || this.$util.isEmpty(this.addressItem.housingEstate) || (this.$util.isEmpty(this.addressItem.province)
        && this.$util.isEmpty(this.addressItem.city) && this.$util.isEmpty(this.addressItem.district))) {
          this.$toast('请补充必填信息.');
          return;
        }
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
            let accountItem = this.getAccountItem();
            accountItem.mainAddrId = this.addressItem.id;
            accountItem.province = this.addressItem.province;
            accountItem.city = this.addressItem.city;
            accountItem.district = this.addressItem.district;
            accountItem.address = this.addressItem.addr;
            accountItem.housingEstate = this.addressItem.housingEstate;
            accountItem.houseType = this.addressItem.houseType;
            this.setAccountItem(accountItem);
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
</script>

<style scoped>

</style>
