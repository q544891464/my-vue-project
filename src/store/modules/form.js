const state = {
  range: null,
  addForm: null,
  coverPicture: null,
  imgId: null,
  id: null
}

const mutations = {
  change(state, data) {
    state.range = data
  },
  saveForm(state, data) {
    state.addForm = data
  },
  saveCoverPicture(state, data) {
    state.coverPicture = data
  },
  saveImgId(state, data) {
    state.imgId = data
  },
  saveId(state, data) {
    state.id = data
  }
}

const actions = {
  change({ commit }, data) {
    commit('change', data)
  },
  saveForm({ commit }, data) {
    commit('saveForm', data)
  },
  saveCoverPicture({ commit }, data) {
    commit('saveCoverPicture', data)
  },
  saveImgId({ commit }, data) {
    commit('saveImgId', data)
  },
  saveId({ commit }, data) {
    commit('saveId', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
