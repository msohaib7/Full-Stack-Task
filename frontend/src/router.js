import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/home.vue'
import SignUp from './components/Signup.vue'
import ForgotPassword from './components/ForgotPassword.vue'



Vue.use(Router)


export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login},
        {path: '/signup', component: SignUp},
        {path: '/forgot', component: ForgotPassword}

    ]


})
