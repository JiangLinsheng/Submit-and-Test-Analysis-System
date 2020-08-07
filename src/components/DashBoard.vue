<template>
  <div>
    <el-row type="flex" align="middle" class=row-1>
      <el-col>
        <label class="label-1">仪表盘</label>
      </el-col>
    </el-row>
    <div class="div-1">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs-1">
        <el-tab-pane label="研发质量分析" name="first">
          <label>本季度缺陷总数：{{researchDefectNumberSum}}</label>
          <el-table
            :data="researchQualityAnalysis"
            :header-cell-style="headerCellStyle"
            class="table-1">
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="stData.defectNumber"
              label="缺陷数">
            </el-table-column>
            <el-table-column
              prop="stData.workload"
              label="工作量">
            </el-table-column>
            <el-table-column
              prop="inntData.problemFound"
              label="内测发现问题数">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="handleDeltail(scope.$index, scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="提测质量分析" name="second">
          <label>本季度缺陷总数: {{stDefectNumberSum}}</label>
          <el-table
          :data="stQualityAnalysis"
          :header-cell-style="headerCellStyle"
          class="table-1">
          <el-table-column
            prop="projectName"
            label="项目">
          </el-table-column>
          <el-table-column
            prop="defectNumber"
            label="缺陷数">
          </el-table-column>
          <el-table-column
            prop="version"
            label="版本">
          </el-table-column>
        </el-table>
          <div ref="chart" class="div-4">
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="90%" :before-close="handleClose">
      <el-divider></el-divider>
      <div class="div-3">
        <el-row type="flex" justify="start" align="middle" class="row-height-1"><el-col><label class="label-2">提测缺陷</label></el-col></el-row>
        <el-row type="flex" justify="start" align="middle" class="row-height-2">
          <el-col :span="2"><label class="label-ml label-color">工作量:</label></el-col>
          <el-col :span="4"><label class="label-color">{{stData.workload}}</label></el-col>
        </el-row>
        <el-row type="flex" justify="start" align="middle" class="row-height-2">
          <el-col :span="2"><label class="label-ml label-color">缺陷数:</label></el-col>
          <el-col :span="4"><label class="label-color">{{stData.defectNumber}}</label></el-col>
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
        <el-row type="flex" justify="start" align="middle" class="row-height-1"><el-col><label class="label-2">内测缺陷</label></el-col></el-row>
        <el-row type="flex" justify="start" align="middle" class="row-height-2">
          <el-col :span="2"><label class="label-ml label-color">发现问题数:</label></el-col>
          <el-col :span="4"><label class="label-color">{{inntData.problemFound}}</label></el-col>
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
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="complete">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getResearchQualityAnalysis, getStQualityAnalysis} from '../api/dash-board.ts'

export default {
  name: 'DashBoard',
  data () {
    return {
      activeName: 'first',
      headerCellStyle: {background: '#eef1f6', color: '#606266'},
      dialogVisible: false,
      researchQualityAnalysis: [],
      stData: {
        workload: '',
        defectNumber: '',
        jiraNumber: [],
        stTableData: []
      },
      inntData: {
        problemFound: '',
        inntTableData: []
      },
      stQualityAnalysis: []
    }
  },
  computed: {
    researchDefectNumberSum: function () {
      let sum = 0
      for (let i = 0; i < this.researchQualityAnalysis.length; i++) {
        sum = sum + this.researchQualityAnalysis[i].stData.defectNumber
      }
      return sum
    },
    stDefectNumberSum: function () {
      let sum = 0
      for (let i = 0; i < this.stQualityAnalysis.length; i++) {
        sum = sum + this.stQualityAnalysis[i].defectNumber
      }
      return sum
    },
    projectNameArray: function () {
      let nameArray = []
      for (let i = 0; i < this.stQualityAnalysis.length; i++) {
        nameArray[i] = this.stQualityAnalysis[i].projectName
      }
      return nameArray
    },
    defectNumberArray: function () {
      let numberArray = []
      for (let i = 0; i < this.stQualityAnalysis.length; i++) {
        numberArray[i] = this.stQualityAnalysis[i].defectNumber
      }
      return numberArray
    }
  },
  methods: {
    handleDeltail (index, row) {
      this.dialogVisible = true
      this.stData = row.stData
      this.inntData = row.inntData
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleClick () {
      console.log(this.projectNameArray)
      this.getEchartData()
    },
    complete () {
      this.dialogVisible = false
    },
    getEchartData () {
      const chart = this.$refs.chart
      const myChart = this.$echarts.init(chart)
      if (chart) {
        const option = {
          tooltip: {
            show: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.projectNameArray
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              'name': '缺陷',
              'type': 'bar',
              itemStyle: {
                normal: {
                  color: function (params) {
                    return '#409EFF'
                  },
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}\n{c}'
                  }
                }
              },
              'barWidth': 20,
              'data': this.defectNumberArray
            }
          ]
        }
        myChart.setOption(option)
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      }
      this.$on('hook:destroyed', () => {
        window.removeEventListener('resize', function () {
          myChart.resize()
        })
      })
    }
  },
  created () {
    getResearchQualityAnalysis().then(res => {
      this.researchQualityAnalysis = res.data.researchQualityAnalysis
    })
    getStQualityAnalysis().then(res => {
      this.stQualityAnalysis = res.data.stQualityAnalysis
    })
  }
}
</script>

<style scoped>
  .row-1{background-color: white;margin-top: -20px;height: 50px}
  .label-1{font-family: 微软雅黑;font-size: large;margin-left: 20px}
  .div-1{background-color: white;margin-top: 20px;margin-left: 20px;margin-right: 20px}
  .tabs-1{margin-left: 40px;margin-right: 40px;padding-top: 20px}
  .table-1{margin-top: 20px}
  .row-2{margin-top: 20px;margin-left: 20px;margin-right: 20px}
  .div-2{background-color: white;margin-top: 20px;margin-left: 20px;margin-right: 20px}
  .div-3{background-color: white;margin-top: 50px;margin-left: 20px;margin-right: 20px}
  .label-2{color:black;font-size: x-large;margin-left: 20px}
  .label-ml{margin-left: 20px}
  .label-color{color: #606266}
  .row-height-1{height: 60px}
  .row-height-2{height: 40px}
  .div-4{width: 500px;height: 500px}
</style>
