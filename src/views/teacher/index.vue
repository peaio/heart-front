<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="讲师姓名">
        <el-input v-model="queryObj.name" placeholder="讲师姓名"></el-input>
      </el-form-item>
      <el-form-item label="头衔">
        <el-select v-model="queryObj.level" clearable placeholder="头衔">
          <el-option
            v-for="teacherLevel in teacherLevels"
            :key="teacherLevel.id"
            :value="teacherLevel.id"
            :label="teacherLevel.name"
          ></el-option>
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
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryObj.pageNumber=1;fetchList()">查询</el-button>
        <el-button @click="clearQueryObj()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="pageData.data" style="width: 100%" max-height="700" v-loading="listLoading">
      <el-table-column prop="name" label="讲师姓名" width="120"></el-table-column>
      <el-table-column prop="avatar" label="头像" width="120">
        <template slot-scope="scope">
          <img v-if="scope.row.avatar" :src="scope.row.avatar" width="80" height="80" />
        </template>
      </el-table-column>
      <el-table-column prop="level" label="头衔" width="120">
        <template slot-scope="scope">{{scope.row.level===1?'高级讲师':'首席讲师'}}</template>
      </el-table-column>
      <el-table-column prop="intro" label="讲师资历" width="300"></el-table-column>
      <el-table-column prop="career" label="讲师简介" width="400"></el-table-column>
      <el-table-column prop="sort" label="排序" width="50"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="200" :formatter="dateTimeFormat"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
          <el-button @click.native.prevent="deleteById(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin:10px; text-align:center;"
      layout="total, prev, pager, next, sizes"
      :current-page="queryObj.pageNumber"
      :total="pageData.totalElements"
      :page-size="pageData.size"
      :page-sizes="[5,10,100]"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import teacher from "@/api/teacher";
import { parseTime } from "@/utils";
const defaultQueryObj = {
  pageNumber: 1,
  pageSize: 10
};
export default {
  data() {
    return {
      queryObj: { ...defaultQueryObj },
      createTimeRange: [],
      pageData: {
        data: [],
        totalElements: 0
      },
      teacherLevels: [
        { id: 1, name: "高级讲师" },
        { id: 2, name: "首席讲师" }
      ],
      listLoading: false
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    currentChange(currentPage) {
      this.queryObj.pageNumber = currentPage;
      this.fetchList();
    },
    sizeChange(size) {
      this.queryObj.pageSize = size;
      this.fetchList();
    },
    dateTimeFormat(row, column) {
      return parseTime(row[column.property], "{y}-{m}-{d} {h}:{i}:{s}");
    },
    fetchList() {
      this.queryObj.startGmtCreate = this.createTimeRange[0];
      this.queryObj.endGmtCreate = this.createTimeRange[1];
      this.listLoading = true;
      teacher
        .list(this.queryObj)
        .then(res => {
          this.pageData = res;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    deleteById(id) {
      this.$confirm("此操作将永久删除该教师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          teacher.del(id).then(res => {
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
    clearQueryObj() {
      this.queryObj = { ...defaultQueryObj };
      this.createTimeRange = [];
      this.fetchList();
    }
  }
};
</script>

<style>
</style>