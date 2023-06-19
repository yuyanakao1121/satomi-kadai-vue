<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { unchi } from '../stores/counter.js';

const store = unchi();
const id = store.id;
const name = ref(store.name);
const email = ref(store.email);

const router = useRouter();

const submit = () => {
  router.push('/up_check');
  store.name = name.value;
  store.email = email.value;
};

const cancel = () => {
  router.push('/users');
};
</script>

<template>
  <div>
    <h1>研修生 新規登録</h1>

    <form @submit.prevent="submit">
      <label for="id">ID： {{ id }}</label>
      <br />
      <label for="name">名前：</label>
      <input type="text" id="name" v-model="name" required />
      <br />
      <label for="email">メールアドレス：</label>
      <input type="text" id="email" v-model="email" required />
      <br />
      <button type="submit">確認</button>
      <button type="button" @click="cancel">キャンセル</button>
    </form>
  </div>
</template>
