<template>
    <div class="teacher-swiper common-web-index-banner">

      <swiper v-if="list.length>0" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide
        v-for="(item,index) in list"
        :key="index">
            <div class="teacher-box pointer">
                <div class="photo">
                    <img :src="item.headPic" :alt="item.name">
                </div>
                <p class="name">{{item.name}}</p>
                <p class="intro" v-html="item.individualResume"></p>
            </div>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
    data() {
        return {
            name: 'teacher-swiper',
            swiperOption: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            isShowSwiper: false,
        };
    },
    props: {
        list: { // 教师数据列表
            type: Array,
            default: () => [],
        },
    },
    mounted() {
        this.init();
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        },
    },
    methods: {
        init() {
            this.isShowSwiper = true;
        },
        swiperClick(swiperItem) {
            if (swiperItem.href) {
                // 如果存在href 跳转
                window.location.href = swiperItem.href;
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
        background: url('./imgs/icon-prev1.png') no-repeat center center;
    }
    .swiper-button-next{
        background: url('./imgs/icon-next1.png') no-repeat center center;
    }
    .teacher-box{
        width: 220px;
        max-height: 430px;
        text-align: center;
        font-size: 14px;
            color: #444;
            margin: 0 auto;
            padding-bottom: 40px;
    }
    .teacher-box .name{
        font-size: 16px;
        font-weight: bold;
        margin-top: 10px;
    }
    .teacher-box .photo{
        display: block;
        width: 89px;
        height: 89px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 100%;
        margin-top: 19px;
    }
    .teacher-box .photo img{
        width: 100%;
        height: auto;
    }
    .teacher-box .intro{
        text-align: left;
        line-height: 20px;
        margin-top: 10px;
        word-break: break-all;
    }
</style>
