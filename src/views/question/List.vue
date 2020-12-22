<template>
  <div>
    <el-row :gutter="20" style="margin-top: 36px">
      <el-col :span="1"><div class="grid-content bg-purple" style="color: white">.</div></el-col>
      <el-col :span="22">
        <el-row :gutter="12">
          <el-input style="width: 30%" v-model="subject" placeholder="请输入内容"></el-input>
          <el-upload
              class="upload-demo"
              :action="serviceUrl + `/question/import/excel?subject=${subject}`"
              :headers="header"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
              :file-list="fileList">
            <el-button size="small" type="primary">批量导入</el-button>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
          </el-upload>
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
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import {serviceUrl as baseUrl} from "@/utils/request";

export default {
  name: "List",
  data() {
    return {
      fileList: [],
      serviceUrl: baseUrl,
      header: {
        token: localStorage.getItem("token")
      },
      subject: '计算机组成原理',
    }
  },
  created() {
    this.isLogin()
    this.isAdmin()
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSuccess(response) {
      if (response.code === 200) {
        this.fetch()
        this.$message.success("成功导入")
      } else {
        this.$message.warning("导入失败，移除文件重新导入")
      }
    },
  }
}
</script>

<style scoped>

</style>
