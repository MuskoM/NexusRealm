import { createApp } from "vue"
import { createPinia } from 'pinia'
import App from "./App.vue"
import './index.css'

import './lib/shortcuts.ts'

import './stores/messageStore.ts'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
