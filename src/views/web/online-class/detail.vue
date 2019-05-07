<template>
  <div class="online-class-detail common-container-width">
    <div v-if="detail != null">
      <div class="play-box">
        <div v-if="typelist.length>0" class="typelist">
          <span v-for="(item,index) in typelist"
          class="pointer"
          @click="routerGo(item)"
          v-show="item.name"
          :key="index">
            {{item.name}}
            <i>&gt;</i>
          </span>
          <span>{{detail.title}}</span>
        </div>
        <div class="contain">
        <!-- 预览播放图 -->
          <div class="img-box" ref="imgBox">
            <div v-show="isShowIframe" class="iframe-box">
              <iframe
              id="playBox"
              :width="iframe.width"
              :height="iframe.height"
              :src="curUrl"
               frameborder="0"></iframe>
            </div>
            <img v-show="!isShowIframe"
            @click="play()"
            :src="detail.bannerUrl" :alt="detail.title">
            <!-- 评价 购买弹层 -->
            <div v-show="(isShowDialogToBuy ||
             isShowDialogTomes ||
             isShowDialogToIn) && !isShowIframe"
             class="dialog">
              <span class="el-icon-close"
              @click="isShowIframe=true;"
              ></span>
              <div v-show="isShowDialogToIn" class="dialog-buy">
                  <div class="title">
                    权益消耗提醒
                    <p></p>
                  </div>
                  <p>继续观看本课程会消耗您1次线上课程观看权益</p>

                  <div class="btns">
                    <span @click="isShowDialogToIn = false" class="btn-buy">
                      取消
                    </span>
                    <span @click="continueShow" class="btn-sub">继续观看</span>
                  </div>
              </div>


              <div v-show="isShowDialogToBuy" class="dialog-buy">
                  <div class="title">
                    VIP会员专享课程
                    <p>可尊享更多特权与服务</p>
                  </div>
                  <p>还有4个章节未学习</p>

                  <div class="btns">
                    <span @click="goFree('/order')" class="btn-buy">
                      ￥{{detail.price}}购买课程
                    </span>
                    <span @click="goFree('/interests')" class="btn-sub">开通会员免费学</span>
                  </div>
              </div>

              <div v-show="isShowDialogTomes" class="dialog-mes">
                <div class="title">
                  听完课程，给个评价吧
                </div>
                <div class="form">
                  <div class="rate-box">
                    <div class="item">
                      <span class="label">课程内容</span>
                      <el-rate
                        v-model="rate.contentScore"
                        :colors="['#FB683C', '#FB683C', '#FB683C', '#FB683C', '#FB683C']">
                      </el-rate>
                    </div>
                    <div class="item">
                      <span class="label">演讲水平</span>
                      <el-rate
                        v-model="rate.speakingLevel"
                        :colors="['#FB683C', '#FB683C', '#FB683C', '#FB683C', '#FB683C']">
                      </el-rate>
                    </div>
                     <div class="item">
                      <span class="label">听课流畅</span>
                      <el-rate
                        v-model="rate.classFluently"
                        :colors="['#FB683C', '#FB683C', '#FB683C', '#FB683C', '#FB683C']">
                      </el-rate>
                    </div>
                  </div>

                  <!-- 留言框 -->
                  <div class="textarea">
                    <span>其他建议</span>
                    <textarea placeholder="提出您的建议，帮助我们改进"></textarea>
                  </div>
                </div>

                <span @click="insertEvaluateFn" class="btn-sub">提交</span>

              </div>
            </div>
          </div>
        <!-- 章节列表 -->
          <div class="list-box">
            <p>共{{detail.courseVideoEntity.length}}章节&nbsp;
            ({{getTime(detail.courseVideoEntity)}})</p>
            <ul class="list">
              <li v-for="(item,index) in detail.courseVideoEntity"
              :class="{active:index===curIndex}"
              @click="changeVideo(item,index)"
              :key="index">
                <div class="minute-box">
                  <span class="icon-play"></span>
                  <span v-if="index==0" class="name">{{item.name}}</span>
                  <span v-else>第{{index}}章</span>
                  <span class="minite">{{item.videoMinute}}</span>
                </div>
                <div v-if="index>0" class="title">{{item.name}}</div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 收藏评论按钮 -->
        <div class="btns">
          <span
          v-show="detail.isColl"
          :class="{active:detail.isColl}"
          @click="collectFn"
           class="icon-coll">已收藏</span>
           <span class="icon-coll"
           @click="collectFn"
            v-show="!detail.isColl">
             收藏
           </span>
          <span @click="showDialog(0)"
          class="icon-mes">评论</span>
        </div>
      </div>

      <!-- 课程详情 资料下载 课程评价 -->
      <div class="tab-box">
        <span v-for="(item,index) in tablist"
        @click="curTabIndex=index"
        :class="{active:index === curTabIndex}"
        :key="index">
          {{item.name}}
        </span>
      </div>
      <div class="tab-contain">
        <template v-if="curTabIndex == 0">
          <h3>课名： {{detail.title}}</h3>

          <baseTitle title="课程简介"></baseTitle>
          <div class="item" v-html="transferStringFn(detail.teacherBrief)"></div>

          <baseTitle title="课程大纲"></baseTitle>
          <div class="item" v-html="transferStringFn(detail.courseOutline)"></div>

          <baseTitle title="老师简介"></baseTitle>
          <div class="item-box">
            <div class="photo">
              <img :src="detail.teacherAvatar ?
              detail.teacherAvatar : defaultUrl"
              :alt="detail.teacherName">
            </div>
            <div class="item">
              <p class="name">{{detail.teacherName}}</p>
              <p v-html="transferStringFn(detail.teacherBrief)"></p>
            </div>
          </div>

          <baseTitle title="老师教授课程"></baseTitle>

        </template>
        <!-- 资料下载 -->
        <template v-if="curTabIndex == 1">
          <div v-if="detail.coursePreviewEntity.length>0">
            <div class="previewIframe-box">
              <div class="previewIframe">
                <iframe :src="previewIframeSrc" frameborder="0"></iframe>
              </div>
            </div>
            <div class="downLoadIframe">
              <iframe :src="downLoadIframeSrc" frameborder="0"></iframe>
            </div>
            <!-- <Preview :list="detail.coursePreviewEntity"></Preview> -->
           <!--  <div v-if="detail.courseFileEntity.length>0" class="download-box">
              <div v-for="item in detail.courseFileEntity" class="icon-pdf">
                {{item.fileName}}.{{item.fileType}}
                <div class="fr">
                  {{(item.fileSize/1024).toFixed(1)}}M
                  <a :href="item.downloadUrl" class="btn-sub">下载</a>
                </div>
              </div>
            </div> -->
          </div>
          <div class="empty" v-else>
              没有可下载资料
          </div>
        </template>

        <!-- 评价列表 -->
        <template v-if="curTabIndex == 2">
          <div class="good-box">
            <div class="nav">
              <div class="item">
                <span class="active">{{goodDeg}}%</span>
                <p>好评度</p>
              </div>
              <div class="item"
               v-for="(item,index) in goodlist"
               :key="index">
                <el-radio v-model="getEvaluateListParams.isGood"
                @change="radioChange"
                :label="item.value">{{item.name}}
                <span v-if="index==0">({{allNum}})</span>
                <span v-if="index==1">({{goodNum}})</span>
                <span v-if="index==2">({{medNum}})</span>
                <span v-if="index==3">({{badNum}})</span>
                </el-radio>
               </div>
            </div>
            <ul class="eva-list">
              <li v-for="(item,index) in getEvaluateListList"
              :key="index">
                <div class="photo">
                  <img :src="item.userAvatar ? item.userAvatar : defaultUrl" :alt="item.userId">
                </div>
                <div class="item">
                  <el-rate
                    v-model="item.rate"
                    disabled
                    :colors="['#FB683C', '#FB683C', '#FB683C', '#FB683C', '#FB683C']">
                  </el-rate>
                  <p v-if="item.otherTips">{{item.otherTips}}</p>
                </div>
              </li >
              <li class="empty" v-if="getEvaluateListList.length==0">暂无评论</li>
            </ul>

            <el-pagination
              v-if="getEvaluateListTotal>getEvaluateListList.length"
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :pager-count="pagerCount"
              prev-text="上一页"
              next-text="下一页"
              :page-size="getEvaluateListParams.pageSize"
              :total="getEvaluateListTotal">
            </el-pagination>

          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import {
    getCourse,
    getVideoUrl,
    insertEvaluate,
    getGoodEvaluateCount,
    getEvaluateList,
    initCourseRecord,
    saveMyCollection,
    videorights,
} from '@/api/apis';
import baseTitle from '@/views/web/components/base/base-title.vue';
import { transferString } from '@/assets/utils/util';
// import Preview from './preview.vue';

