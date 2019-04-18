<template>
    <div @click="showSearchBox=false"
    class="layout common-web-layout">
     <el-container>
     <!-- 页面头部 -->
     <el-header height="60px">
          <div class="header">
            <div class="common-container-width">
              <div class="logo-box">
                <router-link to="/index" tag="a">
                  <span class="logo">LOGO</span>
                </router-link>
                <h1>法规资讯</h1>
              </div>
              <!-- 导航 -->
              <div class="nav">

                <div v-for="(item,index) in navlist"
                class="item"
                v-show="item.name != '在线学习'"
                @click="changeNav(item,index)"
                :class="{active:index==navIndex}"
                :key="index">
                {{item.name}}</div>

                <!-- 在线学习类目 -->
                <el-popover
                  popper-class="common-layout-nav"
                  placement="bottom"
                  trigger="hover"
                  width="970"
                  offset="offset"
                  v-model="showOnlineBox">
                  <div slot="reference" class="slot-online">
                    <div v-for="(item,index) in navlist"
                    class="item"
                    v-show="item.name == '在线学习'"
                    :class="{active:index==navIndex}"
                    :key="index">
                    {{item.name}}</div>
                  </div>

                  <!-- 类目展开框 -->
                  <div class="online-box">
                    <div class="online-nav-left">
                      <div class="item"
                      :class="{active:index == onlineNavIndex}"
                      @click="onlineNavIndex = index"
                      v-for="(item,index) in onlineNavList"
                      :key="index">
                        {{item.text}}
                      </div >
                    </div>

                    <div class="online-nav-right">
                      <ul class="online-nav-right-list">
                        <li
                        v-for="(item,index) in onlineNavList[onlineNavIndex].children"
                        :key="index">
                          <span class="title">
                            {{item.title}}
                          </span>
                          <span v-for="(list,listindex) in item.list"
                          :key="listindex">
                            {{list.text}}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </el-popover>


              </div>


              <!-- 搜索框 -->
              <el-popover
                  placement="bottom"
                  trigger="manual"
                  width="386"
                  v-model="showSearchBox">

                <div slot="reference" class="search-box-slot">
                  <div class="search-box"
                  @click.stop
                  :class="{active:showSearchInput}">
                    <input ref="searchInput" type="text"
                    @keyup.enter="goSearchPage"
                    @focus="showSearchBox=true"
                    v-model.trim="search.value">
                    <span

                    @click="focusSearchInput"
                     class="icon-search"></span>
                  </div>
                </div>

                <!-- 联动结果框 -->
                <div class="search-result-box">
                  <div v-if="searchResult.list.length<1" class="empty">
                    暂无数据，换个关键词试试吧
                  </div>
                  <div v-else class="result-list-box">
                    <div class="tab">
                      <span @click="searchTabIndex=0"
                      :class="{active:searchTabIndex=='0'}">
                      课程({{searchResult.classNums}})</span>
                      <span  @click="searchTabIndex=1"
                      :class="{active:searchTabIndex=='1'}">
                      专题({{searchResult.specialNums}})</span>
                    </div>
                    <ul class="result-list">
                      <li class="pointer"
                      @click="routerGo(item.href)"
                      v-for="(item,index) in searchResult.list"
                      :key="index">
                        <img :src="item.imgurl" :alt="item.title">
                        <div class="title-box">
                          <p class="title ellipsis2">{{item.title}}</p>
                          <p class="time-box">
                            <span>{{item.time}}</span>
                            <span>{{item.peopleNum}}在学</span>
                          </p>
                        </div>
                      </li >
                    </ul>

                    <p @click="goSearchPage" class="more">查看更多</p>
                  </div>
                </div>

              </el-popover>
              <!-- 用户信息 未登录 -->
              <div class="user-box"
              v-if="!token">
                <span class="register" @click="register">注册</span>
                <span class="nologin" @click="login">登录</span>
              </div>
              <!-- 用户信息 登录成功 -->
              <div v-if="token" class="user-box">
                <el-popover
                  placement="bottom"
                  width="190"
                  v-model="showUserBox">
                  <div class="name-btn" slot="reference">
                    <span class="name">Hi,{{user.name}}</span>
                    <span class="icon-triangle"></span>
                  </div>
                  <!-- 用户详情 start -->
                  <div class="user-container">
                    <span class="name">Hi,{{user.name}}</span>
                    <span class="level">{{user.level}}</span>
                    <ul class="user-nav">
                      <li
                      v-for="(item,index) in userNav"
                      :key="index">
                        {{item.text}}
                      </li >
                    </ul>
                    <span @click="loginoutFn" class="loginout">退出</span>
                  </div>
                 <!-- 用户详情 end -->
                </el-popover>
                <!-- 用户等级 -->
                <span class="level">{{user.level}}</span>
              </div>


            </div>
          </div>

     </el-header>

     <!-- 公共侧栏 -->
     <div class="aside">
        <!-- 能力测评 -->
        <div v-show="isShowEvaluation" class="aside-evaluation">
          <div v-if="!isEvad" class="isevad">
            <p class="title">测一测你的能力模型</p>
            <p class="step">step1：能力评测</p>
            <span class="icon-triangle"></span>
            <p class="step">step2：评估报告</p>
            <span class="btn-ev">测评</span>
          </div>
          <div v-else class="isevad">
            <span @click="isShowEvaluation=false" class="icon-close"></span>
            <p class="title">您的成绩</p>
            <div class="loading">
                <div class="left">
                  <span :style="isEvadStyleLeft" class="after"></span>
                </div>
                <div class="right">
                  <span :style="isEvadStyleRight" class="after"></span>
                </div>
                <div class="progress">
                  <span class="store">{{evadStore.num}}</span> / {{evadStore.total}}
                  <p>我的成绩</p>
                </div>
            </div>

            <span class="btn-ev">查看报告</span>
          </div>
        </div>

        <!-- 返回顶部 QQ -->
       <div class="aside-qq-backtop">
        <span @click="isShowEvaluation = !isShowEvaluation" class="icon-ev"></span>
        <a :href="aside.qq">
         <span class="icon-qq"></span>
        </a>
         <span v-if="aside.scrollTop>=aside.scrollY"
          @click="backTop"
          class="icon-backtop"></span>
       </div>
     </div>


      <!-- 页面主体 -->
      <el-main><slot>main</slot></el-main>


      <!-- 页面底部 -->
      <el-footer height="176px">

        <div class="footer">
          <div class="common-container-width">
            <div class="item">
              <router-link to="/index" tag="a">
                <span class="logo">LOGO</span>
              </router-link>
              <span class="product">
                {{footer.productName}}
                <br>
                <i>{{footer.productIntro}}</i>
              </span>
            </div>
            <div class="item">
              客服电话：{{footer.customTel}}  <br>
              客服工作时间：{{footer.customTime}}
            </div>
            <div class="item">
              &copy;Copyright  -  大象慧云信息技术有限公司 <br>
              All Rights Reserved
            </div>
            <div class="item">
              <img class="qrcode" :src="footer.qrcodeUrl" alt="二维码">
            </div>
          </div>
        </div>

      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { getScrollTop, setScrollTop, getUrlParam } from '@/assets/utils/util';


