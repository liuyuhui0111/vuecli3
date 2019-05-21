<template>
  <div class="my-signin">
    <Title title="我的报名"></Title>
    <div v-if="classList.length>0" class="table-box">
     <!-- eslint-disable -->
       <el-table
      :data="classList"
      border
      style="width: 100%">
        <el-table-column
        v-for="(item,index) in titleList"
        v-if="item.value == 'titleBox'"
        align="center"
        width="188px"
        :key="index"
        :prop="item.value"
        :label="item.text">
        <template slot-scope="scope">
          <img :src="scope.row.pic">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item,index) in titleList"
        v-if="item.value != 'titleBox'"
        align="center"
        :key="index"
        :prop="item.value"
        :label="item.text">
      </el-table-column>
      </el-table>
      <!-- eslint-enable -->
    </div>
    <div v-else class="table-box">
      暂无报名课程
    </div>
    <el-pagination
    v-if="total>queryMyApplicationParam.pageSize"
    @current-change="handleCurrentChange"
    layout="prev, pager, next"
    :pager-count="pagerCount"
    prev-text="上一页"
    next-text="下一页"
    :page-size="queryMyApplicationParam.pageSize"
    :total="total">
  </el-pagination>
  </div>
</template>
<script>
import mixin from './js/mixin';
import { queryMyApplication } from '@/api/apis';
import { formatDate } from '@/assets/utils/timefn';

export default {
  name: 'my-signin',
  mixins: [mixin],
  data() {
    return {
      name: 'my-signin',
      total: 0,
      pagerCount: 11,

      queryMyApplicationParam: {
        pageSize: 3,
        pageNum: 1,
      },
      titleList: [
        {
          text: '预约课程',
          value: 'titleBox',
          width: '',
        },
        {
          text: '称呼',
          value: 'name',
          width: '',
        },
        {
          text: '公司',
          value: 'company',
          width: '',
        },
        {
          text: '预约手机号',
          value: 'phone',
          width: '',
        },
        {
          text: '上课时间',
          value: 'time',
          width: '',
        },
        {
          text: '上课地点',
          value: 'address',
          width: '',
        },
      ],
      classList: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 获取个人中心我的报名页面
      this.queryMyApplicationFn('init');
    },
    getTime(classItem) {
      if (classItem.startTime && classItem.endTime) {
        // 计算上课时间
        return `${formatDate(classItem.startTime)}-${formatDate(classItem.endTime)}`;
      }
      return '';
    },
    initlist(list) {
      /*eslint-disable*/ 
            list.forEach((item) => {
                item.time = this.getTime(item);
            });
          /* eslint-enable */
      return list;
    },
    handleCurrentChange(val) {
      this.queryMyApplicationParam.pageNum = val;
      this.queryMyApplicationFn();
    },
    queryMyApplicationFn(t) {
      // 个人中心我的报名
      if (t === 'init') {
        this.queryMyApplicationParam.pageNum = 1;
      }
      queryMyApplication(this.queryMyApplicationParam).then((res) => {
        if (res.data.code === '0000') {
          this.classList = this.initlist(res.data.list);
          this.total = res.data.total;
        }
      }).catch((err) => {
        this.$message({
          message: '获取报名列表失败，请稍后再试',
          type: 'warning',
        });
        console.log(err);
      });
    },
  },
};
</script>
<style scoped>
.table-box {
    margin-bottom: 20px;
    min-height: 512px;
}
  .table-box img{
    width: 90%;
    height: auto;
      }
</style>
