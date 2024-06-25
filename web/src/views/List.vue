<template>
  <v-sheet :elevation="1" border class="mb-6 px-12 pt-3" v-for="post in posts">
    <div>
      <span @click="jump(post._id)" class="underline" style="font-size: 25px; font-weight: 500; cursor: pointer">{{ post.title }}</span>
    </div>
    <v-divider color="#000" class="my-3"></v-divider>
    <div style="max-height: 30vh; overflow: hidden" v-html="post.content"></div>
    <div class="mt-5">
      <span style="font-size: 12px; font-weight: 400">{{ formatTime(post.updateTime, 'YYYY年M月DD日') }}</span>
    </div>
  </v-sheet>
</template>

<script setup>
import { formatTime } from '@/utils/time.js';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import postModel from '@/model/post.js';

const router = useRouter();
const posts = computed(() => postModel.fetch());

onMounted(() => {
  postModel.actions.getAll();
});

const jump = (id) => {
  router.push({
    path: `/post/${id}`,
  });
};
</script>

<style scoped>
.underline {
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-bottom-color 0.1s;
}

.underline:hover {
  border-bottom-color: #000;
}
</style>
