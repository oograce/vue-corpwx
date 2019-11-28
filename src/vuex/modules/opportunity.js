/**
 * 商机数据仓库
 * @author siye
 *  */
export default {
  getters: {
    getOpportunityItem: (state) => () => {
      return state.opportunityItem;
    },
    getActiveTab: (state) => () => {
      return state.active;
    },
    getAddressItem: (state) => () => {
      return state.addressItem;
    }
  },
  state: {
    opportunityItem: {},
    active: '0',
    addressItem: {},
  },
  mutations: {
    setOpportunityItem (state, res) {    // 设置商机Item数据，并重置其他商机下对象
      state.opportunityItem = res.item;
      if(res.reset) {
        state.active = '0';
        state.addressItem = {};
      }
    },
    setActiveTab (state, res) {
      state.active = res;
    },
    setAddressItem (state, res) {
      state.addressItem = res;
    },
    pushAddressList (state, res) {
      let isNeed = true;     // 先判断是否已经添加
      for(let i=0;i<state.opportunityItem.addrList.length;i++) {
        if(res.id === state.opportunityItem.addrList[i].id) {
          isNeed = false;
          break;
        }
      }
      if(isNeed) {
        // 新追加的地址默认为主要
        res.isDefault = 'Y';
        for(let i=0;i<state.opportunityItem.addrList.length;i++) {
          state.opportunityItem.addrList[i].isDefault = 'N';
        }
        state.opportunityItem.addrList.push(res);
      }
    },
  }
}
