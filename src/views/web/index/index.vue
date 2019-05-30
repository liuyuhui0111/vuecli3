<template>
    <div class="index common-container-width">
        <!-- 轮播图 -->
        <Banner v-if="bannerList.length>0" :list="bannerList"></Banner>

        <!-- classlist 课程列表classList -->
        <List
        v-if="showCourseOfflineList.list.length>0"
        @classClick="classClick"
        @moreClick="moreClick('/open-class')"
        :title="showCourseOfflineList.title"
        :more="showCourseOfflineList.more"
        :list="showCourseOfflineList.list.slice(0,4)"
        :cardType="showCourseOfflineList.type"
        ></List>

        <!-- 大家都在学allStudyList -->
        <List
        v-if="showCourseOnlineList.list.length>0"
        @classClick="classClick"
        @moreClick="moreClick('/online-class',{boolean:1})"
        :title="showCourseOnlineList.title"
        :more="showCourseOnlineList.more"
        :list="showCourseOnlineList.list.slice(0,4)"
        :cardType="showCourseOnlineList.type"
        ></List>

        <!-- 新鲜出炉 -->
        <List
        v-if="getNewCourseListList.list.length>0"
        @classClick="classClick"
        @moreClick="moreClick('/online-class')"
        :title="getNewCourseListList.title"
        :more="getNewCourseListList.more"
        :list="getNewCourseListList.list.slice(0,4)"
        :cardType="getNewCourseListList.type"
        ></List>

        <!-- 推荐课程 -->
        <List
        v-if="getGroomCourseListList.list.length>0"
        @classClick="classClick"
        :title="getGroomCourseListList.title"
        :more="getGroomCourseListList.more"
        :list="getGroomCourseListList.list.slice(0,4)"
        :cardType="getGroomCourseListList.type"
        ></List>

        <!-- teacherList 名师列表 -->
        <List v-if="showTeacherList.length>0" title="名师介绍">
          <TeacherSwiper :list="showTeacherList"></TeacherSwiper>
        </List>

    </div>
</template>
<script>
import Banner from './banner.vue';
import List from './list.vue';
import TeacherSwiper from './teacher-swiper.vue';
import {
  showFoucusPic,
  showCourseOffline,
  showCourseOnline,
  showTeacher,
  getNewCourseList,
  getGroomCourseList,
} from '@/api/apis';
import { initList } from '@/assets/utils/util';

export default {
  data() {
    return {
      name: 'index',
      bannerList: [],
      showCourseOfflineList: {
        type: 'offline-index',
        title: '线下公开课程',
        more: '更多',
        list: [],
      },
      showCourseOnlineList: {
        type: 'online',
        title: '大家都在学',
        more: '更多',
        list: [],
      },
      getNewCourseListList: {
        type: 'online',
        title: '新鲜出炉',
        more: '更多',
        list: [],
      },
      getGroomCourseListList: {
        type: 'online',
        title: '推荐课程',
        more: '',
        list: [],
      },
      showTeacherList: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 获取轮播图
      this.showFoucusPicFn();
      // 获取线下公开课
      this.showCourseOfflineFn();
      // 首页大家都在学
      this.showCourseOnlineFn();
      // 首页新鲜出炉列表
      this.getNewCourseListFn();
      // 首页推荐课程列表
      this.getGroomCourseListFn();
      // 首页获取老师列表
      this.showTeacherFn();
    },
    moreClick(path, query) {
      // 点击更多
      if (query) {
        this.$router.push({ path, query });
      } else {
        this.$router.push({ path });
      }
    },
    classClick(item, type) {
      if (type === 'offline-index') {
        // 去线下详情页
        this.$router.push({
          path: '/detail',
          query: { cid: item.courseOfflineEntity.id },
        });
      } else if (type === 'online') {
        // 线上课详情页
        this.$router.push({ path: '/online-detail', query: { cid: item.id } });
      }
    },

    showFoucusPicFn() {
      showFoucusPic().then((res) => {
        if (res.data.list) {
          this.bannerList = res.data.list;
          console.log(res.data.list);
        }
        // console.log(this.bannerList);
      }).catch((err) => {
        console.log(err);
      });
    },

    showCourseOfflineFn() {
      showCourseOffline().then((res) => {
        if (res.data.list) {
          /*eslint-disable*/ 
                    res.data.list.forEach((item)=>{
                        item.startTime = item.courseOfflineEntity.startTime;
                        item.endTime = item.courseOfflineEntity.endTime;
                    })
                    /* eslint-enable */
          this.showCourseOfflineList.list = initList(res.data.list, 4);
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    showCourseOnlineFn() {
      showCourseOnline().then((res) => {
        if (res.data.list) {
          this.showCourseOnlineList.list = initList(res.data.list, 4);
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    getNewCourseListFn() {
      getNewCourseList().then((res) => {
        if (res.data.list) {
          let { list } = res.data;
          /*eslint-disable*/ 
                    list.forEach((item) => {
                        item.pic = item.bannerUrl;
                    });
                    /* eslint-enable */
          this.getNewCourseListList.list = initList(list, 4);
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    getGroomCourseListFn() {
      getGroomCourseList().then((res) => {
        if (res.data.list) {
          this.getGroomCourseListList.list = initList(res.data.list, 4);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    showTeacherFn() {
      showTeacher().then((res) => {
        if (res.data.list) {
          this.showTeacherList = res.data.list;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  components: {
    Banner,
    List,
    TeacherSwiper,
  },
};
</script>
<style scoped>
    .banner{
        margin-bottom: 20px;
    }
    .list{
        margin-bottom: 20px;
    }
</style>
