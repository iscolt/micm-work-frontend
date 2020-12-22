<template>
  <div>
    <Statistics
        :visible="dialogTableVisible"
        :data="stuSubDetail"
        :homework="homework"
        :changeStatus="changeSubDetailStatus"
        :changeData="querySubDetail"/>
    <el-row :gutter="20" style="margin-top: 36px">
      <el-col :span="1"><div class="grid-content bg-purple" style="color: white">.</div></el-col>
      <el-col :span="22">
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
                <el-form-item label="科目" label-width="80px">
                  <el-autocomplete
                      class="inline-input"
                      v-model="form.subject"
                      :fetch-suggestions="querySearch"
                      placeholder="请输入内容"
                      @select="handleSelectSubject"
                  ></el-autocomplete>
<!--                  <el-select v-model="form.subject" @change="handleSelectSubject" placeholder="请选择">-->
<!--                    <el-option label="Java程序设计" value="Java程序设计"></el-option>-->
<!--                    <el-option label="软件工程" value="软件工程"></el-option>-->
<!--                    <el-option label="计算机组成原理" value="计算机组成原理"></el-option>-->
<!--                    <el-option label="计算机操作系统" value="计算机操作系统"></el-option>-->
<!--                    <el-option label="计算机网络" value="计算机网络"></el-option>-->
<!--                    <el-option label="工程数学" value="工程数学"></el-option>-->
<!--                    <el-option label="数据库系统概论" value="数据库系统概论"></el-option>-->
<!--                    <el-option label="其他" value="其他"></el-option>-->
<!--                  </el-select>-->
                </el-form-item>
                <el-form-item label="标题" label-width="80px">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                  <p style="font-size: 5px">{{form.subject + "_" +form.name}}</p>
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
                <el-form-item v-if="form.subMethod == 0" label="作业命名" label-width="80px">
                  <el-input v-model="form.resourceRule" autocomplete="off"></el-input>
                  <p style="font-size: 5px">学号、邮箱、姓名、班级、科目、作业、_</p>
                </el-form-item>
                <el-form-item v-if="form.subMethod == 0" label="目标邮箱" label-width="80px">
                  <el-input v-model="form.subEmail" type="email" autocomplete="off"></el-input>
<!--                  <el-select v-model="form.subEmail" placeholder="请选择">-->
<!--                    <el-option label="黄老师（Java）" value="361949048@qq.com"></el-option>-->
<!--                    <el-option label="徐老师（软工）" value="328721702@qq.com"></el-option>-->
<!--                    <el-option label="学委" value="1329208516@qq.com"></el-option>-->
<!--                  </el-select>-->
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
                width="200">
              <template slot-scope="scope">
                {{scope.row.subject + "_" + scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column
                prop="begin"
                label="开始"
                v-if="!isMobile">
            </el-table-column>
            <el-table-column
                prop="end"
                label="截止"
                v-if="!isMobile">
            </el-table-column>
            <el-table-column
                prop=""
                width="200"
                label="状态"
                v-if="!isMobile">
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
                    v-if="!isMobile"
                    @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    v-if="!isMobile"
                    @click="handleDelete(scope.row)">删除</el-button>
                <el-button
                    size="mini"
                    type="primary"
                    @click="querySubDetail(scope.row, -1)">统计</el-button>
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
import {listByStatus, add, del, subDetail} from "@/api/homework"
import {parseTime} from "@/utils/index"
import Statistics from "./components/statistics"
import {changeStatus} from "@/api/studentHomework";

const defaultForm = {
  name: '',
  description: '',
  begin: '',
  end: '',
  subMethod: 1,
  subEmail: '',
  subject: '',
  resource: '',
  resourceRule: '',
  status: 0,
}

export default {
  name: "Homework",
  components: {
    Statistics,
  },
  created() {
    this.isLogin()
    this.isAdmin()
    this.fetch()
    this.restaurants = this.loadAll();
  },
  data() {
    return {
      list: [],
      loading: false,
      dialog: false,
      dialogTableVisible: false,
      status: -1,
      form: defaultForm,
      stuSubDetail: [],
      beginAndEnd: [new Date(), new Date()],
      isMobile: this.isMobile(),
      homework: null,
      restaurants: [],
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
    querySubDetail(obj, status) {
      this.homework = obj;
      subDetail(obj.id, status).then(res => {
        if (res.code === 200) {
          this.dialogTableVisible = true
          this.stuSubDetail = res.data
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    changeSubDetailStatus(data) {
      // 改变上交状态
      changeStatus(data.id).then(res => {
        if (res.code === 200) {
          this.querySubDetail(data.homeWork, -1)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleDelete(obj) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(obj.id).then(res => {
          if (res.code === 200) {
            this.fetch()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });
      });
    },
    handleSelect(status) {
      this.status = status
      this.fetch()
    },
    handleEdit(homework) {
      this.form = homework
      this.beginAndEnd = [homework.begin, homework.end]
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
      this.$confirm('确定要提交表单吗？').then(_ => {
            console.log(_)
            this.loading = true;
            this.submit()
            done();
      }).catch(_ => {
        done();
        console.log(_)
      });
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
    },
    handleSelectSubject(e) {
      this.form.subMethod = 0
      switch (e.value){
        case "Java程序设计":
          // this.form.subEmail = "361949048@qq.com"
          return
        case "软件工程":
          // this.form.subEmail = "328721702@qq.com"
          return
      }
      this.form.subMethod = 1
      this.form.subEmail = ""
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "Java程序设计" },
        { "value": "软件工程" },
        { "value": "计算机组成原理" },
        { "value": "计算机操作系统" },
        { "value": "计算机网络" },
        { "value": "工程数学" },
        { "value": "数据库系统概论" },
        { "value": "离散数学" },
        { "value": "青年大学习" },
        { "value": "其它" },
      ];
    },
  }
}
</script>

<style scoped>

</style>
