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
        case '/create':
          return '新建申请';
        case '/pending':
          return '待审批';
        case '/approved':
          return '已通过';
        case '/rejected':
          return '未通过';
        case '/submitted':
          return '提交记录';
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
  background-color: #409EFF; /* 修改背景颜色 */
  color: #044977; /* 修改图标和文本颜色 */
  border: none; /* 去掉边框 */
  border-radius: 50%; /* 圆形按钮 */
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
