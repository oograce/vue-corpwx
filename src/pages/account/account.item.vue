<template>
  <div>
    <div class="module-item has-tab">
      <div class="item-title">基本信息</div>
      <div class="item-body">
        <lnk-field v-model="accountItem.accountName" label="姓名" required/>
        <lnk-lov-field v-model="accountItem.gender" label="性别" lovType="GENDER" />
        <lnk-date-field v-model="accountItem.birthday" label="生日" dateType="date" />
        <lnk-lov-field v-model="accountItem.sources" label="来源渠道" lovType="SOURCE_FROM"/>
        <lnk-field label="地址" :value="fullAddress"
                   readonly hasLink @click="updateOrInsertMainAddress"/>
        <lnk-field v-model="accountItem.address" label="详细地址" readonly/>
        <lnk-field v-model="accountItem.housingEstate" label="小区" readonly/>
        <lnk-lov-field v-model="accountItem.houseType" label="户型" readonly lovType="HOUSE_TYPE"/>
      </div>
      <div class="item-title">联系方式</div>
      <div class="item-body">
        <lnk-field v-model="accountItem.mobilePhone1" label="手机" type="tel"/>
        <lnk-field v-model="accountItem.mobilePhone2" label="备用手机号" type="tel"/>
        <lnk-field v-model="accountItem.qqNum" label="QQ" type="tel"/>
        <lnk-field v-model="accountItem.weichatNum" label="微信号" />
      </div>
      <div class="item-body">
        <van-tabbar>
          <van-tabbar-item icon="passed" @click="saveAccount">保存客户</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script>
  import LnkLovField from '@/components/lnk.lov.field'
  import LnkAddressField from '@/components/lnk.address.field'
  import LnkDateField from '@/components/lnk.date.field'
  import LnkField from '@/components/lnk.field'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'accountItem',
    computed: {
      ...mapGetters(['getAccountItem', 'getId']),
      fullAddress: function () {
        return this.accountItem.province + this.accountItem.city + this.accountItem.district;
      }
    },
    data () {
      return {
        accountItem: {}
      }
    },
    created () {
      document.title = '客户详情';
      this.accountItem = this.getAccountItem();
    },
    components: {
      LnkLovField,
      LnkAddressField,
      LnkDateField,
      LnkField
    },
    methods: {
      ...mapMutations(['setAddressItem']),
      // 初始化地址对象
      initAddress: function () {
        return {
          id: this.getId(),
          acctId: this.accountItem.id,
          dataOperationType: 'new',
          isEffective: 'Y',
          addrType: 'RECEIVE_ADDR',     // 地址类型
          consignee: this.accountItem.accountName,  // 收货人
          mobilePhone: '',              // 联系方式
          province: '',                 // 省
          city: '',                     // 市
          district: '',                 // 县
          addr: '',                     // 详细地址
          housingEstate: '',            // 小区
          houseType: ''                 // 户型
        };
      },
      // 基本信息tab下点击修改地址
      updateOrInsertMainAddress: function () {
        let addressItem = {};
        if(this.$util.isEmpty(this.accountItem.mainAddrId) || this.accountItem.mainAddrId === 'no Match Id') {
          // 主要地址不存在
          if(this.accountItem.addrList.length > 0) {
            // 但客户下有地址时，取一条地址作为主要地址进行编辑
            this.accountItem.mainAddrId = this.accountItem.addrList[0].id;
            addressItem = this.accountItem.addrList[0];
            addressItem.setmainFlag = 'Y';
          } else {
            // 客户下不存在其他地址，则初始化地址对象用于编辑
            addressItem = this.initAddress();
          }
          // 将新地址对象的id回写到基本信息主要地址
          this.accountItem.mainAddrId = addressItem.id;
        } else {
          // 基本信息主要地址存在，则进行匹配
          for(let i=0;i<this.accountItem.addrList.length;i++) {
            let temp = this.accountItem.addrList[i];
            if(temp.id === this.accountItem.mainAddrId) {
              addressItem = temp;
            }
          }
        }
        // 将当前地址信息写入数据仓库
        this.setAddressItem( addressItem );
        this.$router.push('/account/list/item/address');
      },
      // 保存客户
      saveAccount: function () {
        if(this.$util.isEmpty(this.accountItem.accountName)) {
          this.$toast("客户姓名不能为空！");
          return;
        }
        this.$http.post('/mobile/QidianAccount/update',
          this.accountItem
        ).then((res) => {
          if(res.data.success) {
            this.$toast.success("保存成功！");
            this.$router.go(-1);
          } else {
            this.$toast("保存失败：" + res.data.message);
          }
        }).catch((error) => {
          this.$toast("请求失败：" + error);
        });
      }
    }
  }
</script>

<style scoped>

</style>
