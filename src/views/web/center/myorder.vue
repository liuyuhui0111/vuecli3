<template>
  <div class="my-order">
    <Title title="我的订单"
    @navclick="navclick"
    :list="list"></Title>

    <template v-if="curNav === '0'">
        <!-- 会员订单 -->
        <div class="vip-box">
            <div class="title">
                <span>会员开通记录</span>
                <span class="tip">您的会员已到期</span>
            </div>
            <div class="list">
              <el-table
              :data="vipList"
              style="width: 100%">
               <el-table-column
               v-for="(item,index) in vipListTheader"
                  :key="index"
                :prop="item.prop"
                :label="item.label">
                </el-table-column>
              </el-table>

            </div>
            <p>客服QQ：<a :href="aside.qq">QQ交谈</a></p>
            <p>客服热线：{{aside.tel}}</p>
            <p>服务时间：{{aside.time}}</p>
        </div>
    </template>

    <template v-if="curNav === '1'"></template>
    <template v-if="curNav === '2'"></template>


     <el-pagination
        v-if="list[curNav].total>list[curNav].pageSize"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :pager-count="pagerCount"
        prev-text="上一页"
        next-text="下一页"
        :page-size="list[curNav].pageSize"
        :total="list[curNav].total">
      </el-pagination>

  </div>
</template>
<script>
import mixin from './js/mixin';

export default {
    name: 'my-order',
    mixins: [mixin],
    data() {
        return {
            name: 'my-order',
            pagerCount: 11,
            aside: {
                qq: `http://wpa.qq.com/msgrd?v=3&uin=${12345678}&site=在线客服&menu=yes`, // 侧栏QQ
                tel: 13300004444,
                time: '早8点-晚9点',
            },
            curNav: 0,
            list: [
                {
                    text: '会员订单',
                    value: '0',
                    pageNum: 5,
                    pageSize: 1,
                    total: 0,
                },
                {
                    text: '线上课程订单',
                    value: '1',
                    pageNum: 5,
                    pageSize: 1,
                    total: 0,
                },
                {
                    text: '线下课程订单',
                    value: '2',
                    pageNum: 5,
                    pageSize: 1,
                    total: 0,
                },
            ],
            vipListTheader: [
                {
                    label: '订单编号',
                    prop: 'ddbh',
                },
                {
                    label: '会员类型',
                    prop: 'ddbh',
                },
                {
                    label: '开通形式',
                    prop: 'ddbh',
                },
                {
                    label: '下单时间',
                    prop: 'ddbh',
                },
                {
                    label: '付款时间',
                    prop: 'ddbh',
                },
                {
                    label: '生效时间',
                    prop: 'ddbh',
                },
                {
                    label: '结束时间',
                    prop: 'ddbh',
                },
                {
                    label: '支付状态',
                    prop: 'ddbh',
                },
                {
                    label: '发票',
                    prop: 'ddbh',
                },
                {
                    label: '剩余时间',
                    prop: 'ddbh',
                },

            ],
            vipList: [],
            onlineList: [],
            offlineList: [],

        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {

        },
        handleCurrentChange(val) {
            this.list[this.curNav].pageNum = val;
        },
        navclick(item, index) {
            console.log(item, index);
            this.curNav = index;
        },
    },
};
</script>
<style scoped>
.vip-box{
    margin-top: 40px;
    font-size: 16px;
    color: #444444;
    letter-spacing: 0;
    width: 100%;
}
.title{
    font-weight: bold;
}
.vip-box .title{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.vip-box .title .tip{
  color: #F91E1E;
}
</style>
