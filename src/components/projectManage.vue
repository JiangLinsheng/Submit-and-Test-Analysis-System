<template>
  <div>
    <el-row style="background-color: white">
      <el-col>
        <label style="font-family: 微软雅黑;font-size: large">项目管理</label>
      </el-col>
    </el-row>
    <div style="background-color: white;padding-top: 20px">
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogFormVisible = true">添加项目</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="projectname"
              label="项目">
            </el-table-column>
            <el-table-column
              prop="keyword"
              label="关键字">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="添加项目" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="项目" :label-width="formLabelWidth" prop="projectName">
          <el-input v-model="form.projectName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键字" :label-width="formLabelWidth" prop="keyWord">
          <el-input v-model="form.keyWord" autocomplete="off"></el-input>
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
  name: 'projectManage',
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        projectName: '',
        keyWord: ''
      },
      rules: {
        projectName: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
        keyWord: [
          {required: true, message: '请输入关键字', trigger: 'blur'}
        ]
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
    handleDelete (index, row) {
      this.$axios.post('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/deleteProject', {projectname: row.projectname}).then(ret => {
        console.log(ret.data.data)
        if (ret.data.data === '删除项目成功') {
          this.$message({
            message: '删除项目成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除项目失败')
        }
      })
    },
    onSubmit (ruleForm) {
      const that = this
      that.$refs[ruleForm].validate((valid) => {
        if (valid) {
          that.dialogFormVisible = false
          this.$axios.post('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/addProject', {
            projectname: that.form.projectName,
            keyword: that.form.keyWord
          }).then(function (ret) {
            console.log(ret.data.data)
            if (ret.data.data === '添加项目成功') {
              that.$message({
                message: '添加项目成功',
                type: 'success'
              })
            } else {
              that.$message.error('添加项目失败')
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
    this.$axios.get('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/getProjectInfo').then(res => {
      that.tableData = res.data.project
    })
  }
}
</script>

<style scoped>

</style>
