<template>
  <div class="app-container">
    <h2>课程基本信息</h2>

    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="编写课程信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>
    <el-form ref="form" :model="form" label-width="100px" class="form">
      <el-form-item
        label="课程标题"
        prop="title"
        :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]"
      >
        <el-input v-model="form.title" placeholder="课程标题" />
      </el-form-item>
      <el-form-item
        label="课程封面"
        prop="cover"
        :rules="[{ required: true, message: '请上传封面', trigger: 'blur' }]"
      >
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8091/file/upload"
          :show-file-list="false"
          :on-success="uploadSuccessCover"
          :before-upload="beforeUploadCover"
        >
          <img v-if="form.cover" :src="form.cover" class="cover" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item
        label="课程科目"
        prop="subjectId"
        :rules="[
          { required: true, message: '请选择课程科目', trigger: 'change' }
        ]"
      >
        <el-cascader
          v-model="form.subjectId"
          placeholder="课程科目"
          :options="tree"
          :props="defaultProps"
          filterable
          width="400"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item
        label="课程讲师"
        prop="teacherId"
        :rules="[
          { required: true, message: '请选择课程讲师', trigger: 'change' }
        ]"
      >
        <el-select v-model="form.teacherId">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number v-model="form.lessonNum" placeholder="总课时" />
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          v-model="form.price"
          :precision="2"
          placeholder="课程价格"
        />
      </el-form-item>
      <el-form-item label="课程简介">
        <thymce v-model="form.courseDescription.description" :height="300" />
      </el-form-item>
    </el-form>

    <div class="centerDiv">
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
import subject from '@/api/subject'
import teacher from '@/api/teacher'
import course from '@/api/course'
import Thymce from '@/components/Tinymce'
export default {
  components: { Thymce },
  data() {
    return {
      active: 0,
      form: {
        lessonNum: 1,
        price: 1,
        courseDescription: {}
      },
      cascaderValues: [],
      tree: [],
      teacherList: [],
      defaultProps: {
        children: 'children',
        label: 'title',
        value: 'id'
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      course.get(this.$route.params.id).then(res => {
        this.form = res.data
        this.form.subjectId = [this.form.subjectParentId, this.form.subjectId]
      })
    }
    subject.tree().then(res => {
      this.tree = res.data
    })
    teacher.list().then(res => {
      this.teacherList = res.data
    })
  },
  methods: {
    next() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.handleChange()
        course.save(this.form).then(res => {
          this.$router.push('/course/chapter/' + res.data.id)
        })
      })
    },
    uploadSuccessCover(res, file) {
      this.form.cover = res.data
    },
    beforeUploadCover(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleChange() {
      if (this.form.subjectId instanceof Array) {
        this.form.subjectParentId = this.form.subjectId[0]
        this.form.subjectId = this.form.subjectId[1]
      }
    }
  }
}
</script>

<style>
h2,
.centerDiv {
  text-align: center;
}
.form {
  margin-top: 40px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.cover {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
