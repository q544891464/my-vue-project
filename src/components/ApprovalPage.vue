<template>
  <el-container class="form-container">
    <el-main>
      <el-form label-position="top" :label-width="100">
        <!-- 添加审批状态 -->
        <el-form-item label="审批状态">
          <el-input v-model="application.status" readonly></el-input>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="24">
              <label>申请人</label>
              <el-input v-model="application.applicant" readonly></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="24">
              <label>审批人</label>
              <el-input v-model="application.approver" readonly></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="申请标题">
          <el-input v-model="application.title" readonly></el-input>
        </el-form-item>
        <el-form-item label="申请说明">
          <el-input type="textarea" v-model="application.description" readonly></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="approve" class="action-button">通过</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="reject" class="action-button">驳回</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'ApprovalPage',
  props: ['applicationId'],
  data() {
    return {
      application: {
        applicant: this.$route.query.applicant,
        approver: this.$route.query.approver,
        title: this.$route.query.title,
        description: this.$route.query.description,
        status: '待审批'
      }
    };
  },
  methods: {
    approve() {
      this.application.status = '已通过';
      this.$message({
        message: '申请已通过',
        type: 'success'
      });
    },
    reject() {
      this.application.status = '已驳回';
      this.$message({
        message: '申请已驳回',
        type: 'error'
      });
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}
.el-form-item {
  margin-bottom: 20px;
}
.action-button {
  width: 100%;
  height: 50px;
  border-radius: 4px;
}
</style>
