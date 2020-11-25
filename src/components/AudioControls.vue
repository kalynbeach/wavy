<template>
  <div class="audio-controls">
    <h1>Wavy</h1>
    <div class="buttons">
      <button @click="$emit('test-event')" class="button">TEST</button>
      <button @click="$emit('fetch-stream')" class="button">Fetch MediaStream</button>
      <button @click="$emit('visualize-waveform')" class="button">Visualize Waveform</button>
    </div>
    <div class="info">
      <p>Selected Device: {{ selectedDevice ? selectedDevice.label : "No device selected" }}</p>
    </div>
    <div class="audio-device-select">
      <select
        name="device-select"
        id="device-select"
        v-model="selected">
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
import { reactive, watch, toRefs } from 'vue'


export default {

  name: 'AudioControls',

  props: {
    devices: Array,
    selectedDevice: Object
  },

  emits: [
    'test-event',
    'fetch-stream',
    'select-device',
    'visualize-waveform'
  ],

  setup (props, { emit }) {

    const audioControlsState = reactive({
      selected: props.selectedDevice
    })

    watch(
      () => audioControlsState.selected,
      (selectedDevice) => {
        console.log('WATCH -- selectedDevice: ', selectedDevice)
        emit('select-device', selectedDevice)
      }
    )

    // function handleFetchClick () {
    //   console.log('FETCH HANDLER CALLED')
    //   emit("fetch-stream")
    // }

    return {
      ...toRefs(audioControlsState),
      // handleFetchClick
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-controls {
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