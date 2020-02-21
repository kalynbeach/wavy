<template>
  <div class="controls">
    <h1>Wavy</h1>
    <div class="buttons">
      <button v-on:click="$emit('fetch-stream')" class="button">Fetch MediaStream</button>
      <button v-on:click="$emit('visualize-waveform')" class="button">Visualize Waveform</button>
    </div>
    <div class="audio-device-select">
      <select v-model="selected" name="device-select" id="device-select">
        <option v-for="device in devices" v-bind:value="device" v-bind:key="device.uniqueId">
          {{ device.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(243, 243, 243);
  border: 1px solid black;

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
