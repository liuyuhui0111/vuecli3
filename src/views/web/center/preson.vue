<template>
  <div class="my-preson">
    <Title title="个人中心"></Title>
    <div class="study-list">
        <p class="nav">
        <span>最近在学</span>
        <span class="classNum">总看课数</span>
        </p>
        <div class="box">
        <ul v-if="commonCenterData.videoList.length>0" class="list-box">
            <li v-for="(item,index) in commonCenterData.videoList"
            :key="index">
                <img @click="routerGo(item)" :src="item.bannerUrl"
                :alt="item.title">
                <span @click="routerGo(item)" class="icon-add">
                    去学习
                </span>
            </li>
        </ul>
        <div class="empty" v-else>
            暂无最近在看数据
        </div>
        <div class="classNum">{{commonCenterData.classNum}}</div>
        </div>
    </div>
    <div class="btns">
        <Title title="我的权益"></Title>
        <div
        v-if="commonCenterData.leaguerList.leaguerRightList.length>0"
        class="btn-list">
            <div
            class="item"
            v-for="(item,index) in commonCenterData.leaguerList.leaguerRightList"
            :key="index">
                <span class="icon">
                    <img :src="item.pictureUrl" :alt="item.name">
                </span>
                <span class="name ellipsis" :title="item.name">{{item.name}}</span>
                <span v-if="item.type==1" class="free">
                    {{item.value == 0 ? '全部免费' : '剩余'+item.value+'次'}}
                </span>
                <span v-if="item.type==0"
                class="free">尚未开通</span>
            </div >
        </div>
         <div v-else>
            暂无会员权益
        </div>
    </div>
  </div>
</template>
<script>
import mixin from './js/mixin';

export default {
    name: 'my-preson',
    mixins: [mixin],
    data() {
        return {
            name: 'my-preson',
            classNum: 0, // 总看课数
            btnList: [],
            studyList: [],
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            console.log(this.commonCenterData);
        },
        navclick() {

        },
        routerGo(item) {
            this.$router.push({ path: '/online-detail', query: { id: item.id } });
        },
    },
};
</script>
<style scoped>
.empty{
    padding-bottom: 20px;
}
.box,
.nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font-size: 14px;
    margin-bottom: 10px;
    padding-right:20px;
}
.classNum{
    width: 150px;
    text-align: center;
}
.box{
    padding: 20px 20px 0 20px;
    box-sizing:border-box;
    background: #F7F7F7;
border: 1px solid #D4D4D4;
}
.box img{
    width: 131px;
    margin-right: 40px;
    float: left;
}
.box li {
    overflow: hidden;
    margin-bottom: 20px;
}
.icon-add{
    display: block;
    width: 131px;
    height: 78px;
    line-height: 78px;
    padding-left: 60px;
    box-sizing:border-box;
    background: url('./imgs/icon-add.png') no-repeat 20px 30px;
    background-color: #E6E6E6;
    float: left;
    cursor: pointer;
}
.btn-list{
    padding-left: 64px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.icon{
    display: block;
    width: 80px;
    height: 80px;
    background: #ccc;
    margin: 0 auto;
}
.btn-list .item{
    min-width: 25%;
}
.btn-list .name{
    font-weight: bold;
    display: block;
    font-size: 16px;
    margin: 10px 0;
}
</style>
