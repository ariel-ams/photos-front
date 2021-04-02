import { createWebHistory, createRouter } from 'vue-router';
import Cookies from 'js-cookie';

import PaginationComponent from '../components/PaginationComponent';
import SignIn from "../components/SignIn";
import Login from "../components/Login";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: PaginationComponent},
        { path: '/login', component: Login},
        { path: '/signin', component: SignIn},
        { path: '/logout', component: SignIn, redirect: '/login'},
        //{ path: '*', redirect: '/'}
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = Cookies.get('auth');
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }
  
    next();
});

export default router;