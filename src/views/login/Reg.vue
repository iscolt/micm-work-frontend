<template>
    <div style="padding: 20px;">
        <el-page-header @back="$router.push('/')" content=""></el-page-header>
        <el-row :gutter="20" style="margin-top: 36px">
          <el-col :xs="1" :sm="1" :md="1" :lg="8" :xl="8"><div style="color: white" class="grid-content bg-purple">.</div></el-col>
          <el-col :xs="22" :sm="22" :md="22" :lg="8" :xl="8">
                <el-form ref="form" :model="form" :label-width="mobile ? '40px' : '80px'">
                    <div style="width: 100%;display: flex;justify-content: center;">
                        <h2>用户注册</h2>
                    </div>
                    <br/>
                    <el-form-item label="班级">
                        <el-input  v-model="form.className"></el-input>
                    </el-form-item>
                    <el-form-item label="学号">
                      <el-input  v-model="form.number"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                      <el-input  v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-radio v-model="form.apply" label="1">《联系管理员验证身份》</el-radio>
                        <el-radio v-model="form.apply" label="0">拒绝</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="reg_email">注册</el-button>
                        <el-button @click="$router.push('/login')">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="8" :xl="8"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>
    </div>
</template>

<script>
  import {reg} from "@/api/student";

  export default {
        name: "Reg",
        data() {
            return {
                mobile: this.isMobile(),
                form: {
                    email: "",
                    number: "",
                    name: "",
                    className: "",
                    password: "",
                    apply: "1"
                }
            }
        },
        created() {
          if (localStorage.getItem('token')) {
              this.$message('请不要重复登陆！')
              this.$router.push('/')
          }
          this.$notify({
            title: '提示',
            message: '<strong>管理QQ：</strong>1329208516<br/> <strong>说明：</strong>暂时只支持计通院',
            dangerouslyUseHTMLString: true,
            duration: 0
          });
        },
        methods: {
            reg_email() {
                if (this.form.apply == 1) {
                    reg(this.form).then(res => {
                        if (res.code === 200) {
                            this.$message.success(res.message)
                            this.$router.push('/login')
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    this.$message('您没有勾选协议')
                }
            },
        }
    }
</script>

<style scoped>

</style>
