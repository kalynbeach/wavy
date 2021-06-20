import { reactive, toRefs } from 'vue'


export default function useCanvas () {

  const state = reactive({
    canvasContext: null,
    canvasElement: null
  })

  function initCanvas () {
    try {
      createCanvasContext()
    } catch (err) {
      console.error('Canvas could not be initialized: ', err)
    }
  }

  function createCanvasContext () {
    try {
      state.canvasElement = document.getElementById('vis-canvas')
      state.canvasContext = state.canvasElement.getContext('2d')
    } catch (err) {
      console.error('CanvasContext could not be created: ', err)
    }
  }

  function visualizeWaveform (analyser) {
    const canvas = state.canvasElement
    const ctx = state.canvasContext
    const WIDTH = canvas.width
    const HEIGHT = canvas.height
    
    analyser.fftSize = 2048 // Fast Fourier Transform
    const bufferLength = analyser.frequencyBinCount
    let dataArray = new Uint8Array(bufferLength)
    
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    function draw() {
      // eslint-disable-next-line no-unused-vars
      let drawVisual = requestAnimationFrame(draw)
      analyser.getByteTimeDomainData(dataArray)

      ctx.fillStyle = 'rgb(200, 200, 200)'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgb(0, 0, 0)'
      ctx.beginPath()

      let sliceWidth = WIDTH * 1.0 / bufferLength
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0
        let y = v * HEIGHT / 2
        if (i === 0) { ctx.moveTo(x, y) } 
        else { ctx.lineTo(x, y) }
        x += sliceWidth
      }

      ctx.lineTo(canvas.width, (canvas.height / 2))
      ctx.stroke()
    }

    draw()
  }

  return {
    ...toRefs(state),
    initCanvas,
    visualizeWaveform
  }
}