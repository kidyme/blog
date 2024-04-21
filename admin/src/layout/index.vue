<template>
  <v-app>
    <v-navigation-drawer :width="135" v-model="drawer">
      <v-sheet class="pa-2">
        <v-img style="margin: 0 auto; cursor: pointer" :src="avatarImage" height="125" width="75" @click="goto('/')"> </v-img>
      </v-sheet>

      <v-list style="user-select: none">
        <v-list-item v-for="([tab, path], idx) in links" :key="idx" :title="tab" link @click="goto(path)"></v-list-item>
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
  ['Edit', '/edit'],
  ['Statistics', '/ststcs'],
  ['About', '/about'],
];

const drawer = ref(null);

let goto = (path) => {
  router.push(path);
};
</script>
