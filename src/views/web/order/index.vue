<template>
  <div v-if="isShowPage"
  class="order common-container-width common-web-order">
    <!-- 订单步骤条 -->
    <div class="top-step">
        <h4 class="title">确认订单</h4>
        <div class="step-box">
          <Step :stepList="stepList" :active="stepIndex"></Step>
        </div>
    </div>
    <template v-if="pageType == 'classOrder'">
      <BaseTitle title="课程清单"></BaseTitle>
      <Order v-if="order.list.length>0"
      :theaderList="theaderList"
      :order="order"></Order>
      <div class="empty" v-else>
        订单数据获取出错
      </div>
    </template>
    <template v-if="pageType == 'vip'">
      <BaseTitle title="订单信息"></BaseTitle>
      <div v-if="commonUserData && commonUserData.userName" class="vip">
        <p>当前账号：{{commonUserData.userName}}</p>
        <p>会员等级：<span class="level">{{vip.level}}</span></p>
        <p>开通时长：1年/￥{{vip.money}}</p>
      </div>
    </template>

    <BaseTitle title="发票信息">
        <span class="bold">发票信息</span>
        <i class="red">
        开企业抬头发票须填写纳税人识别号，以免影响报销
        </i>
    </BaseTitle>
    <div class="invoice">
      <span v-if="isSaveInviceForm">
      {{invoiceForm.createType == '0' ? '电票' : '纸票'}}
      {{invoiceTypes[invoiceForm.invoiceType].text}}</span>
      <span v-else>
        未保存发票信息
      </span>
      <span v-if="invoiceForm.title!=''">{{invoiceForm.titleType=='0'?'个人':'公司'}}</span>
      <span v-if="invoiceForm.title!=''">{{invoiceForm.content}}</span>
      <span class="btn-edit" @click="isShowInvoice=true">修改</span>
    </div>

    <div class="btns">
      <div class="totalmoney">
        订单总金额：<span class="money">￥{{order.totalmoney}}</span>
        <div class="order-type"
        v-if="ordertype == 0 && order.discount>0">
        订单金额 = 原价(￥{{order.oldmoney}})- 优惠(￥{{order.discount}})</div>
        <el-popover
          placement="bottom"
          width="283"
          trigger="hover">
          <div class="order-type type1 reference"
          slot="reference"
          v-if="ordertype == 1 && orderTypeList.length>0">
              <span>{{orderTypeList[orderTypeIndex].text}}</span>
              <span class="icon-triangle"></span>
          </div>
          <ul class="order-type-list">
            <li v-for="(item,index) in orderTypeList"
            :class="{active:index==orderTypeIndex}"
            @click="checkOrderList(index)"
            :key="index">
              {{item.text}}
            </li >
          </ul>
        </el-popover>
        <span @click="createOrderInfoFn()" class="btn-sub">提交订单</span>
      </div>
    </div>


    <!-- 发票弹窗 -->
    <div class="mask" v-show="isShowInvoice"></div>
    <div class="dialog-invoice" v-show="isShowInvoice">
      <span class="el-icon-close"
      @click="isShowInvoice=false"></span>
      <h4>发票信息</h4>
      <div class="type-btns">
        <span class="pointer"
        v-for="(item,index) in invoiceTypes"
        :class="{active:index == invoiceForm.invoiceType}"
        @click="checkInvoiceType(index)"
        :key="index">
          {{item.text}}
        </span >
      </div>
      <div class="invoice-tip">
        电子普通发票和纸质普通发票具备同等法律效力，可支持报销入账
      </div>
      <el-form :model="invoiceForm"
      :label-position="labelPosition"
      :rules="rules"
      ref="invoiceForm"
      label-width="110px"
      class="invoice-form">
        <div v-if="invoiceForm.invoiceType==0" class="card-type">
        <el-form-item label="抬头类型">
          <el-radio v-model="invoiceForm.titleType" label="0">个人</el-radio>
          <el-radio v-model="invoiceForm.titleType" label="1">公司</el-radio>
        </el-form-item>
        </div>
        <el-form-item :label="label" prop="title">
        <div class="form-item">
          <el-input type="text"
          placeholder="请填写发票抬头"
          v-model="invoiceForm.title">
          </el-input>
        </div>
         </el-form-item>


         <el-form-item v-if="invoiceForm.titleType == '1'"
         label="纳税人识别号" prop="taxNo">
         <div class="form-item">
              <el-input type="text"
              placeholder="请填写纳税人识别号"
              v-model="invoiceForm.taxNo">
              </el-input>
          </div>
        </el-form-item>

        <el-form-item v-if="invoiceForm.invoiceType === '1'"
         label="注册地址" prop="address">
         <div class="form-item">
              <el-input type="text"
              placeholder="请填写注册地址"
              v-model="invoiceForm.address">
              </el-input>
          </div>
        </el-form-item>

        <el-form-item v-if="invoiceForm.invoiceType === '1'"
         label="注册电话" prop="phone">
         <div class="form-item">
              <el-input type="text"
              placeholder="请填写注册电话"
              v-model="invoiceForm.phone">
              </el-input>
          </div>
        </el-form-item>

        <el-form-item v-if="invoiceForm.invoiceType === '1'"
         label="开户银行" prop="bankName">
         <div class="form-item">
              <el-input type="text"
              placeholder="请填写开户银行"
              v-model="invoiceForm.bankName">
              </el-input>
          </div>
        </el-form-item>


        <el-form-item v-if="invoiceForm.invoiceType === '1'"
         label="开户账户" prop="bankNo">
         <div class="form-item">
              <el-input type="text"
              placeholder="请填写开户账户"
              v-model="invoiceForm.bankNo">
              </el-input>
          </div>
        </el-form-item>


        <div class="invoice-content type-btns">
          <span class="label">发票内容</span>
          <span v-for="(item,index) in invoiceContents"
          class="pointer"
          :class="{active:item.text == invoiceForm.content}"
          @click="invoiceForm.content=item.text"
          :key="index">
            {{item.text}}
          </span >
        </div>
        <div class="invoice-tip pd100">
          发票内容将显示本单课程所属类别及价格信息
        </div>

        <el-form-item label="收票人手机" prop="userPhone">
        <div class="form-item">
          <el-input type="text"
          placeholder="请填写收票人手机号"
          v-model="invoiceForm.userPhone">
          </el-input>
      </div>
        </el-form-item>

        <el-form-item v-if="invoiceForm.createType == '0'" label="收票人邮箱" prop="email">
        <div class="form-item">
          <el-input type="text"
          placeholder="请填写收票人邮箱"
          v-model="invoiceForm.email">
          </el-input>
      </div>
        </el-form-item>

        <div class="pd100 card-type">
          <el-radio
          v-show="invoiceForm.invoiceType === '0'"
          v-model="invoiceForm.createType"
          label="0">电票</el-radio>
          <el-radio v-model="invoiceForm.createType" label="1">纸票</el-radio>
          <span>(满300包邮)</span>
        </div>

        <div
        v-if="invoiceForm.createType === '1' && options.length>0"
         class="select-city">
        <span class="label">收票人省份</span>
          <div class="form-item">
            <el-cascader
              :options="options"
              v-model="selectedOptions"
            ></el-cascader>
          </div>
        </div>
        <div class="tarea">
        <el-form-item
        v-if="invoiceForm.createType === '1' ||
         invoiceForm.invoiceType === '1'"
        label="详细地址" prop="userAddress">
        <div class="form-item">
          <el-input type="textarea"
          resize="none"
          placeholder="请填写收票人详细地址"
          v-model="invoiceForm.userAddress">
          </el-input>
        </div>
        </el-form-item>
        </div>
        <span @click="submitForm('invoiceForm')"
        class="btn-sub">保存</span>
      </el-form>
    </div>

  </div>
