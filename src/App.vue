<template>
  <div id="app">
    <e-header v-bind:seller="seller"></e-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller" />
    </div>
  </div>
</template>

<script>
import Header from 'components/Header/header';
import appData from '../data.json';

export default {
  name: 'App',
  data() {
    return {
      seller: appData.seller
    };
  },
  created() {
    // this.$http.get('/api/seller').then((res) => {
    //   res = res.json();
    //   if (res.code === 0) {
    //     console.log(res.data);
    //   }
    // });
  },
  components: {
    'e-header': Header
  }
};
</script>

<style lang="stylus">
@import 'common/stylus/mixin.styl'

#app
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))

    .tab-item
      flex: 1
      text-align: center

      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)

        &.active
          color: rgb(240, 20, 20)
</style>
