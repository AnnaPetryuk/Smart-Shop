import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import AuthPage from '../views/AuthPage.vue'
import HomePage from '../views/HomePage.vue'
import AdminPage from '../views/AdminPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import Welcome from '../views/home-page/Welcome.vue'
import Goods from '../views/home-page/Goods.vue'
import AdminMain from '../views/admin-page/AdminMain.vue'

Vue.use(VueRouter)

    const routes = [
    {
        path: '/',
        name: 'AuthPage',
        component: AuthPage
    },
    {
        path: '/home',
        component: HomePage,
        beforeEnter(to, from, next) {
            stopRoute(next);
        },
        children: [
            {
                path: '/',
                name: 'Welcome',
                component: Welcome
            },
            {
                path: '/goods',
                name: 'Goods',
                component: Goods
            }
        ]
    },
    {
        path: '/admin',
        component: AdminPage,
        beforeEnter(to, from, next) {
            stopRoute(next);
        },
        children: [
            {
                path: '/',
                name: 'AdminMain',
                component: AdminMain
            }
        ]
    },
    {
        path: '*',
        name: 'NotFoundPage',
        component: NotFoundPage
    }
];

function stopRoute(next) {
    if (store.state.isAuthUser) {
        next();
    } else {
        router.push('/');
    }
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router