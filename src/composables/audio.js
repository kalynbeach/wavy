import { reactive, toRefs } from 'vue'


export default function useAudio () {

  // Config for default AudioDevice - used if found in available devices
  const defaultDevice = {
    deviceId: '7cd23f310c26765acb1eddcb52e80a659ce7820a99e6c3ef3f10cdc8c68c3012',
    label: 'Music Monitor (Virtual)'
  }

  const state = reactive({
    audioContext: null,
    audioStream: null,
    audioSource: null,
    audioGain: null,
    audioAnalyser: null,
    audioDevices: {
      available: [],
      selected: defaultDevice
    }
  })

  function initAudio (device = null) {
    const deviceId = device ? device.deviceId : null
    fetchMediaStream(deviceId).then(() => {
      try {
        createAudioContext()
        createAudioSourceNode()
        createAudioAnalyserNode()
        createAudioGainNode()
        connectAudioNodes()
        console.log(`[[ Audio initialized: ${ device ? device.label : 'default device ' } ]]`)
      } catch (err) {
        console.error('Audio could not be initialized: ', err)
      }
    })
  }

  function createAudioContext () {
    try {
      state.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (err) {
      console.error('AudioContext could not be created: ', err)
    }
  }

  function createAudioSourceNode (stream = state.audioStream) {
    try {
      state.audioSource = state.audioContext.createMediaStreamSource(stream)
    } catch (err) {
      console.error('AudioSourceNode could not be created: ', err)
    }
  }

  function createAudioGainNode () {
    try {
      state.audioGain = state.audioContext.createGain()
    } catch (err) {
      console.error('AudioGainNode could not be created: ', err)
    }
  }

  function createAudioAnalyserNode () {
    try {
      if (state.audioContext && state.audioStream) {
        state.audioAnalyser = state.audioContext.createAnalyser()
      }
    } catch (err) {
      console.error('AudioAnalyserNode could not be created: ', err)
    }
  }

  function connectAudioNodes () {
    try {
      state.audioSource.connect(state.audioAnalyser)
      state.audioAnalyser.connect(state.audioGain)
      setAudioGain()
      state.audioGain.connect(state.audioContext.destination)
    } catch (err) {
      console.error('AudioNodes could not be connected: ', err)
    }
  }

  function fetchAvailableDevices () {
    navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        const identifiedDevices = devices.map(device => {
          Object.defineProperty(device, 'uniqueId', {
            value: Math.round(Math.random() * 1024)
          })
          return device
        })
        const filteredDevices = identifiedDevices.filter(device => (
          device.kind && device.kind !== 'videoinput'
        ))

        const defaultSelectedDevice = filteredDevices.filter(device => (
          device.deviceId === defaultDevice.deviceId && device.label === defaultDevice.label
        ))
        state.audioDevices.available = filteredDevices
        state.audioDevices.selected = defaultSelectedDevice.length > 0 ? defaultSelectedDevice[0]: filteredDevices[0]
      })
      .catch(function(err) {
        console.error('AudioDevices could not be fetched: ', err)
      })
  }

  async function fetchMediaStream (deviceId) {
    let stream = null
    const constraints = { audio: { deviceId: { exact: deviceId ? deviceId : undefined } } }
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints)
      state.audioStream = stream
    } catch(err) {
      console.error('MediaStream could not be fetched: ', err)
    }
  }

  function selectDevice (device) {
    try {
      state.audioDevices.selected = device
      initAudio(state.audioDevices.selected)
    } catch (err) {
      console.error(`Device [ ${ device.label } ] could not be initialized: `, err)
    }
  }

  function setAudioGain (level = 0) {
    // Level min = 0, max = 1
    try {
      state.audioGain.gain.setValueAtTime(level, state.audioContext.currentTime)
    } catch (err) {
      console.error('Audio gain could not be set: ', err)
    }
  }

  return {
    ...toRefs(state),
    initAudio,
    fetchAvailableDevices,
    selectDevice,
    setAudioGain
  }
}