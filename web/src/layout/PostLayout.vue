<template>
  <v-app>
    <v-main class="bg-grey-lighten-3">
      <v-container fluid style="width: 95%">
        <v-row style="display: flex">
          <v-col style="flex: 2.5">
            <v-sheet min-height="40vh" max-height="80vh" rounded="lg" class="scrollbar">
              <Information />
            </v-sheet>
          </v-col>
          <v-col style="flex: 7">
            <v-sheet min-height="90vh" rounded="lg">
              <RouterView />
            </v-sheet>
          </v-col>
          <v-col style="flex: 2.5">
            <v-sheet min-height="40vh" max-height="80vh" rounded="lg" class="scrollbar">
              <Category />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Category from '@/views/Category.vue';
import Information from '@/views/Information.vue';
</script>

<style>
.scrollbar {
  overflow: hidden;
}

.scrollbar:hover {
  overflow-y: auto;
}
/* 定制滚动条的样式 */
.scrollbar::-webkit-scrollbar {
  width: 2px;
  visibility: hidden;
}

.scrollbar::-webkit-scrollbar-track {
  background: #fff;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: #888;
}

.scrollbar:hover::-webkit-scrollbar-thumb {
  background: #555;
}
</style>
