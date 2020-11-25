<template>
  <div class="wavy">
    <vis-canvas />
    <audio-controls
      :devices="audioDevices.available"
      :selectedDevice="audioDevices.selected"
      @test-event="handleTestEvent"
      @fetch-stream="fetchMediaStream"
      @select-device="selectDevice"
      @visualize-waveform="runTest">
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

  name: 'Wavy',

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
      element,
      createCanvasContext,
      visualizeWaveform
    } = useCanvas()

    function handleTestEvent () {
      console.log("Handling 'test-event")
    }

    function runTest () {
      console.log('Running test...')
      if (audioContext) {
        audioContext.resume()
      }
      if (audioContext && audioStream) {
        createAudioAnalyser()
      } else {
        if (audioContext == null) { console.error('AudioContext has not yet been created') }
        if (audioStream == null) { console.error('MediaStream has not yet been fetched') }
      }
      createCanvasContext()
      if (audioAnalyser && element && canvasContext) {
        visualizeWaveform(audioAnalyser)
      } else {
        if (audioAnalyser == null) { console.error('AnalyserNode has not yet been created') }
        if (element == null) { console.error('Canvas has not yet been created') }
        if (canvasContext == null) { console.error('Canvas context has not yet been created') }
      }
    }

    onMounted(() => {
      console.log('Mounted!')
      fetchAvailableDevices()
      createAudioContext()
      // fetchMediaStream()
    })

    // watch(() => audioState, (currentAudioState) => {
    //   console.log('WATCH - current audioState: ', currentAudioState)
    // })

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
      handleTestEvent,
      runTest
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
