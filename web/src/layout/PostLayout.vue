<template>
  <v-app>
    <v-main class="bg-grey-lighten-3 full-background">
      <v-container fluid style="width: 85%">
        <v-row style="display: flex">
          <v-col style="flex: 12; margin-right: 2vw">
            <RouterView />
          </v-col>
          <v-col style="flex: 5" class="pt-8">
            <div class="side-card">
              <v-sheet min-height="40vh" max-height="80vh" :elevation="1" class="scrollbar mb-8">
                <Information />
              </v-sheet>
              <v-sheet min-height="40vh" max-height="80vh" :elevation="1" class="scrollbar">
                <Category :current="category ? category : ''" />
              </v-sheet>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Category from '@/views/Category.vue';
import Information from '@/views/Information.vue';

const route = useRoute();
const category = ref(route.query.category || '');

watch(
  () => route.query.category,
  (newCategory) => {
    category.value = newCategory || '';
  }
);
</script>

<style>
.full-background {
  background-image: url('@/assets/bg.jpg');
  background-position: center;
  background-repeat: repeat;
  min-height: 100vh;
}

.side-card {
  position: fixed;
  top: 10%;
  width: 18%;
}

.scrollbar {
  overflow: hidden;
}

.scrollbar:hover {
  overflow-y: auto;
}
/* 定制滚动条的样式 */
.scrollbar::-webkit-scrollbar {
  width: 2px;
  visibility: hidden;
}

.scrollbar::-webkit-scrollbar-track {
  background: #fff;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: #888;
}

.scrollbar:hover::-webkit-scrollbar-thumb {
  background: #555;
}
</style>
