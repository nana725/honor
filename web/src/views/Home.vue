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
    <div class="pagination-home text-right px-3" slot="pagination"></div>
  </swiper>
  <!-- < !end of swiper> -->
  <div class="nav-icons bg-white text-center pt-3 text-dark-1">
    <div class="d-flex flex-wrap">
      <div class="nav-item mb-3" v-for="n in 10" :key="n">
      <i class="sprite sprite-news"></i>
        <div class="py-2">爆料站</div>
    </div>
    </div>
    <div class="bg-light py-2 fs-sm">
      <i class="sprite sprite-arrow"></i>
      <span>收起</span>
    </div>    
  </div>
  <!-- end of nav icons -->
  <!-- 传递动态的需要bind绑定，静态的数据不需要 -->
  <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
    <template #items="{category}">
      <div class="py-2 ml-3 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
            <span class="text-info">[{{news.categoryName}}]</span>
            <span class="px-2">|</span>
            <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
            <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
          </div>
    </template>   
  </m-list-card>
  <m-card icon="Menu" title="英雄列表"></m-card>
  <m-card icon="Menu" title="精彩视频"></m-card>
  <m-card icon="Menu" title="图文攻略"></m-card>
  <p>aaa</p>
  <p>aaa</p>
  <p>aaa</p>
  </div>
</template>

<script>
// 格式化日期
 import dayjs from 'dayjs'

export default {
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
      return {
        swiperOptions: {
          // autoplay:{
          //   delay:2500,
          //   disableOnInteraction:false
          // },
          pagination: {
            el: '.pagination-home'
          }
          // Some Swiper option/callback...
        },
        newsCats:[
          // {
          //   name:"热门",
          //   // 每次循环的时候返回一个对象
          //   // eslint-disable-next-line no-unused-vars
          //   newsList:new Array(5).fill({}).map(v => ({
          //       categoryName:'公告',
          //       title:'6月2日全服不停机公告',
          //       date:'06/01'
          //   }))
          // },
 
        ]
      }
    },
    methods: {
      async fetchNewsCats(){
        const res = await this.$http.get('news/list')
        this.newsCats = res.data
      }
    },

    created() {
      this.fetchNewsCats()
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

.nav-icons{
  border-top:1px solid $border-color;
  border-bottom:1px solid $border-color;
  .nav-item{
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n+1){
      border-left:none;
    }
  }
}
</style>
