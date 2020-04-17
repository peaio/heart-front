<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addSubjectByParentId('0')">
          添加根级课程
        </el-button>
      </el-form-item>
    </el-form>
    <el-tree
      ref="tree"
      :data="tree"
      :props="defaultProps"
      :default-expand-all="false"
      :filter-node-method="filterNode"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ data.title }}</span>
        <span style="margin-left:40px;">
          <el-button
            v-if="data.parentId === '0'"
            type="text"
            size="mini"
            @click="() => append(data)"
          >
            添加下级
          </el-button>
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="确定要删除吗？"
            @onConfirm="() => remove(node, data)"
          >
            <el-button
              v-if="!data.children || data.children.length == 0"
              slot="reference"
              type="text"
              size="mini"
            >
              删除
            </el-button>
          </el-popconfirm>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import subject from '@/api/subject'
export default {
  data() {
    return {
      tree: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      subject.tree().then(res => {
        this.tree = res.data
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    addSubjectByParentId(parentId) {
      this.$prompt('请输入课程名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(result => {
          const newChild = { title: result.value, parentId }
          subject
            .save(newChild)
            .then(res => {
              this.fetchData()
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            })
            .catch(() => {
              this.$message({
                message: '添加失败',
                type: 'error'
              })
            })
        })
        .catch(() => {
          this.$message('已取消')
        })
    },
    append(data) {
      this.addSubjectByParentId(data.id)
    },
    remove(node, data) {
      subject
        .del(data.id)
        .then(res => {
          this.fetchData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(() => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
    }
  }
}
</script>

<style></style>
