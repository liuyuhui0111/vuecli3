<template>
    <div class="list">
    <baseTitle @moreClick="moreClick" :title="title" :more="more"></baseTitle>
      <slot>
        <div v-if="list.length>0" class="contain-box">
          <div v-for="(item,index) in list" :key="index" class="item">
            <Card v-if="item != null"
            @classClick="classClick"
            :type="cardType" :classData="item"></Card>
          </div>
        </div>
      </slot>
    </div>
</template>
<script>
import Card from '@/views/web/components/card/card.vue';
import baseTitle from '@/views/web/components/base/base-title.vue';

export default {
    data() {
        return {
            moreText: '更多',
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
        moreClick() {
            this.$emit('moreClick');
        },
        classClick(item, type) {
            this.$emit('classClick', item, type);
        },
    },
    components: {
        Card,
        baseTitle,
    },
};
</script>
<style scoped>

  .contain-box{
    display: flex;
    padding: 20px 0 0 0;
    align-items: center;
    justify-content: space-between;
  }
  .contain-box .item{
    /*width: 25%;*/
  }
</style>
