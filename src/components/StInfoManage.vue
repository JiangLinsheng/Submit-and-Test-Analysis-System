<template>
  <div>
    <el-row class=row-1>
      <el-col>
        <label class="label-1">提测管理</label>
      </el-col>
    </el-row>
    <div class="div-1">
      <el-row>
        <el-col>
          <el-button type="primary" @click="addStInfo">添加</el-button>
        </el-col>
      </el-row>
      <el-row class="row-2">
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
                <el-button @click="handelStatus(scope.$index, scope.row)" type="text" size="small">更新状态</el-button>
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
    <el-dialog title="更新状态" :visible.sync="stepVisible" :before-close="handleClose">
      <el-steps :active="stepActive" finish-status="success" simple>
        <el-step title="开启(open)" ></el-step>
        <el-step title="进行中(ongoing)" ></el-step>
        <el-step title="结束(end)" ></el-step>
      </el-steps>
      <div slot="footer" class="dialog-footer">
        <el-button @click="next">更新状态</el-button>
        <el-button type="primary" @click="complete">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addStInfo, deleteStInfo, getStInfo, updateStInfo, updateStatus} from '../api/st-manage.ts'
import {getUserInfo} from '../api/staff-manage.ts'
import {getProjectInfo} from '../api/project-manage.ts'

export default {
  name: 'StInfoManage',
  data () {
    return {
      tableData: [],
      addFormVisible: false,
      stepVisible: false,
      formLabelWidth: '120px',
      user: [],
      project: [],
      versions: ['v1.0.0', 'v2.0.0', 'v3.0.0'],
      dialogTitle: '',
      stepActive: '',
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
    handelStatus (index, row) {
      this.stepVisible = true
      if (row.status === 'open') {
        this.stepActive = 1
      } else if (row.status === 'ongoing') {
        this.stepActive = 2
      } else if (row.status === 'end') {
        this.stepActive = 3
      }
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
      this.$confirm('确认删除提测——' + row.projectname + ':' + row.version + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteStInfo({projectname: row.projectname}).then(ret => {
          this.$message({
            message: '删除——' + ret.data.data + '——提测信息成功',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
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
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.addFormVisible = false
          if (this.dialogTitle === '添加') {
            addStInfo({
              projectname: this.addForm.projectName,
              version: this.addForm.version,
              developer: this.addForm.developer,
              inntester: this.addForm.inntester
            }).then(function (ret) {
              console.log(ret.data.data)
              that.$message({
                message: '添加提测——' + ret.data.data.项目名 + '——成功',
                type: 'success'
              })
            })
          } else if (this.dialogTitle === '修改') {
            updateStInfo({
              projectname: this.addForm.projectName,
              version: this.addForm.version,
              developer: this.addForm.developer,
              inntester: this.addForm.inntester
            }).then(function (ret) {
              console.log(ret.data.data)
              that.$message({
                message: '修改提测——' + ret.data.data.项目名 + '——成功',
                type: 'success'
              })
            })
            this.addForm.projectName = ''
            this.addForm.version = ''
            this.addForm.developer = ''
            this.addForm.inntester = ''
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
    },
    next () {
      if (this.stepActive++ > 2) this.stepActive = 0
    },
    complete () {
      const that = this
      this.stepVisible = false
      updateStatus({
        stepActive: this.stepActive
      }).then(function (ret) {
        that.$message({
          message: '修改状态成功——' + ret.data.data,
          type: 'success'
        })
      })
    }
  },
  created () {
    getStInfo().then(res => {
      this.tableData = res.data.stinfo
    })
    getUserInfo().then(res => {
      const users = res.data.user
      for (let i = 0; i < users.length; i++) {
        this.user[i] = users[i].name
      }
    })
    getProjectInfo().then(res => {
      const projects = res.data.project
      for (let i = 0; i < projects.length; i++) {
        this.project[i] = projects[i].projectname
      }
    })
  }
}
</script>

<style scoped>
  .row-1{background-color: white}
  .row-2{margin-top: 10px}
  .label-1{font-family: 微软雅黑;font-size: large}
  .div-1{background-color: white;padding-top: 20px}
</style>
