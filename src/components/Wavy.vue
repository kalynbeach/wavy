<template>
  <div class="wavy">
    <Canvas />
    <Controls
      @fetch-stream="fetchMediaStream"
      @visualize-waveform="runTest"
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
      analyser: null,
      canvas: null,
      canvasContext: null
    }
  },

  methods: {

    fetchMediaStream () {
      console.log('Fetching MediaStream...')
      this.$store.dispatch('audio/fetchMediaStream')
    },

    createAudioAnalyser() {
      this.analyser = this.context.createAnalyser()
      console.log('Analyser created.')
      const source = this.context.createMediaStreamSource(this.stream)
      source.connect(this.analyser)
      this.analyser.connect(this.context.destination)
    },

    createCanvasContext() {
      this.canvas = document.getElementById('canvas')
      this.canvasContext = this.canvas.getContext('2d')
      console.log('Canvas and canvas context created.')
    },

    // TODO: Study requestAnimationFrame and build out draw()
    visualizeWaveform() {
      let analyser = this.analyser
      let canvas = this.canvas
      let canvasContext = this.canvasContext

      console.dir(analyser)
      console.dir(canvas)
      console.dir(canvasContext)

      const WIDTH = canvas.width
      const HEIGHT = canvas.height
      
      // Set up audio buffer
      analyser.fftSize = 2048
      const bufferLength = analyser.frequencyBinCount
      let dataArray = new Uint8Array(bufferLength)
      
      canvasContext.clearRect(0, 0, WIDTH, HEIGHT)
  
      function draw() {
        // eslint-disable-next-line no-unused-vars
        let drawVisual = requestAnimationFrame(draw)
        analyser.getByteTimeDomainData(dataArray)

        canvasContext.fillStyle = 'rgb(200, 200, 200)'
        canvasContext.fillRect(0, 0, WIDTH, HEIGHT)
        canvasContext.lineWidth = 2
        canvasContext.strokeStyle = 'rgb(0, 0, 0)'
        canvasContext.beginPath()

        let sliceWidth = WIDTH * 1.0 / bufferLength
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          let v = dataArray[i] / 128.0
          let y = v * HEIGHT / 2
          if (i === 0) {
            canvasContext.moveTo(x, y)
          } else {
            canvasContext.lineTo(x, y)
          }
          x += sliceWidth
        }

        canvasContext.lineTo(canvas.width, (canvas.height / 2))
        canvasContext.stroke()
      }

      draw()
    },

    // TODO: Better error handling
    runTest() {
      console.log('Running test...')
      this.context.resume()
      
      if (this.context && this.stream) {
        this.createAudioAnalyser()
      } else {
        if (this.context == null) {
          console.error('AudioContext has not yet been created')
        }
        if (this.stream == null) {
          console.error('MediaStream has not yet been fetched')
        }
      }

      this.createCanvasContext()

      if (this.analyser && this.canvas && this.canvasContext) {
        this.visualizeWaveform()
      } else {
        if (this.analyser == null) {
          console.error('AnalyserNode has not yet been created')
        }
        if (this.canvas == null) {
          console.error('Canvas has not yet been created')
        }
        if (this.canvasContext == null) {
          console.error('Canvas context has not yet been created')
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
