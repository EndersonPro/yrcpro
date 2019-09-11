<template>
  <div>El id es: {{ id }}</div>
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