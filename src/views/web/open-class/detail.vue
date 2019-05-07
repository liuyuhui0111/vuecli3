<template>
  <div class="open-class common-container-width common-open-class-detail">
    <div v-if="detailData" class="contain-box">
      <div class="contain">
        <!-- 详情图片 分享 收藏 在线报名 免费学 -->
        <div class="img-box">
          <img :src="detailData.pic" alt="detailData.title">
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
                  <div class="qrcode">
                    <Qrcode docId="qrcode"
                    :width="qrcodeWidth"
                    :url="copyurl"
                    :logourl="logourl"
                    ></Qrcode>
                  </div>
                </div>
              </div>
            </el-popover>

            <span class="icon-collect"
            @click="collectFn"
            :class="{active:detailData.isColl}"></span>


            <span @click="isShowFormDialog=true" class="btn-online">在线报名</span>
            <span v-show="isShowFreeBtn" @click="goFree('/interests')" class="btn-free">免费学</span>
          </div>
        </div>


            <!-- 课程锚点列表 -->
        <div class="tab-box">
            <a v-for="(item,index) in tablist"
            @click="changeTab(index,item)"
            :class="{active:index == tabindex}"
            :key="index">
                {{item.text}}
            </a>
        </div>

        <!-- 课程详情 -->
        <div class="tab-contain">
          <div class="item"
          v-for="(item,index) in tablist"
          :key="index">
            <div :id="item.id" class="title">
              <baseTitle :title="item.text"></baseTitle>
            </div>
            <!-- 课程信息 -->
            <template v-if="item.text === '课程信息'">
              <div class="class-mes">
              <p>课程天数：{{getDay}} 天</p>
              <p>课程价格：{{detailData.price}} 元</p>
              <p>培训对象：{{detailData.trainObject}}</p>
              <p>培训时间：{{getTime}}</p>
              <p>培训地点：{{detailData.address}}</p>
              <p>咨询电话：{{detailData.hotline}}</p>
              </div>
            </template>
            <!-- 其他 -->
            <p v-if="item.key" class="intro"
            v-html="transferStringFn(detailData[item.key])"></p>


            <!-- 预约报名 -->
            <template v-if="item.text === '预约报名'">

            <div class="intro form">
              <div class="form-box">
                  <el-form
                ref="onlineFormSign"
                :rules="rules"
                :label-position="labelPosition"
                label-width="60px"
                :model="onlineForm">
                  <el-form-item label="称呼" prop="name">
                    <el-input v-model="onlineForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="tel">
                    <el-input v-model="onlineForm.tel"></el-input>
                  </el-form-item>
                  <el-form-item label="公司" prop="comp">
                    <el-input v-model="onlineForm.comp"></el-input>
                  </el-form-item>
                   <el-form-item label="职位" prop="work">
                    <el-input v-model="onlineForm.work"></el-input>
                  </el-form-item>
                  </el-form>
                </div>
               <div class="mes-box">
                <p>您要咨询的内容</p>
                <el-form
                ref="textareaForm"
                :rules="rules"
                :label-position="labelPosition"
                label-width="0px"
                :model="onlineForm">
                <el-form-item prop="message">
                  <el-input type="textarea"
                  rules="[{
                            min: 2,
                            max: 300,
                            message: '长度在 2 到 300 个字符',
                            trigger: 'blur',
                            required:true,
                        }]"
                  placeholder="请输入您的问题"
                   v-model="onlineForm.message"></el-input>
                </el-form-item>
              </el-form>
              </div>

            </div>

            <span @click="submitForm('onlineFormSign')" class="btn-sub">提交信息</span>
            </template>

          </div>

        </div>

      </div>
    <!-- 右侧热门搜索 -->
      <div class="aside">

        <!-- 热门搜索 -->
        <div class="hot-search">
          <p class="title">在线训练营</p>
          <ul class="hot-search-list">
            <li v-for="(item,index) in hotSearchList"
            @click="routerGo(item)"
            :key="index">
              <span class="rank"></span>
              <p>{{item.courseOfflineEntity.title}}</p>
            </li>
          </ul>
        </div>
      </div>


        <!-- 在线报名弹窗 -->
        <div class="dialog-online" v-show="isShowFormDialog">
          <span @click="isShowFormDialog=false" class="el-icon-close"></span>
          <h3>在线报名</h3>

            <div class="intro form">
              <div class="form-box">
                  <el-form
                  ref="formDialog"
                  :rules="rules"
                  :label-position="labelPosition"
                  label-width="60px"
                  :model="onlineForm">
                  <el-form-item label="称呼" prop="name">
                    <el-input v-model="onlineForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="tel">
                    <el-input v-model="onlineForm.tel"></el-input>
                  </el-form-item>
                  <el-form-item label="公司" prop="comp">
                    <el-input v-model="onlineForm.comp"></el-input>
                  </el-form-item>
                   <el-form-item label="职位" prop="work">
                    <el-input v-model="onlineForm.work"></el-input>
                  </el-form-item>
                  </el-form>
                  <div class="mes-box">
                    <p>您要咨询的内容</p>
                    <el-form label-width="0px">
                      <el-form-item prop="message">
                        <el-input type="textarea"
                        rules="[{
                                  min: 2,
                                  max: 300,
                                  message: '长度在 2 到 300 个字符',
                                  trigger: 'blur',
                                  required:true,
                              }]"
                        placeholder="请输入您的问题"
                         v-model="onlineForm.message"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                <div class="class-box">
                  <div class="img-box">
                    <img :src="detailData.pic" :alt="detailData.title">
                    <p class="ellipsis2">{{detailData.title}}</p>
                  </div>
                  <p class="address">上课地点：{{detailData.address}}</p>
                  <p class="time">上课时间：{{getTime}}</p>
                </div>

            </div>
             <span @click="submitForm('formDialog')" class="btn-sub">提交信息</span>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-show="isShowFormDialog"></div>

  </div>
