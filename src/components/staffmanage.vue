<template>
  <div>
    <el-row style="background-color: white">
      <el-col>
        <label style="font-family: 微软雅黑;font-size: large">用户管理</label>
      </el-col>
    </el-row>
    <div style="background-color: white;padding-top: 20px">
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col>
          <el-table
            :data="tableData"
            style="width: 100%">
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
export default {
  name: 'staffmanage',
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
      this.$axios.put('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/updateUserInfo', {sysname: row.sysname}).then(ret => {
        console.log(ret.data.data)
        if (ret.data.data === '更新成功') {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        } else {
          this.$message.error('更新失败')
        }
      })
    },
    handleDelete (index, row) {
      this.$axios.post('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/deleteUserInfo', {sysname: row.sysname}).then(ret => {
        console.log(ret.data.data)
        if (ret.data.data === '删除成功') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    onSubmit (ruleForm) {
      const that = this
      that.$refs[ruleForm].validate((valid) => {
        if (valid) {
          that.dialogFormVisible = false
          this.$axios.post('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/addUserInfo', {
            name: that.form.username,
            password: that.form.password
          }).then(function (ret) {
            console.log(ret.data.data)
            if (ret.data.data === '添加成功') {
              that.$message({
                message: '添加成功',
                type: 'success'
              })
            } else {
              that.$message.error('添加失败')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    const that = this
    this.$axios.get('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/getUserInfo').then(res => {
      that.tableData = res.data.user
    })
  }
}
</script>

<style scoped>

</style>
