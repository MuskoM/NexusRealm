import { createMemoryHistory, createRouter } from "vue-router"
import HomeView from "../views/HomeView.vue"
import SettingsView from "../views/SettingsView.vue"
import WebhooksView from "../views/WebhooksView.vue"
import AgentsView from "../views/AgentsView.vue"

const routes = [
    { path: '/', component: HomeView },
    { path: '/settings', component: SettingsView },
    { path: '/webhooks', component: WebhooksView },
    { path: '/agents', component: AgentsView },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes
})
