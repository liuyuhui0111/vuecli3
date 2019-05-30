<template>
  <div class="footer">
    <div class="common-container-width">
      <div class="item logo">
        <span class="product">
          <img :src="publicPath+'logo.png'" alt="优税学院">
          <!-- <i>{{footer.productIntro}}</i> -->
        </span>
      </div>
      <div class="item">
        客服电话：{{COMMON_COMP_DATA.tel}}  <br>
        客服工作时间：{{COMMON_COMP_DATA.time}}
      </div>
      <div class="item w40" v-html="COMMON_COMP_DATA.address">
      </div>
      <div class="item w10">
        <img class="qrcode" src="./imgs/qrcode.jpg" alt="二维码">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'compFooter',
  data() {
    return {
      name: 'footer',
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
/*页面底部*/
  .footer{
    height: 176px;
  }
  .footer .common-container-width{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }
   .footer .common-container-width>.item.logo{
    width: 135px\0;
   }
  .footer .common-container-width>.item{
    padding-top:50px\0;
    float: left\0;
    margin-right:30px\0;
    width: 200px\0;
  }
  .footer .common-container-width>.w40{
    width: 370px\0;
    margin-right: 60px\0;
  }
  .footer .common-container-width>.w10{
    width: 116px\0;
    padding-top: 20px\0;
    margin-right: 0\0;
  }
  .footer .common-container-width>.item a{
    margin-top: 50px\0;
  }
  img.qrcode{
    width: 116px;
    height: 116px;
  }
  .product{
    line-height: 20px;
    font-weight: bold;
    font-size: 16px;
    float: left\0;
    box-sizing:border-box;
    position: relative;
  }
  .product img{
    /*position: absolute;*/
    width: 80%;
    height: auto;
    display: block;
  }
  .product i{
    font-style: normal;
    font-size: 14px;
    font-weight: normal;
  }
</style>
