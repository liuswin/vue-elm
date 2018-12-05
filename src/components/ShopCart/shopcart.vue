<template>
  <div class="shop-wrapper">
    <div class="shopcart">
      <div
        class="content"
        @click="toggleList"
      >
        <div class="content-left">
          <div class="logo-wrapper">
            <div
              class="logo"
              :class="{'highlight': totalCount}"
            >
              <i
                class="icon-shopping_cart"
                :class="{'highlight': totalCount}"
              ></i>
            </div>
            <div
              class="num"
              v-show="totalCount"
            >{{totalCount}}</div>
          </div>
          <div
            class="price"
            :class="{'highlight': totalPrice}"
          >￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div
          class="content-right"
          @click.stop.prevent="pay"
        >
          <div
            class="pay"
            :class="payClass"
          >
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="(ball, index) in balls" :key="index">
          <transition
            name="drop"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
          >
            <div
              v-show="ball.show"
              class="ball"
            >
              <div class="inner inner-hook">
              </div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div
          class="shopcart-list"
          v-show="listShow"
        >
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span
              class="empty"
              @click="empty"
            >清空</span>
          </div>
          <div
            class="list-content"
            ref="listContent"
          >
            <ul>
              <li
                class="food"
                v-for="(food, index) in selectFoods"
                :key="index"
              >
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"></CartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div
        class="list-mask"
        v-show="listShow"
        @click="hideList"
      ></div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import CartControl from 'components/CartControl/cartcontrol';

export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  components: {
    CartControl
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    };
  },
  watch: {
    selectFoods(newFoods, oldFoods) {
      if (newFoods.length === 0) {
        this.fold = true;
      }
    },
    fold(newValue, oldValue) {
      let show = !newValue;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      return this.totalPrice < this.minPrice ? 'no-enough' : 'enough';
    },
    listShow() {
      if (!this.totalCount) {
        return false;
      }
      if (this.totalPrice > 0 && !this.fold) {
        return true;
      }
      return false;
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    hideList() {
      this.fold = true;
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`支付${this.totalPrice}`);
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el) {
      // 主动触发浏览器重绘
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl';

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50

    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)

      .content-left
        flex: 1

        .logo-wrapper
          display: inline-block
          position: relative
          vertical-align: top
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27

          .logo
            height: 100%
            width: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center

            &.highlight
              background: rgb(0, 160, 220)

            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a

              &.highlight
                color: #ffffff

          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)

        .price
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700

          &.highlight
            color: #ffffff

        .desc
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          margin-left: 12px
          font-size: 10px

      .content-right
        flex: 0 0 105px
        width: 105px

        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b

          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #ffffff

    .ball-container

      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        // transform: translate3d(0,0,0)
        // transition: all 0.4s linear
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)

        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear

    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transition: all 0.5s
      transform: translate3d(0, -100%, 0)

      // &.fold-enter-to, &.fold-leave

      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)

      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)

        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)

        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        background: #ffffff
        overflow: hidden

        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))

          .name
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(7, 17, 27)

          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)

          .cartcontrol-wrapper
            position: absolute
            bottom: 6px
            right: 0

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    transition: all 0.5s

    &.fade-enter, &.fade-leave-to
      opacity: 0
      background: rgba(7, 17, 27, 0)

</style>
