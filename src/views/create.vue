<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { unchi } from '../stores/counter.js';

const store = unchi();
const id = ref();
const name = ref('');
const email = ref('');
const router = useRouter();
const emailError = ref(false);

// フォームの送信処理
const submitForm = () => {
  if (!emailError.value) {
    // 他の画面に遷移する処理
    router.push({
      path: '/check',
    });
    store.id = id.value;
    store.name = name.value;
    store.email = email.value;
  }
};

const cancel = () => {
  // キャンセルの処理
  router.push('/users');
};

// メールアドレスの入力検証
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = !emailRegex.test(email.value);
};

// 実行ボタンの活性/非活性を制御する計算プロパティ
const isSubmitDisabled = computed(() => {
  return emailError.value;
});
</script>

<template>
  <div>
    <h1>研修生 新規登録</h1>

    <form @submit.prevent="submitForm">
      <label for="name">名前：</label>
      <input type="text" id="name" v-model="name" required />
      <br />
      <label for="email">メールアドレス：</label>
      <input type="text" id="email" v-model="email" required @input="validateEmail" />
      <span v-if="emailError" style="color: red;">無効な文字が含まれています</span>
      <br />
      <button :disabled="isSubmitDisabled" @click="submit">実行</button>
      <button @click="cancel">キャンセル</button>
    </form>
  </div>
</template>