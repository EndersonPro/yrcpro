<template>
  <div><p>El id es: {{ id }}</p></div>
</template>

<script>
export default {
  name: "Test",
  computed: {
    id() {
      return this.$route.params.id || 3;
    }
  }
};
</script>