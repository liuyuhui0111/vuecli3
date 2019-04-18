<template>
  <div class="open-class common-container-width">
    <!-- 站内搜索框 -->
    <div class="search-inweb">
        <input v-model="searchVal" type="text">
        <span class="btn-sub">站内搜索</span>
    </div>

    <!-- 专题 课程tab -->
    <div class="tab-box">
        <span v-for="(item,index) in tablist"
        @click="changeTab(index)"
        :class="{active:index == tabindex}"
        :key="index">
            {{item.text}} ( {{item.value}} )
        </span>
    </div>

    <!-- 搜索结果 -->
    <div class="contain-box">
      <!-- 结果展示 -->
      <div class="contain">
          <div v-if="list.length<1" class="empty">
            天了噜，0个“{{searchVal}}”相关的结果。
          </div>
          <div v-if="list.length>0" class="search-list-box">
              <ul class="list-box">
                <li v-for="(item,index) in list"
                 v-show="item != null && index<pageSize"
                :key="index">
                  <Card :type="cardType"
                  :titleStyle="titleStyle"
                  :classData="item"></Card>
                </li>
              </ul>
          </div>
          <!-- 新课程推荐 -->
          <div class="new-list-box">
            <p class="title">最新课程推荐</p>
              <ul class="list-box">
                <li v-for="(item,index) in newlist"
                 v-show="item != null && index<pageSize"
                :key="index">
                  <Card :type="cardType"
                  :titleStyle="titleStyle"
                  :classData="item"></Card>
                </li>
              </ul>
          </div>

        <el-pagination
          v-if="list.length>0"
          layout="prev, pager, next"
          :pager-count="pagerCount"
          prev-text="上一页"
          next-text="下一页"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    <!-- 右侧热门搜索 -->
      <div class="aside">
      <!-- 热门词 -->
        <div class="hot-word">
          <p class="title">热门搜索词</p>
          <span v-for="(item,index) in hotWordList"
          :key="index">{{item.text}}</span>
        </div>
        <!-- 热门搜索 -->
        <div class="hot-search">
          <p class="title">热门搜索</p>
          <ul class="hot-search-list">
            <li v-for="(item,index) in hotSearchList"
            :key="index">
              <span class="rank">{{item.rank}}</span>
              <p>{{item.text}}</p>
            </li>
          </ul>
        </div>
      </div>

    </div>


  </div>
</template>
<script>
import Card from '@/views/web/components/card/card.vue';

