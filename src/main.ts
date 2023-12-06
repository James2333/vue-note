import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import App from './App.vue'
import router from './router'
import noteService from './api/index'

const app = createApp(App)
app.provide('axios', noteService)

app.use(createPinia())
app.use(router)

app.mount('#app')