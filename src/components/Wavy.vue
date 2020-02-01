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
  mounted: function() {
    console.log('STATE: ', this.$store.state)
    // this.getUserMedia({ audio: true })
    // this.listMediaDevices()
    this.$store.dispatch('audio/fetchAvailableDevices')
  },
  methods: {
    setUserMediaDevice() {

    },
    async getUserMedia(contraints) {
      let stream = null
      try {
        stream = await navigator.mediaDevices.getUserMedia(contraints)
        console.log('STREAM: ', stream)
      } catch(err) {
        console.log('getUserMedia ERROR: ', err)
      }
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
