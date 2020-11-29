<template>
  <div class="wavy">
    <vis-canvas></vis-canvas>
    <audio-controls
      :devices="audioDevices.available"
      :selectedDevice="audioDevices.selected"
      @select="selectDevice"
      @visualize="runVisualizer">
    </audio-controls>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { reactive, onMounted } from 'vue'
import AudioControls from './AudioControls.vue'
import VisCanvas from './VisCanvas.vue'
import useAudio from '@/composables/audio'
import useCanvas from '@/composables/canvas'


export default {

  name: 'wavy',

  components: {
    AudioControls,
    VisCanvas
  },

  setup () {

    const state = reactive({
      loading: false
    })

    const {
      audioContext,
      audioStream,
      audioGain,
      audioAnalyser,
      audioDevices,
      initAudio,
      fetchAvailableDevices,
      selectDevice,
      setAudioGain
    } = useAudio()

    const {
      canvasContext,
      canvasElement,
      initCanvas,
      visualizeWaveform
    } = useCanvas()

    function init () {
      fetchAvailableDevices()
      initAudio()
      initCanvas()
    }

    function runVisualizer () {
      console.log('Running visualizer...')
      try {
        if (audioContext.value) { audioContext.value.resume() }
        if (audioAnalyser.value && canvasElement.value && canvasContext.value) {
          visualizeWaveform(audioAnalyser.value)
        } 
      } catch (err) {
        console.error('Visualizer could not run: ', err)
      }
    }

    onMounted(() => {
      init()
    })

    return {
      state,
      // Audio
      audioContext,
      audioStream,
      audioGain,
      audioAnalyser,
      audioDevices,
      initAudio,
      fetchAvailableDevices,
      selectDevice,
      setAudioGain,
      // Canvas
      initCanvas,
      runVisualizer
    }
  }
}
</script>

<style lang="scss">
.wavy {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  h1, h2, h3 {
    margin: 0;
  }
}
</style>
