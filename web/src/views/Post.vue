<template>
  <div>
    <v-btn style="position: fixed; left: 15px; top: 63px" color="" @click="jumpToHome"> 首页 </v-btn>
    <v-sheet :elevation="1" border class="px-12 pt-3" v-if="post">
      <div style="display: flex; align-items: end; justify-content: space-between">
        <span style="font-size: 30px; font-weight: 700; color: #000">{{ post.title }}</span>
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
    </v-sheet>

    <v-sheet v-if="post" :elevation="1" border class="mt-8 py-4 px-12" style="margin-bottom: 100px">
      <div v-for="msg in messages" class="mb-4">
        <div>
          <span class="name mr-3">{{ msg.visitor.name }}</span>
          <span class="time mr-2">{{ formatTime(msg.createTime, 'yyyy.MM.dd hh:mm:ss') }}</span>
          <div style="display: inline">
            <div @click="messageModel.actions.like(msg._id, msg._id)" style="display: flex; align-items: center; cursor: pointer; display: inline" class="like">
              <v-icon style="font-size: 15px" icon="mdi-thumb-up" />
              <span style="font-size: 12px; margin-left: 2px">{{ msg.like }}</span>
            </div>

            <!-- <div class="ml-2 comment" style="display: flex; align-items: center; cursor: pointer; display: inline"> -->
            <!--   <v-icon style="font-size: 15px" icon="mdi-comment" /> -->
            <!-- </div> -->
          </div>
        </div>
        <span class="msg ml-2"> {{ msg.content }} </span>
      </div>

      <div style="width: 70%; height: 120%" class="mt-5">
        <v-textarea v-model="newMsg.content" placeholder="写点啥" no-resize auto-grow row-height="15" rows="2" clearable label="" variant="outlined">
          <template #details>
            <v-text-field v-model="newVisitor.email" placeholder="输入邮箱" density="compact" variant="outlined" style="width: 1%; margin-right: 10px"> </v-text-field>
            <v-text-field v-model="newVisitor.name" placeholder="输入昵称" density="compact" variant="outlined" style="width: 1%">
              <template #append>
                <v-btn variant="tonal" @click="comment">评论</v-btn>
              </template>
            </v-text-field>
          </template>
        </v-textarea>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import axios from 'axios';
import { formatTime } from '@/utils/time.js';
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive } from 'vue';
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
const visitor = computed(() => {
  visitorModel.fetchOne();
});

const newVisitor = reactive({
  name: '',
  email: '',
  ip: null,
});
const newMsg = reactive({
  content: '',
  post: undefined,
  reply: null,
});

let ip = undefined;
const getIp = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    ip = response.data.ip;
  } catch (error) {
    console.error('无法获取 IP 地址:', error);
  }
};

const comment = async () => {
  newMsg.post = post.value._id;
  newVisitor.ip = ip;
  const data = {
    visitor: newVisitor,
    message: newMsg,
  };
  await messageModel.actions.add(data);
  newMsg.content = '';
};

const fetchData = async () => {
  await getIp();
  await postModel.actions.get({ id: route.params.id });
  await messageModel.actions.getAll();
  await visitorModel.actions.get({ ip });
  newVisitor.name = visitor.name;
};

fetchData();
</script>

<style scoped>
.name {
  font-size: 18px;
  color: #757575;
}

.email {
  font-size: 12px;
  color: #757575;
}

.time {
  font-size: 10px;
  color: #757575;
}

.msg {
  font-size: 16px;
  color: #000;
}

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
