<template>
  <div class="order common-container-width">
    <!-- 订单步骤条 -->
    <div class="top-step">
        <h4 class="title"> </h4>
        <div class="step-box">
          <Step :stepList="stepList" :active="stepIndex"></Step>
        </div>
    </div>

    <div v-if="!isSuccess" class="contain">
      <div class="order-box">
        <p>课程订单: {{orderId}} (订单ID)</p>
        <p>支付金额: <span class="money">￥{{order.paymoney}} </span>
        <p>课程名称: {{order.title}}</p>
      </div>
      <div v-if="order.payUrl" class="payment">
        <div class="item">
        <div v-show="isShowPament == 0">
          <Qrcode docId="wxQrcode"
          :width="qrcodeWidth"
          :url="order.payUrl"
          ></Qrcode>
          <p class="tip">
          请打开手机<span class="wx">微信</span>，扫一扫完成支付
          </p>
        </div>
        </div>
        <div class="item">
        <div v-show="isShowPament == 1">
          <Qrcode docId="zfbQrcode"
          :width="qrcodeWidth"
          :url="order.payUrl"
          ></Qrcode>
          <p class="tip">
          请打开手机<span class="zfb">支付宝</span>，扫一扫完成支付
          </p>
        </div>
        </div>
      </div>
    </div>

    <div v-if="isSuccess" class="contain success">
      <div class="icon-success">
        支付成功
      </div>
      <div class="code">
        听课凭借码: <span>{{code}}</span>
      </div>
      <div class="tel-box">
        听课前请通过听课凭借码签到，入场听课~
      </div>
      <div class="btns">
        <span @click="routerGo('/center/detail')">查看我的订单</span>
      </div>
    </div>

  </div>
</template>
<script>
import Step from '@/views/web/components/base/step.vue';
import Qrcode from '@/views/web/components/qrcode/qrcode.vue';
import { pay, payType } from '@/api/apis';

export default {
    name: 'pay-order',
    data() {
        return {
            name: 'pay-order',
            isSuccess: false, // 是否支付成功
            qrcodeWidth: 225, // 二维码宽高
            code: '2326', // 听课码
            isShowPament: 0,
            stepIndex: 1, // 0
            stepList: [
                {
                    id: 1,
                    title: '填写核对订单信息',
                    activeTitle: '',
                },
                {
                    id: 2,
                    title: '支付订单',
                    activeTitle: '',
                },
                {
                    id: 3,
                    title: '支付成功',
                    activeTitle: '',
                },
            ],
            orderId: '',
            order: {
                orderid: '',
                paymoney: '1000',
                title: '课程标题',
                payUrl: '',
            },
            payParam: {
                orderId: this.orderId,
                payChannelType: '',
            },
            payChannelType: 'NATIVE', // 支付类型
            timer: null,
            endTime: 1, // 5分钟没支付弹出提示框
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.orderId = this.$route.query.orderid;
            this.payFn();
        },
        routerGo(path) {
            this.$router.replace({ path, query: { orderid: this.orderId } });
        },
        payFn() {
            // 生成支付二维码
            this.payParam.orderId = this.orderId;
            this.payParam.payChannelType = this.payChannelType;
            pay(this.payParam).then((res) => {
                if (res.data.code === '0000') {
                    console.log(res);
                    this.order.payUrl = res.data.code_url;
                    this.order.payChannelType = res.data.payChannelType;
                    this.startGetPayType();
                }
            }).catch((err) => {
                console.log(err);
                this.$message({
                    message: '支付二维码生成失败，请稍后再试',
                    type: 'warning',
                });
            });
        },
        open() {
            this.$confirm('支付超时，是否成功付款?', '提示', {
                confirmButtonText: '我已付款',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.startGetPayType();
            }).catch(() => {
                this.startGetPayType();
                console.log('取消');
            });
        },
        startGetPayType() {
            // 开启轮询 查询是否支付成功
            let nums = this.endTime * 60; //
            let curnum = 0;
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                if (this.isSuccess) {
                    clearInterval(this.timer);
                } else if (curnum > nums) {
                    clearInterval(this.timer);
                    this.open();
                } else {
                    this.payTypeFn();
                }
                console.log(curnum);
            }, 1000);
        },
        payTypeFn() {
            // 生成支付二维码
            payType({ orderId: this.orderId }).then((res) => {
                if (res.data.code === '0000') {
                    this.code = res.data.tkm;
                    this.isSuccess = true;
                    this.stepIndex = 2;
                }
            }).catch((err) => {
                console.log(err);
                this.$message({
                    message: '支付二维码生成失败，请稍后再试',
                    type: 'warning',
                });
            });
        },
    },
    components: {
        Step,
        Qrcode,
    },
};
</script>
<style scoped>
  .contain{
    width: 520px;
    margin: 0 auto;
    font-size: 16px;
    color: #444444;
    letter-spacing: 0;
    text-align: left;
  }
  .top-step{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .step-box{
    width: 340px;
  }
  .payment{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .payment .item{
    width: 225px;
  }
  .money{
    color: #FB683C;
    margin-right: 40px;
  }
  .order-detail{
    color: #868686;
    cursor: pointer;
  }
  .order-box p{
    margin-bottom: 10px;
  }
  .title{
    margin-bottom: 40px;
    margin-top: 30px;
  }
  .btn-img{
    height: 60px;
    cursor: pointer;
    margin-bottom: 40px;
  }
  .tip{
    text-align: center;
    line-height: 22px;
    font-size: 14px;
    margin-top: 20px;
  }
  .tip .wx{
    color: #189648;
  }
  .tip .zfb{
    color: #00a0e9;
  }

  /*支付成功*/
  .contain.success{
    width: 380px;
  }
  .icon-success{
    padding-left: 100px;
    height: 80px;
    display: block;
    background: url('./imgs/icon-success.png') no-repeat center left;
    background-size:80px 80px;
    font-size: 50px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 170px;
  }
  .code{
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .code span{
    color: #FB683C;
  }
  .tel-box{
    font-size: 16px;
    color: #F91E1E;
    margin-bottom: 80px;
  }
  .btns{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #FB683C;
    margin-bottom: 170px;
  }
  .btns span{
    cursor: pointer;
  }
</style>
