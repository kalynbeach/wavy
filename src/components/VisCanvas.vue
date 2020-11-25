<template>
  <div class="vis-canvas">
    <canvas id="vis-canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'VisCanvas'
}
</script>

<style scoped lang="scss">
.vis-canvas {
  width: 100%;
  min-height: 95vh;
  background-color: rgb(255, 255, 255);

  #vis-canvas {
    width: 100%;
    height: 100%;
    border: 2px solid #2c3e50;;
    box-sizing: border-box;
  }
}
</style>
