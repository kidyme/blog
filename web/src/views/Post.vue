<template>
  <h1>{{ msg }}</h1>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const msg = ref('Post');

const route = useRoute();
const postId = route.params.id;
</script>

<style scoped></style>
