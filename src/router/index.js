/**
 * 路由控制器
 * @author siye
 * */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Login from '@/pages/login'
import LnkNotFound from '@/components/lnk.not.found'
import AccountList from '@/pages/account/account.list'
import AccountItem from '@/pages/account/account.item'
import AccountAddress from '@/pages/account/account.address'
import OpportunityList from '@/pages/opportunity/opportunity.list'
import OpportunityItem from '@/pages/opportunity/opportunity.item'
import OpportunityIntentionProduct from '@/pages/opportunity/intention.product.list'
import OpportunityAddress from '@/pages/opportunity/opportunity.address'
import CommunityItem from '@/pages/community/community.item'
import GetBonus from '@/pages/bonus/get.bonus'
import MyBonus from '@/pages/bonus/my.bonus'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/index'
    }, {
      path: '/index',
      meta: {
        requireAuth: true
      },
      name: 'Home',
      component: Home
    }, {
      path: '/account/list',
      name: 'AccountList',
      component: AccountList
    },{
      path: '/account/list/item',
      name: 'AccountItem',
      component: AccountItem
    }, {
      path: '/account/list/item/address',
      name: 'AccountAddress',
      component: AccountAddress,
    }, {
      path: '/opportunity/list',
      meta: {
        requireAuth: true
      },
      name: 'OpportunityList',
      component: OpportunityList
    }, {
      path: '/opportunity/list/item',
      name: 'OpportunityItem',
      component: OpportunityItem
    }, {
      path: '/opportunity/list/item/intentionProduct',
      name: 'OpportunityIntentionProduct',
      component: OpportunityIntentionProduct
    }, {
      path: '/opportunity/list/item/address',
      name: 'OpportunityAddress',
      component: OpportunityAddress,
    }, {
      path: '/community/item',
      name: 'CommunityItem',
      component: CommunityItem,
    },{
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/bonus/getBonus',
      meta: {
        requireAuth: true
      },
      name: 'getBonus',
      component: GetBonus
    }, {
      path: '/bonus/myBonus',
      meta: {
        requireAuth: true
      },
      name: 'myBonus',
      component: MyBonus
    }, {
      path: '*',
      name: 'LnkNotFound',
      component: LnkNotFound
    }
  ]
})
