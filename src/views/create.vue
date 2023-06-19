<script setup>
import { ref } from 'vue';
import {useRouter} from  'vue-router';
import {unchi} from '../stores/counter.js';
const store = unchi();
const id = ref();
const name = ref('');
const email = ref('');
const router = useRouter();


// フォームの送信処理
 const submitForm = () => {
   // 他の画面に遷移する処理
   router.push({
    path: '/check',
  })
  store.id = (id.value);
  store.name = (name.value);
  store.email = (email.value);};

const cancel = () => {
  // キャンセルの処理
  router.push('/users');
};
</script>

<template>
  <div>
    <h1>研修生 新規登録</h1>

    <form @submit.prevent="submitForm">
          <label for="name">名前：</label>
          <input type="text" id="name" v-model="name" required />
          <br />
          <label for="email">メールアドレス：</label>
          <input type="text" id="email" v-model="email" required />
          <br />
          <button  @click="submit">実行</button>
          <button @click="cancel">キャンセル</button>
        </form>
  </div>

</template>