const qrcode = require('./imgs/qrcode.png');

export default {
    data() {
        return {
            name: 'layout',
            navlist: [
                { name: '首页', href: '/index' },
                { name: '财税公开课', href: '/open-class' },
                { name: '在线学习', href: '/online-class' },
            ],
            navIndex: 0, // 默认顶部导航选中index
            offset: 100,
            isShowEvaluation: false, // 是否显示测评
            isEvad: true, // 是否已经评测过
            evadStore: { // 评测得分
                total: 100, // 总分
                num: 49, // 当前得分
            },
            isEvadStyleLeft: {
                transform: 'rotateZ(0deg)',
            },
            isEvadStyleRight: {
                transform: 'rotateZ(0deg)',
            },


            showOnlineBox: false, // 在线学习类目显示
            onlineNavIndex: 0, // 当前选中的在线课程分类
            onlineNavList: [
                {
                    text: '管理会计',
                    id: '1',
                    children: [
                        {
                            title: '预算管理',
                            list: [
                                { id: '10', text: '预算管理0' },
                                { id: '11', text: '预算管理1' },
                                { id: '13', text: '预算管理3' },
                                { id: '14', text: '预算管理4' },
                            ],
                        },
                        {
                            title: '分析与决策',
                            list: [
                                { id: '10', text: '报表解读' },
                                { id: '11', text: '经营分析' },
                                { id: '13', text: '预算管理3' },
                                { id: '14', text: '预算管理4' },
                            ],
                        },
                    ],
                },
                {
                    text: '财务会计',
                    id: '2',
                    children: [
                        {
                            title: '预算管理',
                            list: [
                                { id: '10', text: '预算管理0' },
                                { id: '11', text: '预算管理1' },
                                { id: '12', text: '预算管理2' },
                                { id: '13', text: '预算管理3' },
                            ],
                        },
                        {
                            title: '分析与决策',
                            list: [
                                { id: '10', text: '报表解读' },
                                { id: '11', text: '经营分析' },
                                { id: '12', text: '预算管理2' },
                                { id: '14', text: '预算管理4' },
                            ],
                        },
                    ],
                },
                {
                    text: '财资管理',
                    id: '3',
                    children: [
                        {
                            title: '预算管理',
                            list: [
                                { id: '10', text: '预算管理0' },
                                { id: '11', text: '预算管理1' },
                                { id: '12', text: '预算管理2' },
                                { id: '13', text: '预算管理3' },
                            ],
                        },
                        {
                            title: '分析与决策',
                            list: [
                                { id: '10', text: '报表解读' },
                                { id: '11', text: '经营分析' },
                                { id: '12', text: '预算管理2' },
                                { id: '13', text: '预算管理3' },
                            ],
                        },
                    ],
                },
            ],

            showUserBox: false, // 用户信息弹框
            user: {
                name: '李白',
                level: '会员等级',
            },

            userNav: [
                {
                    text: '个人设置',
                    href: '/my/setting',
                },
                {
                    text: '我的收藏',
                    href: '/my/my-collect',
                },
                {
                    text: '我的订单',
                    href: '/my/my-order',
                },
                {
                    text: '我的课程',
                    href: '/my/my-classes',
                },
                {
                    text: '我的学习卡',
                    href: '/my/my-card',
                },
                {
                    text: '我的预约',
                    href: '/my/my-sub',
                },
            ],

            search: {
                value: '',
            },
            searchTabIndex: 0,
            showSearchInput: false,
            showSearchBox: false, // 搜索联动框
            searchResult: {
                classNums: 20, // 课程结果数
                specialNums: 20, // 专题结果数
                list: [ // 搜索结果列表
                    {
                        href: 'http://www.baidu.com', // 课程链接
                        imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                        title: '标题，最多显示两行放不下自动换行，两行放不下用…代替即可', // 标题
                        time: '60分钟',
                        peopleNum: 209,
                    },
                    {
                        href: 'http://www.baidu.com', // 课程链接
                        imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                        title: '标题，最多显示两行放不下自动换行，两行放不下用…代替即可', // 标题
                        time: '60分钟',
                        peopleNum: 209,
                    },
                    {
                        href: 'http://www.baidu.com', // 课程链接
                        imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                        title: '标题，最多显示两行放不下自动换行，两行放不下用…代替即可', // 标题
                        time: '60分钟',
                        peopleNum: 209,
                    },
                ],
            },

            aside: {
                qq: `http://wpa.qq.com/msgrd?v=3&uin=${12345678}&site=在线客服&menu=yes`, // 侧栏QQ
                scrollTop: 0, // 滚动条高度
                scrollY: 200, // 展示返回顶部按钮的阈值
            },

            footer: {
                productName: '产品名称',
                productIntro: '法规与咨询聚合平台',
                customTel: '4008198618',
                customTime: '7*24h',
                qrcodeUrl: qrcode,
            },

            timer: null,

        };
    },
    mounted() {
        this.init();
    },
    methods: {

        init() {
            // 初始化用户信息
            this.initUserInfo();
            // 初始化导航位置
            this.initNavListIndex();
            // 设置评测环状
            this.initProcess();
            // 初始化滚动条
            this.initScroll();
        },
        initUserInfo() {
            // 获取用户信息
            const code = getUrlParam('code');
            if (code) {
            // 如果code 存在 token不存在
                if (!this.token) {
                    this.getTokenByCode();
                }
            }
        },
        initScroll() {
            // 监听滚动条事件 判断当前滚动条位置
            const oThis = this;
            this.aside.scrollTop = getScrollTop();
            window.addEventListener('scroll', () => {
                const scorllTop = getScrollTop();
                clearTimeout(this.timer);
                oThis.timer = setTimeout(() => {
                    oThis.aside.scrollTop = scorllTop;
                }, 300);
            }, false);
        },

        initNavListIndex() {
            // 初始化 当前选中状态
            if (this.$route.meta && this.$route.meta.navIndex) {
                this.navIndex = this.$route.meta.navIndex;
            } else {
                this.navlist.forEach((item, index) => {
                    if (item.href === this.$route.path) {
                        this.navIndex = index;
                    }
                });
            }
        },

        initProcess() {
            const store = (this.evadStore.num / this.evadStore.total).toFixed(2) * 100;
            let deg;
            if (store > 50) {
                deg = parseInt(180 * (1 - (store - 50) / 50), 0);
                this.isEvadStyleLeft.transform = 'rotateZ(0deg)';
                this.isEvadStyleRight.transform = `rotateZ(${deg}deg)`;
            } else {
                deg = parseInt((50 - store) / 50 * 180, 0);
                this.isEvadStyleRight.transform = 'rotateZ(180deg)';
                this.isEvadStyleLeft.transform = `rotateZ(${deg}deg)`;
            }
        },

        routerGo(href) {
            if (href) {
                window.location.href = href;
            }
        },

        backTop() {
            /**
                * 返回顶部过度动画
                * @desc 过渡时间 scrollTime=300 ms
                * @author liuyuhui
                * @date 2019年4月13日13:20:32
                * @param scrollTime 过渡时间
                * @example this.backTop
          */
            this.aside.scrollTop = 0;
            const scrollTime = 300;
            const stepTime = 10; // 每次触发间隔
            const scrollTop = getScrollTop();
            // step 计算每次滚动距离
            const step = Math.ceil((scrollTop - this.aside.scrollTop) / (scrollTime / stepTime));
            let timer = null;

            clearInterval(timer);
            timer = setInterval(() => {
                const curScroll = getScrollTop();
                let top = 0;
                if (curScroll - step > 0) {
                    top = curScroll - step;
                } else {
                    clearInterval(timer);
                }
                setScrollTop(top);
            }, stepTime);
        },
        register() {
            window.location.href = 'http://www.baidu.com';
        },

        changeNav(item, index) {
            this.navIndex = index;
            if (item.href) {
                this.$router.push(item.href);
            }
        },

        focusSearchInput() {
            // 展示搜索框并聚焦
            if (this.showSearchInput) {
                // 如果已经聚焦 再次点击去搜索
                this.goSearchPage();
            } else {
                this.showSearchInput = true;
                this.$nextTick(() => {
                    this.$refs.searchInput.focus();
                });
            }
        },

        searchInputBlur() {
            // 失去焦点隐藏搜索框
            console.log('blur');
        },

        goSearchPage() {
            // 去搜索结果页面  或者关闭搜索框
            if (this.search.value === '') {
                this.showSearchInput = false;
                this.showSearchBox = false;
            } else {
                this.$nextTick(() => {
                    this.$refs.searchInput.blur();
                });
                this.$router.push({ path: '/search', query: { val: this.search.value } });
            }
        },

        loginoutFn() {
            // 退出登录
            this.showUserBox = false;
            this.loginout();
        },


    },
};
</script>
<style scoped>
  .register,
  .nologin{
    font-size: 16px;
    cursor: pointer;
    margin-left: 30px;
  }
  .register{
    margin-left: 0;
  }
  .logo-box{
    float: left;
    margin-top: 7px;
    height: 46px;
    line-height: 46px;
    font-size: 0;
  }
  .logo-box h1{
    display: inline;
    font-size: 19px;
    color: #444444;
  }
  .logo{
    display: inline-block;
    height: 46px;
    line-height: 46px;
    width: 46px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    background-image: linear-gradient(-180deg, #FFAC94 0%, #FB683C 100%);
    border-radius: 3.54px;
    margin-right: 10px;
    cursor: pointer;
  }
  .nav{
    float: left;
    font-size: 0;
    margin-left: 46px;
  }
  .nav .item{
    display: inline-block;
    height: 60px;
    position: relative;
    font-size: 16px;
    color: #444;
    letter-spacing: -0.39px;
    text-align: center;
    padding: 17px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .nav .slot-online{
    display: inline-block;
  }
  .nav .item.active:after{
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    background: #FB683C;
    border-radius: 100px;
    bottom: 0;
    left: 0;
    color: #FB683C;
  }
  .online-box{
    /*height: 360px;*/
    display: flex;
    align-items: top;
    justify-content: space-between;
    padding: 20px 10px;
    text-align: left;
  }
  .online-box .online-nav-right,
  .online-box .online-nav-left{
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    display: block;
    position: relative;
  }
  .online-box .online-nav-left{
    width: 98px;
  }
  .online-box .online-nav-left:after{
    content: "";
    position: absolute;
    width: 0;
    height: 100%;
    right: 0;
    top: 0;
    border-right: 1px solid #D4D4D4;
  }
  .online-box .online-nav-left .item{
    line-height: 22px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .online-box .online-nav-left .item.active{
    color: #FB683C;
  }
  .online-nav-right-list li:nth-last-child(1),
  .online-box .online-nav-left .item:nth-last-child(1){
    margin-bottom: 0;
  }

  .online-nav-right-list li{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 820px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #868686;
    line-height: 22px;
    padding-top: 10px;
  }
  .online-nav-right-list li span{
    display: block;
    width: 20%;
    text-align: left;
    cursor: pointer;
  }
  .online-nav-right-list li .title{
    color: #444;
    font-weight: bold;
  }


  /*搜索框*/
  .search-box-slot{
    height: 60px;
    margin-left: 34px;
    float: left;
  }
  .search-box{
    float: left;
    width: 302px;
    height: 36px;
    border: 1px solid #fff;
    border-radius: 100px;
    padding-left: 20px;
    padding-right: 30px;
    box-sizing:border-box;
    margin-top: 12px;
    position: relative;
  }
  .search-box input{
    border: none;
    display: none;
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    color: #444;
    letter-spacing: -0.39px;
    text-align: left;
    background: none;
    outline: none;
  }
  /*搜索框激活样式*/
  .search-box.active{
    border: 1px solid #FB683C;
  }
  .search-box.active input{
    display: block;
  }
  .icon-search{
    position: absolute;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 8px;
    background: url("./imgs/icon-search.png") no-repeat center center;
    z-index: 10;
    cursor: pointer;
  }
  .search-result-box{
    max-height: 412px;
    overflow-y: auto;
  }
  .search-result-box .tab{
    font-size: 16px;
    letter-spacing: -0.39px;
  }
  .search-result-box .tab span{
    margin-right: 20px;
    cursor: pointer;
  }
  .search-result-box .tab span.active{
    color: #FB683C;
  }
  .search-result-box .more{
    text-align: center;
    font-size: 14px;
    color: #444444;
    letter-spacing: -0.34px;
    text-align: center;
    cursor: pointer;
  }

  .result-list li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0 10px 0;
  }
  .result-list li img{
    display: block;
    width: 131px;
    height: 78px;
    margin-right: 10px;
  }
  .result-list li .title{
    height: 40px;
    line-height: 20px;
  }
  .time-box{
    display: flex;
    justify-content: space-between;
    padding-top: 18px;
    font-size: 14px;
    color: #868686;
    letter-spacing: 0;
  }

  .empty{
    height: 20px;
    line-height: 20px;
    padding: 60px;
    font-size: 16px;
    color: #868686;
    letter-spacing: -0.39px;
    text-align: center;
  }


  /*用户信息*/
  .user-box{
    font-size: 0;
    color: #444444;
    letter-spacing: -0.39px;
    margin-left: 20px;
    margin-top: 20px;
    float: right;
    max-width: 184px;
  }
  .user-nav{
    font-size: 14px;
    padding: 20px 10px 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .user-nav li{
    float: left;
    display: block;
    width: 50%;
    padding-bottom: 20px;
  }
  .user-nav li:nth-child(2n){
    text-align: right;
  }
  .name-btn{
    float: left;
    height: 45px;
  }
  .user-box .name{
    font-size: 16px;
    margin-right: 6px;
  }
  .icon-triangle{
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #868686;
    position: relative;
    top: -3px;
  }
  .level{
    display: inline-block;
    width: 64px;
    height: 21px;
    margin-left: 10px;
    line-height: 21px;
    text-align: center;
    background: #FB683C;
    border-radius: 100px;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: -0.29px;
    position: relative;
  }
  .loginout{
    font-size: 14px;
    color: #868686;
    display: block;
    text-align: center;
    width: 60px;
    height: 20px;
    margin: 0 auto;
    letter-spacing: -0.34px;
    cursor: pointer;
  }

  /*侧边栏*/
  /*侧边栏测评模块*/
  .aside-evaluation{
    width: 184px;
    height: 279px;
    background: #363636;
    box-shadow: 3px 5px 14px 0 rgba(0,0,0,0.70);
    border-radius: 8px;
    position: fixed;
    bottom: 78px;
    right: 100px;
    z-index: 999;
    text-align: center;
  }
  .aside-evaluation .title{
    font-size: 16px;
    color: #FB683C;
    letter-spacing: 0;
    text-align: center;
    margin: 20px 0 30px 0;
  }
  .aside-evaluation .step{
    display: block;
    width: 144px;
    height: 36px;
    line-height: 36px;
    background: #555555;
    border: 1px solid #383838;
    border-radius: 26px;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    margin: 0 auto 20px auto;
  }
  .aside-evaluation .icon-triangle{
    background: none;
    border-top: 6px solid #FB683C;
    margin-bottom: 20px;
    top: 2px;
  }
  .aside-evaluation .btn-ev{
    display: block;
    width: 108px;
    height: 29px;
    line-height: 29px;
    background: #FB683C;
    border-radius: 100px;
    text-align: center;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: -0.29px;
    margin: 30px auto;
    cursor: pointer;
  }
  .aside-qq-backtop{
    display: block;
    width: 88px;
    position: fixed;
    right: 0px;
    bottom:60px;
    z-index: 9999;
  }
  .icon-close,
  .icon-ev,
  .icon-backtop,
  .icon-qq{
    width: 88px;
    height: 88px;
    display: block;
    background: url('./imgs/icon-qq.png') no-repeat left top;
    cursor: pointer;
  }
  .icon-backtop{
    background-image: url('./imgs/icon-backtop.png');
  }
  .icon-ev{
    background-image: url('./imgs/icon-ev.png');
  }
  .icon-close{
    width: 12px;
    height: 12px;
    background-image: url('./imgs/icon-close.png');
    position: absolute;
    right: 10px;
    top: 10px;
  }

  /*评测分环状*/
  .isevad .loading {
      margin: 20px auto;
      width: 116px;
      height: 116px;
      position: relative;
  }

  .isevad .loading .progress {
      position: absolute;
      width: 86px;
      height: 86px;
      background-color: #363636;
      font-size: 16px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 22px;
      border-radius: 50%;
      left: 15px;
      top: 15px;
      /*line-height: 86px;*/
      text-align: center;
      box-sizing:border-box;
      padding-top: 15px;
  }
  .isevad .loading .progress .store{
    font-size: 20px;
    color: #FE6732;
    letter-spacing: 0;
    line-height: 28px;
  }
  .isevad .loading .progress p{
    font-size: 12px;
  }

  .isevad .left,
  .isevad .right {
      width: 58px;
      height: 116px;
      overflow: hidden;
      position: relative;
      float: left;
      background-color: #fff;
  }

  .isevad .left {
      border-radius: 116px 0 0 116px;
  }

  .isevad .right {
      border-radius: 0 116px 116px 0;
  }

  .isevad .left .after,
  .isevad .right .after {
      position: absolute;
      display: block;
      width: 58px;
      height: 116px;
      border-radius: 116px 0 0 116px;
      background-color: #FB683C;
  }

  .isevad .right .after {
      content: "";
      position: absolute;
      display: block;
      border-radius: 0 116px 116px 0;
  }
  .isevad .left .after {
      transform-origin: right center;
      transform: rotateZ(0deg);
  }

  .isevad .right .after {
      transform-origin: left center;
      transform: rotateZ(45deg);
  }


  /*页面底部*/
  .footer{
    height: 176px;
  }
  .footer .common-container-width{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  img.qrcode{
    width: 116px;
    height: 116px;
  }
  .product{
    line-height: 20px;
    font-weight: bold;
    font-size: 16px;
    float: right;
    padding-top: 5px;
  }
  .product i{
    font-style: normal;
    font-size: 14px;
    font-weight: normal;
  }
</style>
