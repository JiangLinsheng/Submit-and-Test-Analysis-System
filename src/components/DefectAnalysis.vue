<template>
  <div>
    <el-row type="flex" align="middle" class=row-1>
      <el-col>
        <el-page-header @back="goBack" content="缺陷分析">
        </el-page-header>
      </el-col>
    </el-row>
    <div class="div-1">
      <el-row type="flex" justify="start" align="middle" class="row-height-1"><el-col><label class="label-1">提测缺陷</label></el-col></el-row>
      <el-row type="flex" justify="start" align="middle" class="row-height-2">
        <el-col :span="2"><label class="label-ml label-color">数据更新时间:</label></el-col>
        <el-col :span="4"><label class="label-color">{{stData.updateTime}}</label></el-col>
      </el-row>
      <el-row type="flex" justify="start" align="middle" class="row-height-2">
        <el-col :span="2"><label class="label-ml label-color">缺陷度:</label></el-col>
        <el-col :span="4"><label class="label-color">{{stData.defectDegree}}</label></el-col>
      </el-row>
      <el-row type="flex" justify="start" align="middle" class="row-height-2">
        <el-col :span="2"><label class="label-ml label-color">缺陷度排名:</label></el-col>
        <el-col :span="4"><label class="label-color">{{stData.defectDegreeRank}}</label></el-col>
      </el-row>
      <el-row type="flex" justify="start" align="middle" class="row-height-2">
        <el-col :span="2"><label class="label-ml label-color">JIRA数:</label></el-col>
        <el-col :span="2"><label class="label-color">blocker:{{stData.jiraNumber[0]}}</label></el-col>
        <el-col :span="2"><label class="label-color">critical:{{stData.jiraNumber[1]}}</label></el-col>
        <el-col :span="2"><label class="label-color">major:{{stData.jiraNumber[2]}}</label></el-col>
        <el-col :span="2"><label class="label-color">minor:{{stData.jiraNumber[3]}}</label></el-col>
        <el-col :span="2"><label class="label-color">trivial:{{stData.jiraNumber[4]}}</label></el-col>
      </el-row>
      <el-row class="row-2">
        <el-col>
          <el-table
            :data="stData.stTableData"
            style="width: 100%"
            :header-cell-style="headerCellStyle"
            class="table-1">
            <el-table-column
              prop="title"
              label="标题"
              width="500">
            </el-table-column>
            <el-table-column
              prop="agent"
              label="经办人">
            </el-table-column>
            <el-table-column
              prop="resolve"
              label="解决人">
            </el-table-column>
            <el-table-column
              prop="priority"
              label="优先级">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="reason"
              label="原因">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="div-2">
      <el-row type="flex" justify="start" align="middle" class="row-height-1"><el-col><label class="label-1">内测缺陷</label></el-col></el-row>
      <el-row type="flex" justify="start" align="middle" class="row-height-2">
        <el-col :span="2"><label class="label-ml label-color">内测开始时间:</label></el-col>
        <el-col :span="4"><label class="label-color">{{inntData.startTime}}</label></el-col>
      </el-row>
      <el-row type="flex" justify="start" align="middle" class="row-height-2">
        <el-col :span="2"><label class="label-ml label-color">内测结束时间:</label></el-col>
        <el-col :span="4"><label class="label-color">{{inntData.endTime}}</label></el-col>
      </el-row>
      <el-row type="flex" justify="start" align="middle" class="row-height-2">
        <el-col :span="3"><label class="label-ml label-color">内测人员问题排名:</label></el-col>
        <el-col :span="4"><label class="label-color">{{inntData.rank}}</label></el-col>
      </el-row>
      <el-row class="row-2">
        <el-col>
          <el-table
            :data="inntData.inntTableData"
            :header-cell-style="headerCellStyle">
            <el-table-column
              prop="title"
              label="标题"
              width="500">
            </el-table-column>
            <el-table-column
              prop="createUser"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="agent"
              label="经办人">
            </el-table-column>
            <el-table-column
              prop="resolve"
              label="解决人">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {getProjectDefectAnalysis} from '../api/st-manage.ts'

export default {
  name: 'DefectAnalysis',
  data () {
    return {
      stData: {
        updateTime: '',
        defectDegree: '',
        defectDegreeRank: '',
        jiraNumber: [],
        stTableData: []
      },
      inntData: {
        startTime: '',
        endTime: '',
        rank: '',
        inntTableData: []
      },
      headerCellStyle: {background: '#eef1f6', color: '#606266'}
    }
  },
  methods: {
    goBack () {
      this.$router.push({ path: '/StInfoManage' })
    }
  },
  created () {
    getProjectDefectAnalysis({projectName: this.$route.query.projectName}).then(ret => {
      console.log(ret.data.data)
      this.stData = ret.data.data.stData
      this.inntData = ret.data.data.inntData
    })
  }
}
</script>

<style scoped>
  .row-1{background-color: white;margin-top: -20px;height: 50px}
  .row-2{margin-top: 20px;margin-left: 20px;margin-right: 20px}
  .div-1{background-color: white;margin-top: 20px;margin-left: 20px;margin-right: 20px}
  .div-2{background-color: white;margin-top: 50px;margin-left: 20px;margin-right: 20px}
  .label-1{color:black;font-size: x-large;margin-left: 20px}
  .label-ml{margin-left: 20px}
  .label-color{color: #606266}
  .row-height-1{height: 60px}
  .row-height-2{height: 40px}
</style>
