<template>
  <div>
    <el-card v-for="(o, index) in list" :key="index" class="box-card" shadow="hover" style="margin: 10px">
      <div>
        <div style="display: flex;">
          <h4>作业标题{{ o.name }} <el-tag size="mini">线上</el-tag></h4>
        </div>

        <div style="display: flex;">
          <div style="flex: 6">
            <p>
                这里是描述{{ o.description }}
                这里是描述{{ o.description }}
            </p>
          </div>
          <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">交作业啦！将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">截至后将无法上传 | 重复提交会覆盖</div>
          </el-upload>

        </div>

        <div style="display: flex;">
          <p style="flex: 8">
            <el-link :underline="false">2020-10-20</el-link> - <el-link :underline="false">2020-10-20  截止</el-link>
            |
            <el-link :underline="false">线上提交</el-link>
          </p>
          <p style="flex: 1;"><el-link :underline="false" type="primary">查看已提交</el-link> | <el-link :underline="false" type="primary">添加提醒</el-link></p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "homework",
  props: {
    list: Array,
  },
}
</script>

<style scoped>

</style>
