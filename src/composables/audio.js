import { reactive, toRefs } from 'vue'


export default function useAudio () {

  // Config for default AudioDevice - used if found in available devices
  const defaultDevice = {
    deviceId: '7cd23f310c26765acb1eddcb52e80a659ce7820a99e6c3ef3f10cdc8c68c3012',
    label: 'Music Monitor (Virtual)'
  }

  const audioState = reactive({
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
      console.log('Initializing Audio... ', device ? `[ ${ device.label } ]` : '[ default device ]')
      try {
        createAudioContext()
        createAudioSourceNode()
        createAudioGainNode()
        createAudioAnalyserNode()
        connectAudioNodes()
        console.log(`[[ Audio initialized: ${ device ? device.label : 'default device ' } ]]`)
      } catch (err) {
        console.error('Audio could not be initialized: ', err)
      }
    })
  }

  function createAudioContext () {
    console.log('Creating AudioContext...')
    try {
      audioState.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (err) {
      console.error('AudioContext could not be created: ', err)
    }
  }

  function createAudioSourceNode (stream = audioState.audioStream) {
    console.log('Creating AudioSourceNode...')
    try {
      audioState.audioSource = audioState.audioContext.createMediaStreamSource(stream)
    } catch (err) {
      console.error('AudioSourceNode could not be created: ', err)
    }
  }

  function createAudioGainNode () {
    console.log('Creating AudioGainNode...')
    try {
      audioState.audioGain = audioState.audioContext.createGain()
    } catch (err) {
      console.error('AudioGainNode could not be created: ', err)
    }
  }

  function createAudioAnalyserNode () {
    console.log('Creating AudioAnalyser...')
    try {
      if (audioState.audioContext && audioState.audioStream) {
        audioState.audioAnalyser = audioState.audioContext.createAnalyser()
      }
    } catch (err) {
      console.error('AudioAnalyserNode could not be created: ', err)
    }
  }

  function connectAudioNodes () {
    console.log('Connecting AudioNodes...')
    try {
      audioState.audioSource.connect(audioState.audioGain)
      audioState.audioGain.connect(audioState.audioAnalyser)
      audioState.audioAnalyser.connect(audioState.audioContext.destination)
    } catch (err) {
      console.error('AudioNodes could not be connected: ', err)
    }
  }

  function fetchAvailableDevices () {
    console.log('Fetching available AudioDevices...')
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
        audioState.audioDevices.available = filteredDevices
        audioState.audioDevices.selected = defaultSelectedDevice.length > 0 ? defaultSelectedDevice[0]: filteredDevices[0]
      })
      .catch(function(err) {
        console.error('AudioDevices could not be fetched: ', err)
      })
  }

  async function fetchMediaStream (deviceId) {
    let stream = null
    const constraints = { audio: { deviceId: { exact: deviceId ? deviceId : undefined } } }
    console.log('Fetching MediaStream... ')
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints)
      audioState.audioStream = stream
      console.log('MediaStream fetched')
    } catch(err) {
      console.error('MediaStream could not be fetched: ', err)
    }
  }

  function selectDevice (device) {
    console.log(`Selecting Device: [ ${device.label} ]`)
    try {
      audioState.audioDevices.selected = device
      initAudio(audioState.audioDevices.selected)
    } catch (err) {
      console.error(`Device [ ${ device.label } ] could not be initialized: `, err)
    }
  }

  function setAudioGain (level = 0) {
    // Level min = 0, max = 1
    try {
      audioState.audioGain.gain.setValueAtTime(level, audioState.audioContext.currentTime)
    } catch (err) {
      console.error('Audio gain could not be set: ', err)
    }
  }

  return {
    ...toRefs(audioState),
    initAudio,
    fetchAvailableDevices,
    selectDevice,
    setAudioGain
  }
}