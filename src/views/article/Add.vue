<template>
  <div>
    <el-page-header @click="$router.back(-1)" content="发布文章" style="margin-top: 5px;">
    </el-page-header>
    <el-row>
      <el-col :span="4"><div>.</div></el-col>
      <el-col :span="16">
        <div style="margin: 5px">
          标题：<el-input v-model="form.title"></el-input>
          <hr/>
          <mavon-editor
              v-model="form.content"
              ref="md"
              :ishljs = "true"
              @change="change"
              style="min-height: 600px"
          />

          <el-button @click="submit" type="primary">提交</el-button>
        </div>
      </el-col>
      <el-col :span="4"><div></div></el-col>
    </el-row>
  </div>
</template>

<script>
// 导入组件 及 组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {add} from "@/api/article";
export default {
  name: "Add",
  // 注册
  components: {
    mavonEditor,
  },
  created() {
    this.isLogin()
    this.isAdmin()
  },
  data() {
    return {
      form: {
        content: '',
        html: '',
        title: ''
      },
    }
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render){
      // render 为 markdown 解析后的结果[html]
      this.form.html = render;
    },
    // 提交
    submit(){
      if (this.form === '' || this.form == null) {
        this.$message.error("标题不能为空");
        return
      }
      add(this.form).then(res => {
        if (res.code === 200) {
          this.form = {
            content: '',
            html: '',
            title: ''
          }
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
      })
    },
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
