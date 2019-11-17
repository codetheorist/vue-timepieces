<template>
  <div id="app">
    <Clock />
  </div>
</template>

<script>
import Clock from "./components/Clock.vue";
export default {
  name: "app",
  components: {
    Clock
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
</style>
