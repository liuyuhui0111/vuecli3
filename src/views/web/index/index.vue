<template>
    <div class="index common-container-width">
        <!-- 轮播图 -->
        <Banner :list="banner.list"></Banner>
        <!-- classlist 课程列表classList -->
        <List
        :title="list.classList.title"
        :more="list.classList.more"
        :list="list.classList.list"
        :cardType="list.classList.type"
        ></List>

        <!-- 大家都在学allStudyList -->
        <List
        :title="list.allStudyList.title"
        :more="list.allStudyList.more"
        :list="list.allStudyList.list"
        :cardType="list.allStudyList.type"
        ></List>

        <!-- 新鲜出炉 -->
        <List
        title="新鲜出炉"
        :more="list.allStudyList.more"
        :list="list.allStudyList.list"
        :cardType="list.allStudyList.type"
        ></List>

        <!-- 推荐课程 -->
        <List
        title="推荐课程"
        :list="list.allStudyList.list"
        :cardType="list.allStudyList.type"
        ></List>

        <!-- teacherList 名师列表 -->
        <List title="名师介绍">
        <TeacherSwiper :list="teacherList"></TeacherSwiper>
        </List>

    </div>
</template>
<script>
import Banner from './banner.vue';
import List from './list.vue';
import TeacherSwiper from './teacher-swiper.vue';

export default {
    data() {
        return {
            name: 'index',
            banner: { // 轮播图
                list: [
                    {
                        imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3476798145,119344238&fm=27&gp=0.jpg',
                        href: 'http://www.baidu.com',
                    },
                    {
                        imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3476798145,119344238&fm=27&gp=0.jpg',
                        href: 'http://www.baidu.com',
                    },
                    {
                        imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3476798145,119344238&fm=27&gp=0.jpg',
                        href: 'http://www.baidu.com',
                    },
                ],
            },

            list: {
                classList: {
                    type: 'offline',
                    title: '线下公开课程',
                    more: 'http://www.baidu.com',
                    list: [
                        {
                            href: 'http://www.baidu.com', // 课程链接
                            teacherHref: 'http://www.sina.com', // 老师链接
                            teacherName: '刘德华', // 老师名称
                            time: '2019.01.09-2019.01.09', // 上课时间
                            imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                            teacherAddress: '香港', // 老师地址
                            title: '财务如何为企业创造价值', // 标题
                        },
                        {
                            href: 'http://www.baidu.com', // 课程链接
                            teacherHref: 'http://www.sina.com', // 老师链接
                            teacherName: '刘德华', // 老师名称
                            time: '2019.01.09-2019.01.09', // 上课时间
                            imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                            teacherAddress: '香港', // 老师地址
                            title: '财务如何为企业创造价值', // 标题
                        },
                        {
                            href: 'http://www.baidu.com', // 课程链接
                            teacherHref: 'http://www.sina.com', // 老师链接
                            teacherName: '刘德华', // 老师名称
                            time: '2019.01.09-2019.01.09', // 上课时间
                            imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                            teacherAddress: '香港', // 老师地址
                            title: '财务如何为企业创造价值', // 标题
                        },
                        {
                            href: 'http://www.baidu.com', // 课程链接
                            teacherHref: 'http://www.sina.com', // 老师链接
                            teacherName: '刘德华', // 老师名称
                            time: '2019.01.09-2019.01.09', // 上课时间
                            imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                            teacherAddress: '香港', // 老师地址
                            title: '财务如何为企业创造价值', // 标题
                        },
                    ],
                },

                allStudyList: {
                    type: 'online',
                    title: '大家都在学',
                    more: 'http://www.baidu.com',
                    list: [
                        {
                            href: 'http://www.baidu.com', // 课程链接
                            imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                            title: '标题，最多显示两行放不下自动换行，两行放不下用…代替即可', // 标题
                            money: 1000,
                            peopleNum: 209,
                            freeType: '0',
                            freeTxt: '免费',
                        },
                        {
                            href: 'http://www.baidu.com', // 课程链接
                            imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                            title: '标题，最多显示两行放不下自动换行，两行放不下用…代替即可', // 标题
                            money: 1000,
                            peopleNum: 209,
                            freeType: '1',
                            freeTxt: '1000',
                        },
                        {
                            href: 'http://www.baidu.com', // 课程链接
                            imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                            title: '标题，最多显示两行放不下自动换行，两行放不下用…代替即可', // 标题
                            money: 1000,
                            peopleNum: 209,
                            freeType: '1',
                            freeTxt: '1000(LV1免费)',
                        },
                        {
                            href: 'http://www.baidu.com', // 课程链接
                            imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                            title: '标题，最多显示两行放不下自动换行，两行放不下用…代替即可', // 标题
                            money: 1000,
                            peopleNum: 209,
                            freeType: '0',
                            freeTxt: '限时免费',
                        },
                    ],
                },
            },


            teacherList: [
                {
                    src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=672585879,3655446516&fm=27&gp=0.jpg',
                    name: '张三',
                    intro: `财务经理人网创始人之一，现任财智东方合伙人、高级讲师及咨询顾问；
新南威尔士大学(澳大利亚)国际会计专业，商学硕士；<br>
全国十大CF0，优秀CF0奖获得者；<br>
北京诺基亚、首信科技、上海矽魁等多家企业董事；<br>
中国本土企业商业模式优化与设计专家。`,
                    href: 'http://www.baidu.com',
                },
                {
                    src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=672585879,3655446516&fm=27&gp=0.jpg',
                    name: '张三',
                    intro: `财务经理人网创始人之一，现任财智东方合伙人、高级讲师及咨询顾问；<br>
新南威尔士大学(澳大利亚)国际会计专业，商学硕士；<br>
全国十大CF0，优秀CF0奖获得者；<br>
北京诺基亚、首信科技、上海矽魁等多家企业董事；<br>
中国本土企业商业模式优化与设计专家。`,
                    href: 'http://www.baidu.com',
                },
                {
                    src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=672585879,3655446516&fm=27&gp=0.jpg',
                    name: '张三',
                    intro: `财务经理人网创始人之一，现任财智东方合伙人、高级讲师及咨询顾问；
新南威尔士大学(澳大利亚)国际会计专业，商学硕士；<br>
全国十大CF0，优秀CF0奖获得者；<br>
北京诺基亚、首信科技、上海矽魁等多家企业董事；<br>
中国本土企业商业模式优化与设计专家。`,
                    href: 'http://www.baidu.com',
                },
                {
                    src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=672585879,3655446516&fm=27&gp=0.jpg',
                    name: '张三',
                    intro: `财务经理人网创始人之一，现任财智东方合伙人、高级讲师及咨询顾问；
新南威尔士大学(澳大利亚)国际会计专业，商学硕士；<br>
全国十大CF0，优秀CF0奖获得者；<br>
北京诺基亚、首信科技、上海矽魁等多家企业董事；<br>
中国本土企业商业模式优化与设计专家。`,
                    href: 'http://www.baidu.com',
                },
            ],
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {

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

</style>
