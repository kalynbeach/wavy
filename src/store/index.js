import Vuex from 'vuex'
import audio from './modules/audio'

const debug = process.env.NODE_ENV !== 'production'

export default Vuex.createStore({
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
});