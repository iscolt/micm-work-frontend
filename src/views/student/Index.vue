<template>
  <div>
    <el-row :gutter="20" style="margin-top: 36px">
      <el-col :span="1"><div class="grid-content bg-purple" style="color: white">.</div></el-col>
      <el-col :span="22">
        <el-row :gutter="12">
          <el-upload
              class="upload-demo"
              :action="serviceUrl + '/student/import/excel'"
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
                prop="number"
                label="学号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱">
            </el-table-column>
            <el-table-column
                prop=""
                width="200"
                label="是否初始化">
              <template slot-scope="scope">
                <el-tag :type="scope.row.init === 1 ? 'success' : 'info'" size="medium">{{ scope.row.init === 1 ? '初始化' : '未初始化' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                prop=""
                width="220"
                label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    :type="scope.row.deleted ? 'success' : 'info'"
                    @click="handleFreeze(scope.row)">{{ scope.row.deleted ? "解冻" : "冻结" }}</el-button>
                <el-button
                    size="mini"
                    @click="handleReset(scope.row)">重置</el-button>
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
import {list, freeze, reset} from "@/api/student";
import {serviceUrl as baseUrl} from "@/utils/request";

export default {
  name: "Student",
  created() {
    this.isLogin()
    this.isAdmin()
    this.fetch()
  },
  data() {
    return {
      list: [],
      fileList: [],
      serviceUrl: baseUrl,
      header: {
        token: localStorage.getItem("token")
      },
    }
  },
  methods: {
    fetch() {
      list().then(res => {
        if (res.code === 200) {
          this.list = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 重置
     * @param student
     */
    handleReset(student) {
      this.$confirm('确定重置此账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reset(student.id).then(res => {
          if (res.code === 200) {
            this.fetch()
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });
      });

    },
    handleFreeze(student) {
      freeze(student.id).then(res => {
        if (res.code === 200) {
          this.fetch()
        }
        this.$message.success(res.message)
      })
    },
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
