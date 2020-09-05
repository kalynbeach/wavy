<template>
  <div class="canvas">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Canvas'
}
</script>

<style scoped lang="scss">
.canvas {
  width: 100%;
  min-height: 95vh;
  background-color: rgb(255, 255, 255);

  #canvas {
    width: 100%;
    height: 100%;
    border: 2px solid #2c3e50;;
    box-sizing: border-box;
  }
}
</style>
