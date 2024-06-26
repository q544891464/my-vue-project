<template>
  <el-container class="form-container">
    <el-main>
      <el-form label-position="top" :label-width="100">
        <!-- 添加审批状态 -->
        <el-form-item label="审批状态">
          <el-input v-model="application.status" readonly></el-input>
        </el-form-item>
        <!-- 添加优先级 -->
        <el-form-item label="优先级">
          <el-tag :type="priorityTagType">{{ application.priority || '中' }}</el-tag>
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
          <el-input v-model="application.title" :readonly="!isEditable"></el-input>
        </el-form-item>
        <el-form-item label="申请说明">
          <el-input type="textarea" v-model="application.description" :readonly="!isEditable"></el-input>
        </el-form-item>
        <el-form-item label="审批意见">
          <el-input type="textarea" v-model="application.approverRemarks" :readonly="isFromSubmitted"></el-input>
        </el-form-item>
        <el-form-item v-if="!isFromSubmitted">
          <el-button type="success" @click="approve" class="action-button">通过</el-button>
        </el-form-item>
        <el-form-item v-if="!isFromSubmitted">
          <el-button type="danger" @click="reject" class="action-button">驳回</el-button>
        </el-form-item>
        <el-form-item v-if="isFromSubmitted && application.status === '未通过'">
          <el-button type="primary" @click="resubmit" class="action-button">重新提交</el-button>
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
        status: this.$route.query.status,
        priority: this.$route.query.priority || '中', // 默认优先级为“中”
        approverRemarks: this.$route.query.approverRemarks || ''
      },
      isFromSubmitted: this.$route.query.isFromSubmitted === 'true',
      isEditable: false
    };
  },
  computed: {
    priorityTagType() {
      switch (this.application.priority) {
        case '高':
          return 'danger';
        case '中':
          return 'warning';
        case '低':
          return 'success';
        default:
          return 'info';
      }
    }
  },
  created() {
    if (this.isFromSubmitted && this.application.status === '未通过') {
      this.isEditable = true;
    }
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
    },
    resubmit() {
      // 模拟重新提交的逻辑
      this.$message({
        message: '申请已重新提交',
        type: 'success'
      });
      this.$router.push('/');
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
