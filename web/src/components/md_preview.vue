<template>
  <div v-html="content"></div>
</template>

<script setup>
import { marked } from 'marked';
import { ref, onMounted } from 'vue';

const { source } = defineProps({
  source: {
    type: String,
    default: '',
  },
});
const content = ref('');

onMounted(() => {
  content.value = marked(source);
});
</script>
