<template>
  <div class="app-container">
    <h2>发布课程</h2>

    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="编写课程信息" />
      <el-step title="编辑课程大纲" />
      <el-step title="发布课程" />
    </el-steps>

    <div class="ccInfo">
      <img :src="coursePublish.cover" />
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray">
          <span>共{{ coursePublish.lessonNum }}课时</span>
        </p>
        <p>
          <span>
            所属分类：{{ coursePublish.subjectParentTitle }} —
            {{ coursePublish.subjectTitle }}
          </span>
        </p>
        <p>课程讲师：{{ coursePublish.teacherName }}</p>
        <h3 class="red">￥{{ coursePublish.price }}</h3>
      </div>
    </div>

    <div class="centerDiv">
      <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
      <el-button style="margin-top: 12px;" type="success" @click="next">
        发布
      </el-button>
    </div>
  </div>
</template>

<script>
import course from '@/api/edu/course'

export default {
  data() {
    return {
      active: 2,
      coursePublish: {}
    }
  },
  mounted() {
    course.get(this.$route.params.id).then(res => {
      this.coursePublish = res.data
    })
  },
  methods: {
    previous() {
      this.$router.push('/course/chapter/' + this.$route.params.id)
    },
    next() {
      course.publish(this.$route.params.id).then(res => {
        this.active = 3
        this.$nextTick(() => this.$router.push('/course/list'))
      })
    }
  }
}
</script>

<style scoped>
h2,
.centerDiv {
  text-align: center;
}
.ccInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #ddd;
  margin-bottom: 40px;
  position: relative;
}
.ccInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}
.ccInfo .main {
  margin-left: 520px;
}

.ccInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}

.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>
