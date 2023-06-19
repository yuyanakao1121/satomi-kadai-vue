<script setup>
import { useRouter } from 'vue-router';
import {unchi} from '../stores/counter.js';
const store = unchi();
const name = store.name;
const email = store.email;

const router = useRouter();

const register = async () => {
  try {
    const response = await fetch('http://localhost:8080/staff', {
      method: 'POST',
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
      console.log('登録が成功しました:', data);
      router.push('/users');
    } else {
      console.error('登録エラー');
      router.push('/users');
    }
  } catch (error) {
    console.error('APIリクエストエラー:', error);
    router.push('/users');
  }
};

const cancel = () => {
  // キャンセルの処理
  router.push('/users');
};

</script>

<template>
  <div>
    <h1>下記の情報で新規登録をします。よろしいでしょうか？</h1>
    <p>名前: {{ name }}</p>
    <p>メールアドレス: {{ email }}</p>
    <button @click="register">登録</button>
    <button @click="cancel">キャンセル</button>
  </div>
</template>
