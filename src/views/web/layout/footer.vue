<template>
  <div class="footer">
    <div class="common-container-width">
      <div class="item logo">
        <span class="product">
          <img :src="COMMON_COMP_DATA.logo">
          <!-- <i>{{footer.productIntro}}</i> -->
        </span>
      </div>
      <div class="item">
        客服电话：{{COMMON_COMP_DATA.tel}}  <br>
        客服工作时间：{{COMMON_COMP_DATA.time}}
      </div>
      <div class="item w40" v-html="transferStringFn(COMMON_COMP_DATA.address)">
      </div>
      <div class="item w10">
        <img class="qrcode" :src="COMMON_COMP_DATA.ewm" alt="二维码">
      </div>
    </div>
  </div>
</template>
<script>
import {
  getSourceData,
} from '@/api/apis';
import { transferString } from '@/assets/utils/util';

export default {
  name: 'compFooter',
  data() {
    return {
      name: 'footer',
      COMMON_COMP_DATA1: { // 公司主体信息
        // qq: '//wpa.qq.com/pa?p=2:800013811:42',
        qq: `//wpa.qq.com/msgrd?v=3&uin=${1530192656}&site=qq&menu=yes`, // 客服qq
        tel: '0574-87352489', // 客服电话
        time: '7*24h', // 客服服务时间
        address: '宁波爱信诺航天信息有限公司与<br>大象慧云信息技术有限公司联合出品',
        logo: `${process.env.BASE_URL}logo.png`, // 公司logo
        ewm: `${process.env.BASE_URL}qrcode.jpg`, // 公司二维码
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // this.setCopData(this.COMMON_COMP_DATA1);
      if (!this.COMMON_COMP_DATA.tel && !this.COMMON_COMP_DATA.qq) {
        this.getSourceDataFn();
      }
    },
    transferStringFn(str) {
      return transferString(str) || '';
    },
    getSourceDataFn() {
      // 获取公司主体信息
      if (!this.isCanRequest) {
        return;
      }
      this.isCanRequest = false;


      getSourceData().then((res) => {
        this.isCanRequest = true;
        if (res.data.code === '0000') {
          // 获取成功
          this.COMMON_COMP_DATA1.qq = `//wpa.qq.com/msgrd?v=3&uin=${res.data.sourceData.qq}&site=qq&menu=yes`;
          this.COMMON_COMP_DATA1.tel = res.data.sourceData.phone;
          this.COMMON_COMP_DATA1.time = `${res.data.sourceData.time}h`;
          this.COMMON_COMP_DATA1.address = res.data.sourceData.sourceName;
          this.COMMON_COMP_DATA1.logo = res.data.sourceData.logoUrl;
          this.COMMON_COMP_DATA1.ewm = res.data.sourceData.ewmUrl;

          this.setCopData(this.COMMON_COMP_DATA1);
        }
      }).catch((err) => {
        this.isCanRequest = true;
        console.log(err);
        // 获取token 失败  退出登录 提示重新登录
        this.$message({
          message: '登录失败,请重新登录',
          type: 'warning',
        });
      });
    },
  },
};
</script>
<style scoped>
/*页面底部*/
  .footer{
    height: 176px;
  }
  html body .logo img {
    width: 135px;
    height: 46px;
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
