<template>
  <div class="my-myset">
  <Title title="我的设置"></Title>
    <div class="iframe-box">
      <iframe :src="src" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: 'my-myset',
  data() {
    return {
      name: 'my-myset',
      src: '',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.src = `${window.COMMON_ENV.SSO_URL}/authentication/require#/pclogin?changePassword=1&token=${this.token}`;
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
