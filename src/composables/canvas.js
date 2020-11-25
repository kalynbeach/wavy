import { reactive, toRefs } from 'vue'

export default function useCanvas () {

  const canvasState = reactive({
    canvasContext: null,
    element: null
  })

  function createCanvasContext () {
    canvasState.element = document.getElementById('canvas')
    canvasState.context = canvasState.element.getContext('2d')
    console.log('Canvas and canvas context created!')
  }

  function visualizeWaveform (analyser) {
    // let analyser = this.analyser
    let canvas = canvasState.element
    let canvasContext = canvasState.context

    // console.dir(analyser)
    // console.dir(canvas)
    // console.dir(canvasContext)

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
  }

  return {
    ...toRefs(canvasState),
    createCanvasContext,
    visualizeWaveform
  }
}