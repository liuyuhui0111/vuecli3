<template>
  <div class="open-class common-container-width">
    <div v-if="list.length<1" class="empty">
      暂时还没有公开课哦~去看看<span
      class="pointer"
      @click="routerGo('/online-class')">线上课程</span>吧
    </div>
    <ul class="list-box" v-if="list.length>0">
        <li v-for="(item,index) in list"
         v-show="item != null && index<pageSize"
        :key="index">
          <Card
          @classClick="classClick"
          :type="cardType"
          :titleStyle="titleStyle"
          :classData="item"></Card>
        </li>
    </ul>

    <el-pagination
      layout="prev, pager, next"
      :pager-count="pagerCount"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import Card from '@/views/web/components/card/card.vue';

export default {
    name: 'open-class',
    data() {
        return {
            name: 'open-class',
            cardType: 'offline',
            titleStyle: {
                color: '#444',
                fontSize: '16px',
            },
            pageSize: 8, // 一页最多展示的条数
            pagerCount: 11, // 11页以上显示...
            total: 50,

            list: [
                {
                    id: 1,
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    time: '2019.01.09-2019.01.09', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    money: 1000,
                    peopleNum: 209,
                },
                {
                    id: 2,
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    time: '2019.01.09-2019.01.09', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    money: 1000,
                    peopleNum: 209,
                },
                {
                    id: 3,
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    time: '2019.01.09-2019.01.09', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    money: 1000,
                    peopleNum: 209,
                },
                {
                    id: 4,
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    time: '2019.01.09-2019.01.09', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    money: 1000,
                    peopleNum: 209,
                },
                {
                    id: 5,
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    time: '2019.01.09-2019.01.09', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    money: 1000,
                    peopleNum: 209,
                },
                {
                    id: 6,
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    time: '2019.01.09-2019.01.09', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    money: 1000,
                    peopleNum: 209,
                },
                {
                    id: 7,
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    time: '2019.01.09-2019.01.09', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    money: 1000,
                    peopleNum: 209,
                },
                {
                    id: 8,
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    time: '2019.01.09-2019.01.09', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    money: 1000,
                    peopleNum: 209,
                },
                {
                    id: 9,
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    time: '2019.01.09-2019.01.09', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    money: 1000,
                    peopleNum: 209,
                },
                {
                    id: 10,
                    href: 'http://www.baidu.com', // 课程链接
                    teacherHref: 'http://www.sina.com', // 老师链接
                    teacherName: '刘德华', // 老师名称
                    time: '2019.01.09-2019.01.09', // 上课时间
                    imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                    teacherAddress: '香港', // 老师地址
                    title: '财务如何为企业创造价值', // 标题
                    money: 1000,
                    peopleNum: 209,
                },
            ],
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initList();
        },
        initList() {
            const num = this.list.length % 4; // 计算需要补位的数量
            if (num !== 0 && this.list.length < this.pageSize) {
            // 如果能被4整除且当前页条数小于当页最大条数，开始补位
                for (let i = 0; i < num; i += 1) {
                    this.list.push(null);
                }
            }
            console.log(this.list);
        },
        classClick(item) {
            this.$router.push({ path: '/detail', query: { id: item.id } });
        },
    },
    components: {
        Card,
    },
};
</script>
<style scoped>
  .empty{
    padding: 300px 0;
    text-align: center;
    font-size: 18px;
    color: #868686;
    letter-spacing: 0;
    line-height: 25px;
  }
  .empty span{
    color: #FB683C;
  }
  .list-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .list-box li{
    display: block;
    margin-bottom: 30px;
  }
</style>
