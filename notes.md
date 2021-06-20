# Wavy Notes

## Design

----

### Audio (Web Audio API)

#### Audio Graph Nodes

- AudioContext
  - MediaStreamAudioSourceNode
    - GainNode
      - AnalyserNode

#### Audio Initialization Process

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

### Canvas & Visualizers

- `canvas` composable initializes the canvas context
- `runVisualizer()` takes in the AudioContext's AudioAnalyzer and a visualizer's render function
- `analyser.fftSize` sets the number of data points to work with in `dataArray`
- `analyser.getByteTimeDomainData(dataArray)` is used with the render function to get real time time-domain analysis information
  - `analyser.getByteFrequencyData(dataArray)` can be used for frequency analysis data


----

## TODOs

----

### Testing

- Unit tests - Jest
  - audio composable
    - Ensure all necessary AudioNodes are created and connected
  - canvas composable
- Component tests - Vue Test Utils
  - Wavy
    - init method
  - AudioControls
  - VisCanvas

### Canvas / Visualizers

- Visualizer modualization & handling
  - Refactor runVisualizer, less logic in Wavy component method
  - Build a system to organize visualizers and their code (new composable?)
    - Visualization selection (canvas state, UI updates)
    - Pass selected visualizer's render function into canvas composable runVisualizer()

- Factor out configs, use in audio and canvas composables
  - Default AudioDevice
    - deviceId
    - label
  - Canvas element id

----

## Future Feature Ideas

----

- Beat detection using lower frequencies 

- Visualizer sets / playlists
  - Build a system to handle "sets" (arrays) of visualizers to sequentially run through
  - Detect the end/start of songs, then automatically switch to next visualizer in the set
  - Build UI components for creating & managing sets (hard code them at first)

- Video / Camera input for visualizations
  - Build support for video and live camera input
  - Create visualzations that use both video and audio inputs
