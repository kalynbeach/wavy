<template>
  <div class="audio-controls">
    <h1>Wavy</h1>
    <div class="controls-container">
      <div class="buttons">
        <button @click="$emit('visualize')" class="button">Visualize</button>
      </div>
      <!-- <div class="info">
        <p>Selected Device: {{ selected ? selected.label : "No device selected" }}</p>
      </div> -->
      <div class="audio-device-select">
        <select
          name="device-select"
          id="device-select"
          v-model="selected">
          <option disabled value="">Select a device</option>
          <option
            v-for="device in devices"
            :value="device"
            :key="device.uniqueId">
            {{ device.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { reactive, toRefs, watch } from 'vue'


export default {

  name: 'audio-controls',

  props: {
    devices: Array,
    selectedDevice: Object
  },

  emits: [
    'select',
    'visualize'
  ],

  setup (props, { emit }) {

    const state = reactive({
      selected: props.selectedDevice
    })

    watch(() => props.selectedDevice, (device) => {
      // console.log('WATCH props.selectedDevice: ', device)
      state.selected = device
    })

    watch(() => state.selected, (device) => {
      // console.log('WATCH state.selected: ', device)
      emit('select', device)
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.audio-controls {
  height: 5vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: $background-color;

  h1 {
    align-self: center;
  }

  .controls-container {
    display: flex;
    flex-direction: row;

    .buttons {
      margin: 0 1rem 0 0;
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      .button:not(:last-of-type) {
        margin-right: 1rem;
      }
    }

    .info {
      p {
        font-weight: bold;
      }
    }

    .audio-device-select {
      align-self: center;

      select {
        min-height: 2rem;
        padding: 0 0.5rem;
        border-radius: 1rem;

        option {
          min-height: 100%;
          min-width: 100%;
          color: black;
        }
      }
    }
  }
}
</style>