<template>
  <transition name="move">
    <div class="food-wrapper" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <Price :price="food.price" :oldPrice="food.oldPrice"></Price>
          <div class="cartcontrol-wrapper">
            <CartControl :food="food"></CartControl>
          </div>
          <!-- 立马隐藏导致动画得不到点击元素的位置，加入动画解决问题 -->
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
          </transition>
        </div>
        <Split v-show="food.info"></Split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <Split></Split>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import BScroll from 'better-scroll';
import Price from 'components/Price/price';
import CartControl from 'components/CartControl/cartcontrol';
import Split from 'components/Split/split';

export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  components: {
    Price,
    CartControl,
    Split
  },
  watch: {},
  computed: {
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
      this.$emit('cart-add', event.target);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="stylus">
.food-wrapper
  position: fixed;
  left: 0
  top: 0
  bottom: 48px
  width: 100%
  background: #ffffff
  z-index: 30
  transition: all 0.2s linear

  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)

  &.move-enter-to, &.move-leave
    transform: translate3d(0, 0, 0)

  .image-header
    position: relative
    width: 100%
    height: 0
    padding-top: 100%

    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height 100%

    .back
      position: fixed
      top: 10px
      left: 0

      .icon-arrow_lift
        display: block
        padding: 10px
        font-size: 16px
        color: #ffffff

  .content
    position: relative
    padding: 18px

    .title
      line-height: 14px
      margin-bottom: 8px
      font-size: 14px
      font-weight: 700
      color: rgb(7, 17, 27)

    .detail
      margin-bottom: 10px
      line-height: 10px
      font-size: 0

      .sell-count, .rating
        font-size: 10px
        color: rgb(147, 153, 159)

      .sell-count
        margin-right: 12px

    .cartcontrol-wrapper
      position: absolute
      right: 12px
      bottom: 12px

    .buy
      position: absolute
      right: 18px
      bottom 18px
      z-index: 10
      height: 24px
      line-height: 24px
      padding: 0 12px
      border-radius: 12px
      color: #ffffff
      background: rgb(0, 160, 220)
      box-sizing: border-box
      font-size: 10px
      transition: all 0.2s
      opacity: 1

      &.fade-enter, &.fade-leave-to
        opacity: 0
      &.fade-enter-to, &.fade-leave
        opacity: 1

  .info
    padding: 18px

    .title
      line-height: 14px
      margin-bottom: 6px
      font-size: 14px
      color: rgb(7, 17, 27)

    .text
      line-height: 24px
      padding: 0 8px
      font-size: 12px
      color: rgb(77, 85, 93)
</style>
