<template>
  <div class="controls">
    <h1>Wavy</h1>
    <div class="buttons">
      <button v-on:click="$emit('fetch-stream')" class="button">Fetch MediaStream</button>
      <button v-on:click="$emit('visualize-waveform')" class="button">Visualize Waveform</button>
    </div>
    <div class="info">
      <p>Selected Device: {{ selectedDevice ? selectedDevice.label : "No device selected" }}</p>
    </div>
    <div class="audio-device-select">
      <select
        name="device-select"
        id="device-select"
        v-model="controlsState.selected">
        <option 
          v-for="device in devices"
          v-bind:value="device"
          v-bind:key="device.uniqueId">
          {{ device.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { reactive, watch, onUpdated } from 'vue'


export default {

  name: 'Controls',

  props: {
    devices: Array,
    selectedDevice: Object
    // fetchMediaStream: Function,
    // selectDevice: Function,
    // runTest: Function
  },

  setup (props, { emit }) {

    const controlsState = reactive({
      selected: props.selectedDevice
    })

    onUpdated(() => {
      console.log('UPDATED -- props: ', props)
      console.log('UPDATED -- controlsState: ', controlsState)
    })

    watch(
      () => controlsState.selected,
      (selectedDevice) => {
        console.log('WATCH -- props: ', props)
        console.log('WATCH -- selectedDevice: ', selectedDevice)
        // controlsState.selected = selectedDevice
        // TODO: Need to emit the device selection as an event for Wavy to pick up
        // props.selectDevice(selectedDevice)
        emit('select-device', selectedDevice)
      }
    )

    return {
      // ...toRefs(controlsState)
      controlsState
    }
  }
}
</script>

<style lang="scss" scoped>
.controls {
  height: 5vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(243, 243, 243);

  h1 {
    align-self: center;
  }

  .buttons {
    margin: 0 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .button {
      background-color: white;
      border: 2px solid #2c3e50;;

      &:not(:last-of-type) {
        margin-right: 1rem;
      }
    }
  }

  .audio-device-select {
    align-self: center;
  }
}
</style>