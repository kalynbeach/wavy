import Vue from 'vue'
import Vuex from 'vuex'
import audio from './modules/audio'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    audio
  },
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loading = status
    }
  },
  strict: debug
})