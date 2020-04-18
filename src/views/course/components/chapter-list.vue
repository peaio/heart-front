<template>
  <div class="main">
    <el-button style="width:100%;" @click="openChapterFom()">
      添加章节
    </el-button>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="chapter in chapterList"
        :key="chapter.id"
        :name="chapter.id"
        :title="chapter.title"
      >
        <template slot="title">
          <div style="width:100%">
            {{ chapter.title }}
            <div style="float:right;margin-right:30px;">
              <el-button type="text" @click="openChapterFom(chapter.id)">
                编辑
              </el-button>
              <el-popconfirm
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确定要删除吗？"
                @onConfirm="() => deleteById(chapter.id)"
              >
                <el-button slot="reference" type="text">
                  删除
                </el-button>
              </el-popconfirm>
            </div>
          </div>
        </template>
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
      </el-collapse-item>
    </el-collapse>
    <chapter-form
      ref="chapterForm"
      :course-id="courseId"
      @saveChapterSuccess="fetchList"
    />
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import chapterForm from '@/views/course/components/chapter-form'

export default {
  components: { chapterForm },
  props: {
    courseId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      queryObj: {
        courseId: this.courseId
      },
      chapterList: [],
      activeNames: []
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      chapter.list(this.queryObj).then(res => {
        this.chapterList = res.data
      })
    },
    openChapterFom(id) {
      console.log(id)

      this.$refs.chapterForm.open(id)
    },
    deleteById(id) {
      chapter.del(id).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.fetchList()
      })
    },
    handleChange(val) {}
  }
}
</script>

<style scoped>
.main {
  margin-top: 40px;
}
</style>
