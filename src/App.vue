<template>
  <div id="app">
    <Wavy msg="Woooo"/>
  </div>
</template>

<script>
import Wavy from './components/Wavy.vue'

export default {
  name: 'app',
  components: {
    Wavy
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>
