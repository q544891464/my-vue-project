<template>
    <el-container class="form-container">
      <el-main>
        <el-form label-position="top" :label-width="100" :model="form">
          <el-form-item label="申请人">
            <el-input v-model="form.applicant" readonly></el-input>
          </el-form-item>
          <el-form-item label="审批人" :required="true">
            <el-select v-model="form.approver" placeholder="请选择审批人">
              <el-option
                v-for="approver in approvers"
                :key="approver.phone"
                :label="approver.userName"
                :value="approver.phone"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="申请标题" :required="true">
            <el-input v-model="form.title" placeholder="请输入申请标题"></el-input>
          </el-form-item>
          <el-form-item label="申请说明" :required="true">
            <el-input type="textarea" v-model="form.description" placeholder="请输入申请内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitApplication" class="submit-button">提交</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="info" @click="testFetchApprovers" class="test-button">测试获取通讯录</el-button>
          </el-form-item> -->
        </el-form>
      </el-main>
    </el-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CreateApplication',
    data() {
      return {
        form: {
          applicant: '',
          approver: '',
          title: '',
          description: '',
          status: '待审批'
        },
        approvers: []
      };
    },
    created() {
    //   const applicant = this.$route.params.applicant || '未知申请人';
      
  
      const storedUserInfo = JSON.parse(localStorage.getItem('loginUserInfo'));
      const applicant = storedUserInfo ? storedUserInfo.name : "未知申请人";
      this.form.applicant = applicant;
      const orgId = storedUserInfo ? storedUserInfo.orgId : null;
      const userId = storedUserInfo ? storedUserInfo.phone : null;
  
      if (orgId && userId) {
        this.fetchApprovers(orgId, userId);
      }
    },
    methods: {
      async fetchApprovers(orgId, userId) {
        try {
          const response = await axios.get('/api/im-biz/api/org/getChildDepartAndUsers', {
            params: {
              orgId: 1001104
            },
            headers: {
              'X-User-ID': userId
            }
          });
  
          if (response.data && response.data.success && response.data.data && response.data.data.departUserList) {
            this.approvers = response.data.data.departUserList.userList.map(user => ({
              phone: user.phone,
              userName: user.userName
            }));
          } else {
            this.$message({
              message: '获取审批人列表失败',
              type: 'error'
            });
          }
        } catch (error) {
          console.error('Error fetching approvers:', error);
          this.$message({
            message: '获取审批人列表失败',
            type: 'error'
          });
        }
      },
      async testFetchApprovers() {
        const storedUserInfo = JSON.parse(localStorage.getItem('loginUserInfo'));
        const orgId = storedUserInfo ? storedUserInfo.orgId : null;
        const userId = storedUserInfo ? storedUserInfo.phone : null;
  
        if (orgId && userId) {
          try {
            const response = await axios.get('/api/im-biz/api/org/getChildDepartAndUsers', {
              params: {
                orgId: 1001104
              },
              headers: {
                'X-User-ID': userId
              }
            });
  
            if (response.data && response.data.success && response.data.data && response.data.data.departUserList) {
              const approvers = response.data.data.departUserList.userList.map(user => ({
                phone: user.phone,
                userName: user.userName
              }));
              console.log('获取的通讯录:', approvers);
              this.$message({
                message: '获取通讯录成功，检查控制台日志',
                type: 'success'
              });
            } else {
              this.$message({
                message: '获取通讯录失败',
                type: 'error'
              });
            }
          } catch (error) {
            console.error('Error fetching approvers:', error);
            this.$message({
              message: '获取通讯录失败',
              type: 'error'
            });
          }
        } else {
          this.$message({
            message: '用户信息缺失，无法获取通讯录',
            type: 'warning'
          });
        }
      },
      async submitApplication() {
        if (!this.form.approver || !this.form.title || !this.form.description) {
          this.$message({
            message: '请填写所有必填项',
            type: 'warning'
          });
          return;
        }
  
        try {
          const response = await axios.post('http://localhost:8081/api/applications', this.form);
  
          if (response.data && response.data.success) {
            this.$message({
              message: '申请已提交，等待审批',
              type: 'success'
            });
            this.$router.push('/');
          } else {
            this.$message({
              message: '提交申请失败',
              type: 'error'
            });
          }
        } catch (error) {
          console.error('Error submitting application:', error);
          this.$message({
            message: '提交申请失败',
            type: 'error'
          });
        }
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
  .submit-button, .test-button {
    width: 100%;
    height: 50px;
    border-radius: 4px;
  }
  </style>
  