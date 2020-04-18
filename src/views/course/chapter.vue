<template>
  <div class="app-container">
    <h2>创建课程大纲</h2>

    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="编写课程信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>
    <chapter-list :course-id="courseId" />

    <div class="centerDiv">
      <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
import chapterList from '@/views/course/components/chapter-list'
export default {
  components: { chapterList },
  data() {
    return {
      active: 1,
      courseId: this.$route.params.id
    }
  },
  mounted() {},
  methods: {
    previous() {
      this.$router.push('/course/info/' + this.$route.params.id)
    },
    next() {
      this.$router.push('/course/publish/' + this.$route.params.id)
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
