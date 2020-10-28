<template>
  <div>
    <el-row :gutter="20" style="margin-top: 36px">
      <el-col :span="3"><div class="grid-content bg-purple" style="color: white">.</div></el-col>
      <el-col :span="18">
        <el-row :gutter="12">
          <el-select :value="status" @change="handleSelect" placeholder="请选择">
            <el-option label="全部" value="-1">全部</el-option>
            <el-option label="未发送" value="0"></el-option>
            <el-option label="已发送" value="1"></el-option>
            <el-option label="发送失败" value="2"></el-option>
          </el-select>
          <el-table
              :data="list"
              height="600"
              border
              style="width: 100%;margin-top: 20px">
            <el-table-column
                prop="title"
                label="标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="toAddr"
                label="收件人">
            </el-table-column>
            <el-table-column
                prop=""
                width="200"
                label="分类">
              <template slot-scope="scope">
                {{ scope.row.category === 0 ? "作业打包上交" : "作业提醒"}}
              </template>
            </el-table-column>
            <el-table-column
                prop="sendDate"
                label="发送时间">
            </el-table-column>
            <el-table-column
                prop=""
                width="200"
                label="状态">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status !== 1 ? 'danger' : 'success'" size="medium">
                  {{ scope.row.status === 0 ? '未发送' : scope.row.status === 1 ? "已发送" : "发送失败" }}
                </el-tag>
                &nbsp;
                <el-tag :type="scope.row.deleted ? 'danger' : 'success'" size="medium">{{ scope.row.deleted ? '冻结' : '正常' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                prop=""
                width="160"
                label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    :type="scope.row.deleted ? 'success' : 'info'"
                    @click="handleFreeze(scope.row)">{{ scope.row.deleted ? "解冻" : "冻结" }}</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-col>
      <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import {listByStatus, del, freeze} from "@/api/emailTask";

export default {
  name: "EmailTask",
  created() {
    this.isLogin()
    this.isAdmin()
    this.fetch()
  },
  data() {
    return {
      list: [],
      status: '全部',
    }
  },
  methods: {
    fetch() {
      let sta = this.status;
      if (this.status == '全部') {
        sta = -1;
      }
      listByStatus(sta).then(res => {
        if (res.code === 200) {
          this.list = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleSelect(status) {
      this.status = status
      this.fetch()
    },
    handleFreeze(obj) {
      freeze(obj.id).then(res => {
        if (res.code === 200) {
          this.fetch()
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    handleDelete(obj) {
      del(obj.id).then(res => {
        if (res.code === 200) {
          this.fetch()
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
