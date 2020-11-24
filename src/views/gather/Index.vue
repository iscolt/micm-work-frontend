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
          <el-tab-pane label="赛事介绍" name="zero">
            <h3>第三届”传智杯“全国IT技能大赛</h3>
            <h4>程序设计赛道采用 ACM-ICPC 赛制</h4>


            为了鼓励更多人参与，本次大赛设置了不同难度的赛场，参赛选手可根据自己当前的实力任选一场参赛。
            不管你是“黄金”段位还是“王者”大神，只要你对算法感兴趣，并且至少掌握一种程序设计语言，就能够参加本次大赛。
            重点考察选手的算法和程序设计能力，不考察实际工程中常用的系统编程，多线程编程等等；
            程序设计赛道要求参赛者使用程序设计语言（包括：Java、C/C++、Python）解决挑战性算法问题。程序完成之后提交运行，系统自动判定程序为正确或错误并将运行的结果反馈给参赛者，根据解题数和答题耗时进行排名。

            <h4>参赛费用：</h4>


            本次竞赛不收取任何费用，总决赛参赛人员的差旅及食宿费用自行承担。

            <h4>参赛规则：</h4>


            <p>&nbsp;&nbsp;1.每场比赛均为3小时。在这3小时内，参赛者需使用规定的程序设计语言（仅包括C、C++（C++11/C++14）、Python（Python2/Python3）和Java），按照规定时间内在线上竞赛平台在线CODING，解决若干道挑战性算法问题。参赛者完成每道题后，对代码提交运行，系统将自动判定程序为正确或错误并将运行的结果反馈给参赛者。初赛的每场比赛结束后，系统将根据参赛者的答题准确率和答题耗时，对参赛者进行排名。</p>
            <p>&nbsp;&nbsp;2. 最终排名等于解出题目数量更多的选手排名靠前。解题数量相同时，罚时少的选手排名靠前。因此请尽早提交，并尽可能减少提交次数。</p>
            <p>&nbsp;&nbsp;3. 大赛主办方有权结合参赛者报名情况、竞赛情况等实际因素，调整晋级复赛的人数。</p>

            <h4>比赛平台：</h4>


            若无重大意外，本次比赛将在洛谷评测平台(luogu.com.cn/)上进行。

            <h4>参赛对象：</h4>

            大赛面向中国高校所有专业的在校生（含高职、大专、本科及研究生），具体要求如下：
            <p>&nbsp;&nbsp;1. 参赛者在报名时需具有在校学籍，已毕业的学生也可参加体验，但不具备评奖资格。</p>
            <p>&nbsp;&nbsp;2. 参赛者应保证报名时填写的信息准确有效，并依据参赛系统要求完成“在校学生实名认证”。</p>
            <p>&nbsp;&nbsp;3. 参赛者须遵守所在学校、地区关于学生参加校外活动之规定。</p>
            <p>&nbsp;&nbsp;4. 大赛技术支持单位及有机会接触到比赛试题及数据的人员不具备参赛报名资格。</p>

            *在程序设计赛道中，参赛者须以个人名义参赛。<br/>
            <div style="display: flex;justify-content: center">
              <el-link href="http://dasai.ityxb.com/cxsj.html" target="_blank">点击进入官网>></el-link><br/>
            </div><br/>
            <div style="display: flex;justify-content: center">
              <el-link href="https://jq.qq.com/?_wv=1027&k=DYKlEThN" target="_blank">点击加群，或扫描二维码</el-link><br/>
            </div>
            <el-image
                style="width: 100%;"
                src="https://oss.iscolt.com/20%E8%93%9D%E6%A1%A5%E6%9D%AF%E9%A2%84%E9%80%89.jpg"
                :fit="fit"></el-image>
          </el-tab-pane>
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
      message: '报名时间：2020.10.10 - 2020.12.20 <br/>' +
          '            比赛时间：待定 <br/>' +
          '            比赛地点：待定 <br/>',
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
