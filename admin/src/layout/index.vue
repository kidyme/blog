<template>
  <v-app>
    <v-navigation-drawer :width="135" v-model="drawer">
      <v-sheet class="pa-2">
        <v-img style="margin: 0 auto; cursor: pointer" :src="avatarImage" height="125" width="75" @click="goto('/')"> </v-img>
      </v-sheet>

      <v-list style="user-select: none">
        <v-list-item class="menu ml-2" v-for="([tab, path], idx) in links" :key="idx" link @click="goto(path)">{{ tab }}</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="pa-5">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import avatarImage from '@/assets/avatar.webp';

const router = useRouter();

const links = [
  ['内容', '/content'],
  ['数据', '/ststcs'],
  ['关于', '/about'],
];

const drawer = ref(null);

let goto = (path) => {
  router.push(path);
};
</script>

<style scoped>
.menu {
  font-size: 18px;
  font-weight: 700;
}
</style>