</template>
<script>
import Step from '@/views/web/components/base/step.vue';
import BaseTitle from '@/views/web/components/base/base-title.vue';
import Order from '@/views/web/components/order/order.vue';
import {
  locations,
  findOfflineCourseById,
  createOrderInfo,
  getCourse,
  queryEquity,
} from '@/api/apis';
import {
  validByPhone,
  validByEmail,
  validByTel,
  validByBankNo,
} from '@/assets/utils/validator';

export default {
  name: 'order',
  data() {
    return {
      name: 'order',
      pageType: 'classOrder',
      label: '发票抬头',
      payIndex: 0,
      courseId: 1,
      type: 1, // 1线上视频课 2线下课 3线上专题课
      paylist: [ // 支付类型列表
        {
          id: 'NATIVE',
          icon: 'wx',
          name: '微信支付',
        },
        {
          id: '2',
          icon: 'zfb',
          name: '支付宝支付',
        },
      ],
      vip: {
        level: '',
        money: '',
      }, // 存放会员相关信息
      isShowInvoice: false,
      labelPosition: 'left',
      ordertype: 0, // 0显示总金额 - 优惠金额  1显示使用权益
      stepIndex: 0,
      orderTypeIndex: 0,
      invoiceTypeIndex: 0,
      invoiceContentIndex: 0,
      invoiceTypes: [
        {
          text: '普通发票',
          value: '0',
        },
        {
          text: '增值税专用发票',
          value: '1',
        },
      ],
      invoiceContents: [
        {
          text: '课程明细',
          value: '0',
        },
        {
          text: '课程类别',
          value: '1',
        },
      ],
      invoiceForm: {
        titleType: '0', // 0个人 1单位
        title: '', // 抬头
        company: '', // 单位名称
        invoiceType: '0', // 发票类型 0.普票 1.专票
        content: '课程明细',
        taxNo: '', // 纳税人识别号
        classType: '',
        userPhone: '',
        email: '',
        createType: '0', // 开票方式 0.电子 1.纸票
        userAddress: '',
        prov: '',
        city: '',
        area: '',
        bankNo: '', // 开户账户
        address: '', // 注册地址
        phone: '', // 注册电话
        bankName: '', // 开户行
      },
      rules: {
        title: [
          {
            required: true,
            message: '请填写发票抬头',
            trigger: 'blur',
          },
        ],
        taxNo: [
          {
            required: true,
            message: '请填写纳税人识别号',
            trigger: 'blur',
          },
        ],
        bankNo: [
          {
            required: true,
            message: '请填写开户账户',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              if (value && !validByBankNo(value)) {
                callback(new Error('开户账户格式有误'));
              } else {
                callback();
              }
            },
          },
        ],
        address: [
          {
            required: true,
            message: '请填写注册地址',
            trigger: 'blur',
          },
        ],
        phone: [
          {
            required: true,
            message: '请填写注册电话',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              if (value && !validByTel(value) && this.invoiceForm.titleType === '1') {
                callback(new Error('注册电话格式有错'));
              } else {
                callback();
              }
            },
          },
        ],
        bankName: [
          {
            required: true,
            message: '请填写开户银行',
            trigger: 'blur',
          },
        ],
        userPhone: [
          {
            required: true,
            message: '请填写收票人手机号',
            trigger: 'blur',
          },
          {
            min: 11,
            max: 11,
            message: '长度等于11个字符',
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
        email: [
          {
            required: true,
            message: '请填写收票人邮箱',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              if (value && !validByEmail(value)
                            && this.invoiceForm.createType === '0') {
                callback(new Error('收票人邮箱格式有误'));
              } else {
                callback();
              }
            },
          },
        ],
        userAddress: [
          {
            required: true,
            message: '请填写收票人详细地址',
            trigger: 'blur',
          },
        ],
      },
      orderTypeList: [
        {
          text: '不使用权益',
          value: 0,
        },
        {
          text: '使用权益（剩余222次）',
          value: 222,
        },
      ],
      stepList: [
        {
          id: 1,
          title: '填写核对订单信息',
          activeTitle: '',
        },
        {
          id: 2,
          title: '支付订单',
          activeTitle: 'ces',
        },
        {
          id: 3,
          title: '支付成功',
          activeTitle: '',
        },
      ],
      theaderList: [
        {
          id: 1,
          title: '课程信息',
          dataName: 'classData',
          styleObj: {
            width: '40%',
          },
        },
        {
          id: 2,
          title: '数量',
          dataName: 'num',
          styleObj: {
            width: '20%',
          },
        },
        {
          id: 3,
          title: '金额',
          dataName: 'money',
          styleObj: {
            width: '20%',
          },
        },
        {
          id: 4,
          title: '有效期',
          dataName: 'time',
          styleObj: {
            width: '20%',
          },
        },
      ],
      order: {
        oldmoney: 600,
        discount: 0,
        totalmoney: 599,
        time: '1年',
        list: [],
      },
      options: [], // 城市列表
      selectedOptions: ['', '', ''],
      sid: '', // 报名id
      isShowPage: false,
      createOrderInfoParam: {
        goodsType: '', // 1线上视频课 2线下课 3线上专题课
        ids: [], // 课程id列表
        right: '', // 是否消耗权益  1是 0否
        invoiceInfo: { // 发票相关
        },
      },
      isShowPayList: false,
      isSaveInviceForm: false, // 是否保存发票信息
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 初始化参数 课程id 课程类型 vip相关 报名id
      this.pageType = this.$route.query.ptype || 'classOrder';
      this.vip.level = this.$route.query.level || '';
      this.vip.money = this.$route.query.money || '';
      this.courseId = this.$route.query.id
        ? parseInt(this.$route.query.id, 10) : '';
      this.type = this.$route.query.type
        ? parseInt(this.$route.query.type, 10) : '';
      this.sid = this.$route.query.sid
        ? parseInt(this.$route.query.sid, 10) : '';

      if (this.type === 2) {
        // 1线上视频课 2线下课 3线上专题课
        // 查询线下课详情
        this.findOfflineCourseByIdFn();
      } else if (this.type === 1) {
        // 查询线上课
        this.getCourseFn();
      } else if (this.type === 3) {
        // 购买会员
        this.initVipOrder();
      }
      // 获取城市数据
      this.locationsFn();
      // 获取权益信息
      this.queryEquityFn();
    },
    queryEquityFn() {
      // 获取权益 '0  线上   1 线下
      let courseType = null;
      if (this.type === 1) {
        courseType = 1;
      }
      if (this.type === 2) {
        courseType = 1;
      } else {
        courseType = null;
      }
      queryEquity({ courseType }).then((res) => {
        if (res.data.code === '0000') {
          console.log(res);
          if (res.data.totalType === undefined || res.data.consumeNum <= 0) {
            this.ordertype = 0;
          } else {
            this.ordertype = 1;
            this.orderTypeList[1] = {
              text: res.data.totalType === '0'
                ? `使用权益剩余(${res.data.consumeNum})次`
                : '使用权益无限次数',
              value: '1',
            };
          }
        } else {
          this.ordertype = 0;
        }
      }).catch((err) => {
        console.log(err);
        this.$message({
          message: '获取权益信息失败，请稍后再试',
          type: 'warning',
        });
      });
    },

    checkInvoiceType(index) {
      // 增值税发票， 普通发票
      this.invoiceForm.invoiceType = `${index}`;
      if (index === 1) {
        this.label = '公司名称';
        this.invoiceForm.createType = '1';
        this.invoiceForm.titleType = '1';
      } else {
        this.label = '发票抬头';
      }
    },

    initVipOrder() {
      // 获取会员
      this.isShowPage = true;
      this.order.totalmoney = this.vip.money;
    },
    getCourseFn() {
      // 获取公开课详情
      if (this.courseId) {
        getCourse({ id: this.courseId }).then((res) => {
          if (res.data.code === '0000' && res.data.course) {
            let data = res.data.course;
            let obj = {
              title: data.title,
              imgurl: data.bannerUrl,
              num: 1,
              money: data.price,
              // curmoney:data.disprice?data.disprice:0,
            };
            this.order.time = '1年';
            this.order.totalmoney = data.price;
            this.order.list.push(obj);
            this.isShowPage = true;
          }
        }).catch((err) => {
          console.log(err);
          this.$message({
            message: '订单详情获取失败，请稍后再试',
            type: 'warning',
          });
        });
      }
    },
    createOrderInfoFn() {
      // 生成订单
      this.createOrderInfoParam.goodsType = this.type;
      this.createOrderInfoParam.id = this.sid;
      this.createOrderInfoParam.ids = [{ id: this.courseId }];
      this.createOrderInfoParam.right = this.orderTypeIndex > 0 ? 1 : 0;
      if (this.isSaveInviceForm) {
        this.createOrderInfoParam.invoiceInfo = {
          ...this.invoiceForm,
        };
      } else {
        this.createOrderInfoParam.invoiceInfo = {};
      }

      createOrderInfo(this.createOrderInfoParam).then((res) => {
        console.log(res);
        if (res.data.code === '0000') {
          this.goPayOrder(res.data.data);
        } else if (res.data.code === '0008') {
          this.goPayOrder(res.data.orderId, true, res.data.tkm);
        }
      }).catch((err) => {
        console.log(err);
        this.$message({
          message: '生成订单出错，请稍后再试',
          type: 'warning',
        });
      });
    },
    findOfflineCourseByIdFn() {
      // 获取公开课详情
      if (this.courseId) {
        findOfflineCourseById({ id: this.courseId }).then((res) => {
          if (res.data.code === '0000' && res.data.data) {
            let { data } = res.data;
            let obj = {
              title: data.title,
              imgurl: data.pic,
              num: data.num || 1,
              money: data.price,
              // curmoney:data.disprice?data.disprice:0,
            };
            this.order.time = '1年';
            this.order.totalmoney = data.price;
            this.order.list.push(obj);
            this.isShowPage = true;
          }
        }).catch((err) => {
          console.log(err);
          this.$message({
            message: '订单详情获取失败，请稍后再试',
            type: 'warning',
          });
        });
      }
    },
    checkOrderList(index) {
      this.orderTypeIndex = index;
    },
    goPayOrder(orderId, success, tkm) {
      if (success) {
        this.$router.push({
          path: '/pay-order',
          query: {
            orderId,
            success,
            tkm,
          },
        });
      } else {
        // 订单支付
        this.$router.push({
          path: '/pay-order',
          query: {
            orderId,
          },
        });
      }
    },
    initCityOptions(cityLists) {
      function initArr(arr) {
        // 将regionId regionName  转换成 value label
        if (!arr || arr.length < 1) {
          return null;
        }
        let list = [];
        arr.forEach((item) => {
          list.push({
            value: item.regionCode,
            label: item.regionName,
            children: initArr(item.children),
          });
        });
        return list;
      }

      this.options = initArr(cityLists);
      console.log(this.options);
    },
    locationsFn() {
      locations().then((res) => {
        if (res.data.data.length > 0) {
          console.log(res);
          this.initCityOptions(res.data.data);
        }
      }).catch((err) => {
        console.log(err);
        this.$message({
          message: '地址列表获取失败',
          type: 'warning',
        });
      });
    },
    submitForm(formName, type) {
      // 表单提交
      let curForm = this.$refs[formName].validate
        ? this.$refs[formName]
        : this.$refs[formName][0];

      curForm.validate((valid) => {
        if (!valid) {
          console.log('提交失败');
          console.log(valid);
          if (type === 1) {
            this.$message({
              message: '请完善发票信息',
              type: 'warning',
            });
          }
        } else {
          if (this.invoiceForm.createType === '1') {
            if (this.selectedOptions[2] === ''
                          && this.options.length > 0) {
              this.$message({
                message: '请选择收票人省市',
                type: 'warning',
              });
              return;
            }
          }
          console.log('提交成功');
          this.isShowInvoice = false;
          this.isSaveInviceForm = true;
          if (type === 1) {
            this.createOrderInfoFn();
          }
        }
      });
    },
  },
  components: {
    Step,
    BaseTitle,
    Order,
  },
};
</script>
<style scoped>
  /*支付类型*/
  .paylist{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden\0;
  }
  .paylist .item{
    display: block;
    width: 126px;
    height: 50px;
    line-height: 50px;
    margin-right: 20px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 60% auto;
    margin-top: 20px;
    font-size: 0;
    border: 1px solid #fff;
    float: left\0;
  }
  .paylist .item.ZFB{
    background-image: url('./imgs/zfb.png');
  }
  .paylist .item.WX{
    background-image: url('./imgs/wx.png');
  }
  .paylist .item.active{
    border: 1px solid #d4d4d4;
  }
  .bold{
    font-weight: bold;
  }
  .empty{
    padding: 20px 0;
  }
  .vip{
    margin: 20px 0 30px 0;
    font-size: 14px;
    color: #444444;
    letter-spacing: 0;
    line-height: 30px;
  }
  .vip .level{
    color: #FB683C;
  }
  .red{
    font-size: 14px;
    color: #F91E1E;
    margin-left: 20px;
  }
  .top-step{
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden\0;
  }
  .step-box{
    float: right\0;
    width: 340px;
  }
  .title{
    font-size: 16px;
    color: #444;
    line-height: 30px\0;
    float: left\0;
  }
  .order-box{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .invoice{
    font-size: 14px;
    color: #444444;
    /*margin-top: 20px;*/
    overflow: hidden;
  }
  .invoice span{
    margin-right: 40px;
    padding-top: 20px;
    display: inline-block;
  }
  .invoice .btn-edit{
    float: right;
    color: #FB683C;
    margin-right: 0;
    cursor:pointer;
    padding:20px 0 20px 20px;
  }
  .btns{
    float: right;
    padding: 40px 0 100px 0;
  }
  .totalmoney{
    position: relative;
    padding-right: 138px;
    font-size: 24px;
    color: #444444;
    letter-spacing: 0;
    line-height: 33px;
    font-weight: bold;
  }
  .totalmoney .money{
    color: #FB683C;
  }
  .totalmoney .btn-sub{
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
  }
  .totalmoney .order-type{
    font-size: 14px;
    color: #868686;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden\0;
  }
  .order-type .icon-triangle{
    display: inline-block\0;
    top: 0;
    margin-left: 5px;
  }
  .order{
    overflow: hidden;
  }
  .order-type p {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .order-type-list{
    padding: 0 20px;
  }
  .reference{
    cursor: pointer;
  }
  .order-type-list li{
    display: block;
    font-size: 14px;
    color: #444444;
    letter-spacing: -0.34px;
    text-align: left;
    cursor: pointer;
    line-height: 20px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .order-type-list li:nth-last-child(1){
    margin-bottom: 0;
  }
  .order-type-list li.active{
    color: #FB683C;
  }

  /*弹窗*/
  .dialog-invoice{
    position: absolute;
    width: 446px;
    background: #FFFFFF;
    border: 1px solid #979797;
    border-radius: 8px;
    box-sizing:border-box;
    z-index: 99;
    top: 20%;
    left: 50%;
    margin-left: -223px;
    padding: 20px;
    font-size: 16px;
    color: #444444;
  }
  .form-item{
    width: 286px;
  }
  .dialog-invoice h4{
  letter-spacing: -0.39px;
  text-align: center;
  margin-bottom: 40px;
  }
  .type-btns{
    overflow: hidden;
  }
  .type-btns span{
    float: left;
    min-width: 110px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #d4d4d4;
    color: #444;
    font-size: 12px;
    border-radius: 4px;
    margin-right: 30px;
    text-align: center;
  }

  .type-btns span.active{
    color: #FB683C;
    border-color: #FB683C;
  }
  .invoice-tip{
    font-size: 12px;
color: #868686;
letter-spacing: 0;
margin-top: 10px;
margin-bottom: 20px;
  }
  .type-btns span.label{
    line-height: 32px;
    font-size: 14px;
    color: #444;
    border:none;
    text-align: left;
    margin-right: 0;
  }
  .pd100{
    padding-left: 110px;
  }
  .card-type span{
    color: #868686;
    font-size: 12px;
    position: relative;
    left: -20px;
  }
  .select-city{
    padding-left: 110px;
    margin-top: 20px;
  }
  .tarea{
    margin-top: 20px;
  }
  .select-city .label{
    position: absolute;
    left: 20px;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    text-align: left;
    font-size: 14px;
  }
  .dialog-invoice .btn-sub{
    margin-bottom: 0;
  }
</style>
