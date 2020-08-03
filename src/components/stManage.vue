<template>
  <div>
    <el-row style="background-color: white">
      <el-col>
        <label style="font-family: 微软雅黑;font-size: large">提测管理</label>
      </el-col>
    </el-row>
    <div style="background-color: white;padding-top: 20px">
      <el-row>
        <el-col>
          <el-button type="primary" @click="addStInfo">添加</el-button>
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
              prop="version"
              label="版本号">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="createtime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="createuser"
              label="创建人">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="defectAnalysis(scope.$index, scope.row)" type="text" size="small">缺陷分析</el-button>
                <el-button @click="updateStatus(scope.$index, scope.row)" type="text" size="small">更新状态</el-button>
                <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改信息</el-button>
                <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="addFormVisible" :before-close="handleClose">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="项目" :label-width="formLabelWidth" prop="projectName">
          <el-select v-model="addForm.projectName" placeholder="请选择">
            <el-option v-for="p in project" :label=p :value=p :key=p></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" :label-width="formLabelWidth" prop="version">
          <el-select v-model="addForm.version" placeholder="请选择">
            <el-option v-for="v in versions" :label=v :value=v :key=v></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开发人员" :label-width="formLabelWidth" prop="developer">
          <el-select v-model="addForm.developer" placeholder="请选择">
            <el-option v-for="u in user" :label=u :value=u :key=u></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内测人员" :label-width="formLabelWidth" prop="inntester">
          <el-select v-model="addForm.inntester" placeholder="请选择">
            <el-option v-for="u in user" :label=u :value=u :key=u></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="submit('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'stManage',
  data () {
    return {
      tableData: [],
      addFormVisible: false,
      formLabelWidth: '120px',
      user: [],
      project: [],
      versions: ['v1.0.0', 'v2.0.0', 'v3.0.0'],
      dialogTitle: '',
      addForm: {
        projectName: '',
        version: '',
        developer: '',
        inntester: ''
      },
      addRules: {
        projectName: [
          {required: true, message: '请选择项目名称', trigger: 'change'}
        ],
        version: [
          {required: true, message: '请选择版本', trigger: 'change'}
        ],
        inntester: [
          {required: true, message: '请选择内测人员', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.addForm.projectName = ''
          this.addForm.version = ''
          this.addForm.developer = ''
          this.addForm.inntester = ''
        })
        .catch(_ => {})
    },
    defectAnalysis (index, row) {
    },
    updateStatus (index, row) {
    },
    handleEdit (index, row) {
      this.addFormVisible = true
      this.dialogTitle = '修改'
      this.addForm.projectName = row.projectname
      this.addForm.version = row.version
      this.addForm.developer = row.developer
      this.addForm.inntester = row.inntester
    },
    handleDelete (index, row) {
      const that = this
      that.$confirm('确认删除项目——' + row.projectname + ':' + row.version + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/deleteStInfo', {projectname: row.projectname}).then(ret => {
          console.log(ret.data.data)
          if (ret.data.data === '删除提测成功') {
            that.$message({
              message: '删除提测成功',
              type: 'success'
            })
          } else {
            that.$message.error('删除提测失败')
          }
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addStInfo () {
      this.addFormVisible = true
      this.dialogTitle = '添加'
    },
    submit (ruleForm) {
      const that = this
      that.$refs[ruleForm].validate((valid) => {
        if (valid) {
          that.addFormVisible = false
          if (that.dialogTitle === '添加') {
            this.$axios.post('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/addStInfo', {
              projectname: that.addForm.projectName
            }).then(function (ret) {
              console.log(ret.data.data)
              if (ret.data.data === '添加提测成功') {
                that.$message({
                  message: '添加提测成功',
                  type: 'success'
                })
              } else {
                that.$message.error('添加提测失败')
              }
            })
          } else if (that.dialogTitle === '修改') {
            this.$axios.put('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/updateStInfo', {
              version: that.addForm.version
            }).then(function (ret) {
              console.log(ret.data.data)
              if (ret.data.data === '修改提测成功') {
                that.$message({
                  message: '修改提测成功',
                  type: 'success'
                })
              } else {
                that.$message.error('修改提测失败')
              }
            })
            that.addForm.projectName = ''
            that.addForm.version = ''
            that.addForm.developer = ''
            that.addForm.inntester = ''
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelSubmit () {
      this.addFormVisible = false
      this.addForm.projectName = ''
      this.addForm.version = ''
      this.addForm.developer = ''
      this.addForm.inntester = ''
    }
  },
  created () {
    const that = this
    this.$axios.get('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/getStInfo').then(res => {
      that.tableData = res.data.stinfo
    })
    this.$axios.get('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/getUserInfo').then(res => {
      const users = res.data.user
      for (let i = 0; i < users.length; i++) {
        that.user[i] = users[i].name
      }
    })
    this.$axios.get('http://localhost:7300/mock/5f22bb4294e2122bb80ffbec/stms/getProjectInfo').then(res => {
      const projects = res.data.project
      for (let i = 0; i < projects.length; i++) {
        that.project[i] = projects[i].projectname
      }
    })
  }
}
</script>

<style scoped>

</style>
