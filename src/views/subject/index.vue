<template>
  <div class="app-container">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

    <el-tree
      class="filter-tree"
      :data="tree"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree"
    ></el-tree>
  </div>
</template>

<script>
import subject from "@/api/subject";
export default {
  data() {
    return {
      tree: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      filterText: ""
    };
  },
  mounted() {
    subject.tree().then(res => {
      this.tree = res.data;
    });
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }
  }
};
</script>

<style>
</style> 