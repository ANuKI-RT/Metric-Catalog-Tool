import './assets/main.css'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import {routes} from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const pinia = createPinia()
    .use(piniaPluginPersistedState)

createApp(App)
    .use(BootstrapVue)
    .use(IconsPlugin)
    .use(router)
    .use(pinia)
    .mount('#app')
