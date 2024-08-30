import { createApp } from "vue"
import { createPinia } from 'pinia'
import App from "./App.vue"
import './assets/styles/index.scss'
import './assets/styles/markdown.scss'
import 'remixicon/fonts/remixicon.css'

import './lib/shortcuts.ts'

import './stores/messageStore.ts'
import { router } from "./routers/main.ts"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')