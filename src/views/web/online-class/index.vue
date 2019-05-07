<template>
  <div class="online-class common-container-width">

    <div class="contain">
      <!-- 类目展开框 -->
      <template  v-if="onlineNavList.length>0">
      <div class="online-box"
      v-for="(item,index) in onlineNavList"
      :key="index">

        <div class="online-nav-left">
          <div @click="navClick(item.id)"
          :class="{active:navCurId == item.id}"
           class="item">
            {{item.name}}
          </div >
        </div>

        <div id="navBox" ref="navBox" class="online-nav-right">
          <ul v-if="item.children"
          class="online-nav-right-list">
            <li
            ref="navParent"
            v-for="(firstItem,firstIndex) in item.children"
            :key="firstIndex">
              <span class="all" @click="navClick(firstItem.id,true)"
              :class="{active:firstItem.id==navCurId && isAll}">全部</span>
              <div ref="navChild" class="show-nav-box">
                <span @click="navClick(firstItem.id)"
                :class="{active:navCurId == firstItem.id && !isAll}">
                  {{firstItem.name}}
                </span>
                <span v-for="(list,listindex) in firstItem.children"
                @click="navClick(list.id)"
                :class="{active:navCurId == list.id}"
                :key="listindex">
                  {{list.name}}
                </span>
              </div>
              <div ref="iconTri" class="icon-trin-box">
                <span class="icon-triangle"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>


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
      暂时还没有线上课程哦~去看看<span
      class="pointer"
      @click="routerGo('/open-class')">公开课</span>吧
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
            cardType: 'online',
            navCurId: '', // 当前选中的id
            isShowPage: false,
            isAll: false,
            titleStyle: {
                color: '#444',
                fontSize: '16px',
            },
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
                    {
                        name: '专题课',
                        value: 2,
                    },
                ],
                payType: '',
                freelist: [
                    {
                        name: '只看免费',
                        value: 1,
                    },
                    // {
                    //     name: '只看已上线',
                    //     value: 2,
                    // },
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
            // 获取线上课程列表
            this.getCourseListFn('init');
            // 获取线上课程分类
            this.getCategoryListFn();
        },
        navClick(id, isAll) {
            this.navCurId = id;
            this.isAll = isAll || false;
            console.log(id);
            this.getCourseListFn('init');
        },
        initNavList(list) {
            function getChildById(id) {
                let childs = [];
                list.forEach((item) => {
                    if (item.pid === id && item.id !== item.pid) {
                        childs.push({ children: getChildById(item.id), ...item });
                    }
                });
                return childs;
            }

            let arr = [];
            list.forEach((item) => {
                if (item.id === item.pid) {
                    arr.push({ children: getChildById(item.id), ...item });
                }
            });
            return arr;
        },
        initNavHeight() {
            // 计算分类高度，是否显示展开收起效果
            let anavParents = this.$refs.navParent;
            let anavChilds = this.$refs.navChild;
            let aiconTris = this.$refs.iconTri;
            /*eslint-disable*/ 
            anavParents.forEach((item, index) => {
                if (item.clientHeight < anavChilds[index].clientHeight) {
                // 如果父高度大于子高度 设置openClass
                    item.className = 'openClass';
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
            getCategoryList().then((res) => {
                if (res.data.code === '0000') {
                    let arr = [];
                    let { list } = res.data;
                    // id === pid 是一级菜单
                    arr = this.initNavList(list);
                    if (arr.length < 1) return;
                    // this.navCurId = arr[0].id;

                    this.onlineNavList = arr;
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
                    } else {
                        this.list = [];
                    }
                    this.total = res.data.total;
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
            this.$router.push({ path: '/online-detail', query: { id: item.id } });
        },
    },
    components: {
        Card,
    },
};
</script>
<style scoped>
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
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .list-box li{
    display: block;
    margin-bottom: 30px;
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
    margin: 10px 0 30px 0;
  }
  .nav-list .group{
    text-align: center;
  }
  .nav-list .group .item{
    display: inline-block;
    margin-right: 40px;
    cursor: pointer;
  }
  .nav-list .group .item.tips{
    margin-right: 10px;
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
  }
  .online-box .online-nav-right,
  .online-box .online-nav-left{
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    display: block;
    position: relative;
    flex-grow:1;
  }
  .online-box .online-nav-left{
    width: 98px;
    flex-grow:0;
  }

  .online-box .online-nav-left .item{
    display: flex;
    font-size: 14px;
    color: #444444;
    letter-spacing: 0;
    min-height: 40px;
    line-height: 20px;
    cursor: pointer;
    align-items: center;
    border: none;
    padding-top: 10px;
  }
  .active,
  .online-nav-left .item:hover,
  .online-nav-right-list span:hover,
  .contain .online-box .active{
    color: #FB683C;
  }

  .online-nav-right-list li{
    font-size: 14px;
    color: #868686;
    height: 40px;
    line-height: 20px;
     border-bottom: 1px dashed #d4d4d4;
    padding: 20px 0 0px 88px;
    position: relative;
    overflow: hidden;
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
