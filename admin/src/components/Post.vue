<template>
  <div>
    <div v-if="post" class="px-12 pt-3">
      <div style="display: flex; align-items: end; justify-content: space-between">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <div v-bind="props" style="display: flex; align-items: center">
              <span class="underline" style="font-size: 25px; font-weight: 500; cursor: pointer">{{ post.title }}</span>
              <v-btn v-if="isHovering" small @click.stop="handleButtonClick(post._id)" style="margin-left: 8px"> 编辑 </v-btn>
            </div>
          </template>
        </v-hover>

        <span style="color: #212121; font-size: 16px; font-weight: 400" class="ml-2">{{ formatTime(post.updateTime, 'yyyy年MM月dd日') }}</span>
      </div>
      <v-divider color="#000" class="my-3"></v-divider>
      <div v-if="post.content" v-html="post.content"></div>
      <div style="margin-bottom: 10px">
        <div style="display: flex; justify-content: end">
          <div @click="postModel.actions.like(post._id)" style="display: flex; align-items: center; cursor: pointer; display: inline" class="like">
            <v-icon style="font-size: 20px" icon="mdi-thumb-up" />
            <span style="font-size: 12px; margin-left: 2px">{{ post.like }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatTime } from '@/utils/time.js';
import postModel from '@/model/post.js';

const props = defineProps({
  postId: {
    type: String,
    required: true,
  },
});

const post = computed(() => postModel.fetchOne());

const fetch = async () => {
  postModel.actions.get({ id: props.postId });
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
