<template>
  <div>
    <h3>Holaa</h3>
    <ul>
      <li><router-link to="/test/1"> Test 1 </router-link></li>
      <li><router-link to="/test/2"> Test 2 </router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:"app"
};
</script>