<template>
  <div>
    <el-card v-for="(o, index) in list" :key="index" class="box-card" shadow="hover" style="margin: 10px">
      <div>
        <div style="display: flex;">
          <h4>
            {{ o.name }}
            <el-tag size="mini">{{ o.subMethod === 0 ? "线上" : "线下" }}</el-tag>
            &nbsp;
            <el-tag type="success" v-if="o.subStatus" size="mini">已提交</el-tag>
          </h4>
        </div>

        <div style="display: flex;">
          <div style="flex: 6">
            <div>{{ o.description }}</div>
          </div>
          <el-upload
              class="upload-demo"
              v-if="o.subMethod === 0 && !mobile"
              :headers="header"
              :limit="1"
              :on-success="handleSuccess"
              :on-exceed="handleExceed"
              drag
              :action="serviceUrl + '/homework/student/sub/' + o.id"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">交作业啦！将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">截至后将无法上传 | <span style="color: red">文件名参考：25马文艺</span></div>
          </el-upload>

        </div>

        <div style="display: flex;">
          <p style="flex: 6">
            <el-link :underline="false" v-if="!mobile">{{ o.begin }}</el-link> {{!mobile?'-':''}} <el-link :underline="false">{{ o.end }}  截止</el-link>
            |
            <el-link :underline="false">{{ o.subMethod === 0 ? "线上提交" : "线下提交" }}</el-link>
          </p>
          <p style="flex: 1;" v-if="!mobile">
<!--            <el-link :underline="false" type="primary" @click="querySubDetail(o)">提交统计</el-link>-->
<!--            |-->
            <el-link :underline="false" type="primary" @click="handleRss(o)">添加提醒</el-link>
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {rss} from "@/api/emailTask";
import {serviceUrl as baseUrl} from "@/utils/request";

export default {
  name: "homework",
  data() {
    return {
      serviceUrl: baseUrl,
      header: {
        token: localStorage.getItem("token")
      },
      mobile: this.isMobile(),
    }
  },
  props: {
    list: Array,
  },
  methods: {
    handleRss(homework) {
      this.$prompt('提前几小时提醒', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: 6,
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '格式不正确'
      }).then(({ value }) => {
        const data = {
          homework,
          hour: value,
        }
        rss(data).then(res => {
          if (res.code === 200) {
            this.$message.success('作业截至前' + value + "小时发送提醒到绑定邮箱")
          } else {
            this.$message.warning(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    handleSuccess(response) {
      if (response.code === 200) {
        this.$message.success("操作成功")
      } else {
        this.$message.warning(response.message)
      }
    },
    handleExceed(files, fileList) {
      console.log(fileList, files)
      this.$message.error("文件超出最大限制，请删除后重新选择")
    }
  }
}
</script>

<style scoped>

</style>
