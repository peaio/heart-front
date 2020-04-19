<template>
  <el-dialog
    :title="form.id ? '编辑课时' : '添加课时'"
    :visible.sync="dialogVisible"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="课时标题">
        <el-input v-model="form.title" placeholder="课时标题" />
      </el-form-item>
      <el-form-item label="序号">
        <el-input-number v-model="form.sort" :min="0" placeholder="序号" />
      </el-form-item>
      <el-form-item label="是否免费">
        <el-radio-group v-model="form.isFree">
          <el-radio :label="1">免费</el-radio>
          <el-radio :label="0">收费</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import video from '@/api/edu/video'
const defualtForm = {
  id: null,
  sort: 0,
  isFree: 1
}
export default {
  props: {
    courseId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: { ...defualtForm }
    }
  },
  methods: {
    open(chapterId, videoId) {
      this.dialogVisible = true
      this.form.courseId = this.courseId
      this.form.chapterId = chapterId
      this.form.videoId = videoId
      if (this.form.videoId) {
        video.get(this.form.videoId).then(res => {
          this.form = res.data
        })
      }
    },
    close() {
      this.dialogVisible = false
      this.form = { ...defualtForm }
    },
    save() {
      video
        .save(this.form)
        .then(res => {
          this.$message({ type: 'success', message: '保存成功' })
          this.$emit('saveVideoSuccess')
          this.close()
        })
        .catch(() => {
          this.$message({ type: 'error', message: '保存失败' })
        })
    }
  }
}
</script>

<style></style>
