<template>
  <div id="app">
    <el-header class="header">
      <el-button 
        v-if="$route.path !== '/'"
        @click="goBack"
        icon="el-icon-arrow-left"
        class="back-button"
      ></el-button>
      <span class="title">{{ getTitle }}</span>
    </el-header>
    <el-main>
      <!-- <div class="nav-buttons">
        <el-button @click="navigateTo('/')">申请页面</el-button>
        <el-button @click="navigateTo('/approval')">审批页面</el-button>
      </div> -->
      <router-view />
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    getTitle() {
      switch (this.$route.path) {
        case '/approval':
          return '审批';
        default:
          return '申请';
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f8f8f8;
  height: 50px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.back-button {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.nav-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.nav-buttons .el-button {
  margin: 0 10px;
}
</style>
