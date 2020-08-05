<template>
  <div>
    <el-row class="row-1">
      <el-col>
        <label class="label-1">项目管理</label>
      </el-col>
    </el-row>
    <div class="div-1">
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogFormVisible = true">添加项目</el-button>
        </el-col>
      </el-row>
      <el-row class="row-2">
        <el-col>
          <el-table
            :data="tableData"
            class="table-1">
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
import {addProject, deleteProject, getProjectInfo} from '../api/project-manage.ts'

export default {
  name: 'ProjectManage',
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
      deleteProject({projectname: row.projectname}).then(ret => {
        console.log(ret.data.data)
        this.$message({
          message: '删除项目——' + ret.data.data + '——成功',
          type: 'success'
        })
      })
    },
    onSubmit (ruleForm) {
      const that = this
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          addProject({
            projectname: this.form.projectName,
            keyword: this.form.keyWord
          }).then(function (ret) {
            console.log(ret.data.data)
            that.$message({
              message: '添加项目——' + ret.data.data.projectname + '——成功',
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
    getProjectInfo().then(res => {
      this.tableData = res.data.project
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
