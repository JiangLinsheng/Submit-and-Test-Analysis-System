<template>
  <div class="Login" style="margin-top: 10%;background-color: white">
    <el-form ref="form" :model="form">
      <el-row type="flex" justify="center">
        <el-col :span="5" style="text-align: center">
          <el-form-item>
            <label style="font-family: 微软雅黑;font-size: xx-large">提测分析系统</label>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item>
            <el-input prefix-icon="el-icon-user" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item>
            <el-input prefix-icon="el-icon-lock" v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="5" style="text-align: center">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="width: 100%">登录</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      const that = this
      this.$axios.get('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/getUserInfo').then(res => {
        if (res.data.user.find((user) => user.name === that.form.name && user.password === that.form.password)) {
          that.$message({
            message: '登录成功',
            type: 'success'
          })
          that.$router.push({ path: '/home' })
        } else {
          that.$message.error('账号或密码错误')
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
