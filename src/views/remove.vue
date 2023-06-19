<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import {unchi} from '../stores/counter.js';
const store = unchi();
const id = store.id;
const name = store.name;
const email = store.email;
const router = useRouter();

const remove = async () => {
  try {
    const response = await fetch(`http://localhost:8080/staff/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 200) {
      console.log('削除が成功しました');
      router.push('/users');
    } else {
      console.error('削除エラー');
      router.push('/users');
    }
  } catch (error) {
    console.error('APIリクエストエラー:', error);
    router.push('/users');
  }
};

const cancel = () => {
  router.push('/users');
};
</script>

<template>
  <div>
    <h1>下記の情報の削除をします。よろしいでしょうか？</h1>
    <p>ID: {{ id }}</p>
    <p>名前: {{ name }}</p>
    <p>メールアドレス: {{ email }}</p>
    <button @click="remove">削除</button>
    <button @click="cancel">キャンセル</button>
  </div>
</template>
