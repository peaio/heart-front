<template>
  <el-form :model="form" ref="form" class="app-container" label-width="100px" label-suffix="：">
    <el-form-item
      label="教师姓名"
      prop="name"
      :rules="[{required:true, message: '请输入教师姓名', trigger: 'blur'}]"
    >
      <el-input v-model="form.name" placeholder="教师姓名"></el-input>
    </el-form-item>
    <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8091/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.avatar" :src="form.avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item
      label="排序"
      prop="sort"
      :rules="[{required:true, message: '请输入排序号', trigger: 'blur'}]"
    >
      <el-input-number v-model="form.sort" placeholder></el-input-number>
    </el-form-item>
    <el-form-item
      label="头衔"
      prop="level"
      :rules="[{required:true, message: '请选择头衔', trigger: 'change'}]"
    >
      <el-select v-model="form.level" placeholder="头衔">
        <el-option
          v-for="teacherLevel in teacherLevels"
          :key="teacherLevel.id"
          :label="teacherLevel.name"
          :value="teacherLevel.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="讲师资历"
      prop="intro"
      :rules="[{required:true, message: '请输入讲师资历', trigger: 'blur'}]"
    >
      <el-input type="textarea" v-model="form.intro" placeholder="讲师资历,一句话说明讲师"></el-input>
    </el-form-item>
    <el-form-item
      label="讲师简介"
      prop="career"
      :rules="[{required:true, message: '请输入讲师简介', trigger: 'blur'}]"
    >
      <el-input type="textarea" v-model="form.career" placeholder="讲师简介" rows="7"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :disabled="submitDisavled" @click="onSubmit">保存</el-button>
      <router-link to="/teacher">
        <el-button>返回</el-button>
      </router-link>
    </el-form-item>
  </el-form>
</template>

<script>
import teacher from "@/api/teacher";
let defaultFormData = {
  id: null,
  name: "",
  avatar: "",
  sort: 0,
  level: null,
  intro: "",
  career: ""
};
export default {
  data() {
    return {
      form: { ...defaultFormData },
      teacherLevels: [
        { id: 1, name: "高级讲师" },
        { id: 2, name: "首席讲师" }
      ],
      submitDisavled: false
    };
  },
  mounted() {
    if (this.$route.params.id) {
      teacher.get(this.$route.params.id).then(res => {
        this.form = res.data;
      });
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return;
        }
        this.submitDisavled = true;
        teacher
          .save(this.form)
          .then(res => {
            this.$message({
              message: "保存成功!",
              type: "success"
            });
            this.$router.push({ path: "/teacher" });
          })
          .catch(() => {
            this.submitDisavled = false;
          });
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>

<style>
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>