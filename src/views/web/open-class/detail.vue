<template>
  <div class="open-class common-container-width">
    <div class="contain-box">
      <div class="contain">
        <!-- 详情图片 分享 收藏 在线报名 免费学 -->
        <div class="img-box">
          <img :src="detailData.imgurl" alt="detailData.title">
          <div class="btns">
          <!-- 分享弹窗 -->
             <el-popover
                  placement="bottom"
                  trigger="click"
                  width="158"
                  v-model="showShare">
              <span slot="reference" class="icon-share"></span>
              <div class="share-box">
                <div @click="copyFn" class="copy">
                  <textarea id="copy" v-model="copyurl"></textarea>
                 <p><span class="icon-copy"></span>复制链接</p> 
                </div>
                <div class="wx-box">
                  <span class="qrcode-logo"></span>
                  <p>
                    <span class="icon-wx"></span>
                    微信扫一扫
                  </p>
                  <div id="qrcode"></div>
                </div>
              </div>
            </el-popover>

              <span class="icon-collect"></span>


            <span class="btn-online">在线报名</span>
            <span class="btn-free">免费学</span>
          </div>
        </div>


            <!-- 专题 课程tab -->
        <div class="tab-box">
            <span v-for="(item,index) in tablist"
            @click="changeTab(index)"
            :class="{active:index == tabindex}"
            :key="index">
                {{item.text}} ( {{item.value}} )
            </span>
        </div>


      </div>
    <!-- 右侧热门搜索 -->
      <div class="aside">

        <!-- 热门搜索 -->
        <div class="hot-search">
          <p class="title">热门搜索</p>
          <ul class="hot-search-list">
            <li v-for="(item,index) in hotSearchList"
            :key="index">
              <span class="rank">{{item.rank}}</span>
              <p>{{item.text}}</p>
            </li>
          </ul>
        </div>
      </div>

    </div>


  </div>
