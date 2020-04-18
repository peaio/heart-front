<template>
  <el-dialog
    :title="form.id ? '编辑章节' : '添加章节'"
    :visible.sync="dialogVisible"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="章节标题">
        <el-input v-model="form.title" placeholder="章节标题" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.sort" placeholder="排序" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="saveChapter">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import chapter from '@/api/edu/chapter'
const defaultForm = {
  id: null,
  title: '',
  sort: 0
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
      form: { ...defaultForm },
      dialogVisible: false
    }
  },
  methods: {
    open(cahpterId) {
      this.dialogVisible = true
      this.form.courseId = this.courseId
      this.form.id = cahpterId
      if (this.form.id) {
        chapter.get(this.form.id).then(res => {
          this.form = res.data
        })
      }
    },
    close() {
      this.dialogVisible = false
      this.form = { ...defaultForm }
    },
    saveChapter() {
      chapter
        .save(this.form)
        .then(res => {
          this.close()
          this.$emit('saveChapterSuccess')
          this.$message({ type: 'success', message: '保存成功' })
        })
        .catch(() => {
          this.$message({ type: 'error', message: '保存失败' })
        })
    }
  }
}
</script>

<style></style>
