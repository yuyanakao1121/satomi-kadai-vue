import { ref, computed } from 'vue'
import { defineStore } from 'pinia'//piniaをimportしておいく

export const unchi = defineStore('counter', () => {
  
  const id =ref()
  const name = ref("")
  const email = ref("")
  return { id,name,email }
})

/*
このファイルではpiniaを定義している
初期値のないid name emailを定義し、入れ物を用意
returnでid name emailが来るときに代入される
*/
