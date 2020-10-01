<template>
  <div>
    <el-row :gutter="20" style="margin-top: 36px">
      <el-col :span="3"><div class="grid-content bg-purple">.</div></el-col>
      <el-col :span="18">
        <el-row :gutter="12">
          <el-select :value="status" @change="handleSelect" placeholder="请选择">
            <el-option label="全部" value="-1">全部</el-option>
            <el-option label="未开始" value="0"></el-option>
            <el-option label="进行中" value="1"></el-option>
            <el-option label="已结束" value="2"></el-option>
          </el-select>
          &nbsp;
          <el-button type="primary" @click="handleOpen">发布作业</el-button>
          <el-drawer
              title="发布作业"
              :visible.sync="dialog"
              :before-close="handleClose"
              ref="drawer"
              direction="rtl">
            <div class="demo-drawer__content" style="margin-right: 10px">
              <el-form :model="form">
                <el-form-item label="标题" label-width="80px">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="80px">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="起止时间" label-width="80px">
                  <el-date-picker
                      v-model="beginAndEnd"
                      type="datetimerange"
                      @change="handleChooseDate"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="提交方式" v-if="!form.id" label-width="80px">
                  <el-select v-model="form.subMethod" placeholder="选择提交方式">
                    <el-option label="线上" value="0"></el-option>
                    <el-option label="线下" value="1"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item v-if="form.subMethod == 0 && !form.id" label="目标邮箱" label-width="80px">
                  <el-select v-model="form.subEmail" placeholder="请选择">
                    <el-option label="黄老师（Java）" value="361949048@qq.com"></el-option>
                    <el-option label="徐老师（软工）" value="328721702@qq.com"></el-option>
                    <el-option label="学委" value="1329208516@qq.com"></el-option>
                  </el-select>
                </el-form-item>
<!--                <el-form-item label="附件" label-width="80px">-->
<!--                  <el-upload-->
<!--                      class="upload-demo"-->
<!--                      drag-->
<!--                      action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                      multiple>-->
<!--                    <i class="el-icon-upload"></i>-->
<!--                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--                  </el-upload>-->
<!--                </el-form-item>-->
                <el-form-item label="状态" label-width="80px">
                  <el-select v-model="form.status" placeholder="请选择">
                    <el-option label="未开始" value="0"></el-option>
                    <el-option label="进行中" value="1"></el-option>
                    <el-option label="已结束" value="2"></el-option>
                  </el-select>
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
                prop="name"
                label="作业"
                width="180">
            </el-table-column>
            <el-table-column
                prop="begin"
                label="开始">
            </el-table-column>
            <el-table-column
                prop="end"
                label="截止">
            </el-table-column>
            <el-table-column
                prop=""
                width="200"
                label="状态">
              <template slot-scope="scope">
                {{ scope.row.status === 0 ? '未开始' : scope.row.status === 1 ? '进行中' : '已结束' }}
              </template>
            </el-table-column>
            <el-table-column
                prop=""
                width="220"
                label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">编辑</el-button>
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
import {listByStatus, add, del} from "@/api/homework"
import {parseTime} from "@/utils/index"

const defaultForm = {
  name: '',
  description: '',
  begin: '',
  end: '',
  subMethod: 0,
  subEmail: '',
  resource: '',
  status: 0,
}

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
      status: -1,
      form: defaultForm,
      beginAndEnd: [new Date(), new Date()]
    }
  },
  methods: {
    fetch() {
      if (!this.status) {
        this.status = -1
      }
      listByStatus(this.status).then(res => {
        if (res.code === 200) {
          this.list = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    submit() {
      if (this.beginAndEnd[0] && this.beginAndEnd[1]) {
        this.form = {
          ...this.form,
          begin: parseTime(this.beginAndEnd[0]),
          end: parseTime(this.beginAndEnd[1])
        }
        if (this.form.subMethod === 0 && !this.form.subEmail) {
          this.$message.warning("请选择邮箱")
          this.loading = false
          return;
        }
        add(this.form).then(res => {
          if (res.code === 200) {
            this.fetch()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      }
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
    },
    handleSelect(status) {
      this.status = status
      this.fetch()
    },
    handleEdit(homework) {
      this.form = homework
      this.dialog = true
    },
    handleChooseDate(value) {
      this.beginAndEnd = value
    },
    handleOpen() {
      this.dialog = true
      this.form = defaultForm
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
          .then(_ => {
            console.log(_)
            this.loading = true;
            this.submit()
            done();
          })
          .catch(_ => {
            done();
            console.log(_)
          });
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>
