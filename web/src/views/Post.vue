<template>
  <div>
    <v-btn style="position: fixed; left: 15px; top: 63px" color="" @click="jumpToHome"> 首页 </v-btn>
    <v-sheet :elevation="1" border class="px-12 pt-3" v-if="post">
      <div>
        <span style="font-size: 30px; font-weight: 700; color: #000">{{ post.title }}</span>
      </div>
      <v-divider color="#000" class="my-3"></v-divider>
      <div v-if="post.content" v-html="post.content"></div>
      <div class="mt-5">
        <span style="font-size: 12px; font-weight: 400">{{ formatTime(post.updateTime, 'YYYY年M月DD日') }}</span>
        <div @click="postModel.actions.like(post._id)" style="display: flex; align-items: center; cursor: pointer; display: inline" class="like">
          <v-icon style="font-size: 15px" icon="mdi-thumb-up" />
          <span style="font-size: 12px; margin-left: 2px">{{ post.like }}</span>
        </div>
      </div>
    </v-sheet>

    <v-sheet :elevation="1" border class="mt-8 py-4 px-12">
      <div v-for="msg in messages" class="mb-4">
        <div>
          <span>{{ msg.visitor.name }}</span
          ><span>{{ msg.visitor.email }}</span>
        </div>
        <div>{{ formatTime(msg.createTime, 'YYYY-MM-DD hh:mm:ss') }}</div>
        <span> {{ msg.content }} </span>
        <div>
          <div @click="messageModel.actions.like(msg._id)" style="display: flex; align-items: center; cursor: pointer; display: inline" class="like">
            <v-icon style="font-size: 15px" icon="mdi-thumb-up" />
            <span style="font-size: 12px; margin-left: 2px">{{ msg.like }}</span>
          </div>

          <div class="ml-2 comment" style="display: flex; align-items: center; cursor: pointer; display: inline">
            <v-icon style="font-size: 15px" icon="mdi-comment" />
          </div>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import { formatTime } from '@/utils/time.js';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
import postModel from '@/model/post.js';
import visitorModel from '@/model/visitor.js';
import messageModel from '@/model/message.js';

const router = useRouter();
const jumpToHome = () => {
  router.push('/');
};

const route = useRoute();
const post = computed(() => postModel.fetchOne());
const messages = computed(() => messageModel.fetch());

onMounted(() => {
  postModel.actions.get(route.params.id);
  messageModel.actions.getAll();
});
</script>

<style scoped>
.like {
  color: #bdbdbd;
  transition: background-color 0.3s ease;
}

.like:hover {
  color: #ff7043;
}
.comment {
  color: #bdbdbd;
  transition: background-color 0.3s ease;
}

.comment:hover {
  color: #424242;
}
</style>
