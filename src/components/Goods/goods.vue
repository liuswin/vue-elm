<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li class="menu-item" v-for="(item, index) in goods" :key="index" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food, foodIndex) in item.foods" :key="foodIndex" class="food-item border-1px" @click="selectFood(food, $event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <Price :price="food.price" :oldPrice="food.oldPrice"></Price>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" v-on:cart-add="_drop"></CartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></ShopCart>
    <Food :food="selectedFood" ref="food" v-on:cart-add="_drop"></Food>
  </div>
</template>

<script type="text/ecmascript-6">
import appData from '../../../data.json';
import BScroll from 'better-scroll';
import ShopCart from 'components/ShopCart/shopcart';
import Price from 'components/Price/price';
import CartControl from 'components/CartControl/cartcontrol';
import Food from 'components/Food/food';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  components: {
    ShopCart,
    Price,
    CartControl,
    Food
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i];
        let nextHeight = this.listHeight[i + 1];
        if (!nextHeight || (this.scrollY >= height && this.scrollY < nextHeight)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    this.goods = appData.goods;
    this.$nextTick(() => {
      this._initScroll();
      this._calculateHeight();
    });
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) return;
      let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) return;
      this.selectedFood = food;
      this.$refs.food.show();
    },
    _drop(target) {
      // 优化 异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl';

.goods
  display: flex
  position: absolute
  top: 174px
  bottom: 46px
  width: 100%
  overflow: hidden

  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7

    .menu-item
      display: table
      height: 54px
      width: 56px
      line-height: 14px
      padding: 0 12px

      &.current
        position: relative
        margin-top: -1px
        background: #ffffff
        font-weight: 700
        z-index: 10

        .text
          border-none()

      .icon
        display: inline-block
        width: 16px
        height: 16px
        vertical-align: top
        margin-right: 2px
        background-size: 16px 16px
        background-repeat: no-repeat

        &.decrease
          bg-image('./images/decrease_3')

        &.discount
          bg-image('./images/discount_3')

        &.guarantee
          bg-image('./images/guarantee_3')

        &.invoice
          bg-image('./images/invoice_3')

        &.special
          bg-image('./images/special_3')

      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        font-size: 12px
        border-1px(rgba(7, 17, 27, 0.1))

  .foods-wrapper
    flex: 1

    .title
      padding-left: 17px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7

    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      border-1px(rgba(7, 17, 27, 0.1))

      &:last-child
        border-none()
        margin-bottom: 0

      .icon
        flex: 0 0 57px
        margin-right: 10px

      .content
        flex: 1

        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)

        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)

        .desc
          margin-bottom: 8px
          line-height: 12px

        .extra
          &.count
            margin-right: 12px

        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 10px
</style>
