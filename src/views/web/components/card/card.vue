<template>
    <div class="card">

      <!-- 线下课程模块 -->
      <div v-if="type === 'offline'" class="offline">
        <div class="item"
          :class="{pointer:classData.href}"
          @click="clickClass(classData)"
        >
            <img :src="classData.imgurl"
            :alt="classData.title">
            <p class="title ellipsis"
            :style="titleStyle"
            :title="classData.title">{{classData.title}}</p>
        </div>
          <p class="teacher ellipsis">主讲师：
          <span :class="{pointer:classData.teacherHref}"
          @click="routerGo(classData.teacherHref)">{{classData.teacherName}}</span>
          {{classData.teacherAddress}}</p>
          <p class="time">上课时间：{{classData.time}}</p>
          <div v-if="classData.money && classData.peopleNum" class="free-box">
            <span class="freeType1">￥{{classData.money}}</span>
            <span class="person">
              {{classData.peopleNum}}人正在学习
            </span>
          </div>
      </div>

      <!-- 在线课程模块 -->
      <div v-if="type === 'online'" class="online">
        <div class="item"
          :class="{pointer:classData.href}"
          @click="routerGo(classData.href)"
        >
            <img :src="classData.imgurl"
            :alt="classData.title">
            <p class="title ellipsis2" :title="classData.title">{{classData.title}}</p>
        </div>
          <div class="free-box">
            <span :class="[
            {free:classData.freeType == '0'},
            {freeType1:classData.freeType == '1'},
            ]">{{classData.freeTxt}}</span>
            <span class="person">
              {{classData.peopleNum}}人正在学习
            </span>
          </div>
      </div>

       <!-- 搜索结果课程模块 -->
      <div v-if="type === 'search'" class="search-box">
        <!--  -->
        <div class="item">
          <img :src="classData.imgurl"
            :alt="classData.title">
            <div class="intro">
               <p class="title ellipsis2"
               :title="classData.title">{{classData.title}}</p>
               <p class="time">
                  {{classData.time}}小时 |
                  {{classData.peopleNum}}人已学 |
                  {{classData.freeTxt}}
               </p>
               <p class="class-intro ellipsis2">
                 {{classData.intro}}
               </p>
               <p class="type">来自分类:{{classData.type}}</p>
            </div>
        </div>
        <!-- 右侧老师头像 名称 -->
        <div class="teacher-box">
          <img class="photo"
          :src="classData.teacherSrc"
          :alt="classData.teacherName">
          <span class="name">{{classData.teacherName}}</span>
        </div>
      </div>

       <!-- 搜索结果专题模块 -->
      <div v-if="type === 'search1'" class="search-box">
        <!--  -->
        <div class="item">
          <img :src="classData.imgurl"
            :alt="classData.title">
            <div class="intro">
               <p class="title ellipsis2"
               :title="classData.title">{{classData.title}}</p>
               <p class="time">
                  {{classData.classNum}}门课程 |
                  {{classData.time}}小时
               </p>
               <p class="class-intro ellipsis2">
                 {{classData.intro}}
               </p>
               <p class="type">来自分类:{{classData.type}}</p>
            </div>
        </div>
        <!-- 右侧老师头像 名称 -->
        <div class="teacher-box">
          <p>{{classData.freeTxt}}</p>
          <span class="money">￥{{classData.money}}</span>
        </div>
      </div>


    </div>
</template>
<script>
export default {
    name: 'card',
    data() {
        return {
            name: '课程组件',
        };
    },
    props: {
        type: { // 卡片类型，online线上课程/offline线下课程
            type: String,
            default: () => 'offline',
        },
        classData: { // 卡片数据
            type: Object,
            default: () => null,
        },
        titleStyle: {
            type: Object,
            default: () => null,
        },
    },

    mounted() {
        this.init();
    },
    methods: {
        init() {

        },
        routerGo(href) {
            if (href) {
                window.location.href = href;
            }
        },
        clickClass(item) {
            this.$emit('classClick', item);
        },
    },
};
</script>
<style scoped>
  .card{
    width: 100%;
    letter-spacing: 0;
  }
  .card img{
    width: 100%;
    height: 130px;
  }
  .title{
    font-size: 16px;
    padding-top: 10px;
    margin-bottom: 10px;
  }
  .offline{
    width: 219px;
    font-size: 14px;
    color: #868686;
  }
  .offline .title{
    color: #FB683C;
  }
  .offline .time{
    padding: 10px 0;
  }
  .online{
    width: 219px;
    font-size: 14px;
    color: #444;
  }
  .online .title{
    height: 40px;
    line-height: 20px;
    font-size: 14px;
  }
  .free-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .free{
    color: #2DAF53;
  }
  .freeType1{
    color: #F91E1E;
  }

  /*搜索结果页面*/

  .search-box{
    width: 100%;
    box-sizing:border-box;
    position: relative;
    padding-right: 67px;
  }
  .teacher-box{
    position: absolute;
    width: 60px;
    right: 0;
    top: 0;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }
  .teacher-box .photo{
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    margin-bottom: 10px;

  }
  .teacher-box .name{
    font-size: 14px;
  }

  .search-box .item{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;
  }
  .search-box .item img{
    width: 219px;
    height: 130px;
  }
  .search-box .intro{
    padding: 0 20px;
    font-size: 14px;
    letter-spacing: 0;
    color: #444;
  }
  .search-box .title{
    padding: 0;
    font-size: 16px;
  }
  .search-box .type,
  .search-box .time{
    color: #868686;
    margin-bottom: 10px;
  }
  .search-box .class-intro{
    max-height: 40px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .money{
    line-height: 30px;
    font-size: 14px;
    color: #FB683C;
  }
</style>
