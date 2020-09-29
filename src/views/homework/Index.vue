<template>
  <div>
    <el-row :gutter="20" style="margin-top: 36px">
      <el-col :span="3"><div class="grid-content bg-purple">.</div></el-col>
      <el-col :span="18">
        <el-row :gutter="12">
          <el-button type="primary" @click="dialog = true">发布作业</el-button>
          <el-drawer
              title="发布作业"
              :visible.sync="dialog"
              :before-close="handleClose"
              ref="drawer"
              direction="rtl">
            <div class="demo-drawer__content">
              <el-form :model="form">
                <el-form-item label="标题" label-width="80px">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="80px">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="起止时间" label-width="80px">
                  <el-date-picker
                      v-model="value1"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="提交方式" label-width="80px">
                  <el-select v-model="form.subMethod" placeholder="选择提交方式">
                    <el-option label="线上" value="0"></el-option>
                    <el-option label="线下" value="1"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item v-if="form.subMethod == 0" label="目标邮箱" label-width="80px">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="附件" label-width="80px">
                  <el-upload
                      class="upload-demo"
                      drag
                      action="https://jsonplaceholder.typicode.com/posts/"
                      multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="状态" label-width="80px">
                  <el-radio-group v-model="form.status" >
                    <el-radio label="未开始"></el-radio>
                    <el-radio label="进行中"></el-radio>
                    <el-radio label="已结束"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <div class="demo-drawer__footer" style="display: flex;justify-content: center">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
              </div>
            </div>
          </el-drawer>
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
                width="200"
                label="状态">
              <template slot-scope="scope">
                <el-tag :type="scope.row.deleted ? 'danger' : 'success'" size="medium">{{ scope.row.deleted ? '冻结' : '正常' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                prop=""
                width="220"
                label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                    size="mini"
                    type="info"
                    @click="handleDelete(scope.$index, scope.row)">冻结</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit(scope.$index, scope.row)">删除</el-button>
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
import {list} from "@/api/student";

export default {
  name: "Homework",
  created() {
    this.fetch()
  },
  data() {
    return {
      list: [],
      dialog: false,
      loading: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
          .then(_ => {
            console.log(_)
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch(_ => {
            console.log(_)
          });
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  }
}
</script>

<style scoped>

</style>
