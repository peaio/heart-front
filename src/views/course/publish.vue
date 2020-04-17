<template>
  <div class="app-container">
    <h2>发布课程</h2>

    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="编写课程信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>

    <div class="centerDiv">
      <el-button style="margin-top: 12px;" @click="next">发布</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2
    }
  },
  methods: {
    next() {
      this.active = 3
    }
  }
}
</script>

<style>
h2,
.centerDiv {
  text-align: center;
}
</style>
