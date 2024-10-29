import { createMemoryHistory, createRouter } from "vue-router"
import NexusRealm from "../views/NexusRealm.vue"
import AiRealm from "../views/AiRealm.vue"
import SettingsView from "../views/SettingsView.vue"

const routes = [
    { path: '/', component: NexusRealm },
    { path: '/ai', component: AiRealm },
    { path: '/settings', component: SettingsView },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes
})