</template>
<script>
import Qrcode from '@/views/web/components/qrcode/qrcode.vue';
import { setScrollTop, transferString } from '@/assets/utils/util';
import { validByPhone } from '@/assets/utils/validator';
import baseTitle from '@/views/web/components/base/base-title.vue';
import {
    findOfflineCourseById,
    showCourseOffline,
    offlineCourseSignUp,
    saveMyCollection,
} from '@/api/apis';
import { formatDate } from '@/assets/utils/timefn';

export default {
    name: 'detail',
    data() {
        return {
            name: '详情页',
            qrcodeWidth: 116,
            logourl: `${window.location.origin}/logo.png`,
            copyurl: '',
            isShowFormDialog: false,
            showShare: false,
            tabindex: 0, // 当前选中tab index
            tablist: [ // tab列表
                { text: '课程信息', id: '1', key: '' },
                { text: '课程介绍', id: '2', key: 'introduce' },
                { text: '课程大纲', id: '3', key: 'outline' },
                { text: '课程计划', id: '4', key: 'plan' },
                { text: '预约报名', id: 'online', key: '' },
            ],
            labelPosition: 'right',
            onlineForm: { // 在线报名表单
                name: '',
                tel: '',
                comp: '',
                work: '',
                message: '',
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入称呼',
                        trigger: 'blur',
                    },
                    {
                        min: 2,
                        max: 30,
                        message: '长度在 1 到 30 个字符',
                        trigger: 'blur',
                    },
                ],
                tel: [
                    {
                        required: true,
                        message: '请输入电话号码',
                        trigger: 'blur',
                    },
                    {
                        min: 11,
                        max: 11,
                        message: '长度在11个字符',
                        trigger: 'blur',
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (!validByPhone(value)) {
                                callback(new Error());
                            } else {
                                callback();
                            }
                        },
                        message: '手机号格式不对',
                    },
                ],
                comp: [
                    {
                        required: true,
                        message: '请输入公司名称',
                        trigger: 'blur',
                    },
                    {
                        min: 2,
                        max: 100,
                        message: '长度在 2 到 100 个字符',
                        trigger: 'blur',
                    },
                ],
                work: [
                    {
                        min: 2,
                        max: 30,
                        message: '长度在 2 到 30 个字符',
                        trigger: 'blur',
                    },
                ],
                message: [
                    {
                        min: 2,
                        max: 300,
                        message: '长度在 2 到 300 个字符',
                        trigger: 'blur',
                    },
                ],
            },
            hotSearchList: [], // 在线训练营
            detailData: null,
            courseId: 1,
            saveMyCollectionParam: { // 收藏参数
                courseId: '', // 课程id
                onOffType: '1', // 线上线下0 : 线下课； 1 线上课
            },
            isCanSendApi: true,
            isShowFreeBtn: false,
            type: 2, // 1线上视频课 2线下课 3线上专题课
        };
    },
    mounted() {
        this.init();
    },
    watch: {
        $route() {
            this.init();
        },
    },
    computed: {
        getDay() {
            return this.detailData.endTime - this.detailData.startTime;
        },
        getTime() {
            return `${formatDate(this.detailData.startTime)}~${formatDate(this.detailData.endTime)}`;
        },
    },
    methods: {
        init() {
            this.detailData = null;
            this.courseId = parseInt(this.$route.query.id, 10);
            // 是否登录 初始化显示免费学btn
            if (!this.token) {
                this.isShowFreeBtn = true;
            } else {
                this.isShowFreeBtn = !!this.commonUserData.userName;
            }
            // 初始化二维码
            this.copyurl = `${window.location.origin}/h5/index?id=${this.courseId}`;
            // 获取详情内容
            this.findOfflineCourseByIdFn();
            // 获取在线训练营
            this.showCourseOfflineFn();
        },
        transferStringFn(str) {
            return transferString(str) || '';
        },
        goFree(path) {
            // 免费学
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
        routerGo(item) {
            this.$router.push({ path: '/detail', query: { id: item.id } });
        },
        collectFn() {
            // 点击收藏
            this.saveMyCollectionParam.courseId = this.courseId;
            if (this.isCanSendApi) {
                this.isCanSendApi = false;
            } else {
                return;
            }
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
                this.isCanSendApi = true;
                if (res.data.code === '0000') {
                    this.detailData.isColl = !this.detailData.isColl;
                }
            }).catch((err) => {
                this.isCanSendApi = true;
                console.log(err);
                let message = '收藏失败，请稍后再试';
                if (this.detailData.isColl) {
                    message = '取消收藏失败，请稍后再试';
                }
                this.$message({
                    message,
                    type: 'warning',
                });
            });
        },
        offlineCourseSignUpFn() {
            // 线上课在线报名提交表单

            let params = {
                company: this.onlineForm.comp,
                offlineCourseId: this.courseId,
                name: this.onlineForm.name,
                phone: this.onlineForm.tel,
                job: this.onlineForm.work,
                content: this.onlineForm.message,
            };
            offlineCourseSignUp(params).then((res) => {
                if (res.data.code === '0000') {
                    // this.detailData = res.data.data
                    if (res.data.id) {
                        // 跳转报名成功页
                        this.$router.push({
                            path: '/success',
                            query: {
                                sid: res.data.id,
                                id: this.courseId,
                                type: this.type,
                            },
                        });
                    }
                }
            }).catch((err) => {
                console.log(err);
                this.$message({
                    message: '公开课详情获取失败，请稍后再试',
                    type: 'warning',
                });
            });
        },
        showCourseOfflineFn() {
            // 获取在线训练营
            showCourseOffline().then((res) => {
                console.log(res);
                if (res.data.code === '0000') {
                    // this.detailData = res.data.data
                    this.hotSearchList = res.data.list;
                }
            }).catch((err) => {
                console.log(err);
                this.$message({
                    message: '公开课详情获取失败，请稍后再试',
                    type: 'warning',
                });
            });
        },
        findOfflineCourseByIdFn() {
            // 获取公开课详情
            if (this.courseId) {
                findOfflineCourseById({ id: this.courseId }).then((res) => {
                    if (res.data.code === '0000' && res.data.data) {
                        res.data.data.isColl = res.data.isFavorite && res.data.isFavorite.code === '8888';
                        this.detailData = res.data.data;
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        message: '公开课详情获取失败，请稍后再试',
                        type: 'warning',
                    });
                });
            }
        },
        changeTab(index, item) {
            this.tabindex = index;
            this.scrollToDom(item);
        },

        scrollToDom(item) {
            // 滚动条滚动到指定元素位置
            const obj = document.getElementById(item.id);
            if (obj) {
                const top = obj.offsetTop;
                setScrollTop(top);
            }
        },

        copyFn() {
            // 复制链接
            try {
                const input = document.getElementById('copy');
                input.select(); // 选中文本
                document.execCommand('copy'); // 执行浏览器复制命令
                this.$message({
                    message: '复制成功',
                    type: 'success',
                });
            } catch (e) {
                console.log(e);
                this.$message.error(`该浏览器不支持复制，请手动选择复制：${this.copyurl}`);
            }
        },

        submitForm(formName) {
            // 表单提交
            console.log(this.token);
            if (!this.token) {
                this.$message({
                    message: '您还没有登录，请先登录',
                    type: 'warning',
                });
                return;
            }
            let curForm = this.$refs[formName].validate
                ? this.$refs[formName]
                : this.$refs[formName][0];
            curForm.validate((valid) => {
                if (!valid) {
                    console.log('提交失败');
                } else {
                    this.offlineCourseSignUpFn();
                }
            });
        },


    },
    components: {
        baseTitle,
        Qrcode,
    },
};
</script>
<style scoped>
/*在线学习弹框*/

