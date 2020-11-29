<template>
  <div class="vis-canvas">
    <canvas id="vis-canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'vis-canvas'
}
</script>

<style scoped lang="scss">
@import '@/scss/variables';

.vis-canvas {
  width: 100%;
  min-height: 95vh;
  background-color: rgb(255, 255, 255);

  #vis-canvas {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
