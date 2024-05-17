<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" flat>
      <v-spacer></v-spacer>

      <v-tabs color="grey-darken-2" centered>
        <v-tab v-for="link in links" :key="link" :text="link[0]" @click="jump(link[1])"></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';

const links = [
  ['首页', '/'],
  ['关于', '/about'],
];

const router = useRouter();
const jump = (path) => {
  router.push(path);
};
</script>
