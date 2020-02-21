<template>
  <div class="wavy">
    <Canvas />
    <Controls
      @fetch-stream="getMediaStream"
      @create-analyser="createAudioAnalyser"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */
// import { mapActions } from 'vuex'
import Canvas from './Canvas.vue'
import Controls from './Controls.vue'
import { mapState } from 'vuex'

export default {

  name: 'Wavy',

  components: {
    Canvas,
    Controls
  },

  computed: mapState({
    context: state => state.audio.context,
    stream: state => state.audio.stream
  }),

  created: function() {
    this.$store.dispatch('audio/fetchAvailableDevices')
    this.$store.dispatch('audio/createAudioContext')
  },

  data: function() {
    return {
      analyser: null
    }
  },

  methods: {

    getMediaStream () {
      console.log('Fetching MediaStream!')
      this.$store.dispatch('audio/fetchMediaStream')
    },

    createAudioAnalyser() {
      if (this.context) {
        this.analyser = this.context.createAnalyser()
        console.log('Analyser created!')
      } else {
        console.error('AudioContext has not yet been created')
      }
    },

    captureAnalyserData() {
      if (this.analyser && this.stream) {
        const source = this.context.createMediaStreamSource(this.stream)
        source.connect(this.analyser)
        this.analyser.connect(this.context.destination)
      } else {
        if (this.analyser == null) {
          console.error('AnalyserNode has not yet been created')
        }
        if (this.stream == null) {
          console.error('MediaStream has not yet been created')
        }
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
