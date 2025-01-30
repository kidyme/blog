<template>
  <div>
    <v-app-bar class="pl-10" style="border-bottom: 1px solid #e0e0e0" density="compact" flat>
      <v-tabs v-model="choice" color="grey-darken-2">
        <v-tab v-for="(item, idx) in menu" :key="idx" @click="choice = idx">
          <span
            :class="{
              'hightlight-tab': choice === idx,
              'normal-tab': choice !== idx,
            }"
            >{{ item.title }}</span
          >
          <span v-if="item.type === 'Post' || item.type === 'PostListWithCategory' || item.type === 'AddPost'" class="close-icon" @click.stop="close(idx)"> × </span>
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main style="padding: 0">
      <component
        :key="menu[choice].key"
        :is="currentComponent"
        @addPostTab="addPostTab"
        @addPost="addPost"
        @jumpToPostWithCategoryId="jumpToPostWithCategoryId"
        @closeTab="close"
        :postId="menu[choice].postId"
        :categoryId="menu[choice].categoryId"
      />
    </v-main>
  </div>
</template>

<script setup>
import { ref, shallowRef, computed, markRaw } from 'vue';
import generateUUID from '@/utils/uuid.js';
import PostList from '@/components/PostList.vue';
import Post from '@/components/Post.vue';
import Category from '@/components/Category.vue';
import AddPost from '@/components/AddPost.vue';

const menu = ref([
  {
    key: generateUUID(),
    title: '帖子',
    type: 'PostList',
    categoryId: '',
  },
  {
    key: generateUUID(),
    title: '类别',
    type: 'Category',
  },
]);

const typeToComponent = {
  'PostList': PostList,
  'Category': Category,
  'Post': Post,
  'PostListWithCategory': PostList,
  'AddPost': AddPost,
};

const currentTab = ref(menu.value[0]);
const choice = computed({
  get() {
    return menu.value.findIndex((item) => item.title === currentTab.value.title);
  },
  set(newChoice) {
    currentTab.value = menu.value[newChoice];
  },
});
const currentComponent = computed(() => {
  return typeToComponent[currentTab.value.type] || null;
});

const addPostTab = ({ title, id }) => {
  const isTitleExist = menu.value.some((item) => item.title === title);
  const type = 'Post';

  if (!isTitleExist) {
    menu.value.push({ title, type, postId: id, key: generateUUID() });
  }
  choice.value = menu.value.findIndex((item) => item.title === title);
};

const addPost = () => {
  const title = '添加帖子';
  const type = 'AddPost';
  const isTitleExist = menu.value.some((item) => item.title === title);

  if (!isTitleExist) {
    menu.value.push({ title, type, key: generateUUID() });
  }
  choice.value = menu.value.findIndex((item) => item.title === title);
};

const jumpToPostWithCategoryId = ({ id, title }) => {
  title = title + "'s 帖子";
  const isTitleExist = menu.value.some((item) => item.title === title);
  const type = 'PostListWithCategory';

  if (!isTitleExist) {
    menu.value.push({ title, type, categoryId: id, key: generateUUID() });
  }
  choice.value = menu.value.findIndex((item) => item.title === title);
};

const close = (idx) => {
  if (!idx) {
    menu.value.splice(choice.value, 1);
    choice.value = 0;
  } else {
    const isClosingCurrentTab = choice.value === idx;

    menu.value.splice(idx, 1);

    if (isClosingCurrentTab) {
      if (idx < menu.value.length) {
        choice.value = idx;
      } else if (idx > 0) {
        choice.value = idx - 1;
      } else {
        choice.value = -1;
      }
    }
  }
};
</script>

<style scoped>
.v-tab {
  text-transform: none !important;
}

.normal-tab {
  font-size: 0.9em;
  font-weight: 500;
  color: #727d73;
}
.hightlight-tab {
  font-size: 1em;
  font-weight: 700;
  color: #202020;
}

.close-icon {
  margin-left: 8px;
  cursor: pointer;
  font-size: 1em;
  padding: 4px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: all 0.2s ease;
}

.close-icon:hover {
  font-size: 1.2em;
  background-color: #dcdcdc;
}
</style>
