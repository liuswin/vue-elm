import Vue from 'vue';
import Router from 'vue-router';
import Goods from 'components/Goods/goods';
import Judge from 'components/Judge/judge';
import Seller from 'components/Seller/seller';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/judge',
      name: 'Judge',
      component: Judge
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
});
