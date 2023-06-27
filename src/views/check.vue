<script setup>
import { useRouter } from 'vue-router';
import { unchi } from '../stores/counter.js';
const store = unchi();
const name = store.name;
const email = store.email;
const profileImage = store.imageBase64; // プロフィール画像の情報を取得
const base64Data = profileImage.split(',')[1]; // 先頭のデータタイプ部分を削除してBase64データ部分を取得

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
        profileImage: base64Data, // APIリクエストにプロフィール画像の情報を追加
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

console.log('profile_image:', profileImage);

</script>

<template>
  <div>
    <h1>下記の情報で新規登録をします。よろしいでしょうか？</h1>
    <p>名前: {{ name }}</p>
    <p>メールアドレス: {{ email }}</p>
    <img :src="profileImage" alt="プロフィール画像" v-if="profileImage" style="max-width: 300px;" />
    <button @click="register">登録</button>
    <button @click="cancel">キャンセル</button>
  </div>
</template>