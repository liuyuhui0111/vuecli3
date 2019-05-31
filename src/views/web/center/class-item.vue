<template>
  <div class="class-box">
     <ul class="list">
         <li>
            <div @click="emit('imgClick',item)" class="imgbox">
                <img :src="item.pictureUrl" :alt="item.goodsName">
                <p class="title">{{item.goodsName}}</p>
            </div>
            <div class="price">
                <slot :item="item" name="price">
                    ￥{{item.amount}}
                </slot>
            </div>
            <div class="status">
            <div class="dib">
                <slot :item="item" name="status">

                    <template v-if="item.status===6">

                        <span class="cancel">
                            订单已取消
                        </span>
                        <br>
                        <span class="detail pointer" @click="routerGo(item)">订单详情</span>

                    </template>
                    <div v-else>
                      {{statusType[item.status] || '----'}}
                      <br>
                      <span class="detail pointer" @click="routerGo(item)">订单详情</span>

                     </div>
                </slot>
                </div>
            </div>
            <div class="options">
            <div class="dib">
                <slot name="options" :item="item">
                  <div v-if="item.status === 1||item.status === 2">
                      <div v-if="getTime(item.expireDate) != ''">
                        <p class="time">剩余：
                        {{getTime(item.expireDate)}}</p>
                        <span v-if="item.status===1||item.status === 2" @click="emit('buy',item)"
                        class="btn-sub">立即支付</span>
                        <span @click="emit('cancel',item)"
                        class="cancel pointer">取消订单</span>
                      </div>
                      <div v-else>
                        ----
                      </div>
                  </div>
                  <div v-else-if="item.status === 3">
                    <template v-if="goodstype != 2">
                    <span @click="emit('goStudy',item)" class="btn-sub">去学习</span>
                    </template>
                    <template v-else>
                        听课码：{{item.orderItems[0].tkm}}
                    </template>
                  </div>
                  <div v-else>
                    ----
                  </div>

                </slot>
                </div>
            </div>
         </li>
     </ul>
  </div>
</template>
<script>
import { timeStampToHour } from '@/assets/utils/timefn';

export default {
  name: 'classItem',
  data() {
    return {
      name: 'base-title',
      navIndex: -1,
      statusType: {
        1: '等待付款',
        2: '等待付款',
        3: '交易成功',
        4: '退款中',
        5: '已退款',
        6: '订单已取消',
        7: '交易成功',
      },
    };
  },
  props: {
    item: { // 列表
      type: Object,
      default: () => null,
    },
    index: {
      type: Number,
      default: () => -1,
    },
    goodstype: {
      type: Number,
      default: () => -1,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
    },
    getTime(time) {
      return `${timeStampToHour(time)}`;
    },
    emit(eventName, item) {
      if (this.index !== -1) {
        this.$emit(eventName, item, this.index);
      } else {
        this.$emit(eventName, item);
      }
    },
    routerGo(item) {
      let query = {
        orderId: item.id,
      };
      if (item.status) {
        query.status = item.status;
      }
      if (item.orderItems && item.orderItems[0].tkm) {
        query.tkm = item.orderItems[0].tkm;
      }
      this.$router.push({ path: '/center/detail', query });
    },
  },
};
</script>
<style scoped>
  .class-box{
    display: block;
    width: 100%;
    min-width: 697px;
    box-sizing:border-box;
    background: #F7F7F7;
    border: 1px solid #D4D4D4;
    overflow: hidden;
    font-size: 14px;
    color: #444444;
  }
  .list li{
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden\0;
  }
  .dib{
    display: inline-block\0;
    line-height: 20px\0;
  }
  .class-box .imgbox{
    width: 43.4%;
    float: left;
    padding: 0 20px;
    box-sizing:border-box;
    flex-grow:0;
     flex-shrink:0;
     display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    line-height: 78px\0;
  }
  .options,
  .status,
  .price{
    width: 16.6%;
    padding-top:20px\0;
    text-align: center;
    box-sizing:border-box;
    float: left;
    /*flex-grow:0;*/
    flex-shrink:0;
    height: 78px\0;
    line-height: 78px\0;
    padding-top: 0\0;
  }
  .options,
  .status{
    width: 20%;
  }
  .options{
    padding-top: 0;
  }
  .class-box .imgbox img{
    width: 131px;
    height: 78px;
    float: left;
  }
  .class-box .imgbox p{
    line-height: 20px;
    padding-left: 20px;
    padding-top: 20px\0;
    display: inline-block;
    max-width: 138px\0;
  }
  .btn-sub{
    margin:10px auto;
    font-size: 14px;
  }
  .cancel{
    font-size: 14px;
    color: #868686;
  }
  .detail{
    padding-top: 10px;
    display: inline-block;
  }

</style>
