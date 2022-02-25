<template>
  <div>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>
      <img class="w-100" src="../assets/images/c9bf411f951045f547fc52234f496a9a.jpeg" alt="">
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/c9bf411f951045f547fc52234f496a9a.jpeg" alt="">
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/c9bf411f951045f547fc52234f496a9a.jpeg" alt="">
    </swiper-slide>
    <div class="pagination-home text-right px-3 pb-2" slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
export default {
  data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.pagination-home'
          },
          // Some Swiper option/callback...
        }
      }
    },

}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.pagination-home{
  .swiper-pagination-bullet{
    opacity: 1;
    border-radius: 0.1538rem;
    background:#fff;
    &.swiper-pagination-bullet-active{
      background: map-get($map: $colors, $key:'info');
    }


  }
}
</style>
