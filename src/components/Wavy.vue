<template>
  <div class="wavy">
    <Canvas />
    <Controls />
  </div>
</template>

<script>
/* eslint-disable no-console */
// import { mapActions } from 'vuex'
import Canvas from './Canvas.vue'
import Controls from './Controls.vue'

export default {
  name: 'Wavy',
  components: {
    Canvas,
    Controls
  },
  created: function() {
    this.$store.dispatch('audio/fetchAvailableDevices')
    // this.getMediaStream()
  },
  methods: {
    getMediaStream () {
      this.$store.dispatch('audio/fetchMediaStream')
    }
  }
}
</script>

<style lang="scss">
.wavy {
  width: 100%;

  h1, h2, h3 {
    margin: 0;
  }
}
</style>
