<template>
  <div class="app">
    <el-row :gutter="20" style="margin-top: 36px">
      <el-col :span="3"><div class="grid-content bg-purple">.</div></el-col>
      <el-col :span="18">
        <el-row :gutter="12">
          <el-tabs :tab-position="tabPosition" style="overflow:auto">
            <el-tab-pane label="进行中">
              <Homework :list="homework"/>
            </el-tab-pane>
            <el-tab-pane label="已结束">
              <Homework :list="homework"/>
            </el-tab-pane>
            <el-tab-pane label="未开始">
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
import {listByStatus} from "@/api/homework";
import Homework from "./common/homework"

export default {
  name: 'Home',
  components: {
    Homework,
  },
  created() {
    // this.fetch(1)
  },
  data() {
    return {
      homework: [1,2,3],
      tabPosition: 'left',
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
    }
  },
}
</script>

<style scoped>
  .app {
    width: 100%;
  }
</style>
