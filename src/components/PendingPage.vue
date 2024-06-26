<template>
    <el-container class="pending-container">
      <el-main>
        <div class="filter-buttons">
          <el-button
            :class="{ 'active-button': selectedStatus === 'all' }"
            @click="filterApplications('all')"
          >全部</el-button>
          <el-button
            :class="{ 'active-button': selectedStatus === '待审批' }"
            @click="filterApplications('待审批')"
          >待审批</el-button>
          <el-button
            :class="{ 'active-button': selectedStatus === '已通过' }"
            @click="filterApplications('已通过')"
          >已通过</el-button>
          <el-button
            :class="{ 'active-button': selectedStatus === '未通过' }"
            @click="filterApplications('未通过')"
          >未通过</el-button>
        </div>
        <el-table :data="filteredApplications" style="width: 100%">
          <el-table-column prop="title" label="申请标题" width="180"></el-table-column>
          <el-table-column prop="applicant.name" label="申请人" width="180"></el-table-column>
          <el-table-column prop="approver.name" label="审批人" width="180"></el-table-column>
          <el-table-column prop="applicationTime" label="申请时间" width="180"></el-table-column>
          <el-table-column prop="priority" label="优先级" width="100"></el-table-column>
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
    name: 'PendingPage',
    data() {
      return {
        applications: [],
        selectedStatus: 'all',
        filteredApplications: []
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
              "id": "userid003",
              "name": "张三",
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
            "status": "待审批",
            "applicationTime": "2023-06-26T08:00:00Z",
            "approvalTime": null,
            "remarks": "需要尽快处理",
            "approverRemarks": null,
            "priority": "中",
            "attachments": [
              {
                "fileId": "file-id-002",
                "fileName": "报销单.pdf",
                "fileUrl": "http://example.com/file/报销单.pdf"
              }
            ]
          }
          // 可以继续添加更多模拟数据...
        ];
  
        this.applications = mockApplications;
        this.filteredApplications = mockApplications;
      },
      filterApplications(status) {
        this.selectedStatus = status;
        if (status === 'all') {
          this.filteredApplications = this.applications;
        } else {
          this.filteredApplications = this.applications.filter(app => app.status === status);
        }
      },
      handleDetail(application) {
        // 跳转到申请详情页
        this.$router.push({ path: `/approval/${application.applicationId}`, query: { applicant: application.applicant.name, approver: application.approver.name, title: application.title, description: application.description } });
      }
    }
  };
  </script>
  
  <style scoped>
  .pending-container {
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  .filter-buttons {
    margin-bottom: 20px;
  }
  .filter-buttons .el-button {
    margin-right: 10px;
  }
  .active-button {
    background-color: #409EFF;
    color: #fff;
  }
  </style>
  