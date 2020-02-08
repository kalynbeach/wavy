//
// Audio State Module
//
/* eslint-disable no-console */

const state = {
  stream: null,
  devices: {
    available: [],
    selected: null
  }
}

const actions = {
  fetchAvailableDevices ({ commit }) {
    navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        let identifiedDevices = devices.map(device => {
          Object.defineProperty(device, 'uniqueId', {
            value: Math.round(Math.random() * 1024)
          })
          return device
        })
        commit('SET_AVAILABLE_DEVICES', identifiedDevices)
      })
      .catch(function(err) {
        console.log(err.name + ': ' + err.message)
      })
  },
  async fetchMediaStream ({ commit }) {
    let stream = null
    const contraints = { audio: true }
    try {
      stream = await navigator.mediaDevices.getUserMedia(contraints)
      commit('SET_MEDIA_STREAM', stream)
    } catch(err) {
      console.log('fetchUserMedia ERROR: ', err)
    }
  },
  selectDevice ({ commit }, device) {
    commit('SET_SELECTED_DEVICE', device)
  }
}

const mutations = {
  SET_AVAILABLE_DEVICES (state, devices) {
    state.devices.available = devices
  },
  SET_SELECTED_DEVICE (state, device) {
    state.devices.selected = device
  },
  SET_MEDIA_STREAM (state, stream) {
    state.stream = stream
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}