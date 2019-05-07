<template>
  <div v-if="isShowPage" class="center common-container-width">
    <!-- 侧栏导航 -->
    <div class="aside">
      <img class="photo" :src="user.src" alt="头像">
      <p class="name">{{user.name}}</p>
      <p class="level">{{user.level}}</p>
      <p class="time">{{getTime}}</p>
      <ul class="navlist">
        <li v-for="(item,index) in userNav"
        :class="{active:item.href === navindex}"
        @click="changeNav(item,index)"
        :key="index">
        <span :class="item.icon"></span>
          <span>
            {{item.text}}
          </span>
        </li >
      </ul>
    </div>
    <!-- 主体展示区域 -->
    <div v-if="isShowPage" class="contain">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/assets/utils/timefn';
import { getTokenFn } from '@/assets/utils/util';
import { queryPersonalMap } from '@/api/apis';
import mixin from './js/mixin';

const defaultUrl = require('@/views/imgs/default.png');

export default {
    name: 'web-center',
    mixins: [mixin],
    beforeRouteEnter(to, from, next) {
        if (getTokenFn()) {
            next();
        } else {
            next(from);
        }
    },
    data() {
        return {
            name: 'center',
            isShowPage: false,
            user: {
                name: '',
                level: '', // 会员等级
                src: defaultUrl,
                dueTime: '', // 到期时间
            },
            navindex: '',
            userNav: [
                {
                    text: '个人中心',
                    value: '0',
                    icon: 'icon-preson',
                    href: '/center/preson',
                },
                {
                    text: '我的课程',
                    value: '1',
                    icon: 'icon-myclass',
                    href: '/center/myclass',
                },
                {
                    text: '我的收藏',
                    value: '2',
                    icon: 'icon-mycol',
                    href: '/center/mycol',
                },
                {
                    text: '我的报名',
                    value: '3',
                    icon: 'icon-signin',
                    href: '/center/signin',
                },
                {
                    text: '我的订单',
                    value: '4',
                    icon: 'icon-myorder',
                    href: '/center/myorder',
                },
                {
                    text: '个人设置',
                    value: '5',
                    icon: 'icon-myset',
                    href: '/center/myset',
                },
            ],
        };
    },
    mounted() {
        this.init();
    },
    computed: {
        getTime() {
            let time = this.user.dueTime || 0;
            return `${formatDate(time)}到期`;
        },
    },
    methods: {
        init() {
            // 获取个人中心页面
            this.queryPersonalMapFn();

            // 当前路由
            this.navindex = this.$route.path;
        },
        changeNav(item) {
            this.navindex = item.href;
            this.$router.replace({ path: item.href });
        },
        queryPersonalMapFn() {
            // 个人中心页面
            queryPersonalMap().then((res) => {
                if (res.data.code === '0000') {
                    this.isShowPage = true;
                    this.user.dueTime = res.data.leaguerList.dueTime;
                    this.setCenterData(res.data);
                    this.user.name = this.commonUserData.userName;
                    this.user.level = this.commonUserData.leaguerLevelName;
                }
            }).catch((err) => {
                this.$message({
                    message: '获取个人数据失败，请稍后再试',
                    type: 'warning',
                });
                console.log(err);
            });
        },

    },
};
</script>
<style scoped>
.contain{
  /*background: #ccc;*/
  width: 100%;
  min-height: 620px;
  padding-left: 40px;
}
.center{
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
  .aside{
    width: 177px;
    background: #F7F7F7;
    border: 1px solid #D4D4D4;
    padding: 20px 0;
    box-sizing:border-box;
    font-size: 16px;
    color: #444444;
    letter-spacing: 0;
    }
  .photo{
    display: block;
    width: 70%;
    height: auto;
    margin:0 auto 10px auto;
  }
  .name{
    text-align: center;
    font-size: 14px;
  }
  .level{
    font-size: 12px;
    color: #Fff;
    text-align: center;
    background: #FB683C;
    border-radius: 100px;
    display: block;
    width: 64px;
    height: 21px;
    line-height: 21px;
    margin: 10px auto 6px auto;
  }
  .time{
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
  }
  .navlist li{
    display: flex;
    height: 42px;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-right: 20px;
    font-size: 0;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .navlist li.active{
    background: #FB683C;
    color: #Fff;
  }
  .navlist li span{
    display: inline-block;
    font-size: 16px;
  }
  .icon-preson,
  .icon-myclass,
  .icon-mycol,
  .icon-signin,
  .icon-myorder,
  .icon-myset{
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url('./imgs/icon-preson.png') no-repeat left 2px;
    background-size: 19px auto;
  }
  .navlist li.active .icon-preson{
    background-image: url('./imgs/icon-preson-on.png');
  }
  .icon-myset{
    background-image: url('./imgs/icon-myset.png');
  }
  .navlist li.active .icon-myset{
    background-image: url('./imgs/icon-myset-on.png');
  }

  .icon-myorder{
    background-image: url('./imgs/icon-myorder.png');
  }
  .navlist li.active .icon-myorder{
    background-image: url('./imgs/icon-myorder-on.png');
  }

  .icon-signin{
    background-image: url('./imgs/icon-signin.png');
  }
  .navlist li.active .icon-signin{
    background-image: url('./imgs/icon-signin-on.png');
  }

  .icon-mycol{
    background-image: url('./imgs/icon-mycol.png');
  }
  .navlist li.active .icon-mycol{
    background-image: url('./imgs/icon-mycol-on.png');
  }

  .icon-myclass{
    background-image: url('./imgs/icon-myclass.png');
  }
  .navlist li.active .icon-myclass{
    background-image: url('./imgs/icon-myclass-on.png');
  }
</style>
