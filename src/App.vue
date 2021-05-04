<template>
  <div id="app">
    <web-socket-test/>
  </div>
</template>

<script>
import WebSocketTest from "@/components/WebSocketTest";
export default {
  name: 'App',
  components: {WebSocketTest}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

body {
  background-color: #2b2b2c;
}
</style>