.dialog-online{
  background: #FFFFFF;
  border: 1px solid #979797;
  border-radius: 8px;
  width: 738px;
  min-height: 537px;
  position: absolute;
  left: 50%;
  top: 20%;
  transform:translate(-50%,0);
  z-index: 100;
  padding: 10px;
  box-sizing:border-box;
}
.dialog-online h3{
  text-align: center;
  margin: 20px auto 30px auto;
  font-size: 16px;
  color: #444444;
  letter-spacing: -0.39px;
  text-align: center;
}

.class-box{
  width: 382px;
  font-size: 14px;
  color: #FB683C;
}
.class-box .img-box{
  overflow: hidden;

}
.class-box .img-box img{
  float: left;
  width: 178px;
  margin-right: 20px;
}
.class-box .ellipsis2{
  height: 40px;
  line-height: 20px;
  font-size: 14px;
  color: #444444;
}
.address{
  margin-bottom: 10px;
}
/*复制链接*/
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
    min-height: 200px;
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
    top: 12px;
    left: -2px;
    background-size:20px auto;
    background-image: url('./imgs/icon-coll-off.png');
  }
  .icon-collect.active{
    top: 12px;
    left: -2px;
    background-size:20px auto;
    background-image: url('./imgs/icon-coll-on.png');
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

  .qrcode{
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
  .tab-box a{
    display: inline-block;
    font-size: 16px;
    color: #444444;
    letter-spacing: 0;
    margin-left: 40px;
    cursor: pointer;
    text-decoration: none;
  }
  .tab-box a.active{
    color: #FB683C;
  }
  .contain-box{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .contain-box .item{
    padding-bottom: 30px;
  }
  .contain-box .item .title{
    width: 100%;
  }


  .contain-box h4{
    font-size: 14px;
    color: #FB683C;
    margin-bottom: 10px;
  }

  .class-mes{
    font-size: 14px;
  }
  .class-mes p{
    margin-bottom: 10px;
  }
  /*提交表单*/
  .form{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .form .form-box{
    width: 300px;
  }
  .form .mes-box{
    width: 360px;
    height: 192px;
    padding-top: 30px;
    position: relative;
    box-sizing:border-box;
  }
  .dialog-online .mes-box{
    width: 280px;
    left: 20px;
  }
  .form .mes-box p{
    position: absolute;
    top: 0;
    left: 0;
    text-align: left;
    font-size: 14px;
    line-height: 20px;
  }


  /*右侧标题列表*/
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
    padding-left: 10px;
    margin-bottom: 10px;
    line-height: 20px;
    cursor: pointer;
  }
  .hot-search-list li .rank{
    display: block;
    position: absolute;
    width: 4px;
    height: 4px;
    text-align: center;
    line-height: 0;
    color: #Fff;
    background: #444;
    left: 0;
    top: 8px;
    font-size: 0;
    border-radius: 100%;
  }


</style>
