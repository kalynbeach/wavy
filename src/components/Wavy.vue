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
      // initAudio,
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
      // initAudio()
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
@import '@/scss/variables';

.wavy {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $background-color;

  h1, h2, h3 {
    margin: 0;
  }

  .button {
    min-height: 1rem;
    padding: 0.25rem 1rem;
    font-size: 16px;
    border-radius: 1rem;
    background-color: $background-light-color;
    border: 2px solid $border-color;
  }
}
</style>
