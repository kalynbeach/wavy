<template>
  <div class="wavy">
    <vis-canvas></vis-canvas>
    <audio-controls
      :devices="audioDevices.available"
      :selectedDevice="audioDevices.selected"
      @fetch="fetchMediaStream"
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
      audioAnalyser,
      audioDevices,
      createAudioAnalyser,
      createAudioContext,
      fetchMediaStream,
      fetchAvailableDevices,
      selectDevice
    } = useAudio()

    const {
      canvasContext,
      canvasElement,
      createCanvasContext,
      visualizeWaveform
    } = useCanvas()

    function runVisualizer () {
      console.log('Running visualizer...')
      console.log('audioContext: ', audioContext.value)
      if (audioContext.value) {
        audioContext.value.resume()
      }
      if (audioContext.value && audioStream.value) {
        createAudioAnalyser()
      } else {
        if (audioContext.value == null) { console.error('AudioContext has not yet been created') }
        if (audioStream.value == null) { console.error('MediaStream has not yet been fetched') }
      }
      createCanvasContext()
      if (audioAnalyser.value && canvasElement.value && canvasContext.value) {
        visualizeWaveform(audioAnalyser.value)
      } else {
        if (audioAnalyser.value == null) { console.error('AnalyserNode has not yet been created') }
        if (canvasElement.value == null) { console.error('Canvas has not yet been created') }
        if (canvasContext.value == null) { console.error('Canvas context has not yet been created') }
      }
    }

    onMounted(() => {
      fetchAvailableDevices()
      createAudioContext()
    })

    return {
      state,
      audioContext,
      audioStream,
      audioAnalyser,
      audioDevices,
      createAudioContext,
      fetchMediaStream,
      fetchAvailableDevices,
      selectDevice,
      createCanvasContext,
      visualizeWaveform,
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
