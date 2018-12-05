<template>
  <div class="price-wrapper">
    <span class="now">￥{{price}}</span>
    <span class="old" v-show="oldPrice">￥{{oldPrice}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    price: {
      type: [String, Number]
    },
    oldPrice: {
      type: [String, Number]
    }
  },
  data() {
    return {
    };
  },
  components: {},
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="stylus">
.price-wrapper
  font-weight: 700
  line-height: 24px

  .now
    margin-right: 9px
    font-size: 14px
    color: rgb(240, 20, 20)

  .old
    text-decoration: line-through
    font-size: 10px
    color: rgb(147, 153, 159)
</style>
