//Importing vue and router
import Vue from 'vue'
import VueRouter from 'vue-router'

//Importing components
import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'


//This is the app router
//Will manage the "navigation" between pages and components
Vue.use(VueRouter)

//These are the routes
const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}]

//Use mode History
//I already have explained this "mode" propertie inside another gitHub example
//But just to remember, you can have "history" or "hash"
export default new VueRouter({
    mode: 'history',
    routes
})