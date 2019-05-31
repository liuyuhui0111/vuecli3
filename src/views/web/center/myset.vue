<template>
  <div class="my-myset">
   <Title title="我的设置"
    @navclick="navclick"
    :list="list"></Title>
    <template v-if="src.length>0">
        <div v-for="(item,index) in src"
        v-show="index == curnav"
        :key="index"
        class="iframe-box">
        <iframe :id="index" :src="item.src" frameborder="0"></iframe>
        </div >
    </template>

    <!-- <div v-="src.length>0" class="iframe-box">
      <iframe id="iframe" :src="iframeSrc" frameborder="0"></iframe>
    </div> -->
  </div>
</template>
<script>
import mixin from './js/mixin';

export default {
  name: 'my-myset',
  mixins: [mixin],
  data() {
    return {
      name: 'my-myset',
      iframeSrc: '',
      src: [
      ],
      curnav: 0,
      list: [
        // {
        //   text: '个人信息',
        //   value: 0,
        // },
        {
          text: '账户安全',
          value: 1,
        },
        {
          text: '修改密码',
          value: 2,
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //       安全设置
      // https://devpassport.ele12.cn/course_authentication/require#/safeSet?token=
      // 修改密码
      // https://devpassport.ele12.cn/course_authentication/require#/cPass?token=
      /*eslint-disable*/ 
      this.src = [
        {src:`${window.COMMON_ENV.SSO_URL}/course_authentication/require#/safeSet?token=${this.token}`},
        {src:`${window.COMMON_ENV.SSO_URL}/course_authentication/require#/cPass?token=${this.token}`},
      ];

      this.iframeSrc = this.src[this.curnav];
      setTimeout(()=>{
        let iframes = document.getElementsByTagName("iframe");
        for(var i=0;i<iframes.length;i++){
          iframes[i].contentWindow.location.reload(true);
        }
      }, 30);
       /* eslint-enable */
    },
    navclick(item, index) {
      console.log(item);
      this.curnav = index;
      this.iframeSrc = this.src[this.curnav];
      // setTimeout(() => {
      //   document.getElementById('iframe').contentWindow.location.reload(true);
      // }, 30);
    },
  },
};
</script>
<style scoped>
  .my-set{
    width: 100%;
  }
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
