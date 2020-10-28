<template>
  <div class="tenant" style="width: 98%">
    <el-dialog title="第一学年（下）成长记录统计" width="50%" :visible.sync="visible">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="培养方案" name="1">
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                label="课程"
                prop="name"
                width="200">
            </el-table-column>
            <el-table-column
                label="学分"
                prop="xuefen"
                width="100">
            </el-table-column>
            <el-table-column
                label="课程性质"
                prop="xingzhi"
                width="120">
            </el-table-column>
            <el-table-column
                label="考试类型"
                prop="leixing"
                width="100">
            </el-table-column>
            <el-table-column
                label="成绩"
                prop="score"
                width="100">
            </el-table-column>
            <el-table-column
                label="状态"
                width="80">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status == 1" type="success">通过</el-tag>
                <el-tag v-if="scope.row.status == 0" type="warning">待补考</el-tag>
                <el-tag v-if="scope.row.status == -1" type="danger">待重修</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="活动详情" name="2">
          活动详情。。。
        </el-collapse-item>
        <el-collapse-item title="学业预警" name="3">
          解决方案。。。
        </el-collapse-item>
        <el-collapse-item title="推荐方案" name="4">
          推荐方案。。。
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
    <!-- 基本信息 -->
    <el-row :gutter="20" style="margin-top: 36px;">
      <el-col :span="5"><div class="grid-content bg-purple">.</div></el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-avatar :size="99" :src="user.avatar" @error="true">
            <img src="https://static.hdslb.com/images/akari.jpg"/>
          </el-avatar>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p><el-link :underline="false">测试用户001</el-link></p>
          <p><el-link :underline="false">20计科01班</el-link></p>
          <p><el-link :underline="false">南京工业大学浦江学院</el-link></p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="count">
              <div class="count_item">
                <p>活动</p>
                <p>{{6}}/15</p>
              </div>
              <div class="count_item">
                <p>绩点</p>
                <p>{{3.0}}/4.5</p>
              </div>
              <div class="count_item">
                <p>学分</p>
                <p>{{56}}/120</p>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <!-- 菜单 -->
    <el-row :gutter="20" style="margin-top: 36px">
      <el-col :span="3"><div class="grid-content bg-purple">.</div></el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="办事大厅" name="first">
              <!-- 快捷入口 -->
              <div class="cricle">
                <div class="container">
                  <div class="box" v-for="(menu, index) in sets.hallMenu" :key="index" @click="goPage(menu.route)">
                    <div class="img">
                      <!--                                            <img src="@/assets/icos/录制.png"/>-->
                      <i :class="menu.icon" style="font-size: 50px;"></i>
                    </div>
                    <p>{{menu.name}}</p>
                  </div>
                  <div class="box" @click="activeName2 = 'fourth'" v-if="sets.showAdd">
                    <div class="img">
                      <i class="el-icon-circle-plus-outline" style="font-size: 50px;"></i>
                    </div>
                    <p>添加</p>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="活动管理" name="second">
              <!-- 快捷入口 -->
              <div class="cricle">
                <div class="container">
                  <div class="box" v-for="(menu, index) in sets.practiceMenus" :key="index" @click="goPage(menu.route)">
                    <div class="img">
                      <i :class="menu.icon" style="font-size: 50px;"></i>
                    </div>
                    <p>{{menu.name}}</p>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="我的活动" name="third" v-if="false">
              <el-row :gutter="12">
                <el-col :span="8" v-for="(o, index) in list" :key="index" style="margin-bottom: 12px;">
                  <el-card class="box-card" shadow="hover">
                    <div style="display: flex;justify-content: space-around;align-items: center">
                      <div style="width: 90px">
                        <img :src="o.icon" width="88px" alt="">
                      </div>
                      <div style="width: 60%;">
                        <h4>{{o.title}}</h4>
                        <el-tag v-if="o.status == 10" size="mini" type="warning">早退</el-tag>
                        <el-tag v-if="o.status == 1" size="mini" type="warning">迟到</el-tag>
                        <el-tag v-if="o.status == 0" size="mini" type="danger">缺席</el-tag>
                        <el-tag v-if="o.status == 11" size="mini" type="success">完成</el-tag>
                        <p><el-link :underline="false">{{o.begin}}</el-link></p>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="成长记录" name="third">
              <el-row :gutter="12">
                <el-col :span="8" v-for="(o, index) in list" :key="index" style="margin-bottom: 12px;">
                  <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                      <span>
                        {{ o.title }} <el-tag v-if="o.status == 1" size="mini" type="success">完成</el-tag>
                        <el-tag v-if="o.status == 0" size="mini" type="warning">预警</el-tag>
                        <el-tag v-if="o.status == null || o.status == undefined" size="mini" type="info">未开始</el-tag>
                      </span>
                      <el-button style="float: right; padding: 3px 0" type="text" @click="visible = true">查看详情</el-button>
                    </div>
                    <div class="count">
                      <div class="count_item">
                        <p>活动</p>
                        <p>{{o.activeNum}}/{{ o.targetActiveNum }}</p>
                      </div>
                      <div class="count_item">
                        <p>绩点</p>
                        <p>{{o.jidian}}/{{ o.targetJidian }}</p>
                      </div>
                      <div class="count_item">
                        <p>学分</p>
                        <p>{{o.xuefen}}/{{ o.targetXuefen }}</p>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="设置" name="fourth">
              <el-form ref="form" :model="sets" label-width="80px">
                <el-form-item label="办事大厅:">
                  <el-checkbox-group v-model="sets.hallType">
                    <el-checkbox :label="menu.name" name="type" v-for="(menu, index) in sets.hallMenus" :key="index"  @change="addOpp"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { getPracticeIntegral,getPractice,getPracticeNum } from '@/api/practice.js'

