import { reactive, toRefs } from 'vue'

export default function useAudio () {

  const audioState = reactive({
    audioContext: null,
    audioStream: null,
    audioAnalyser: null,
    audioDevices: {
      available: [],
      selected: null
    }
  })

  function createAudioAnalyser () {
    console.log('Creating audio analyser...')
    if (audioState.audioContext && audioState.audioStream) {
      audioState.audioAnalyser = audioState.audioContext.createAnalyser()
      console.log('Analyser created!')
      const source = audioState.audioContext.createMediaStreamSource(audioState.audioStream)
      source.connect(audioState.audioAnalyser)
      audioState.audioAnalyser.connect(audioState.audioContext.destination)
    }
  }

  function createAudioContext () {
    console.log('Creating AudioContext...')
    audioState.audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }

  async function fetchMediaStream () {
    console.log('Fetching MediaStream...')
    let stream = null
    const constraints = { audio: true }
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints)
      audioState.audioStream = stream
      console.log('MediaStream fetched.')
    } catch(err) {
      console.log('fetchUserMedia ERROR: ', err)
    }
  }

  function fetchAvailableDevices () {
    console.log('Fetching available AudioDevices')
    navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        let identifiedDevices = devices.map(device => {
          Object.defineProperty(device, 'uniqueId', {
            value: Math.round(Math.random() * 1024)
          })
          return device
        })
        audioState.audioDevices.available = identifiedDevices
      })
      .catch(function(err) {
        console.log(err.name + ': ' + err.message)
      })
  }

  function selectDevice (device) {
    console.log('Selecting AudioDevice: ', device)
    audioState.audioDevices.selected = device
    console.log('AudioDevice set: ', audioState.audioDevices.selected)
  }

  return {
    ...toRefs(audioState),
    createAudioAnalyser,
    createAudioContext,
    fetchMediaStream,
    fetchAvailableDevices,
    selectDevice
  }
}