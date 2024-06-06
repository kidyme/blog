<template>
  <v-app id="inspire" class="full-background">
    <v-app-bar class="px-3" density="compact" flat>
      <v-spacer></v-spacer>

      <v-tabs v-model="choice" color="grey-darken-2" centered>
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
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const links = [
  ['首页', '/'],
  ['关于', '/about'],
];

const choice = ref(0);
const router = useRouter();
const route = useRoute();

const jump = (path) => {
  router.push(path);
};

watch(
  () => route.path,
  (newPath) => {
    const matchingIndex = links.findIndex((link) => link[1] === newPath);
    choice.value = matchingIndex >= 0 ? matchingIndex : 0;
  },
  { immediate: true }
);
</script>
<style scoped>
.full-background {
  background-image: url('@/assets/bg.jpg');
  background-position: center;
  background-repeat: repeat;
  min-height: 100vh;
}
</style>
