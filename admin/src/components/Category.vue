<template>
  <div class="category-container">
    <div class="category-list">
      <v-sheet v-for="category in categories" :key="category._id" class="category-item" :elevation="3" border rounded @click="jump(category._id, category.title)">
        <div class="category-content">
          <span class="category-title">{{ category.title }}</span>
        </div>
      </v-sheet>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import categoryModel from '@/model/category.js';

const categories = computed(() => categoryModel.fetch());

const fetch = async () => {
  categoryModel.actions.getAll();
};

const emit = defineEmits(['jumpToPostWithCategoryId']);
const jump = (id, title) => {
  emit('jumpToPostWithCategoryId', { id, title });
};

fetch();
</script>

<style scoped>
.category-container {
  max-width: 75%;
  padding: 20px;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.category-item {
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-title {
  font-size: 18px;
  font-weight: 500;
  color: #213555;
}
</style>
