<template>
  <div class="my-myset">
  <Title title="我的设置"
  @navclick="navclick"
  :list="list"></Title>
    <div class="iframe-box">
      <iframe src="http://www.baidu.com" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script>
export default {
    name: 'my-myset',
    data() {
        return {
            name: 'my-myset',
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {

        },
    },
};
</script>
<style scoped>
  .iframe-box{
    display: block;
    width: 100%;
    height: 600px;
  }
  .iframe-box iframe{
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