</template>
<script>
import QRCode from '@/assets/utils/qrcode'
export default {
    name: 'detail',
    data() {
        return {
            name: '详情页',
            id: '',
            copyurl: 'http://www.baidu.com',
            showShare: false,
            tabindex: 0, // 当前选中tab index
            tablist: [ // tab列表
                { text: '课程', value: 0 },
                { text: '专题', value: 0 },
            ],
            hotSearchList: [ // 热门搜索
                {
                    text: '热门文章标题',
                    rank: 1,
                },
                {
                    text: '热门文章标题热门文章标题热门文章标题热门文章标题热门文章标题',
                    rank: 3,
                },
                {
                    text: '热门文章标题',
                    rank: 4,
                },
                {
                    text: '热门文章标题',
                    rank: 7,
                },
                {
                    text: '热门文章标题',
                    rank: 2,
                },
                {
                    text: '热门文章标题',
                    rank: 5,
                },
                {
                    text: '热门文章标题',
                    rank: 6,
                },
            ],
            detailData: {
                id: 1,
                teacherHref: 'http://www.sina.com', // 老师链接
                teacherName: '刘德华', // 老师名称
                time: '2019.01.09-2019.01.09', // 上课时间
                imgurl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3999219137,1518109222&fm=173&app=49&f=JPEG?w=218&h=146&s=9AA04181325321D21EB93016030080C1', // 图片地址
                teacherAddress: '香港', // 老师地址
                title: '财务如何为企业创造价值', // 标题
                money: 1000,
                peopleNum: 209,
            },
            qrcode:null,
        };
    },
    mounted() {
        this.init();
    },
    watch: {
        $route() {
            this.id = this.$route.query.id;
        },
    },
    methods: {
        init() {
            this.id = this.$route.query.id;
            // 初始化二维码
            this.initQrcode();
        },
        initQrcode() {
          let url = this.copyurl
          this.qrcode = new QRCode(document.getElementById("qrcode"), {
            text: url,
            width: 116,
            height: 116,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
          });
        },
        changeTab(index) {
            this.tabindex = index;
            if (index === 0) {
                this.cardType = 'search';
                this.list = this.newlist;
            } else {
                this.cardType = 'search1';
                this.list = this.newlist1;
            }
        },

        copyFn() {
            // 复制链接
            try {
                const input = document.getElementById('copy');
                input.select(); // 选中文本
                document.execCommand('copy'); // 执行浏览器复制命令
                this.$alert('复制成功');
            } catch (e) {
                console.log(e);
                this.$alert(`该浏览器不支持复制，请手动选择复制：${this.copyurl}`);
            }
        },


    },
    components: {
    },
};
</script>
<style scoped>
#copy{
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  z-index: -10;
  opacity: 0;
}
  /*顶部图片 分享按钮 收藏按钮 在线报名 免费学*/
  .img-box{
    position: relative;
    display: block;
    width: 100%;
    max-height: 320px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .img-box img{
    display: block;
    width: 100%;
    position: relative;
    z-index: 0;
  }
  .img-box .btns{
    position: absolute;
    font-size: 0;
    text-align: right;
    height: 40px;
    bottom:10px;
    right: 0;
    z-index: 1;
  }
  .img-box .btns span{
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: -0.34px;
    display: inline-block;
    cursor: pointer;
    margin-right: 20px;
    float: left;
  }
  .icon-collect,
  .icon-share{
    width: 30px;
    height: 40px;
    background: url('./imgs/icon-share.png') no-repeat top left;
    background-size: 30px auto;
    position: relative;
    top: 10px;
  }
  .icon-collect{
    background-image: url('./imgs/icon-collect.png');
  }
  .btn-free,
  .btn-online{
    width: 69px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: #FB683C;
    position: relative;
    top: 10px;
  }
  .btn-free{
    background: #59A8FF;
  }

  /*微信扫码 复制链接*/
  .share-box{
    text-align: center;
  }
  .wx-box p,
  .copy p{
    height: 22px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    padding-left: 21px;
  }
  .icon-wx,
  .icon-copy{
    display: inline-block;
    width: 22px;
    height: 22px;
    margin-right: 12px;
    position: relative;
    background: url('./imgs/icon-copy.png') no-repeat top left;
  }
  .icon-wx{
    width: 26px;
    background-image: url('./imgs/icon-wx.png')
  }

  #qrcode{
    width: 116px;
    height: 116px;
    margin: 0 auto;
    overflow: hidden;
  }

  /*专题课程tab*/
  .tab-box{
    display: block;
    height: 54px;
    line-height: 54px;
    background: #F7F7F7;
    font-size: 0;
    margin-bottom: 20px;
    text-align: left;
  }
  .tab-box span{
    display: inline-block;
    font-size: 16px;
    color: #444444;
    letter-spacing: 0;
    margin-left: 40px;
    cursor: pointer;
  }
  .tab-box span.active{
    color: #FB683C;
  }
  .contain-box{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  /*右侧热门搜索*/
  .aside{
    width: 255px;
    margin-left: 30px;
    font-size: 14px;
    color: #444444;
    letter-spacing: 0;
    flex-shrink:0;
  }
  .title,
  .aside .title{
    font-size: 16px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .contain{
    max-width: 710px;
    width: 100%;
    flex-shrink:1;
  }
  .hot-word{
    font-size: 0;
    text-align: left;
  }
  .hot-word span{
    display: inline-block;
    font-size: 14px;
    color: #FB683C;
    margin-right: 60px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .hot-word span:nth-child(2n+1){
    margin-right: 0;
  }
  .hot-search-list li {
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 20px;
    line-height: 20px;
    cursor: pointer;
  }
  .hot-search-list li .rank{
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: #Fff;
    background: #8EB9F5;
    left: 0;
    top: 0;
  }
  .hot-search-list li:nth-child(1) .rank{
    background: #F54545;
  }
  .hot-search-list li:nth-child(2) .rank{
    background: #FF8547;
  }
  .hot-search-list li:nth-child(3) .rank{
    background: #FFAC38;
  }


</style>
