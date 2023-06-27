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
      <label for="image">画像選択：</label>
      <input type="file" id="image" accept="image/*" @change="handleImageSelect" />
      <br />
      <button :disabled="isSubmitDisabled">実行</button>
      <button @click="cancel">キャンセル</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { unchi } from '../stores/counter.js';

const store = unchi();
const id = ref();
const name = ref('');
const email = ref('');
const imageBase64 = ref(null);
const router = useRouter();
const emailError = ref(false);

// フォームの送信処理
const submitForm = () => {
  if (!emailError.value) {
    // 他の画面に遷移する処理
    router.push({
      path: '/check',
    });
    console.log(imageBase64);
    store.id = id.value;
    store.name = name.value;
    store.email = email.value;
    store.imageBase64 = imageBase64.value;
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

// 画像選択時の処理
const handleImageSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageBase64.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 実行ボタンの活性/非活性を制御する計算プロパティ
const isSubmitDisabled = computed(() => {
  return emailError.value;
});
</script>
