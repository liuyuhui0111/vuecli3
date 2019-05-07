<template>
  <div class="my-order-detail">
  <Title title="我的订单"></Title>
    <h3>订单信息</h3>
    <div class="order-box">
        <div class="item">
            <p>下单时间：2019/03/23 12:12:45</p>
            <p>订单编号：23232344</p>
            <p>订单金额：¥10380.00</p>
            <p>优惠信息：无</p>
            <p>订单状态：未支付</p>
            <p>取消时间：2019/03/23 12:12:45</p>
        </div>
        <div class="btns">
            <template v-if="type=='0'">
                <p class="btn-cancel">订单已取消</p>
            </template>
            <template v-if="type=='1'">
                <p>订单已完成</p>
            </template>
            <template v-if="type=='2'">
                <p>请在72小时内完成支付，逾期将取消点多</p>
                <span class="btn-sub">立即支付</span>
                <p class="btn-cancel">取消订单</p>
            </template>
        </div>
    </div>
    <div class="list">

    </div>
  </div>
</template>
<script>
import { queryMyApplication } from '@/api/apis';
import mixin from './js/mixin';

export default {
    name: 'my-order-detail',
    mixins: [mixin],
    data() {
        return {
            name: 'my-order-detail',
            orderid: '',
            type: '0',
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.orderid = this.$route.query.orderid;
        },
        queryMyApplicationFn(t) {
            // 获取订单详情
            if (t === 'init') {
                this.queryMyApplicationParam.pageNum = 1;
            }
            queryMyApplication(this.queryMyApplicationParam).then((res) => {
                if (res.data.code === '0000') {
                    console.log(res);
                    this.classList = this.initlist(res.data.list);
                    this.total = res.data.total;
                }
            }).catch((err) => {
                this.$message({
                    message: '获取报名列表失败，请稍后再试',
                    type: 'warning',
                });
                console.log(err);
            });
        },
    },
};
</script>
<style scoped>
.btns{
    width: 255px;
}
</style>
