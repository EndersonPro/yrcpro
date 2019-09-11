<template>
  <div>
    <h3>App</h3>
    <h5>{{io}}</h5>
    <ul>
      <li><router-link to="/test/1"> Test 1 </router-link></li>
      <li><router-link to="/test/2"> Test 2 </router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

import ioStoreModule from './store/modules/io';

export default {
  name:"app",
  computed:{
    io(){
      return this.$store.state.io
    }
  }
};
</script>