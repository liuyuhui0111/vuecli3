<template>
  <div class="online-class common-container-width">

    <div class="contain">
      <!-- 类目展开框 -->
      <div class="onlineNavList-box common-scroll-bar"
      v-if="onlineNavList.length>0">
      <div class="online-box"
      v-for="(item,index) in onlineNavList"
      :key="index">

        <div class="online-nav-left">
          <div class="item">
            {{onlineNavListTypes[index].name}}
          </div >
        </div>

        <div id="navBox" ref="navBox" class="online-nav-right">
          <ul class="online-nav-right-list" v-if="item.length>0">
          <li ref="navParent">
            <span class="all"
              @click="checkAll(index)"
              :class="{active:index==onlineNavListTypesIndex || isAll}">
              全部</span>
               <div ref="navChild" class="show-nav-box">

                <span v-for="(nav,navindex) in item"
                @click="navClick(nav.id,false)"
                :class="{active:navCurId == nav.id&&!isAll}"
                :key="navindex">
                  {{nav.name}}
                </span>
              </div>
              <div ref="iconTri" class="icon-trin-box">
                <span class="icon-triangle"></span>
              </div>
         </li>
          </ul>

        </div>
      </div>
    </div>


      <div class="nav-list">
      <div class="group">
        <div class="item"
        :class="{active:navlist.type===item.value}"
        @click="navlist.type = item.value"
        v-for="(item,index) in navlist.typelist"
        :key="index">
          {{item.name}}
        </div>

      </div>
      <div class="group">

        <div class="item"
        :class="{active:item.value===navlist.payType}"
        @click="navlist.payType = item.value"
        v-for="(item,index) in navlist.freelist"
        :key="index">
          <el-radio v-model="navlist.freeindex"
          @change="radioChange"
          :label="item.value">{{item.name}}</el-radio>
        </div>

        </div>
      <div class="group">
        <div class="item tips">难度:</div>
        <div class="item"
        :class="{active:item.value===navlist.difficult}"
        @click="navlist.difficult = item.value"
        v-for="(item,index) in navlist.diflist"
        :key="index">
          {{item.name}}
        </div>
      </div>
      <div class="group">
         <div class="item mr0"
        :class="{active:item.value===navlist.boolean}"
        @click="navlist.boolean = item.value"
        v-for="(item,index) in navlist.hotlist"
        :key="index">
          {{item.name}}
        </div>
      </div>

      </div>
      <div v-if="list.length<1 && isShowPage" class="empty">
      <template v-if="!allCount">
         暂时还没有线上课程哦~去看看
        <span
        class="pointer"
        @click="routerGo('/open-class')">公开课</span>吧
      </template>
      <template v-else>
        当前查询条件暂无相关课程，换个条件试试吧！
      </template>

    </div>
      <ul v-if="list.length>0" class="list-box">
          <li v-for="(item,index) in list"
          :class="{liEmpty:item==null}"
          :key="index">
            <Card
            v-if="item"
            @classClick="classClick"
            :type="cardType"
            :titleStyle="titleStyle"
            :classData="item"></Card>
          </li>
      </ul>

      <el-pagination
        v-if="total>list.length"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :pager-count="pagerCount"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Card from '@/views/web/components/card/card.vue';
import { initList } from '@/assets/utils/util';
import {
  getCourseList,
  getCategoryList,
} from '@/api/apis';

