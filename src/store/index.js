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
    user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(payload))
    }
  },
  actions: {
  },
  modules: {
  }
  // plugins: [vuexLocal.plugin]
})
