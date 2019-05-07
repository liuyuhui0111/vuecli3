<template>
  <div class="order-box">
    <slot>
      <div class="list-box">
        <div v-for="(item,index) in theaderList"
        :style="item.styleObj"
        :class="item.dataName"
        class="item"
        :key="index">
          {{item.title}}
        </div>
      </div>
      <div class="contain">
          <div class="classData">
            <div class="item"
            v-for="(item,index) in order.list"
            :key="index">
              <div class="img-box">
                <img :src="item.imgurl" :alt="item.title">
                <p class="title ellipsis2">{{item.title}}</p>
              </div>
              <div class="num">
                {{item.num}}
              </div>
              <div v-if="item.curmoney" class="money">
                ￥{{item.curmoney}} <br>
                <span v-if="item.money">￥{{item.money}}</span>
              </div>
              <div v-else class="money">
                ￥{{item.money}}
              </div>
            </div >
          </div>
          <div class="time">
            {{order.time}}
          </div>
      </div>
    </slot>
  </div>
</template>
<script>
export default {
    name: 'base-order',
    data() {
        return {
            name: 'base-order',
        };
    },
    props: {
        type: { // 订单类型  order 普通订单  orderSet 组合订单
            type: String,
            default: () => 'order',
        },
        theaderList: {
            type: Array,
            default: () => [],
        },
        order: {
            type: Object,
            default: () => null,
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
        },
        moreClick() {
            this.$emit('moreClick');
        },
    },
};
</script>
<style scoped>
    .order-box{
      display: block;
      width: 100%;
      height: 100%;
      font-size: 14px;
      color: #444444;
      letter-spacing: 0;
      line-height: 20px;
    }
    .contain,
    .list-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      margin-bottom: 10px;
    }
    .contain{
      min-height: 118px;
      background: #F7F7F7;
      border: 1px solid #D4D4D4;
      text-align: left;
    }
    .contain .time{
      width: 20%;
    }
    .contain .classData{
      width: 80%;
    }
    .contain .classData .item{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .contain .classData .item .img-box{
      padding: 20px;
      width: 50%;
      box-sizing:border-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .contain .classData .item .img-box .title{

    }
    .contain .classData .item img{
      width: 131px;
      height: 78px;
      margin-right: 20px;
    }
    .contain .num{
      width: 25%;
    }
    .contain .money{
      width: 25%;
    }
    .contain .money span{
      color: #868686;
      text-decoration: line-through;
    }
</style>
