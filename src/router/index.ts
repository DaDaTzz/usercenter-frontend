import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import IndexPage from "@/pages/IndexPage.vue";
import UserListPage from "@/pages/UserListPage.vue";
import UserEditPage from "@/pages/UserEditPage.vue";
import AddUserPage from "@/pages/AddUserPage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '登录',
        component: IndexPage
    },
    {
        path: '/user/list',
        name: '用户列表',
        component: UserListPage
    },
    {
        path: '/user/edit',
        name: '编辑用户',
        component: UserEditPage
    },
    {
        path: '/user/add',
        name: '新增用户',
        component: AddUserPage
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
