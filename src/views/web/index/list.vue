<template>
    <div class="list">
      <div class="title-box">
        <span class="title">{{title}}</span>
        <a class="more"
        v-if="more"
        :href="more"
        >更多</a>
      </div>
      <slot>
        <div v-if="list.length>0" class="contain-box">
          <div v-for="(item,index) in list" :key="index" class="item">
            <Card :type="cardType" :classData="item"></Card>
          </div>
        </div>
      </slot>
    </div>
</template>
<script>
import Card from '@/views/web/components/card/card.vue';

export default {
    data() {
        return {
            name: 'list',
        };
    },
    props: {
        title: {
            type: String,
            derequired: true,
        },
        more: {
            type: String,
            default: () => '',
        },
        cardType: { // 卡片类型 online 线上课程 offline 线下公开课
            type: String,
            default: () => '',
        },
        list: {
            type: Array,
            default: () => [],
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {

        },
    },
    components: {
        Card,
    },
};
</script>
<style scoped>
  .title-box{
    display: block;
    height: 51px;
    box-sizing:border-box;
    position: relative;
    border-bottom: 1px solid #D4D4D4;
    padding: 20px 0 0 13px;
    font-size: 16px;
    letter-spacing: 0;
  }
  .title-box:before{
    content: "";
    display: block;
    width: 3px;
    height: 17px;
    position: absolute;
    left: 0;
    top: 22px;
    background: #FB683C;
    border-radius: 100px;
  }
  .title{
    color: #444444;
  }
  .title-box a.more{
    color: #868686;
    float: right;
    text-decoration: none;
    padding-right: 13px;
    position: relative;
    display: block;
  }
  .title-box a.more:after{
    content: "";
    display: block;
    width: 7px;
    height: 12px;
    background: url('./imgs/more.png') no-repeat top left;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -6px;
  }

  .contain-box{
    display: flex;
    padding: 20px 0 10px 0;
    align-items: center;
    justify-content: space-between;
  }
</style>
