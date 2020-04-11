<template>
  <div>
    <el-table :data="pageData.data" style="width: 100%" max-height="100%">
      <el-table-column prop="name" label="讲师姓名" width="120"></el-table-column>
      <el-table-column prop="avatar" label="头像" width="120"></el-table-column>
      <el-table-column prop="level" label="头衔" width="120"></el-table-column>
      <el-table-column prop="career" label="讲师简介" width="300"></el-table-column>
      <el-table-column prop="intro" label="讲师资历" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteData(scope.row.id)"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="queryData.pageNumber"
      :total="pageData.totalElements"
      :page-size="pageData.size"
      @current-change="changPage"
    ></el-pagination>
  </div>
</template>

<script>
import { list, get, save, del } from "@/api/teacher";

export default {
  data() {
    return {
      queryData: {
        pageNumber: 1,
        pageSize: 5
      },
      pageData: {
        data: [],
        totalElements: 0
      }
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    changPage(currentPage) {
      this.queryData.pageNumber = currentPage;
      this.fetchList();
    },
    fetchList() {
      list(this.queryData).then(res => {
        this.pageData = res;
      });
    },
    deleteData(id) {
      this.$confirm("此操作将永久删除该教师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del(id).then(res => {
            this.fetchList();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    open() {}
  }
};
</script>

<style>
</style>