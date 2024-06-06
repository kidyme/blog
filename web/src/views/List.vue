<template>
  <v-sheet :elevation="1" border class="mb-6 px-12 pt-3" v-for="(post, idx) in posts">
    <div>
      <span style="font-size: 22px; font-weight: 500">{{ post.title }}</span>
    </div>
    <v-divider color="#000" class="my-3"></v-divider>
    <div><MdPreview :source="post.briefContent" /></div>
    <div>
      <span style="font-size: 12px; font-weight: 400">{{ formatTime(post.time, 'YYYY年M月DD日') }}</span>
    </div>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { formatTime } from '@/utils/time.js';
import MdPreview from '@/components/md_preview.vue';

const posts = [
  { title: '在 Laravel 中使用 Vite 来构建静态资源', time: 1717656986289, briefContent: '# hello' },
  { title: '在 Laravel 中使用 Vite 来构建静态资源', time: 1717657586289, briefContent: '# 111' },
  { title: '在 Laravel 中使用 Vite 来构建静态资源', time: 1717660586289, briefContent: '# 123' },
];
</script>

<style scoped></style>
