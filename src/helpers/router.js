import { createWebHistory, createRouter } from 'vue-router';
import PaginationComponent from '../components/PaginationComponent';
import SignIn from "../components/SignIn";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: PaginationComponent},
        { path: '/login', component: PaginationComponent},
        { path: '/signin', component: SignIn},
        //{ path: '*', redirect: '/'}
    ]
});

// router.beforeEach((to, from, next) => {
//     // redirect to login page if not logged in and trying to access a restricted page
//     const publicPages = ['/login', '/register'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');
  
//     if (authRequired && !loggedIn) {
//       return next('/login');
//       //return next('/');
//     }
  
//     next();
// });

export default router;