export default {
  name: "UserIndex",
  data() {
    return {
      user: {},
      userDetail: {},
      activeName2: 'first',
      activeNames: ['1'],
      count: {},
      list: [
          {
            title: "第一学年（上）",
            activeNum: 2,
            targetActiveNum: 3,
            jidian: 3.0,
            targetJidian: 4.5,
            xuefen: 20,
            targetXuefen: 20,
            status: 1, // 1 完成指标 0 未完成
          },
        {
          title: "第一学年（下）",
          activeNum: 2,
          targetActiveNum: 3,
          jidian: 3.0,
          targetJidian: 4.5,
          xuefen: 18,
          targetXuefen: 20,
          status: 0,
        },
        {
          title: "第二学年（上）",
          activeNum: 2,
          targetActiveNum: 2,
          jidian: 3.0,
          targetJidian: 4.5,
          xuefen: 18,
          targetXuefen: 20,
          status: 0,
        },
        {
          title: "第二学年（下）",
          activeNum: 0,
          targetActiveNum: 2,
          jidian: 0,
          targetJidian: 4.5,
          xuefen: 0,
          targetXuefen: 18,
        },
        {
          title: "第三学年（上）",
          activeNum: 0,
          targetActiveNum: 2,
          jidian: 0,
          targetJidian: 4.5,
          xuefen: 0,
          targetXuefen: 12,
        },
        {
          title: "第三学年（下）",
          activeNum: 0,
          targetActiveNum: 2,
          jidian: 0,
          targetJidian: 4.5,
          xuefen: 0,
          targetXuefen: 12,
        },
        {
          title: "第四学年（上）",
          activeNum: 0,
          targetActiveNum: 1,
          jidian: 0,
          targetJidian: 4.5,
          xuefen: 0,
          targetXuefen: 10,
        },
        {
          title: "第四学年（下）",
          activeNum: 0,
          targetActiveNum: 0,
          jidian: 0,
          targetJidian: 4.5,
          xuefen: 0,
          targetXuefen: 8,
        },
      ],
      tableData: [{
        name: '数据结构',
        xuefen: 4,
        xingzhi: '必修课',
        leixing: '考试',
        score: 58,
        status: 0, // -1 待重修， 0 待补考，1 通过
      }, {
        name: 'Web应用开发基础',
        xuefen: 4,
        xingzhi: '必修课',
        leixing: '考试',
        score: 88,
        status: 1,
      }, {
        name: 'Linux系统应用',
        xuefen: 3,
        xingzhi: '必修课',
        leixing: '考试',
        score: 58,
        status: -1,
      }, {
        name: 'UI设计基础',
        xuefen: 2,
        xingzhi: '必修课',
        leixing: '考查',
        score: 88,
        status: 1,
      }, {
        name: 'Python程序设计与应用',
        xuefen: 3,
        xingzhi: '选修课',
        leixing: '考试',
        score: 98,
        status: 1,
      }, {
        name: '大数据技术',
        xuefen: 2,
        xingzhi: '选修课',
        leixing: '考试',
        score: 78,
        status: 1,
      }, {
        name: '云计算基础',
        xuefen: 2,
        xingzhi: '选修课',
        leixing: '考试',
        score: 90,
        status: 1,
      }],
      visible: false,
      sets: {
        showAdd: true,
        hallType: ['日程', '我的创建', '活动大厅', '账号中心'],
        hallMenu: [
          {id: '1',route: '/user/schedule', name: '日程', icon: 'el-icon-s-order'},
          {id: '2',route: '/tenant/practice/myCreate', name: '我的创建', icon: 'el-icon-guide'},
          {id: '3',route: '/tenant/practice', name: '活动大厅', icon: 'el-icon-coin'},
          {id: '4',route: '/user/account', name: '账号中心', icon: 'el-icon-user'},
        ],
        hallMenus: [
          {id: '1',route: '/', name: '首页', icon: 'el-icon-s-home'},
          {id: '2',route: '/service', name: '服务大厅', icon: 'el-icon-s-goods'},
          {id: '3',route: '/user/schedule', name: '日程', icon: 'el-icon-s-order'},
          {id: '4',route: '/tenant/practice/myCreate', name: '我的创建', icon: 'el-icon-guide'},
          {id: '5',route: '/tenant/practice/create', name: '新建活动', icon: 'el-icon-circle-plus-outline'},
          {id: '6',route: '/tenant/practice', name: '活动大厅', icon: 'el-icon-coin'},
          {id: '7',route: '/user/account', name: '账号中心', icon: 'el-icon-user'},
        ],
        practiceMenus: [
          {route: '/tenant/practice/myCreate', name: '我的创建', icon: 'el-icon-guide'},
          {route: '/tenant/practice', name: '活动大厅', icon: 'el-icon-coin'},
          {route: '/tenant/practice/create', name: '新建活动', icon: 'el-icon-circle-plus-outline'},
        ],
      },
    }
  },
  created() {
    this.isLogin()
    this.$notify({
      title: '提示',
      message: '此页面功能完善中',
      position: 'bottom-right'
    });
    // this.user = JSON.parse(localStorage.getItem('user'))
    // this.userDetail = JSON.parse(localStorage.getItem('userDetail'))
    // // console.log(this.userDetail)
    // this.getPractice()
    // this.getPracticeIntegral()
    // this.getPracticeNum()
  },
  mounted() {
    if (localStorage.getItem('hallType') != null) {
      this.sets.hallType = JSON.parse(localStorage.getItem('hallType'))
      // console.log('初始化时',this.sets.hallType)
    }
    this.addOpp()
  },
  methods: {
    getPracticeNum() {
      let that =this
      getPracticeNum().then (res =>{
        // console.log(res)
        if(res.code === 20000){
          that.count.num = res.data
        }
      })
    },
    getPracticeIntegral(){
      let that =this
      getPracticeIntegral().then (res =>{
        // console.log(res)
        if(res.code === 20000){
          that.count.integral = res.data
        }
      })
    },
    getPractice(){
      let that = this
      getPractice().then (res =>{
        if (res.code === 20000) {
          that.list = res.data
          // console.log(that.list)
        }
      })
    },
    /**
     * 添加快捷入口
     */
    addOpp() {
      let hallType = this.sets.hallType // 1. 赋值

      if (hallType.length == 5) {
        // 如果等于 5 添加选项不显示
        this.sets.showAdd = false
      } else if (hallType.length >= 5) {
        // 如果大于5 去除数组最后一位, 添加选项不显示
        this.sets.showAdd = false
        hallType.splice(hallType.length-1, 1)
        this.$message({
          message: '最多添加5条数据',
          type: 'warning'
        });
        return
      } else {
        this.sets.showAdd = true
      }

      // 将hallType 存入缓存
      // console.log('存入缓存', JSON.stringify(hallType))
      localStorage.setItem('hallType', JSON.stringify(hallType))
      // 通过 hallType，去hallMenus里 拿hallMenu的值
      this.sets.hallMenu = [] // 设为空，下面重新取值

      hallType.forEach(type => {
        // console.log(type)
        this.sets.hallMenus.forEach(menu => {
          if (menu.name == type) {
            this.sets.hallMenu.push(menu)
            // console.log(this.sets.hallMenu)
          }
        })
      })

      this.sets.hallType = hallType // 2. 取值
    },
    /**
     * 去页面
     */
    goPage(route){
      this.$router.push(route)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
.count {
  display: flex;
  justify-content: space-around;
}
.count_item {
  align-items: center;
  flex-direction: column;
}
.cricle{
  width: 100%;
  margin-top: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container{
  margin-bottom: 88px;
  width: 80%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}
.container .box{
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 100px;
  height: 140px;
  margin: 20px;
}
.container .box .img{
  width: 100px;
  height: 160px;
  box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1),
  -18px -18px 30px rgba(255, 255, 255, 1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efeeee;
  transition: box-shadow .2s ease-out;
  position: relative;
}

.container .box .img  img{
  width: 60px;
  transition: width 0.2s ease-out;
}
.container .box p{
  color: slategrey;
}
.container .box .img:hover{
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2),
  0px 0px 0px rgba(255, 255, 255, 0.8),
  inset 18px 18px 30px rgba(0, 0, 0, 0.1),
  inset -18px -18px 30px rgba(255, 255, 255, 1);
  transition: box-shadow .2s ease-out;
}
.container .box .img:hover img{
  width: 58px;
  transition: width 0.2s ease-out;
}
</style>
