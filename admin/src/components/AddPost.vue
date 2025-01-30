<template>
  <div>
    <div class="mb-3" style="width: 60%">
      <v-text-field v-model="title" clearable label="标题" variant="outlined"></v-text-field>
      <v-select v-model="category" :items="categories" item-title="title" item-value="_id" label="类别" variant="outlined"></v-select>
      <div style="display: flex; align-items: center">
        <v-btn v-if="!file" color="primary" variant="outlined" class="mr-3" @click="handleUpload"> 上传文件 </v-btn>
        <v-btn v-else color="primary" variant="outlined" class="mr-3" @click="handleUpload"> 重新上传 </v-btn>
        <span v-if="file" class="mr-3">{{ file.name }}</span>
        <v-btn color="primary" variant="outlined" @click="handleAddCate"> {{ isAddCate ? '取消' : '创建类别' }} </v-btn>
      </div>

      <div v-if="isAddCate" style="display: flex; align-items: center; gap: 16px" class="mt-5">
        <v-text-field v-model="newCate" clearable label="类别" variant="outlined"></v-text-field>
        <v-btn color="primary" @click="addCate"> 提交 </v-btn>
      </div>
    </div>

    <v-btn color="primary" @click="submit"> 提交 </v-btn>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { upload as doUpload } from '@/api/file.js';
import categoryModel from '@/model/category.js';
import postModel from '@/model/post.js';

const categories = computed(() => categoryModel.fetch());

const fetch = async () => {
  categoryModel.actions.getAll();
};

const title = ref('');
const category = ref(null);
const file = ref(null);
const newCate = ref(null);

let isAddCate = ref(false);
const handleAddCate = () => {
  isAddCate.value = !isAddCate.value;
};
const addCate = async () => {
  categoryModel.actions.add({ title: newCate.value }).then((res) => {
    console.log(res);
  });
  handleAddCate();
};

const handleUpload = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.md';
  fileInput.style.display = 'none';

  fileInput.addEventListener('change', async (event) => {
    file.value = event.target.files[0];
  });
  fileInput.click();
};

const check = () => {
  return title.value && category.value && file.value;
};

const emit = defineEmits(['closeTab']);
const submit = async () => {
  if (check()) {
    const formData = new FormData();
    formData.append('file', file.value);

    let path;
    await doUpload(formData)
      .then((res) => {
        console.log(res);
        path = res.data.htmlPath;
      })
      .catch((error) => {
        console.error('文件上传失败:', error);
      });

    postModel.actions.add({
      title: title.value,
      category: category.value,
      path: path,
    });

    emit('closeTab');
  }
};

fetch();
</script>

<style scoped></style>
