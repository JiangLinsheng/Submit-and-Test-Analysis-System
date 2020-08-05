<template>
  <div class="Login div-1">
    <el-form ref="form" :model="form">
      <el-row type="flex" justify="center">
        <el-col :span="5" class="col-1">
          <el-form-item>
            <label class="label-1">提测分析系统</label>
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
        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="button-1">登录</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {validateLogin} from '../api/validate-login.ts'

export default {
  name: 'UserLogin',
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
      validateLogin({username: this.form.name, password: this.form.password}).then(function (ret) {
        if (ret.data.data === true) {
          that.$message({
            message: '登录成功',
            type: 'success'
          })
          that.$router.push({ path: '/UserHome' })
        } else {
          that.$message.error('账号或密码错误')
        }
      })
    }
  }
}
</script>

<style scoped>
  .div-1{margin-top: 10%;background-color: white}
  .col-1{text-align: center}
  .label-1{font-family: 微软雅黑;font-size: xx-large}
  .button-1{width: 100%}
</style>
