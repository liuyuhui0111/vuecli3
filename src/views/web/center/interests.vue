<template>
  <div class="interests common-container-width">
    <div class="title">
      <h3>财税课堂会员   享专属特权</h3>
      <p>开通会员尊享课程资源免费观看，还有更多特权服务</p>
    </div>
    <div v-if="lvList.length>0" class="contain-box">
      <div class="item" v-for="(item,index) in lvList"
      :class="{empty:item == null}"
      :key="index">
        <template v-if="item != null">
        <h3 class="level">{{item.name}}会员</h3>
        <p class="intro ellipsis2">{{item.remark}}</p>
        <ul v-if="item.equityDtoList" class="list">
          <li v-for="(list,index) in item.equityDtoList"
          :class="{active:list.tickType === 1}"
          :key="index">
            {{list.name}}
          </li>
        </ul>
        <span @click="goOrder(item)" class="btn-sub">{{item.fee}}/年</span>
        </template>
      </div >
    </div>

    <!-- 让售前经理联系表单 -->
    <div class="form">
      <h3>让售前经理联系我</h3>
      <el-form :inline="true"
      :rules="rules"
      ref="ruleInterForm"
      :model="formInline"
      class="form-inline">
        <div class="form-line">
          <el-form-item label=""
          prop="name">
            <el-input v-model.trim="formInline.name" placeholder="请输入你的姓名"></el-input>
          </el-form-item>
          <el-form-item label=""
          prop="company">
            <el-input v-model.trim="formInline.company" placeholder="请输入你的公司名称"></el-input>
          </el-form-item>
        </div>
        <div class="form-line">
          <el-form-item label=""
          prop="phone">
            <el-input v-model.trim="formInline.phone" placeholder="请输入你的电话"></el-input>
          </el-form-item>
          <el-form-item label=""
          prop="job">
            <el-input v-model.trim="formInline.job" placeholder="请输入你的职务"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span @click="submitForm('ruleInterForm')" class="btn-sub">提交</span>
    </div>
  </div>
</template>
<script>
import mixin from './js/mixin';
import { addcontactMe, queryList } from '@/api/apis';
import { getTokenFn, initList } from '@/assets/utils/util';
import { validByPhone } from '@/assets/utils/validator';

export default {
    name: 'interests',
    mixins: [mixin],
    data() {
        return {
            name: 'interests',
            formInline: {
                name: '',
                company: '',
                phone: '',
                job: '',
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur',
                    },
                    {
                        min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur',
                    },
                ],
                company: [
                    {
                        min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur',
                    },
                ],
                job: [
                    {
                        min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur',
                    },
                ],
                phone: [
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
            },
            lvList: [],

            courseId: '',
            type: 2, // 1线上视频课 2线下课 3线上专题课
            isCanReq: true,
        };
    },
    beforeRouteEnter(to, from, next) {
        if (getTokenFn()) {
            next();
        } else {
            next(from);
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.courseId = parseInt(this.$route.query.id, 10);
            this.type = parseInt(this.$route.query.type, 10) || 2;
            // 查询会员权益
            this.queryListFn();
        },
        queryListFn() {
            // 查询会员权益列表
            queryList().then((res) => {
                if (res.data.code === '0000') {
                    this.lvList = initList(res.data.list, 4);
                    console.log(this.lvList);
                }
            }).catch((err) => {
                console.log(err);
                this.$message({
                    message: '获取会员权益信息失败，请稍后再试',
                    type: 'warning',
                });
            });
        },
        addcontactMeFn() {
            // 提交表单
            if (this.isCanReq) {
                this.isCanReq = false;
            } else {
                return;
            }
            addcontactMe(this.formInline).then((res) => {
                this.isCanReq = true;
                if (res.data.code === '0000') {
                    this.$message({
                        message: '提交成功',
                        type: 'success',
                    });
                }
            }).catch((err) => {
                console.log(err);
                this.isCanReq = true;
                this.$message({
                    message: '提交失败，请稍后再试',
                    type: 'warning',
                });
            });
        },
        goOrder(item) {
            this.$router.push({
                path: '/order',
                query: {
                    money: item.fee,
                    level: item.name,
                    ptype: 'vip',
                    type: this.type,
                    id: this.courseId,
                },
            });
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
                    this.addcontactMeFn();
                }
            });
        },
    },
};
</script>
<style scoped>
  .interests{
    color: #444444;
    letter-spacing: 0;
    font-size: 14px;
  }
  .title{
    padding: 40px 0;
    text-align: center;
    font-size: 16px;

  }
  .title h3{
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 22px;
  }
  .title p{
    font-size: 14px;
    color: #868686;
    letter-spacing: 0;
  }
  .contain-box{
    display: flex;
    align-items: justify;
    justify-content: space-between;
    font-size: 14px;
    flex-wrap: wrap;
  }
  .contain-box .item{
    background: #F7F7F7;
    border: 1px solid #D4D4D4;
    position: relative;
    padding:20px 20px 80px 20px;
    width: 230px;
    box-sizing:border-box;
    margin-bottom: 20px;
  }
  .contain-box .item.empty{
    opacity: 0;
    height: 0;
  }
  .contain-box .item h3{
    text-align: center;
    margin-bottom: 10px;
  }
  .contain-box .item .intro{

    color: #868686;
    margin-bottom: 30px;
  }
  .contain-box .item .btn-sub{
    position: absolute;
    bottom: 30px;
    margin: 0;
    left: 50%;
    margin-left: -54px;
  }
  .contain-box li{
    display: block;
    position: relative;
    line-height: 20px;
    padding-left: 18px;
    background: url('./imgs/icon-error.png') no-repeat left 5px;
    background-size: 10px auto;
    margin-bottom: 10px;
  }
  .contain-box .list .active{
    background-image: url('./imgs/icon-right.png');
  }
  /*售前经理*/
  .form{
    display: block;
    position: relative;
    padding-right: 292px;
  }
  .form h3{
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .el-form-item{
    width: 314px;
    margin-right: 30px;
  }

  .form .btn-sub{
    position: absolute;
    right: 0;
    top: 22px;
  }

</style>
