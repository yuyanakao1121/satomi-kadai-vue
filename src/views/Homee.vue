<script setup>
 import { ref } from 'vue'
 import { useRouter } from 'vue-router';

 const title = ref('研修生コミュニティ')
 const router = useRouter();

</script>

<template>
  <body>
  <div class="Home">
 <h1 class="title">{{ title }}</h1><br>
 <a href="/users" class="button">一覧</a>
 
 </div>
  </body>
</template>

<style scoped>
body{
  background-color: aliceblue;
}
.container {
      text-align: center;
    }
    
    .title {
      color: black;
      font-size: 40x;
      margin-bottom: 20px;
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .button {
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

</style>
