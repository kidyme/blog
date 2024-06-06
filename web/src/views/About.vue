<script setup>
import { ref } from 'vue';
const msg = ref("kidyme's blog");
</script>

<template>
  <div style="height: 80vh; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; text-align: center">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
