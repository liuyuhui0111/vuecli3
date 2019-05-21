<template>
  <div v-if="orderInfo" class="my-order-detail">
  <Title title="我的订单"></Title>
    <h3>订单信息</h3>
    <div class="order-box">
        <div class="item">
            <p>创建时间：{{getTime(orderInfo.createTime,true)}}</p>
            <p>订单编号：{{orderId}}</p>
            <p>订单金额：¥{{orderInfo.amount}}</p>
            <!-- <p>优惠信息：无</p> -->
            <p v-if="this.type">订单状态：{{statusType[this.type]}}</p>
            <!-- <p>取消时间：{{getTime(0,true)}}</p> -->
        </div>
        <div class="btns">
            <template v-if="type=='6'">
                <p class="cancel">订单已取消</p>
            </template>
            <template v-else-if="type=='3'">
                <span @click="goStudy()" class="btn-sub">去学习</span>
            </template>
            <template v-else-if="type=='1'">
                <p>请在72小时内完成支付，逾期将取消点多</p>
                <span class="btn-sub">立即支付</span>
                <p class="cancel">取消订单</p>
            </template>
            <template v-else>
              {{statusType[this.type]}}
            </template>
        </div>
    </div>
    <div class="list">
        <div class="theader">
            <span class="w43">课程信息</span>
            <span class="w16">数量</span>
            <span class="w20">小计（元）</span>
            <span class="w20">有效期</span>
        </div>
        <classItem :item="orderInfo">
        <div slot="price"
        slot-scope="props"
         class="num">{{props.item.count}}</div>
         <div slot-scope="props" slot="status">
             ￥{{props.item.price}}
         </div>
        <div class="active"
        slot-scope="props"
         slot="options">
            {{getDay(props.item.termOfValidity)}}天
        </div>
        </classItem>
    </div>
  </div>
</template>
<script>
import { queryMyApplication, queryOrderById } from '@/api/apis';
import classItem from '@/views/web/center/class-item.vue';
import mixin from './js/mixin';
import { formatDate } from '@/assets/utils/timefn';

export default {
  name: 'my-order-detail',
  mixins: [mixin],
  data() {
    return {
      name: 'my-order-detail',
      orderId: '',
      type: 1,
      orderInfo: null,
      statusType: {
        1: '未付款',
        2: '付款中',
        3: '已付款',
        4: '退款中',
        5: '已退款',
        6: '已取消',
      },
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.orderId = this.$route.query.orderId;
      // 查询订单详情
      this.queryOrderByIdFn();
    },
    getDay(time) {
      if (!time) return '';
      let stime = time.split('|')[0];
      let etime = time.split('|')[1];
      let curt = new Date(etime).getTime() - new Date(stime).getTime();
      return curt / (1000 * 60 * 60 * 24);
    },
    queryOrderByIdFn() {
      // 查询订单详情
      queryOrderById({ id: this.orderId }).then((res) => {
        if (res.data.code === '0000' && res.data.list.length > 0) {
          this.orderInfo = res.data.list[0] || {};
          this.type = this.orderInfo.status;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    getTime(time, type) {
      if (time === undefined) {
        return '';
      }
      return `${formatDate(time, type)}`;
    },
    goStudy() {
      this.$router.push({ path: '/online-class', query: {} });
    },
    queryMyApplicationFn(t) {
      // 获取订单详情
      if (t === 'init') {
        this.queryMyApplicationParam.pageNum = 1;
      }
      queryMyApplication(this.queryMyApplicationParam).then((res) => {
        if (res.data.code === '0000') {
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
  components: {
    classItem,
  },
};
</script>
<style scoped>
.theader{
    overflow: hidden;
    display: flex;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 10px;
}
.theader span{
    display: block;
    float: left\0;
    text-align: center;
}
.w43{
    width: 43.4%;
}
.theader .w43{
    text-align: left;
}
.w16{
    width: 16.6%;
}
.w20{
    width: 20%;
}

.btns{
    width: 255px;
}
h3{
    font-size: 16px;
}
.cancel{
    color: #868686;
}
.order-box{
    margin-top: 20px;
    overflow: hidden;
    position: relative;
    padding-right: 255px;
    box-sizing:border-box;
    width: 100%;
    color: #444;
}
.order-box p{
    margin-bottom: 10px;
    font-size: 14px;
}
.order-box .btns{
    position: absolute;
    right: 0;
    width: 255px;
    text-align: center;
    top: 0;
}
.active{
font-size: 14px;
color: #FB683C;
letter-spacing: 0;
}
</style>
