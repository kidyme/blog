<template>
  <div>
    <v-btn color="primary" @click="addPost" class="mb-6"> 添加帖子 </v-btn>
    <v-sheet :elevation="1" border class="mb-6 px-12 pt-3" v-for="post in posts">
      <div style="display: flex; align-items: end; justify-content: space-between">
        <span @click="jump(post.title, post._id)" class="underline" style="font-size: 25px; font-weight: 500; cursor: pointer">
          {{ post.title }}
        </span>
        <span style="color: #212121; font-size: 16px; font-weight: 400" class="ml-2">{{ formatTime(post.updateTime, 'yyyy年MM月dd日') }}</span>
      </div>
      <v-divider color="#000" class="my-3"></v-divider>
      <div style="max-height: 20vh; overflow: hidden" v-html="post.content"></div>
    </v-sheet>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatTime } from '@/utils/time.js';
import postModel from '@/model/post.js';

const props = defineProps({
  categoryId: {
    type: String,
    required: false,
    default: undefined,
  },
});

const posts = computed(() => postModel.fetch());

const fetch = async () => {
  postModel.actions.getAll({ category: props.categoryId });
};

const emit = defineEmits(['addPostTab', 'addPost']);
const jump = (title, id) => {
  emit('addPostTab', { title, id });
};
const addPost = () => {
  emit('addPost');
};

fetch();
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
