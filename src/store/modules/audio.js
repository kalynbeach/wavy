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
        console.log(devices)
        commit('SET_AVAILABLE_DEVICES', devices)
      })
      .catch(function(err) {
        console.log(err.name + ': ' + err.message)
      })
  }
  // setSelectedDevice(device) {

  // }
}

const mutations = {
  SET_AVAILABLE_DEVICES(state, devices) {
    state.devices.available = devices
  },
  SET_SELECTED_DEVICE(state, device) {
    state.devices.selected = device
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}