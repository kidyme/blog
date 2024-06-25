<template>
  <div class="pa-3" style="display: flex; justify-content: space-around">
    <span
      style="background-color: #9da9b9; color: #fff; font-size: 20px; font-weight: 300; cursor: pointer; border-radius: 5%"
      class="pa-2"
      v-for="category in categories"
      :key="category.id"
      >{{ category.title }}</span
    >
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import category from '@/model/category.js';

const categories = computed(() => category.fetch());

onMounted(() => {
  category.actions.getAll();
});
</script>

<style scoped></style>
