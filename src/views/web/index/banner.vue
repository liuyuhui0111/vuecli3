<template>
    <div class="banner common-web-index-banner">

      <swiper v-if="isShowSwiper" :options="swiperOption" ref="bannerSwiper">
        <!-- slides -->
        <swiper-slide
        v-for="(item,index) in list"
        :key="index">
            <img class="banner-img"
            @click="swiperClick(item)"
            :src="item.pic?item.pic:defaultUrl" :alt="item.title">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
      </swiper>
    </div>
</template>
<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
    name: 'banner',
    data() {
        return {
            name: 'banner',
            defaultUrl: `${window.location.origin}/banner.png`,
            swiperOption: {
                autoplay: {
                    delay: 3000,
                    // disableOnInteraction: false,
                }, // 自动播放
                loop: true, // 循环播放
                pagination: { // 分页
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            isShowSwiper: false,
        };
    },
    props: {
        list: { // 轮播图数据
            type: Array,
            default: () => [],
        },
    },
    mounted() {
        this.init();
    },
    computed: {
        swiper() {
            return this.$refs.bannerSwiper.swiper;
        },
    },
    methods: {
        init() {
            // this.swiper.slideTo(3, 1000, false);
            // this.swiperOption.autoplay = false;
            this.isShowSwiper = true;
        },
        swiperClick(swiperItem) {
            if (swiperItem.url) {
                // 如果存在href 跳转
                window.location.href = swiperItem.url;
            }
        },
    },
    components: {
        swiper,
        swiperSlide,
    },
};
</script>
<style scoped>
    .swiper-button-prev{
        background: url('./imgs/icon-prev.png') no-repeat center center;
    }
    .swiper-button-next{
        background: url('./imgs/icon-next.png') no-repeat center center;
    }
    .banner-img{
        width: 100%;
        min-height: 304px;
        max-height: 315px;
    }
</style>
