<template>
  <el-container class="submitted-container">
    <el-main>
      <el-table :data="applications" style="width: 100%">
        <el-table-column prop="title" label="申请标题" width="180"></el-table-column>
        <el-table-column prop="approver.name" label="审批人" width="180"></el-table-column>
        <el-table-column prop="applicationTime" label="申请时间" width="180"></el-table-column>
        <el-table-column prop="status" label="审批状态" width="100">
          <template v-slot="scope">
            <el-tag :type="getStatusTagType(scope.row.status)">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template v-slot="scope">
            <el-button size="mini" @click="handleDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'SubmittedPage',
  data() {
    return {
      applications: []
    };
  },
  created() {
    this.fetchApplications();
  },
  methods: {
    fetchApplications() {
      const mockApplications = [
        {
          "applicationId": "unique-id-12345",
          "applicant": {
            "id": "userid001",
            "name": "黄岳峰",
            "departmentId": "1000",
            "departmentName": "测试"
          },
          "approver": {
            "id": "userid002",
            "name": "李四",
            "departmentId": "2000",
            "departmentName": "技术部"
          },
          "title": "请假申请",
          "description": "申请请假三天",
          "status": "待审批",
          "applicationTime": "2023-06-25T12:00:00Z",
          "approvalTime": null,
          "remarks": "需要提前处理",
          "approverRemarks": null,
          "priority": "高",
          "attachments": [
            {
              "fileId": "file-id-001",
              "fileName": "假条.pdf",
              "fileUrl": "http://example.com/file/假条.pdf"
            }
          ]
        },
        {
          "applicationId": "unique-id-12346",
          "applicant": {
            "id": "userid001",
            "name": "黄岳峰",
            "departmentId": "1001",
            "departmentName": "市场部"
          },
          "approver": {
            "id": "userid004",
            "name": "王五",
            "departmentId": "2001",
            "departmentName": "人事部"
          },
          "title": "报销申请",
          "description": "报销差旅费",
          "status": "已通过",
          "applicationTime": "2023-06-26T08:00:00Z",
          "approvalTime": "2023-06-27T08:00:00Z",
          "remarks": "需要尽快处理",
          "approverRemarks": "批准",
          "priority": "中",
          "attachments": [
            {
              "fileId": "file-id-002",
              "fileName": "报销单.pdf",
              "fileUrl": "http://example.com/file/报销单.pdf"
            }
          ]
        },
        {
          "applicationId": "unique-id-12347",
          "applicant": {
            "id": "userid001",
            "name": "黄岳峰",
            "departmentId": "1002",
            "departmentName": "销售部"
          },
          "approver": {
            "id": "userid006",
            "name": "赵六",
            "departmentId": "2002",
            "departmentName": "财务部"
          },
          "title": "项目申请",
          "description": "申请新项目资金",
          "status": "未通过",
          "applicationTime": "2023-06-27T10:00:00Z",
          "approvalTime": "2023-06-28T10:00:00Z",
          "remarks": "请及时处理",
          "approverRemarks": "驳回",
          "priority": "高",
          "attachments": [
            {
              "fileId": "file-id-003",
              "fileName": "项目申请.pdf",
              "fileUrl": "http://example.com/file/项目申请.pdf"
            }
          ]
        }
      ];

      // 模拟获取当前登录用户的 ID
      const currentUserId = 'userid001';
      this.applications = mockApplications.filter(app => app.applicant.id === currentUserId);
    },
    getStatusTagType(status) {
      switch (status) {
        case '待审批':
          return 'warning';
        case '已通过':
          return 'success';
        case '未通过':
          return 'danger';
        default:
          return '';
      }
    },
    handleDetail(application) {
      // 跳转到申请详情页，并传递参数
      this.$router.push({
        path: `/approval/${application.applicationId}`,
        query: {
          applicant: application.applicant.name,
          approver: application.approver.name,
          title: application.title,
          description: application.description,
          status: application.status,
          approverRemarks: application.approverRemarks,
          isFromSubmitted: 'true'
        }
      });
    }
  }
};
</script>

<style scoped>
.submitted-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}
</style>
