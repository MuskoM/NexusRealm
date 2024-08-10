import { createMemoryHistory, createRouter } from "vue-router"
import Sandbox from "../views/Sandbox.vue"
import Settings from "../views/Settings.vue"
import Chat from "../views/Chat.vue"

const routes = [
    {path: '/', component: Sandbox},
    {path: '/settings', component: Settings},
    {path: '/chat', component: Chat}
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes
})