<template>
  <el-container>
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="black"
        text-color="#fff"
        active-text-color="#409EFF"
        :router=true>
        <el-row type="flex" justify="start" align="middle">
          <el-col :span="2"><img src="../assets/logo.png"></el-col>
          <el-col :span="2"><label class="label-1">提测分析系统</label></el-col>
          <el-col :span="2">
            <el-submenu :index="homeRouter[0]">
            <template slot="title">人员管理</template>
            <el-menu-item :index=homeRouter[0]>用户管理</el-menu-item>
            </el-submenu>
          </el-col>
          <el-col :span="2">
            <el-submenu :index="homeRouter[1]">
              <template slot="title">资源管理</template>
              <el-menu-item :index="homeRouter[1]">项目管理</el-menu-item>
              <el-menu-item :index="homeRouter[2]">提测管理</el-menu-item>
            </el-submenu>
          </el-col>
          <el-col :span="2">
            <el-submenu :index="homeRouter[3]">
              <template slot="title">分析</template>
              <el-menu-item :index="homeRouter[3]">仪表盘</el-menu-item>
            </el-submenu>
          </el-col>
        </el-row>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'UserHome',
  data () {
    return {
      homeRouter: [
        '/UserManage',
        '/ProjectManage',
        '/StInfoManage',
        '/DashBoard'
      ]
    }
  }
}
</script>

<style scoped>
  .label-1{color: white;font-size: large}
</style>
