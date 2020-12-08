<template>
  <div class="app">
<!--    <el-row :gutter="20" style="margin-top: 36px">-->
<!--      <el-col :span="3"><div class="grid-content bg-purple" style="color: white">.</div></el-col>-->
<!--      <el-col :span="18">-->
<!--        <el-row :gutter="12">-->
<!--          <el-tabs :tab-position="tabPosition" value="1" @tab-click="handleClick" style="overflow:auto">-->
<!--            <el-tab-pane label="我的" v-if="token" name="3">-->
<!--              <Homework :list="homework"/>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="进行中" name="1">-->
<!--              <Homework :list="homework"/>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="已结束" name="2">-->
<!--              <Homework :list="homework"/>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="全部" name="-1">-->
<!--              <Homework :list="homework"/>-->
<!--            </el-tab-pane>-->
<!--          </el-tabs>-->
<!--        </el-row>-->
<!--      </el-col>-->
<!--      <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>-->
<!--    </el-row>-->
    <el-row :gutter="10" style="margin-top: 36px">
      <el-col :xs="1" :sm="1" :md="3" :lg="3" :xl="3"><div style="color: white" class="grid-content bg-purple">.</div></el-col>
      <el-col :xs="22" :sm="22" :md="18" :lg="18" :xl="18"><div class="grid-content bg-purple-light">
        <el-tabs :tab-position="tabPosition" value="1" @tab-click="handleClick" style="overflow:auto">
          <el-tab-pane label="我的" v-if="token" name="3">
            <el-checkbox v-model="showSubed" style="margin-left: 10px">进行中&未提交的作业</el-checkbox>
            <Homework :list="homework" :showSubed="showSubed"/>
          </el-tab-pane>
          <el-tab-pane label="进行中" name="1">
            <Homework :list="homework"/>
          </el-tab-pane>
          <el-tab-pane label="已结束" name="2">
            <Homework :list="homework"/>
          </el-tab-pane>
          <el-tab-pane label="全部" name="-1">
            <Homework :list="homework"/>
          </el-tab-pane>
        </el-tabs>
      </div></el-col>
      <el-col :xs="1" :sm="1" :md="3" :lg="3" :xl="3"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import {listByStatus, owner} from "@/api/homework";
import Homework from "./common/homework"

export default {
  name: 'Home',
  components: {
    Homework,
  },
  created() {
    if (!this.isLogin()) {
      return ;
    }
    this.fetch(this.status)
  },
  data() {
    return {
      homework: [],
      tabPosition: this.isMobile() ? 'top' : 'left',
      status: 1,
      token: localStorage.getItem("token"),
      mobile: this.isMobile(),
      timer: null,
      showSubed: false,
    }
  },
  methods: {
    fetch(status) {
      listByStatus(status).then(res => {
        if (res.code === 200) {
          this.homework = res.data
          this.timer = setInterval(()=>{
            this.timeDown()
          },1000)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleClick(obj) {
      this.status = obj.name
      if (obj.name == 3) {
        owner().then(res => {
          if (res.code === 200) {
            this.homework = res.data
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.fetch(obj.name)
      }
    },
    timeDown () {
      if (!this.homework) {
        return
      }
      let newHomework = []
      this.homework.forEach(obj => {
        const nowTime = new Date();
        let leftTime = parseInt((new Date(obj.end).getTime()-nowTime.getTime())/1000)
        let d = parseInt(leftTime/(24*60*60))
        let h = this.formate(parseInt(leftTime/(60*60)%24))
        let m = this.formate(parseInt(leftTime/60%60))
        let s = this.formate(parseInt(leftTime%60))
        if(leftTime <= 0){
          obj.countdown = '已截止'
        } else {
          obj.countdown = `${d}天${h}小时${m}分${s}秒 后截止`
        }
        newHomework.push(obj)
      })
      this.homework = newHomework
    },
    formate (time) {
      if(time>=10){
        return time
      }else{
        return `0${time}`
      }
    },
    destroyed() {
      //切记页面销毁需要销毁
      clearInterval(this.timer);
    }
  },
}
</script>

<style scoped>
  .app {
    width: 100%;
  }
</style>
