import { createApp } from 'vue'
import Home from './Home.vue'
import router from './router/index'
import {createPinia} from 'pinia';

const app = createApp(Home)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')
