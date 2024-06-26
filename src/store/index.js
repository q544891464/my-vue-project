import { createStore } from 'vuex';

// 定义 user 模块
const userModule = {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
    }
  },
  getters: {
    userInfo: state => state.userInfo
  }
};

// 创建 Vuex store 实例
export default createStore({
  state: {
    applications: []
  },
  mutations: {
    addApplication(state, application) {
      state.applications.push(application);
    }
  },
  actions: {
    submitApplication({ commit }, application) {
      commit('addApplication', application);
    }
  },
  getters: {
    applications: state => state.applications,
    pendingApplications: state => state.applications.filter(app => app.status === '待审批'),
    approvedApplications: state => state.applications.filter(app => app.status === '已通过'),
    rejectedApplications: state => state.applications.filter(app => app.status === '未通过')
  },
  modules: {
    user: userModule
  }
});
