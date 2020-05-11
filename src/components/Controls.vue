<template>
  <div class="controls">
    <h1>Wavy</h1>
    <div class="buttons">
      <button v-on:click="$emit('fetch-stream')" class="button">Fetch MediaStream</button>
      <button v-on:click="$emit('visualize-waveform')" class="button">Visualize Waveform</button>
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
import { computed, reactive, watch, onUpdated } from 'vue'


export default {

  name: 'Controls',

  props: {
    devices: Array,
    fetchMediaStream: Function,
    selectDevice: Function,
    runTest: Function
  },

  setup (props) {

    const controlsState = reactive({
      devices: computed(() => props.devices),
      selected: null
    })
  
    // onMounted(() => {
    //   console.log('props.devices: ', props.devices)
    //   console.log('controlsState: ', controlsState)
    // })

    onUpdated(() => {
      console.log('WATCH -- props: ', props)
      console.log('controlsState: ', controlsState)
    })

    watch(
      () => controlsState.selected,
      (selectedDevice) => {
        console.log('WATCH -- props: ', props)
        console.log('WATCH -- selectedDevice: ', selectedDevice)
        // controlsState.selected = selectedDevice
        props.selectDevice(selectedDevice)
      }
    )

    return {
      // ...toRefs(controlsState)
      controlsState
    }
  }
}

////////////////////////////

export const _controls = {
  name: 'Controls',
  data: function () {
    return {
      selected: null
    }
  },
  computed: {
    devices () {
      return this.$store.state.audio.devices.available
    }
  },
  methods: {
    selectDevice (device) {
      console.log('New device selected: ', device)
      this.$store.dispatch('audio/selectDevice', device)
    }
  },
  watch: {
    selected: function(val) {
      this.selectDevice(val)
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
      border: 1px solid black;

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
