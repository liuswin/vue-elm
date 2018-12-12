<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <Star :size="36" :score="seller.score"></Star>
          <span class="text">{{seller.ratingCount}}</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
      <Split></Split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{ seller.supports[index].description }}</span>
          </li>
        </ul>
      </div>
      <Split></Split>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import Star from 'components/Star/star';
import Split from 'components/Split/split';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
    };
  },
  components: {
    Star,
    Split
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      });
    });
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl';

.seller
  position: fixed;
  left: 0
  top: 174px
  bottom: 0
  width: 100%
  overflow: hidden

  .overview
    position: relative
    padding: 18px

    .title
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px

    .desc
      padding-bottom: 18px
      font-size: 0
      border-1px(rgba(7, 17, 27, 0.1))

      .star
        display: inline-block
        vertical-align: top
        margin-right: 8px

      .text
        display: inline-block
        vertical-align: top
        line-height: 18px
        margin-right: 12px
        font-size: 10px
        color: rgb(77, 85, 93)

    .remark
      display: flex
      padding-top: 18px

      .block
        flex: 1
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)

        &:last-child
          border: 0

        h2
          margin-bottom: 4px
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)

        .content
          line-height: 24px
          font-size: 10px
          color: rgb(7, 17, 27)

          .stress
            font-size: 24px

  .bulletin
    padding: 18px 18px 0 18px

    .title
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px

    .content-wrapper
      padding: 0 12px 16px 12px
      border-1px(rgba(7, 17, 27, 0.1))

      .content
        line-height: 24px
        font-size: 12px
        color: rgb(240, 20, 20)

    .supports
      .support-item
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0

      .icon
        display: inline-block
        width: 16px
        height: 16px
        vertical-align: top
        margin-right: 6px
        background-size: 16px 16px
        background-repeat: no-repeat

        &.decrease
          bg-image('./images/decrease_4')

        &.discount
          bg-image('./images/discount_4')

        &.guarantee
          bg-image('./images/guarantee_4')

        &.invoice
          bg-image('./images/invoice_4')

        &.special
          bg-image('./images/special_4')

      .text
        line-height: 16px
        font-size: 12px
        color: rgb(7, 17, 27)

</style>
