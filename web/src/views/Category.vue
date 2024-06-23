<template>
  <div>
    <ul>
      <li v-for="category in categories" :key="category.id">{{ category.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import category from '@/model/category.js';

const categories = computed(() => category.fetch());
const one = computed(() => category.fetchOne());

onMounted(() => {
  category.actions.getAll();
});

const add = async (data) => {
  await category.actions.add(data);
};

const update = async (data) => {
  await category.actions.update(data);
};

const remove = async (data) => {
  await category.actions.remove(data);
};
</script>

<style scoped></style>
