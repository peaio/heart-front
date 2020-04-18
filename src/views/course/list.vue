<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="课程标题">
        <el-input v-model="queryObj.title" placeholder="课程标题" />
      </el-form-item>
      <el-form-item label="课程讲师">
        <el-select
          v-model="queryObj.teacherId"
          clearable
          placeholder="课程讲师"
        >
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :value="teacher.id"
            :label="teacher.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="createTimeRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="
            queryObj.pageNumber = 1
            fetchList()
          "
        >
          查询
        </el-button>
        <el-button @click="clearQueryObj()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="pageData.data"
      style="width: 100%"
      max-height="700"
    >
      <el-table-column prop="title" label="标题" width="200" />
      <el-table-column prop="cover" label="封面" width="120">
        <template slot-scope="scope">
          <img
            v-if="scope.row.cover"
            :src="scope.row.cover"
            width="100"
            height="80"
          />
        </template>
      </el-table-column>
      <el-table-column prop="teacherName" label="讲师姓名" width="120" />
      <el-table-column prop="status" label="课程状态" width="120">
        <template slot-scope="scope">
          {{ scope.row.status == 'Draft' ? '未发布' : '已发布' }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="100" />
      <el-table-column prop="buyCount" label="销售数量" width="100" />
      <el-table-column
        prop="gmtModified"
        label="更新时间"
        width="200"
        :formatter="dateTimeFormat"
      />
      <el-table-column
        prop="gmtCreate"
        label="创建时间"
        width="200"
        :formatter="dateTimeFormat"
      />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="text" size="small">编辑基础信息</el-button>
          </router-link>
          <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="text" size="small">编辑课程大纲</el-button>
          </router-link>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteById(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin:10px; text-align:center;"
      layout="total, prev, pager, next, sizes"
      :current-page="queryObj.pageNumber"
      :total="pageData.totalElements"
      :page-size="pageData.size"
      :page-sizes="[5, 10, 100]"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script>
import teacher from '@/api/teacher'
import course from '@/api/course'
import { parseTime } from '@/utils'
const defaultQueryObj = {
  pageNumber: 1,
  pageSize: 5
}
export default {
  data() {
    return {
      queryObj: { ...defaultQueryObj },
      createTimeRange: [],
      pageData: {
        data: [],
        totalElements: 0
      },
      teacherList: [],
      listLoading: false
    }
  },
  mounted() {
    this.fetchList()
    teacher.list().then(res => {
      this.teacherList = res.data
    })
  },
  methods: {
    currentChange(currentPage) {
      this.queryObj.pageNumber = currentPage
      this.fetchList()
    },
    sizeChange(size) {
      this.queryObj.pageSize = size
      this.fetchList()
    },
    dateTimeFormat(row, column) {
      return parseTime(row[column.property], '{y}-{m}-{d} {h}:{i}:{s}')
    },
    fetchList() {
      if (this.createTimeRange instanceof Array) {
        this.queryObj.startGmtCreate = this.createTimeRange[0]
        this.queryObj.endGmtCreate = this.createTimeRange[1]
      }
      this.listLoading = true
      course
        .list(this.queryObj)
        .then(res => {
          this.pageData = res
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    deleteById(id) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          course.del(id).then(res => {
            this.fetchList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    clearQueryObj() {
      this.queryObj = { ...defaultQueryObj }
      this.createTimeRange = []
      this.fetchList()
    }
  }
}
</script>

<style></style>
