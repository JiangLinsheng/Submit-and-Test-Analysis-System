<template>
  <div>
    <el-row class="row-1">
      <el-col>
        <label class="label-1">用户管理</label>
      </el-col>
    </el-row>
    <div class="div-1">
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        </el-col>
      </el-row>
      <el-row class="row-2">
        <el-col>
          <el-table
            :data="tableData"
          class="table-1">
            <el-table-column
              prop="name"
              label="姓名"
              width="300">
            </el-table-column>
            <el-table-column
              prop="jiraname"
              label="JIRA用户名"
              width="300">
            </el-table-column>
            <el-table-column
              prop="role"
              label="角色"
              width="300">
            </el-table-column>
            <el-table-column
              prop="sysname"
              label="系统用户名">
            </el-table-column>
            <el-table-column
              label="操作"
              width="300">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改信息</el-button>
                <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="添加" :visible.sync="dialogFormVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="JIRA用户" :label-width="formLabelWidth" prop="jiraname">
        <el-input v-model="form.jiraname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="email" :label-width="formLabelWidth" prop="sysname">
        <el-input v-model="form.sysname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
        <el-select v-model="form.role" placeholder="请选择角色">
          <el-option v-for="(value, name, index) in roles" :label=name :value=value :key=index></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import {addUserInfo, deleteUserInfo, getUserInfo, updateUserInfo} from '../api/staff-manage.ts'

export default {
  name: 'UserManage',
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        username: '',
        password: '',
        jiraname: '',
        role: '',
        sysname: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        jiraname: [
          {required: true, message: '请输入JIRA用户名', trigger: 'blur'}
        ],
        sysname: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        role: [
          {required: true, message: '请选择角色', trigger: 'change'}
        ]
      },
      roles: {
        开发者: 'developer',
        内测人员: 'inntester',
        组长: 'admin',
        产品经理: 'pm'
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleEdit (index, row) {
      updateUserInfo({name: row.name}).then(ret => {
        console.log(ret.data.data)
        this.$message({
          message: '修改用户——' + ret.data.data + '——的信息成功',
          type: 'success'
        })
      })
    },
    handleDelete (index, row) {
      deleteUserInfo({name: row.name}).then(ret => {
        this.$message({
          message: '删除用户——' + ret.data.data + '——成功',
          type: 'success'
        })
      })
    },
    onSubmit (ruleForm) {
      const that = this
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          addUserInfo({
            name: this.form.username,
            password: this.form.password,
            jiraname: this.form.jiraname,
            role: this.form.role,
            sysname: this.form.sysname
          }).then(function (ret) {
            console.log(ret.data.data)
            that.$message({
              message: '添加用户——' + ret.data.data.姓名 + '——成功',
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    getUserInfo().then(res => {
      this.tableData = res.data.user
    })
  }
}
</script>

<style scoped>
  .row-1{background-color: white}
  .row-2{margin-top: 10px}
  .label-1{font-family: 微软雅黑;font-size: large}
  .div-1{background-color: white;padding-top: 20px}
  .table-1{width: 100%}
</style>
