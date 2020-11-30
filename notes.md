# Notes


## Web Audio API

### Audio Graph Nodes

- AudioContext
  - MediaStreamAudioSourceNode
    - GainNode
      - AnalyserNode

### Audio Initialization Process

- Fetch audio devices
- Set available devices and selected device
  - If a default device from config is available, set as the selected device
- When an AudioDevice is selected:
  - Fetch and set MediaStream from selected device (using deviceId)
  - Initialize audio with selected device
    - Create context and nodes
      - Create AudioContext
      - Create AudioNode (AudioSourceNode) from MediaStream
      - Create AudioGain
      - Create AudioAnalyser 
    - Connect AudioNodes
      - Connect AudioSourceNode to AudioGain
      - Connect AudioGain to AudioAnalyser
      - Connect AudioAnalyser to AudioContext.destination


## TODOS

- Work on AudioControls component
  - Redesign / improve layout (less horizontal shift)
  - Gain controls / mute function
    - Needs to control output volume but still allow signal with gain to be analyzed

- Factor out configs, use in audio and canvas composables
  - Default AudioDevice
    - deviceId
    - label
  - Canvas element id