export default {
  name: 'online-class',
  data() {
    return {
      name: 'online-class',
      cardType: 'online-list',
      navCurId: '', // 当前选中的id
      isShowPage: false,
      isAll: true,
      titleStyle: {
        color: '#444',
        fontSize: '16px',
      },
      onlineNavListTypesIndex: -1,
      onlineNavListTypes: [
        { name: '方向' },
        { name: '专业' },
        { name: '分类' },
      ],
      onlineNavIndex: 0, // 当前选中的在线课程分类
      onlineNavList: [],
      pageSize: 12, // 一页最多展示的条数
      pagerCount: 11, // 11页以上显示...
      total: 0,
      navlist: {
        type: 1,
        typelist: [
          {
            name: '视频课',
            value: 1,
          },
          // {
          //     name: '专题课',
          //     value: 2,
          // },
        ],
        payType: '',
        freelist: [
          {
            name: '全部课程',
            value: '',
          },
          {
            name: '只看免费',
            value: 0,
          },
        ],
        difficult: '',
        diflist: [
          {
            name: '全部',
            value: '',
          },
          {
            name: '初级',
            value: 1,
          },
          {
            name: '中级',
            value: 2,
          },
          {
            name: '高级',
            value: 3,
          },
        ],
        boolean: 0,
        hotlist: [
          {
            name: '最新',
            value: 0,
          },
          {
            name: '最热',
            value: 1,
          },
        ],
      },
      list: [],
      allCount: 0,
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    navlist: {
      handler() {
        this.getCourseListFn('init');
      },
      deep: true,
    },
    $route() {
      this.init();
    },
  },
  methods: {
    init() {
      // this.list = initList(this.list, 4);
      this.navCurId = this.$route.query.nid || '';
      if (this.navCurId) {
        this.isAll = false;
      }
      this.navlist.boolean = this.$route.query.boolean || 0;
      // 获取线上课程列表
      this.getCourseListFn('init');
      // 获取线上课程分类
      this.getCategoryListFn();
    },
    checkAll(index) {
      this.onlineNavListTypesIndex = index;
      this.isAll = true;
      this.navCurId = '';
      this.getCourseListFn('init');
    },
    navClick(id, isAll) {
      this.onlineNavListTypesIndex = -1;
      this.navCurId = id;
      this.isAll = isAll || false;
      this.getCourseListFn('init');
    },
    initNavList(list) {
      /*eslint-disable*/ 
      function getChildById(id) {
        let childs = [];
        list.forEach((item) => {
          if (item.pid !== item.id && item.pid === id) {
            childs.push( item );
          }
        });
        return childs;
      }

      let arr = [[],[],[]];
      list.forEach((item) => {
        if (item.id === item.pid) {
          arr[0].push(item);
        }
      });
      arr[0].forEach((item)=>{
        arr[1].push(...getChildById(item.id))
      })
      arr[1].forEach((item)=>{
        arr[2].push(...getChildById(item.id))
      })
      return arr;
      /* eslint-enable */
    },
    initNavHeight() {
      // 计算分类高度，是否显示展开收起效果
      let anavParents = this.$refs.navParent;
      let anavChilds = this.$refs.navChild;
      let aiconTris = this.$refs.iconTri;
      /*eslint-disable*/ 
            anavParents.forEach((item, index) => {
                let curActive = item.querySelector('span.active');
                if (item.clientHeight < anavChilds[index].clientHeight) {
                // 如果父高度大于子高度 设置openClass
                    item.className = 'openClass';
                }
                if(curActive && !this.isAll){
                  item.className = 'openClass open';
                }
            });

            aiconTris.forEach((item, index) => {
                item.addEventListener('click', () => {
                    if (anavParents[index].className === 'openClass') {
                        anavParents[index].className = 'openClass open';
                    } else {
                        anavParents[index].className = 'openClass';
                    }
                }, false);
            });
            /* eslint-enable */
    },
    getCategoryListFn() {
      // 获取线下课程导航列表
      this.onlineNavList = [];
      getCategoryList().then((res) => {
        if (res.data.code === '0000') {
          let { list } = res.data;
          // id === pid 是一级菜单
          this.onlineNavList = this.initNavList(list);
          console.log('onlinelist', this.onlineNavList);
          this.$nextTick(() => {
            this.initNavHeight();
          });
        }
      }).catch((err) => {
        this.$message({
          message: '获取线下课程列表失败,请稍后再试',
          type: 'warning',
        });
        console.log(err);
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getCourseListFn();
    },
    getCourseListFn(t) {
      if (t === 'init') {
        this.pageNum = 1;
      }
      let { pageNum } = this;
      let { pageSize } = this;
      let { type } = this.navlist;
      let { boolean } = this.navlist;
      let { payType } = this.navlist;
      let { difficult } = this.navlist;
      // this.total = 0;
      this.isShowPage = false;
      this.list = [];
      // 获取公开课列表
      getCourseList({
        pageNum,
        pageSize,
        payType,
        boolean,
        difficult,
        type,
        categoryId: this.navCurId,
      }).then((res) => {
        if (res.data.code === '0000') {
          this.isShowPage = true;
          if (res.data.list.length > 0) {
            this.list = res.data.list;
            this.list = initList(this.list, 4);
            console.log(this.list);
          } else {
            this.list = [];
          }
          this.total = res.data.total;
          this.allCount = res.data.allCount;
        }
      }).catch((err) => {
        console.log(err);
        this.$message({
          message: '公开课列表获取失败，请稍后再试',
          type: 'warning',
        });
      });
    },
    radioChange(val) {
      this.navlist.freeindex = val;
    },
    routerGo(path) {
      this.$router.push({ path });
    },
    classClick(item) {
      this.$router.push({ path: '/online-detail', query: { cid: item.id } });
    },
  },
  components: {
    Card,
  },
};
</script>
<style scoped>
  .onlineNavList-box{
    max-height: 305px;
    overflow: auto;
  }
  .tips{
    color: #868686;
  }
  .liEmpty{
    display: block;
    height: 1px;
    width: 218px;
  }
  .empty{
    padding: 300px 0;
    text-align: center;
    font-size: 18px;
    color: #868686;
    letter-spacing: 0;
    line-height: 25px;
  }
  .empty span{
    color: #FB683C;
  }
  .list-box{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
    min-height: 500px;
    width: 100%\0;
  }
  .list-box li{
    float: left\0;
    width: 219px\0;
    float: left\0;
    margin-right: 34px\0;
    min-height: 266px\0;
    display: block;
    margin-bottom: 30px;
    flex-grow:0;
  }
  .list-box li:nth-child(4n){
    margin-right: 0\0;
  }

  .nav-list{
    width: 100%;
    min-height: 54px;
    font-size: 16px;
    color: #444444;
    letter-spacing: 0;
    background: #F7F7F7;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 40px;
    box-sizing:border-box;
    margin: 30px 0 30px 0;
    overflow: hidden\0;
    margin-top: 20px\0;
    line-height: 54px\0;
  }
  .nav-list .group{
    text-align: center;
    float: left\0;
  }
  .nav-list .group .item{
    display: inline-block;
    margin-right: 40px;
    cursor: pointer;
  }
  .nav-list .group .item.tips{
    margin-right: 40px;
  }

  .nav-list .group .mr0:nth-last-child(1){
    margin-right: 0;
  }

  /*类目列表*/
  .online-box{
    /*height: 360px;*/
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0px 10px;
    text-align: left;
    overflow: hidden\0;
  }
  .online-box .online-nav-right,
  .online-box .online-nav-left{
    /*max-width: 980px;*/
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    display: block;
    position: relative;
    flex-grow:1;
    float: left\0;
  }
  .online-box .online-nav-left{
    width: 98px;
    flex-grow:0;
    width: 10%\0;
  }
  .online-box .online-nav-right{
    width: 90%\0;
  }

  .online-box .online-nav-left .item{
    display: flex;
    font-size: 14px;
    color: #444444;
    letter-spacing: 0;
    min-height: 40px;
    line-height: 20px;
    line-height: 40px\0;
    /*cursor: pointer;*/
    align-items: center;
    border: none;
    padding-top: 10px;
  }
  .active,
  /*.online-nav-left .item:hover,*/
  .online-nav-right-list span:hover,
  .contain .online-box .active{
    color: #FB683C;
  }

  .online-nav-right-list li{
    font-size: 14px;
    color: #868686;
    height: 60px;
    line-height: 20px;
     border-bottom: 1px dashed #d4d4d4;
    padding: 20px 50px 0px 88px;
    position: relative;
    overflow: hidden;
    box-sizing:border-box;
    /*margin-top: 10px;*/
  }
  .icon-trin-box{
    position: absolute;
    width: 40px;
    height: 60px;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  .online-nav-right-list li .icon-triangle{
    position: absolute;
    right: 20px;
    z-index: 11;
    top: 30px;
    width: 0;
    height: 0px;
    padding: 0;
    margin: 0;
    border-width: 8px;
    /*border-color: #d4d4d4;*/
    transition: transform 0.3s;
    transform: rotate(0deg);
    display: none;
  }
  .online-nav-right-list li.open{
    height: auto;
  }
  .online-nav-right-list li.open .icon-triangle{
    transform: rotate(180deg);
    transform: rotate(0deg)\0;
    display: inline-block;
    border-left: 8px solid transparent\0;
    border-right: 8px solid transparent\0;
    border-top: 0px solid #868686\0;
    border-bottom: 8px solid #868686\0;
  }
  .online-nav-right-list li.openClass .icon-triangle{
    display: block;
  }
  .online-nav-right-list li .show-nav-box{
    overflow: hidden;
  }
  .online-nav-right-list li span{
    display: block;
    float: left;
    text-align: left;
    cursor: pointer;
    padding-right: 30px;
    margin-bottom: 20px;
  }

  .online-nav-right-list li .all{
    position: absolute;
    left: 0;
  }


</style>
