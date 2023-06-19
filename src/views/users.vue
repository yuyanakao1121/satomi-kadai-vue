<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { unchi } from '../stores/counter.js'; //piniaとついないでおく

const store = unchi();//importしたpiniaの処理の変数を再定義して使えるようにしておく
const router = useRouter();//同様にimportしたuseRouterの処理を再定義
const message = ref('研修生一覧');
const users = ref([]);
const currentPage = ref(1); // 現在のページ番号
const perPage = 5; // 1ページあたりの表示アイテム数
const totalPages = computed(() => Math.ceil(users.value.length / perPage)); // 総ページ数

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--; // 現在のページ番号を1つ減らす
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++; // 現在のページ番号を1つ増やす
  }
};
//userの情報をもつupdateの関数　画面遷移とpiniaにデータを渡す処理
const update = (user) => {
  router.push({
    path: '/update',
  });
  store.id = user.id; // 選択した研修生のIDをストアに設定
  store.name = user.name; // 選択した研修生の名前をストアに設定
  store.email = user.email; // 選択した研修生のメールアドレスをストアに設定
};

const remove = (user) => {
  router.push({
    path: '/remove',
  });
  store.id = user.id; // 選択した研修生のIDをストアに設定
  store.name = user.name; // 選択した研修生の名前をストアに設定
  store.email = user.email; // 選択した研修生のメールアドレスをストアに設定
};

const goToPage = (page) => {
  currentPage.value = page; // ページ番号を指定された値に更新
};

onMounted(() => {
  fetch('http://localhost:8080/staff')
    .then((res) => {
      if (!res.ok) {
        throw new Error("network error. we couldn't call the API.");
      }
      return res.json();
    })
    .then((jsonData) => {
      users.value = jsonData; // ログデータをusersに設定
    })
    .catch((err) => console.error(err));
});

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage; // 表示範囲の開始インデックスを計算
  const endIndex = startIndex + perPage; // 表示範囲の終了インデックスを計算
  return users.value.slice(startIndex, endIndex); // 計算された範囲の研修生データを返す
});

</script>

<template>
  <div>
    <h1>{{ message }}</h1>

    <table>
      <thead>
        <a href="/create" class="button">+</a>
        <tr>
          <th>ID</th>
          <th>名前</th>
          <th>メールアドレス</th>
          <th>削除</th>
          <th>編集</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in paginatedUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <button @click="() => remove(user)">❌</button> <!-- ユーザーの削除ボタン -->
          <button @click="() => update(user)">🖋</button> <!-- ユーザーの編集ボタン -->
        </tr>
      </tbody>
    </table>

    <div>
      <button @click="previousPage" :disabled="currentPage === 1">前へ</button> <!-- 前のページに移動するボタン -->
      <button v-for="page in totalPages" :key="page" @click="() => goToPage(page)" :disabled="page === currentPage">
        {{ page }}
      </button> <!-- ページ番号ボタン -->
      <button @click="nextPage" :disabled="currentPage === totalPages">次へ</button> <!-- 次のページに移動するボタン -->
    </div>
  </div>
</template>