export default {
    name: 'open-class',
    data() {
        return {
            name: 'open-class',
            cardType: 'search',
            searchVal: '',
            titleStyle: {
                color: '#444',
                fontSize: '16px',
            },
            tabindex: 0, // 当前选中tab index
            tablist: [ // tab列表
                { text: '课程', value: 0 },
                { text: '专题', value: 0 },
            ],
            hotWordList: [ // 热门搜索词
                { text: '企业增值税' },
                { text: '个人所得税' },
                { text: '个人所得税' },
                { text: '个人所得税' },
                { text: '个人所得税' },
                { text: '个人所得税' },
                { text: '个人所得税' },
            ],
            hotSearchList: [ // 热门搜索
                {
                    text: '热门文章标题',
                    rank: 1,
                },
                {
                    text: '热门文章标题热门文章标题热门文章标题热门文章标题热门文章标题',
                    rank: 3,
                },
                {
                    text: '热门文章标题',
                    rank: 4,
                },
                {
                    text: '热门文章标题',
                    rank: 7,
                },
                {
                    text: '热门文章标题',
                    rank: 2,
                },
                {
                    text: '热门文章标题',
                    rank: 5,
                },
                {
                    text: '热门文章标题',
                    rank: 6,
                },
            ],


            pageSize: 8, // 一页最多展示的条数
            total: 50,
            pagerCount: 11,
            list: [], // 搜索结果列表
            newlist: [ // 最新课程推荐
                {
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    teacherSrc: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 老师头像
                    time: '4', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    intro: '财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值',
                    freeTxt: '会员免费',
                    money: 1000,
                    peopleNum: 209,
                    classNum: 1,
                    type: '预算管理',
                },
                {
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    teacherSrc: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 老师头像
                    time: '4', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    intro: '财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值',
                    freeTxt: '会员免费',
                    money: 1000,
                    peopleNum: 209,
                    classNum: 1,
                    type: '预算管理',
                },
                {
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    teacherSrc: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 老师头像
                    time: '4', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    intro: '财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值',
                    freeTxt: '会员免费',
                    money: 1000,
                    peopleNum: 209,
                    classNum: 1,
                    type: '预算管理',
                },
                {
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    teacherSrc: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 老师头像
                    time: '4', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    intro: '财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值',
                    freeTxt: '会员免费',
                    money: 1000,
                    peopleNum: 209,
                    classNum: 1,
                    type: '预算管理',
                },
            ],
            newlist1: [ // 专题
                {
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    teacherSrc: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 老师头像
                    time: '4', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    intro: '财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值',
                    freeTxt: '会员免费',
                    money: 1000,
                    peopleNum: 209,
                    classNum: 1,
                    type: '预算管理',
                },
                {
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    teacherSrc: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 老师头像
                    time: '4', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    intro: '财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值',
                    freeTxt: '会员免费',
                    money: 1000,
                    peopleNum: 209,
                    classNum: 1,
                    type: '预算管理',
                },
                {
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    teacherSrc: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 老师头像
                    time: '4', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    intro: '财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值',
                    freeTxt: '会员免费',
                    money: 1000,
                    peopleNum: 209,
                    classNum: 1,
                    type: '预算管理',
                },
                {
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    teacherSrc: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 老师头像
                    time: '4', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    intro: '财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值财务如何为企业创造价值',
                    freeTxt: '会员免费',
                    money: 1000,
                    peopleNum: 209,
                    classNum: 1,
                    type: '预算管理',
                },
            ],
        };
    },
    mounted() {
        this.init();
    },
    watch: {
        $route() {
            this.searchVal = this.$route.query.val;
        },
    },
    methods: {
        init() {
            this.searchVal = this.$route.query.val;
            // 初始化热门搜索排名
            this.initHotSearchList();
        },
        changeTab(index) {
            this.tabindex = index;
            if (index === 0) {
                this.cardType = 'search';
                this.list = this.newlist;
            } else {
                this.cardType = 'search1';
                this.list = this.newlist1;
            }
        },
        initHotSearchList() {
            const list = this.hotSearchList;
            this.hotSearchList = list.sort((a, b) => (a.rank < b.rank ? -1 : 1));
            console.log(this.hotSearchList);
        },

    },
    components: {
        Card,
    },
};
</script>
<style scoped>
  .empty{
    color: #868686;
    padding-bottom: 60px;
    font-size: 16px;
  }
  .empty span{
    color: #FB683C;
  }
  .list-box{
  }
  .list-box li{
    display: block;
    margin-bottom: 30px;
  }
  /*站内搜索*/
  .search-inweb{
    width: 680px;
    height: 42px;
    line-height: 42px;
    position: relative;
    box-sizing:border-box;
    margin: 40px auto;
    padding-right: 100px;
  }
  .search-inweb input{
    display: block;
    width: 100%;
    height: 100%;
    line-height: 42px;
    border: 1px solid #D4D4D4;
    padding-left: 20px;
    box-sizing:border-box;
    border-right: none;
    outline: none;
    font-size: 16px;
    color: #444;
  }

  .search-inweb .btn-sub{
    position: absolute;
    right: 0;
    width: 100px;
    height: 100%;
    background: #FB683C;
    font-size: 16px;
    color: #FFFFFF;
    right: 0;
    top: 0;
    text-align: center;
    cursor: pointer;
  }


  /*专题课程tab*/
  .tab-box{
    display: block;
    height: 54px;
    line-height: 54px;
    background: #F7F7F7;
    font-size: 0;
    margin-bottom: 20px;
    text-align: left;
  }
  .tab-box span{
    display: inline-block;
    font-size: 16px;
    color: #444444;
    letter-spacing: 0;
    margin-left: 40px;
    cursor: pointer;
  }
  .tab-box span.active{
    color: #FB683C;
  }
  .contain-box{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  /*右侧热门搜索*/
  .aside{
    width: 255px;
    margin-left: 30px;
    font-size: 14px;
    color: #444444;
    letter-spacing: 0;
    flex-shrink: 0;
  }
  .title,
  .aside .title{
    font-size: 16px;
    margin-bottom: 20px;
    font-weight: bold;
  }
 .contain{
    max-width: 710px;
    width: 100%;
    flex-shrink:1;
  }
  .hot-word{
    font-size: 0;
    text-align: left;
  }
  .hot-word span{
    display: inline-block;
    font-size: 14px;
    color: #FB683C;
    margin-right: 60px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .hot-word span:nth-child(2n+1){
    margin-right: 0;
  }
  .hot-search-list li {
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 20px;
    line-height: 20px;
    cursor: pointer;
  }
  .hot-search-list li .rank{
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: #Fff;
    background: #8EB9F5;
    left: 0;
    top: 0;
  }
  .hot-search-list li:nth-child(1) .rank{
    background: #F54545;
  }
  .hot-search-list li:nth-child(2) .rank{
    background: #FF8547;
  }
  .hot-search-list li:nth-child(3) .rank{
    background: #FFAC38;
  }
</style>
