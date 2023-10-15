import Login from "./pages/Login.vue";
import ToolPage from "./pages/ToolPage.vue";
import OtherPage from "./pages/OtherPage.vue";

const routes = [
    { name: 'login', path: '/', component: Login },
    { name: 'tools', path: '/tools', component: ToolPage },
    { name: 'other', path: '/other', component: OtherPage },
]
export {routes}