const defaultPhotoUrl = require('@/views/imgs/default.png');

export default {
    name: 'online-class-detail',
    data() {
        return {
            name: 'online-class-detail',
            previewIframeSrc: 'https://live.xiucai.com:8890/Yumi4Sina/s/services/Res4View/b0e1b734e3f81b20830fa889a4396417', // 文件预览
            downLoadIframeSrc: 'http://www.baidu.com', // 第三方下载
            isShowDialogToBuy: false, // 是否显示购买弹窗
            isShowDialogTomes: false, // 是否显示评价弹窗
            isShowDialogToIn: false, // 消耗权益弹窗
            defaultUrl: defaultPhotoUrl, // 默认头像
            rate: { // 评分 内容  水平 流畅 其他意见
                contentScore: 3,
                speakingLevel: 3,
                classFluently: 3,
                otherTips: '',
            },

            detail: null,
            url: '', // 视频播放地址
            curIndex: 0, // 当前播放章节
            isShowIframe: false,
            curUrl: '',
            iframe: {
                width: '100%',
                height: '100%',
            },
            curTabIndex: 0,
            tablist: [
                { name: '课程详情' },
                { name: '资料下载' },
                { name: '课程评价' },
            ],
            typelist: [],
            courseId: '', // 课程id
            type: '1', // 课程类型1线上视频课 2线下课 3线上专题课
            videoId: '', // 视频id
            getEvaluateListParams: {
                isGood: '',
                pageSize: 20,
                pageNum: 1,
            },
            pagerCount: 11, // 最多多少页出现...
            getEvaluateListTotal: 0,
            getEvaluateListList: [], // 评价列表
            goodNum: 0, // 好评数
            medNum: 0, // 好评数
            badNum: 0, // 好评数
            allNum: 0, // 好评数
            goodlist: [ // 好评度
                {
                    name: '全部评价',
                    value: '',
                    total: 0,
                },
                {
                    name: '好评',
                    value: '0',
                },
                {
                    name: '中评',
                    value: '1',
                },
                {
                    name: '差评',
                    value: '2',
                    total: 0,
                },
            ],
            initCourseRecordTimer: {},
            saveMyCollectionParam: { // 收藏参数
                courseId: '', // 课程id
                onOffType: '1', // 线上线下0 : 线下课； 1 线上课
            },
            sec: 0, // 已经播放时间  秒为单位
            curPlayItem:null,
            curPlayIndex:0,
        };
    },
    beforeRouteLeave(to, from, next) {
        console.log(to, from, '清除定时器');
        Object.keys(this.initCourseRecordTimer).forEach((key) => {
            clearInterval(this.initCourseRecordTimer[key]);
        });
        next();
    },
    mounted() {
        this.init();
    },
    computed: {
        goodDeg() {
            if (this.allNum !== 0) {
                return parseInt((this.goodNum / this.allNum) * 100, 10);
            }
            return 0;
        },
    },
    methods: {
        init() {
            // 获取公开课详情
            this.courseId = parseInt(this.$route.query.id,10) || '';
            this.getCourseFn();
            // 获取评价列表
            this.getEvaluateListFn('init');
            // 获取好评总次数
            this.getGoodEvaluateCountFn();
            // 已经播放时间
            this.sec = this.$route.query.sec || 0;

            
        },
        transferStringFn(str) {
            return transferString(str) || '';
        },
        continueShow() {
            // 消耗权益继续观看
        },
        routerGo(item) {
            this.$router.push({ path: '/online-class', query: { nid: item.id } });
        },
        goFree(path) {
            // 免费学  立即购买
            if (!this.token) {
                this.$message({
                    message: '您还没有登录，请先登录',
                    type: 'warning',
                });
                return;
            }
            this.$router.push({
                path,
                query: {
                    id: this.courseId,
                    type: this.type,
                },
            });
        },
        collectFn() {
            // 点击收藏
            this.saveMyCollectionParam.courseId = this.courseId;
            this.saveMyCollectionFn();
        },
        saveMyCollectionFn() {
            // 收藏 如果未登录  提示去登陆
            if (!this.token) {
                this.$message({
                    message: '您还没有登录，请先登录',
                    type: 'warning',
                });
                return;
            }

            saveMyCollection(this.saveMyCollectionParam).then((res) => {
                if (res.data.code === '0000') {
                    this.detail.isColl = !this.detail.isColl;
                }
            }).catch((err) => {
                console.log(err);
                this.$message({
                    message: '服务器错误，请稍后再试',
                    type: 'warning',
                });
            });
        },
        initCourseRecordFn() {
            // 同步播放请求定时器
            if (this.initCourseRecordTimer[this.videoId]) {
                clearInterval(this.initCourseRecordTimer[this.videoId]);
            }

            this.initCourseRecordTimer[this.courseId] = setInterval(() => {
                initCourseRecord({
                    course_id: this.courseId,
                    video_id: this.videoId,
                }).then((res) => {
                    if (res.data.code === '0001') {
                        clearInterval(this.initCourseRecordTimer[this.videoId]);
                    }
                });
            }, 60 * 1000);
        },
        getGoodEvaluateCountFn() {
            // 获取好评总次数
            if (this.courseId) {
                getGoodEvaluateCount({ courseId: this.courseId }).then((res) => {
                    if (res.data.code === '0000' && res.data.evaluate) {
                        this.goodNum = res.data.evaluate.goodNum;
                        this.medNum = res.data.evaluate.medNum;
                        this.badNum = res.data.evaluate.badNum;
                        this.allNum = res.data.evaluate.allNum;
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        message: '获取好评次数失败，请稍后再试',
                        type: 'warning',
                    });
                });
            }
        },
        
        getVideoUrlFn() {
            // 获取视频地址

            let { courseId, videoId } = this;
            if (videoId && courseId) {
                getVideoUrl({ courseId, videoId }).then((res) => {
                    if (res.data.code === '0000') {
                        this.curUrl = res.data.videoUrl;
                        this.isShowIframe = true;
                        this.getList();
                    }
                }).catch((err) => {
                    console.log(err);
                    this.isShowIframe = false;
                    this.$message({
                        message: '获取视频播放地址失败，请稍后再试',
                        type: 'warning',
                    });
                });
            }
        },
        startPlay() {

            // 开始播放
            this.courseId = this.curPlayItem.courseId;
            this.videoId = this.curPlayItem.id;
            this.getVideoUrlFn();
            this.curIndex = this.curPlayIndex;
            // 开启同步播放记录
            this.initCourseRecordFn();
        },
        changeVideo(item, index) {
            this.curPlayItem = item;
            this.curPlayIndex = index;
            if (item.isTry === 0 && this.detail.payType === 0) {
                // 如果不是试听章节 且需要付费时 判断当前用户是否有听课权力
                this.checkUserIsCanPlay();
            } else if (item.isTry === 1) {
                // 如果是试听章节
                this.startPlay();
            } else if (this.token) {
                // 不是试听，但是免费的 登录后才可以观看
                this.startPlay();
            } else {
            // 未登录
                this.$message({
                    message: '该章节需要登录才可以继续观看',
                    type: 'warning',
                });
            }
        },
        checkUserIsCanPlay() {
            // 判断用户是否登录
            if (this.token) {
            // token 存在  查看是否可以播放  去购买  消耗权益提醒
                console.log(this.token, item, index);
                // 查询视频播放权限code"1000";可以观看   "1001";
              //不是会员   "1002";//没有权限
              videorights({courseId:this.courseId}).then((res) => {
                  if(res.data.code === '1000'){
                    // 可以观看
                    this.startPlay();
                  }else if(res.data.code === '1001' || 
                    res.data.code === '1002'){
                    this.showDialog(2);
                  }else if(res.data.code === '1003'){
                    // 消耗权益
                    this.showDialog(1);
                  }
              }).catch((err) => {
                  console.log(err);
                  this.$message({
                      message: '服务器错误，请稍后再试',
                      type: 'warning',
                  });
              });
            }
        },
        showDialog(type) {
            this.isShowIframe = false;
            this.isShowDialogTomes = false;
            this.isShowDialogToBuy = false;
            this.isShowDialogToIn = false;
            if (type === 0) {
            // 展示评论
                this.isShowDialogTomes = true;
            } else if (type === 1) {
                // 展示消耗权益
                this.isShowDialogToIn = true;
            } else if (type === 2){
            // 展示购买
                this.isShowDialogToBuy = true;
            }
        },
        play() {
            if (this.sec > 0) {
                // 计算当前播放秒数处在第几个播放时间段内
                let flag = true;
                let cursec = 0;
                this.detail.courseVideoEntity.forEach((item, index) => {
                    cursec += parseInt(item.videoMinute, 10) * 60;
                    console.log(cursec);
                    if (this.sec <= cursec && flag) {
                        this.curIndex = index;
                        flag = false;
                    }
                });
                console.log(this.curIndex);
            } else {
                // 如果当前播放时间小于0
                this.curIndex = 0;
            }
            let item = this.detail.courseVideoEntity[this.curIndex];
            this.changeVideo(item, this.curIndex);
        },
        getTime(list) {
            let num = 0;
            list.forEach((item) => {
                num += parseInt(item.videoMinute, 10);
            });
            return `${parseInt(num / 60, 10)}小时${num % 60}分钟`;
        },
        getList() {
            // 获取顶部面包屑
            this.typelist = [
                {
                    id: this.detail.direction,
                    name: this.detail.directionName,
                },
                {
                    id: this.detail.major,
                    name: this.detail.majorName,
                },
                {
                    id: this.detail.category,
                    name: this.detail.categoryName,
                },
            ];
        },
        radioChange(val) {
            console.log(val);
            this.getEvaluateListFn('init');
        },
        handleCurrentChange(val) {
            this.getEvaluateListParams.pageNum = val;
            this.getEvaluateListFn();
        },
        initMes() {
            // 更新评价列表数据
            console.log('更新列表');
        },
        insertEvaluateFn() {
            // 提交课程评价
            let params = {
                courseId: this.courseId,
                ...this.rate,
            };
            if (this.courseId) {
                insertEvaluate(params).then((res) => {
                    if (res.data.code === '0000') {
                        // console.log(res);
                        this.isShowIframe = true;
                        this.$message({
                            message: '评价成功',
                            type: 'success',
                        });
                        this.initMes();
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        message: '提交课程评价失败，请稍后再试',
                        type: 'warning',
                    });
                });
            }
        },
        getEvaluateListFn(t) {
            if (t === 'init') {
                this.getEvaluateListParams.pageNum = 1;
            }
            // 获取评价列表
            if (this.courseId) {
                getEvaluateList(
                    {
                        courseId: this.courseId,
                        ...this.getEvaluateListParams,
                    },
                ).then((res) => {
                    if (res.data.code === '0000') {
                        this.getEvaluateListTotal = res.data.total;
                        this.getEvaluateListList = res.data.list;
                        /*eslint-disable*/ 
                        this.getEvaluateListList.forEach((item) => {
                            item.rate = parseInt((item.contentScore + 
                              item.speakingLevel + 
                              item.classFluently) / 3, 10);
                        });
                        /* eslint-enable */
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        message: '评价列表获取失败',
                        type: 'warning',
                    });
                });
            }
        },
        getCourseFn() {
            // 获取公开课详情
            if (this.courseId) {
                getCourse({ id: this.courseId }).then((res) => {
                    if (res.data.code === '0000') {
                        /*eslint-disable*/ 
                        // favorite字段，是否收藏 0否 1是 默认0
                        res.data.course[0].isColl = res.data.course[0].favorite === 1;
                        this.detail = res.data.course[0];

                       /* eslint-enable */
                        if (this.detail) {
                            this.getList();
                            if (!this.isShowIframe) {
                                this.play();
                            }
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        message: '线上课详情获取失败，请稍后再试',
                        type: 'warning',
                    });
                });
            }
        },
    },
    components: {
        baseTitle,
        // Preview,
    },
};
</script>
<style scoped>
.empty{
  padding: 20px 0;
  font-size: 16px;
}
.eva-list .empty{
  margin-top: 0;
}
/*下载*/
.previewIframe-box{
  width: 100%;
  height: 710px;
  overflow-x: auto;
  overflow-y: hidden;
}
.previewIframe{
  display: block;
  width: 1100px;
  height: 700px;
}
.downLoadIframe{
  width: 100%;
  height: 200px;
}
.downLoadIframe iframe,
.previewIframe iframe{
  width: 100%;
  height: 100%;
}
.download-box{
  margin-top: 20px;
}
.icon-pdf{
  border-top: 1px solid #D4D4D4;
  padding-top: 24px;
  display: block;
  position: relative;
  width: 100%;
  box-sizing:border-box;
  min-height: 30px;
  line-height: 30px;
  padding-left: 33px;
  background: url('./imgs/pdf4.png') no-repeat left 26px;
  background-size:23px auto;
  font-size: 16px;
color: #444444;
text-align: left;
overflow: hidden;
}
.icon-pdf .fr{
  float: right;
  position: relative;
  padding-right: 118px;
}
.icon-pdf .fr .btn-sub{
  margin: 0;
  position: absolute;
  right: 0;
  top: 0;
  text-decoration: none;
}
/*评价列表*/
.good-box .nav{
  display: flex;
  background: #F7F7F7;
  align-items: center;
  justify-content: flex-start;
  height: 54px;
  margin-top: 20px;
}
.good-box .nav .item{
  margin-left: 40px;
  text-align: center;
}
.good-box .nav .active{
  color: #FB683C;
}
/*购买 评价弹窗*/
.dialog{
  background: rgba(0,0,0,0.75);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5;
}
.dialog-mes .title{
  margin-top: 40px;
  margin-bottom: 30px;
  font-size: 16px;
  text-align: center;
}
.dialog-buy {
  text-align: center;
}
.dialog-buy .title{
  font-size: 26px;
  margin-bottom: 88px;
  margin-top: 70px;
}
.dialog-buy .title p{
  font-size: 14px;
  padding-top: 10px;
}
.dialog-buy .btns{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 294px;
  margin: 30px auto;
}
.dialog-buy .btn-sub,
.dialog-buy .btn-buy{
  width: 132px;
  height: 30px;
  box-sizing:border-box;
  color: #FB683C;
  border: 1px solid #FB683C;
  margin: 0;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
  border-radius: 30px;
}
.dialog-buy .btn-sub{
  color: #Fff;
}

