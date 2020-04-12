<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户名: {{ name }}</div>
    <div class="dashboard-text">
      头像:
      <img :src="avatar"  width="120" height="120"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
console.log(mapGetters);

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "avatar"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
