<template>
  <v-btn style="position: fixed; left: 15px; top: 63px" color="" @click="jumpBack"> 返回 </v-btn>
  <v-sheet :elevation="1" border class="px-12 pt-3" v-if="post">
    <div>
      <span style="font-size: 25px; font-weight: 500; color: #000">{{ post.title }}</span>
    </div>
    <v-divider color="#000" class="my-3"></v-divider>
    <div v-if="post.content" v-html="post.content"></div>
    <div class="mt-5">
      <span style="font-size: 12px; font-weight: 400">{{ formatTime(post.updateTime, 'YYYY年M月DD日') }}</span>
    </div>
  </v-sheet>
</template>

<script setup>
import { formatTime } from '@/utils/time.js';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
import postModel from '@/model/post.js';

const router = useRouter();

const jumpBack = () => {
  router.push('/');
};

const route = useRoute();
const post = computed(() => postModel.fetchOne());
onMounted(() => {
  postModel.actions.get(route.params.id);
});
</script>

<style scoped></style>
