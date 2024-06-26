<template>
  <div>
    <el-container>
      <el-header>
        <h1>审批系统</h1>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card @click="navigateTo('pending')">待审批</el-card>
          </el-col>
          <el-col :span="8">
            <el-card @click="navigateTo('approved')">已通过</el-card>
          </el-col>
          <el-col :span="8">
            <el-card @click="navigateTo('rejected')">未通过</el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="add-button"
          @click="navigateTo('create')"
        >新建申请</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomePage',
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    navigateTo(page) {
      if (page === 'create') {
        this.$router.push({ name: 'CreateApplication', params: { applicant: this.userInfo.name } });
      } else {
        this.$router.push(`/${page}`);
      }
    }
  }
};
</script>

<style scoped>
.add-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
