<template>
  <div id="app">
    <TobiRollz/>
  </div>
</template>

<script>
import TobiRollz from "./components/TobiRollz";

export default {
  name: 'App',
  components: {TobiRollz}
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
