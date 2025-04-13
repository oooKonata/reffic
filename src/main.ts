import { createApp } from 'vue'
import 'normalize.css'
import '@/styles/reset.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
pinia.use(piniaPluginPersistedstate)

app.mount('#app')
