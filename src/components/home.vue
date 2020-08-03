<template>
  <el-container>
    <el-header>
      <el-menu
        class="el-menu-home"
        mode="horizontal"
        background-color="black"
        text-color="#fff"
        active-text-color="blue"
        router=true>
        <el-row type="flex" justify="start">
          <el-col :span="2"><img src="../assets/logo.png"></el-col>
          <el-col :span="2" style="margin-top: 15px"><label style="color: white;font-size: large">提测分析系统</label></el-col>
          <el-col :span="2">
            <el-submenu>
            <template slot="title">人员管理</template>
            <el-menu-item :index=routerpath[0]>用户管理</el-menu-item>
            </el-submenu>
          </el-col>
          <el-col :span="2">
            <el-submenu>
              <template slot="title">资源管理</template>
              <el-menu-item :index="routerpath[1]">项目管理</el-menu-item>
              <el-menu-item :index="routerpath[2]">提测管理</el-menu-item>
              <el-menu-item>选项3</el-menu-item>
            </el-submenu>
          </el-col>
          <el-col :span="2">
            <el-submenu>
              <template slot="title">分析</template>
              <el-menu-item>选项1</el-menu-item>
              <el-menu-item>选项2</el-menu-item>
              <el-menu-item>选项3</el-menu-item>
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
  name: 'home',
  data () {
    return {
      routerpath: [
        '/staffmanage',
        '/projectManage',
        '/stManage'
      ]
    }
  }
}
</script>

<style scoped>

</style>
