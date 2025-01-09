<template>
  <div class="pa-3" style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px">
    <span
      class="pa-2"
      v-for="category in categories"
      :style="`background-color: ${props.current === category._id ? '#FF8A80' : '#9da9b9'}; color: #fff; font-size: 20px; font-weight: 300; cursor: pointer; border-radius: 5%`"
      @click="query(category._id)"
      :key="category._id"
      >{{ category.title }}</span
    >
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import category from '@/model/category.js';

const props = defineProps({
  current: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const categories = computed(() => category.fetch());

onMounted(() => {
  category.actions.getAll();
});

const query = (category) => {
  router.push({ path: '/', query: { category } });
};
</script>

<style scoped></style>
