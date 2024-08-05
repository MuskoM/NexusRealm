import { createMemoryHistory, createRouter } from "vue-router"
import Sandbox from "../views/Sandbox.vue"
import Settings from "../views/Settings.vue"

const routes = [
    {path: '/', component: Sandbox},
    {path: '/settings', component: Settings},
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes
})