<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#"><strong>YRC</strong>PRO</a>
</nav>
  <div class="container mt-3">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import ioStoreModule from "./store/modules/io";

export default {
  name: "app",
  computed: {
    io() {
      return this.$store.state.io;
    }
  }
};
</script>

<style lang="scss">
  @import "./bootstrap.min.css"
</style>