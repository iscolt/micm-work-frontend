<template>
    <div style="padding: 20px;">
<!--        <el-page-header @back="$router.push('/')" content=""></el-page-header>-->
<!--        <el-row :gutter="20" style="margin-top: 36px">-->
<!--            <el-col :span="8"><div class="grid-content bg-purple" style="color: white">.</div></el-col>-->
<!--            <el-col :span="8">-->
<!--                <el-form ref="form" :model="form" label-width="80px">-->
<!--                    <div style="width: 100%;display: flex;justify-content: center;">-->
<!--                        <h2>用户登录</h2>-->
<!--                    </div>-->
<!--                    <br/><br/>-->
<!--                    <el-form-item label="学号">-->
<!--                        <el-input v-model="form.number"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="密码">-->
<!--                        <el-input type="password" v-model="form.password"></el-input>-->
<!--&lt;!&ndash;                        <el-link type="warning" :underline="false" @click="$router.push('/forget')">&ndash;&gt;-->
<!--&lt;!&ndash;                            忘记密码？&ndash;&gt;-->
<!--&lt;!&ndash;                        </el-link>&ndash;&gt;-->
<!--                    </el-form-item>-->
<!--                    <el-form-item>-->
<!--                        <el-radio v-model="form.apply" label="1">《第一次输入的密码自动设为登陆密码》</el-radio>-->
<!--                        <el-radio v-model="form.apply" label="0">拒绝</el-radio>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item>-->
<!--                        <el-button type="primary" @click="login_pwd">登录</el-button>-->
<!--                        <el-button>注册</el-button>-->
<!--                    </el-form-item>-->
<!--                </el-form>-->
<!--            </el-col>-->
<!--            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>-->
<!--        </el-row>-->
      <el-page-header @back="$router.push('/')" content=""></el-page-header>
      <el-row :gutter="20" style="margin-top: 36px">
        <el-col :xs="1" :sm="1" :md="1" :lg="8" :xl="8"><div style="color: white" class="grid-content bg-purple">.</div></el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="8" :xl="8"><div class="grid-content bg-purple-light">
          <el-form ref="form" :model="form" :label-width="mobile ? '40px' : '80px'">
            <div style="width: 100%;display: flex;justify-content: center;">
              <h2>用户登录</h2>
            </div>
            <br/><br/>
            <el-form-item label="学号">
              <el-input v-model="form.number"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="form.password"></el-input>
<!--              <el-link type="warning" :underline="false" @click="$router.push('/forget')">-->
<!--                  忘记密码？-->
<!--              </el-link>-->
            </el-form-item>
            <el-form-item>
              <el-radio v-model="form.apply" label="1">第一次输入的为登陆密码</el-radio>
              <el-radio v-model="form.apply" label="0">拒绝</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login_pwd">登录</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </div></el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="8" :xl="8"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>
    </div>
</template>

<script>
    import { login } from '@/api/student.js'

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    number: '',
                    password: '',
                    apply: '1',
                },
                mobile: this.isMobile()
            }
        },
        created() {
          if (localStorage.getItem('token')) {
              this.$message('请不要重复登陆！')
              this.$router.push('/home')
          }
        },
        methods: {
            login_pwd() {
                if (this.form.apply == 1) {
                    login(this.form).then(res => {
                        if (res.code === 200) {
                            localStorage.setItem("token", res.data.token)
                            localStorage.setItem("role", res.data.role)
                            // 存一个用户信息
                            this.$router.push('/home')
                            location.reload()
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
