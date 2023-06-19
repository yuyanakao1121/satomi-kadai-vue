<script setup>
import { useRouter } from 'vue-router';
import { unchi } from '../stores/counter.js';

const store = unchi();
const id = store.id;
const name = store.name;
const email = store.email;
const router = useRouter();

const update = async () => {
  try {
    const response = await fetch(`http://localhost:8080/staff/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });

    if (response.status === 200) {
      const data = await response.text();
      console.log('更新が成功しました:', data);
      router.push('/users');
    } else {
      console.error('更新エラー');
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
    <h1>下記の情報で新規登録をします。よろしいでしょうか？</h1>
    <p>ID: {{ id }}</p>
    <p>名前: {{ name }}</p>
    <p>メールアドレス: {{ email }}</p>
    <button @click="update">更新</button>
    <button @click="cancel">キャンセル</button>
  </div>
</template>