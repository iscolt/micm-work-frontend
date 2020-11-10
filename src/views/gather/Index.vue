<template>
  <div>
    <el-row :gutter="10" style="margin-top: 16px">
      <el-col :xs="1" :sm="1" :md="3" :lg="9" :xl="9"><div style="color: white" class="grid-content bg-purple">.</div></el-col>
      <el-col :xs="22" :sm="22" :md="18" :lg="6" :xl="6">
        <el-image
            style="width: 100%;"
            src="https://oss.iscolt.com/njpji.png"
            :fit="fit"></el-image>
        <el-tabs v-model="tabPane">
          <el-tab-pane label="预选报名" name="first">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
              <el-form-item label="学院" prop="region">
                <el-select v-model="ruleForm.college" filterable placeholder="请选择学院">
                  <el-option v-for="o in college"
                             :key="o.name"
                             :label="o.name"
                             :value="o.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级" prop="className">
                <el-input v-model="ruleForm.className"></el-input>
              </el-form-item>
              <el-form-item label="学号" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="QQ" prop="qq">
                <el-input v-model="ruleForm.qq"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即报名</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="名单公示" name="second">
            <el-select v-model="collegeSelect" filterable placeholder="请选择" @change="fetch">
              <el-option label="全部" value="-1"></el-option>
              <el-option v-for="o in college"
                         :key="o.name"
                         :label="o.name"
                         :value="o.name"></el-option>
            </el-select>&nbsp;
            <el-button type="primary" v-if="isAdmin">导出</el-button>
            <div style="display: flex;justify-content: center">
              <el-table
                  :data="tableData"
                  style="width: 100%">
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
<!--                <el-table-column label="操作" v-if="isAdmin">-->
<!--                  <template slot-scope="scope">-->
<!--                    <el-button-->
<!--                        size="mini"-->
<!--                        type="danger"-->
<!--                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--                  </template>-->
<!--                </el-table-column>-->
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交流群" name="third">
            <div style="display: flex;justify-content: center">
              <el-link href="https://jq.qq.com/?_wv=1027&k=DYKlEThN" target="_blank">点击加群，或扫描二维码</el-link><br/>
            </div>
            <el-image
                style="width: 100%;"
                src="https://oss.iscolt.com/20%E8%93%9D%E6%A1%A5%E6%9D%AF%E9%A2%84%E9%80%89.jpg"
                :fit="fit"></el-image>
          </el-tab-pane>
        </el-tabs>
        <div style="display: flex;justify-content: center;">
          <el-link type="info">承办方：@20计科转本01班</el-link>
        </div>
      </el-col>
      <el-col :xs="1" :sm="1" :md="3" :lg="9" :xl="9"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import {listByCollege, apply} from "@/api/lianQiaoGather";

export default {
  name: "DataGather",
  data() {
    return {
      tabPane: 'first',
      collegeSelect: '',
      isAdmin: localStorage.getItem('role') == 1 ? true : false,
      ruleForm: {
        college: '',
        className: '',
        number: '',
        name: '',
        phone: '',
        qq: '',
      },
      rules: {
        college: [
          {required: true, message: '请选择学院', trigger: 'blur'},
        ],
        className: [
          {required: true, message: '请输入班级', trigger: 'blur'},
        ],
        number: [
          {required: true, message: '请输入学号', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        qq: [
          {required: true, message: '请输入QQ', trigger: 'blur'},
        ],
      },
      college: [
        {name: "计算机与通信工程学院"},
        {name: "土木与建筑工程学院"},
        {name: "机电学院"},
        {name: "汽车工程学院"},
        {name: "商学院"},
        {name: "工商税务管理学院"},
        {name: "国际酒店与饮食文化学院"},
        {name: "公益慈善管理学院"},
        {name: "外国语学院"},
        {name: "艺术学院"},
      ],
      tableData: []
    };
  },
  created() {
    this.$notify({
      title: '提示',
      message: '报名时间：2020.10.28-2020.11.11 <br/>' +
          '            比赛时间：2020.11.11(13:00-15:00) <br/>' +
          '            比赛地点：L8-412 <br/>',
      position: this.isMobile() ? 'top-right' : 'bottom-right',
      dangerouslyUseHTMLString: true,
      duration: 0
    });
    this.fetch()
  },
  methods: {
    submitForm(formName) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      if (!reg.test(this.ruleForm.phone)) {
        this.$message.error("请输入正确的手机号")
        return
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO 提交操作
          apply(this.ruleForm).then(res => {
            if (res.code === 200) {
              this.$message.success(res.message)
              this.fetch()
              this.resetForm('ruleForm')
              this.tabPane='second'
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    fetch() {
      listByCollege(this.collegeSelect).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
