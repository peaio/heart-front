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
              <el-button
                class="stopPropagationBtn"
                type="text"
                @click="openVideoForm(chapter.id)"
              >
                添加课时
              </el-button>
              <el-button
                type="text"
                class="stopPropagationBtn"
                @click="openChapterFom(chapter.id)"
              >
                编辑
              </el-button>
              <el-popconfirm
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确定要删除吗？"
                class="stopPropagationBtn"
                @onConfirm="() => deleteById(chapter.id)"
              >
                <el-button
                  slot="reference"
                  class="stopPropagationBtn"
                  type="text"
                >
                  删除
                </el-button>
              </el-popconfirm>
            </div>
          </div>
        </template>
        <div
          v-for="video in chapter.videoList"
          :key="video.id"
          style="clear:both; margin-left:30px;"
        >
          <div style="float:left;">
            {{ video.title }}
          </div>
          <div style="float:right; margin-right:20px;">
            <el-tag v-if="video.isFree === 1" type="success" size="mini">
              免费观看
            </el-tag>
            <el-button type="text" @click="openVideoForm(chapter.id, video.id)">
              编辑
            </el-button>
            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确定要删除吗？"
              class="stopPropagationBtn"
              @onConfirm="deleteVideoById(video.id)"
            >
              <el-button slot="reference" type="text">
                删除
              </el-button>
            </el-popconfirm>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <chapter-form
      ref="chapterForm"
      :course-id="courseId"
      @saveChapterSuccess="fetchList"
    />
    <video-form
      ref="videoForm"
      :course-id="courseId"
      @saveVideoSuccess="fetchList"
    />
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import chapterForm from '@/views/course/components/chapter-form'
import video from '@/api/edu/video'
import videoForm from '@/views/course/components/video-form'

export default {
  components: { chapterForm, videoForm },
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
        this.addListener()
      })
    },
    openChapterFom(id) {
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
    handleChange(val) {},
    addListener() {
      this.$nextTick(() => {
        const stopPropagationBtns = document.getElementsByClassName(
          'stopPropagationBtn'
        )
        for (let i = 0; i < stopPropagationBtns.length; i++) {
          stopPropagationBtns[i].addEventListener('click', e =>
            e.stopPropagation()
          )
        }
      })
    },
    openVideoForm(chapterId, videoId) {
      this.$refs.videoForm.open(chapterId, videoId)
    },
    deleteVideoById(id) {
      video
        .del(id)
        .then(res => {
          this.fetchList()
          this.$message({ type: 'success', message: '删除课时成功' })
        })
        .catch(() => {
          this.$message({ type: 'error', message: '删除课时失败' })
        })
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 40px;
}
</style>
