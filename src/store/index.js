import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: {}
    user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER')),
    searchHistoryList: JSON.parse(window.localStorage.getItem('TOUTIAO_arr'))
  },
  getters: {
  },
  mutations: {
    // token
    setUser (state, payload) {
      state.user = payload
      window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(payload))
    },
    // 历史记录
    setSearchHistoryList (state, payload) {
      if (state.searchHistoryList === null) {
        state.searchHistoryList = []
      }
      let arr = state.searchHistoryList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
      window.localStorage.setItem('TOUTIAO_arr', JSON.stringify(arr))
    },
    // 根据索引删除一个
    delHistory (state, index) {
      state.searchHistoryList.splice(index, 1)
    },
    // 删除所有
    delAllHistory (state) {
      state.searchHistoryList = []
    }
  },
  actions: {
  },
  modules: {
  }
  // plugins: [vuexLocal.plugin]
})
