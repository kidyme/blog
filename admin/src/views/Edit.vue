<script setup>
import { ref } from 'vue';
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt();

defineProps({
  source: {
    type: String,
    default: '123',
  },
});
console.log(markdown.render('123'));
</script>

<template>
  <div>
    <div v-html="markdown.render(source)" />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
