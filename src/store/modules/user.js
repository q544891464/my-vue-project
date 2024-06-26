import { getToken, setToken, removeToken, getCacheUserInfo, setCacheUserInfo, removeCacheUserInfo } from '@/utils/auth'
// 关于state 的问题
const state = {
  userInfo: getCacheUserInfo() || {}, // 用户的信息
  type: '',
  userList: null,
  isWork: null,
  orgList: [],
  defaultOrg: {},
  refreshMeetingRoom: null
}
// 关于mutations 的问题
const mutations = {
  setUserInfo(state, userInfo) {
    setCacheUserInfo(userInfo)
    state.userInfo = userInfo
  },
  setType(state, type) {
    state.type = type
  },
  setUserList(state, list) {
    state.userList = list
  },
  setWork(state, work) {
    state.isWork = work
  },
  setOrgList(state, orgList) {
    state.orgList = orgList
  },
  setDefaultOrg(state, org) {
    state.defaultOrg = org
  },
  setRefreshMeetingRoom(state, value) {
    state.refreshMeetingRoom = value
  }
}

const actions = {
  setWork({ commit }, work) {
    commit('setWork', work)
  },
  setUserList({ commit }, list) {
    commit('setUserList', list)
  },
  setType({ commit }, type) {
    commit('setType', type)
  },
  // 设置用户的信息
  setUserInfo({ commit }, userInfo) {
    commit('setUserInfo', userInfo)
  },
  setOrgList({ commit }, orgList) {
    commit('setOrgList', orgList)
  },
  setDefaultOrg({ commit }, org) {
    commit('setDefaultOrg', org)
  },
  setRefreshMeetingRoom({ commit }, value) {
    commit('setRefreshMeetingRoom', value)
  },
  // remove token
  resetLoginData({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROLES', [])
      removeCacheUserInfo()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