.rate-box .item{
  position: relative;
  padding-left: 106px;
  margin-bottom: 20px;
}
.rate-box .item .label{
  position: absolute;
  left: 20px;
  top: 0;
  font-size: 14px;
}
.dialog-mes .form{
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}
.textarea{
  width: 286px;
  height: 188px;
}
.textarea textarea{
  display: block;
  width: 100%;
  height: 158px;
  background: #F7F7F7;
border: 1px solid #D4D4D4;
border-radius: 4px;
box-sizing:border-box;
padding: 10px 20px;
margin-top: 10px;
 outline: none;
 color: #444;
 font-size: 14px;
}


/*顶部播放盒子*/
.iframe-box{
  width: 100%;
  height: 100%;
}
.play-box{
  display: block;
  width: 100%;
  background: #363636;
  height: 480px;
  padding: 20px 0px 20px 30px;
  box-sizing:border-box;
  color: #fff;
  font-size: 14px;
}
.typelist{
  letter-spacing: -0.34px;
  text-align: center;
  margin-bottom: 20px;
  text-align: left;
}
.contain{
  width: 100%;
  position: relative;
  display: block;
  padding-left: 640px;
  height: 360px;
  box-sizing:border-box;
}
.img-box{
  position: absolute;
  left: 0;
  top: 0;
  width: 640px;
  height: 360px;
}
.img-box img{
  display: block;
  width: 640px;
  height: 360px;
  cursor: pointer;
}
.list-box{
  width: 100%;
}
.list-box p{
  padding-left: 30px;
  margin-bottom: 20px;
}
.list{
  display: block;
  width: 100%;
  height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
}
.list li{
  display: block;
  position: relative;
  padding: 20px 30px;
  width: 100%;
  background: #555555;
  border: 1px solid #383838;
  border-radius: 2px;
  line-height: 20px;
  color: #fff;
  box-sizing:border-box;
  margin-bottom: 20px;
  cursor: pointer;
}
.list li.active{
  color: #FB683C;
}
.list li .icon-play{
  display: block;
  width: 20px;
  height: 20px;
  background: url('./imgs/icon-play-off.png') no-repeat top left;
  float: left;
  margin-right: 10px;
}
.list li.active .icon-play{
  background-image: url('./imgs/icon-play-on.png');
}
.list li .title{
  text-align: left;
  clear: both;
  margin-top: 10px;
}
.btns{
  text-align: left;
  overflow: hidden;
  margin-top: 20px;
}
.icon-mes,
.icon-coll{
  display: block;
  float: left;
  padding-left: 30px;
  background: url('./imgs/icon-coll-off.png') no-repeat left center;
  min-height: 20px;
  cursor: pointer;
}
.icon-mes{
  background-image: url('./imgs/icon-mes.png');
  margin-left: 40px;
}
.icon-coll.active{
  color: #FB683C;
  background-image: url('./imgs/icon-coll-on.png');
}
/*课程详情 资料下载 课程评价*/
.tab-box{
  display: block;
  width: 100%;
  border-bottom: 1px solid #d4d4d4;
  margin-top: 30px;
  overflow: hidden;
  font-size: 16px;
  color: #444;
}
.tab-box .active{
  color: #FB683C;
}
.tab-box span{
  display: block;
  float: left;
  position: relative;
  cursor: pointer;
  width: 70px;
  margin-right: 40px;
  padding-bottom: 10px;
}
.tab-box .active:after{
  content: "";
  display: block;
  width: 64px;
  height: 3px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #FB683C;
  border-radius: 100px;
}
.tab-contain h3{
  margin-top: 20px;
  color: #444444;
  font-size: 16px;
}
.title-box{
  margin-top: 30px;
  margin-bottom: 22px;
}
.tab-contain .item{
  font-size: 14px;
  line-height: 22px;
}
.tab-contain .item-box{
  min-height: 107px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 10px;
}
.eva-list .photo,
.tab-contain .item-box .photo{
  width: 107px;
  height: 107px;
  border-radius: 100%;
  overflow: hidden;
    flex-shrink:0;
  flex-grow:0;
   margin-right: 30px;
}
.eva-list .photo{
  width: 80px;
  height: 80px;

}
.eva-list li{
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.tab-contain .photo img{
  width: 100%;
  height: auto;
}
.tab-contain .item-box .item{
  flex-grow:0;
}
.tab-contain .name{
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
