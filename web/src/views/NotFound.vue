<template>
  <div class="full-background" style="position: relative">
    <v-btn style="position: absolute; left: 15px; top: 10px" color="" @click="jumpBack"> 返回 </v-btn>
    <div style="height: 100vh; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; text-align: center">
      <h1>Whoops, 404</h1>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const jumpBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.full-background {
  background-image: url('@/assets/bg.jpg');
  background-position: center;
  background-repeat: repeat;
  min-height: 100vh;
}
</style>
