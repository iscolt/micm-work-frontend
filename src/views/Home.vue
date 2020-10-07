<template>
  <div class="app">
    <el-row :gutter="20" style="margin-top: 36px">
      <el-col :span="3"><div class="grid-content bg-purple" style="color: white">.</div></el-col>
      <el-col :span="18">
        <el-row :gutter="12">
          <el-tabs :tab-position="tabPosition" value="1" @tab-click="handleClick" style="overflow:auto">
            <el-tab-pane label="我的" v-if="token" name="3">
              <Homework :list="homework"/>
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
        </el-row>
      </el-col>
      <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
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
    this.fetch(this.status)
  },
  data() {
    return {
      homework: [1,2,3],
      tabPosition: 'left',
      status: 1,
      token: localStorage.getItem("token")
    }
  },
  methods: {
    fetch(status) {
      listByStatus(status).then(res => {
        if (res.code === 200) {
          this.homework = res.data
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
    }
  },
}
</script>

<style scoped>
  .app {
    width: 100%;
  }
</style>
